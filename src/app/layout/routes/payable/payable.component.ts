import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ContasService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-payable',
  templateUrl: './payable.component.html',
  styleUrls: ['./payable.component.scss']
})
export class PayableComponent implements OnInit, OnDestroy {

  item$!: Observable<any[]>;

  collection = 'conta';
  entidade?: string;
  valor?: number;
  vencimento?: Date;
  recurrent: boolean = false;
  require: boolean = false;
  currentDate = new Date();


  constructor(
    private fire: ContasService
  ) { 
  }
  
  ngOnInit(): void {
    this.item$ = this.fire.getList('conta');
    this.includeRecurrent();

  }
  
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  addAccount(){
    if(!this.entidade || !this.valor || this.vencimento == null){
      this.require = true;
      return
    }
    let body = {
      entidade: this.entidade,
      valor: this.valor,
      vencimento: this.vencimento,
      paga: false,
      recorrente: this.recurrent,
      id: this.returnId(this.entidade, false)
    }
    this.fire.insertDoc(this.collection, this.returnId(this.entidade, false), body);
    this.entidade = '';
    this.valor = undefined;
    this.vencimento = undefined;
    this.recurrent = false;
  }

  returnId(entity: string, recurrent: boolean): string {
    if(recurrent){
      const currentDate = new Date();
      const dateString = currentDate.getDate().toString().padStart(2, '0') + 
                         (currentDate.getMonth() + 2).toString().padStart(2, '0') + 
                         currentDate.getFullYear().toString();
      return entity + dateString;
    }else{
      const currentDate = new Date();
      const dateString = currentDate.getDate().toString().padStart(2, '0') + 
                         (currentDate.getMonth() + 1).toString().padStart(2, '0') + 
                         currentDate.getFullYear().toString();
      return entity + dateString;
    }
}


  pay(id: string, entity: string, value: number, vencimento: any, recorrente: boolean){
    let obj ={
      entidade: entity,
      valor: value,
      vencimento: vencimento,
      recorrente: recorrente,
      id: id,
      paga: true
    }
    this.fire.updateDoc('conta', id, obj);
  }

  includeRecurrent(){
    let list = this.item$.pipe(
      map(items => items.filter(item => item.recorrente != false))
    );
    list.subscribe(
      items => {
        items.forEach(item => {
          let vencimento = new Date(item.vencimento);
          let nextMonthDate = new Date(vencimento);
          nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
          if (vencimento.getMonth() !== (new Date().getMonth() + 1) % 12) {
            let newItem = {
              ...item,
              vencimento: `${nextMonthDate.getFullYear()}-${(nextMonthDate.getMonth() + 1).toString().padStart(2, '0')}-${nextMonthDate.getDate().toString().padStart(2, '0')}`,
              id: this.returnId(item.entidade, true)
            };
            this.fire.insertDoc(this.collection, newItem.id, newItem);
          }
        });
      }
    )
  }

  isCurrentOrPastMonth(vencimento: string): boolean {
    const dueDate = new Date(vencimento);
    const currentYear = this.currentDate.getFullYear();
    const currentMonth = this.currentDate.getMonth();
    const dueYear = dueDate.getFullYear();
    const dueMonth = dueDate.getMonth();

    // Verifica se o vencimento é no mês atual ou em meses anteriores
    return (dueYear < currentYear || (dueYear === currentYear && dueMonth <= currentMonth));
  }


}

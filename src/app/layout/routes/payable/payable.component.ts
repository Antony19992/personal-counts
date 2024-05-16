import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContasService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-payable',
  templateUrl: './payable.component.html',
  styleUrls: ['./payable.component.scss']
})
export class PayableComponent implements OnInit, OnDestroy {

  item$?: Observable<any[]>;

  collection = 'conta';
  entidade?: string;
  valor?: number;
  vencimento?: Date;
  require: boolean = false


  constructor(
    private fire: ContasService
  ) { }
  
  ngOnInit(): void {
    this.item$ = this.fire.getList();
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
      paga: false
    }
    this.fire.insertDoc(this.collection, this.returnId(this.entidade), body);
  }

  returnId(entity: string): string {
    const currentDate = new Date();
    const dateString = currentDate.getDate().toString().padStart(2, '0') + 
                       (currentDate.getMonth() + 1).toString().padStart(2, '0') + 
                       currentDate.getFullYear().toString();
    return entity + dateString;
}


}

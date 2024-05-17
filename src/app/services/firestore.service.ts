import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { doc, docData, Firestore, collection, collectionData, addDoc, setDoc, deleteDoc } from  "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class ContasService {

  item$!: Observable<any[]>;

  constructor(
    private firestore: Firestore
  ) { }

  getList(prop: any) {
    const ref = collection(this.firestore, prop);
    this.item$ = collectionData(ref);
    return this.item$;
  }

  includeDoc(collection: any, data: any): void{
    addDoc(collection, data)
    }

      // inserir doc com id
  async insertDoc(collection: string, id: string, form: any){
    await setDoc(doc(this.firestore, collection, id), form);
  }

  async updateDoc(collection: string, docId: string, object: any){
    await setDoc(doc(this.firestore, collection, docId), object);
  }

  async delete(collection: string, docId: string){
    await deleteDoc(doc(this.firestore, collection, docId));
  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemdataService {

  itemdata:Array<any>;

  constructor() {
    this.itemdata = [{id:"1234", amount: 2, category: "123", name: "Banan", unit: "st"}, {id: "321", name: "äpple", amount: 1, unit: "st", category: "123"}]
  }
}

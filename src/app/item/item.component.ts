import { Component, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  @Input() item:any;
  @Input() category:any;

  constructor(private angularFirestore: AngularFirestore,) {}

  trim(input:string){
    return input.trim();
  }

  deleteItem(item:any){
    this.angularFirestore.collection("items").doc(item.id).delete();
    alert("item deleted")
  }
  
  showEdit(item:any){
    let name = <HTMLInputElement>document.querySelector(`#${item.id} #itemName`);
    let amount = <HTMLInputElement>document.querySelector(`#${item.id} #itemAmount`);
    let unit = <HTMLInputElement>document.querySelector(`#${item.id} #itemUnit`);

    document.querySelector(`#${item.id} #info`)?.classList.add("hidden");
    document.querySelector(`#${item.id} #info`)?.classList.remove("show");
    document.querySelector(`#${item.id} #editItem`)?.classList.add("show")
    document.querySelector(`#${item.id} #editItem`)?.classList.remove("hidden");

    name.value = item.name;
    amount.value = item.amount;
    unit.value = item.unit;
  }

  updateItem(item:any){
    let name = <HTMLInputElement>document.querySelector(`#${item.id} #itemName`);
    let amount = <HTMLInputElement>document.querySelector(`#${item.id} #itemAmount`);
    let unit = <HTMLInputElement>document.querySelector(`#${item.id} #itemUnit`);

    document.querySelector(`#${item.id} #info`)?.classList.add("show");
    document.querySelector(`#${item.id} #info`)?.classList.remove("hidden");
    document.querySelector(`#${item.id} #editItem`)?.classList.add("hidden")
    document.querySelector(`#${item.id} #editItem`)?.classList.remove("show");
    
    this.angularFirestore.collection("items").doc(item.id).set({
      name: name.value,
      amount: amount.value,
      unit: unit.value,
      category: item.category
    })
  }
}

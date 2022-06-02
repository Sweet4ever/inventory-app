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
}

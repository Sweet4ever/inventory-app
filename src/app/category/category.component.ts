import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  
  constructor(private angularFirestore: AngularFirestore) {}

  public users:any;
  public items:any;
  public categories:any;

  public toggleShow(event:Event, item:any){
    item.show = !item.show;
  }

  getUsersList() {
    return this.angularFirestore.collection('users')
                                .valueChanges()
                                .subscribe((usersData: any[]) => {this.users = usersData});
  }
  
  getItemList() {
    return this.angularFirestore.collection('items')
                                .valueChanges()
                                .subscribe((itemsData: any[]) => {this.items = itemsData});
  }

  getCategoryList() {
    return this.angularFirestore.collection('categories')
                                .valueChanges()
                                .subscribe((categoriesData: any[]) => {this.categories = categoriesData});
  }

  ngOnInit(): void {
    this.users = this.getUsersList();
    this.items = this.getItemList();
    this.categories = this.getCategoryList();
  }

}

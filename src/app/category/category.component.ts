import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CurrentUserService } from '../current-user.service'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  
  constructor(private angularFirestore: AngularFirestore, private currentUser: CurrentUserService) {}

  public users:any;
  public items:any;
  public categories:any;
  public current:any;

  public toggleShow(event:Event, item:any){
    item.show = !item.show;
  }

  getUsersList() {
    return this.angularFirestore.collection('users')
                                .valueChanges({idField: 'id'})
                                .subscribe((usersData: any[]) => {this.users = usersData});
  }
  
  getItemList() {
    return this.angularFirestore.collection('items')
                                .valueChanges({idField: 'id'})
                                .subscribe((itemsData: any[]) => {this.items = itemsData});
  }

  getCategoryList() {
    return this.angularFirestore.collection('categories')
                                .valueChanges({idField: 'id'})
                                .subscribe((categoriesData: any[]) => {this.categories = categoriesData});
  }

  ngOnInit(): void {
    this.getUsersList();
    this.getItemList();
    this.getCategoryList();
    console.log(this.currentUser.getCurrentUser());
  }

}
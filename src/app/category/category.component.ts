import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CurrentUserService } from '../current-user.service'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  
  constructor(private angularFirestore: AngularFirestore, private currentUser: CurrentUserService) {this.showList = []}

  public users:any;
  public items:any;
  public categories:any;
  public current:any;
  public showList: any;

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
                                .subscribe((categoriesData: any[]) => {this.categories = categoriesData; this.sortCategories(this.currentUser.id.trim())});
  }

  sortCategories(userId: string){
    this.categories.forEach((element:any) => {
      if(element.user_id.trim() == userId.trim() && this.showList.length < this.categories.length){
        this.showList.push(element) 
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.getUsersList();
    this.getItemList();
    this.getCategoryList();
  }

}
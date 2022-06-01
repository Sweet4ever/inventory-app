import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CurrentUserService } from '../current-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  
  constructor(private angularFirestore: AngularFirestore, private currentUser: CurrentUserService, private router: Router) {
    this.newForm = false;
    this.showList = [];
  }

  public users:any;
  public items:any;
  public categories:any;
  public current:any;
  public showList: any;
  public newForm:boolean;

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
    this.showList = [];
    this.categories.forEach((element:any) => {
      if(element.user_id.trim() == userId.trim() && this.showList.length < this.categories.length){
        this.showList.push(element) 
      }
    });
  }

  showForm(){
    this.newForm = true;
  }

  addCategory(){
    let name = <HTMLInputElement>document.querySelector("#newName");
    if(name.value == null) {
      alert("Add a name")
      return
    }
    this.angularFirestore.collection("categories").add({
      'name': name.value,
      'user_id': this.currentUser.id,
    });
    this.newForm = false;
  }

  deleteCategory(category:any){
    this.angularFirestore.collection("categories").doc(category.id).delete();
    alert("category deleted")
    this.getCategoryList();
  }

  async ngOnInit(): Promise<void> {
    if(this.currentUser.id == ""){
      this.router.navigate(['/login'])
    }
    this.getUsersList();
    this.getItemList();
    this.getCategoryList();
  }

}
import { Component } from '@angular/core';
import { ItemdataService } from '../itemdata.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  public categories;
  public items = this.itemData;
  
  constructor(private itemData: ItemdataService) { 
    this.categories = [{name: "Mat", userID: "123", id: "123", show: false}, {name: "Kläder", userID: "123", id: "1234", show: false}]
  }

  get getItemData(): any{
    return this.itemData;
  }

  public toggleShow(event:Event, item:any){
    item.show = !item.show;
  }

  ngOnInit(): void {
  }

}

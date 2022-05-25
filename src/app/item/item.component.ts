import { Component } from '@angular/core';
import { ItemdataService } from '../itemdata.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  get getItemData():any{
    return this.itemData;
  }
  constructor(private itemData: ItemdataService) { 
   
  }

  ngOnInit(): void {
  }

}

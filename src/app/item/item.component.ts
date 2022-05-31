import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  @Input() item:any;
  @Input() category:any;

  constructor() {}

  trim(input:string){
    return input.trim();
  }
}

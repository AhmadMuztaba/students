import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss']
})
export class InputErrorComponent implements OnInit {
  @Input() controls:any;
  @Input() fieldName:any;
  constructor() { }

  ngOnInit(): void {
   
  }

}

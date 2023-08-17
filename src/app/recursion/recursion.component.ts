import { Component, Input, OnInit } from '@angular/core';

// import { Node } from '../model/node.model';

@Component({
  selector: 'app-recursion',
  templateUrl: './recursion.component.html',
  styleUrls: ['./recursion.component.css']
})
export class RecursionComponent implements OnInit {
  @Input() child

  constructor() { }

  ngOnInit() {
    // console.log(this.node);
  }
}
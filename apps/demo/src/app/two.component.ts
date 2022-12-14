import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ngx-libs-two',

  template: ` <p>two works!</p> `,
  styles: [],
})
export class TwoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

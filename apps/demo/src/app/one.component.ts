import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'ngx-libs-one',
  template: `
  one-works
  <br/>
  <button (click)='toOneOne()'>oneone</button>
  <router-outlet></router-outlet>
  `,
  styles: [],
})
export class OneComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {}

  toOneOne() {
    this.router.navigate(['one'], { relativeTo: this.activatedRoute });
  }
}

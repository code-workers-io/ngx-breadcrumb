import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'ngx-breadcrumb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo';

  constructor(private readonly router: Router) {
  }
  toOne() {
    this.router.navigate(['one'])
  }

  toTwo() {
    this.router.navigate(['two'])
  }
}

import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-layout-outlet',
  templateUrl: './layout-outlet.component.html',
  styleUrls: ['./layout-outlet.component.scss']
})
export class LayoutOutletComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('body').layout('fix');
    const trees: any = $('[data-widget="tree"]');
    trees.tree();
    $('body').removeClass('login-page');
  }

  LogoutFunction() {
  }

}

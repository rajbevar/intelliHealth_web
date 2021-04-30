import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';

import { HeaderComponent } from './header/header.component';

import { LayoutOutletComponent } from './layout-outlet/layout-outlet.component';

export const CONTAINERS = [
  HeaderComponent,
  LayoutOutletComponent
];


@NgModule({
  declarations: [CONTAINERS],
  exports: [CONTAINERS],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }

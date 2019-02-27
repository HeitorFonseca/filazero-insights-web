import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
  DragDropModule,
    NgbModule
  ],
  declarations: [HomeComponent],
  exports: []
})
export class FilazeroModule { }

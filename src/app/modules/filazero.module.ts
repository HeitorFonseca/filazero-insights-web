import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { MatTableModule } from '@angular/material/table';  

@NgModule({
  imports: [
    CommonModule,
  DragDropModule,
    NgbModule,
    ChartsModule,
    FontAwesomeModule,
    MatTableModule
  ],
  declarations: [HomeComponent],
  exports: []
})
export class FilazeroModule { }

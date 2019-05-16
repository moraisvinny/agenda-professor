import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTimeDirective } from './date-time.directive'

@NgModule({
  declarations: [DateTimeDirective],
  exports: [DateTimeDirective]
})
export class DirectivesModule { }

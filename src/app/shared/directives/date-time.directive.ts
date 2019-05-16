import { AfterViewInit, Directive, ElementRef, Self, HostListener, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Globalization } from '@ionic-native/globalization/ngx';
import { rendererTypeName } from '@angular/compiler';


@Directive({
  selector: '[agdDateTime]'
})
export class DateTimeDirective implements AfterViewInit {

  control: NgControl

  constructor(
    private el: ElementRef,
    @Self() control: NgControl,
    private globalization: Globalization,
    private renderer: Renderer2
  ) {

    this.control = control
  }

  ngAfterViewInit(): void {
    this.control.valueChanges
      .subscribe(value => {
        this.globalization.dateToString(new Date(this.el.nativeElement.value), { formatLength: 'short', selector: 'date and time' })
          .then(res => {
            this.renderer.setProperty(this.el.nativeElement, 'value', res.value)
          })
          .catch(e => console.log(e))
      })
  }

}

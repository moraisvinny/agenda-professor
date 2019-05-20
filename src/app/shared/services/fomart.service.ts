import { Injectable } from '@angular/core';
import { Globalization } from '@ionic-native/globalization/ngx';

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  constructor(private globalization: Globalization) { }

  formataData(data: Date) {
    return this.globalization
      .dateToString(data, { formatLength: 'short', selector: 'date and time' })
      .then(res => res.value)

  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Globalization } from '@ionic-native/globalization/ngx';

@Component({
  selector: 'app-cadastro-evento',
  templateUrl: './cadastro-evento.component.html',
  styleUrls: ['./cadastro-evento.component.scss'],
})
export class CadastroEventoComponent implements OnInit {

  formEvento: FormGroup
  dataPura: Date;

  constructor(
    private datePicker: DatePicker,
    private storage: StorageService,
    private globalization: Globalization,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.iniciaForm()
  }

  iniciaForm() {
    this.formEvento = this.fb.group({
      nome: ['', Validators.required],
      dataEvento: [null, Validators.required],
      local: '',
      notificar: false
    })
  }

  selectDate() {
    const now = new Date()

    this.datePicker.show({
      date: now,
      is24Hour: true,
      minDate: now,
      allowOldDates:false,
      mode: 'datetime',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date => {
        this.dataPura = new Date(date)
        this.globalization.dateToString(this.dataPura, { formatLength: 'short', selector: 'date and time' })
          .then(res => {
            this.formEvento.get('dataEvento').setValue(res.value)
          })
          .catch(e => console.log(e))

      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  onSubmit() {
    if (this.formEvento.touched && this.formEvento.valid) {
      console.log(this.formEvento.controls)
    }
  }

}

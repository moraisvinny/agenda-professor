import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Globalization } from '@ionic-native/globalization/ngx';
import { EventoModel } from 'src/app/shared/models/evento.model';
import { Router } from '@angular/router';
import { Toast } from '@ionic-native/toast/ngx';
import { FormatService } from 'src/app/shared/services/fomart.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

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
    private router: Router,
    private toast: Toast,
    private format: FormatService,
    private fb: FormBuilder,
    private notify: LocalNotifications) { }

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
        this.format.formataData(this.dataPura)
          .then(res => this.formEvento.get('dataEvento').setValue(res))

      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  onSubmit() {
    if (this.formEvento.touched && this.formEvento.valid) {
      const evento = new EventoModel()
      evento.dataEvento = this.dataPura
      evento.local = this.formEvento.get('local').value
      evento.nome = this.formEvento.get('nome').value
      evento.notificacao = this.formEvento.get('notificar').value

      this.storage.salvaEvento(evento)
        .subscribe(
          resp => {
            this.notify.schedule({
              title: 'Está quase na hora!',
              text: `Está na hora do seu evento: ${evento.nome}`,
              trigger: { at: new Date(evento.dataEvento.getTime()) },
              foreground: true
            })
            this.router.navigate([''])
            this.toast.show('Evento cadastrado', '2500', 'bottom')
              .subscribe()
          },
          err => {
            console.log(err)
            this.toast.show('Ocorreu um erro no cadastro', '2500', 'bottom').subscribe()
          })
    }
  }

}

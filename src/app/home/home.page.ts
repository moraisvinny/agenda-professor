import { Component, OnInit } from '@angular/core';
import { StorageService } from '../shared/services/storage.service';
import { EventoModel } from '../shared/models/evento.model';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  eventos: EventoModel[]

  constructor(private storage: StorageService, private background: BackgroundMode, private notify: LocalNotifications) {

  }

  ngOnInit(): void {
    if (!this.background.isEnabled())
      this.background.enable()

    this.storage.listaEventos()
      .subscribe(eventos => {
        this.eventos = eventos
        eventos.forEach((evento) => {
          this.notify.schedule({
            title: 'Está quase na hora!',
            text: `Está na hora do seu evento: ${evento.nome}`,
            trigger: { at: new Date(evento.dataEvento.getTime()) },
            foreground: true
          })
        })
      })
  }

}

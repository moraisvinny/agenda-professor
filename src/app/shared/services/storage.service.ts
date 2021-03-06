import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventoModel } from '../models/evento.model'

@Injectable({

  providedIn: 'root'

})

export class StorageService {

  sessaoLogada: boolean = false

  constructor(private storage: Storage) { }

  usuarioExiste(): Observable<any> {

    return new Observable((obs => {
      this.storage.get('usuario')
        .then(resp => obs.next(resp))
        .catch(err => obs.error(err))
        .finally(() => obs.complete())
    }))
  }

  salvaUsuario(nome: string, email: string, senha: string, avatar: any): Observable<any> {
    return new Observable((obs => {
      this.storage.set('usuario', { email: email, senha: senha, avatar: avatar })
        .then(resp => obs.next(resp))
        .catch(err => obs.error(err))
        .finally(() => obs.complete())
    }))

  }

  isUsuarioLogado(): Observable<boolean> {

    return from(this.storage.get('logado'))
      .pipe(map(isLogado => isLogado || this.sessaoLogada))

  }

  salvalogado() {
    this.storage.set('logado', true)
  }

  login(email: string, senha: string): Observable<boolean> {
    return from(this.storage.get('usuario'))
      .pipe(map(usuario => {
        if (!usuario) return false
        if (usuario.email !== email) return false
        if (usuario.senha !== senha) return false
        return true
      }))

  }

  removeLogado() {
    this.storage.remove('logado')
  }

  salvaEvento(evento: EventoModel): Observable<any> {
    return from(this.storage.get('eventos')
      .then(eventos => {
        if(eventos) 
          eventos.push(evento)
        else 
          eventos = [evento]
        this.storage
          .set('eventos', eventos)
          .catch(err => { throw new Error('Erro na inclusão') })
      }))

  }

  listaEventos(): Observable<EventoModel[]> {
    return from (this.storage.get('eventos'))
  }
}

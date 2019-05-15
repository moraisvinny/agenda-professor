import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, from } from 'rxjs';

@Injectable({

  providedIn: 'root'

})

export class StorageService {

  constructor(private storage: Storage) { }

  usuarioExiste(): Observable<any> {

    return new Observable((obs => {
      this.storage.get('usuario')
        .then(resp => obs.next(resp))
        .catch(err => obs.error(err))
        .finally(() => obs.complete())
    }))
  }

  salvaUsuario(email: string, senha: string, avatar: any): Observable<any> {
    return new Observable((obs => {
      this.storage.set('usuario', { email: email, senha: senha, avatar: avatar })
        .then(resp => obs.next(resp))
        .catch(err => obs.error(err))
        .finally(() => obs.complete())
    }))

  }

  isUsuarioLogado(): Observable<boolean> {

    return from(this.storage.get('logado'))

  }
}

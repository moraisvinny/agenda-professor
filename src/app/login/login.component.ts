import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../shared/services/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup
  msgErro: string
  manterLogado: boolean = false

  constructor(
    private router: Router,
    private storage: StorageService,
    private fb: FormBuilder) { }

  ngOnInit() {
    
    // this.storage
    //   .usuarioExiste()
    //   .subscribe(resp => {
    //     if(!resp) this.router.navigate(['/cadastro/usuario'])
    //   })

    this.iniciaForm()
  }
  iniciaForm() {
    this.formLogin = this.fb.group({
      email: ['', Validators.email],
      senha: ['', Validators.required]
    })
  }

  onSubmit() {

    if (this.formLogin.invalid) {
      this.msgErro = 'Preencha corretamente E-mail e Senha para entrar'
      return
    }

    this.msgErro = null
    this.storage.login(
      this.formLogin.get('email').value,
      this.formLogin.get('senha').value
    ).subscribe(ret => {
      if(!ret) {
        this.msgErro = 'E-mail e/ou senha inválidos'
        return
      } else {
        this.storage.sessaoLogada = true
        if(this.manterLogado) this.storage.salvalogado()
        this.router.navigate(['/home'])

      }
    })

  }

}

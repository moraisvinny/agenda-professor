import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Toast } from '@ionic-native/toast/ngx'
import { Router } from '@angular/router';
import { Camera, CameraOptions, Direction } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';


 
@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss'],
})
export class CadastroUsuarioComponent implements OnInit {

  formCadastro: FormGroup;
  formularioInvalido: boolean;
  cameraOptions: CameraOptions = {
    quality: 90,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit: true,
    targetHeight: 250,
    targetWidth: 250,
    cameraDirection: Direction.FRONT

  }
  avatar: any = null

  constructor(
    private storage: StorageService,
    private fb: FormBuilder,
    private router: Router,
    private toast: Toast,
    private camera: Camera,
    private webview: WebView) { }

  ngOnInit() {
    this.iniciaForm()
  }
  iniciaForm() {
    this.formCadastro = this.fb.group({
      nome: ['', Validators.required],
      email: ['', Validators.email],
      repeteSenha: ['', Validators.required],
      senha: ['', Validators.required]
    })
    this.formCadastro.setValidators(this.senhaValidator)
  }

  senhaValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const senha = control.get('senha')
    const repeteSenha = control.get('repeteSenha')
  
    return senha.value === repeteSenha.value ? null : { 'senha': true }
  };

  onSubmit() {
    if(this.formCadastro.valid && this.formCadastro.touched) {
      this.formularioInvalido = false
      const sub = this.storage.salvaUsuario(
        this.formCadastro.get('email').value,
        this.formCadastro.get('senha').value,
        this.avatar
      ).subscribe(
        (resp) => {
          this.toast.show('Usuário cadastrado', '2500', 'bottom')
            .subscribe(toast => this.router.navigate(['/login']))
        },
        (err) => this.toast.show('Ocorreu um erro', '3000', 'center').subscribe(toast => console.log(toast)),
        () => sub.unsubscribe())
        
    } else {
      this.formularioInvalido = true
    }
  }

  capturaFoto() {
    this.camera
      .getPicture(this.cameraOptions)
      .then((imageData) => {
        this.avatar = this.webview.convertFileSrc(imageData)
        console.log(imageData)
      })
  }


}

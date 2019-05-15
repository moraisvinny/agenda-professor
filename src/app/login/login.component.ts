import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../shared/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private storage: StorageService) { }

  ngOnInit() {
    // this.storage
    //   .usuarioExiste()
    //   .subscribe(resp => {
    //     if(!resp) this.router.navigate(['/cadastro/usuario'])
    //   })
  }

}

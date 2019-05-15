import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { CadastroEventoComponent } from './cadastro-evento/cadastro-evento.component';
import { DatePicker } from '@ionic-native/date-picker/ngx';

@NgModule({
  declarations: [CadastroUsuarioComponent, CadastroEventoComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'usuario', component: CadastroUsuarioComponent },
      { path: 'evento', component: CadastroEventoComponent },
      { path: 'evento/:codigoEvento', component: CadastroEventoComponent }
    ])
  ],
  providers: [
    DatePicker
  ]
})
export class CadastroModule { }

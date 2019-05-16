import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { IonicModule } from '@ionic/angular';
import { CadastroEventoComponent } from './cadastro-evento/cadastro-evento.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { DirectivesModule } from '../shared/directives/directives.module'

@NgModule({
  declarations: [CadastroUsuarioComponent, CadastroEventoComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    DirectivesModule,
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

import { Component, inject } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  usuario!: string;
  senha!: string;

  router = inject(Router);

  logar(){
    if(this.usuario == 'admin' && this.senha == 'admin'){
      this.router.navigate(['admin/carros']);
    }else{
      alert('Usuário ou senha invalida!')
    }
  }

}

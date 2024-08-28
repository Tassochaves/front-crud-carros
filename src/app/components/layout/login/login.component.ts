import { Component, inject } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../auth/login.service';
import { Login } from '../../../models/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  login: Login = new Login();
  usuario!: string;
  senha!: string;

  router = inject(Router);

  loginService= inject(LoginService);

  logar(){
    this.loginService.logar(this.login).subscribe({
      next: token => {
        if(token){
          this.loginService.addToken(token);
        }else{
          alert('Usuario ou senha incorreta!');
        }
      }, error: erro => {
        alert('Erro ao logar!');
      }
    });
  }

}

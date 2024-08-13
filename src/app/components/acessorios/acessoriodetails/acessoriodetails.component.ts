import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Acessorio } from '../../../models/acessorio';
import { AcessorioService } from '../../../services/acessorio.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

@Component({
  selector: 'app-acessoriodetails',
  standalone: true,
  imports: [MdbFormsModule, ReactiveFormsModule, FormsModule],
  templateUrl: './acessoriodetails.component.html',
  styleUrl: './acessoriodetails.component.scss'
})
export class AcessoriodetailsComponent {
  @Input("acessorio")
   acessorio: Acessorio = new Acessorio(0, "");

  @Output("retorno")
  retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute);
  routeRedirect = inject(Router);

  acessorioService = inject(AcessorioService);

  constructor(){

    let id = this.router.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }
  }

  findById(id: number){
    this.acessorioService.findById(id).subscribe({
      next: retorno =>{
        this.acessorio = retorno;
      },
      error: erro => {
        Swal.fire({
          title: 'Ocorreu um erro!',
          icon: 'error',
          confirmButtonColor: "#3085d6",
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  save(){
    if(this.acessorio.id > 0){
      //Alterar um acessorio
      this.acessorioService.update(this.acessorio, this.acessorio.id).subscribe({
        next: mensagem =>{
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonColor: "#3085d6",
            confirmButtonText: 'Ok'
          });

          this.routeRedirect.navigate(['admin/acessorios'], {state: {acessorioEditado: this.acessorio}});
          this.retorno.emit(this.acessorio);
        },
        error: erro => {
          Swal.fire({
            title: 'Ocorreu um erro!',
            icon: 'error',
            confirmButtonColor: "#3085d6",
            confirmButtonText: 'Ok'
          });
        }
      });
    }else{

      //Criar novo acessorio
      this.acessorioService.save(this.acessorio).subscribe({
        next: mensagem =>{
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonColor: "#3085d6",
            confirmButtonText: 'Ok'
          });

          this.routeRedirect.navigate(['admin/acessorios'], {state: {acessorioNovo: this.acessorio}});
          this.retorno.emit(this.acessorio);
        },
        error: erro => {
          Swal.fire({
            title: 'Ocorreu um erro!',
            icon: 'error',
            confirmButtonColor: "#3085d6",
            confirmButtonText: 'Ok'
          });
        }
      });
    }
  }
}

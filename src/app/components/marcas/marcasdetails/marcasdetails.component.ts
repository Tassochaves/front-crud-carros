import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Marca } from '../../../models/marca';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MarcaService } from '../../../services/marca.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

@Component({
  selector: 'app-marcasdetails',
  standalone: true,
  imports: [MdbFormsModule, ReactiveFormsModule, FormsModule],
  templateUrl: './marcasdetails.component.html',
  styleUrl: './marcasdetails.component.scss'
})
export class MarcasdetailsComponent {

  @Input("marca")
   marca: Marca = new Marca(0, "");

  @Output("retorno")
  retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute);
  routeRedirect = inject(Router);

  marcaService = inject(MarcaService);

  constructor(){

    let id = this.router.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }
  }

  findById(id: number){
    this.marcaService.findById(id).subscribe({
      next: retorno =>{
        this.marca = retorno;
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
    if(this.marca.id > 0){
      //Alterar um marca
      this.marcaService.update(this.marca, this.marca.id).subscribe({
        next: mensagem =>{
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonColor: "#3085d6",
            confirmButtonText: 'Ok'
          });

          this.routeRedirect.navigate(['admin/marcas'], {state: {marcaEditado: this.marca}});
          this.retorno.emit(this.marca);
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

      //Criar novo marca
      this.marcaService.save(this.marca).subscribe({
        next: mensagem =>{
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonColor: "#3085d6",
            confirmButtonText: 'Ok'
          });

          this.routeRedirect.navigate(['admin/marcas'], {state: {marcaNovo: this.marca}});
          this.retorno.emit(this.marca);
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

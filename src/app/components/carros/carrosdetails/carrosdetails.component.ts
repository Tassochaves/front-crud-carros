import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Carro } from '../../../models/carro';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrosdetails',
  standalone: true,
  imports: [MdbFormsModule, ReactiveFormsModule, FormsModule],
  templateUrl: './carrosdetails.component.html',
  styleUrl: './carrosdetails.component.scss'
})
export class CarrosdetailsComponent {

  @Input("carro") 
   carro: Carro = new Carro(0, "");

  @Output("retorno")
  retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute);
  routeRedirect = inject(Router);

  constructor(){

    let id = this.router.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }
  }

  findById(id: number){
    let carroRetornado: Carro = new Carro(id, "Hilux");
    this.carro = carroRetornado;
  }

  salvar(){
    if(this.carro.id > 0){
      Swal.fire({
        title: 'Editado com sucesso!',
        icon: 'success',
        confirmButtonColor: "#3085d6",
        confirmButtonText: 'Ok'
      });
      this.routeRedirect.navigate(['admin/carros'], {state: {carroEditado: this.carro}});
    }else{
      Swal.fire({
        title: 'Salvo com sucesso!',
        icon: 'success',
        confirmButtonColor: "#3085d6",
        confirmButtonText: 'Ok'
      });
      this.routeRedirect.navigate(['admin/carros'], {state: {carroNovo: this.carro}});
    }

    this.retorno.emit(this.carro);
  }
}

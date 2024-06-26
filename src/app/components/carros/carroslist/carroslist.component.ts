import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { Carro } from '../../../models/carro';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

import Swal from 'sweetalert2';
import { CarrosdetailsComponent } from "../carrosdetails/carrosdetails.component";
import { CarroService } from '../../../services/carro.service';

@Component({
    selector: 'app-carroslist',
    standalone: true,
    templateUrl: './carroslist.component.html',
    styleUrl: './carroslist.component.scss',
    imports: [RouterLink, MdbModalModule, CarrosdetailsComponent]
})
export class CarroslistComponent {

  //Elementos de Modal
  modalService = inject(MdbModalService);

  @ViewChild('modalCarroDetalhe')
  modalCarroDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  lista: Carro[] = [];
  carroEdit: Carro = new Carro(0, "", null);

  carroService = inject(CarroService);

  constructor(){
    let carroNovo = history.state.carroNovo;
    let carroEditado = history.state.carroEditado;

    if(carroNovo){
      carroNovo.id = 12;
      this.lista.push(carroNovo);
    }

    if(carroEditado){
      let indice = this.lista.findIndex(x => {return x.id == carroEditado.id});
      this.lista[indice] = carroEditado;
    }

    this.listAll();
  }

  modal(){
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  listAll(){
    this.carroService.listAll().subscribe({
      next: listaBack => {
        this.lista = listaBack;
        console.log(listaBack);
      },
      error: erro =>{
        Swal.fire({
          title: 'Ocorreu um erro!',
          icon: 'error',
          confirmButtonColor: "#3085d6",
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  deleteById(carro: Carro){
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if(result.isConfirmed){

        this.carroService.delete(carro.id).subscribe({
          next: mensagemBack => {
            Swal.fire({
              title: mensagemBack,
              icon: 'success',
              confirmButtonColor: "#3085d6",
              confirmButtonText: 'Ok'
            });

            this.listAll();
          },
          error: erro =>{
            Swal.fire({
              title: 'Ocorreu um erro!',
              icon: 'error',
              confirmButtonColor: "#3085d6",
              confirmButtonText: 'Ok'
            });
          }
        });

      }
    });

  }

  newCar(){
    this.carroEdit = new Carro(0, "", null);
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  edit(carro: Carro){
    this.carroEdit = Object.assign({}, carro);
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  retornoDetalhe(carro: Carro){
    this.listAll();
    this.modalRef.close();
  }
}

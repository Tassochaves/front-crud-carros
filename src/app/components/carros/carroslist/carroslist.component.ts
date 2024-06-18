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
  carroEdit: Carro = new Carro(0, "");

  constructor(private carrosService: CarroService){

    this.lista.push(new Carro(1, "Fiesta"));
    this.lista.push(new Carro(2, "Uno"));
    this.lista.push(new Carro(3, "Hilux"));
    this.lista.push(new Carro(4, "S10"));

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

    this.findAll();
  }

  modal(){
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  findAll(){
    this.carrosService.findAll().subscribe({
      next: lista => {
        this.lista = lista;
        console.log(lista);
      },
      error: erro =>{
        alert('Erro encontado!');
        console.error(erro);
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
        let indice = this.lista.findIndex(x => {return x.id == carro.id});
        this.lista.splice(indice, 1);

        Swal.fire({
          title: 'Deletado com sucesso!',
          icon: 'success',
          confirmButtonColor: "#3085d6",
          confirmButtonText: 'Ok'
        });
      }
    });

  }

  newCar(){
    this.carroEdit = new Carro(0, "");
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  edit(carro: Carro){
    this.carroEdit = Object.assign({}, carro);
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  retornoDetalhe(carro: Carro){

    if(carro.id > 0){
      let indice = this.lista.findIndex(x => {return x.id == carro.id});
      this.lista[indice] = carro;
    }else{
      carro.id = 55;
      this.lista.push(carro);
    }

    this.modalRef.close();
  }
}

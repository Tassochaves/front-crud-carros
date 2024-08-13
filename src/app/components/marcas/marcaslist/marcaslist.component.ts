import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

import Swal from 'sweetalert2';
import { MarcasdetailsComponent } from '../marcasdetails/marcasdetails.component';
import { Marca } from '../../../models/marca';
import { MarcaService } from '../../../services/marca.service';

@Component({
  selector: 'app-marcaslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, MarcasdetailsComponent],
  templateUrl: './marcaslist.component.html',
  styleUrl: './marcaslist.component.scss'
})
export class MarcaslistComponent {

  marcaService = inject(MarcaService);

  @Input("ocultarBotoes")
  ocultarBotoes: boolean = false;

  @Output("retorno")
  retorno = new EventEmitter<any>();

  //Elementos de Modal
  modalService = inject(MdbModalService);

  @ViewChild('modalMarcaDetalhe')
  modalMarcaDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  lista: Marca[] = [];
  marcaEdit: Marca = new Marca(0, "");

  constructor(){
    let marcaNova = history.state.marcaNova;
    let marcaEditada = history.state.marcaEditada;

    if(marcaNova){
      marcaNova.id = 12;
      this.lista.push(marcaNova);
    }

    if(marcaEditada){
      let indice = this.lista.findIndex(x => {return x.id == marcaEditada.id});
      this.lista[indice] = marcaEditada;
    }

    this.listAll();
  }

  modal(){
    this.modalRef = this.modalService.open(this.modalMarcaDetalhe);
  }

  listAll(){
    this.marcaService.listAll().subscribe({
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

  deleteById(marca: Marca){
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

        this.marcaService.delete(marca.id).subscribe({
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
    this.marcaEdit = new Marca(0, "");
    this.modalRef = this.modalService.open(this.modalMarcaDetalhe);
  }

  edit(marca: Marca){
    this.marcaEdit = Object.assign({}, marca);
    this.modalRef = this.modalService.open(this.modalMarcaDetalhe);
  }

  retornoDetalhe(marca: Marca){
    this.listAll();
    this.modalRef.close();
  }

  selectMarca(marca: Marca){
    this.retorno.emit(marca);
  }
}

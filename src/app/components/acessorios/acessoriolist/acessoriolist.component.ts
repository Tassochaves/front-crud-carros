import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { Acessorio } from '../../../models/acessorio';
import { MdbModalService, MdbModalRef, MdbModalModule } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { AcessorioService } from '../../../services/acessorio.service';
import { AcessoriodetailsComponent } from '../acessoriodetails/acessoriodetails.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-acessoriolist',
  standalone: true,
  imports: [AcessoriodetailsComponent, RouterLink, MdbModalModule],
  templateUrl: './acessoriolist.component.html',
  styleUrl: './acessoriolist.component.scss'
})
export class AcessoriolistComponent {

  acessorioService = inject(AcessorioService);

  @Input("ocultarBotoes")
  ocultarBotoes: boolean = false;

  @Output("retorno")
  retorno = new EventEmitter<any>();

  //Elementos de Modal
  modalService = inject(MdbModalService);

  @ViewChild('modalAcessorioDetalhe')
  modalAcessorioDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  lista: Acessorio[] = [];
  acessorioEdit: Acessorio = new Acessorio(0, "");

  constructor(){
    let acessorioNova = history.state.acessorioNova;
    let acessorioEditada = history.state.acessorioEditada;

    if(acessorioNova){
      acessorioNova.id = 12;
      this.lista.push(acessorioNova);
    }

    if(acessorioEditada){
      let indice = this.lista.findIndex(x => {return x.id == acessorioEditada.id});
      this.lista[indice] = acessorioEditada;
    }

    this.listAll();
  }

  modal(){
    this.modalRef = this.modalService.open(this.modalAcessorioDetalhe);
  }

  listAll(){
    this.acessorioService.listAll().subscribe({
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

  deleteById(acessorio: Acessorio){
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

        this.acessorioService.delete(acessorio.id).subscribe({
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
    this.acessorioEdit = new Acessorio(0, "");
    this.modalRef = this.modalService.open(this.modalAcessorioDetalhe);
  }

  edit(acessorio: Acessorio){
    this.acessorioEdit = Object.assign({}, acessorio);
    this.modalRef = this.modalService.open(this.modalAcessorioDetalhe);
  }

  retornoDetalhe(acessorio: Acessorio){
    this.listAll();
    this.modalRef.close();
  }

  select(acessorio: Acessorio){
    this.retorno.emit(acessorio);
  }

  selectAcessorio(acessorio: Acessorio){
    this.retorno.emit(acessorio);
  }
}

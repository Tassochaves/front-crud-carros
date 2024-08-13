import { CarroService } from './../../../services/carro.service';
import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Carro } from '../../../models/carro';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Marca } from '../../../models/marca';
import { MarcaslistComponent } from "../../marcas/marcaslist/marcaslist.component";
import { MdbModalService, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AcessoriolistComponent } from "../../acessorios/acessoriolist/acessoriolist.component";
import { Acessorio } from '../../../models/acessorio';

@Component({
    selector: 'app-carrosdetails',
    standalone: true,
    templateUrl: './carrosdetails.component.html',
    styleUrl: './carrosdetails.component.scss',
    imports: [MdbFormsModule, ReactiveFormsModule, FormsModule, MarcaslistComponent, AcessoriolistComponent]
})
export class CarrosdetailsComponent {

  @Input("carro")
   carro: Carro = new Carro(0, "", null);

  @Output("retorno")
  retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute);
  routeRedirect = inject(Router);

  carroService = inject(CarroService);

  //Elementos de Modal
  modalService = inject(MdbModalService);

  @ViewChild('modalMarcas')
  modalMarcas!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  @ViewChild('modalAcessorios')
  modalAcessorios!: TemplateRef<any>;

  constructor(){

    let id = this.router.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }
  }

  findById(id: number){
    this.carroService.findById(id).subscribe({
      next: retorno =>{
        this.carro = retorno;
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
    if(this.carro.id > 0){
      //Alterar um carro
      this.carroService.update(this.carro, this.carro.id).subscribe({
        next: mensagem =>{
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonColor: "#3085d6",
            confirmButtonText: 'Ok'
          });

          this.routeRedirect.navigate(['admin/carros'], {state: {carroEditado: this.carro}});
          this.retorno.emit(this.carro);
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

      //Criar novo carro
      this.carroService.save(this.carro).subscribe({
        next: mensagem =>{
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonColor: "#3085d6",
            confirmButtonText: 'Ok'
          });

          this.routeRedirect.navigate(['admin/carros'], {state: {carroNovo: this.carro}});
          this.retorno.emit(this.carro);
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

  buscarMarca(){
    this.modalRef = this.modalService.open(this.modalMarcas);
  }

  buscarAcessorio(){
    this.modalRef = this.modalService.open(this.modalAcessorios);
  }

  retornoMarca(marca: Marca){
    this.carro.marca = marca;
    this.modalRef.close();
  }

  retornoAcessorio(acessorio: Acessorio){
    if(this.carro.acessorios == null){
      this.carro.acessorios = [];
    }

    this.carro.acessorios.push(acessorio);

    this.modalRef.close();
  }

  desvincularAcessorioCarro(acessorio: Acessorio){
    let posicao = this.carro.acessorios.findIndex(x => {return x.id == acessorio.id});
    this.carro.acessorios.splice(posicao, 1);
  }
}

import { Component } from '@angular/core';
import { Carro } from '../../../models/carro';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carroslist',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './carroslist.component.html',
  styleUrl: './carroslist.component.scss'
})
export class CarroslistComponent {

  lista: Carro[] = [];

  constructor(){

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
}

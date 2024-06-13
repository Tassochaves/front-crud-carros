import { Component } from '@angular/core';
import { Carro } from '../../../models/carro';
import { RouterLink } from '@angular/router';

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
  }

  deletar(){

  }
}

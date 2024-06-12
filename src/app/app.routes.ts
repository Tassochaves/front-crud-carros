import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CarroListComponent } from './components/carro-list/carro-list.component';

export const routes: Routes = [
  {path: "", redirectTo: "dashboard", pathMatch: 'full'},
  {path: "dashboard", component: DashboardComponent},
  {path: "carros", component: CarroListComponent}
];

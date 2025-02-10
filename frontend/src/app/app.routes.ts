import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProveedorComponent } from './pages/proveedor/proveedor.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { PagoComponent } from './pages/pago/pago.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { MuebleComponent } from './pages/mueble/mueble.component';
import { VentaComponent } from './pages/ventas/ventas.component';
import { ReportesComponent } from './pages/reportes/reportes.component';

export const routes: Routes = [
  // { path: '', redirectTo: 'inicio', pathMatch: 'full' }, // Cliente será la primera vista
  { path: '', component: LoginComponent },
  { path: 'proveedor', component: ProveedorComponent },
  { path: 'pago', component: PagoComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'empleados', component: EmpleadosComponent },
  { path: 'muebles', component: MuebleComponent },
  { path: 'ventas', component: VentaComponent },
  { path: 'reportes', component: ReportesComponent },
];

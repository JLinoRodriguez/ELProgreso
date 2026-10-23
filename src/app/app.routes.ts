import { Routes } from '@angular/router';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard/bienvenida', pathMatch: 'full' },
  { path: 'dashboard', redirectTo: 'dashboard/bienvenida', pathMatch: 'full' },
  { path: 'dashboard/bienvenida', component: BienvenidaComponent, title: 'Inicio | Distribuciones El Progreso' },
  { path: 'dashboard/clientes', component: ClientesComponent, title: 'Clientes | Distribuciones El Progreso' },
  { path: 'dashboard/empleados', component: EmpleadosComponent, title: 'Empleados | Distribuciones El Progreso' },
  { path: 'dashboard/productos', component: ProductosComponent, title: 'Productos | Distribuciones El Progreso' },
  { path: 'dashboard/reportes', component: ReportesComponent, title: 'Reportes | Distribuciones El Progreso' },
  { path: 'dashboard/usuarios', component: UsuariosComponent, title: 'Usuarios API | Distribuciones El Progreso' },
  // Rutas de compatibilidad directa
  { path: 'bienvenida', redirectTo: 'dashboard/bienvenida', pathMatch: 'full' },
  { path: 'clientes', redirectTo: 'dashboard/clientes', pathMatch: 'full' },
  { path: 'empleados', redirectTo: 'dashboard/empleados', pathMatch: 'full' },
  { path: 'productos', redirectTo: 'dashboard/productos', pathMatch: 'full' },
  { path: 'reportes', redirectTo: 'dashboard/reportes', pathMatch: 'full' },
  { path: 'usuarios', redirectTo: 'dashboard/usuarios', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard/bienvenida' }
];

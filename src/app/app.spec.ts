import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { AuthService } from './services/auth.service';
import { DashboardService } from './services/dashboard.service';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    // Limpiar localStorage antes de cada prueba
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [AuthService, DashboardService, provideRouter(routes)]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render brand title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.brand-title')?.textContent).toContain('El Progreso');
  });

  it('should initialize with login tab active', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.activeTab()).toBe('login');
  });

  it('debe ingresar al dashboard tras iniciar sesión y mostrar la barra lateral con las secciones requeridas', async () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    const authService = TestBed.inject(AuthService);

    // Registrar y autenticar un usuario
    authService.register('Usuario Demo', 'demo@elprogreso.com', '123456');
    authService.login('demo@elprogreso.com', '123456');

    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;

    // Verificar que el contenedor del dashboard está activo
    expect(compiled.querySelector('.dashboard-container')).toBeTruthy();
    expect(compiled.querySelector('.dashboard-sidebar')).toBeTruthy();

    // Verificar las 5 secciones requeridas en el sidebar: clientes, empleados, productos, reportes, usuarios
    expect(compiled.querySelector('#nav-clientes')).toBeTruthy();
    expect(compiled.querySelector('#nav-empleados')).toBeTruthy();
    expect(compiled.querySelector('#nav-productos')).toBeTruthy();
    expect(compiled.querySelector('#nav-reportes')).toBeTruthy();
    expect(compiled.querySelector('#nav-usuarios')).toBeTruthy();
  });

  it('debe cambiar de sección en el dashboard al llamar switchSection', async () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    const authService = TestBed.inject(AuthService);

    authService.register('Usuario Demo', 'demo@elprogreso.com', '123456');
    authService.login('demo@elprogreso.com', '123456');

    app.switchSection('usuarios');
    expect(app.activeSection()).toBe('usuarios');

    app.switchSection('productos');
    expect(app.activeSection()).toBe('productos');

    app.switchSection('empleados');
    expect(app.activeSection()).toBe('empleados');

    app.switchSection('reportes');
    expect(app.activeSection()).toBe('reportes');

    app.switchSection('clientes');
    expect(app.activeSection()).toBe('clientes');
  });

  it('debe cerrar sesión y regresar al formulario de login', async () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    const authService = TestBed.inject(AuthService);

    authService.register('Usuario Demo', 'demo@elprogreso.com', '123456');
    authService.login('demo@elprogreso.com', '123456');

    expect(app.currentUser()).not.toBeNull();

    app.onLogout();
    expect(app.currentUser()).toBeNull();
    expect(app.activeTab()).toBe('login');
  });

  it('debe tener el nombre oficial del sistema "Distribuciones El Progreso" en el encabezado', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.brand-title')?.textContent?.trim()).toBe('Distribuciones El Progreso');
  });

  it('debe guardar datos de usuarios con localStorage.setItem y permitir recuperarlos', () => {
    const authService = TestBed.inject(AuthService);
    authService.register('Laura Gómez', 'laura@progreso.com', 'secreta123');

    // Comprobar que localStorage.getItem recupera los datos guardados con setItem
    const stored = localStorage.getItem('elprogreso_usuarios');
    expect(stored).not.toBeNull();
    const users = JSON.parse(stored!);
    expect(users.some((u: any) => u.email === 'laura@progreso.com')).toBe(true);
  });

  it('debe incluir el acceso directo a la vista de bienvenida en el sidebar del dashboard', async () => {
    const fixture = TestBed.createComponent(App);
    const authService = TestBed.inject(AuthService);

    authService.register('Usuario Demo', 'demo@elprogreso.com', '123456');
    authService.login('demo@elprogreso.com', '123456');

    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const navBienvenida = compiled.querySelector('#nav-bienvenida');
    expect(navBienvenida).toBeTruthy();
    expect(navBienvenida?.getAttribute('routerlink')).toBe('/dashboard/bienvenida');
  });
});


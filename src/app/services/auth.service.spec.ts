import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('debe registrar un nuevo usuario y guardarlo en localStorage', () => {
    const res = service.register('Carlos Pérez', 'carlos@ejemplo.com', '123456');
    expect(res.success).toBe(true);

    const users = service.getStoredUsers();
    expect(users.length).toBe(1);
    expect(users[0].name).toBe('Carlos Pérez');
    expect(users[0].email).toBe('carlos@ejemplo.com');
  });

  it('no debe permitir registrar dos veces el mismo correo', () => {
    service.register('Carlos Pérez', 'carlos@ejemplo.com', '123456');
    const duplicate = service.register('Carlos Clone', 'carlos@ejemplo.com', '987654');
    expect(duplicate.success).toBe(false);
    expect(duplicate.message).toContain('Ya existe un usuario registrado');
  });

  it('debe validar credenciales correctamente en el login desde localStorage', () => {
    service.register('Ana Gómez', 'ana@ejemplo.com', 'segura123');

    // Intento con contraseña errónea
    const badLogin = service.login('ana@ejemplo.com', 'erronea');
    expect(badLogin.success).toBe(false);

    // Intento con datos correctos
    const goodLogin = service.login('ana@ejemplo.com', 'segura123');
    expect(goodLogin.success).toBe(true);
    expect(service.currentUser()?.email).toBe('ana@ejemplo.com');
  });

  it('debe cerrar sesión correctamente', () => {
    service.register('Ana Gómez', 'ana@ejemplo.com', 'segura123');
    service.login('ana@ejemplo.com', 'segura123');
    expect(service.currentUser()).not.toBeNull();

    service.logout();
    expect(service.currentUser()).toBeNull();
  });
});

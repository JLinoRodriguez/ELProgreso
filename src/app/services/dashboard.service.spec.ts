import { TestBed } from '@angular/core/testing';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardService);
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debe proveer datos simulados para clientes, empleados, productos y reportes', () => {
    expect(service.clientes().length).toBeGreaterThan(0);
    expect(service.empleados().length).toBeGreaterThan(0);
    expect(service.productos().length).toBeGreaterThan(0);
    expect(service.reportes().totalRevenue).toBeGreaterThan(0);
    expect(service.monthlySales.length).toBe(6);
    expect(service.activityLogs.length).toBeGreaterThan(0);
  });

  it('debe cargar usuarios desde la API externa de JSONPlaceholder', async () => {
    const mockUsers = [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
          geo: { lat: '-37.3159', lng: '81.1496' }
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
          name: 'Romaguera-Crona',
          catchPhrase: 'Multi-layered client-server neural-net',
          bs: 'harness real-time e-markets'
        }
      }
    ];

    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () =>
      ({
        ok: true,
        json: async () => mockUsers
      } as any);

    try {
      await service.loadApiUsers();
      expect(service.apiUsers().length).toBe(1);
      expect(service.apiUsers()[0].name).toBe('Leanne Graham');
      expect(service.loadingApiUsers()).toBe(false);
      expect(service.apiUsersError()).toBeNull();
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it('debe manejar errores si falla la conexión a la API', async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => {
      throw new Error('Fallo de red simulado');
    };

    try {
      await service.refreshApiUsers();
      expect(service.apiUsers().length).toBe(0);
      expect(service.apiUsersError()).toContain('Fallo de red simulado');
      expect(service.loadingApiUsers()).toBe(false);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});

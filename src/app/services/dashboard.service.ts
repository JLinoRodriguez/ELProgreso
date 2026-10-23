import { Injectable, signal } from '@angular/core';
import { ApiUser, Cliente, Empleado, Producto, ReporteKpis } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly JSONPLACEHOLDER_URL = 'https://jsonplaceholder.typicode.com/users';

  // ==========================================
  // USUARIOS API (jsonplaceholder.typicode.com)
  // ==========================================
  readonly apiUsers = signal<ApiUser[]>([]);
  readonly loadingApiUsers = signal<boolean>(false);
  readonly apiUsersError = signal<string | null>(null);

  // ==========================================
  // CLIENTES (Datos simulados)
  // ==========================================
  readonly clientes = signal<Cliente[]>([
    {
      id: 'CLI-001',
      name: 'Sofía Martínez',
      company: 'Logística Andina S.A.S.',
      email: 'sofia.martinez@andinalog.com',
      phone: '+57 310 445 8890',
      city: 'Bogotá',
      country: 'Colombia',
      status: 'Activo',
      totalSpent: 18450,
      lastOrder: '2026-10-18'
    },
    {
      id: 'CLI-002',
      name: 'Alejandro Morales',
      company: 'Soluciones Globales Tech',
      email: 'amorales@globalestech.io',
      phone: '+52 55 8923 1140',
      city: 'Ciudad de México',
      country: 'México',
      status: 'Activo',
      totalSpent: 32600,
      lastOrder: '2026-10-20'
    },
    {
      id: 'CLI-003',
      name: 'Camila Navarro',
      company: 'Distribuidora del Valle',
      email: 'cnavarro@distrivalle.com',
      phone: '+54 11 4821 7734',
      city: 'Buenos Aires',
      country: 'Argentina',
      status: 'Pendiente',
      totalSpent: 9150,
      lastOrder: '2026-10-12'
    },
    {
      id: 'CLI-004',
      name: 'Rodrigo Benítez',
      company: 'Farmacéutica Horizonte',
      email: 'rbenitez@horizontefarma.org',
      phone: '+56 9 7712 3004',
      city: 'Santiago',
      country: 'Chile',
      status: 'Activo',
      totalSpent: 45200,
      lastOrder: '2026-10-19'
    },
    {
      id: 'CLI-005',
      name: 'Elena Silva',
      company: 'Consultores EcoVerde',
      email: 'esilva@ecoverde.com',
      phone: '+51 1 650 9981',
      city: 'Lima',
      country: 'Perú',
      status: 'Inactivo',
      totalSpent: 4300,
      lastOrder: '2026-08-30'
    },
    {
      id: 'CLI-006',
      name: 'Marcos Villegas',
      company: 'Construcciones Del Sol',
      email: 'marcos@construcdelsol.com',
      phone: '+507 6890 2211',
      city: 'Ciudad de Panamá',
      country: 'Panamá',
      status: 'Activo',
      totalSpent: 27800,
      lastOrder: '2026-10-15'
    }
  ]);

  // ==========================================
  // EMPLEADOS (Datos simulados)
  // ==========================================
  readonly empleados = signal<Empleado[]>([
    {
      id: 'EMP-101',
      name: 'Lucía Fernández',
      role: 'Directora de Operaciones',
      department: 'Ventas',
      email: 'lucia.fernandez@elprogreso.com',
      phone: '+57 301 223 9988',
      status: 'Activo',
      joinDate: '2023-03-15',
      salary: 4800,
      avatarBg: '#6366f1'
    },
    {
      id: 'EMP-102',
      name: 'Javier Ramírez',
      role: 'Ingeniero de Software Senior',
      department: 'Desarrollo',
      email: 'javier.ramirez@elprogreso.com',
      phone: '+57 312 884 1022',
      status: 'Remoto',
      joinDate: '2023-08-01',
      salary: 4200,
      avatarBg: '#0ea5e9'
    },
    {
      id: 'EMP-103',
      name: 'Valentina Restrepo',
      role: 'Diseñadora UI/UX Lead',
      department: 'Desarrollo',
      email: 'valentina.restrepo@elprogreso.com',
      phone: '+57 315 771 9044',
      status: 'Activo',
      joinDate: '2024-01-10',
      salary: 3900,
      avatarBg: '#ec4899'
    },
    {
      id: 'EMP-104',
      name: 'Andrés Castro',
      role: 'Líder de Soporte Técnico',
      department: 'Soporte',
      email: 'andres.castro@elprogreso.com',
      phone: '+57 320 665 4410',
      status: 'Activo',
      joinDate: '2024-05-18',
      salary: 2800,
      avatarBg: '#10b981'
    },
    {
      id: 'EMP-105',
      name: 'Daniela Salazar',
      role: 'Especialista en Growth & Marketing',
      department: 'Marketing',
      email: 'daniela.salazar@elprogreso.com',
      phone: '+57 318 902 4433',
      status: 'Vacaciones',
      joinDate: '2023-11-20',
      salary: 3400,
      avatarBg: '#f59e0b'
    },
    {
      id: 'EMP-106',
      name: 'Mateo Cárdenas',
      role: 'Analista Financiero',
      department: 'Finanzas',
      email: 'mateo.cardenas@elprogreso.com',
      phone: '+57 310 119 7800',
      status: 'Remoto',
      joinDate: '2024-02-01',
      salary: 3600,
      avatarBg: '#8b5cf6'
    }
  ]);

  // ==========================================
  // PRODUCTOS (Datos simulados)
  // ==========================================
  readonly productos = signal<Producto[]>([
    {
      id: 'PRD-01',
      name: 'Suscripción ERP El Progreso Cloud',
      sku: 'SKU-ERP-CLD',
      category: 'Software',
      price: 189.99,
      stock: 999,
      minStock: 50,
      status: 'En stock',
      rating: 4.9,
      description: 'Gestión integral multi-sucursal con facturación electrónica y analítica de datos en tiempo real.'
    },
    {
      id: 'PRD-02',
      name: 'Servidor Torre Enterprise Pro X9',
      sku: 'SKU-SRV-TX9',
      category: 'Electrónica',
      price: 2450.00,
      stock: 14,
      minStock: 5,
      status: 'En stock',
      rating: 4.8,
      description: '32 Cores, 128GB RAM ECC, 4TB NVMe RAID-10 para misión crítica corporativa.'
    },
    {
      id: 'PRD-03',
      name: 'Módulo Facturación & Sincronización',
      sku: 'SKU-MOD-SYNC',
      category: 'Software',
      price: 79.50,
      stock: 450,
      minStock: 20,
      status: 'En stock',
      rating: 4.7,
      description: 'Sincronización híbrida de datos con alta disponibilidad y persistencia.'
    },
    {
      id: 'PRD-04',
      name: 'Kit de Monitores Dual IPS 27" 4K',
      sku: 'SKU-MON-27D',
      category: 'Electrónica',
      price: 649.00,
      stock: 6,
      minStock: 10,
      status: 'Bajo stock',
      rating: 4.6,
      description: 'Panel calibrado 100% sRGB con puertos USB-C 90W PD y base ergonómica doble.'
    },
    {
      id: 'PRD-05',
      name: 'Teclado Mecánico Inalámbrico Pro',
      sku: 'SKU-ACC-KBPR',
      category: 'Accesorios',
      price: 119.00,
      stock: 48,
      minStock: 15,
      status: 'En stock',
      rating: 4.9,
      description: 'Switches silenciosos táctiles, batería de 6 meses y conexión multidispositivo tri-modo.'
    },
    {
      id: 'PRD-06',
      name: 'Switch Administrable PoE+ 24 Puertos',
      sku: 'SKU-NET-SW24',
      category: 'Electrónica',
      price: 480.00,
      stock: 3,
      minStock: 8,
      status: 'Bajo stock',
      rating: 4.5,
      description: 'Capa L2+ con 370W PoE budget, 4 ranuras SFP+ de 10Gbps y panel de control web.'
    },
    {
      id: 'PRD-07',
      name: 'Licencia Antivirus Endpoint Security (10 PCs)',
      sku: 'SKU-SEC-EP10',
      category: 'Software',
      price: 199.00,
      stock: 0,
      minStock: 5,
      status: 'Agotado',
      rating: 4.4,
      description: 'Protección contra ransomware con monitoreo de amenazas en vivo y cortafuegos activo.'
    },
    {
      id: 'PRD-08',
      name: 'Hub USB-C 10 en 1 Aluminio Espacial',
      sku: 'SKU-ACC-HB10',
      category: 'Accesorios',
      price: 59.90,
      stock: 82,
      minStock: 25,
      status: 'En stock',
      rating: 4.8,
      description: 'HDMI 4K@60Hz, Gigabit Ethernet, lector SD/MicroSD y entrega de energía de 100W.'
    }
  ]);

  // ==========================================
  // REPORTES (Datos simulados)
  // ==========================================
  readonly reportes = signal<ReporteKpis>({
    totalRevenue: 284590,
    monthlyGrowth: 18.7,
    activeClients: 142,
    totalOrders: 1184,
    satisfactionRate: 98.4
  });

  readonly monthlySales = [
    { month: 'Mayo', sales: 38200, height: 55, orders: 142 },
    { month: 'Junio', sales: 42100, height: 62, orders: 168 },
    { month: 'Julio', sales: 49500, height: 72, orders: 195 },
    { month: 'Agosto', sales: 46800, height: 68, orders: 180 },
    { month: 'Septiembre', sales: 54200, height: 82, orders: 220 },
    { month: 'Octubre', sales: 68400, height: 100, orders: 279 }
  ];

  readonly activityLogs = [
    { id: 1, type: 'order', text: 'Nueva compra realizada por Sofía Martínez (Logística Andina)', time: 'Hace 15 min', amount: '+$3,450 USD' },
    { id: 2, type: 'user', text: 'API JSONPlaceholder sincronizó 10 perfiles de usuarios externos', time: 'Hace 1 hora', amount: 'Conexión OK' },
    { id: 3, type: 'stock', text: 'Alerta de stock bajo en "Switch Administrable PoE+ 24 Puertos"', time: 'Hace 3 horas', amount: '3 restantes' },
    { id: 4, type: 'client', text: 'Rodrigo Benítez actualizó su contrato de servicios anual', time: 'Hace 5 horas', amount: '+$12,800 USD' },
    { id: 5, type: 'employee', text: 'Mateo Cárdenas ingresó reporte trimestral de conciliación', time: 'Ayer a las 17:30', amount: 'Finanzas' }
  ];

  /**
   * Carga los usuarios desde la API externa https://jsonplaceholder.typicode.com/users
   */
  async loadApiUsers(): Promise<void> {
    if (this.apiUsers().length > 0) {
      return; // Ya cargados en memoria
    }

    this.loadingApiUsers.set(true);
    this.apiUsersError.set(null);

    try {
      const response = await fetch(this.JSONPLACEHOLDER_URL);
      if (!response.ok) {
        throw new Error(`Error en respuesta del servidor (${response.status}: ${response.statusText})`);
      }
      const data: ApiUser[] = await response.json();
      this.apiUsers.set(data);
    } catch (error: any) {
      console.error('Error al consultar https://jsonplaceholder.typicode.com/users:', error);
      this.apiUsersError.set(
        error?.message || 'No se pudo conectar con la API de JSONPlaceholder. Verifica tu conexión a internet.'
      );
    } finally {
      this.loadingApiUsers.set(false);
    }
  }

  /**
   * Recarga forzada de usuarios desde la API
   */
  async refreshApiUsers(): Promise<void> {
    this.apiUsers.set([]);
    await this.loadApiUsers();
  }
}

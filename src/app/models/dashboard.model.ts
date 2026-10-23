export interface ApiUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Cliente {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  status: 'Activo' | 'Pendiente' | 'Inactivo';
  totalSpent: number;
  lastOrder: string;
}

export interface Empleado {
  id: string;
  name: string;
  role: string;
  department: 'Ventas' | 'Desarrollo' | 'Marketing' | 'Soporte' | 'Finanzas';
  email: string;
  phone: string;
  status: 'Activo' | 'Vacaciones' | 'Remoto';
  joinDate: string;
  salary: number;
  avatarBg: string;
}

export interface Producto {
  id: string;
  name: string;
  sku: string;
  category: 'Electrónica' | 'Software' | 'Accesorios' | 'Oficina';
  price: number;
  stock: number;
  minStock: number;
  status: 'En stock' | 'Bajo stock' | 'Agotado';
  rating: number;
  description: string;
}

export interface ReporteKpis {
  totalRevenue: number;
  monthlyGrowth: number;
  activeClients: number;
  totalOrders: number;
  satisfactionRate: number;
}

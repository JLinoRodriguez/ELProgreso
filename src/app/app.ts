import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';
import { DashboardService } from './services/dashboard.service';

// Validador personalizado para asegurar que ambas contraseñas coincidan
function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  if (!confirmPassword) return null;
  return password === confirmPassword ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly authService = inject(AuthService);
  protected readonly dashboardService = inject(DashboardService);
  private readonly fb = inject(FormBuilder);
  protected readonly router = inject(Router);

  // Nombre oficial del sistema
  readonly systemName = 'Distribuciones El Progreso';

  // Pestaña activa en vista de autenticación ('login' | 'register')
  activeTab = signal<'login' | 'register'>('login');

  // Sección activa para compatibilidad directa y ruteo
  activeSection = signal<string>('bienvenida');

  // Control de apertura de sidebar en pantallas móviles
  sidebarOpen = signal<boolean>(false);

  // Método para cambiar de sección con RouterModule
  switchSection(section: string): void {
    this.activeSection.set(section);
    this.closeSidebar();
    this.router.navigate([`/dashboard/${section}`]);
  }

  // Visibilidad de contraseñas
  showLoginPassword = signal<boolean>(false);
  showRegisterPassword = signal<boolean>(false);
  showRegisterConfirmPassword = signal<boolean>(false);

  // Estado del inspector de LocalStorage
  showLocalStorageInspector = signal<boolean>(false);

  // Alerta informativa/notificación
  alert = signal<{ type: 'success' | 'error' | 'info'; title: string; message: string } | null>(null);

  // Formularios reactivos
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  // Señales reactivas derivadas de AuthService
  currentUser = this.authService.currentUser;
  registeredUsers = this.authService.registeredUsers;

  // Conteo total de usuarios registrados en LocalStorage
  userCount = computed(() => this.registeredUsers().length);

  ngOnInit(): void {
    this.initForms();
    // Si ya existe sesión activa en LocalStorage, precargar datos de la API y asegurar ruta
    if (this.currentUser()) {
      this.dashboardService.loadApiUsers();
      if (this.router.url === '/' || this.router.url === '/login') {
        this.router.navigate(['/dashboard/bienvenida']);
      }
    }
  }

  private initForms(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      },
      { validators: passwordMatchValidator }
    );
  }

  // Cambio de pestañas en autenticación
  switchTab(tab: 'login' | 'register'): void {
    this.activeTab.set(tab);
    this.dismissAlert();
  }

  toggleSidebar(): void {
    this.sidebarOpen.set(!this.sidebarOpen());
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  // Manejador del Registro con persistencia en LocalStorage usando localStorage.setItem()
  onRegisterSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.showAlert('error', 'Campos requeridos', 'Por favor, completa correctamente todos los campos del registro.');
      return;
    }

    const { name, email, password } = this.registerForm.value;
    // AuthService realiza la persistencia mediante localStorage.setItem()
    const response = this.authService.register(name, email, password);

    if (response.success) {
      this.showAlert('success', '¡Registro Exitoso!', response.message);
      this.loginForm.patchValue({ email: email, password: '' });
      this.registerForm.reset();
      setTimeout(() => {
        this.activeTab.set('login');
      }, 1000);
    } else {
      this.showAlert('error', 'Error en el registro', response.message);
    }
  }

  // Manejador del Login con validación y redirección a la vista inicial de bienvenida
  onLoginSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.showAlert('error', 'Datos incompletos', 'Por favor ingresa tu correo y contraseña.');
      return;
    }

    const { email, password } = this.loginForm.value;
    const response = this.authService.login(email, password);

    if (response.success) {
      this.loginForm.reset();
      this.dashboardService.loadApiUsers();
      // Ruteo a la vista inicial con RouterModule
      this.router.navigate(['/dashboard/bienvenida']);
    } else {
      this.showAlert('error', 'Credenciales no válidas', response.message);
    }
  }

  // Cerrar sesión
  onLogout(): void {
    const userName = this.currentUser()?.name || 'Usuario';
    this.authService.logout();
    this.showAlert('info', 'Sesión Finalizada', `Hasta pronto, ${userName}. Sesión cerrada en Distribuciones El Progreso.`);
    this.activeTab.set('login');
    this.router.navigate(['/']);
  }

  // Llenar formulario de login con datos de un usuario para pruebas rápidas
  fillLoginWith(user: User): void {
    this.activeTab.set('login');
    this.loginForm.patchValue({
      email: user.email,
      password: user.password
    });
    this.showAlert('info', 'Credenciales Cargadas', `Se cargó el usuario "${user.name}". Haz clic en "Ingresar al Dashboard" para validar.`);
  }

  // Eliminar un usuario específico
  deleteUser(userId: string, event: MouseEvent): void {
    event.stopPropagation();
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.authService.deleteUser(userId);
      this.showAlert('info', 'Usuario Eliminado', 'El usuario fue removido correctamente.');
    }
  }

  // Limpiar almacenamiento
  clearAllStorage(): void {
    if (confirm('¿Deseas borrar todos los usuarios y sesiones guardadas?')) {
      this.authService.clearAllUsers();
      this.loginForm.reset();
      this.registerForm.reset();
      this.showAlert('info', 'Registros Eliminados', 'Se han eliminado todos los registros del sistema.');
    }
  }

  // Manejo de alertas
  showAlert(type: 'success' | 'error' | 'info', title: string, message: string): void {
    this.alert.set({ type, title, message });
    setTimeout(() => {
      if (this.alert()?.message === message) {
        this.dismissAlert();
      }
    }, 6000);
  }

  dismissAlert(): void {
    this.alert.set(null);
  }

  // Helper para iniciales de usuario en avatar
  getInitials(name?: string): string {
    if (!name) return 'DP';
    return name
      .split(' ')
      .filter(p => p.length > 0)
      .map(part => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  // Formato legible de fecha
  formatDate(isoString?: string): string {
    if (!isoString) return '';
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoString;
    }
  }

  // JSON formateado para el visor en vivo de LocalStorage
  get localStorageUsersJson(): string {
    return JSON.stringify(this.registeredUsers(), null, 2);
  }

  get localStorageSessionJson(): string {
    return JSON.stringify(this.currentUser(), null, 2);
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="bienvenida-container animate-fade-in" id="seccion-bienvenida">
      <!-- HERO DE BIENVENIDA -->
      <div class="bienvenida-hero">
        <div class="hero-glow"></div>
        <div class="hero-badge">
          <span class="pulse-indicator"></span>
          <span>Sesión Activa en Distribuciones El Progreso</span>
        </div>

        <h1 class="hero-title">
          ¡Bienvenido(a), <span class="highlight-name">{{ currentUser()?.name || 'Usuario' }}</span>!
        </h1>

        <!-- TARJETA DE RESUMEN DEL USUARIO -->
        <div class="user-summary-card">
          <div class="summary-avatar">
            {{ getInitials(currentUser()?.name) }}
          </div>
          <div class="summary-details">
            <div class="summary-row">
              <span class="summary-label">Usuario Conectado:</span>
              <strong class="summary-value user-fullname">{{ currentUser()?.name }}</strong>
            </div>
            <div class="summary-row">
              <span class="summary-label">Correo Electrónico:</span>
              <span class="summary-value">{{ currentUser()?.email }}</span>
            </div>
            <div class="summary-row">
              <span class="summary-label">Estado:</span>
              <span class="summary-badge-storage">Sesión Activa</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ACCESOS RÁPIDOS A SECCIONES DEL SISTEMA -->
      <div class="quick-nav-section">
        <div class="section-title-wrap">
          <h2 class="sub-heading">Explorar Secciones del Sistema</h2>
          <p class="sub-text">Selecciona una sección en los accesos rápidos o a través del menú lateral (Sidebar):</p>
        </div>

        <div class="quick-nav-grid">
          <!-- 1. Clientes -->
          <a routerLink="/dashboard/clientes" class="nav-shortcut-card">
            <div class="shortcut-icon indigo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div class="shortcut-content">
              <h3 class="shortcut-title">Clientes Comerciales</h3>
              <p class="shortcut-desc">Cartera corporativa, contactos y facturación acumulada.</p>
              <div class="shortcut-footer">
                <span class="shortcut-badge">{{ dashboardService.clientes().length }} clientes</span>
                <span class="shortcut-arrow">&rarr;</span>
              </div>
            </div>
          </a>

          <!-- 2. Empleados -->
          <a routerLink="/dashboard/empleados" class="nav-shortcut-card">
            <div class="shortcut-icon emerald">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            </div>
            <div class="shortcut-content">
              <h3 class="shortcut-title">Directorio de Empleados</h3>
              <p class="shortcut-desc">Talento humano, departamentos, roles y modalidades laborales.</p>
              <div class="shortcut-footer">
                <span class="shortcut-badge">{{ dashboardService.empleados().length }} colaboradores</span>
                <span class="shortcut-arrow">&rarr;</span>
              </div>
            </div>
          </a>

          <!-- 3. Productos -->
          <a routerLink="/dashboard/productos" class="nav-shortcut-card">
            <div class="shortcut-icon amber">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
            <div class="shortcut-content">
              <h3 class="shortcut-title">Catálogo de Productos</h3>
              <p class="shortcut-desc">Inventario, existencias en tiempo real y precios en USD.</p>
              <div class="shortcut-footer">
                <span class="shortcut-badge">{{ dashboardService.productos().length }} referencias</span>
                <span class="shortcut-arrow">&rarr;</span>
              </div>
            </div>
          </a>

          <!-- 4. Reportes -->
          <a routerLink="/dashboard/reportes" class="nav-shortcut-card">
            <div class="shortcut-icon purple">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
            </div>
            <div class="shortcut-content">
              <h3 class="shortcut-title">Reportes &amp; Analítica</h3>
              <p class="shortcut-desc">Evolución mensual de ventas, métricas clave y balance general.</p>
              <div class="shortcut-footer">
                <span class="shortcut-badge highlight">KPIs Activos</span>
                <span class="shortcut-arrow">&rarr;</span>
              </div>
            </div>
          </a>

          <!-- 5. Usuarios (API JSONPlaceholder) -->
          <a routerLink="/dashboard/usuarios" class="nav-shortcut-card api-shortcut">
            <div class="shortcut-icon cyan">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </div>
            <div class="shortcut-content">
              <h3 class="shortcut-title">Usuarios API Externa</h3>
              <p class="shortcut-desc">Cards consumidas de https://jsonplaceholder.typicode.com/users.</p>
              <div class="shortcut-footer">
                <span class="shortcut-badge api-tag">JSONPlaceholder API</span>
                <span class="shortcut-arrow">&rarr;</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .bienvenida-container {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      max-width: 1300px;
      margin: 0 auto;
      width: 100%;
    }

    .bienvenida-hero {
      position: relative;
      background: #ffffff;
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 2.25rem;
      overflow: hidden;
      box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);
    }

    .hero-glow {
      display: none !important;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.3rem 0.85rem;
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      border-radius: var(--radius-full);
      font-size: 0.775rem;
      font-weight: 600;
      color: #059669;
      margin-bottom: 1rem;
    }

    .pulse-indicator {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 8px #10b981;
      animation: none !important;
    }

    .hero-title {
      font-size: 2.2rem;
      font-weight: 800;
      color: var(--text-main);
      letter-spacing: -0.025em;
      line-height: 1.2;
      margin-bottom: 0.75rem;
    }

    .highlight-name {
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #0284c7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-description {
      font-size: 0.95rem;
      color: var(--text-muted);
      line-height: 1.6;
      max-width: 820px;
      margin-bottom: 1.75rem;
    }

    .hero-description code {
      font-family: var(--font-mono);
      background: #f1f5f9;
      color: #0284c7;
      padding: 0.15rem 0.45rem;
      border-radius: 4px;
      font-size: 0.85rem;
    }

    .user-summary-card {
      background: #f8fafc;
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 1.25rem 1.5rem;
      display: flex;
      align-items: center;
      gap: 1.5rem;
      flex-wrap: wrap;
    }

    .summary-avatar {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: #7c3aed;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
      font-weight: 700;
      color: white;
      box-shadow: none;
      flex-shrink: 0;
    }

    .summary-details {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem 2.5rem;
      flex: 1;
    }

    .summary-row {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .summary-label {
      font-size: 0.725rem;
      font-weight: 600;
      color: var(--text-subtle);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .summary-value {
      font-size: 0.925rem;
      color: var(--text-main);
    }

    .user-fullname {
      font-weight: 700;
      color: var(--text-main);
    }

    .summary-code {
      font-family: var(--font-mono);
      font-size: 0.775rem;
      color: #4338ca;
      background: #eef2ff;
      padding: 0.15rem 0.5rem;
      border-radius: 4px;
      align-self: flex-start;
    }

    .summary-badge-storage {
      font-size: 0.775rem;
      font-weight: 600;
      color: #059669;
      background: #ecfdf5;
      padding: 0.2rem 0.6rem;
      border-radius: var(--radius-full);
      border: 1px solid #a7f3d0;
      align-self: flex-start;
    }

    /* Accesos Rápidos */
    .quick-nav-section {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .sub-heading {
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--text-main);
    }

    .sub-text {
      font-size: 0.85rem;
      color: var(--text-muted);
      margin-top: 0.2rem;
    }

    .quick-nav-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.25rem;
    }

    .nav-shortcut-card {
      background: #ffffff;
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      text-decoration: none;
      transition: all var(--transition-fast);
      position: relative;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
    }

    .nav-shortcut-card:hover,
    .nav-shortcut-card.api-shortcut:hover {
      border-color: #7c3aed !important;
      transform: none !important;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04) !important;
    }

    .shortcut-icon {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .shortcut-icon.indigo {
      background: #eef2ff;
      color: #4f46e5;
    }

    .shortcut-icon.emerald {
      background: #ecfdf5;
      color: #059669;
    }

    .shortcut-icon.amber {
      background: #fffbeb;
      color: #d97706;
    }

    .shortcut-icon.purple {
      background: #faf5ff;
      color: #7c3aed;
    }

    .shortcut-icon.cyan {
      background: #f0f9ff;
      color: #0284c7;
    }

    .shortcut-icon svg {
      width: 24px;
      height: 24px;
    }

    .shortcut-content {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .shortcut-title {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 0.35rem;
    }

    .shortcut-desc {
      font-size: 0.8rem;
      color: var(--text-muted);
      line-height: 1.45;
      margin-bottom: 1rem;
      flex: 1;
    }

    .shortcut-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 0.75rem;
      border-top: 1px solid var(--border-subtle);
    }

    .shortcut-badge {
      font-size: 0.725rem;
      font-weight: 600;
      color: var(--text-subtle);
      background: #f1f5f9;
      padding: 0.15rem 0.5rem;
      border-radius: 4px;
    }

    .shortcut-badge.highlight {
      background: #fffbeb;
      color: #d97706;
      border: 1px solid #fde68a;
    }

    .shortcut-badge.api-tag {
      background: #f0f9ff;
      color: #0284c7;
      border: 1px solid #bae6fd;
    }

    .shortcut-arrow {
      font-size: 1.1rem;
      color: var(--text-subtle);
      transition: transform var(--transition-fast), color var(--transition-fast);
    }

    .nav-shortcut-card:hover .shortcut-arrow {
      color: #4f46e5;
      transform: none !important;
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 1.6rem;
      }

      .user-summary-card {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `]
})
export class BienvenidaComponent {
  protected readonly authService = inject(AuthService);
  protected readonly dashboardService = inject(DashboardService);

  currentUser = this.authService.currentUser;

  getInitials(name?: string): string {
    if (!name) return 'U';
    return name
      .split(' ')
      .filter(p => p.length > 0)
      .map(part => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }
}

import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { Cliente } from '../../models/dashboard.model';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="section-container animate-fade-in" id="section-clientes">
      <div class="section-hero">
        <div>
          <h2 class="section-title">Gestión de Clientes</h2>
        </div>
      </div>

      <!-- KPIs Clientes -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-icon indigo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div class="kpi-info">
            <span class="kpi-label">Total Clientes</span>
            <strong class="kpi-value">{{ dashboardService.clientes().length }}</strong>
            <span class="kpi-trend positive">+12.5% este mes</span>
          </div>
        </div>

        <div class="kpi-card">
          <div class="kpi-icon emerald">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div class="kpi-info">
            <span class="kpi-label">Clientes Activos</span>
            <strong class="kpi-value">{{ activeClientesCount() }} de {{ dashboardService.clientes().length }}</strong>
            <span class="kpi-trend positive">{{ retentionRate() }} retención</span>
          </div>
        </div>

        <div class="kpi-card">
          <div class="kpi-icon amber">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <div class="kpi-info">
            <span class="kpi-label">Facturación Cartera</span>
            <strong class="kpi-value">{{ totalFacturacion() }}</strong>
            <span class="kpi-trend positive">+18% vs trimestre ant.</span>
          </div>
        </div>

        <div class="kpi-card">
          <div class="kpi-icon purple">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <div class="kpi-info">
            <span class="kpi-label">Último Pedido</span>
            <strong class="kpi-value">Hace 2 días</strong>
            <span class="kpi-trend neutral">Logística Andina</span>
          </div>
        </div>
      </div>

      <!-- Tabla de Clientes -->
      <div class="table-card">
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Cliente / Contacto</th>
                <th>Empresa</th>
                <th>Teléfono</th>
                <th>Ciudad / País</th>
                <th>Facturación</th>
                <th>Estado</th>
                <th>Última Actividad</th>
              </tr>
            </thead>
            <tbody>
              @for (cli of filteredClientes(); track cli.id) {
                <tr>
                  <td>
                    <div class="cell-user">
                      <div class="table-avatar">{{ getInitials(cli.name) }}</div>
                      <div>
                        <strong class="name">{{ cli.name }}</strong>
                        <span class="subtext">{{ cli.email }}</span>
                      </div>
                    </div>
                  </td>
                  <td><span class="company-tag">{{ cli.company }}</span></td>
                  <td>{{ cli.phone }}</td>
                  <td>{{ cli.city }}, {{ cli.country }}</td>
                  <td><strong class="amount">{{ formatCurrency(cli.totalSpent) }}</strong></td>
                  <td>
                    <span class="status-pill-badge" [ngClass]="cli.status.toLowerCase()">
                      {{ cli.status }}
                    </span>
                  </td>
                  <td class="subtext">{{ cli.lastOrder }}</td>
                </tr>
              } @empty {
                <tr>
                  <td colspan="7" class="empty-table-row">
                    No se encontraron clientes que coincidan con la búsqueda.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `
})
export class ClientesComponent {
  protected readonly dashboardService = inject(DashboardService);

  activeClientesCount = computed(() => {
    return this.dashboardService.clientes().filter(c => c.status.toLowerCase() === 'activo').length;
  });

  retentionRate = computed(() => {
    const total = this.dashboardService.clientes().length;
    if (total === 0) return '0%';
    const active = this.activeClientesCount();
    return ((active / total) * 100).toFixed(1) + '%';
  });

  totalFacturacion = computed(() => {
    const sum = this.dashboardService.clientes().reduce((acc, c) => acc + c.totalSpent, 0);
    return this.formatCurrency(sum);
  });

  filteredClientes = this.dashboardService.clientes;

  formatCurrency(val: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  }

  getInitials(name?: string): string {
    if (!name) return 'C';
    return name
      .split(' ')
      .filter(p => p.length > 0)
      .map(part => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }
}

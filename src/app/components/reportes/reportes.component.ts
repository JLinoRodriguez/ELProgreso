import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section-container animate-fade-in" id="section-reportes">
      <div class="section-hero">
        <div>
          <h2 class="section-title">Centro de Analítica &amp; Reportes</h2>
        </div>
      </div>

      <!-- Métricas Principales -->
      <div class="kpi-grid">
        <div class="kpi-card highlight-card">
          <div class="kpi-icon indigo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </div>
          <div class="kpi-info">
            <span class="kpi-label">Ingresos Consolidados</span>
            <strong class="kpi-value">$284,590 USD</strong>
            <span class="kpi-trend positive">+18.7% vs semestre anterior</span>
          </div>
        </div>

        <div class="kpi-card">
          <div class="kpi-icon emerald">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
              <polyline points="17 6 23 6 23 12"/>
            </svg>
          </div>
          <div class="kpi-info">
            <span class="kpi-label">Órdenes Despachadas</span>
            <strong class="kpi-value">1,184 pedidos</strong>
            <span class="kpi-trend positive">99.2% entrega a tiempo</span>
          </div>
        </div>

        <div class="kpi-card">
          <div class="kpi-icon amber">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
            </svg>
          </div>
          <div class="kpi-info">
            <span class="kpi-label">Índice CSAT (Satisfacción)</span>
            <strong class="kpi-value">98.4%</strong>
            <span class="kpi-trend positive">Calificación Sobresaliente</span>
          </div>
        </div>

        <div class="kpi-card">
          <div class="kpi-icon purple">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </div>
          <div class="kpi-info">
            <span class="kpi-label">Presencia Internacional</span>
            <strong class="kpi-value">6 Países</strong>
            <span class="kpi-trend neutral">LATAM y Caribe</span>
          </div>
        </div>
      </div>

      <!-- Gráfico de Barras de Ventas Mensuales -->
      <div class="report-grid-layout">
        <div class="chart-card">
          <div class="chart-header">
            <div>
              <h3 class="chart-title">Evolución de Ingresos Mensuales (2026)</h3>
              <p class="chart-subtitle">Facturación en miles de USD (Mayo a Octubre)</p>
            </div>
            <span class="badge-growth">+79% acumulado</span>
          </div>

          <div class="bars-container">
            @for (bar of dashboardService.monthlySales; track bar.month) {
              <div class="bar-col">
                <span class="bar-amount">{{ formatK(bar.sales) }}</span>
                <div class="bar-track">
                  <div class="bar-fill" [style.height.%]="bar.height" [title]="bar.month + ': $' + bar.sales + ' USD (' + bar.orders + ' órdenes)'"></div>
                </div>
                <span class="bar-label">{{ bar.month }}</span>
              </div>
            }
          </div>
        </div>

        <!-- Historial de Auditoría & Actividad -->
        <div class="activity-card">
          <h3 class="chart-title">Bitácora de Operaciones Recientes</h3>
          <p class="chart-subtitle">Distribuciones El Progreso &mdash; Eventos de auditoría</p>

          <div class="activity-timeline">
            @for (log of dashboardService.activityLogs; track log.id) {
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <p class="timeline-text">{{ log.text }}</p>
                  <div class="timeline-meta">
                    <span class="timeline-time">{{ log.time }}</span>
                    <span class="timeline-amount">{{ log.amount }}</span>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `
})
export class ReportesComponent {
  protected readonly dashboardService = inject(DashboardService);

  formatK(sales: number): string {
    return '$' + (sales / 1000).toFixed(1) + 'k';
  }
}

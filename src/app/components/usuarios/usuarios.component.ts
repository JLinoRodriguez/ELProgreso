import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { ApiUser } from '../../models/dashboard.model';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="section-container animate-fade-in" id="section-usuarios">


      <!-- Barra de Estado de Usuarios API -->
      <div class="filter-bar">
        <div class="api-counter-tag">
          Mostrando <strong>{{ filteredApiUsers().length }}</strong> de {{ dashboardService.apiUsers().length }} usuarios
        </div>
      </div>

      <!-- Estado: Cargando -->
      @if (dashboardService.loadingApiUsers()) {
        <div class="loading-state-box">
          <div class="spinner-ring"></div>
          <h3>Cargando usuarios desde JSONPlaceholder...</h3>
          <p>Conectando con https://jsonplaceholder.typicode.com/users</p>
        </div>
      }

      <!-- Estado: Error al cargar -->
      @else if (dashboardService.apiUsersError()) {
        <div class="error-state-box">
          <div class="error-state-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <h3>Error de conexión con la API</h3>
          <p>{{ dashboardService.apiUsersError() }}</p>
          <button type="button" class="btn-retry" (click)="dashboardService.refreshApiUsers()">
            Reintentar Conexión
          </button>
        </div>
      }

      <!-- Grid de Cards de Usuarios de la API -->
      @else {
        <div class="api-users-grid">
          @for (apiUser of filteredApiUsers(); track apiUser.id) {
            <article class="api-user-card" id="api-user-{{ apiUser.id }}">
              <div class="user-card-header">
                <div class="user-card-avatar">
                  {{ getInitials(apiUser.name) }}
                </div>
                <div class="user-card-title-group">
                  <div class="name-id-row">
                    <h3 class="user-card-name">{{ apiUser.name }}</h3>
                    <span class="user-id-badge">#{{ apiUser.id }}</span>
                  </div>
                  <span class="user-card-username">&#64;{{ apiUser.username }}</span>
                </div>
              </div>

              <div class="user-card-contacts">
                <a [href]="'mailto:' + apiUser.email" class="contact-pill" title="Enviar correo">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <span>{{ apiUser.email }}</span>
                </a>

                <a [href]="'tel:' + apiUser.phone" class="contact-pill" title="Llamar">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span>{{ apiUser.phone }}</span>
                </a>

                <a [href]="'https://' + apiUser.website" target="_blank" rel="noopener noreferrer" class="contact-pill website-pill" title="Sitio web">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                  <span>{{ apiUser.website }}</span>
                </a>
              </div>

              <div class="user-company-box">
                <div class="box-label">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                  <span>Empresa</span>
                </div>
                <strong class="company-name">{{ apiUser.company.name }}</strong>
                <p class="company-catchphrase">&ldquo;{{ apiUser.company.catchPhrase }}&rdquo;</p>
              </div>

              <div class="user-location-box">
                <div class="box-label">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>Ubicación</span>
                </div>
                <span class="location-city">{{ apiUser.address.city }}</span>
                <span class="location-street">{{ apiUser.address.street }}, {{ apiUser.address.suite }}</span>
              </div>

              <div class="user-card-footer">
                <button type="button" class="btn-card-details" (click)="selectedApiUser.set(apiUser)">
                  <span>Ver Ficha Completa</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </article>
          } @empty {
            <div class="empty-state-box">
              <p>No se encontraron usuarios de la API que coincidan con la búsqueda.</p>
            </div>
          }
        </div>
      }

      <!-- Modal de Detalle de Usuario API -->
      @if (selectedApiUser(); as selected) {
        <div class="modal-overlay" (click)="selectedApiUser.set(null)">
          <div class="modal-card animate-scale-up" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <div class="modal-avatar">
                {{ getInitials(selected.name) }}
              </div>
              <div>
                <h3 class="modal-title">{{ selected.name }}</h3>
                <span class="modal-subtitle">&#64;{{ selected.username }} &bull; ID #{{ selected.id }}</span>
              </div>
              <button type="button" class="btn-close-modal" (click)="selectedApiUser.set(null)" aria-label="Cerrar modal">
                &times;
              </button>
            </div>

            <div class="modal-body">
              <div class="modal-section">
                <h4 class="modal-section-heading">Información de Contacto</h4>
                <div class="modal-grid">
                  <div class="modal-field">
                    <span class="field-label">Correo Electrónico</span>
                    <a [href]="'mailto:' + selected.email" class="field-link">{{ selected.email }}</a>
                  </div>
                  <div class="modal-field">
                    <span class="field-label">Teléfono</span>
                    <span class="field-val">{{ selected.phone }}</span>
                  </div>
                  <div class="modal-field">
                    <span class="field-label">Sitio Web</span>
                    <a [href]="'https://' + selected.website" target="_blank" rel="noopener noreferrer" class="field-link">{{ selected.website }}</a>
                  </div>
                </div>
              </div>

              <div class="modal-section">
                <h4 class="modal-section-heading">Organización &amp; Negocio</h4>
                <div class="modal-grid">
                  <div class="modal-field">
                    <span class="field-label">Razón Social</span>
                    <span class="field-val highlight">{{ selected.company.name }}</span>
                  </div>
                  <div class="modal-field">
                    <span class="field-label">Lema Corporativo</span>
                    <span class="field-val italic">&ldquo;{{ selected.company.catchPhrase }}&rdquo;</span>
                  </div>
                  <div class="modal-field">
                    <span class="field-label">Área de Operación (BS)</span>
                    <span class="field-val">{{ selected.company.bs }}</span>
                  </div>
                </div>
              </div>

              <div class="modal-section">
                <h4 class="modal-section-heading">Domicilio &amp; Coordenadas GPS</h4>
                <div class="modal-grid">
                  <div class="modal-field">
                    <span class="field-label">Dirección</span>
                    <span class="field-val">{{ selected.address.street }}, {{ selected.address.suite }}</span>
                  </div>
                  <div class="modal-field">
                    <span class="field-label">Ciudad / Código Postal</span>
                    <span class="field-val">{{ selected.address.city }} ({{ selected.address.zipcode }})</span>
                  </div>
                  <div class="modal-field">
                    <span class="field-label">Coordenadas GPS</span>
                    <code class="geo-badge">Lat: {{ selected.address.geo.lat }}, Lng: {{ selected.address.geo.lng }}</code>
                  </div>
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn-modal-close-action" (click)="selectedApiUser.set(null)">
                Entendido
              </button>
            </div>
          </div>
        </div>
      }
    </section>
  `
})
export class UsuariosComponent implements OnInit {
  protected readonly dashboardService = inject(DashboardService);

  selectedApiUser = signal<ApiUser | null>(null);
  filteredApiUsers = this.dashboardService.apiUsers;

  ngOnInit(): void {
    this.dashboardService.loadApiUsers();
  }

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

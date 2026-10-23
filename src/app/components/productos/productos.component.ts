import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { Producto } from '../../models/dashboard.model';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="section-container animate-fade-in" id="section-productos">
      <div class="section-hero">
        <div>
          <h2 class="section-title">Catálogo de Productos &amp; Inventario</h2>
        </div>
      </div>

      <!-- Grid de Productos -->
      <div class="products-grid">
        @for (prod of filteredProductos(); track prod.id) {
          <div class="product-card" [class.low-stock]="prod.status === 'Bajo stock'" [class.out-of-stock]="prod.status === 'Agotado'">
            <div class="product-top">
              <span class="product-sku">{{ prod.sku }}</span>
              <span class="product-status-tag" [ngClass]="prod.status.toLowerCase().replace(' ', '-')">
                {{ prod.status }}
              </span>
            </div>

            <div class="product-icon-wrap">
              @if (prod.category === 'Software') {
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="16 18 22 12 16 6"/>
                  <polyline points="8 6 2 12 8 18"/>
                </svg>
              } @else if (prod.category === 'Electrónica') {
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
                  <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
                  <line x1="6" y1="6" x2="6.01" y2="6"/>
                  <line x1="6" y1="18" x2="6.01" y2="18"/>
                </svg>
              } @else {
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M7 15h10M7 9h10"/>
                </svg>
              }
            </div>

            <div class="product-category">{{ prod.category }}</div>
            <h3 class="product-name">{{ prod.name }}</h3>
            <p class="product-desc">{{ prod.description }}</p>

            <div class="product-stock-meter">
              <div class="stock-header">
                <span class="stock-label">Stock disponible:</span>
                <span class="stock-val"><strong>{{ prod.stock }}</strong> unidades</span>
              </div>
              <div class="meter-bar">
                <div class="meter-fill" [style.width.%]="prod.stock > 100 ? 100 : (prod.stock / 100) * 100" [class.danger]="prod.stock <= prod.minStock"></div>
              </div>
            </div>

            <div class="product-footer">
              <div class="price-box">
                <span class="price-curr">$</span>
                <strong class="price-val">{{ formatPrice(prod.price) }}</strong>
                <span class="price-unit">USD</span>
              </div>
              <div class="rating-box" title="Calificación {{ prod.rating }} de 5">
                <span class="star">★</span>
                <span class="rating-num">{{ prod.rating }}</span>
              </div>
            </div>
          </div>
        } @empty {
          <div class="empty-state-box">
            <p>No se encontraron productos con los criterios de búsqueda.</p>
          </div>
        }
      </div>
    </section>
  `
})
export class ProductosComponent {
  protected readonly dashboardService = inject(DashboardService);

  filteredProductos = this.dashboardService.productos;

  formatPrice(price: number): string {
    return price.toFixed(2);
  }
}

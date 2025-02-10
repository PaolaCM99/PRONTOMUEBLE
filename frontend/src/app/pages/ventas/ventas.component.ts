import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-venta',
  templateUrl: './ventas.component.html',
  imports: [CommonModule],
  styleUrls: ['./ventas.component.scss']
})
export class VentaComponent implements OnInit {
  venta = {
    fecha: '',
    total: null,
    metodoPago: '',
    codigoCliente_fk: null,
    codigoMueble_fk: null
  };

  clientes: any[] = [];
  muebles: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarClientes();
    this.cargarMuebles();
  }

  cargarClientes() {
    this.http.get<any[]>('https://tu-api.com/clientes').subscribe({
      next: (data) => this.clientes = data,
      error: (error) => console.error('Error al cargar clientes', error)
    });
  }

  cargarMuebles() {
    this.http.get<any[]>('https://tu-api.com/muebles').subscribe({
      next: (data) => this.muebles = data,
      error: (error) => console.error('Error al cargar muebles', error)
    });
  }

  guardarVenta() {
    this.http.post('https://tu-api.com/ventas', this.venta).subscribe({
      next: () => alert('Venta guardada correctamente'),
      error: (error) => console.error('Error al guardar venta', error)
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mueble',
  imports: [CommonModule],
  templateUrl: './mueble.component.html',
  styleUrls: ['./mueble.component.scss']
})
export class MuebleComponent implements OnInit {
  mueble = {
    color: '',
    precio: null,
    material: '',
    tipo: '',
    descripcion: '',
    ancho: null,
    altura: null,
    profundidad: null,
    stock: null,
    codigoVenta_fk: null,
    codigoProveedor_fk: null
  };

  ventas: any[] = [];
  proveedores: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarVentas();
    this.cargarProveedores();
  }

  cargarVentas() {
    this.http.get<any[]>('https://tu-api.com/ventas').subscribe({
      next: (data) => this.ventas = data,
      error: (error) => console.error('Error al cargar ventas', error)
    });
  }

  cargarProveedores() {
    this.http.get<any[]>('https://tu-api.com/proveedores').subscribe({
      next: (data) => this.proveedores = data,
      error: (error) => console.error('Error al cargar proveedores', error)
    });
  }

  guardarMueble() {
    this.http.post('https://tu-api.com/muebles', this.mueble).subscribe({
      next: () => alert('Mueble guardado correctamente'),
      error: (error) => console.error('Error al guardar mueble', error)
    });
  }
}

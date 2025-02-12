import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-venta',
  templateUrl: './ventas.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./ventas.component.scss']
})
export class VentaComponent implements OnInit {
  clientes: any[] = [];
  muebles: any[] = [];
  ventas: any[] = [];
  proveedores: any[] = [];
  ventaEdicion: any = null;
  errorventa: any;
  mostrarFormulario = false;
  editando = false;
  API_URL = 'http://localhost:4000/ventas';

  ventaForm: any = {
    cantidad: '',
    fecha: 0,
    valor: '',
    empleado: '',
    cliente: '',
    codigoProveedor_fk: null
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getVentas();
  }

  getVentas() {
    this.errorventa = null;
    this.http.get(this.API_URL).subscribe(
      (response: any) => {
        this.ventas = response.data || [];
      },
      (error) => {
        console.error("Error al obtener ventas:", error);
        this.errorventa = error.message;
      }
    );
  }

  eliminarventa(venta: any) {
    if (!confirm(`¿Seguro que deseas eliminar el venta de cantidad ${venta.cantidad}?`)) return;

    this.http.delete(`${this.API_URL}/${venta.id}`).subscribe(
      () => {
        this.getVentas();
      },
      (error) => {
        console.error("Error al eliminar venta:", error);
      }
    );
  }

  abrirFormulario() {
    this.ventaForm = {
      cantidad: '',
      fecha: 0,
      valor: '',
      empleado: '',
      cliente: '',
      codigoProveedor_fk: null
    };
    this.mostrarFormulario = true;
    this.editando = false;
  }

  editarventa(venta: any) {
    if (!venta.id) {
      console.error("Error: No se puede editar un venta sin ID.");
      alert("No se puede editar un venta sin ID.");
      return;
    }
    this.ventaForm = { ...venta };
    this.mostrarFormulario = true;
    this.editando = true;
  }

  guardarventa() {
    console.log("📤 Datos antes de enviar:", this.ventaForm);

    // Validar y corregir codigoProveedor_fk
    if (!this.ventaForm.codigoProveedor_fk || this.ventaForm.codigoProveedor_fk === "undefined") {
      console.warn("⚠️ Ajustando codigoProveedor_fk inválido");
      this.ventaForm.codigoProveedor_fk = this.proveedores.length > 0 ? this.proveedores[0].codigoProveedor : null;
    } else {
      this.ventaForm.codigoProveedor_fk = parseInt(this.ventaForm.codigoProveedor_fk, 10);
    }

    // Validar que todos los campos requeridos tengan valores correctos
    if (!this.ventaForm.cantidad || !this.ventaForm.fecha ||  !this.ventaForm.valor || !this.ventaForm.empleado ||
      !this.ventaForm.cliente  || this.ventaForm.codigoProveedor_fk == null) {
      console.error("❌ Error: Faltan datos obligatorios.");
      alert("Todos los campos son obligatorios.");
      return;
    }

    let nuevoventa = { ...this.ventaForm };

    // Eliminar id si no se está editando
    if (!this.editando) {
      delete nuevoventa.id;
    }

    if (!this.editando) {
      this.http.post(this.API_URL, nuevoventa).subscribe(
        (response: any) => {
          console.log("✅ venta agregado:", response);
          this.getVentas();
          this.mostrarFormulario = false;
        },
        (error) => {
          console.error("❌ Error en la API al crear venta:", error);
        }
      );
    } else {
      this.http.put(`${this.API_URL}/${this.ventaForm.id}`, nuevoventa).subscribe(
        (response: any) => {
          console.log("✅ venta actualizado:", response);
          this.getVentas();
          this.mostrarFormulario = false;
          this.editando = false;
        },
        (error) => {
          console.error("❌ Error al actualizar venta:", error);
        }
      );
    }
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}

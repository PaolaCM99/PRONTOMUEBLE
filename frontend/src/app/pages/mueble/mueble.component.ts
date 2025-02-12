import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mueble',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mueble.component.html',
  styleUrls: ['./mueble.component.scss']
})
export class MuebleComponent implements OnInit {

  muebles: any[] = [];
  proveedores: any[] = [];
  muebleEdicion: any = null;
  errorMueble: any;
  mostrarFormulario = false;
  editando = false;
  API_URL = 'http://localhost:4000/muebles';
  API_PROVEEDORES = 'http://localhost:4000/proveedores'; // Para listar proveedores en el formulario

  muebleForm: any = {
    color: '',
    precio: 0,
    material: '',
    tipo: '',
    descripcion: '',
    ancho: 0,
    altura: 0,
    profundidad: 0,
    stock: 0,
    codigoProveedor_fk: null
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getMuebles();
    this.getProveedores(); // Obtener lista de proveedores para el formulario
  }

  getMuebles() {
    this.errorMueble = null;
    this.http.get(this.API_URL).subscribe(
      (response: any) => {
        this.muebles = response.data || [];
      },
      (error) => {
        console.error("Error al obtener muebles:", error);
        this.errorMueble = error.message;
      }
    );
  }

  getProveedores() {
    this.http.get(this.API_PROVEEDORES).subscribe(
      (response: any) => {
        this.proveedores = response.data || [];
        console.log("Proveedores:", this.proveedores);
      },
      (error) => {
        console.error("Error al obtener proveedores:", error);
      }
    );
  }

  eliminarMueble(mueble: any) {
    if (!confirm(`¿Seguro que deseas eliminar el mueble de color ${mueble.color}?`)) return;

    this.http.delete(`${this.API_URL}/${mueble.id}`).subscribe(
      () => {
        this.getMuebles();
      },
      (error) => {
        console.error("Error al eliminar mueble:", error);
      }
    );
  }

  abrirFormulario() {
    this.muebleForm = {
      id: null, color: '', precio: 0, material: '', tipo: '',
      descripcion: '', ancho: 0, altura: 0, profundidad: 0, stock: 0, codigoProveedor_fk: null
    };
    this.mostrarFormulario = true;
    this.editando = false;
  }

  editarMueble(mueble: any) {
    if (!mueble.id) {
      console.error("Error: No se puede editar un mueble sin ID.");
      alert("No se puede editar un mueble sin ID.");
      return;
    }
    this.muebleForm = { ...mueble };
    this.mostrarFormulario = true;
    this.editando = true;
    console.log("Editando mueble:", this.muebleForm);
  }

  guardarMueble() {
    console.log("📤 Datos antes de enviar:", this.muebleForm);

    // Validar y corregir codigoProveedor_fk
    if (!this.muebleForm.codigoProveedor_fk || this.muebleForm.codigoProveedor_fk === "undefined") {
      console.warn("⚠️ Ajustando codigoProveedor_fk inválido");
      this.muebleForm.codigoProveedor_fk = this.proveedores.length > 0 ? this.proveedores[0].codigoProveedor : null;
    } else {
      this.muebleForm.codigoProveedor_fk = parseInt(this.muebleForm.codigoProveedor_fk, 10);
    }

    // Validar que todos los campos requeridos tengan valores correctos
    if (!this.muebleForm.color || !this.muebleForm.precio || !this.muebleForm.material ||
        !this.muebleForm.tipo || !this.muebleForm.descripcion || !this.muebleForm.ancho ||
        !this.muebleForm.altura || !this.muebleForm.profundidad || !this.muebleForm.stock ||
        this.muebleForm.codigoProveedor_fk == null) {
      console.error("❌ Error: Faltan datos obligatorios.");
      alert("Todos los campos son obligatorios.");
      return;
    }

    let nuevoMueble = { ...this.muebleForm };

    // Eliminar id si no se está editando
    if (!this.editando) {
      delete nuevoMueble.id;
    }

    if (!this.editando) {
      console.log("📤 Nuevo mueble:", nuevoMueble);
      this.http.post(this.API_URL, nuevoMueble).subscribe(
        (response: any) => {
          console.log("✅ Mueble agregado:", response);
          this.getMuebles();
          this.mostrarFormulario = false;
        },
        (error) => {
          console.error("❌ Error en la API al crear mueble:", error);
        }
      );
    } else {
      this.http.put(`${this.API_URL}/${this.muebleForm.id}`, nuevoMueble).subscribe(
        (response: any) => {
          console.log("✅ Mueble actualizado:", response);
          this.getMuebles();
          this.mostrarFormulario = false;
          this.editando = false;
        },
        (error) => {
          console.error("❌ Error al actualizar mueble:", error);
        }
      );
    }
  }
  convertirANumero(valor: any): number {
    return parseInt(valor, 10);
  }


  cerrarFormulario() {
    this.mostrarFormulario = false;
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}

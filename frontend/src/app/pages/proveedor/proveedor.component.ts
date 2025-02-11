import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proveedor',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss']
})
export class ProveedorComponent implements OnInit {

  proveedores: any[] = [];
  proveedorEdicion: any = null;
  errorProveedor: any;
  mostrarFormulario = false;
  editando = false;
  API_URL = 'http://localhost:4000/proveedores';

  proveedorForm: any = {
    codigoproveedor: null,
    nombre: '',
    correo: '',
    responsable: '',
    direccion: ''
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getProviders();
  }

  getProviders() {
    this.errorProveedor = null;
    this.http.get(this.API_URL).subscribe(
      (response: any) => {
        this.proveedores = response.data || [];
      },
      (error) => {
        console.error(error);
        this.errorProveedor = error.message;
      }
    );
  }

  getProvider(id: number) {
    this.http.get(`${this.API_URL}/${id}`).subscribe(
      (response: any) => {
        console.log('Proveedor encontrado:', response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  eliminarProveedor(proveedor: any) {
    if (!confirm(`¿Seguro que deseas eliminar al proveedor ${proveedor.nombre}?`)) return;

    this.http.delete(`${this.API_URL}/${proveedor.codigoproveedor}`).subscribe(
      (response: any) => {
        console.log('Proveedor eliminado:', response);
        this.getProviders();
      },
      (error) => {
        console.error('Error al eliminar proveedor:', error);
      }
    );
  }
  abrirFormulario() {
    this.proveedorForm = { codigoproveedor: null, nombre: '', correo: '', responsable: '', direccion: '' };
    this.mostrarFormulario = true;
    this.editando = false;
  }

  editarProveedor(proveedor: any) {
    if (!proveedor.codigoproveedor) {
      console.error('Error: No se puede editar un proveedor sin ID');
      return;
    }
    this.proveedorForm = { ...proveedor };
    
    this.mostrarFormulario = true;
    this.editando = true;
  
    console.log('Editando proveedor:', this.proveedorForm);
  }

  guardarProveedor() {
    if (!this.editando) {
      const nuevoProveedor = { ...this.proveedorForm };
      delete nuevoProveedor.codigoproveedor;

      this.http.post(this.API_URL, nuevoProveedor).subscribe(
        (response: any) => {
          console.log('Proveedor agregado:', response);
          this.getProviders();
          this.mostrarFormulario = false;
        },
        (error) => {
          console.error('Error al agregar proveedor:', error);
        }
      );
    } else {
      if (!this.proveedorForm.codigoproveedor) {
        console.error('Error: No se puede actualizar un proveedor sin ID');
        return;
      }
      
      this.http.put(this.API_URL, this.proveedorForm).subscribe(
        (response: any) => {
          console.log('Proveedor actualizado correctamente:', response);
          this.getProviders();
          this.mostrarFormulario = false;
          this.editando = false;
          this.proveedorForm = { codigoproveedor: null, nombre: '', correo: '', responsable: '', direccion: '' };
        },
        (error) => {
          console.error('Error al actualizar proveedor:', error);
        }
      );
    }
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
  }
}
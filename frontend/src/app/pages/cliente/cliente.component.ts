import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  clientes: any[] = [];
  clienteEdicion: any = null;
  errorCliente: any;
  mostrarFormulario = false;
  editando = false;
  API_URL = 'http://localhost:4000/clientes';

  clienteForm: any = {
    documento: null,
    nombre: '',
    apellido: '',
    direccion: '',
    correo: ''
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes() {
    this.errorCliente = null;
    this.http.get(this.API_URL).subscribe(
      (response: any) => {
        this.clientes = response.data || [];
      },
      (error) => {
        console.error(error);
        this.errorCliente = error.message;
      }
    );
  }

  getCliente(id: number) {
    this.http.get(`${this.API_URL}/${id}`).subscribe(
      (response: any) => {
        console.log('Cliente encontrado:', response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  eliminarCliente(cliente: any) {
    if (!confirm(`¿Seguro que deseas eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`)) return;

    this.http.delete(`${this.API_URL}/${cliente.documento}`).subscribe(
      () => {
        this.getClientes();
      },
      (error) => {
        console.error('Error al eliminar cliente:', error);
      }
    );
  }

  abrirFormulario() {
    this.clienteForm = { documento: null, nombre: '', apellido: '', direccion: '', correo: '' };
    this.mostrarFormulario = true;
    this.editando = false;
  }

  editarCliente(cliente: any) {
    if (!cliente.documento) {
      console.error('Error: No se puede editar un cliente sin documento.');
      alert('No se puede editar un cliente sin documento.');
      return;
    }
    this.clienteForm = { ...cliente };
    this.mostrarFormulario = true;
    this.editando = true;
    console.log('Editando cliente:', this.clienteForm);
  }

  guardarCliente() {
    console.log('Datos enviados al backend:', this.clienteForm);

    if (!this.clienteForm.documento || !this.clienteForm.nombre || !this.clienteForm.apellido) {
      console.error('Error: Faltan datos obligatorios.');
      alert('Todos los campos son obligatorios.');
      return;
    }

    if (!this.editando) {
      const nuevoCliente = { ...this.clienteForm };

      this.http.post(this.API_URL, nuevoCliente).subscribe(
        (response: any) => {
          console.log('Cliente agregado:', response);
          this.getClientes();
          this.mostrarFormulario = false;
        },
        (error) => {
          console.error('Error en la API:', error);
        }
      );
    } else {
      this.http.put(`${this.API_URL}/${this.clienteForm.documento}`, this.clienteForm).subscribe(
        (response: any) => {
          console.log('Cliente actualizado:', response);
          this.getClientes();
          this.mostrarFormulario = false;
          this.editando = false;
          this.clienteForm = { documento: '', nombre: '', apellido: '', direccion: '', correo: '' };
        },
        (error) => {
          console.error('Error al actualizar cliente:', error);
        }
      );
    }
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
  }

  trackById(index: number, item: any): number {
    return item.documento;
  }
}
  
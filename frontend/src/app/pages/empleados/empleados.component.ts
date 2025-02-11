import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadoComponent implements OnInit {

  empleados: any[] = [];
  empleadoEdicion: any = null;
  errorEmpleado: any;
  mostrarFormulario = false;
  editando = false;
  API_URL = 'http://localhost:4000/empleados';

  empleadoForm: any = {
    documento: null,
    nombre: '',
    apellido: '',
    direccion: '',
    correo: ''
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados() {
    this.errorEmpleado = null;
    this.http.get(this.API_URL).subscribe(
      (response: any) => {
        this.empleados = response.data || [];
      },
      (error) => {
        console.error(error);
        this.errorEmpleado = error.message;
      }
    );
  }

  getEmpleado(id: number) {
    this.http.get(`${this.API_URL}/${id}`).subscribe(
      (response: any) => {
        console.log('Empleado encontrado:', response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  eliminarEmpleado(empleado: any) {
    if (!confirm(`¿Seguro que deseas eliminar al empleado ${empleado.nombre} ${empleado.apellido}?`)) return;

    this.http.delete(`${this.API_URL}/${empleado.documento}`).subscribe(
      (response: any) => {
        console.log('Empleado eliminado:', response);
        this.getEmpleados();
      },
      (error) => {
        console.error('Error al eliminar empleado:', error);
      }
    );
  }

  abrirFormulario() {
    this.empleadoForm = { documento: null, nombre: '', apellido: '', direccion: '', correo: '' };
    this.mostrarFormulario = true;
    this.editando = false;
  }

  editarEmpleado(empleado: any) {
    if (!empleado.documento) {
        console.error("Error: No se puede editar un empleado sin documento.");
        alert("No se puede editar un empleado sin documento.");
        return;
    }

    // Carga los datos en el formulario
    this.empleadoForm = { ...empleado };
    this.mostrarFormulario = true;
    this.editando = true;
    console.log("Editando empleado:", this.empleadoForm);
}

guardarEmpleado() {
  console.log("Datos enviados al backend:", this.empleadoForm);

  if (!this.empleadoForm.documento || !this.empleadoForm.nombre || !this.empleadoForm.apellido) {
      console.error("Error: Faltan datos obligatorios.");
      alert("Todos los campos son obligatorios.");
      return;
  }

  if (!this.editando) {
      // Si es un nuevo empleado (POST)
      const nuevoEmpleado = { ...this.empleadoForm };

      this.http.post(this.API_URL, nuevoEmpleado).subscribe(
          (response: any) => {
              console.log("Empleado agregado:", response);
              this.getEmpleados();
              this.mostrarFormulario = false;
          },
          (error) => {
              console.error("Error en la API:", error);
          }
      );
  } else {
      // Si es una edición (PUT)
      this.http.put(`${this.API_URL}/${this.empleadoForm.documento}`, this.empleadoForm).subscribe(
          (response: any) => {
              console.log("Empleado actualizado:", response);
              this.getEmpleados();
              this.mostrarFormulario = false;
              this.editando = false;
              this.empleadoForm = { documento: '', nombre: '', apellido: '', direccion: '', correo: '' };
          },
          (error) => {
              console.error("Error al actualizar empleado:", error);
          }
      );
  }
}

  trackById(index: number, item: any): number {
    return item.documento;
  }  

  cerrarFormulario() {
    this.mostrarFormulario = false;
  }
}

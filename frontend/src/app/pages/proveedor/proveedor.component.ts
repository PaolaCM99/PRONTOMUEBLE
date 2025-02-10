import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProvidersService } from '../../services/providers.service';

@Component({
  selector: 'app-proveedor',
  imports: [CommonModule],
  templateUrl: './proveedor.component.html',
  styleUrl: './proveedor.component.scss'
})
export class ProveedorComponent implements OnInit {

  proveedores:any;
  proveedorEdicion: any;
  errorProveedor: any;

  constructor(private providersService: ProvidersService) { }

  ngOnInit(): void {
    this.getProviders();
  }

  eliminarProveedor(index: number) {
    this.proveedores.splice(index, 1);
  }


  editarProveedor(index: number) {
    this.proveedorEdicion = { ...this.proveedores[index] }; // Clonamos el objeto para evitar referencias
  }

  getProviders() {
    this.errorProveedor = null;
    this.providersService.getProviders().subscribe((providers: any) => {
      if(providers.error) {
        console.error(providers.error);
        this.errorProveedor = providers.error;
        return;
      }

      this.proveedores = providers?.data;
    });
  }

}

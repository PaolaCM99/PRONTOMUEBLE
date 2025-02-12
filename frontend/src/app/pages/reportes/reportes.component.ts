import { Component } from '@angular/core';

@Component({
  selector: 'app-reportes',
  imports: [],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent {

  topSeller: any;
  newCustomers: any[] = [];
  topCustomers: any[] = [];
  topSellingFurniture: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getTopSeller();
    this.getNewCustomers();
    this.getTopCustomers();
    this.getTopSellingFurniture();
  }

  getTopSeller() {
    this.topSeller = { name: 'Juan Pérez', sales: 150 };
  }

  getNewCustomers() {
    this.newCustomers = [
      { name: 'Carlos Gómez', registrationDate: '2025-02-01' },
      { name: 'Ana Torres', registrationDate: '2025-02-05' }
    ];
  }

  getTopCustomers() {
    this.topCustomers = [
      { name: 'Juan Pérez', totalSpent: 1200 },
      { name: 'Laura Fernández', totalSpent: 950 }
    ];
  }

  getTopSellingFurniture() {
    this.topSellingFurniture = [
      { name: 'Sofá Rojo', unitsSold: 30 },
      { name: 'Mesa de Comedor', unitsSold: 25 }
    ];
  }

}

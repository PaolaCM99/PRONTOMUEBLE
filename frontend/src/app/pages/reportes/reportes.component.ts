import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reportes',
  imports: [CommonModule, FormsModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent {

  topSeller: any;
  newCustomers: any[] = [];
  topCustomers: any[] = [];
  topSellingFurniture: any[] = [];
  newCustomerUrl = 'http://localhost:4000/reportes/clientes_nuevos'
  topCustomerUrl = 'http://localhost:4000/reportes/clientes'
  topSellerUrl = 'http://localhost:4000/reportes/vendedor'
  topSellingFurnitureUrl = 'http://localhost:4000/reportes/muebles'

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getTopSeller();
    this.getNewCustomers();
    this.getTopCustomers();
    this.getTopSellingFurniture();
  }

  getTopSeller(date?: string) {
    this.http.post(this.topSellerUrl, {
      "mes": "2024-04-01",
    }).subscribe((data: any) => {
      this.topSeller = data.data[0];
    });
  }

  getNewCustomers(date: string = '2024-04-01') {
    this.http.post<{ data: any[] }>(this.newCustomerUrl, {
      "mes": date,
    }).subscribe((res) => {
      this.newCustomers = res?.data;
    });
  }

  getTopCustomers(date?: string) {
    this.http.get<{ data: any[] }>(this.topCustomerUrl).subscribe((res) => {
      this.topCustomers = res?.data;
    });
  }

  getTopSellingFurniture(date?: string) {
    this.http.get<{ data: any[] }>(this.topSellingFurnitureUrl).subscribe((res) => {
      this.topSellingFurniture = res?.data;
    });
  }

  selectedMonth: string = '01';
  selectedYear: string = '2024';
  months = [
    { name: 'Enero', value: '01' },
    { name: 'Febrero', value: '02' },
    { name: 'Marzo', value: '03' },
    { name: 'Abril', value: '04' },
    { name: 'Mayo', value: '05' },
    { name: 'Junio', value: '06' },
    { name: 'Julio', value: '07' },
    { name: 'Agosto', value: '08' },
    { name: 'Septiembre', value: '09' },
    { name: 'Octubre', value: '10' },
    { name: 'Noviembre', value: '11' },
    { name: 'Diciembre', value: '12' }
  ];
  years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - i).toString());

  onMonthChange() {
    this.updateReports();
  }

  onYearChange() {
    this.updateReports();
  }

  updateReports() {
    const selectedDate = `${this.selectedYear}-${this.selectedMonth}-01`;
    this.getTopSeller(selectedDate);
    this.getNewCustomers(selectedDate);
    this.getTopCustomers(selectedDate);
    this.getTopSellingFurniture(selectedDate);
  }



}

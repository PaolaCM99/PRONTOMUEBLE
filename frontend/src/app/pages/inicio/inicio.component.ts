import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-inicio',
  imports: [SidebarComponent ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InicioComponent {

}

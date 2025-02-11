<<<<<<< HEAD
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  template: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent { }
=======
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent {
  constructor(private router: Router) { }

  login(){
    this.router.navigate(['/inicio'])
  }
}
>>>>>>> 1fa1269 (agregando funciones backend y frontend)

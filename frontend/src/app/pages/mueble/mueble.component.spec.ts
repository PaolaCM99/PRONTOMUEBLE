import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuebleComponent } from './mueble.component';

describe('MuebleComponent', () => {
  let component: MuebleComponent;
  let fixture: ComponentFixture<MuebleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuebleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuebleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

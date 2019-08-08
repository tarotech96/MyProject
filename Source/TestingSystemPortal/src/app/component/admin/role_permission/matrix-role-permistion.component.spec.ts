import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixRolePermistionComponent } from './matrix-role-permistion.component';

describe('MatrixRolePermistionComponent', () => {
  let component: MatrixRolePermistionComponent;
  let fixture: ComponentFixture<MatrixRolePermistionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixRolePermistionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixRolePermistionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixRoleMenuComponent } from './matrix-role-menu.component';

describe('MatrixRoleMenuComponent', () => {
  let component: MatrixRoleMenuComponent;
  let fixture: ComponentFixture<MatrixRoleMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixRoleMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixRoleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

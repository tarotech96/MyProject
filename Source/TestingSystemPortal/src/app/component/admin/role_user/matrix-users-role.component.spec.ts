import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixUsersRoleComponent } from './matrix-users-role.component';

describe('MatrixUsersRoleComponent', () => {
  let component: MatrixUsersRoleComponent;
  let fixture: ComponentFixture<MatrixUsersRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixUsersRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixUsersRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

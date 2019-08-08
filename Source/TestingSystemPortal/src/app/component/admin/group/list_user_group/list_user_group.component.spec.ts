import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListUserGroupComponent } from './list_user_group.component'

describe('GroupComponent', () => {
  let component: ListUserGroupComponent;
  let fixture: ComponentFixture<ListUserGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListUserGroupComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

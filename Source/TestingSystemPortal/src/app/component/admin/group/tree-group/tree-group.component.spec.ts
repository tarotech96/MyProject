import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeGroupComponent } from './tree-group.component';

describe('TreeGroupComponent', () => {
  let component: TreeGroupComponent;
  let fixture: ComponentFixture<TreeGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

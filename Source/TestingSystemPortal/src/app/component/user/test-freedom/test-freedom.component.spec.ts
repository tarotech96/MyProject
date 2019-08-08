import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFreedomComponent } from './test-freedom.component';

describe('TestFreedomComponent', () => {
  let component: TestFreedomComponent;
  let fixture: ComponentFixture<TestFreedomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestFreedomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFreedomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

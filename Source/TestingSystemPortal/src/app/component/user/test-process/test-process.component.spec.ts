import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestProcessComponent } from './test-process.component';

describe('TestProcessComponent', () => {
  let component: TestProcessComponent;
  let fixture: ComponentFixture<TestProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

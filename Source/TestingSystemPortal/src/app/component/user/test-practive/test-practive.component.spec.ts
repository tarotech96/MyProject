import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPractiveComponent } from './test-practive.component';

describe('TestPractiveComponent', () => {
  let component: TestPractiveComponent;
  let fixture: ComponentFixture<TestPractiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestPractiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPractiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

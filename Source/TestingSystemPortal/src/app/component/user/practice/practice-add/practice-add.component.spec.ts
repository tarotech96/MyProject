import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeAddComponent } from './practice-add.component';

describe('PracticeAddComponent', () => {
  let component: PracticeAddComponent;
  let fixture: ComponentFixture<PracticeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

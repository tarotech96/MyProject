import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewnewslistComponent } from './viewnewslist.component';

describe('ViewnewslistComponent', () => {
  let component: ViewnewslistComponent;
  let fixture: ComponentFixture<ViewnewslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewnewslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewnewslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatenewsComponent } from './updatenews.component';

describe('UpdatenewsComponent', () => {
  let component: UpdatenewsComponent;
  let fixture: ComponentFixture<UpdatenewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatenewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatenewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

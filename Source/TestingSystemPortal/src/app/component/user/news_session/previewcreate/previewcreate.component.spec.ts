import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewcreateComponent } from './previewcreate.component';

describe('PreviewcreateComponent', () => {
  let component: PreviewcreateComponent;
  let fixture: ComponentFixture<PreviewcreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewcreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

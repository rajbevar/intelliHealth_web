import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutOutletComponent } from './layout-outlet.component';

describe('LayoutOutletComponent', () => {
  let component: LayoutOutletComponent;
  let fixture: ComponentFixture<LayoutOutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutOutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

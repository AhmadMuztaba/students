import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRouteComponent } from './modal-route.component';

describe('ModalRouteComponent', () => {
  let component: ModalRouteComponent;
  let fixture: ComponentFixture<ModalRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

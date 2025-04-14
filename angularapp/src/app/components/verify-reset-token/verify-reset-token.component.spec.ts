import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyResetTokenComponent } from './verify-reset-token.component';

describe('VerifyResetTokenComponent', () => {
  let component: VerifyResetTokenComponent;
  let fixture: ComponentFixture<VerifyResetTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyResetTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyResetTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

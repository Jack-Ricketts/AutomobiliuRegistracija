import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnitianComponent } from './technitian.component';

describe('TechnitianComponent', () => {
  let component: TechnitianComponent;
  let fixture: ComponentFixture<TechnitianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnitianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnitianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

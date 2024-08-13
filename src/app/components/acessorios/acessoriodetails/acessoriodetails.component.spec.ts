import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessoriodetailsComponent } from './acessoriodetails.component';

describe('AcessoriodetailsComponent', () => {
  let component: AcessoriodetailsComponent;
  let fixture: ComponentFixture<AcessoriodetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcessoriodetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcessoriodetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

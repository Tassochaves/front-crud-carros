import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessoriolistComponent } from './acessoriolist.component';

describe('AcessoriolistComponent', () => {
  let component: AcessoriolistComponent;
  let fixture: ComponentFixture<AcessoriolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcessoriolistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcessoriolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

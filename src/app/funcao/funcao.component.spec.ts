import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncaoComponent } from './funcao.component';

describe('FuncaoComponent', () => {
  let component: FuncaoComponent;
  let fixture: ComponentFixture<FuncaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

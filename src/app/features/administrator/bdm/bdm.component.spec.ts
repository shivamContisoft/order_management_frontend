import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdmComponent } from './bdm.component';

describe('BdmComponent', () => {
  let component: BdmComponent;
  let fixture: ComponentFixture<BdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BdmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

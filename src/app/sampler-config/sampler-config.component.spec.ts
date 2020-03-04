import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplerConfigComponent } from './sampler-config.component';

describe('SamplerConfigComponent', () => {
  let component: SamplerConfigComponent;
  let fixture: ComponentFixture<SamplerConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamplerConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplerConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

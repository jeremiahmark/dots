import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgpatternbuilderComponent } from './svgpatternbuilder.component';

describe('SvgpatternbuilderComponent', () => {
  let component: SvgpatternbuilderComponent;
  let fixture: ComponentFixture<SvgpatternbuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgpatternbuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvgpatternbuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

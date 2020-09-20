import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MadiceenComponent } from './madiceen.component';

describe('MadiceenComponent', () => {
  let component: MadiceenComponent;
  let fixture: ComponentFixture<MadiceenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MadiceenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MadiceenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

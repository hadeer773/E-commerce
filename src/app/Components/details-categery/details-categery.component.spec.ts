import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCategeryComponent } from './details-categery.component';

describe('DetailsCategeryComponent', () => {
  let component: DetailsCategeryComponent;
  let fixture: ComponentFixture<DetailsCategeryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsCategeryComponent]
    });
    fixture = TestBed.createComponent(DetailsCategeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

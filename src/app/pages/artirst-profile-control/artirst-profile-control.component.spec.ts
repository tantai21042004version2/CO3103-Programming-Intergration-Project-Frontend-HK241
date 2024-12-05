import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtirstProfileControlComponent } from './artirst-profile-control.component';

describe('ArtirstProfileControlComponent', () => {
  let component: ArtirstProfileControlComponent;
  let fixture: ComponentFixture<ArtirstProfileControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtirstProfileControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtirstProfileControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

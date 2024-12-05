import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtirstAboutComponent } from './artirst-about.component';

describe('ArtirstAboutComponent', () => {
  let component: ArtirstAboutComponent;
  let fixture: ComponentFixture<ArtirstAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtirstAboutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtirstAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtirstAlbumsComponent } from './artirst-albums.component';

describe('ArtirstAlbumsComponent', () => {
  let component: ArtirstAlbumsComponent;
  let fixture: ComponentFixture<ArtirstAlbumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtirstAlbumsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtirstAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

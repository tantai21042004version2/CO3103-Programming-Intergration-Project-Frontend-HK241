import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtirstAlbumDetailComponent } from './artirst-album-detail.component';

describe('ArtirstAlbumDetailComponent', () => {
  let component: ArtirstAlbumDetailComponent;
  let fixture: ComponentFixture<ArtirstAlbumDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtirstAlbumDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtirstAlbumDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

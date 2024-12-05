import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtirstAlbumUploadComponent } from './artirst-album-upload.component';

describe('ArtirstAlbumUploadComponent', () => {
  let component: ArtirstAlbumUploadComponent;
  let fixture: ComponentFixture<ArtirstAlbumUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtirstAlbumUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtirstAlbumUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

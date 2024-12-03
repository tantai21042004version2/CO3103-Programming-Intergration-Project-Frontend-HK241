import { Component, Input } from '@angular/core';
import { SongResponse } from 'src/app/responses/song/song.response';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() track!: SongResponse;
}

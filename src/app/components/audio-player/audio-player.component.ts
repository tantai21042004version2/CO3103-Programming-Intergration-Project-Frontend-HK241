import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent {
  @Input() audioUrl!: string; // URL bài hát
  isPlaying: boolean = false;
  duration: number = 0; // Tổng thời gian
  currentTime: number = 0; // Thời gian hiện tại
  volume: number = 0.5; // Âm lượng mặc định

  togglePlayPause(audio: HTMLAudioElement): void {
    if (this.isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  updateProgress(audio: HTMLAudioElement): void {
    this.currentTime = audio.currentTime;
    this.duration = audio.duration || 0;
  }

  seek(audio: HTMLAudioElement, event: Event): void {
    const target = event.target as HTMLInputElement;
    audio.currentTime = parseFloat(target.value);
  }

  setVolume(level: number): void {
    this.volume = level;
  }

  changeVolume(audio: HTMLAudioElement, event: Event): void {
    const target = event.target as HTMLInputElement;
    this.volume = parseFloat(target.value);
    audio.volume = this.volume;
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
  }

  onEnded(audio: HTMLAudioElement): void {
    this.isPlaying = false; // Khi bài hát kết thúc
  }
}
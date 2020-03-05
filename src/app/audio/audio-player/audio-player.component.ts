import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
  Input
} from "@angular/core";
import { Track } from "../track";
import { PlaylistService } from "../playlist.service";

@Component({
  selector: "app-audio-player",
  templateUrl: "./audio-player.component.html",
  styleUrls: ["./audio-player.component.scss"]
})
export class AudioPlayerComponent implements AfterViewInit {
  @ViewChild("audioPlayer") audioPlayer!: ElementRef<HTMLAudioElement>;

  @Input()
  public playlist: Track[];

  public playing: boolean;
  private loading: boolean;
  private currentTime: number;
  private volume: number;
  private duration: number;

  constructor(private playlistService: PlaylistService) {
    this.loading = false;
    this.playing = false;
    this.currentTime = 0;
    this.volume = 0.1;
    this.duration = 0.01;
  }

  ngAfterViewInit(): void {
    this.bindNativeEvents();
  }

  public play(): void {
    this.audioPlayer.nativeElement.play();
  }

  public pause(): void {
    this.audioPlayer.nativeElement.pause();
  }

  private bindNativeEvents(): void {
    this.audioPlayer.nativeElement.addEventListener("playing", () => {
      this.onPlaying();
    });

    this.audioPlayer.nativeElement.addEventListener("pause", () => {
      this.onPause();
    });

    this.audioPlayer.nativeElement.addEventListener("timeupdate", () => {
      this.onTimeUpdate();
    });

    this.audioPlayer.nativeElement.addEventListener("volume", () => {
      this.onVolume();
    });

    this.audioPlayer.nativeElement.addEventListener("loadstart", () => {
      this.onLoadStart();
    });

    this.audioPlayer.nativeElement.addEventListener("loadeddata", () => {
      this.onLoadEnd();
    });
  }

  private onPlaying(): void {
    this.playing = true;
    this.duration = Math.floor(this.audioPlayer.nativeElement.duration);
  }

  private onPause(): void {
    this.playing = false;
  }

  private onTimeUpdate(): void {
    this.currentTime = Math.floor(this.audioPlayer.nativeElement.currentTime);
  }

  private onVolume(): void {
    this.volume = Math.floor(this.audioPlayer.nativeElement.volume);
  }

  private onLoadStart(): void {
    this.loading = true;
  }

  private onLoadEnd(): void {
    this.loading = false;
    this.duration = Math.floor(this.audioPlayer.nativeElement.duration);
  }
}

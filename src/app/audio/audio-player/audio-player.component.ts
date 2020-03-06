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
import { EventEmitter } from "protractor";

@Component({
  selector: "app-audio-player",
  templateUrl: "./audio-player.component.html",
  styleUrls: ["./audio-player.component.scss"]
})
export class AudioPlayerComponent implements OnInit, AfterViewInit {
  private readonly PREVIOUS_SONG_RESET_THRESHOLD = 2;

  @ViewChild("audioPlayer") audioPlayer!: ElementRef<HTMLAudioElement>;

  @Input()
  public playlist: Track[];

  public currentTrack: Track;

  public playing: boolean;
  public currentTime: number;
  public duration: number;

  private loading: boolean;
  private volume: number;

  constructor(private playlistService: PlaylistService) {
    this.loading = false;
    this.playing = false;
    this.currentTime = 0;
    this.volume = 0.1;
    this.duration = 0.01;
  }

  public ngOnInit(): void {
    this.playlistService.songChanges().subscribe((newTrack: Track) => {
      console.log("Playing ", JSON.stringify(newTrack));
      if (newTrack.link) {
        this.audioPlayer.nativeElement.src = newTrack.link;
        this.currentTrack = newTrack;
      } else {
        console.info("Skipping track because there was no link:", newTrack);
        this.playlistService.nextSong();
      }
    });
  }

  public ngAfterViewInit(): void {
    this.bindNativeEvents();
  }

  public play(): void {
    this.audioPlayer.nativeElement.play();
    this.playing = true;
  }

  public pause(): void {
    this.audioPlayer.nativeElement.pause();
    this.playing = false;
  }

  public skip(): void {
    this.playlistService.nextSong();
  }

  public previous(): void {
    if (this.currentTime > this.PREVIOUS_SONG_RESET_THRESHOLD) {
      this.audioPlayer.nativeElement.currentTime = 0;
    } else {
      this.playlistService.previousSong();
    }
  }

  private bindNativeEvents(): void {
    this.audioPlayer.nativeElement.addEventListener("playing", () => {
      //console.debug("playing");
      this.onPlaying();
    });

    this.audioPlayer.nativeElement.addEventListener("pause", () => {
      //console.log("pause");
      this.onPause();
    });

    this.audioPlayer.nativeElement.addEventListener("timeupdate", () => {
      this.onTimeUpdate();
    });

    this.audioPlayer.nativeElement.addEventListener("volume", () => {
      this.onVolume();
    });

    this.audioPlayer.nativeElement.addEventListener("loadstart", () => {
      //console.log("loadstart");
      this.onLoadStart();
    });

    this.audioPlayer.nativeElement.addEventListener("loadeddata", () => {
      //console.log("loadeddata");
      this.onLoadEnd();
    });

    this.audioPlayer.nativeElement.addEventListener("ended", () => {
      this.onEnded();
    });
  }

  private onPlaying(): void {
    this.duration = Math.floor(this.audioPlayer.nativeElement.duration);
  }

  private onPause(): void {}

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
    if (this.playing) {
      this.play();
    }
  }

  private onEnded(): void {
    this.playlistService.nextSong();
  }
}

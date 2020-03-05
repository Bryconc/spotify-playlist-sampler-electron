import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AudioService {
  private audio: HTMLAudioElement;

  constructor() {
    this.audio = new Audio();
  }

  public queue(track: SpotifyApi.TrackObjectFull) {
    this.audio.src = track.preview_url;
    this.audio.load();
    this.audio.play();
  }
}

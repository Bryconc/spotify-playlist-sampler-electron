import { Injectable } from "@angular/core";
import { Track } from "./track";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PlaylistService {
  private playlist: Track[];
  private currentIndex: number;
  private songChangesSubject: Subject<Track>;

  constructor() {
    this.playlist = [];
    this.currentIndex = 0;
    this.songChangesSubject = new Subject<Track>();
  }

  public getPlaylist(): Track[] {
    return this.playlist;
  }

  public updatePlaylist(playlist: Track[]): void {
    this.playlist = playlist;
    this.currentIndex = 0;
    if (this.playlist) {
      this.songChangesSubject.next(this.playlist[this.currentIndex]);
    }
  }

  public nextSong(): void {
    if (!this.playlist) {
      return;
    }
    if (this.currentIndex === this.playlist.length - 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }

    this.songChangesSubject.next(this.playlist[this.currentIndex]);
  }

  public previousSong(): void {
    if (!this.playlist) {
      return;
    }
    if (this.currentIndex === 0) {
      this.currentIndex = this.playlist.length - 1;
    } else {
      this.currentIndex--;
    }

    this.songChangesSubject.next(this.playlist[this.currentIndex]);
  }

  public songChanges(): Subject<Track> {
    return this.songChangesSubject;
  }

  public getCurrentIndex(): number {
    return this.currentIndex;
  }
}

import { Component, OnInit } from "@angular/core";
import { PlaylistService } from "src/app/audio/playlist.service";
import { Track } from "src/app/audio/track";

@Component({
  selector: "app-playlist-preview",
  templateUrl: "./playlist-preview.component.html",
  styleUrls: ["./playlist-preview.component.scss"]
})
export class PlaylistPreviewComponent implements OnInit {
  public previousTracks: Track[];
  public currentTrack: Track;
  public futureTracks: Track[];

  constructor(private playlist: PlaylistService) {}

  ngOnInit(): void {
    this.playlist.songChanges().subscribe(() => {
      const currentTracks = this.playlist.getPlaylist();
      const currentIndex = this.playlist.getCurrentIndex();

      if (currentTracks.length < 5) {
        this.previousTracks = currentTracks.slice(0, currentIndex);
        this.currentTrack = currentTracks[currentIndex];
        this.futureTracks = currentTracks.slice(currentIndex + 1);
      } else {
        this.currentTrack = currentTracks[currentIndex];
        let out = [];

        this.getTracksBehind(currentTracks, currentIndex, 2, out);
        this.previousTracks = out;

        out = [];

        this.getTrackAhead(currentTracks, currentIndex, 2, out);
        this.futureTracks = out;
      }
    });
  }

  private getTracksBehind(
    tracks: Track[],
    index: number,
    count: number,
    out: Track[]
  ) {
    if (count === 0) {
      return;
    }

    let nextIndex = index - 1;

    if (nextIndex < 0) {
      nextIndex = tracks.length - 1;
    }

    this.getTracksBehind(tracks, nextIndex, count - 1, out);

    out.push(tracks[nextIndex]);
  }

  private getTrackAhead(
    tracks: Track[],
    index: number,
    count: number,
    out: Track[]
  ) {
    if (count === 0) {
      return;
    }

    let nextIndex = index + 1;

    if (nextIndex > tracks.length - 1) {
      nextIndex = 0;
    }

    out.push(tracks[nextIndex]);

    this.getTrackAhead(tracks, nextIndex, count - 1, out);
  }
}

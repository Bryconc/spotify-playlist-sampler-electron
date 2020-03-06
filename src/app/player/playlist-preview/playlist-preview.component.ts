import { Component, OnInit } from "@angular/core";
import { PlaylistService } from "src/app/audio/playlist.service";
import { Track } from "src/app/audio/track";

@Component({
  selector: "app-playlist-preview",
  templateUrl: "./playlist-preview.component.html",
  styleUrls: ["./playlist-preview.component.scss"]
})
export class PlaylistPreviewComponent implements OnInit {
  public previewTracks: Track[];

  constructor(private playlist: PlaylistService) {}

  ngOnInit(): void {
    this.playlist.songChanges().subscribe(() => {
      const currentTracks = this.playlist.getPlaylist();
      const currentIndex = this.playlist.getCurrentIndex();

      if (currentTracks.length < 5) {
        this.previewTracks = currentTracks;
      } else {
        let begin = [];
        let end = [];

        if (currentIndex == 0) {
          begin = currentTracks.slice(-2);
        } else if (currentIndex == 1) {
          begin = currentTracks.slice(-1).concat(currentTracks.slice(0, 1));
        } else {
          begin = currentTracks.slice(currentIndex - 2, currentIndex);
        }

        if (currentIndex == currentTracks.length - 1) {
          end = currentTracks.slice(-1).concat(currentTracks.slice(0, 2));
        } else if (currentIndex == currentTracks.length - 2) {
          end = currentTracks.slice(-2).concat(currentTracks.slice(0, 1));
        } else {
          end = currentTracks.slice(currentIndex, currentIndex + 3);
        }

        console.log("Beginning ", begin);

        console.log("Ending ", end);

        this.previewTracks = begin.concat(end);
      }

      console.log("Tracks for preview will be ", this.previewTracks);
    });
  }
}

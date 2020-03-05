import { Component, OnInit } from "@angular/core";
import { ConfigService } from "../core/config.service";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.scss"]
})
export class PlayerComponent implements OnInit {
  public currentTracks: Track[];
  public pageSizeOptions: number[];

  constructor(private config: ConfigService) {}

  ngOnInit(): void {
    this.config
      .playlistChanges()
      .subscribe((playlist: SpotifyApi.PlaylistObjectFull) => {
        this.newPlaylist(playlist);
      });
  }

  private newPlaylist(playlist: SpotifyApi.PlaylistObjectFull): void {
    const tracks = playlist.tracks.items.map(
      (item: SpotifyApi.PlaylistTrackObject): Track => {
        return {
          link: item.track.preview_url,
          title: item.track.name
        };
      }
    );

    this.shuffle(tracks);
    this.currentTracks = tracks;
  }

  private shuffle<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}

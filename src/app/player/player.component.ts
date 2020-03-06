import { Component, OnInit } from "@angular/core";
import { ConfigService } from "../core/config.service";
import { Track } from "../audio/track";
import { PlaylistService } from "../audio/playlist.service";

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.scss"]
})
export class PlayerComponent implements OnInit {
  constructor(
    private config: ConfigService,
    private playlistService: PlaylistService
  ) {}

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
        if (!item.track.preview_url) {
          console.info("Playlist track has no preview url: ", item);
        }

        const artist = item.track.artists
          .map((artist: SpotifyApi.ArtistObjectSimplified) => artist.name)
          .join(",");

        return {
          link: item.track.preview_url,
          title: item.track.name,
          artist,
          album: item.track.album.name,
          albumImageLink: item.track.album.images[0].url
        };
      }
    );

    this.shuffle(tracks);
    this.playlistService.updatePlaylist(tracks);
  }

  private shuffle<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}

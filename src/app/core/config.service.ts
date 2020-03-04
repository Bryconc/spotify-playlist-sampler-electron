import { Injectable, SimpleChanges } from "@angular/core";
import { Subject } from "rxjs";
import { SpotifyService } from "./spotify/spotify.service";
import { Response } from "./spotify/model/response";

@Injectable({
  providedIn: "root"
})
export class ConfigService {
  public currentPlaylist: SpotifyApi.PlaylistObjectFull;

  constructor(private spotify: SpotifyService) {}

  public updatePlaylist(playlistId: string) {
    this.spotify
      .getPlaylistInfo(playlistId)
      .then((response: Response<SpotifyApi.SinglePlaylistResponse>) => {
        this.currentPlaylist = response.body;
        console.log(this.currentPlaylist);
      });
  }
}

import { Injectable, SimpleChanges } from "@angular/core";
import { Subject } from "rxjs";
import { SpotifyService } from "./spotify/spotify.service";
import { Response } from "./spotify/model/response";

@Injectable({
  providedIn: "root"
})
export class ConfigService {
  public currentPlaylist: SpotifyApi.PlaylistObjectFull;

  private playlistChangeSubject: Subject<SpotifyApi.PlaylistObjectFull>;

  constructor(private spotify: SpotifyService) {
    this.playlistChangeSubject = new Subject<SpotifyApi.PlaylistObjectFull>();
  }

  public updatePlaylist(playlistId: string) {
    this.spotify
      .getPlaylistInfo(playlistId)
      .then((response: Response<SpotifyApi.SinglePlaylistResponse>) => {
        this.currentPlaylist = response.body;
        this.playlistChangeSubject.next(this.currentPlaylist);
        console.log(this.currentPlaylist);
      });
  }

  public playlistChanges(): Subject<SpotifyApi.PlaylistObjectFull> {
    return this.playlistChangeSubject;
  }
}

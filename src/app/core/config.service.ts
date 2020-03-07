import { Injectable, SimpleChanges } from "@angular/core";
import { Subject, forkJoin } from "rxjs";
import { SpotifyService } from "./spotify/spotify.service";
import { Response } from "./spotify/model/response";
import { PlaylistUpdateMessage } from "./playlist-update-message";

@Injectable({
  providedIn: "root"
})
export class ConfigService {
  public currentPlaylist: SpotifyApi.PlaylistObjectFull;

  private playlistChangeSubject: Subject<PlaylistUpdateMessage>;

  constructor(private spotify: SpotifyService) {
    this.playlistChangeSubject = new Subject<PlaylistUpdateMessage>();
  }

  public updatePlaylist(playlistId: string) {
    this.spotify
      .getPlaylistInfo(playlistId)
      .then((response: Response<SpotifyApi.SinglePlaylistResponse>) => {
        this.currentPlaylist = response.body;
        this.loadRemainingPlaylistTracks(response.body);

        this.playlistChangeSubject.next({
          playlist: this.currentPlaylist,
          strategy: "replace"
        });
        console.log(this.currentPlaylist);
      });
  }

  public playlistChanges(): Subject<PlaylistUpdateMessage> {
    return this.playlistChangeSubject;
  }

  private loadRemainingPlaylistTracks(
    playlist: SpotifyApi.PlaylistObjectFull
  ): void {
    const trackLoadPromises = [];
    let remainingTracks = playlist.tracks.total - playlist.tracks.items.length;
    let offset = playlist.tracks.items.length;

    if (remainingTracks <= offset) {
      return;
    }

    const limit = playlist.tracks.limit;
    while (remainingTracks > 0) {
      trackLoadPromises.push(
        this.spotify.getPlaylistTracks(playlist.id, offset, limit)
      );
      remainingTracks -= limit;
      offset += limit;
    }

    forkJoin(trackLoadPromises).subscribe(
      (responses: Response<SpotifyApi.PlaylistTrackResponse>[]) => {
        const additionalTracks = [];
        for (let response of responses) {
          additionalTracks.push(...response.body.items);
        }
        this.currentPlaylist.tracks.items.push(...additionalTracks);
        this.playlistChangeSubject.next({
          playlist: this.currentPlaylist,
          strategy: "reload"
        });
      }
    );
  }
}

import { Injectable } from "@angular/core";
import SpotifyWebApi from "spotify-web-api-node";
import { Response } from "./model/response";
import { AuthService } from "../auth.service";

@Injectable({
  providedIn: "root"
})
export class SpotifyService {
  private spotify: SpotifyWebApi;

  constructor(private authService: AuthService) {
    this.spotify = new SpotifyWebApi();
  }

  public getPlaylistInfo(
    playlistId: string
  ): Promise<Response<SpotifyApi.SinglePlaylistResponse>> {
    this.spotify.setAccessToken(this.authService.getAccessToken());
    return this.spotify.getPlaylist(playlistId);
  }
}

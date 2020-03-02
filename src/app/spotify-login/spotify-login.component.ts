import { Component, OnInit } from "@angular/core";
import { ElectronService } from "ngx-electron";
import { AuthService } from "../core/auth.service";

const CLIENT_ID = "602703732a5f49608d372347e1b4a881";
const SPOTIFY_AUTHORIZE_URL = "https://accounts.spotify.com/authorize";
const REDIRECT_URI = "http://localhost/oauth/callback";
const filter = {
  urls: [`${REDIRECT_URI}*`]
};

@Component({
  selector: "app-spotify-login",
  templateUrl: "./spotify-login.component.html",
  styleUrls: ["./spotify-login.component.scss"]
})
export class SpotifyLoginComponent implements OnInit {
  private authWindow: Window;
  constructor(
    private electron: ElectronService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log(this.electron);
    console.log(this.electron.remote);
    this.electron.remote.session.defaultSession.webRequest.onBeforeRequest(
      filter,
      (details, callback) => {
        this.authService.handleCallback(details);
        this.authWindow.close();
        callback({ cancel: true });
      }
    );
    this.authWindow = window.open(this.getLoginURL());
  }

  getLoginURL(): string {
    return `${SPOTIFY_AUTHORIZE_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token`;
  }
}

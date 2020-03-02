import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { NgxElectronModule } from "ngx-electron";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SpotifyLoginComponent } from "./spotify-login/spotify-login.component";

@NgModule({
  declarations: [AppComponent, SpotifyLoginComponent],
  imports: [BrowserModule, NgxElectronModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

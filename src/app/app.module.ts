import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { NgxElectronModule } from "ngx-electron";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SpotifyLoginComponent } from "./spotify-login/spotify-login.component";
import { SamplerComponent } from "./sampler/sampler.component";
import { PlayerComponent } from "./player/player.component";
import { SamplerConfigComponent } from "./sampler-config/sampler-config.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AudioPlayerComponent } from "./audio/audio-player/audio-player.component";

@NgModule({
  declarations: [
    AppComponent,
    SpotifyLoginComponent,
    SamplerComponent,
    PlayerComponent,
    SamplerConfigComponent,
    AudioPlayerComponent
  ],
  imports: [
    BrowserModule,
    NgxElectronModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

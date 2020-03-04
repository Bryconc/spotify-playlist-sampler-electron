import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SpotifyLoginComponent } from "./spotify-login/spotify-login.component";
import { SamplerComponent } from "./sampler/sampler.component";

const routes: Routes = [
  { path: "spotify-login", component: SpotifyLoginComponent },
  { path: "sampler", component: SamplerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

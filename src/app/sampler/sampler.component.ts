import { Component, OnInit } from "@angular/core";
import { ConfigService } from "../core/config.service";
import { Response } from "../core/spotify/model/response";
import { SpotifyService } from "../core/spotify/spotify.service";

@Component({
  selector: "app-sampler",
  templateUrl: "./sampler.component.html",
  styleUrls: ["./sampler.component.scss"]
})
export class SamplerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

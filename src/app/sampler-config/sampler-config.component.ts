import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ConfigService } from "../core/config.service";
import { Observable, Subject } from "rxjs";

@Component({
  selector: "app-sampler-config",
  templateUrl: "./sampler-config.component.html",
  styleUrls: ["./sampler-config.component.scss"]
})
export class SamplerConfigComponent implements OnInit {
  public updatePlaylistForm: FormGroup;

  constructor(public config: ConfigService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.updatePlaylistForm = this.formBuilder.group({
      playlistId: ""
    });
  }

  public updatePlaylist(): void {
    const playlistId = this.updatePlaylistForm.get("playlistId").value;
    this.config.updatePlaylist(playlistId);
  }
}

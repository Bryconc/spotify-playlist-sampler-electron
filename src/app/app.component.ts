import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "spotify-playlist-sampler";
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.navigate(["spotify-login"]);
  }
}

import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OnBeforeRequestListenerDetails } from "electron";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private route: ActivatedRoute) {}

  public handleCallback(details: OnBeforeRequestListenerDetails) {
    console.log(details);
    const params = {};
    const query = details.url.replace(/^.*\#/, "").split("&");
    for (let i = 0; i < query.length; i++) {
      const split = query[i].split("=");
      params[split[0]] = split[1];
    }
    console.log(params);
  }
}

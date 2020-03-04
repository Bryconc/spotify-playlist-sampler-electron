import { Injectable } from "@angular/core";
import { OnBeforeRequestListenerDetails } from "electron";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private accessToken: string;
  private expiresOn: number;

  constructor(private storage: StorageService) {}

  public handleCallback(details: OnBeforeRequestListenerDetails) {
    const params = {};
    const query = details.url.replace(/^.*\#/, "").split("&");
    for (let i = 0; i < query.length; i++) {
      const split = query[i].split("=");
      params[split[0]] = split[1];
    }

    const time = new Date().getTime();
    const expiresIn = Number(params["expires_in"]) * 1000 - 60;
    this.accessToken = params["access_token"];
    this.expiresOn = time + expiresIn;
    this.cacheToken();
  }

  public getAccessToken(): string {
    return this.accessToken;
  }

  public isAuthenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.accessToken) {
        resolve(true);
      }

      this.storage
        .get("tokenData")
        .then(tokenData => {
          if (!tokenData) {
            resolve(false);
          } else {
            this.accessToken = tokenData["accessToken"];
            this.expiresOn = tokenData["expiresOn"];

            resolve(this.tokenIsExpired());
          }
        })
        .catch(error => {
          console.error("Token data lookup failed because of error: ", error);
          reject(error);
        });
    });
  }

  private cacheToken(): void {
    const tokenData = {
      accessToken: this.accessToken,
      expiresOn: this.expiresOn
    };

    this.storage.set("tokenData", tokenData);
  }

  private tokenIsExpired(): boolean {
    const now = new Date();
    const expiresOn = new Date(this.expiresOn);

    return now < expiresOn;
  }
}

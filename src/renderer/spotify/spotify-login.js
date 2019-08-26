const { session } = require('electron').remote;

const CLIENT_ID = '602703732a5f49608d372347e1b4a881';
const SPOTIFY_AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';
const REDIRECT_URI = 'http://localhost/oauth/redirect';

const getLoginURL = () => {
  return `${SPOTIFY_AUTHORIZE_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token`;
};

const filter = {
  urls: [`${REDIRECT_URI}*`]
};

let authWindow = null;

const login = () => {
  session.defaultSession.webRequest.onBeforeRequest(
    filter,
    (details, callback) => {
      console.log(details);
      authWindow.close();
      callback({ cancel: true });
    }
  );

  authWindow = window.open(getLoginURL());
};
const openSpotifyLogin = () => {
  login();
};

window.onload = openSpotifyLogin;

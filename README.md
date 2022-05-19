Deployed at: https://althill.web.app/

Click different locations in SF to see the 10 nearest food trucks to that location.

## Architecture

Technologies: Angular, Typescript, Firebase

* UI: Typescript & Angular
* Platform: Firebase (deployment, hosting)
* Backend: Nodejs Express on Firebase functions

The tech stack was chosen because I had made an app 
using it that I could repurpose.
[freeworld.app](https://freeworld.app/) - 
[Windows store](https://apps.microsoft.com/store/detail/freeworld/9PMF3LWGJJC0), 
[Play store](https://play.google.com/store/apps/details?id=app.freeworld.twa)

The website makes json POST requests to the backend using firebase https 
function call specification to retrieve the list food carts. Making GET 
requests would have been ideal, but I wanted to build using the framework
similar to my previous app. In this case only minimal value was added by the framework: it allowed request response data types to be shared and
handles serializing and deserializing of requests, responses & errors.
Normally auth is also manged by the framework but not used here.

## Open Issues

I ran out of time. The CLI was not started. There are no frontend tests.
The backand has barebones tests. The tests use real instead of mocked data.
UI wise, no details other than the location of food trucks are displayed.
The location selected looks identical to the foodtruck pins etc.

## Code layout

functions/ - Backend APIs built with nodejs, typescript, express, hosted on firebase functions<br/>
hosting/   - Frontend built with typescript, angular, hosted on firebase.<br/>
shared/    - Shared API types. Ideally would make a shared client as well.<br/>
cli/       - Incomplete - cli built with nodejs

## Install

System Requirements: nodejs 16.0+ installed on the system.

Environment Setup

```
$ cd hosting/functions/cli
$ npm install

# (Optional) - To be able to deploy
$ npx firebase login  
```

See component README.md files for how to build, run locally & deploy.

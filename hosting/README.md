## Build

```
npm run build
```

## Run locallly

```
npm run serve
```

This runs the hosting env locally and reloads on changes. 
It's supposed to connect to the local functions emulator but I 
didn't get that working, so the app does not function locally.

## Testing

Framework for unit testing exists but tests have not been created.
Boilerplate for tests, run with npm run test fails.

## Deploy

Create a firebase project, run firebase login, update API key & project config in functions/environment.json. (Current API key only works in the deployed domain.) Then run.

```
npm run deploy
```

This deploys to https://althill.web.app

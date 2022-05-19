## Build

```
$ npm run build
```

## Run locally

Firebase functions run locally with emulators. Start emulators and local hosting with:

```
$ npm run serve
```

Https function API calls can be made like below:

```
curl -s -X POST -H "Content-Type: application/json" \
  "http://localhost:5001/althill/us-central1/app/api/nearby" \
  -d '{"data":{"loc":{"lat":37.773972,"long":-122.431297}, "limit": 50}}'
```

Alternativey, firebase provide an interactive shell that allows APIs 
to be called:
```
npm run shell
```

Changes made to code are not hot reloaded due to an issue. 
Restart npm run shell after making changes.

Example of the same curl API call in the shell

```
functions> app.post('/api/nearby').json({data:{loc:{lat:12, long:23}, limit: 5}});
```

## Testing

Run tests with

```
npm run test
```

## Deploy

Create a firebase project, run firebase login, update API key & project config in functions/environment.json. (Current API key only works in the deployed domain.) Then run.

```
npm run deploy
```

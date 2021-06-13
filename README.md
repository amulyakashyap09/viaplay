# VIAPLAY

## Task
> A REST API for providing clients with trailer URLs. The API should take a
movie resource link (e.g. https://content.viaplay.se/pc-se/film/arrival-2016) as input and based on
that return the URL to the trailer for that movie.

## Prerequisites

- NodeJs (minimum 8.x)
- Redis (minimum 5.x)

## Server

API Details
```
host = localhost
port = 3000
path = /movies/trailer
query param = movieUrl
```

Git
```
git clone https://github.com/amulyakashyap09/viaplay.git

cd viaplay
```

Command
- With **REDIS SUPPORT** (Optimised && Recommended)
```
NODE_ENV=prod USE_REDIS=true node ./bin/www
```

- Without **REDIS** (if redis is not installed)
```
NODE_ENV=prod USE_REDIS=false node ./bin/www
```

## Example

```
curl --location --request GET 'http://localhost:3000/movies/trailer?movieUrl=https://content.viaplay.se/pc-se/film/arrival-2016'
```

## Response
```
{
    "trailer": "https://www.youtube.com/watch?v=gwqSi_ToNPs"
}
```


## Why to use Redis

|| With Redis               | Without Redis |
| --- | --- | --- |
|First Requst      | 1200 ms | 1200 ms       |
|Repeating Request | 10 ms   | 1200 ms       |
```
As we can see, after using redis we can optimise the performance of API tremendouly
```

## Keypoints

- Expressjs a minimal Framework used for simple and fast response
- Redis is used for the optimisation purpose, to avoid every time making hit to tmdb server
- API Test cases have been added
- Logging - winston logger is used to log the response
- For Request Payload Validation we have used Joi library
- Eslint has been used for the code lint

## For Future improvements
- Authenticaltion && Authorisation in the applications 
- Swagger documentation

## Structure
- bin - startup file
- config - env based configuration
- controllers - contains the logic to bring out the trailers 
- db - contains redis interacting code
- routes - landing point of API request
- helpers - collection of helping functions
- tests - conatins the test cases
- app.js - server file
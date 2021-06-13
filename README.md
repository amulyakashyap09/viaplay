# VIAPLAY

## Task
> A REST API for providing clients with trailer URLs. The API should take a
movie resource link (e.g. https://content.viaplay.se/pc-se/film/arrival-2016) as input and based on
that return the URL to the trailer for that movie.

## Server

### Prod
    -   npm start

### Example

```
curl --location --request GET 'http://localhost:3000/movies/trailer?movieUrl=https://content.viaplay.se/pc-se/film/arrival-2016'
```
### Request
```
{
    "trailer": "https://www.youtube.com/watch?v=gwqSi_ToNPs"
}
```

### Keypoints

- Expressjs a minimal Framework used for simple and fast response
- Redis is used for the optimisation purpose, to avoid every time making hit to tmdb server
- API Test cases have been added
- Logging - winston logger is used to log the response
- For Request Payload Validation we have used Joi library
- Eslint has been used for the code lint

### For Future improvements
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
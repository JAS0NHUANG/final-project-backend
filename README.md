# Hello Movie Backend API
Lidemy mentor-program-4th Final Project Hello Movie Backend API

Base URL: http://movie-api.jas0nhuang.tw/

## GET
### movies_intheaters
Get information about movies in theaters.

URL: `/movies-intheaters`

Method: `GET`

Query Parameters:

- None

  Response: An array of movie (in theaters) information objects.  
  Sorted by release date in descending order.  
  A single object example:
  ```
  {
    "_id": "5fc9cad77642aa2e900c55dd",
    "name": "古魯家族：新石代",
    "releaseDate": 1606435200000,
    "story": "STORY TEXT",
    "imgSrc": "https://............",
    "genre": ["'動畫'","'喜劇'"],
    "runtime: "01時35分",
    "imdbRating": "7.1",
    "director": "喬伊克勞福德(JoelCrawford)",
    "actors": ["尼可拉斯凱吉(NicolasCage)","萊恩雷諾斯(RyanReynolds)"...],
    "trailer": "https://...........",
    "thumbnails": {
      "default":{
        "url":"https://.......",
        "width":120,
        "height":90
      },
      "medium":{...},
      "high":{...}
    }
  }
  ```

- genre

  Response: Same as above but movies filtered with genre given.  

  Request example:
  ```
  fetch('http://movie-api.jas0nhuang.tw/movies-intheaters?genre=喜劇')
    .then(...)
  ```

### movies_thisweek
Get information about movies relasing in the coming week.

URL: `/movies-thisweek`

Method: `GET`

Response: An array of movie information objects.
A single object example is the same as movies_intheaters.


### movie_genres
Get movie genres.

URL: `/movie-genres`

Method: `GET`

Response: An array of movie genre strings.  
Example:
```
["犯罪","愛情/溫馨","劇情","動畫","奇幻","紀錄片","動作","影展","影集"]
```


### unsubscribe
Unubscribe to the mailing list.  
Use it by creating an unsubscribe link.  
No validation right now.  

URL: `/unsubscribe`

Method: `GET`

Query Parameters:  

  - email

    Response: A MongoDB result object.

    Request example: 
    ```
    fetch('https://movie-api.jas0nhuang.tw/unsubscribe?email=youremail@email.com')
      .then(...)
    ```

### error
Shows when error occurs (same for all GET APIs).

Response: An object shown as below:
```
{ "ok": 0, "errorMessage": error}
```

## POST
### subscribe
Subscribe to the mailing list.

URL: `/subscribe`

Method: `POST`

Response: A MongoDB result object.

Headers: 
```
{
  "Content-Type": "application/json"
}
```

Request example: 
("email" field is required, "genres" field optional.)
```
fetch('http://movie-api.jas0nhuang.tw/subscribe', {
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  },
  body: JSON.stringify({
    email: 'youremail@email.com',
    genres: ["動作"，"愛情/溫馨"]
  })
})
.then(res => res.json())
.then(data => console.log(data))
```

------------------
# Planning:

## register
Method: `POST`

## login
Method: `POST`

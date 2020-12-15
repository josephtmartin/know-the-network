# Know The Network
#### This is an app that will give you the ability to search a tv show that you watch and display what network/app it is available on. Examples: Netflix, CBS, The CW. 
#### A watchlist page of shows that you want to watch
#### A favorite page where the user can add their favorite shows and leave a review of them and a brief description

## Motivation
I wanted to create this app because when I cancelled cable I wanted to know what streaming apps I needed to subscribe to in order to watch my shows. I got tired of having to google each one and try to find the answer. I created this app to make that process easier and more!

## Features
- Search feature to search a show and it display what network/app/streaming platform it is available on 
- Filter based on what network the show is on
- Watchlist 
  - The authenticated user can add/delete a show on the watchlist and a way for the user to say whether or not they have watched the show 
- Favorites 
  - The authenticated user can add/delete a show on their favorites and add/update a description or favorite part of the show
- The authenticated user can rate the shows they have in their favorites

## Deploy Link/Status
[Site Link](knowthenetwork.netlify.app)

[![Netlify Status](https://api.netlify.com/api/v1/badges/f1f95088-0e74-4f5c-a691-17ed0c703cea/deploy-status)](https://app.netlify.com/sites/knowthenetwork/deploys)

## Planning
- [Figma Wireframe](https://www.figma.com/file/6lvjsIpekpPl5gwTUztuWb/Know-The-Network?node-id=0%3A1)
- [LucidChart ERD](https://lucid.app/lucidchart/invitations/accept/7c9cc794-9f81-44d5-90e3-1d2b49e1cf0b)
- [Github Project](https://github.com/josephtmartin/know-the-network/projects/2)

## ERD
![ERD](https://i.postimg.cc/sDrDjRgB/new-captsone-erd.png)

## Loom Video
[Overview Of Project Planning](https://www.loom.com/share/865f41b3000b475eb504b6b9bf3ea2c0)

## Example Data From [The Movie DB](https://www.themoviedb.org/)
```
    {
      "id": 46778,
      "name": "Stranger Things",
      "permalink": "montauk",
      "start_date": "2016-07-15",
      "end_date": null,
      "country": "US",
      "network": "Netflix",
      "status": "Running",
      "image_thumbnail_path": "https://static.episodate.com/images/tv-show/thumbnail/46778.jpg"
    },
```

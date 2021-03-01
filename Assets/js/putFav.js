// document.addEventListener('DOMContentLoaded', putFavourites);
putFavourites();
const favSongs = document.querySelector("#favSongs");
function putFavourites() {
    let favSong;
    if(localStorage.getItem('favSongs')){
        favSong = JSON.parse(localStorage.getItem('favSongs'));
    }
    console.log(favSong);
    // console.log(favSong[0]);
    let output = '';
    if(favSong.length === 0){
        return;
    }
    favSong.forEach(songs => {
        // fetch data
        fetch("https://genius.p.rapidapi.com/songs/"+songs, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "53485a8fadmsh7bfa6acdf627f77p166324jsncf4e61281f8d",
                "x-rapidapi-host": "genius.p.rapidapi.com"
            }
        }).then(res => res.json())
        .then(jsonFormat => jsonFormat.response)
        .then(response => response.song)
        .catch((error) => {
            console.log(error)
        });
    });   
}
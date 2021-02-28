const songView = document.querySelector("#songLyrics");
const albumArt = document.querySelector('#image-container');
const songLyrics = document.querySelector("#lyrics-container");

document.addEventListener('DOMContentLoaded', getSong);
function getSong() { 
    let songID = sessionStorage.getItem('songID');
    // console.log(songID);
        // fetch data
        fetch("https://genius.p.rapidapi.com/songs/"+songID, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "53485a8fadmsh7bfa6acdf627f77p166324jsncf4e61281f8d",
                "x-rapidapi-host": "genius.p.rapidapi.com"
            }
        }).then(res => res.json())

}
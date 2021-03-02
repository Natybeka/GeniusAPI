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
        .then(song => { 
            console.log(song);
            output += `

                    <div class="card col-sm-3 align-items-center">
                        <img class="card-img-top" src="${song.header_image_url}"/>
                        <div class="card-block text-center">
                            <h5 class="card-title text-center">Title: ${song.title}</h5>
                            <a onclick="songSelected('${song.id}')" class="btn btn-sm btn-success">Lyric Details</a>
                            <a onclick="removeSong('${song.id}')" class="btn btn-sm btn-success">Remove From Favourite</a>
                        </div>
                    </div>
                `
                favSongs.innerHTML = output;
        })
        .catch((error) => {
            console.log(error)
        });
    });   
}

function removeSong(songID){
    let songs = JSON.parse(localStorage.getItem('favSongs'));
    // console.log(songID);
    let index = songs.indexOf(songID);
    console.log(index);
    let newSongs = remover(songs, index);
    console.log(newSongs);
    localStorage.setItem('favSongs', JSON.stringify(newSongs))

    location.reload();
}
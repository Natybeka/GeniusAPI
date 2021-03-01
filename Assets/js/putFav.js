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
      
}
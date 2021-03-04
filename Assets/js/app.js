const submitForm = document.querySelector("#searchForm");
const inputText = document.querySelector("#searchText");
const lyricsView = document.querySelector("#lyrics");
const spinner = document.querySelector("#spinner");


submitForm.addEventListener('submit', searchAPI);

function searchAPI(event) {
	event.preventDefault();
	let searchText = inputText.value;
	spinner.style.display = 'block';
	// console.log(searchText);

	// fetch data
	fetch("https://genius.p.rapidapi.com/search?q="+searchText, {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "53485a8fadmsh7bfa6acdf627f77p166324jsncf4e61281f8d",
			"x-rapidapi-host": "genius.p.rapidapi.com"
		}
	}).then(res => res.json())
	.then(jsonFormat => jsonFormat.response)
	.then(result => result.hits)
	.then(hits => {
		let musicHits = hits;
		console.log(musicHits);
		let output = '';
		console.log(musicHits);
		musicHits.forEach(song => {
			output += `
				
				<div class="card col-sm-3 align-items-center">
				<img class="card-img-top" src="${song.result.header_image_url}"/>
				<div class="card-block text-center">
					<h5 class="card-title text-center">Title: ${song.result.title}</h5>
					<a onclick="songSelected('${song.result.id}')" class="btn btn-sm btn-success">Lyric Details</a>
					<a onclick="addToFavourite('${song.result.id}')" class="btn btn-sm btn-success">Add To Favourite</a>
				</div>
			</div>
				
			`
		});
		lyricsView.innerHTML = output;
		spinner.style.display = 'none';
		myFunction("snackbar");

	})
	.catch((error) => {
		myFunction("retrysnackbar");
		spinner.style.display = 'none';
		console.log(error)
	})
}


function songSelected(songID) {
	sessionStorage.setItem('songID', songID)
	window.location.href = './song.html';
	return false;
}

function addToFavourite(songID) {

	let storage;
	let result;
	myFunction("favsnackbar");
	if ( result = localStorage.getItem('favSongs')) {
		storage = JSON.parse(result)
		if (search(storage, songID)) {
			return;
		}
		storage.push(songID);
		localStorage.setItem('favSongs', JSON.stringify(storage));
	}
	else {
		storage = []
		storage.push(songID);
		localStorage.setItem('favSongs', JSON.stringify(storage));
		
	}
	
	
}

function search(array, key) {
	for (let i = 0; i < array.length;i++) {
		if (array[i] == key) {
			return true;
		}
	}
	return false;
}

function myFunction(id) {
	var x = document.getElementById(id);
	x.className = "show";
	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

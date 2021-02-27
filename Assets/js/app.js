const submitForm = document.querySelector("#searchForm");
const inputText = document.querySelector("#searchText");
const lyricsView = document.querySelector("#lyrics");


submitForm.addEventListener('submit', searchAPI);

function searchAPI(event) {
	event.preventDefault();
	let searchText = inputText.value;
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
	.then(result => console.log(result.hits))
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
						</div>
					</div>
				
			`
		});
		lyricsView.innerHTML = output;

	})
	.catch((error) => {
		console.log(error)
	})
}


function songSelected(songID) {
	sessionStorage.setItem('songID', songID)
	window.location.href = './song.html';
	return false;
}
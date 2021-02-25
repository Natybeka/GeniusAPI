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
}
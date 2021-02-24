const submitForm = document.querySelector("#searchForm");
const inputText = document.querySelector("#searchText");
const lyricsView = document.querySelector("#lyrics");


submitForm.addEventListener('submit', searchAPI);

fetch("https://genius.p.rapidapi.com/search?q=Kendrick%20Lamar", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "53485a8fadmsh7bfa6acdf627f77p166324jsncf4e61281f8d",
		"x-rapidapi-host": "genius.p.rapidapi.com"
	}
})
.then(response => {
	return response.json();
})
.then(result => {console.log(result.response.hits.forEach(element => {
    console.log(element.result);    
})
)})
// .then(response => { 
//         let resultArray = []
//         response.forEach(element => {
//             resultArray.push(element.result);
//         });
//         return resultArray;
// })
// .then(resultArray => console.log(resultArray))
.catch(err => {
	console.error(err);
});
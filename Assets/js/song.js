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
        .then(jsonFormat => jsonFormat.response.song)
        .then(song => {
            let image = document.createElement('img');
            console.log(song);
            image.setAttribute('src', `${song.header_image_thumbnail_url}`)
            albumArt.appendChild(image)
            return song.description.dom.children;
        })
        .then(children => {
            let tags = []
            let tagStrings = []
            for (let index in children) {

                if (children[index] == "") {
                    continue;
                }
                
                for (let i in children[index]) {
                    var element = children[index][i];
                    
                    if (typeof(element) == "string") {
                        let tag = document.createElement(element)
                        tags.push(tag);
                    }
                    else {
                        var stringTag = ""
                        for (let k in element) {
                            let elementProp = element[k];
                            if (typeof(element[k]) == "string"){
                                stringTag += element[k]
                            }
                            else  {
                                for (let m in elementProp) {
                                    var tagString = ""
                                    // console.log(array)
                                    if (m == "children") {
                                        tagString += elementProp[m][0];
                                    }   
                                }
                                stringTag += tagString;    
                            }
                        }
                        tagStrings.push(stringTag);   
                    }
            
                }
            }
            let output = ``;
            tags.forEach((value, index) => {
                value.innerHTML = tagStrings[index];
            })

            tags.forEach((value, index) => {
                songLyrics.appendChild(value);
            })

           console.log(children)
        })       
        .catch((error) => {
            console.log(error)
        })

    }
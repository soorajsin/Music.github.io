setTimeout(function () {
          document.getElementById('loading').style.display = 'none';
}, 2000)


function doAjax() {
          const searchVal = document.getElementById('searchbox').value;
          const URL = `https://itunes.apple.com/search?term=${searchVal}&limit=14`;
          const promise = fetch(URL);
          promise.then(response => {
                    response.json().then(data => {
                              console.log('Result is ', data.results);
                              document.getElementById('list').innerHTML = '';
                              printSongs(data.results);
                              // console.log('Result is ', data.results);
                    }).catch(err => {
                              console.log("invalid JSON", err);
                    }).catch(err => {
                              console.log('Some Server issue', err);
                    })
          })
}

function printSongs(songs) {
          const divs = songs.map(song => prepareCard(song));
          console.log(divs);
          const listDiv = document.getElementById('list');
          divs.forEach(e => listDiv.appendChild(e));
          //document.getElementById('list').appendChild(divs);
}

function prepareCard(song) {
          const div = document.createElement('div');
          div.className = "card";
          div.style = {
                    'width': '18rem'
          };
          const image = document.createElement('img');
          image.src = song.artworkUrl100;
          div.appendChild(image);
          const div2 = document.createElement('div');
          div2.className = 'card-body';
          const h1 = document.createElement('h1');
          h1.className = 'card-title';
          h1.innerText = song.collectionName;
          const audio = document.createElement('audio');
          audio.src = song.previewUrl;
          audio.controls = true;
          audio.type = 'audio/mp4';
          div.appendChild(h1);
          div.appendChild(audio);
          return div;
          // <div class="card" style="width: 18rem;">
          //                     <img src="..." class="card-img-top" alt="...">
          //                     <div class="card-body">
          //                               <h5 class="card-title">Card title</h5>
          //                               <p class="card-text">Some quick example text to build on the card title and make
          //                                         up the bulk of the card's content.</p>
          //                               <a href="#" class="btn btn-primary">Go somewhere</a>
          //                     </div>
          //           </div>
}
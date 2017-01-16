/*
Team Excercise Cohort 17
John McCutchan
Krishnapriya Sivasubramanian
James Wier
*/
//
/* Global Variables ============================================ */
var movieList = "";
var modalCard = "";
var watchedMovieList;
var unWatchedMovieList;
//
/* Card template =============================================== */
function card(data) {
  movieList = "";
  for (var i=0 ; i < data.Search.length; i++){
    movieList += `
                  <div class="col-md-4 movieCard" id="movieCard${i}">
                    <h3>${data.Search[i].Title}</h3>
                    <p>Year: ${data.Search[i].Year}</p>
                    <img class="img-responsive center-block" src= ${data.Search[i].Poster} alt="Poster not available " />
                    <p><a href="movieCard${i}" rel="modal:open"></a></p>
                  </div>`
  }
  return movieList;
}
/* Modal Card ================================================== */
function modalCardBuilder(data) {
  modalCard = "";
  modalCard += `
                <div class="mCard">
                  <div class="col-md-4 mCard">
                    <img class="img-responsive" src= ${data.Poster} alt="Poster not available " />

                      <button id="watched" class="btn btn-primary">Watched</button>
                      <button id="addToWatchList" class="btn btn-success">Add to WatchList</button>
                      <button id="cancel" class="btn btn-warning">Cancel</button>

                  </div>
                  <div class="col-md-8 mCard">
                    <h3>${data.Title}</h3>
                    <p>Released: ${data.Released}</p>
                    <p>Rating: ${data.imdbRating}</p>
                    <p>Rated: ${data.Rated}</p>
                    <p>Cast: ${data.Actors}</p>
                    <p>Director: ${data.Director}</p>
                    <hr>
                    <p>${data.Plot}</p>
                  </div>
                </div>`

  return modalCard;
}
function watchedCard(data) {
  watchedMovieList = "";
  var UID = firebase.auth().currentUser.uid;
  for (let each in data) {
    var currentObj = data[each];
    if ((currentObj.watched === true) && (currentObj.uid === UID)){
    watchedMovieList += `
                <div class="col-md-4 movieCard">
                  <h3>Title: ${currentObj.Title}</h3>
                  <p>Year: ${currentObj.Year}</p>
                  <img class="img-responsive center-block" src= "${currentObj.Poster}" alt="Poster not available" />
                </div>`
    }
  }
  if(watchedMovieList === ""){
    watchedMovieList = `<div class="col-md-12">
                        <h2 class="white">There are no movies on your watched list.</h2>
                        </div>`
  }
  if(watchedMovieList === null){
    watchedMovieList = `<div class="col-md-12">
                        <h2 class="white">There are no movies on your watched list.</h2>
                        </div>`
  }
  return watchedMovieList;
}
function unWatchedCard(data) {
  $("#toWatchList").empty();
  unWatchedMovieList = "";
  var UID = firebase.auth().currentUser.uid;
  var i = 0;
  for (let each in data) {
    var currentObj = data[each];
    if ((currentObj.watched === false) && (currentObj.uid === UID)){
      unWatchedMovieList += `
                <div class="col-md-4 movieCard">
                  <h3>${currentObj.Title}</h3>
                  <p>Year: ${currentObj.Year}</p>
                  <img class="img-responsive center-block" src= "${currentObj.Poster}" alt="Poster not available"/>
                </div>`
    }
  }
  if(unWatchedMovieList === ""){
    unWatchedMovieList = `<div class="col-md-12">
                          <h2 class="white">There are no movies on your unwatched list.</h2>
                          </div>`
  }
  if(unWatchedMovieList === null){
    unWatchedMovieList = `<div class="col-md-12">
                          <h2 class="white">There are no movies on your unwatched list.</h2>
                          </div>`
  }
  return unWatchedMovieList;
}
function watchedModalCardBuilder(data) {
  $("#toWatchList").empty();
  modalCard = "";
  modalCard += `
                <div class="col-md-4 modalCard">
                  <h3>${data.Title}</h3>
                  <p>Released: ${data.Released}</p>
                  <p>Rating: ${data.imdbRating}
                  <p>Cast: ${data.Actors}
                  <img class="img-responsive center-block" src= ${data.Poster} alt="Poster not available " />
                  <button class="cancel">Cancel</button>
                </div>
                `
  return modalCard;
}
function unWatchedModalCardBuilder(data) {
  $("#toWatchList").empty();
  modalCard = "";
  modalCard += `
                <div class="mCard">
                  <div class="col-md-4 mCard">
                    <img class="img-responsive" src= ${data.Poster} alt="Poster not available " />

                      <button class="switchWatched btn btn-primary">Watched</button>
                      <button id="cancelUnwatched" class="btn btn-warning">Cancel</button>

                  </div>
                  <div class="col-md-8 mCard">
                    <h3>${data.Title}</h3>
                    <p>Released: ${data.Released}</p>
                    <p>Rating: ${data.imdbRating}</p>
                    <p>Rated: ${data.Rated}</p>
                    <p>Cast: ${data.Actors}</p>
                    <p>Director: ${data.Director}</p>
                    <hr>
                    <p>${data.Plot}</p>
                  </div>
                </div>`

  return modalCard;
}

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
                <div class="col-md-4 movieCard">
                  <h3>${data.Title}</h3>
                  <p>Released: ${data.Released}</p>
                  <p>Rating: ${data.imdbRating}
                  <p>Cast: ${data.Actors}
                  <img class="img-responsive center-block" src= ${data.Poster} alt="Poster not available " />
                  <button id="watched">Watched</button><button id="addToWatchList">Add to WatchList</button><button id="cancel">Cancel</button>
                </div>
                `
  return modalCard;
}
function watchedCard(data) {
  watchedMovieList = "";
  console.log("Watched Data: ",data)
  if(data === null){
    watchedMovieList += `<h2 class="white">No watched movies on list.</h2>`
  }
  var UID = firebase.auth().currentUser.uid;
  for (let each in data) {
    var currentObj = data[each];
    console.log("Current object: ",currentObj);
    var i = 0;
    //for (let key in currentObj) {
      i += 1;
      console.log(i, currentObj);
      console.log("TEST: ",currentObj.watched, UID);
      if ((currentObj.watched === true) && (currentObj.uid === UID)){
      watchedMovieList += `
                  <div class="col-md-4 movieCard">
                    <h3>Title: ${currentObj.Title}</h3>
                    <p>Year: ${currentObj.Year}</p>
                    <img class="img-responsive center-block" src= "${currentObj.Poster}" alt="Poster not available " />
                    <button id="delete" class="btn btn-danger">Delete from List</button>
                  </div>`
      }
    //}
  }
  return watchedMovieList;
}
function unWatchedCard(data) {
  unWatchedMovieList = "";
  console.log("All Movies: ",data)
  if(data === null){
    unWatchedMovieList += `<h2 class="white">No unwatched movies on list.</h2>`
  }
  var UID = firebase.auth().currentUser.uid;
  var i = 0;
  for (let each in data) {
    var currentObj = data[each];
    //for (let key in currentObj) {
      if ((currentObj.watched === false) && (currentObj.uid === UID)){
        i += 1;
        console.log("Unwatched Movies: ",i,currentObj);
        unWatchedMovieList += `
                  <div class="col-md-4 movieCard">
                    <h3>Title: ${currentObj.Title}</h3>
                    <p>Year: ${currentObj.Year}</p>
                    <img class="img-responsive center-block" src= "${currentObj.Poster}" alt="Poster not available " />
                    <button id="switchWatched">Watched</button>
                  </div>`
      }else{
        //unWatchedMovieList += `<h2 class="white">No unwatched movies on list.</h2>`
      }
    //}
  }
  return unWatchedMovieList;
}

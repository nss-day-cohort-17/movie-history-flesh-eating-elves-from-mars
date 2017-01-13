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
var watchedMovieList = "";

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
                </div>
                <button id="watched">Watched</button> <button id="addToWatchList">Add to WatchList</button>`
  return modalCard;
}
function watchedCard(data) {
  watchedMovieList = "";
  console.log("OBJECT: ",data)
  var UID = firebase.auth().currentUser.uid;
  for (let each in data) {
    var currentObj = data[each];
    console.log(currentObj)
    for (let key in currentObj) {
      console.log(currentObj[key])
      if (currentObj[key].watched === true ){
      watchedMovieList += `
                  <div class="col-md-4 movieCard">
                    <h3>Title: ${currentObj[key].Title}</h3>
                    <p>Year: ${currentObj[key].Year}</p>
                    <img class="img-responsive center-block" src= "${currentObj[key].Poster}" alt="Poster not available " />
                    <button id="" class="btn btn-danger">Delete from List</button>
                  </div>`
    }

    $("#watchedList").html (watchedMovieList);
  }
}
}

function unWatchedCard(data) {
  unWatchedMovieList = "";
  var UID = firebase.auth().currentUser.uid;
  for (let each in data) {
    var currentObj = data[each];
    console.log(currentObj)
    for (let key in currentObj) {
      console.log(currentObj[key])
       if (currentObj[key].watched === false ){
      unWatchedMovieList += `
                  <div class="col-md-4 movieCard">
                    <h3>Title: ${currentObj[key].Title}</h3>
                    <p>Year: ${currentObj[key].Year}</p>
                    <img class="img-responsive center-block" src= "${currentObj[key].Poster}" alt="Poster not available " />
                    <button id="" class="btn btn-primary">Watched</button>
                  </div>`
    }
    $("#toWatchList").html (unWatchedMovieList);
  }
}
}

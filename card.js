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
  $.each(data, function( key, value){
    var i = 0;


      i += 1;
    console.log("Inner", this);
    console.log("Test Var");
    watchedMovieList += `
                  <div class="col-md-4 movieCard">
                    <h3>Title</h3>
                    <p>Year:</p>
                    <img class="img-responsive center-block" src= "" alt="Poster not available " />
                    <p>My Rating:</p>
                  </div>`


  })
  return watchedMovieList;
}

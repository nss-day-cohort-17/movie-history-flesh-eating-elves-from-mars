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
//
/* Card template =============================================== */
function card(data) {

  movieList = "";
  for (var i=0 ; i < data.Search.length; i++){

    movieList += `
                  <div class="col-md-4 movieCard">
                    <h3>${data.Search[i].Title}</h3>
                    <p>Year: ${data.Search[i].Year}</p>
                    <img class="img-responsive center-block" src= ${data.Search[i].Poster} alt="Poster not available " />
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
                </div>`
  return modalCard;
}

/*
Team Excercise Cohort 17
John McCutchan
Krishnapriya Sivasubramanian
James Wier
*/
//
/* Global Variables ============================================ */
var movieList = "";
//
/* Card template =============================================== */
function card(data) {
  movieList = "";
  //movieList += `<div class="row"`
  for (var i=0 ; i < data.Search.length; i++){
    movieList += `
                  <div class="col-md-4 movieCard">
                  <h3>${data.Search[i].Title}</h3>
                  <p>Year: ${data.Search[i].Year}</p>
                  <img class="img-responsive center-block" src= ${data.Search[i].Poster} alt="" />
                  </div>`
  }
  //movieList += `</div>`
  return movieList;
}

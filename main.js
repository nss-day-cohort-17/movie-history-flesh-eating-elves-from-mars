/*
Team Excercise Cohort 17
John McCutchan
Krishnapriya Sivasubramanian
James Wier
*/
console.log("Start");
//
/* Globals ============================================= */
var movieName ="";
//
/* Search listener ===================================== */
$("#search").click( function () {
  movieName = $("input").val();
  console.log(movieName);
  movieFactory();
})
//
/* Ajax call for API =================================== */
function movieFactory () {
  return new Promise (function (resolve,reject){
    $.ajax({
      url: "http://www.omdbapi.com/?s=" + movieName
    })
    .then (function(data){
      resolve(data)
      console.log(data)
      card(data);
      $("#movieList").html (movieList);
    })
  })
}

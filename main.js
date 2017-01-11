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
      return data
    })
    .then (function (data) {
      $(".movieCard").click(function (e){
        // console.log(e)
        // console.log(e.target.parentNode.childNodes[1].innerHTML )
        console.log("hi")
        movieTitle = e.target.parentNode.childNodes[1].innerHTML ;
        console.log(movieTitle)
        titleURL = "http://www.omdbapi.com/?t=" + movieTitle +"&y=&plot=short&r=json"
        return new Promise (function (resolve,reject){
          $.ajax ({
            url: titleURL
          })
          .then (function (data){
            resolve (data);
            console.log(data)
            modalCardBuilder(data);
            $("#movieList").html(modalCard)
          })

  })

    })
  })
})
}
/* END ================================================= */
//ajax call for getting actors name on click on each card

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
// $("#search").click(function (e) {
//   movieName = $("input").val();
//   console.log(movieName);
//   movieFactory();
//   e.preventDefault();
// });

$("#target").submit(function (e) {
  movieName = $("input").val();
  console.log(movieName);
  movieFactory();
  $("input").val("");
  e.preventDefault();
});

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
        // console.log("hi")
        movieTitle = e.target.parentNode.childNodes[1].innerHTML ;

        titleURL = "http://www.omdbapi.com/?t=" + movieTitle +"&y=&plot=short&r=json"
        return new Promise (function (resolve,reject){
          $.ajax ({
            url: titleURL
          })

          .then (function (data){
            resolve (data);
            console.log(data)
            modalCardBuilder(data)
            $("#movieList").html(modalCard)
            watched(data)
          })

        })

      })
    })

})
}
//store json to watched database
function watched (data){
  $("#watched").click (function () {
    $.ajax({
      url: "https://watchedmovies-310b6.firebaseio.com/.json",
      type: "POST",
      data: JSON.stringify(data),
      dataType: "json"
    })

  })
}

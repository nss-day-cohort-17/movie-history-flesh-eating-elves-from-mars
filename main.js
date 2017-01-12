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
    var jsonData = {}
    jsonData = data;
    jsonData.watched = true;
    console.log(jsonData)
    $.ajax({
      url: "https://watchedmovies-310b6.firebaseio.com/.json",
      type: "POST",
      data: JSON.stringify(data),
      dataType: "json"
    })
    alert("added to watched database")
    movieFactory()
  })
}

//ajax call to get json data from watched database

// function getWatched (data) {
//   return new Promise (function (resolve,reject){
//     $.ajax({
//     url: "https://watchedmovies-310b6.firebaseio.com/.json",
//     data: JSON.stringify(data),
//     dataType: "json"
//   })
//     .then (function(data){
//       console.log(data)
//       resolve(data)
//       var watchedDatabase ="";
//       for(var uniqueId in data){
//         uniqueId = _.findKey (data,{watched : true})
//         watchedDatabase += $(".card--haveWatched ").html(`<div>${uniqueId.Actors}</div>`)//working on this line
//       console.log(watchedDatabase)
//     }

//     })
//   })

// }
// getWatched()

/*
Team Excercise Cohort 17
John McCutchan
Krishnapriya Sivasubramanian
James Wier
*/
console.log("Start");
var config = {
    apiKey: "AIzaSyACTt23gc_dXW9vdpgg9YsypWa9eA30Bu4",
    authDomain: "fir-authent-jm.firebaseapp.com",
    databaseURL: "https://fir-authent-jm.firebaseio.com",
    storageBucket: "fir-authent-jm.appspot.com",
    messagingSenderId: "22338636557"
  };
firebase.initializeApp(config);
//
/* Globals ============================================= */
var movieName ="";
var UID ;
// $(document).tooltip();
//
/* Search listener ===================================== */
$("#search").click( function (e) {
  movieName = $("#movieTitle").val();
  console.log(movieName);
  e.preventDefault();
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
            watched (data)
            unWatchedMovies(data);


          })

        })

      })
    })

})
}
//store json to watched database
function watched (data){
  $("#watched").click (function (e) {
    var jsonData = {}
    jsonData = data;
    jsonData.watched = true;
    jsonData.rating = 0;
    console.log(jsonData)
    UID = firebase.auth().currentUser.uid
    $.ajax({
      url: `https://fir-authent-jm.firebaseio.com/${UID}.json`,
      type: "POST",
      data: JSON.stringify(data),
      dataType: "json"
    })
    alert("added to watched database");
    movieFactory()
  })
}

//register button working
$("#register").click ((e) => {
  e.preventDefault();
  var email = $(".getEmail").val();
  var password = $(".getPassword").val();
  if ((email !== "")&& (password !== "")){
  firebase.auth().createUserWithEmailAndPassword(email,password);
  $(".card--search").show();
} else {
  alert("Registration Error")
}
})
//login button
$("#login").click((e)=>{
  e.preventDefault();
  var email = $(".getEmail").val();
  var password = $(".getPassword").val();
  firebase
  .auth()
  .signInWithEmailAndPassword(email, password)
  .then(() => {
    $("form")[0].reset()
  })
})
//add event listener for unwatched movies

function unWatchedMovies (data) {
  $("#addToWatchList").click (function (e) {
    var jsonData = {}
    jsonData = data;
    jsonData.watched = false;
    jsonData.rating = 0;
    console.log(jsonData)
    UID = firebase.auth().currentUser.uid
    $.ajax({
      url: `https://fir-authent-jm.firebaseio.com/${UID}.json`,
      type: "POST",
      data: JSON.stringify(data),
      dataType: "json"
    })
    alert("added to Unwatched database");
    movieFactory()
  })
}

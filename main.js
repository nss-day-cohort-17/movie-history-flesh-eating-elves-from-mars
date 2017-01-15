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
var UID;
//
/* Listeners =========================================== */
//
/* Register button ===================================== */
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
//
/* Login button ======================================== */
$("#login").click((e)=>{
  e.preventDefault();
  var email = $(".getEmail").val();
  var password = $(".getPassword").val();
  firebase
  .auth()
  .signInWithEmailAndPassword(email, password)
  .then(() => {
    $("form")[0].reset()
    UID = firebase.auth().currentUser.uid;
  })
})
//
/* Search for new movies ================================ */
$("#target").submit( function (e) {
  movieName = $("#movieTitle").val();
  console.log(movieName);
  movieFactory();
  $("#movieTitle").val('');
  e.preventDefault();
});
//
/* Ajax call for movie API ============================== */
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
      $(".movieCard").click(function (e){ // click on card to see more info
        movieTitle = e.target.parentNode.childNodes[1].innerHTML ;
        titleURL = "http://www.omdbapi.com/?t=" + movieTitle +"&y=&plot=short&r=json"
        return new Promise (function (resolve,reject){
          $.ajax ({
            url: titleURL
          })
          .then (function (data){
            resolve (data);
            console.log(data);
            modalCardBuilder(data);
            $("#movieList").html(modalCard);
            watched (data);
            unWatchedMovies(data);
            cancel();
          })
        })
      })
    })
  })
}
//
/* Watched button on popout card ======================= */
function watched (data){
  $("#watched").click (function (e) {
    UID = firebase.auth().currentUser.uid;
    var jsonData = {}
    jsonData = data;
    jsonData.watched = true;
    jsonData.rating = 0;
    jsonData.uid = firebase.auth().currentUser.uid;
    console.log(jsonData)
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
//
/* Unwatched button on popout card ===================== */
function unWatchedMovies (data) {
  $("#addToWatchList").click (function (e) {
    UID = firebase.auth().currentUser.uid;
    var jsonData = {}
    jsonData = data;
    jsonData.watched = false;
    jsonData.rating = 0;
    jsonData.uid = firebase.auth().currentUser.uid;
    console.log(jsonData)
    $.ajax({
      url: `https://fir-authent-jm.firebaseio.com/${UID}.json`,
      type: "POST",
      data: JSON.stringify(data),
      dataType: "json"
    })
    alert("added to Unwatched database");
    movieFactory();
  })
}
/* Cancel button on popout card ===================== */
function cancel (data) {
  $("#cancel").click (function (e) {
    movieFactory();
  })
}
//
/* Watched button on unwatched card ===================== */
//function switchWatched (data){

  //$("#switchWatched").click (function (e) {
  console.log("Whats at switched button: ", data)
  // UID = firebase.auth().currentUser.uid;
  //   var jsonData = {}
  //   jsonData = data;
  //   jsonData.watched = true;
  //   jsonData.rating = 0;
  //   jsonData.uid = firebase.auth().currentUser.uid;
  //   console.log(jsonData)
  //   $.ajax({
  //     url: `https://fir-authent-jm.firebaseio.com/${UID}.json`,
  //     type: "POST",
  //     data: JSON.stringify(data),
  //     dataType: "json"
  //   })
  //   alert("added to watched database");
  //   movieFactory()
  })
}
//
/* Watched button on unwatched card ===================== */
function switchWatched (data){
  console.log("Whats at switched button: ", data)
  $("#switchWatched").click(function (e){
    movieTitle = e.target.parentNode.childNodes[1].innerHTML ;
    titleURL = "http://www.omdbapi.com/?t=" + movieTitle +"&y=&plot=short&r=json"
    console.log("Watched button hit: ", titleURL)
    $.ajax ({
      watched: true
    })

    $("#toWatchList").html(unWatchedMovieList);
  })
}


//
/* Delete button on unwatched and watched card ========= */


//
/* Search on unwatched and watched pages card ========== */

// $("#search").click( function (e) {
//   movieName = $("#movieTitle").val();
//   console.log(movieName);
//   e.preventDefault();
//   movieFactory();
// });






//END

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
var movieTitle;
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
  e.preventDefault();
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
/* UnWatched Movie Selector =========================== */
function unWatchedMovieFactory(data) {
  $("#toWatchList").empty();
  return new Promise (function (resolve,reject){
    var UID = firebase.auth().currentUser.uid;
    $.getJSON(`https://fir-authent-jm.firebaseio.com/${UID}.json`, function(data){
      unWatchedCard(data);
      $("#toWatchList").html(unWatchedMovieList);
    })
    .then (function(data){
      $(".movieCard").click(function (e){ // click on card to see more info
        var mObj; // holds movie obj
        var mid; // holds movie key
        movieTitle = e.target.parentNode.childNodes[1].innerHTML;
        for (let each in data) {
          var currentObj = data[each];
          if (currentObj.Title === movieTitle){
            mObj = currentObj;
            mid = each;
            unWatchedModalCardBuilder(mObj);
          }
        }
        $("#toWatchList").html(modalCard);
        switchWatched(data);
        cancelUnwatched();
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
function switchWatched (data){
  $(".switchWatched").click (function (e) {
    var mObj; // holds movie obj
    var mid; // holds movie key
    for (let each in data) {
      var currentObj = data[each];
      console.log("currentObj/Title: ",movieTitle, mObj)
      if (currentObj.Title === movieTitle){
        mObj = currentObj;
        mid = each;
      }
    }
    UID = firebase.auth().currentUser.uid;
    mObj.watched = true;
    $.ajax({
      url: `https://fir-authent-jm.firebaseio.com/${UID}.json`,
      type: "PATCH",
      data: JSON.stringify(data),
      dataType: "json"
    })
    console.log(mObj)
    mObj = "";
    unWatchedMovieFactory();
  })
}
//
/* Cancel button on popout card ======================== */
function cancelUnwatched (data) {
  $("#cancelUnwatched").click (function (e) {
    unWatchedMovieFactory();
  })
}
//
//
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

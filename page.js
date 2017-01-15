/*
Team Excercise Cohort 17
John McCutchan
Krishnapriya Sivasubramanian
James Wier
*/
/* Navigates through pages using show and hide attributes ======== */
$(document).ready(function() {
  /* Show the initial registration page ========================== */
  $("#title-screen").show();
  $('#main-nav').hide();
  /* When any button with card__link class is clicked, move on to the next view. */
  $(".card__link").click(function(e) {
    var nextCard = $(this).attr("next");
    var moveAlong = false;

    switch (nextCard) {
      case "card--search":
        moveAlong = true;
      break;
      case "card--toWatch":
        moveAlong = true;
      break;
      case "card--haveWatched":
        moveAlong = true;
      break;
    }

    if (moveAlong) {
      $(".card").hide();
      $("." + nextCard).show();
    }
  });
/* When the back button clicked, move back a view */
// $(".card__back").click(function(e) {
//   var previousCard = $(this).attr("previous");
//   $(".card").hide();
//   $("." + previousCard).show();
// });
  /* findNewMovies button ========================================== */
  $("#findNewMovies").click(function(e) {
    $(".card").hide();
    console.log("find new movies screen");
    $(".card--search").show();
    $("#movieList").empty();
  });
  /* findUnWatchedMovies button ==================================== */
  $("#findUnWatchedMovies").click(function(e) {
    $(".card").hide();
    console.log("unwatched movies screen");
    $(".card--toWatch").show();
    return new Promise (function (resolve,reject){
      var UID = firebase.auth().currentUser.uid;
      $.getJSON(`https://fir-authent-jm.firebaseio.com/${UID}.json`, function(data){
        unWatchedCard(data);
        $("#toWatchList").html(unWatchedMovieList);
      })
      .then (function(data){
        switchWatched(data);
      return data
    })
  })
});
  /* findWatchedMovies button ====================================== */
  $("#findWatchedMovies").click(function(e) {
    $(".card").hide();
    console.log("have watched movies screen");
    $(".card--haveWatched").show();
    var UID = firebase.auth().currentUser.uid;
    $.getJSON(`https://fir-authent-jm.firebaseio.com/${UID}.json`, function(data){
      watchedCard(data);
      $("#watchedList").html(watchedMovieList);
    })
  });
  /* login page button ============================================= */
  $("#loginPage").click(function(e) {
    $(".card").hide();
    $('#main-nav').hide();
    console.log("card hidden");
    $("#title-screen").show();
    firebase.auth().signOut();
  });
  /* login button ================================================== */
  $("#login").click(function(e) {
    $(".card").hide();
    $('#main-nav').show();
    console.log("card hidden");
    $(".card--search").show();
  });
  /* logout button ================================================== */
  $('#logout').click((e) => {
    var movieList = "";
    var modalCard = "";
    var watchedMovieList = "";
    var unWatchedMovieList = "";
    firebase.auth().signOut();
  })
})





//END

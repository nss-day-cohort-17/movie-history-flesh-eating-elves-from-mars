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
  // if(firebase.auth().curentUser.uid !== null){
  //   $("#title-screen").hide();
  //   $(".card--search").show();
  //   $('#main-nav').show();
  // }
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
  /* findNewMovies button ========================================== */
  $("#findNewMovies").click(function(e) {
    $(".card").hide();
    console.log("Search for new movies.");
    $(".card--search").show();
    $("#movieList").empty();
  });
  /* findUnWatchedMovies button ==================================== */
  $("#findUnWatchedMovies").click(function(e) {
    $(".card").hide();
    console.log("Unwatched movies.");
    $(".card--toWatch").show();
    $('toWatchList').empty();
    unWatchedMovieFactory();
  });
  /* findWatchedMovies button ====================================== */
  $("#findWatchedMovies").click(function(e) {
    $(".card").hide();
    console.log("Watched movies.");
    $(".card--haveWatched").show();
    var UID = firebase.auth().currentUser.uid;
    $.getJSON(`https://fir-authent-jm.firebaseio.com/${UID}.json`, function(data){
      watchedCard(data);
      $("#watchedList").html(watchedMovieList);
    })
  });
  /* logout page button ============================================= */
  $("#loginPage").click(function(e) {
    $(".card").hide();
    $('#main-nav').hide();
    $("#title-screen").show();
    firebase.auth().signOut();
  });
  /* login button ================================================== */
  $("#login").click(function(e) {
    if(firebase.auth().currentUser.uid !== null){
      $(".card").hide();
      $('#main-nav').show();
      console.log("Login.");
      $(".card--search").show();
    }else{
      $("#title-screen").show();
      $('#main-nav').hide();
    }
  });
  /* logout button ================================================== */
  $('#logout').click((e) => {
    var movieList = "";
    var modalCard = "";
    var watchedMovieList = "";
    var unWatchedMovieList = "";
    firebase.auth().signOut();
    console.log("Logout.")
  })
})





//END

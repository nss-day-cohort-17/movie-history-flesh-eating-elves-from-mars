/*
Team Excercise Cohort 17
John McCutchan
Krishnapriya Sivasubramanian
James Wier
*/
/* Navigates through pages using show and hide attributes ======== */
$(document).ready(function() {
  /* Show the initial registration page ============================ */
  $("#title-screen").show();
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
  $(".card__back").click(function(e) {
    var previousCard = $(this).attr("previous");
    $(".card").hide();
    $("." + previousCard).show();
  });
});










/* When the back button clicked, move back a view ================= */
$(".card__back").click(function(e) {
  var previousCard = $(this).attr("previous");
  $(".card").hide();
  $("." + previousCard).show();
});
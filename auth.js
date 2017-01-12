var config = {
   apiKey: "AIzaSyCOBC_SsQ2VUsNGgw-W6HHljtmHr7l146A",
   authDomain: "watchedmovies-310b6.firebaseapp.com",
   databaseURL: "https://watchedmovies-310b6.firebaseio.com",
   storageBucket: "watchedmovies-310b6.appspot.com",
   messagingSenderId: "641830258262"
 };
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(() => {
  if(firebase.auth().currentUser !== null){
  //logged in
    var email = $('input[type="email"]').val();
    $('#title-screen').show();
    $('#search-screen').hide();
  }else{
  //logged out
    $('#title-screen').hide();
    $('#search-screen').show();
  }
  console.log("TEST",firebase.auth());
})

/* Authorisation interface ============================= */
$('#auth').submit((e) => {
  var email = $('input[type="email"]').val();
  var password = $('input[type="password"]').val();

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(() => {
    $('form')[0].reset();
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode != "" || errorMessage != "") {
        alert("ERROR");

      }
  })
  e.preventDefault(); // prevents form from reloading page
})

$('#logout').click((e) => {
  firebase.auth().signOut();
})

$('.register').click((e) => {
  console.log("pushed register button");
  var email = $('input[type="email"]').val();
  var password = $('input[type="password"]').val();
  if((email !== "")&&(password !== "")){
    firebase.auth().signInWithEmailAndPassword(email, password);
  }else{
    alert("You typed some bad shit.")
  }
  e.preventDefault()
});

// $('.main-page form').submit((e) => {
//   var task = $('.main-page input[type=text]').val();
//   var uid = firebase.auth().currentUser.uid
//   $.post(`https://practice-7fab7.firebaseio.com/.${uid}.json`,
//   JSON.stringify({ task: task })
//   ).then(res => console.log(res.name));
//   e.preventDefault();
// })




//https://practice-7fab7.firebaseio.com/.json
//END

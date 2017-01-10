console.log("Start");
var movieName ="";
var movieList = "";

$("#firstLook").show();
$(".movieList").hide();

$(".card__link").click(function(e){
var nextCard = $(this).attr("next");


switch (nextCard) {
  case "movieList":
   $("#fixedNav").show()
    $("."+nextCard).show()
    $("#search").click( function () {
     movieName = $("input").val();
     console.log(movieName)
     movieFactory()
    })
       break;

    }
})
///ajax call for API
   function movieFactory () {
     return new Promise (function (resolve,reject){
      $.ajax({
        url: "http://www.omdbapi.com/?s=" + movieName
      })

      .then (function(data){
        resolve(data)
        console.log(data)
        for (var i=0 ; i < data.Search.length; i++){
          movieList += `<div><h3>Title: ${data.Search[i].Title}</h3>
                             <p>Year: ${data.Search[i].Year}</p>
                            </div>`

          $("#movieList").html (movieList);
        }
      })
    })
}

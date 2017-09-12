$(document).ready(function() {
      var search = "";

      $("#submitBtn").on("click", function(event) {
        console.log("buttonclick");
        event.preventDefault();
        
        console.log(search);
        console.log("hello");
        $(".resultsPage").removeClass("hidden");
        $("#mainText").css("margin-top","20px");
        search = $("#exampleText").val();
        /*database.ref("city").push({
         location: search
        });*/

        initializeFirebase();
        getWeather(search);
        $("#cityLabel").html(search);
        getHotels(search);
        getEventful(search);
    });
});

  var search = "";
//});
  // Callback when selecting using google autocomplete input
  function callbackPlace(place) {
      if (!place) place = autocomplete.getPlace();
      var locations = state.locations = {};
      // Set state.locations object with data from reverse geocoding from google
      place.address_components.forEach(function(val) {
          if (val.types[0] == "country") locations["country"] = val.long_name;
          if (val.types[0] == "locality") locations["city"] = val.long_name;
          if (val.types[0] == "administrative_area_level_1") locations["state"] = val.long_name;
      });
  }

  // Callback after googleapi place library loads, setups up autocomplete for location input
  function initAutocomplete() {
      autocomplete = new google.maps.places.Autocomplete(
          /** @type {!HTMLInputElement} */
          (document.getElementById("location")), {
              types: ["geocode"]
          });
      autocomplete.addListener("place_changed", callbackPlace);
  }

  function initializeFirebase(){
    var config = {
    apiKey: "AIzaSyCJex1acwpZx-jydhhdr0UAkFWqK0uT_v0",
    authDomain: "project1-9ab9c.firebaseapp.com",
    databaseURL: "https://project1-9ab9c.firebaseio.com",
    projectId: "project1-9ab9c",
    storageBucket: "project1-9ab9c.appspot.com",
    messagingSenderId: "522865655856"
    };
    firebase.initializeApp(config);

  	var database = firebase.database();
    var currentPath = $(location)[0].pathname;
  }
   
     
  function getWeather(city, state){ 
    var weatherURL = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + city + "%2C%20" + state + "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    
      $.ajax({
         url: weatherURL,
         method: "GET" 
      }).done (function(results){
        console.log("it worked");
      console.log(results.query.results.channel.item.condition.temp);

     var currentTemp = results.query.results.channel.item.condition.temp;

      $("#tempInput").html(currentTemp + "&#176;" + " F");
    }); 
  }

  function getHotels (search){
    debugger;
    var apikeyh = "n8g8ckeyquhmd6j5trnnvgcn";
    var hotelsURL = "http://api.hotwire.com/v1/deal/hotel?dest=" + search + "&distance=*~30&apikey="+ apikeyh + "&limit=5&format=jsonp";
    console.log(hotelsURL)

     $.ajax({
       url: hotelsURL,
       method: "GET",
       crossDomain: true,
       dataType: 'jsonp',
     }).done (function(results){
       console.log("working");
       console.log(results.Result[0]);
       $("#description").html(results.Result[0].Headline);
     });

//     $.ajax({
//     url: hotelsURL,
//     method: 'GET',
//     crossDomain: true,
//     dataType: 'jsonp',
//     jsonpCallback:'test',
//     success: function(res) {
//       console.log('new',res);
//     },
//     error: function(error) {
//       console.log('error', error);
//     },
//     beforeSend: setHeader
// });
    function test(r){
      console.log(r);
    }

function setHeader(xhr) {
    xhr.setRequestHeader('Authorization', apikeyh);
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET');
}
}
function getEventful(search){
var eventfulURL = "http://api.eventful.com/json/events/search/rss?...&location=" + search +"&app_key=2DvXq6pGcC472L2b&sort_order=popularity";
        $.ajax({
      url: eventfulURL,
      method: 'GET',
      crossDomain: true,
      dataType: "jsonp",
      jsonpCallback: "test",
      }).done (function(results){
       console.log("working123");
       console.log(results.);
       // console.log(results.Result[0]);
       // $("#description").html(results.Result[0].Headline);
     });
    //   success: function(resp) {
    //   // console.log("new",resp);

    // },
    //   error: function(errorp){
    //   // console.log(errorp);
    
    //  },

    // beforeSend: setHeader
    //   });

 function test(r) {
    console.log(r);
    }

  function setHeader(xhr) {
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader("Access-Control-Allow-Methods", "GET");
    }
}

var buttons = [];


function displayImages(){

var search = $(this).attr("data-name");
var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&apikey=uEMVq59zh1nvqGx3hXp6jdZxGJcWzQ77&limit=10";

$.ajax({
	url: queryURL,
	method: "GET"
}).done(function(response) {
		console.log(response.data);

		var results = response.data;

		for(var i = 0; i < results.length; i++) {
			var animalsDiv = $("#animals");
			var animalImage = $("<img>").addClass("gif");
			var rating = $("<p>").text("Rating: " + results[i].rating);
			
			animalsDiv.prepend(rating);
		
			animalImage.attr("src", results[i].images.fixed_height_small_still.url);
			animalImage.attr("data-animate", results[i].images.fixed_height_small.url);
			animalImage.attr("data-still", results[i].images.fixed_height_small_still.url);
			animalImage.attr("data-state", "still");
			
			animalsDiv.prepend(animalImage);
			makeButtons();
	
		}
	});
		// $(".gif").on("click", function(){
		// 		var state = 
		// });



}

 function makeButtons() {

      //prevents repeat buttons
        $("#animalButtons").empty();
        $("#animalInput").empty();
      	// for loop to keep adding to buttons
        for (var i = 0; i < buttons.length; i++) {
		  //creates buttons
          var addButton = $("<button>");
         
          addButton.addClass("input");
         
          addButton.attr("data-name", buttons[i]);
          
          addButton.text(buttons[i]);
          // Adds the button to HTML div animalButton
          $("#animalButtons").append(addButton);
        }
      }

      // click event for grabbing text from textbox
      $("#addAnimal").on("click", function(event) {
        event.preventDefault();
        
        var input = $("#animalInput").val().trim();

        // adds text box to buttons arrray
        buttons.push(input);

        // makes the buttons
        makeButtons();
      });

      $(document).on("click", ".input", displayImages);

      makeButtons();


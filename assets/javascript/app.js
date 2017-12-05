
var buttons = [];


function displayImages(){

var search = $(this).attr("data-name");
var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&apikey=uEMVq59zh1nvqGx3hXp6jdZxGJcWzQ77&limit=10";

$.ajax({
	url: queryURL,
	method: "GET"
}).done(function(response) {
		console.log(response.data);
		// removes previous gif's from div 
		$("#animals").empty();
		// sets the data from the response function to results.
		var results = response.data;

		for(var i = 0; i < results.length; i++) {
			// sets up animalsDiv var to go into div id animals
			var animalsDiv = $("#animals");
			// sets animalImage to an image with the class of gif 
			var animalImage = $("<img>").addClass("gif");

			var rating = $("<p>").text("Rating: " + results[i].rating);
			
			
			// sets the attriputes to the var anumalsDiv to start frozen then
			animalImage.attr("src", results[i].images.fixed_height_small_still.url);
			animalImage.attr("data-animate", results[i].images.fixed_height_small.url);
			animalImage.attr("data-still", results[i].images.fixed_height_small_still.url);
			animalImage.attr("data-state", "still");
			// puts the last image first
			animalsDiv.prepend(animalImage);
			// puts the gif rating above the gif
			animalsDiv.prepend(rating);
		}
			// image class 
			 $(".gif").on("click", function() {
	        	var state = $(this).attr("data-state");
	     
	        if (state === "still") {
	        	$(this).attr("src", $(this).attr("data-animate"));
	        	$(this).attr("data-state", "animate"); 
	        } else {
	        	$(this).attr("src", $(this).attr("data-still"));
	        	$(this).attr("data-state", "still");
	        }
	 
	    });
});

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


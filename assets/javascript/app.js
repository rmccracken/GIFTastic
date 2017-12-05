$( document ).ready(function() {
    console.log( "ready!" );
var buttons = ["lemming","meerkat ", "monkey", "polar bear", "deer","fish", "turtle", "squirel"];


function displayImages() {

    var search = $(this).attr("data-name");
    // calling the API for giphy + whatever is put in the search + my API key and a limit of 10 Gif's
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&apikey=uEMVq59zh1nvqGx3hXp6jdZxGJcWzQ77&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response.data);
        // removes previous gif's from div 
        $("#animals").empty();
        // sets the data from the response function to results.
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            // sets up animalsDiv var to go into div id animals
            var animalsDiv = $("#animals");
            // sets animalImage to an image with the class of gif 
            var animalImage = $("<img>").addClass("gif");

            var rating = $("<p>").text("Rating: " + results[i].rating);


            // sets the attriputes to the var anumalsDiv to start frozen
            animalImage.attr("src", results[i].images.fixed_height_small_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height_small.url);
            animalImage.attr("data-still", results[i].images.fixed_height_small_still.url);
            animalImage.attr("data-state", "still");
            // puts the last image first
            animalsDiv.prepend(animalImage);
            // puts the gif rating above the gif
            animalsDiv.prepend(rating);
        }
        // image class .gif has its data attribute changed on click.
        $(".gif").on("click", function() {
            var state = $(this).attr("data-state");
            // if the data is = to still a click will animate and visa versa
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

// function to make buttons
function makeButtons() {


    //prevents buttons from duplicating when entering another animal
    $("#animalButtons").empty();
    $("#animalInput").empty();

    // for loop to keep adding to buttons
    for (var i = 0; i < buttons.length; i++) {
        //creates buttons
        var addButton = $("<button>").addClass("btn btn-info");
        // gives buttons a class,attribute, and data
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
    // takes the value entered into the text box and sets it to input
    var input = $("#animalInput").val().trim();
    // adds text box to buttons arrray
    buttons.push(input);

    // makes the buttons
    makeButtons();
   
 		
});
// on lick the displayImanges function will execute with info from the serch input
$(document).on("click", ".input", displayImages);
	makeButtons();
});
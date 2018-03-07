// GifTastic Javascript

$(document).ready(function(){

//initialize var's
var newGiphy="";
// create array of topics
    var topics = ['good morning', 'coffee', 'eye roll','crying','laughing', 'chocolate', 'running',];

$('#addTopic').on('click', function(event){

    event.preventDefault();
    
    var newTopic=$('#inlineFormInputName2').val().trim();
    
    console.log(newTopic);
    topics.push(newTopic);
    displayButtons();
});






// Function:  displayButtons
//add buttons to page dynamically:  loop through array creating a button for each element in array
function displayButtons() {


    // clear out old buttons and replace with current
    $('#topic-buttons').empty();

        for(var i=0; i<topics.length; i++) {
        // * append new <button> to <div> containing buttons
        // * add class to button tag using .addClass
        // * add attribute to tag to add data-name = topic 
            var B = $('<button>');
            B.addClass('gtopic');
            B.attr('data-name', topics[i]);
            B.text(topics[i]);

            $('#topic-buttons').append(B);
    }
}
displayButtons();
//get user input:  what type of gif requested? --- Event listener
//remove spaces/blanks --- .val().trim()
$(document).on('click', '.gtopic',function(){

    newGiphy = $(this).attr('data-name');
    
    getYerImgs();
})

$(document).on('click', '.giphy', function(){

    var state=$(this).attr("data-state");
    console.log(state);
    //change state of image from still to animate
    if (state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else{
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});
//API Info:
//  Giphy API key:  AawRiCsMDzpjKTtiI0LQ0pEmQ1bw7kLd

//Example code
//var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");
//xhr.done(function(data) { console.log("success got data", data); });

// ajax query Giphy : send request -- GET 10 images of chosen keyword
function getYerImgs(){
    console.log('newGiphy: ' + newGiphy);
    var apiKey= "AawRiCsMDzpjKTtiI0LQ0pEmQ1bw7kLd";
    var queryURL= "https://api.giphy.com/v1/gifs/search?q=" + newGiphy + "&rating=g&rating=pg&api_key=" + apiKey + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        
        $('#giphy-display').empty();

        //  Receive/process returned Giphy data
        var results = response.data; 
    
        //  Create HTML for each image returned 
        for (var i=0; i<results.length; i++) {
            //Make div tag
            var giphyDiv = 
            $('<div>').addClass('.card giphy-display');

            //Make image tag for div
            var giphyImg = $('<img>');
            // Add attributes for still and animated versions, set state to still
            giphyImg.attr({
                src: results[i].images.fixed_height_still.url,
                'data-state': "still",
                'data-still': results[i].images.fixed_height_still.url,
                'data-animate': results[i].images.fixed_height.url,
                class: "giphy",
            });
            // Make paragraph tag for rating 
            var giphyRating = $('<p>').text('Rated: ' + results[i].rating);
            
            giphyDiv.append(giphyImg);
            giphyDiv.append(giphyRating);

            $('#giphy-display').append(giphyDiv);
        }


    });
}
// React to user input:  

// 1.-- display 10 images along with rating

//animated gif:  
    // user click to start animation -- continue as infinite loop
    // user click to end

// 2. Add user keyword to topics array and add to buttons (call displayButtons)

});
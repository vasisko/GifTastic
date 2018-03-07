// GifTastic Javascript

$(document).ready(function(){

    // Initialize var's
    var newGiphy="";

    // Create initial array of topics
    var topics = ['good morning', 'coffee', 'eye roll','crying','laughing', 'chocolate', 'running',];

// Functions ----------------------------------------------

    function displayButtons() {
    //add buttons to page dynamically:  loop through array creating a button for each element in array

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
    

    function getYerImgs(){
    // API :  ajax query Giphy -- send request/GET 10 images of chosen keyword
    
        //Giphy key and URL
        var apiKey= "AawRiCsMDzpjKTtiI0LQ0pEmQ1bw7kLd";
        var queryURL= "https://api.giphy.com/v1/gifs/search?q=" + newGiphy + "&rating=g&rating=pg&api_key=" + apiKey + "&limit=10";

        // ajax request to Giphy ---
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
    
            // clear giphy images currently on page
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
                // Add attributes for still and animated versions in object format, set state to still
                giphyImg.attr({
                    src: results[i].images.fixed_height_still.url,
                    'data-state': "still",
                    'data-still': results[i].images.fixed_height_still.url,
                    'data-animate': results[i].images.fixed_height.url,
                    class: "giphy",
                });
                // Make paragraph tag to hold rating 
                var giphyRating = $('<p>').text('Rated: ' + results[i].rating);
            
                //Add new tags to new Div tag
                giphyDiv.append(giphyImg);
                giphyDiv.append(giphyRating);

                //Add new HTML for new giphy to existing page
                $('#giphy-display').append(giphyDiv);
            }
        });//---end of ajax response --
    }
//  -----------------------------------------------------------

    // Dynamically generate buttons
    displayButtons();

    //Listen for user input:

        // NEW BUTTON: Add new topics from user input
        $('#addTopic').on('click', function(event){

            // Code to accept ENTER button as submit   
            event.preventDefault();

            // Get user input from form and omit spaces
            var newTopic=$('#inlineFormInputName2').val().trim();
    
            // Add new topic to end of array and call function to display buttons 
            topics.push(newTopic);
            displayButtons();
        });

        // GET GIFs 
         $(document).on('click', '.gtopic',function(){

            newGiphy = $(this).attr('data-name');
    
            getYerImgs();
        });

        // CHANGE STATE:  still to animate & vv
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

});
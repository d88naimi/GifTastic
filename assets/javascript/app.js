 

 var zooArray = [ "squirrel" , "dog", "cat", "lion" , " tiger", "rat", "rhino" ];
   
function displayAnimal (){

// animalInfo function re-renders the HTML to display the appropriate content
var animal = $(this).attr("data-name");
  

var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";
         
// Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          for (let i = 0; i < response.data.length; i++){
          // create a div to store animalrespnse
          var animalDiv = $('<div class="animalDiv">');
          // stored rating 
          var rating = response.data[i].rating; 
          // create a paragraph to store rating value
          var p = $("<p>").text("Rating : " + rating);
          // response for still & response for animated 
          var animate = response.data[i].images.fixed_height.url;

          var still = response.data[i].images.fixed_height_still.url;
          
          var img = $('<img class="imageGyphy">');

           img.attr("src", still );
           img.attr("data-still", still);
           img.attr("data-animate", animate);
           img.attr("data-state" , "still");
           // image  is being append to animal Div 
           animalDiv.append(img);
           // animalDiv is appeniding to the paragrapgh div 
           p.appendTo(animalDiv);

           $("#gif-holder").prepend(animalDiv);
         }

        });
      }

        $("#gif-holder").on("click" ,".imageGyphy", function(){

          var state = $(this).attr("data-state");
          
          if (state == "still"){
            $(this).attr("src" , $(this).data("animate"));
             $(this).attr("data-state" , "animate");}

          else { 
              $(this).attr("src" , $(this).data("still"));
             $(this).attr("data-state" , "still");
          }

        });
    
  
// function display animal 
   function renderButtons() {
        
        $("#newButtons").empty();
        // Looping through the array of zoo
        for (var i = 0; i < zooArray.length; i++) {
          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of  to our button
          a.addClass("zoo")
           // Adding a data-attribute
          a.attr("data-name" , zooArray[i]);
          // Providing the initial button text
          a.text(zooArray[i]);
          
          $("#newButtons").append(a);
      }    

    };

      $(".add-gify").on("click" , function(event){
          event.preventDefault();
 // event.preventDefault();
      // This line grabs the input from the textbox
      var zoo = $(".inputText").val().trim();
      // Adding movie from the textbox to our array
      zooArray.push(zoo);
       // Calling renderButtons which handles the processing of our movie array
       renderButtons();
     }); 

      $(document).on("click" , ".zoo" , displayAnimal);

      renderButtons();

  

 


        
    


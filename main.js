$(document).ready(function(){
    var searchTerm = '';
    var wikiURL = '';
    var prefixURL =  "https://en.wikipedia.org/w/api.php?format=json&action=query&list=search&srsearch=";

    var whitespaceRegex = /\s+/g;
    var totalSummary = "";
    var parsedSummary = "";
    var whitespaceSearchVal = "";
    var whitespaceTitleVal = "";
    var titleVal = "";
    // total number of pages to return upon a search
    var pagesCount = 10;

    // run code when search button is clicked
    
    $("#search").click(function(){
        // gets the search input by the user
        var searchTerm = $("#searchTerm").val();
        
        if (searchTerm !== "") {
            whitespaceSearchVal = searchTerm.replace(whitespaceRegex,"%20") + '&format=json&callback=?';

            wikiURL = prefixURL + whitespaceSearchVal;
            wikiURL + "&continue=";

            $.ajax({
                type:"GET",
                url: wikiURL,
                async: false,
                dataType: "jsonp",
                success: function(response){
                    
                    $("#output").html('');
                    for (var i=0; i<pagesCount; i++) {
                        titleVal = response.query.search[i].title;
                        whitespaceTitleVal = titleVal.replace(whitespaceRegex,"%20");
                        $("#output").prepend("<div class='result-display'><h2>"+response.query.search[i].title+"</h2><p>"+response.query.search[i].snippet+"</p><a href=" + "" + whitespaceTitleVal + " target='_blank'>Read More</a></div>");
                    }

                },
                error: function(error){
                    alert("error!");
                }
            });
        }
    });
   
    // allows search to run when enter button is clicked
    $('#searchTerm').keypress(function(event) {
        if(event.which === 13) {
            $("#search").click();
        }
    });
});
(function($){
	var j = $('#movies');
		$.ajax({
	        	url: 'https://localhost:44352/api/movie',
	        	type: 'get',
	        	success: function(movies) {
	        		$.each(movies, function(i, movie) {
	        			j.append('<li>Title: ' + movie.Title + ', Genre: ' + movie.Genre + ', Director: '  + movie.DirectorName + '</li>');      		
	        		});
	        	},
	        });

    function processForm( e ){
        var movie = {
        	Title : this["title"].value,
        	Genre : this["genre"].value,
        	DirectorName: this["director"].value
        };

        $.ajax({
            url: 'https://localhost:44352/api/movie',
            dataType: 'html',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(movie),
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
                j.append('<li>Title: ' + movie.Title + ', Genre: ' + movie.Genre + ', Director: '  + movie.DirectorName + '</li>');
            },
            error: function( jqXhr, textStatus, errorThrown ){
            }
        });

    function myFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += "responsive";
        } 
        else {
            x.className = "topnav";
        }
    }
        










        e.preventDefault();
    }

    $('#my-form').submit( processForm );
})(jQuery);
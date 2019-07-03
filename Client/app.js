(function($){
	var j = $('#movies');
		$.ajax({
	        	url: 'https://localhost:44352/api/movie',
	        	type: 'get',
	        	success: function(movies) {
	        		$.each(movies, function(i, movie) {
	        			j.append('<li>title: ' + movie.Title + ', genre: ' + movie.Genre + ', director: '  + movie.Director + '</li>');      		
	        		});
	        	},
	        });

    function processForm( e ){
        var movie = {
        	Title : this["title"].value,
        	Genre : this["genre"].value,
        	Director: this["director"].value
        };

        $.ajax({
            url: 'https://localhost:44352/api/movie',
            dataType: 'html',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(movie),
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        










        e.preventDefault();
    }

    $('#my-form').submit( processForm );
})(jQuery);
(function($){
	var m = $('#movies');

    function addMovie(movie)
    {
        m.append(
            '<li>Title: ' + movie.Title + 
            ', Genre: ' + movie.Genre + 
            ', Director: '  + movie.DirectorName + '</li>');
    }


    // Take input from form and add movie to list
    function processAddMovieForm( e ){
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
                addMovie(movie);
            },
            error: function( jqXhr, textStatus, errorThrown ){
            }
        });
        e.preventDefault();
    }

    // Display all movies in list below form
    $.ajax({
        url: 'https://localhost:44352/api/movie',
        type: 'get',
        success: function(movies) {
            $.each(movies, function(i, movie) {
            addMovie(movie);             
            });
        },
    });

    // Fill movie dropdown with movie objects
    $(document).ready(function () {
        $('#bt').click(function () {
            
            var url = 'https://localhost:44352/api/movie';

            $.getJSON(url, function (movies) {
                $.each(movies, function (index, movie) {
                    // APPEND OR INSERT DATA TO SELECT ELEMENT.
                    $('#sel').append('<option value="' + movie.Id + '">' + movie.Title + '</option>');
                });
            });
        });

        // Edit selected value
        $('#sel').change(function () {
            $('#msg').text('Selected Item: ' + this.options[this.selectedIndex].text);
        });
    });


    


    $('#addMovieForm').submit( processAddMovieForm );
    // $('#updateMovieForm').submit( processUpdateMovieForm );
})(jQuery);
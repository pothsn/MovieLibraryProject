let currentSelectedMovie;

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

        // SHOW SELECTED VALUE.
        $('#sel').change(function () {
            var a = this.options[this.selectedIndex];
            $('#msg').text('Selected Item: ' + a.text);
            $("#movieId").val(a.value);
        });

        $('#updateMovieForm').submit( processUpdateMovieForm );
        function processUpdateMovieForm( e ){
            alert("test");
            var movieId = $("#movieId").val();
            let newTitleInput = $("#newTitleInput").val();
            let newGenreInput = $("#newGenreInput").val();
            let newDirectorInput = $("#newDirectorInput").val();
            var movie = {
            Title : this["newTitleInput"].value,
            Genre : this["newGenreInput"].value,
            DirectorName: this["newDirectorInput"].value
            };
            $.ajax({
                url: 'https://localhost:44352/api/movie/' + movieId,
                dataType: 'json',
                type: 'put',
                contentType: 'application/json',
                data: JSON.stringify(movie),             
                success: function ( data ){
                    alert("YAY!");
                    console.log(data);
                },
                error: function( jqXhr, textStatus, errorThrown ){
                }
        });
        e.preventDefault();
        }
        // $.ajax({
        //     url: 'https://localhost:44352/api/movie',
        //     dataType: 'html',
        //     type: 'post',
        //     contentType: 'application/json',
        //     data: JSON.stringify(movie),
        //     success: function( data, textStatus, jQxhr ){
        //         $('#response pre').html( data );
        //         addMovie(movie);
        //     },
        //     error: function( jqXhr, textStatus, errorThrown ){
        //     }
        // });
        // e.preventDefault();








    });
    $('#addMovieForm').submit( processAddMovieForm );
})(jQuery);
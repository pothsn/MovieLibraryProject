using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MovieLibrary.Models;

namespace MovieLibrary.Controllers
{
    public class MovieController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        public IHttpActionResult Get()
        {
            // Retrieve all movies from db logic
            IList<Movie> movies = db.Movies.ToList();
            if (movies.Count == 0)
            {
                return NotFound();
            }
            return Ok(movies);
        }

        // GET api/values/5
        public IHttpActionResult Get(int id)
        {
            //retrieve movie by id from db logic
            Movie movie = db.Movies.Where(m => m.Id == id).FirstOrDefault();
            if (movie == null)
            {
                return NotFound();
            }
            return Ok(movie);
        }  

        // POST api/values
        public IHttpActionResult Post(Movie movie)
        {
            // Create movie in db logic
            if(!ModelState.IsValid)
            {
                return BadRequest("Invalid data.");
            }

            db.Movies.Add(new Movie()
            {
                Id = movie.Id,
                Title = movie.Title,
                Genre = movie.Genre,
                DirectorName = movie.DirectorName
            });
            db.SaveChanges();
            return Ok();
        }

        // PUT api/values/5
        public IHttpActionResult Put(int id, Movie movie)
        {
            // Update movie in db logic
            if (!ModelState.IsValid)
            {
                return BadRequest("Not a vlid model");
            }
            var existingMovie = db.Movies.Find(id);
            if (existingMovie != null)
            {
                existingMovie.Title = movie.Title;
                existingMovie.Genre = movie.Genre;
                existingMovie.DirectorName = movie.DirectorName;
                db.SaveChanges();
            }
            else
            {
                return NotFound();
            }
            return Ok();
        }

        // DELETE api/values/5
        public IHttpActionResult Delete(int id)
        {
            // Delete movie from db logic
            if (id <= 0)
            {
                return BadRequest("Not a valid movie id");
            }
            var movie = db.Movies.Where(m => m.Id == id).FirstOrDefault();
            db.Entry(movie).State = System.Data.Entity.EntityState.Deleted;
            db.SaveChanges();
            return Ok();
        }
    }
}
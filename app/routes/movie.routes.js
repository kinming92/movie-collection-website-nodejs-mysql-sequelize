/*

Authorization:
POST    api/movies?access_token=            add new movie
GET     api/movies/all?access_token=        get all movies
GET     api/movies/:id?access_token=        get movie by id
PUT     api/movies/:id?access_token=        update movie by id
DELETE  api/movie/:id?access_token=         remove movie by id
DELETE  api/movie/access_token=             remove all the movie


DELETE api/movies    remove all movies
GET api/movies/published   find all published movies
GET api/movies?title=[kw]   find all movies which title contains 'kw'

*/

const { authJwt } = require("../middleware/index.js");

module.exports = app => {
  const movies = require("../controllers/movie.controller.js");

  let router = require("express").Router();

  // Create a new movies
  router.post("/", [authJwt.verifyToken], movies.create);

  // Retrieve all movies
  router.get("/all", [authJwt.verifyToken], movies.findAll);

  // Retrieve a single movie given the movieId
  router.get("/:id", [authJwt.verifyToken], movies.findOne);

  // Update a movie given the movieId
  router.put("/:id", [authJwt.verifyToken], movies.update);

  // Delete a movie with id
  router.delete("/:id", [authJwt.verifyToken], movies.delete);

  // delete all movie by the current users
  router.delete("/", [authJwt.verifyToken], movies.deleteAll);

  app.use('/api/movies', router);
  
};
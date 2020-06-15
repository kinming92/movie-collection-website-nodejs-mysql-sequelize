const db = require("../models");
const { movie } = require("../models");
const Movie = db.movie;
const User = db.user;
const Op = db.Sequelize.Op;

//create and save a new movie
exports.create = (req, res) => {
    //validate request
    if(!req.body){
        res.status(400).send({
            message: "Body can not be empty"
        });
        return;
    }

    console.log("user id is: ", req.userId);
    const userId = req.userId;
    //create a movie
    const movie = {
        title: req.body.title,
        year: req.body.year,
        genre: req.body.genre,
        rating: req.body.rating,
        userRating: req.body.userRating,
        image: req.body.image 
    };
    
    //Save the movie in the database
    Movie.create(movie, {through: {userId: userId}}).then( movie => {

        movie.setUsers(userId).then( () => {
            res.send(movie);
        });
        
    }).catch( err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the tutorial"
        })
    })

};

//retrieve all movie from the database created by the user
exports.findAll = (req, res) => {
    const userId = req.userId;

    User.findOne({ where :{ id: userId} , include : Movie})
    .then(result => {
        //console.log(result.movies);
        res.send(result.movies);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Cannot find the user"
        });
    });
    // Movie.findAll({where : {id: userId}, include: User})
    // .then(data => {
    //     res.send(data);
    // }).catch( err => {
    //     res.status(500).send({
    //         message: err.message || "Some error occured while retrieving tutorials"
    //     })
    // })
};

//find a single movie with an id
exports.findOne = (req, res) => {
    const movieId = req.params.id;
    Movie.findByPk(movieId)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error retrieving Tutorial with id=" + id
        });
    });
};

//update a movie by the id in the request
exports.update = (req, res) => {
    const movieId = req.params.id;

    Movie.update(req.body, {where : {id: movieId}})
    .then(num => {
        if(num == 1){
            res.send({message: "Movie was updated successfully."});
        }else{
            res.send({
                message: `Cannot update Movie with id=${id}. Movie was not found or req.body was empty`
            });
        }
    });
};

//delete a movie with the specified id in the request
exports.delete = (req, res) => {
    const movieId = req.params.id;

    Movie.destroy({
        where: { id: movieId}
    })
    .then( num => {
        console.log(num);
        if(num == 1){
            res.send({
                message: "Movie was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Movie with id=${id}. Maybe Tutorial was not found`
            });
        }
    })
};

exports.deleteAll = (req, res) => {
    const userId = req.userId;
    //find the id that need to be deleted
    let movieIds = [];
    User.findOne({ where :{ id: userId} , include : Movie})
    .then(result => {
        result.movies.forEach( movie => {
            movieIds.push(movie.id);
        });
        console.log("The movie id is: ", movieIds);
        Movie.destroy({ 
            where: { id: movieIds}
        })
        .then(nums => {
            res.send({message: `${nums} movies were deleted successfully `})
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all tutorials"
            });
        });
        
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Cannot find the user"
        });
    });
};
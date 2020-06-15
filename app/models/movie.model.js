module.exports = (sequelize, Sequelize) => {
    const Movie = sequelize.define("movies", {
        title: {
            type: Sequelize.STRING
        },
        year: {
            type: Sequelize.INTEGER
        },
        genre: {
            type: Sequelize.STRING
        },
        rating: {
            type: Sequelize.STRING
        },
        userRating: {
            type: Sequelize.INTEGER
        },
        image: {
            type: Sequelize.STRING
        }
    });
    return Movie;
}
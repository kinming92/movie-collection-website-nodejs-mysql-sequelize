# Summary

Movie Collection Website Backend API 
created with nodejs mysql sequelize 

User Authorization:
POST    auth/signup                         new user signup
POST    auth/signin                         returning user signin


Moive Authorization:
POST    api/movies?access_token=            add new movie
GET     api/movies/all?access_token=        get all movies
GET     api/movies/:id?access_token=        get movie by id
PUT     api/movies/:id?access_token=        update movie by id
DELETE  api/movie/:id?access_token=         remove movie by id
DELETE  api/movie/access_token=             remove all the movie

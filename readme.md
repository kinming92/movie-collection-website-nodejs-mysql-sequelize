# Summary

Movie Collection Website Backend API 
- created with nodejs mysql sequelize 



### User Authorization
| http    |  route                              | description                  |
| ----    | ----------------------------------- | ---------------------------- |
| POST    | auth/signup                         | new user signup              |
| POST    | auth/signin                         | returning user signin        |


### Moive Authorization
| http    | route                              | description                   |
| --------| -----------------------------------| ------------------------------|
| POST    | api/movies?access_token=           | add new movie                 |
| GET     | api/movies/all?access_token=       | get all movies                |
| GET     | api/movies/:id?access_token=       | get movie by id               |
| PUT     | api/movies/:id?access_token=       | update movie by id            |
| DELETE  | api/movie/:id?access_token=        | remove movie by id            |
| DELETE  | api/movie/access_token=            | remove all the movie by user  |


### MySQL Table

#### movies
| Field      | Type         | Null | Key | Default | Extra          |
|------------|--------------|------|-----|---------|----------------|
| id         | int          | NO   | PRI | NULL    | auto_increment |
| title      | varchar(255) | YES  |     | NULL    |                |
| year       | int          | YES  |     | NULL    |                |
| genre      | varchar(255) | YES  |     | NULL    |                |
| rating     | varchar(255) | YES  |     | NULL    |                |
| userRating | int          | YES  |     | NULL    |                |
| image      | varchar(255) | YES  |     | NULL    |                |
| createdAt  | datetime     | NO   |     | NULL    |                |
| updatedAt  | datetime     | NO   |     | NULL    |                |


#### users

| Field     | Type         | Null | Key | Default | Extra          |
|-----------|--------------|------|-----|---------|----------------|
| id        | int          | NO   | PRI | NULL    | auto_increment |
| username  | varchar(255) | YES  |     | NULL    |                |
| email     | varchar(255) | YES  |     | NULL    |                |
| password  | varchar(255) | YES  |     | NULL    |                |
| createdAt | datetime     | NO   |     | NULL    |                |
| updatedAt | datetime     | NO   |     | NULL    |                |

#### user_movie

| Field     | Type     | Null | Key | Default | Extra |
|-----------|----------|------|-----|---------|-------|
| createdAt | datetime | NO   |     | NULL    |       |
| updatedAt | datetime | NO   |     | NULL    |       |
| userId    | int      | NO   | PRI | NULL    |       |
| movieId   | int      | NO   | PRI | NULL    |       |
# Simple Blog API

A basic yet powerful RESTful API built with *Express.js, **Prisma ORM, and **PostgreSQL*. This API allows for user registration and blog post creation, supporting a one-to-many relationship (one user can have many posts). The project is ideal for learning backend development and database interactions using modern tools.


## Technologies Used

- *Node.js* – JavaScript runtime
- *Express.js* – Web framework for handling HTTP requests and routing
- *Prisma ORM* – Type-safe database ORM
- *PostgreSQL* – Relational database
- *dotenv* – To manage environment variables
- *Render / Railway* – For deployment


## Data Models

### User
ts
id: string (UUID, primary key)
firstName: string
lastName: string
emailAddress: string (unique)
username: string (unique)


### Post
ts
id: string (UUID, primary key)
title: string
content: string
createdAt: DateTime (default: now)
lastUpdated: DateTime (@updatedAt)
isDeleted: boolean (default: false)
authorId: string (foreign key to User)



## Endpoints

### Users
#### post a user.
 method; post http://127.0.0.1:4000/users
 ```json
 {
    "id": "e00aaa22-0c93-4c0e-bdfd-2e7f736baf66",
    "firstName": "Kris",
    "lastName": "Nienow",
    "emailAddress": "Shea_Carroll78@hotmail.com",
    "username": "kris_nienow"
}
 ```

#### GET /users
- Returns a list of all users
```json
[

    //first user
    {
        "id": "e00aaa22-0c93-4c0e-bdfd-2e7f736baf66",
        "firstName": "Kris",
        "lastName": "Nienow",
        "emailAddress": "Shea_Carroll78@hotmail.com",
        "username": "kris_nienow"
    },

    //second user
    {
        "id": "cf8ef12d-ae0a-4631-9c12-a893088bd7c9",
        "firstName": "angie",
        "lastName": "kanjabi",
        "emailAddress": "angie@gmail.com",
        "username": "angie.k"
    }
]
```


#### GET /users/:id
- Returns a user by ID along with their posts

#### POST /users
- Creates a new user  
*Sample Request:*
json
{
  "firstName": "John",
  "lastName": "Doe",
  "emailAddress": "john@example.com",
  "username": "johndoe"
}


### Posts

#### GET /posts
- Returns a list of all posts with author details

#### GET /posts/:id
- Returns a specific post with its author

#### POST /posts
- Creates a new post  
*Sample Request:*
json
{
  "title": "My First Blog",
  "content": "This is the content of my first blog post.",
  "authorId": "uuid-of-user"
}


#### PUT /posts/:id
- Updates an existing post  
*Sample Request:*
json
{
  "title": "Updated Title",
  "content": "Updated content."
}


#### DELETE /posts/:id
- Soft deletes a post (marks isDeleted as true)
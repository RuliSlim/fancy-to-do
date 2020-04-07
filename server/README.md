# Fancy-to-do
Ini adalah API untuk membuat todo list menggunakan Express, Sequelize, Postgres
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

# Available route
___________ 
|Method|route|USAGE|
|-----|------|-----|
|GET|localhost:3000/|View HomePage|
|GET|localhost:3000/todos|Get all todos|
|POST|localhost:3000/todos|Create new todo|
|GET|localhost:3000/todos/:id|Get one todo|
|PUT|localhost:3000/todos/:id|Edit one todo|
|DELETE|localhost:3000/todos/:id|Delete todo|

___
## API
1. Google Sign In
2. [voicerss](http://www.voicerss.org/)
___
## Framework
1. Materialize

___
## RESTful endpoints
___

### POST /auth/register
##### register new user
___
_Request Body_
```
{
    "name": "Joko"
	"email": "joko@gmail.com",
	"password":"rahasia"
}
```
_Response ( 201 )_
```json
{
    "access_token": "token"
}
```
_Response (400 - Bad Request)_
```json
{
    "message": "Validation Error"
}
```
_Response (500 - Server Error)_
```json
{
    "message": "Internal Server Error"
}
```
___
### POST auth/login
##### login existing user
___

_Request Body_
```json
{
	"email": "joko@gmail.com",
	"password":"rahasia"
}
```

_Response ( 201 )_
```json
{
    "access_token": "token"
}
```

_Error Response ( 400 - email or password wrong)_
```json
{
    "error": "email or password wrong"
}
```

_Error Response ( 404 - user not found )_
```
{
    "error": "user not found"
}
```
_Response (500 - Server Error)_
```json
{
    "message": "Internal Server Error"
}
```
___
### GET /todos
##### get all todos craeted by user
___

_Request Header_
```json
{
    "access_token": "token"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json
[
    {
        "id": 3,
        "title": "title",
        "description": "description",
        "status": false,
        "due_date": "2020-04-30T08:43:00.336Z",
        "createdAt": "2020-03-30T08:43:00.336Z",
        "updatedAt": "2020-03-30T08:43:00.336Z"
    },
    {
        "id": 2,
        "title": "coba baru",
        "description": "description",
        "status": false,
        "due_date": "2020-04-30T08:43:00.336Z",
        "createdAt": "2020-03-30T08:41:20.890Z",
        "updatedAt": "2020-03-30T08:51:54.657Z"
    }
]
```
_Response (500 - Server Error)_
```json
{
    "message": "Internal Server Error"
}
```

___
### POST /todos
##### create new todo
___

_Request Header_
```json
{
    "access_token": "token"
}
```

_Request Body_
```json
{
	"title" : "Title Baru",
    "description" : "Description",
    "due_date": "2020-04-30T10:24:47.438Z"
    
}
```

_Response (200)_
```json
{
    "status": false,
    "id": 4,
    "title": "Title Baru",
    "description": "Description",
    "due_date": "2020-04-30T10:24:47.438Z",
    "updatedAt": "2020-03-30T10:24:47.438Z",
    "createdAt": "2020-03-30T10:24:47.438Z"
}
```

_Response (400 - Bad Request)_
```json
{
    "message": "Validation Error"
}
```
_Response (500 - Server Error)_
```json
{
    "message": "Internal Server Error"
}
```

____________
### GET /todos/:id
##### get one todo by id
____________
_Request Header_
```json
{
    "access_token": "token"
}
```

_Request Body_
```json
not needed
```

_Response (200)_
```json
{
    "id": 4,
    "title": "Title Baru",
    "description": "Description",
    "status": false,
    "due_date": "2020-04-30T10:24:47.438Z",
    "createdAt": "2020-03-30T10:24:47.438Z",
    "updatedAt": "2020-03-30T10:24:47.438Z"
}
```
_Response (404 - Not Found)_
```json
{
    "message": "Todo not found"
}
```
_Response (500 - Server Error)_
```json
{
    "message": "Internal Server Error"
}
```

_________
### PUT /todos/:id
##### update existing todo
_________
_Request Header_
```json
{
    "access_token": "token"
}
```

_Request Body_
```json
{
    "title" : "Ganti Title",
    "description": "Description",
    "status": false,
    "due_date": "2020-04-30T10:24:47.438Z"
}
```

_Response (200)_
```json
[
    1,
    [
        {
            "id": 4,
            "title": "Ganti title",
            "description": "Description",
            "status": false,
            "due_date": "2020-04-30T10:24:47.438Z",
            "createdAt": "2020-03-30T10:24:47.438Z",
            "updatedAt": "2020-03-30T10:33:58.648Z"
        }
    ]
]
```
_Response (404 - Not Found)_
```json
{
    "message": "Todo not found"
}
```
_Response (500 - Server Error)_
```json
{
    "message": "Inter Server Error"
}
```

_______________
### DELETE /todos/:id
##### delete existing todo by id
_______________
_Request Header_
```json
{
    "access_token": "token"
}
```
_Request Params_
```json
{
    "id": 4
}
```

_Request Body_
```
not needed
```
_Response (200)_
```json
{
    "id": 4,
    "title": "Ganti Title",
    "description": "Description",
    "status": false,
    "due_date": "2020-04-30T14:40:50.790Z",
    "createdAt": "2020-03-30T14:40:50.790Z",
    "updatedAt": "2020-03-30T14:40:50.790Z"
}
```
_Response (404 - Not Found)_
```json
{
    "message": "Todo not found"
}
```
_Response (500 - Server Error)_
```json
{
    "message": "Internal Server Error"
}
```
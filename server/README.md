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
|PATCH|localhost:3000/todos/:id/:key|Edit specific atr todo|
|DELETE|localhost:3000/todos/:id|Delete todo|

________
## RESTful endpoints
___________
### GET /todos
_______
_Request Header_
```
not needed
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
        "title": "title3",
        "description": "desc kedua333",
        "status": false,
        "due_date": null,
        "createdAt": "2020-03-30T08:43:00.336Z",
        "updatedAt": "2020-03-30T08:43:00.336Z"
    },
    {
        "id": 2,
        "title": "coba baru",
        "description": null,
        "status": false,
        "due_date": null,
        "createdAt": "2020-03-30T08:41:20.890Z",
        "updatedAt": "2020-03-30T08:51:54.657Z"
    }
]
```
_Response (500)_

________
### POST /todos
________
_Request Header_
```
not needed
```

_Request Body_
```json
{
	"title" : "Title Baru",
	"description" : "Description bisa kosong"
}
```

_Response (200)_
```json
{
    "status": false,
    "id": 4,
    "title": "Title Baru",
    "description": "Description bisa kosong",
    "due_date": null,
    "updatedAt": "2020-03-30T10:24:47.438Z",
    "createdAt": "2020-03-30T10:24:47.438Z"
}
```

_Response (400 - Bad Request)_
```json
{
    "name": "SequelizeValidationError",
    "errors": [
        {
            "message": "Title cannot be null",
            "type": "notNull Violation",
            "path": "title",
            "value": null,
            "origin": "CORE",
            "instance": {
                "status": false,
                "id": null,
                "description": "desc kedua553335",
                "updatedAt": "2020-03-30T15:09:25.010Z",
                "createdAt": "2020-03-30T15:09:25.010Z"
            },
            "validatorKey": "is_null",
            "validatorName": null,
            "validatorArgs": []
        }
    ]
}
```
_Response (500 - Server Error)_
```json
{
    "name": "SequelizeConnectionError",
    "parent": {
        "name": "error",
        "length": 96,
        "severity": "FATAL",
        "code": "28000",
        "file": "miscinit.c",
        "line": "607",
        "routine": "InitializeSessionUserId"
    },
    "original": {
        "name": "error",
        "length": 96,
        "severity": "FATAL",
        "code": "28000",
        "file": "miscinit.c",
        "line": "607",
        "routine": "InitializeSessionUserId"
    }
}
```

____________
### GET /todos/:id
____________
_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```json
{
    "id": 4,
    "title": "Title Baru",
    "description": "Description bisa kosong",
    "status": false,
    "due_date": null,
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
    "name": "SequelizeConnectionError",
    "parent": {
        "name": "error",
        "length": 96,
        "severity": "FATAL",
        "code": "28000",
        "file": "miscinit.c",
        "line": "607",
        "routine": "InitializeSessionUserId"
    },
    "original": {
        "name": "error",
        "length": 96,
        "severity": "FATAL",
        "code": "28000",
        "file": "miscinit.c",
        "line": "607",
        "routine": "InitializeSessionUserId"
    }
}
```

_________
### POST /todos/:id
_________
_Request Header_
```
not needed
```

_Request Body_
```json
{
	"title" : "Kalau field kosong value berubah jadi null"
}
```

_Response (200)_
```json
[
    1,
    [
        {
            "id": 4,
            "title": "Kalau field kosong value berubah jadi null",
            "description": null,
            "status": false,
            "due_date": null,
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
    "name": "SequelizeConnectionError",
    "parent": {
        "name": "error",
        "length": 96,
        "severity": "FATAL",
        "code": "28000",
        "file": "miscinit.c",
        "line": "607",
        "routine": "InitializeSessionUserId"
    },
    "original": {
        "name": "error",
        "length": 96,
        "severity": "FATAL",
        "code": "28000",
        "file": "miscinit.c",
        "line": "607",
        "routine": "InitializeSessionUserId"
    }
}
```

_______________
### DELETE /todos/:id
_______________
_Request Header_
```
not needed
```

_Request Body_
```
not needed
```
_Response (200)_
```json
{
    "id": 5,
    "title": "title3",
    "description": "desc kedua553335",
    "status": false,
    "due_date": null,
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
    "name": "SequelizeConnectionError",
    "parent": {
        "name": "error",
        "length": 96,
        "severity": "FATAL",
        "code": "28000",
        "file": "miscinit.c",
        "line": "607",
        "routine": "InitializeSessionUserId"
    },
    "original": {
        "name": "error",
        "length": 96,
        "severity": "FATAL",
        "code": "28000",
        "file": "miscinit.c",
        "line": "607",
        "routine": "InitializeSessionUserId"
    }
}
```

{
	"name": "joko",
	"email": "email@email.com",
	"password": "password"
}

{
    "user": {
        "id": "ab265ca6-ba79-4fd1-a640-9d491c4fe8b2",
        "name": "joko",
        "email": "email@email.com",
        "password": "$2b$10$JyTxK.RvSmfi/ldx2oUD0eV2Q7JjBuEbsXACilMxs4Eg1gwRVmpnW",
        "updatedAt": "2020-03-31T06:25:33.266Z",
        "createdAt": "2020-03-31T06:25:33.266Z"
    },
    "usertoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYjI2NWNhNi1iYTc5LTRmZDEtYTY0MC05ZDQ5MWM0ZmU4YjIiLCJpYXQiOjE1ODU2MzU5MzM0NDIsImV4cCI6MTU4NTcyMjMzMzQ0Mn0.jVTDHxQO1jRqW97_X7JqYuX6PfiJp3mAInSU_2B59eM"
}

{
    "name": "SequelizeValidationError",
    "errors": [
        {
            "message": "Name cannot be empty",
            "type": "notNull Violation",
            "path": "name",
            "value": null,
            "origin": "CORE",
            "instance": {
                "id": null,
                "updatedAt": "2020-03-31T06:33:34.530Z",
                "createdAt": "2020-03-31T06:33:34.530Z"
            },
            "validatorKey": "is_null",
            "validatorName": null,
            "validatorArgs": []
        },
        {
            "message": "Email cannot be empty",
            "type": "notNull Violation",
            "path": "email",
            "value": null,
            "origin": "CORE",
            "instance": {
                "id": null,
                "updatedAt": "2020-03-31T06:33:34.530Z",
                "createdAt": "2020-03-31T06:33:34.530Z"
            },
            "validatorKey": "is_null",
            "validatorName": null,
            "validatorArgs": []
        },
        {
            "message": "Password cannot be empty",
            "type": "notNull Violation",
            "path": "password",
            "value": null,
            "origin": "CORE",
            "instance": {
                "id": null,
                "updatedAt": "2020-03-31T06:33:34.530Z",
                "createdAt": "2020-03-31T06:33:34.530Z"
            },
            "validatorKey": "is_null",
            "validatorName": null,
            "validatorArgs": []
        }
    ]
}
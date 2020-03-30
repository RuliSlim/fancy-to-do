# Fancy-to-do
Ini adalah API untuk membuat todo list menggunakan Express, Sequelize, Postgres"

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
## Example
1. Get all todos
>> Output
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
2. Create a new todo
>> Input
```json
{
	"title" : "Title Baru",
	"description" : "Description bisa kosong"
}
```
>> Output
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
>> Error
```json
{
    "name": "SequelizeValidationError",
    "errors": [
        {
            "message": "todo.title cannot be null",
            "type": "notNull Violation",
            "path": "title",
            "value": null,
            "origin": "CORE",
            "instance": {
                "status": false,
                "id": null,
                "updatedAt": "2020-03-30T10:25:56.339Z",
                "createdAt": "2020-03-30T10:25:56.339Z"
            },
            "validatorKey": "is_null",
            "validatorName": null,
            "validatorArgs": []
        }
    ]
}
```
3. Get one todo
>> Output
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
4. Edit one todo
>> Input
```json
{
	"title" : "Kalau field kosong value berubah jadi null"
}
```
>> Output
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
>> Error 
```json
{
    "message": "Todo not found"
}
```
5. Delete one todo
>> Output
```json
{
    "todo": 1
}
```
>> Error
```json
{
    "message": "Todo not found"
}
```


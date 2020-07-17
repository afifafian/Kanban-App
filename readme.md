# Kanban

## Kanban App Server

Kanban App is an application made for visualize the system of work management as it moves through a process

This app has :
- RESTful endpoint for asset's CRUD operation
- JSON formatted response

## Tasks RESTful endpoints: 
## GET /tasks
Get all tasks (left outer join with User model)

- Request Header:
```json
{
    "access_token": "<your access token>"
}
```   

- Request Body:
```json
  not needed
```

- Response (200 - OK):
```json
[
  {
   "id": 1,
   "title": "<task title>",
   "category": "<task category>",
   "UserId": 1,
   "createdAt": "2020-07-15T06:43:54.618Z",
   "updatedAt": "2020-07-15T13:23:03.965Z",
   "User": {
       "id": 1,
       "name": "john",
       "email": "john@mail.com",
       "password": "$2b$10$QczOZ1XEIO0WiB2Md.7YTedNpAqsLEZWs/ducKZzTYnc4ze4wRtJW",
       "organization": "Hacktiv8",
       "createdAt": "2020-07-14T10:40:21.987Z",
       "updatedAt": "2020-07-14T10:40:21.987Z"
    }
  },
  {
    "id": 2,
    "title": "<task title>",
    "category": "<task category>",
    "UserId": 1,
    "createdAt": "2020-07-17T07:15:12.149Z",
    "updatedAt": "2020-07-17T07:15:12.149Z",
    "User": {
       "id": 1,
       "name": "john",
       "email": "john@mail.com",
       "password": "$2b$10$QczOZ1XEIO0WiB2Md.7YTedNpAqsLEZWs/ducKZzTYnc4ze4wRtJW",
       "organization": "Hacktiv8",
       "createdAt": "2020-07-14T10:40:21.987Z",
       "updatedAt": "2020-07-14T10:40:21.987Z"
    }
  }
]
```

- Response (400 - Bad Request):
```json
{
    "message": "Invalid request"
}
```

- Response 500: Internal server error
```json
{
    "message": "Internal Server Error"
}
```

## POST /tasks
Create new tasks

- Request Header:
```json
{
    "access_token": "<your access token>"
}
```

- Request Body:
```json
{
    "title": "<title to get insert into>",
    "category": "<category to get insert into>",
}
```

- Response (201 - Created):
```json
{ 
    "tasks": {
        "id": "<given id by system>",
        "title": "<posted title>",
        "category": "<posted category>",
        "UserId": 2,
        "createdAt": "2020-07-17T07:17:12.149Z",
        "updatedAt": "2020-07-17T07:17:12.149Z"
    }
}   
```

- Response (400 - Bad Request):
```json
{
    "message": "Invalid requests"
}
```

- Response 500: Internal server error
```json
{
    "message": "Internal Server Error"
}
```

## GET /tasks/:id
Get task by request id params (authorized only)

- Request Header:
```json
{
    "access_token": "<your access token>"
}
```

- Request Body:
```json
  not needed
```

- Response (200 - OK):
```json
{
    "id": 1,
    "title": "<todo title>",
    "category": "<todo category>",
    "UserId": 2,
    "createdAt": "2020-07-17T07:15:12.149Z",
    "updatedAt": "2020-07-17T07:15:12.149Z",
}
```

- Response (400 - Bad Request):
```json
{
    "message": "Invalid Request"
}
```

- Response (404 - Not Found):
```json
{
    "message": "Task id is Not Found"
}
```

- Response 500: Internal server error
```json
{
    "message": "Internal Server Error"
}
```

## PUT /tasks/:id
Update task by request id params

- Request Header:
```json
{
    "access_token": "<your access token>"
}
```

- Request Body:
```json
{
    "title": "<title value to be updated>",
    "category": "<category value to be updated>",
}
```

- Response (200 - OK):
```json
{
    "message": "Succesfully Updated Task!",
}
```

- Response (400 - Bad Request):
```json
{
    "message": "Invalid requests"
}
```

- Response (404 - Not Found):
```json
{
    "message": "Task id is Not Found"
}
```

- Response 500: Internal server error
```json
{
    "message": "Internal Server Error"
}
```

## DELETE /tasks/:id
Delete task by request id params

- Request Header:
```json
{
    "access_token": "<your access token>"
}
```

- Request Body:
```json
    not needed
```

- Response (200 - OK):
```json
{
    "message": "Succesfully Deleted Task!",
}
```

- Response (400 - Bad Request):
```json
{
    "message": "Invalid requests"
}
```

- Response (404 - Not Found):
```json
{
    "message": "Task id is Not Found"
}
```

- Response (500 - Internal server error)
```json
{
    "message": "Internal Server Error"
}
```

## Users RESTful endpoints: 

## POST /users/register
Create new user

- Request Header
```json
    not needed
```
- Request Body

```json
{
    "name": "<name to get insert into>",
    "email": "<email to get insert into>",
    "password": "<password to get insert into>",
    "organization": "<user doesn't need to input, automatically created with 'Hacktiv8' value>"
}
 ```

- Response (201 - Created)
```json
{
    "id": 10,
    "name": "newUser",
    "email": "user@mail.com",
    "password": "$2b$10$vXKvM7FIz7WkwlarD.a1u.6rW7JNGTwWQtRXyUx/SSaCvaxg2vqze",
    "organization": "Hacktiv8",
    "updatedAt": "2020-07-17T14:04:12.904Z",
    "createdAt": "2020-07-17T14:04:12.904Z"
}
```

- Response (400 - Bad Request)
```json
{
    "type": "Bad Request",
    "errors": 
    [
        { "message": "name cannot be empty" },
        { "message": "email cannot be empty"},
        { "message": "password cannot be empty"}
    ]
}
```

- Response (500 - Internal server error)
```json
{
    "message": "Internal Server Error"    
}
```

## POST /users/login
login to user's account

- Request Header
```json
    not needed
```

- Request Body
```json
{
    "email": "<email user>",
    "password": "<password user>"
}
```

- Response (200 - OK)
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYXlhbmFAZW1haWwuY29tIiwibmFtZSI6Im1heWEiLCJpYXQiOjE1OTQzNjQxNTB9.RgwDwM4MYu5_6x1nQrJ_CKj44-WkR32ZM6_dBZItp9w"
}
```

- Response (400 - Bad Request)
```json
{
    "errors": [ { "message": "Invalid email/password"} ]
}
```

- Response (500 - Internal server error)
```json
{
    "message": "Internal Server Error"    
}
```

## POST /users/googleSignIn
login to user's account through third-party API (google)

- Request Header
```json
    not needed
```

- Request Body
```json
{
    "email": "<user's email>",
    "password": "<user's password>"
}
```

- Response (200 - OK)
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYXlhbmFAZW1haWwuY29tIiwibmFtZSI6Im1heWEiLCJpYXQiOjE1OTQzNjQxNTB9.RgwDwM4MYu5_6x1nQrJ_CKj44-WkR32ZM6_dBZItp9w"
}
```

- Response (400 - Bad Request)
```json
{
    "errors": [ { "message": "Invalid email/password"} ]
}
```

- Response (500 - Internal server error)
```json
{
    "message": "Internal Server Error"    
}
```
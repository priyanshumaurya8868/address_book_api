# **Address Book Api specs.**
### Authentication Header:[ ]()
You can read the authentication header from the headers of the request

|Authorization: Token jwt.token.here|
| :- |

## Installation.
| $ npm install|
| :- |

## Run application
|npm start|
| :- |




# Error Handling
### Errors and Status Codes
If a request fails any validations, expect a 422 and errors in the following format:

      {
      “status” : “Failure”, 

      “message” : “reason why it failed”
}

#### Other status codes:[ ](https://realworld-docs.netlify.app/docs/specs/backend-specs/error-handling#other-status-codes)
401 for Unauthorized requests, when a request requires authentication but it isn't provided

403 for Forbidden requests, when a request may be valid but the user doesn't have permissions to perform the action

404 for Not found requests, when a resource can't be found to fulfill the request

500 for server side error, etc...



###  **Sign up.**

`POST:: /auth/signup`

Example **request body**:

    {
        "name" : "user1",
        "password": "123456"
    }

**No authentication** required, returns a response 

Required fields:  name, password.


Example **response body**:

    {
        "name": "user1",
        "userId": "635a9866a5c488979a892885",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzVhOTg2NmE1YzQ4ODk3OWE4OTI4ODUiLCJuYW1lIjoidXNlcjEiLCJpYXQiOjE2NjcwODYyMDUsImV4cCI6MTY2NzA4OTgwNX0.mnEMiBZGXUcPS2xvTGhRSo7IwKt-Ca9IFzm2Q-K6jxM"
    }



###  **Sign in.**

`POST:: /auth/signin`

Example **request body**:

    {
        "name" : "user1",
        "password": "123456"
    }

**No authentication** required, returns a response 

Required fields:  name, password.


Example **response body**:

    {
        "name": "user1",
        "userId": "635a9866a5c488979a892885",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzVhOTg2NmE1YzQ4ODk3OWE4OTI4ODUiLCJuYW1lIjoidXNlcjEiLCJpYXQiOjE2NjcwODYyMDUsImV4cCI6MTY2NzA4OTgwNX0.mnEMiBZGXUcPS2xvTGhRSo7IwKt-Ca9IFzm2Q-K6jxM"
    }



###  **add entry in your address book.**
`POST:: /addressbook`

Example request body:

    {
        "name" : "u1_e4 nothing",
        "address" : "a1",
        "phone" : "123123"
    }

Authentication required, will return a response Body

Required fields: name, address, phone

### Response body:

    {
        "address_book": {
            "user": "635a9866a5c488979a892885",
            "name": "u1_e4 nothing",
            "address": "a1",
            "phone": "123123",
            "_id": "635dbc8a1c052c27e0d0aed6",
            "__v": 0
        }
    }

`GET:: /addressbook?search=`

Returns user's addressbook

Query Parameters:

Filter by name:

 `search=Priya`

Authentication required.

Response Body:

    {
        "address_book": [
            {
                "_id": "635dbc591c052c27e0d0aecc",
                "user": "635a9866a5c488979a892885",
                "name": "u1_e1",
                "address": "a1",
                "phone": "123123",
                "__v": 0
            },
            {
                "_id": "635dbc701c052c27e0d0aed0",
                "user": "635a9866a5c488979a892885",
                "name": "u1_e3",
                "address": "a1",
                "phone": "123123",
                "__v": 0
            },
            {
                "_id": "635dbc751c052c27e0d0aed2",
                "user": "635a9866a5c488979a892885",
                "name": "u1_e4",
                "address": "a1",
                "phone": "123123",
                "__v": 0
            },
        
        ]
    }

###  **Update entry of your address book.**
`PUT:: /addressbook`

Example request body: `_id` field is *mandatory to include* in the request body and rest of the fields are optional

    {
        "_id": "635dbc8a1c052c27e0d0aed6",
        "name" : "u1_e4 nothing",
        "address" : "a1",
        "phone" : "123123"
    }

Authentication required, will return a response Body

Required fields: _id

### Response body:

    {
        "address_book": {
            "user": "635a9866a5c488979a892885",
            "name": "u1_e4 nothing",
            "address": "a1",
            "phone": "123123",
            "_id": "635dbc8a1c052c27e0d0aed6",
            "__v": 0
        }
    }

### 9  **Delete Entry**
`DELETE:: /addressbook`

Required Param : **id**

Authentication required, will return a response Body

Response Body :

      {

      "status": "Success",

      "message": "Deleted!"

      }

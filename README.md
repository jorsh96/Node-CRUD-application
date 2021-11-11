# week-6-task-node08
# EXPRESS

### Setup
1. This is a TypeScript project
2. Setup the project with `Yarn`

## Description:

A basic Express application, that makes a CRUD operation (create, read, update, delete) into a file database.json.

## How the project works
  - `GET` Request which returns all the data in your database.json data
  - `POST` Request which adds data to the database.json file (Note: It creates a database.json on POST and PUT dynamically).
  - `PUT` Request which updates fields of a particular data using the id in database.json
  - `DELETE` Request which removes a particular data from your database.json using the id

- Data format example:

```
[
    {
    organization: "node ninja",
    createdAt: "2020-08-12T19:04:55.455Z",
    updatedAt: "2020-08-12T19:04:55.455Z",
    products: ["developers","pizza"],
    marketValue: "90%",
    address: "sangotedo",
    ceo: "cn",
    country: "Taiwan",
    id: 2,
    noOfEmployees:2,
    employees:["james bond","jackie chan"]
    }
]
```
## Test coverage
- suertest was used to write the tests

### Test
- Test for a GET request
- Test for a POST request
- Test for a PUT request
- Test for a DELETE request
- Test to return proper HTTP status codes

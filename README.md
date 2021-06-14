# GraphQL Server using Express GraphQL


## Dependencies
- node 14.15.3

## Setup
- Install node dependencies
```
npm install
```

## Run locally
- Start service
```
npm start
```
- View GraphiQL
```
open browser at http://localhost:5000/graphql
```

### Sample query
- Get all books
```
query {
  books {
    author
    title
  }
}
```
- Create new book
```
mutation {
  createBook(input: {
    title: "beast boy",
    author: "adam savage"
  }), {
    title
    author
  }
}
```
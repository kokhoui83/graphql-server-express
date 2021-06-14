import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { makeExecutableSchema } from 'graphql-tools'

const typeDefs = `
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }

  input BookInput {
    title: String
    author: String
  }

  type Mutation {
    createBook(input: BookInput): Book
  }
`

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
]

const resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
    createBook: (_, { input }) => {
      const newbook = {
        author: input.author,
        title: input.title
      }

      books.push(newbook)

      return newbook
    }
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const app = express();

const host = '0.0.0.0'
const port = 5000

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

app.listen(port, host, error => {
  if (error) {
      process.exit(1)
  }

  console.log(`Running at ${host}:${port}`)
})
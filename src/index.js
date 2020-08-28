const { GraphServer, GraphQLServer } = require('graphql-yoga')

//1 defines your GraphQL schema & the exclamation mark means it can never be null
const typeDefs = `
type Query {
    info: String!
    feed: [Link!]!
}

type Link {
    id: ID!
    description: String!
    url: String!
}
`

//2 implementation of GraphQL schema
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]


const resolvers = {
    Query: {
        info: () => `This is the API of the Hackernews Clone`,
        feed: () => links,
    },

    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
    }
}

//3 bundled and passed through here which is imported from graphql-yoga
const server = new GraphQLServer({
    typeDefs,
    resolvers,
})
server.start(() => console.log('Server is running on http://localhost:4000'))
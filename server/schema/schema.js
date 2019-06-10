const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const books = [
    { name: 'book 01', id: '1' },
    { name: 'book 02', id: '2' },
    { name: 'book 03', id: '3' },
    { name: 'book 04', id: '4' },
]

const BookType =  new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString } },
            resolve (parent, args) {
                return _.find(books, { id: args.id });
            }
        }
    }  
});

module.exports = new GraphQLSchema({
    query: RootQuery
});

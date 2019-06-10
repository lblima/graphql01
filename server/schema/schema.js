const graphql = require('graphql');
const _ = require('lodash');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID,
    GraphQLInt,
    GraphQLList } = graphql;

const books = [
    { name: 'book 01', genre: 'fiction', id: '1', authorId: "1" },
    { name: 'book 02', genre: 'comedy', id: '2', authorId: "2" },
    { name: 'book 03', genre: 'documentary', id: '3', authorId: "2" },
    { name: 'book 04', genre: 'drama', id: '4', authorId: "3" },
    { name: 'book 05', genre: 'fantasy', id: '5', authorId: "3" },
    { name: 'book 06', genre: 'drama', id: '6', authorId: "1" },
    { name: 'book 07', genre: 'fantasy', id: '7', authorId: "1" },
    { name: 'book 08', genre: 'serie', id: '8', authorId: "2" },
]

const authors =[
    { name: 'Leonardo Lima', age: 42, id: '1' },
    { name: 'Natalia Lima', age: 32, id: '2' },
    { name: 'Vitor Lima', age: 36, id: '3' },
]

const BookType =  new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve: (parent, args) => {
                return _.find(authors, { id: parent.authorId });
            }
        }
    })
});

const AuthorType =  new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve: (parent, args) => {
                return _.filter(books, { authorId: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve: (parent, args) => {
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve: (parent, args) => {
                return _.find(authors, { id: args.id });
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve: (parent, args) => {
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve: (parent, args) => {
                return authors;
            }
        }
    }  
});

module.exports = new GraphQLSchema({
    query: RootQuery
});

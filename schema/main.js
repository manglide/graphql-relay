const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLEnumType
} = require('graphql');

const QuoteType = new GraphQLObjectType({
  name: 'Quote',
  fields: {
    id: {
      type: GraphQLString,
      resolve: obj => obj._id
    },
    text: { type: GraphQLString },
    author: { type: GraphQLString }
  }
});

const QuoteOneType = new GraphQLObjectType({
  name: 'QuoteOne',
  fields: {
    quoteOne: {
      type: new GraphQLList(QuoteType),
      description: 'Return a single Quote that was matched by ID',
      args: {
        idq: {
          type: GraphQLString,
          description: 'ID of the Quote as a Mongo DB ID'
        }
      },
      resolve: (_, args, { db }) => {
        db.collection('quotes').find({ _id: args.idq}).toArray()
      }
    }
  }
});

const QuotesLibraryType = new GraphQLObjectType({
  name: 'QuotesLibrary',
  fields: {
    allQuotes: {
      type: new GraphQLList(QuoteType),
      description: 'A list of the quotes in the database',
      resolve: (_, args, { db }) => db.collection('quotes').find().toArray()
    }
  }
});

const quotesLibrary = {};
const quoteOne = {};

const queryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    quotesLibrary: {
      type: QuotesLibraryType,
      description: 'A list of the quotes in the database',
      resolve: () => quotesLibrary
    },
    getQuote: {
      type: QuoteOneType,
      description: 'Get A Single Quote',
      resolve: () => quoteOne
    }
  }
});

const mySchema = new GraphQLSchema({
  // root query & root mutation definitions
  query: queryType,
});

module.exports = mySchema;

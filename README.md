[![npm version](https://badge.fury.io/js/norwegian-ssn-graphql-scalar.svg)](https://badge.fury.io/js/norwegian-ssn-graphql-scalar)

> A custom GraphQL [scalar types](http://graphql.org/learn/schema/#scalar-types) for validating Norwegian Social Security Number.

## Installation

```
npm install --save norwegian-ssn-graphql-scalar
```

or

```
yarn add norwegian-ssn-graphql-scalar
```

## Usage

To use this scalar you'll need to add it in two places, your schema and your resolvers map.

In your schema:

```graphql
scalar NorwegianSSN
```

In your resolver map, first import them:

```javascript
import { NorwegianSSNResolver } from 'norwegian-ssn-graphql-scalar';
```

Then make sure they're in the root resolver map like this:

```javascript
const myResolverMap = {
  NorwegianSSN: NorwegianSSNResolver,

  Query: {
    // more stuff here
  },

  Mutation: {
    // more stuff here
  },
};
```

Alternatively, use the default import and ES6's spread operator syntax:

```javascript
import { resolvers } from 'norwegian-ssn-graphql-scalar';
```

Then make sure they're in the root resolver map like this:

```javascript
const myResolverMap = {
  ...resolvers,

  Query: {
    // more stuff here
  },

  Mutation: {
    // more stuff here
  },
};
```

That's it. Now you can use these scalar types in your schema definition like this:

```graphql
type Person {
  socialSecurityNumber: NorwegianSSN
  ...
}
```

These scalars can be used just like the base, built-in ones.

### Usage with Apollo Server

```javascript
import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs, resolvers } from 'norwegian-ssn-graphql-scalar';

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs: [
      // use spread syntax to add scalar definitions to your schema
      ...typeDefs,
      // DateTimeTypeDefinition,
      // ...
      // ... other type definitions ...
    ],
    resolvers: {
      // use spread syntax to add scalar resolvers to your resolver map
      ...resolvers,
      // DateTimeResolver,
      // ...
      // ... remainder of resolver map ...
    },
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
```

### Usage with apollo-server-express and CommonJS imports

```javascript
const { ApolloServer } = require('apollo-server-express');
// Import individual scalars and resolvers
const {
  NorwegianSSNResolver,
  NorwegianSSNTypeDefinition,
} = require('norwegian-ssn-graphql-scalar');

const server = new ApolloServer({
  typeDefs: [NorwegianSSNTypeDefinition, ...yourTypeDefs],
  resolvers: [
    { NorwegianSSN: NorwegianSSNResolver }, // <-- Notable difference here
    ...yourResolvers,
  ],
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
```

## License

Released under the [MIT license](./LICENSE).

## Contributing

Issues and Pull Requests are always welcome. ❤️

## Thanks

This library are based on [Urigo/graphql-scalars](https://github.com/Urigo/graphql-scalars). We use [https://github.com/mikaello/norwegian-national-id-validator](mikaello/norwegian-national-id-validator) for the actual validation.

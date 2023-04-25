import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs as scalarTypeDefs, resolvers as norwegianResolvers } from '../src/main';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { GraphQLSchema, graphql } from 'graphql';

const FOO = '29029600013';
const fooQuery = /* GraphQL */ `
  type Query {
    foo: NorwegianSSN
  }
`;
const fooResolvers = {
  Query: {
    foo: () => FOO,
  },
};

const typeDefs = mergeTypeDefs([fooQuery, ...scalarTypeDefs]);
const resolvers = mergeResolvers([fooResolvers, norwegianResolvers]);

describe('Common', () => {
  it('should create a valid schema', async () => {
    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });
    expect(schema).toBeInstanceOf(GraphQLSchema);
    const result = await graphql({
      schema,
      source: /* GraphQL */ `
        {
          foo
        }
      `,
    });
    expect(result.errors).toBeFalsy();
    expect(result.data && result.data['foo']).toBe(FOO);
  });
});

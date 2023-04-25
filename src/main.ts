import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';
import { validateNorwegianIdNumber } from 'norwegian-national-id-validator';

const validate = (value: unknown) => {
  if (typeof value !== 'string') {
    throw new TypeError(`Value is not string: ${value}`);
  }

  if (!validateNorwegianIdNumber(value)) {
    throw new TypeError(`Value is not a valid norwegian social security number: ${value}`);
  }

  return value;
};

export const norwegianSSNResolver = new GraphQLScalarType({
  name: 'NorwegianSSN',

  description: 'The `NorwegianSSN` scalar type represents a numeric value validated as specified in https://no.wikipedia.org/wiki/F%C3%B8dselsnummer.',

  serialize: validate,

  parseValue: validate,

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Can only validate strings as norwegian social security number but got a: ${ast.kind}`);
    }

    return validate(ast.value);
  },
});

export const norwegianSSNTypeDefinition = 'scalar NorwegianSSN';

export const resolvers = {
  NorwegianSSN: norwegianSSNResolver,
};

export const typeDefs = [norwegianSSNTypeDefinition];

/* global describe, test, expect */

import { Kind } from 'graphql/language';
import Resolver from '../src/resolver';

describe('NorwegianSSN', () => {
  describe('valid', () => {
    test('serialize', () => {
      expect(Resolver.serialize('29029600013')).toBe('29029600013');
    });

    test('parseValue', () => {
      expect(Resolver.parseValue('29029600013')).toBe('29029600013');
    });

    test('parseValue', () => {
      expect(Resolver.parseValue('29029600013')).toBe('29029600013');
    });

    test('parseLiteral', () => {
      expect(
        Resolver.parseLiteral(
          {
            value: '29029600013',
            kind: Kind.STRING,
          },
          {},
        ),
      ).toBe('29029600013');
    });

    test('parseLiteral', () => {
      expect(
        Resolver.parseLiteral(
          {
            value: '29029600013',
            kind: Kind.STRING,
          },
          {},
        ),
      ).toBe('29029600013');
    });
  });

  describe('invalid', () => {
    describe('not a social security number', () => {
      test('serialize', () => {
        expect(() =>
          Resolver.serialize('this is not a social security number'),
        ).toThrow(/Value is not a valid norwegian social security number/);
      });

      test('parseValue', () => {
        expect(() =>
          Resolver.parseValue('this is not a social security number'),
        ).toThrow(/Value is not a valid norwegian social security number/);
      });

      test('parseLiteral', () => {
        expect(() =>
          Resolver.parseLiteral(
            {
              value: 'this is not a social security number',
              kind: Kind.STRING,
            },
            {},
          ),
        ).toThrow(/Value is not a valid norwegian social security number/);
      });
    });

    describe('not a string', () => {
      test('serialize', () => {
        expect(() => Resolver.serialize(123)).toThrow(/Value is not string/);
      });

      test('parseValue', () => {
        expect(() => Resolver.parseValue(123)).toThrow(/Value is not string/);
      });

      test('parseLiteral', () => {
        expect(() =>
          Resolver.parseLiteral({ value: '123', kind: Kind.INT }, {}),
        ).toThrow(
          /Can only validate strings as norwegian social security number but got a/,
        );
      });
    });
  });
});

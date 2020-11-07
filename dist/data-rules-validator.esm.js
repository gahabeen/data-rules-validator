/*!
  * data-rules-validator v0.2.2
  * (c) 2020 Gabin Desserprit
  * @license MIT
  */
const MANDATORY = 'mandatory';

const ARRAY = 'array';
const ARRAY_MIN = 'arrayMin';
const ARRAY_MAX = 'arrayMax';
const ARRAY_LENGTH = 'arrayLength';

const NUMBER = 'number';
const NUMBER_MIN = 'numberMin';
const NUMBER_MAX = 'numberMax';
const NUMBER_EQUAL = 'numberEqual';

const TEXT = 'text';
const TEXT_MAX = 'textMax';
const TEXT_MIN = 'textMin';
const TEXT_LENGTH = 'textLength';

const RULES = {
  [MANDATORY]: {
    ruleTest({ mandatory } = {}) {
      return !!mandatory
    },
    test(value) {
      if (typeof value === 'string') {
        return !!value
      }
      if (Array.isArray(value)) {
        return !!value.length
      }
      if (typeof value === 'object') {
        return !value ? false : !!Object.keys(value).length
      }
      return true
    },
  },

  // TYPES
  [ARRAY]: {
    ruleTest({ array } = {}) {
      return !!array
    },
    test(value) {
      return Array.isArray(value)
    },
  },
  [NUMBER]: {
    ruleTest({ number } = {}) {
      return !!number
    },
    test(value) {
      return typeof value === 'number'
    },
  },
  [TEXT]: {
    ruleTest({ text } = {}) {
      return !!text
    },
    test(value) {
      return typeof value === 'string'
    },
  },

  // Array
  [ARRAY_MIN]: {
    valueTest(value) {
      return RULES[ARRAY].test(value)
    },
    ruleTest({ arrayMin } = {}) {
      return RULES[NUMBER].test(arrayMin)
    },
    test(value, { arrayMin } = {}) {
      return RULES[NUMBER_MIN].test(value.length, { numberMin: arrayMin })
    },
  },
  [ARRAY_MAX]: {
    valueTest(value) {
      return RULES[ARRAY].test(value)
    },
    ruleTest({ arrayMax } = {}) {
      return RULES[NUMBER].test(arrayMax)
    },
    test(value, { arrayMax } = {}) {
      return RULES[NUMBER_MAX].test(value.length, { numberMax: arrayMax })
    },
  },
  [ARRAY_LENGTH]: {
    valueTest(value) {
      return RULES[ARRAY].test(value)
    },
    ruleTest({ arrayLength } = {}) {
      return RULES[NUMBER].test(arrayLength)
    },
    test(value, { arrayLength } = {}) {
      return RULES[NUMBER_EQUAL].test(value.length, { numberEqual: arrayLength })
    },
  },

  // Number
  [NUMBER_MIN]: {
    valueTest(value) {
      return RULES[NUMBER].test(value)
    },
    ruleTest({ numberMin } = {}) {
      return RULES[NUMBER].test(numberMin)
    },
    test(value, { numberMin } = {}) {
      return value >= numberMin
    },
  },
  [NUMBER_MAX]: {
    valueTest(value) {
      return RULES[NUMBER].test(value)
    },
    ruleTest({ numberMax } = {}) {
      return RULES[NUMBER].test(numberMax)
    },
    test(value, { numberMax } = {}) {
      return value <= numberMax
    },
  },
  [NUMBER_EQUAL]: {
    valueTest(value) {
      return RULES[NUMBER].test(value)
    },
    ruleTest({ numberEqual } = {}) {
      return RULES[NUMBER].test(numberEqual)
    },
    test(value, { numberEqual } = {}) {
      return value === numberEqual
    },
  },

  // text
  [TEXT_MIN]: {
    valueTest(value) {
      return RULES[TEXT].test(value)
    },
    ruleTest({ textMin } = {}) {
      return RULES[NUMBER].test(textMin)
    },
    test(value, { textMin } = {}) {
      return RULES[NUMBER_MIN].test(value.length, { numberMin: textMin })
    },
  },
  [TEXT_MAX]: {
    valueTest(value) {
      return RULES[TEXT].test(value)
    },
    ruleTest({ textMax } = {}) {
      return RULES[NUMBER].test(textMax)
    },
    test(value, { textMax } = {}) {
      return RULES[NUMBER_MAX].test(value.length, { numberMax: textMax })
    },
  },
  [TEXT_LENGTH]: {
    valueTest(value) {
      return RULES[TEXT].test(value)
    },
    ruleTest({ textLength } = {}) {
      return RULES[NUMBER].test(textLength)
    },
    test(value, { textLength } = {}) {
      return RULES[NUMBER_EQUAL].test(value.length, { numberEqual: textLength })
    },
  },
};

var MESSAGES = {
  fr: {
    text: `{label} n'est pas un texte`,
  },
};

function interpolate(message = '', variables = {}) {
  return Object.keys(variables).reduce((interpolated, variable) => interpolated.replace(`{${variable}}`, variables[variable]), message)
}

function validate(value, rules = {}, { type = null, fastMode = true, label = 'Le champs', language = 'fr' } = {}) {
  let _tests = Object.keys(RULES).map((rule) => ({ ...RULES[rule], rule }));
  if (type) _tests = _tests.filter((_test) => _test.rule.startsWith(type));

  const tests = [];
  for (let _test of _tests) {
    if (Object.keys(rules).includes(_test.rule)) {
      const { valueTest = () => true, ruleTest = () => true, test = () => true } = _test || {};
      const result = {
        rule: _test.rule,
        valid: valueTest(value) && ruleTest(rules) && test(value, rules),
      };
      tests.push(result);
      if (fastMode && !result.valid) break
    }
  }
  return {
    tests,
    valid: tests.every((t) => t.valid),
    messages: tests.filter((t) => !t.valid).map(({ rule }) => interpolate(MESSAGES[language]?.[rule], { label })),
  }
}

export { interpolate, validate };

import RULES from './rules'

export function validate(value, rules = {}, { type = null, fastMode = true, label = 'Le champs', texts = {}, customRules = {} } = {}) {
  const ALL_RULES = { ...RULES, ...customRules }
  let _tests = Object.keys(ALL_RULES).map((rule) => ({ ...ALL_RULES[rule], rule }))
  if (type) _tests = _tests.filter((_test) => _test.rule.startsWith(type))

  const tests = []
  for (let _test of _tests) {
    if (Object.keys(rules).includes(_test.rule)) {
      const { valueTest = () => true, ruleTest = () => true, test = () => true } = _test || {}
      const result = {
        rule: _test.rule,
        valid: valueTest(value) && ruleTest(rules) && test(value, rules),
      }
      tests.push(result)
      if (fastMode && !result.valid) break
    }
  }
  return {
    tests,
    valid: tests.every((t) => t.valid),
    texts: tests
      .filter((t) => !t.valid)
      .map(({ rule }) => (typeof texts[rule] === 'function' ? texts[rule]({ label, ...rules, value }) : null))
      .filter(Boolean),
  }
}

const calc = require('./calc');

test ('adds positive integers', () => {
  expect(calc.add(2, 3)).toBe(5);
});

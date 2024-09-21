const calc = require('./calc');

describe('add function', () => {
  test ('adds positive integers', () => {
    expect(calc.add(2, 3)).toBe(5);
  });

  test ('adds positive and negative integers', () => {
    expect(calc.add(-3, 2)).toBe(-1);
  })

  // Floats are not yet supported because we need to use an epsilon function to 
  // limit precision.
  test.skip ('adds floats', () => {
    expect(calc.add(1.6, 0.3)).toBe(1.9);
  })
});

describe('subtract function', () => {
  test ('subtracts positive integers', () => {
    expect(calc.subtract(5, 6)).toBe(-1);
  });

  test('subtracts negative integers', () => {
    expect(calc.subtract(-4, -6)).toBe(2);
  });

  test ('subtracts a positive from a negative', () => {
    expect(calc.subtract(-1, 1)).toBe(-2);
  });

  test ('subtracts a negative from a positive', () => {
    expect(calc.subtract(5, -2)).toBe(7);
  })
});

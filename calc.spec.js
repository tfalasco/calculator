const calc = require('./calc');

describe('add function', () => {
  test ('adds positive integers', () => {
    expect(calc.add(2, 3)).toBe(5);
  });

  test ('adds positive and negative integers', () => {
    expect(calc.add(-3, 2)).toBe(-1);
  });

  test ('adds floats', () => {
    expect(calc.add(1.6, 0.3)).toBeCloseTo(1.9);
  });
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
  });

  test('subtracts floats', () => {
    expect(calc.subtract(1.3, 2.5)).toBeCloseTo(-1.2);
  });
});

describe('multiply function', () => {
  test('multiplies two integers', () => {
    expect(calc.multiply(4, 8)).toBe(32);
  })

  test('multiplies positive and negative integers', () => {
    expect(calc.multiply(3, -2)).toBe(-6);
  });

  test('multiplies floats', () => {
    expect(calc.multiply(2.5, 3.7)).toBeCloseTo(9.25);
  });
});

describe('divide function', () => {
  test('divides two positive integers for integer result', () => {
    expect(calc.divide(8, 2)).toBe(4);
  });

  test('divides positive and negative integers for integer result', () => {
    expect(calc.divide(10, -5)).toBe(-2);
  });

  test('divide by zero returns "Err"', () => {
    expect(calc.divide(5, 0)).toBe("Err");
  });

  test('divides floats for float result', () => {
    expect(calc.divide(4.6, 1.6)).toBeCloseTo(2.875);
  });
});

describe('operate function', () => {
  test('operate calls add', () => {
    expect(calc.operate(3, 4, '+')).toBe(7);
  });

  test('operate calls subtract', () => {
    expect(calc.operate(9, 6, '-')).toBe(3);
  });

  test('operate calls multiply', () => {
    expect(calc.operate(4, 5, '*')).toBe(20);
  });

  test('operate calls divide', () => {
    expect(calc.operate(10, 2, '/')).toBe(5);
  })

  test('operate returns "Err" with invalid operator', () => {
    expect(calc.operate(2, 3, '%')).toBe("Err");
  })
});

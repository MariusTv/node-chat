const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
      expect(isRealString(4433)).toBe(false);
  });

  it('should reject string with only spaces', () => {
      expect(isRealString('   ')).toBe(false);
  });

  it('should allow strin with non-space characters', () => {
      expect(isRealString('  abc  ')).toBe(true);
  });
});
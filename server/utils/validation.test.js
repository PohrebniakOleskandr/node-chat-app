const expect = require('expect');
const {isRealString} = require('./validation.js');

describe('isRealString',() => {
  it('should reject non-string values',() => {
    expect(isRealString(1)).toBeFalsy();
  });

  it('should reject string with only spaces',() => {
    expect(isRealString('            ')).toBeFalsy();
  });

  it('should allow string with non-space   characters',() => {
    expect(isRealString('ssadaasr13')).toBeTruthy();
  });
});

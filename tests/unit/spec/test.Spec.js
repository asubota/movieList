describe("Testing...", function(){

  it("true should be equal true", function(){
    expect(true).toEqual(true);
  });

  it("true should not be equal false", function(){
    expect(true).not.toEqual(false);
  });

  it('passes if subject is true', function() {
    expect({}).toBeTruthy();
    expect('').not.toBeTruthy();
  });

  it('compares the actual to the expected using a regular expression', function() {
    expect('Hello Jasmine').toMatch(/jasmine/i);
  });

});

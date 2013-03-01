describe("cookie utils", function () {
  
  it("should extract cookies as key values with trimmed white space", function () {
    document.cookie = "foo=bar";
    document.cookie = " zap = pow ";
    document.cookie = " zig=zag";
    
    console.log(cookieUtils.cookiesAsKeyValues());
    expect(cookieUtils.cookiesAsKeyValues()).toContain(['foo','bar']);
    expect(cookieUtils.cookiesAsKeyValues()).toContain(['zap','pow']);
    expect(cookieUtils.cookiesAsKeyValues()).toContain(['zig','zag']);
  });
  
});
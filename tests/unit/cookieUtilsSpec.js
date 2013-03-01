describe("cookie utils", function () {
  
  // BEFORE ALL
  document.cookie = "foo=bar";
  document.cookie = " zap = pow ";
  document.cookie = " zig=zag";
  
  it("should extract cookies as key values with trimmed white space", function () {
    console.log(cookieUtils.cookiesAsKeyValues());
    expect(cookieUtils.cookiesAsKeyValues()).toContain(['foo','bar']);
    expect(cookieUtils.cookiesAsKeyValues()).toContain(['zap','pow']);
    expect(cookieUtils.cookiesAsKeyValues()).toContain(['zig','zag']);
  });
  
  it("should extract a single cookie by name", function () {
    var retrivedCookie = cookieUtils.getCookieNamed('zap');
    expect(retrivedCookie[0]).toBe('zap');
    expect(retrivedCookie[1]).toBe('pow');
  });
  
});
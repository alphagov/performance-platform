describe("cookie utils", function () {
  
  // BEFORE ALL
  document.cookie = "foo=bar";
  document.cookie = " zap = pow ";
  document.cookie = " zig=zag";
  
  it("should extract cookies as key values with trimmed white space", function () {
    console.log(cookieUtils.cookiesAsKeyValues());
    expect(cookieUtils.cookiesAsKeyValues()).toContain({ key: 'foo', value: 'bar' });
    expect(cookieUtils.cookiesAsKeyValues()).toContain({ key: 'zap', value: 'pow' });
    expect(cookieUtils.cookiesAsKeyValues()).toContain({ key: 'zig', value: 'zag' });
  });
  
  it("should extract a single cookie by name", function () {
    var retrivedCookie = cookieUtils.getCookieNamed('zap');
    expect(retrivedCookie.key).toBe('zap');
    expect(retrivedCookie.value).toBe('pow');
  });
  
});
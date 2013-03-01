describe("cookie utils", function () {
  
  // BEFORE ALL
  document.cookie = 'foo="bar"';
  document.cookie = ' zap = "pow" ';
  document.cookie = ' zig="zag"';
  
  it("should extract cookies as key values with trimmed white space", function () {
    expect(cookieUtils.cookiesAsKeyValues()).toContain({ key: 'foo', value: '"bar"' });
    expect(cookieUtils.cookiesAsKeyValues()).toContain({ key: 'zap', value: '"pow"' });
    expect(cookieUtils.cookiesAsKeyValues()).toContain({ key: 'zig', value: '"zag"' });
  });
  
  it("should extract a single cookie by name", function () {
    var retrivedCookie = cookieUtils.getCookieNamed('zap');
    expect(retrivedCookie.key).toBe('zap');
    expect(retrivedCookie.value).toBe('"pow"');
  });
  
  it("should convert strings that look suspiciously like arrays into arrays", function () {
    var arrayFromString = cookieUtils.arrayify('foo');
    expect(arrayFromString[0]).toBe('foo');
  });
  
});
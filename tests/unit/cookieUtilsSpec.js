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
    var retrievedCookie = cookieUtils.getCookieNamed('zap');
    expect(retrievedCookie.key).toBe('zap');
    expect(retrievedCookie.value).toBe('"pow"');
  });
  
  
  it("should convert strings that look suspiciously like arrays into arrays", function () {
    var arrayFromString = cookieUtils.arrayify('foo');
    expect(arrayFromString[0]).toBe('foo');
  });
  
  
  it("should delete a cookie", function () {
    document.cookie = "nameOfCookie=" + "value";
    cookieUtils.deleteCookieNamed("nameOfCookie");
    expect(document.cookie).not.toContain("nameOfCookie=value");
  })
  
});
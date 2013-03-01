describe("cookie utils", function () {
  
  beforeEach(function () {
    document.cookie = 'foo="bar"';
    document.cookie = ' zap = "pow" ';
    document.cookie = ' zig="zag"';  
  });
  
  afterEach(function () {
    cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      cookieUtils.deleteCookieNamed(cookies[i].split('=')[0]);
    }
  });
  
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
  
  
  it("should set a cookie", function () {
    cookieUtils.setSessionCookie({key:"name", value:"foo"});
    expect(document.cookie).toContain("name=foo");
  });
  
  
  it("should delete a cookie", function () {
    document.cookie = "nameOfCookie=" + "value";
    cookieUtils.deleteCookieNamed("nameOfCookie");
    expect(document.cookie).not.toContain("nameOfCookie=value");
  });
  
  
  it("should not complain if a cookie does not have a value", function () {
    document.cookie = "cookieWithoutValue=";
    cookieUtils.cookiesAsKeyValues();
    // should pass
  });
  
  
  it("should not complain if a cookie does not have a key", function () {
    document.cookie = "=wookieWithoutCause";
    cookieUtils.cookiesAsKeyValues();
    // should pass
  });
  
});
describe("lightGate.js - journey tracking for google analytics", function () {
  
  // SETUP
  var stubAnalyticsService = function (data) {
    stubAnalyticsService.count++;
    stubAnalyticsService.lastMessage = data;
  };
  
  
  var linkId = 'start',
      cookie = 'test'
      stubLink = "<a href='#' id='" + linkId + "'>This is a link</a>",
      pageBody = document.getElementsByTagName('body')[0],
      sendFunction = stubAnalyticsService;
  
  
  describe("initialization", function () {
    
    // BEFORE ALL
    pageBody.innerHTML += stubLink;
    lightGate.startingLinkID(linkId).cookieName(cookie).sendFunction(stubAnalyticsService).init();


    it("should bind event to starting link", function () {
      expect(document.getElementById(linkId).onclick).not.toBe(null)
    });
    
    
    it("should try to send a waiting event", function () {
      document.cookie = 'test="foo"'
      lightGate.init();
      expect(stubAnalyticsService.lastMessage).toBe('foo');
    });
      
      
    it("should try to send any waiting events", function () {
      stubAnalyticsService.count = 0;
      document.cookie = 'test=' + JSON.stringify(["foo","bar","zap"]);
      lightGate.init();
      expect(stubAnalyticsService.count).toBe(3);
      expect(stubAnalyticsService.lastMessage).toBe('zap');
    });
  
  });
  
});
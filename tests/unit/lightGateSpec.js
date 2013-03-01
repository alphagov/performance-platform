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
      sendFunction = stubAnalyticsService,
      eventToSend = {
        'category': "foo",
        'action': "journey_start",
        "label": "some_label",
        "nonInteraction": true
      };
  

  // BEFORE ALL
  pageBody.innerHTML += stubLink;

  lightGate.cookieName(cookie)
           .sendFunction(stubAnalyticsService)
           .journeyStart(linkId, eventToSend)
           .init();
  
  describe("initialization", function () {

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
  
  describe("on click", function () {
    
    it("should add an event to the cookie when the link is clicked", function () {
      document.getElementById(linkId).click();
      expect(document.cookie).toContain(cookie + "=" + JSON.stringify(eventToSend));
    });
    
  });
  
});
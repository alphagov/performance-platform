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
      },
      anotherEventToSend = {
        'category': "bar",
        'action': "journey_start",
        "label": "some_label",
        "nonInteraction": true
      };
  

  // BEFORE ALL - TODO: Delete all cookies before/after the tests run
  pageBody.innerHTML += stubLink;

  lightGate.cookieName(cookie)
           .sendFunction(stubAnalyticsService)
           .journeyStart({ linkId: linkId, eventObject: eventToSend })
           .journeyEnd({ bodyId:"end", eventObject:anotherEventToSend })
           .init();
  
  describe("initialization", function () {
    
    it("should not blow up if the link does not exist", function () {
      lightGate.journeyStart({ linkId: "does_not_exist", eventObject: eventToSend })
               .init();
      // should pass
    });

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
    
    it("should only send events once", function () {
      stubAnalyticsService.count = 0;
      document.cookie = "another_test=" + JSON.stringify(['hello','there']);
      lightGate.cookieName("another_test").init();
      lightGate.cookieName("another_test").init();
      expect(stubAnalyticsService.count).toBe(2);
      expect(stubAnalyticsService.lastMessage).toBe('there');
    });
  
  });
  
  
  describe("on click", function () {
    
    it("should add an event to the cookie when the link is clicked", function () {
      document.getElementById(linkId).click();
      expect(document.cookie).toContain(cookie + "=" + JSON.stringify(eventToSend));
    });
    
  });
  
  
  describe("landing on end page", function () {
    
    it("should fire an event when the last page of the journey is reached", function () {
      pageBody.setAttribute('id','end');
      lightGate.journeyEnd({ bodyId:"end", eventObject:anotherEventToSend }).init()
      expect(stubAnalyticsService.lastMessage).toBe(anotherEventToSend);
    });
    
  });
  
});
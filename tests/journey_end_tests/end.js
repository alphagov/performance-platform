describe("the end of the user journey", function () {

  var messages = [];
  var stubAnalyticsService = function (data) {
    stubAnalyticsService.count++;
    messages.push(data);
  };
    
  // BEFORE ALL
  lightGate.cookieName("test_journey")
           .sendFunction(stubAnalyticsService)
           .journeyStart({ linkId: "start", eventObject: "hello" })
           .journeyEnd({ bodyId:"end", eventObject: "bye" })
           .init();

  it("should have sent a start event", function () {
    expect(messages).toContain("hello");
  });
  
  it("should have sent an end event", function () {
    expect(messages).toContain("bye");
  });
  
});
describe("the end of the user journey", function () {

  var stubAnalyticsService = function (data) {
    stubAnalyticsService.count++;
    stubAnalyticsService.lastMessage = data;
  };
  
  // BEFORE ALL
  lightGate.cookieName("test_journey")
           .sendFunction(stubAnalyticsService)
           .journeyStart({ linkId: "start", eventObject: "hello" })
           .journeyEnd({ bodyId:"end", eventObject: "bye" })
           .init();
  
  it("should tag cookie as the user clicks the start link", function () {
    var startLink = document.getElementById("start");
    startLink.click();
  });

});
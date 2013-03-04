describe("the middle of the user journey", function () {
  
  it("should have sent the stored start event from the previous page", function () {
    expect(stubAnalyticsService.messages()).toContain("hello");
  });
  
  
  it("should wait for 2 seconds and then navigate to the end of the journey", function () {
      if (this.results_.failedCount === 0) {
        window.setTimeout(function () {
          var middleLink = document.getElementById("middle");
          middleLink.click();  
        }, 2000);
      }
    });
  
});
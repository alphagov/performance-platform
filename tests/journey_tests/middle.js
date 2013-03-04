describe("the middle of the user journey", function () {
  
  it("should have sent the stored start event from the previous page", function () {
    expect(messages).toContain("hello");
  });
  
  
  it("should navigate to the end of the journey", function () {
    if (this.results_.failedCount === 0) {
      var middleLink = document.getElementById("middle");
      middleLink.click();  
    }
  });
  
});
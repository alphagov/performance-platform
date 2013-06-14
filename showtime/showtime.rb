require 'rubygems'
require 'watir-webdriver'

@b = Watir::Browser.new :chrome


# calibrate

@b.execute_script <<-JS
  document.write('Showtime! Click into window to begin.');
  document.onclick = function(e){
    window.activated = true;
    window.cursorX = e.pageX;
    window.cursorY = e.pageY;
  }
JS

activated = false
while !activated
  activated = @b.execute_script <<-JS
    return window.activated === true;
  JS
  sleep 0.1
end

posBrowser = @b.execute_script <<-JS
  return [window.cursorX, window.cursorY];
JS
posGlobal = `osxautomation mouselocation`.split

@offsetX = posGlobal[0].to_i - posBrowser[0].to_i
@offsetY = posGlobal[1].to_i - posBrowser[1].to_i

def moveMouse (x, y)
  x += @offsetX
  y += @offsetY
  system( "osxautomation \"mousemove #{x} #{y}\" > /dev/null" )
end

def moveToEl(el)
  lefttop = el.wd.location
  size = el.wd.size
  centre = [lefttop[0] + size[0] / 2, lefttop[1] + size[1] / 2]
  rightbottom = [lefttop[0] + size[0], lefttop[1] + size[1]]
  res = @b.execute_script <<-JS
    return {
      windowWidth: $(window).width(),
      windowHeight: $(window).height(),
      scrollTop: $(window).scrollTop(),
      scrollLeft: $(window).scrollLeft(),
    }
  JS

  scrollLeft = res['scrollLeft'].to_i
  scrollTop = res['scrollTop'].to_i

  visible_lefttop = [scrollLeft, scrollTop]
  visible_rightbottom = [scrollLeft + res['windowWidth'].to_i, scrollTop + res['windowHeight'].to_i]

  # is element fully visible?
  visible_horizontal = visible_lefttop[0] <= lefttop[0] && rightbottom[0] <= visible_rightbottom[0]
  visible_vertical = visible_lefttop[1] <= lefttop[1] && rightbottom[1] <= visible_rightbottom[1]


  if !visible_vertical
    scrollTop = centre[1] - res['windowHeight'].to_i / 2
    @b.execute_script <<-JS
      $('html, body').animate({
          scrollTop: #{scrollTop}
        },
        {
          duration: 400,
          easing: 'swing'
        });
    JS
    sleep 0.5
  end

  moveMouse(centre[0] - scrollLeft, centre[1] - scrollTop)

end


journeys = [
  'licensing'
]


journeys.each do |journey|
  @b.goto 'gov.uk/performance'
  require "journeys/#{journey}"
end

@b.quit

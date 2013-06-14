sleep 2

l = @b.link :text => 'Licensing performance'
moveToEl(l)
l.click

sleep 2

d = @b.figure :id => 'total-applications'
location = d.wd.location

moveMouse(location[0], location[1] + 100)
sleep 1
moveMouse(location[0] + 200, location[1] + 100)
sleep 1
moveMouse(location[0] + 300, location[1] + 100)
sleep 1
moveMouse(location[0] + 400, location[1] + 100)

sleep 2

th = @b.th :text => 'Submissions last week'
moveToEl(th)
th.click


sleep 5

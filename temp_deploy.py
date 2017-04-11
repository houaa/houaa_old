from subprocess import call

call(['npm','run','build'])
#call(['rsync','-avzhe','ssh','dist/index.html','root@101.200.46.157:/usr/share/nginx/frontend'])
call(['rsync','-avzhe','ssh','dist/','root@101.200.46.157:/usr/share/nginx/frontend'])

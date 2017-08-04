from subprocess import call
from datetime import datetime

call(['npm','run','build'])

now=datetime.now()
with open('static/sw.js','r+') as f:
  contents=f.readlines()
  contents.insert(3,"var CACHE_NAME = 'houaa-%d-%d-%d-%d-%d';\n"%(now.month,now.day,now.hour,now.minute,now.second))
  with open('dist/sw.js','w') as new_file:
    new_file.write("".join(contents))
#call(['rsync','-avzhe','ssh','dist/index.html','root@101.200.46.157:/usr/share/nginx/frontend'])
call(['rsync','-avzhe','ssh','dist/','root@101.200.46.157:/usr/share/nginx/frontend'])

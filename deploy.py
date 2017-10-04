from subprocess import call
from datetime import datetime

# generate the the build code to /dist
call(['npm', 'run', 'build'])

# generate the service worker from static/sw.js
# and output to the dist/sw.js(root folder)
# Update the cache name to the newest version,
# see https://developers.google.com/web/fundamentals/getting-started/primers/service-workers
now = datetime.now()
with open('static/sw.js', 'r+') as f:
    contents = f.readlines()
    contents.insert(3, "var CACHE_NAME = 'houaa-%d-%d-%d-%d-%d';\n" %
                    (now.month, now.day, now.hour, now.minute, now.second))
    with open('dist/sw.js', 'w') as new_file:
        new_file.write("".join(contents))

# call rsync to upload to the server
call(['rsync', '-avzhe', 'ssh', 'dist/',
      'hao@101.200.46.157:/home/hao/app_frontend'])

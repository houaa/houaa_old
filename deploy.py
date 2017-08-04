from datetime import datetime

now=datetime.now()
with open('static/sw.js','r+') as f:
  contents=f.readlines()
  contents.insert(3,"var CACHE_NAME = 'houaa-%d-%d-%d-%d-%d';\n"%(now.month,now.day,now.hour,now.minute,now.second))
  with open('sw.js','w') as new_file:
    new_file.write("".join(contents))
  # print("".join(contents))
  # b.cl1ose()
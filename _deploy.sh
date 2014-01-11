grunt
mynt gen -f _site && git add . && git commit && git push
rsync -rv demos/* _site/demos/
rsync -rv --exclude=*.styl --exclude=node_modules _site/* ../daker.github.io/
cd ../daker.github.io/
git add . && git commit  && git push
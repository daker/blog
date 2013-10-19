grunt
mynt gen -f _site && git add . && git commit && git push
cp -r demos/* _site/demos/
cp -r _site/* ../daker.github.io/
cd ../daker.github.io/
git add . && git commit  && git push

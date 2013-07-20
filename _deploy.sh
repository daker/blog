grunt
mynt gen -f _site && git add . && git commit && git push
cp -r _site/* ../daker.github.io/
cd ../daker.github.io/
git add . && git commit  && git push

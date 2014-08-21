grunt
mynt gen -f _site
cp -r demos/* _site/demos/
cp -r snippets/* _site/snippets/
mynt serve _site
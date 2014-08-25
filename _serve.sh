grunt
mynt gen -f _site
mkdir _site/snippets/
python snippets.py
mv _snippets/index.html _site/snippets/
cp -r demos/* _site/demos/
mynt serve _site
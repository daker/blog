# -*- coding: utf-8 -*-
import sys

reload(sys)
sys.setdefaultencoding('utf8')

import markdown
import os

PROJECT_PATH = os.path.dirname(os.path.abspath(__file__))
SNIPPETS_DIRS = os.path.join(PROJECT_PATH, "_snippets")

print "Parsing snippets"

snippets = []
for root, dirs, files in os.walk(SNIPPETS_DIRS):
    for f in sorted(files):
        if f.endswith('.md'):
            snippets.append(os.path.join(root, f))

for snippet in snippets:

    with file(snippet) as f:
        md = f.read()

    html_content = markdown.markdown(md, output_format='html5')

    html_file = snippet.replace(".md", ".html")
    html_file = html_file.replace("_snippets", "snippets")

    with open(html_file, "wb") as fh:
        fh.write(html_content)

print "Done"
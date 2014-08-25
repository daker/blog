# -*- coding: utf-8 -*-
import sys

reload(sys)
sys.setdefaultencoding('utf8')

import markdown
import os
import re
import yaml
import logging
import hashlib
from mako.template import Template

m = hashlib.md5()

yaml.add_constructor('tag:yaml.org,2002:str', lambda loader, node: loader.construct_scalar(node))

__version__ = '0.1'
logger = logging.getLogger('')

PROJECT_PATH = os.path.dirname(os.path.abspath(__file__))
SNIPPETS_DIRS = os.path.join(PROJECT_PATH, "_snippets")
TEMPLATES_DIRS = os.path.join(PROJECT_PATH, "_templates")

logger.debug('Parsing snippets')

snippets_index_tmpl = os.path.join(TEMPLATES_DIRS, "snippets_index.html")
snippets_index = snippets_index_tmpl.replace("_templates", "_snippets")

snippets = {}
for root, dirs, files in os.walk(SNIPPETS_DIRS):
    for f in sorted(files):
        if f.endswith('.md'):
            m.update(os.path.join(root, f))
            k = m.hexdigest()
            snippets[k] = {
                'file' : os.path.join(root, f),
                'title': '',
                'html_content': '',
                'url': ''
            }

with file(os.path.join(TEMPLATES_DIRS, "snippet.html")) as f:
    tmpl_snippet = f.read()

with file(os.path.join(TEMPLATES_DIRS, "snippets_index.html")) as f:
    tmpl_snippet_index = f.read()

for snippet in snippets:

    print snippet
    with file(snippets[snippet]['file']) as f:
        mdcontent = f.read()

    html_file = snippets[snippet]['file'].replace(".md", ".html")
    html_file = html_file.replace("_snippets", "_site/snippets")

    frontmatter, bodymatter = re.search(r'\A---\s+^(.+?)$\s+---\s*(.*)\Z', mdcontent, re.M | re.S).groups()
    conf = yaml.load(frontmatter)

    snippets[snippet]['html_content'] = markdown.markdown(bodymatter, output_format='html5')
    snippets[snippet]['title'] = conf['title']
    snippets[snippet]['url']  = html_file.split('/')[-1]

    with open(html_file, "wb") as fh:
        tmpl = Template(tmpl_snippet, input_encoding='utf-8', output_encoding='utf-8',)
        fh.write(tmpl.render(title=snippets[snippet]['title'], content=snippets[snippet]['html_content']))

with open(snippets_index.replace('snippets_index', 'index'), "wb") as fh:
    tmpl = Template(tmpl_snippet_index, input_encoding='utf-8', output_encoding='utf-8',)
    fh.write(tmpl.render(snippets=snippets))

logger.debug('Done')

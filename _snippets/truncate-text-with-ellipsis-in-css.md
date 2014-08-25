---
title: Truncate text with ellipsis in CSS
tags: [css, ellipsis]
---

Ellipsis text using ```text-overflow``` :

    .ellipsis {
      width: 300px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
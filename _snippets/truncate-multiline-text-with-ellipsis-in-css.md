---
title: Truncate multiline text with ellipsis in CSS
tags: [css, ellipsis]
---

Ellipsis multiline text using ```text-overflow``` and ```-webkit-line-clamp``` :

    .multiline-ellipsis {
        display: block;
        display: -webkit-box;
        max-width: 400px;
        height: 109.2px;
        margin: 0 auto;
        font-size: 26px;
        line-height: 1.4;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
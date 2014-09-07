---
title: Detecting Chrome UA on iOS
tags: [ios, javascript]
---

The UA in Chrome for iOS uses ```CriOS/$Rev```, it's not recommended to use UA sniffing to detect mobile devices

    <script type='text/javascript'>
        if(userAgent.indexOf("crios") != -1) {
            [...]
        }
    </script>
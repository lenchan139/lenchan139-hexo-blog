---
title: '[Mac]批量刪除sync-conflict文件'
tags:
  - MacOS
date: 2017-03-01 22:34:20
---

如題啦&hellip;&hellip;

	由於真係人手del煩死人，所以研究咗下用command。

> <pre>> 
> `/usr/bin/find /path/to -name &#39;*.sync-conflict-20*&#39; -exec rm -f {} \;`</pre>
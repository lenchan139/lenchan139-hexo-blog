---
title: GitHub Notices – 從上游更新下游
tags:
  - GitHub筆記
categories:
  - IT及Linux綜合
  - Git筆記
date: 2014-02-23 12:38:37
---

`<span class="identifier">複製某個repo下來</span>`

> `<span class="identifier">git</span> <span class="identifier"><span class="keymethods">clone</span></span> --bare <span class="identifier">git</span><span class="variable">@github</span>.<span class="identifier">com</span><span class="symbol">:upstream_username</span>/repo.<span class="identifier">git</span>`

	進入該repo

> cd repo.git

	上傳剛纔clone下來的repo

> git&nbsp; push &#8211;mirror `<span class="identifier">git</span><span class="variable">@github</span>.<span class="identifier">com</span><span class="symbol">:username</span>/repo.<span class="identifier">git</span>`

	&#8211;

	&nbsp;
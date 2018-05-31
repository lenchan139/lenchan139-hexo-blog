---
title: 讓Owncloud記住你唔會自動登出
tags:
  - Linux Server
date: 2016-12-19 23:04:41
---

如題，其實主要個設定預設係會自動logout

	搵返呢個owncloud位置並且鍵入：

> ~owncloud/apps/file_external/appinfo/info.xml

	把

> <pre>> 
> `&lt;rememberlogin&gt;false&lt;/rememberlogin&gt; `</pre>

	改爲

> <pre>> 
> `&lt;rememberlogin&gt;true&lt;/rememberlogin&gt; `</pre>

	`完成`
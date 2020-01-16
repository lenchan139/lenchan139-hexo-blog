---
uuid: a26b5113-2fbc-11e9-8b4d-05d549662b79
title: 讓Owncloud記住你唔會自動登出
tags:
  - Linux Server
  - Linux
  - Server
  - Owncloud
  - 自動登出
  - logout
  - auto
  - 記住
  - remember
categories:
  - IT及Linux綜合
  - Linux Server／Common
date: 2016-12-19 23:04:41
---

如題，其實主要個設定預設係會自動logout

	搵返呢個owncloud位置並且鍵入：

> ~owncloud/apps/file_external/appinfo/info.xml

	把

>>
> `&lt;rememberlogin&gt;false&lt;/rememberlogin&gt; `

	改爲

>>
> `&lt;rememberlogin&gt;true&lt;/rememberlogin&gt; `

	`完成`

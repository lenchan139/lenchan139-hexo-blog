---
title: '[Ubuntu Server]重開啲service時彈出unable to resolve host'
tags:
  - Linux Server
date: 2016-12-21 17:28:50
---

如題，其實就係啲hostname無set好。

	雖然影響唔大不過我有強迫症咁所以&hellip;&hellip;

	首先該自動改自己機hostname嘅：

	nano&nbsp;&nbsp;/etc/hostname

	入去打返你要嘅Hostname。

	跟住改埋loop backaddress，記住要同上面一樣：

	nano /etc/hosts

	加入一行類似咁嘅：

	127.0.0.1 hostnamear

	之後重開就可以收工啦

	&nbsp;
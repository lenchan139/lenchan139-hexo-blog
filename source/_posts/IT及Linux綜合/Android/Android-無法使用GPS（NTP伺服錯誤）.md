---
title: '[Android]無法使用GPS（NTP伺服錯誤）'
tags:
  - Android
  - GPS
  - NTP Server
categories:
  - IT及Linux綜合
  - Android
date: 2014-03-05 19:27:47
---

如題，這個問題簡單地修改NTP伺服器就可以了。

	打開 /etc/gps.conf 文件

	在第一行

> NTP_SERVER = ntp.net

	大概這樣的。那麼要找一個可用的NTP伺服器該如何呢？

	上去 [http://www.pool.ntp.org/en/](http://www.pool.ntp.org/en/)，在Active Servers選擇自己的地區然後找到。

	這裏以香港爲例，應該把第一行修改成

> NTP_SERVER = hk.pool.ntp.net

	儲存，離開，重啓裝置。

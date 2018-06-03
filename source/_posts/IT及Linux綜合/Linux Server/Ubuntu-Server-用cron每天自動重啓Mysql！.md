---
title: '[Ubuntu Server]用cron每天自動重啓Mysql！'
tags:
  - Linux
  - Linux Server
  - Server
  - cron
  - crontab
  - config
  - console
  - MySQL
categories:
  - IT及Linux綜合
  - Linux Server
date: 2014-03-05 20:43:32
---

如題，crontab的介紹等等請看[此](http://linux.vbird.org/linux_basic/0430cron.php)。

	首先鍵入：

> crontab -e

	然後如果你有多於一個文字編輯器，會叫你選擇一個。

	再然後新增一行，鍵入：

> 0 4 * * * service mysql restart

	這裏的含義是

> 分鐘 | 小時 | 日 | 月 | 星期 | 指令

	然後 * 代表無論如何&hellip;&hellip;

	以上面爲例子，他代表的意思是

	在任意的星期、任意的月、日的4點0分執行 service mysql restart

	參考資料：

	[鳥哥的Linux私房菜](http://linux.vbird.org/linux_basic/0430cron.php)

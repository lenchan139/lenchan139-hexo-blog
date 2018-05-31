---
title: '[ThunderBird]開心愉快地手動build最新版嘅FireTray'
tags:
  - Chakra/OpenSUSE/x86 Linux
date: 2015-10-05 21:08:12
---

如題啦。

	簡單講就係我發覺FireTray係Mozilla Addon Store上面嘅FireTray用唔到唔少嘅功能，所以就跑咗去佢個GitHub重新build個最新版本嚟用。

	咁首先係廢話，如果無裝嘅話就裝咗git同make先。

	至於其他嘅自行解決啦&hellip;&hellip;

	Chakra：

> sudo pacman -Syu git make

	OpenSUSE：

> sudo zypper in git make

	之後再安裝埋libappindicator，不然在KDE5無法正常使用：

> sudo zypper in libappindicator1 libappindicator3-1

	之後開始git：

> git clone git://github.com/foudfou/FireTray.git

	之後進入git落嚟嘅folder入面嘅source code：

> cd FireTray/src

	開始compile：

> make build

	之後開返個folder，入面有個build-xxxxxx嘅folder，入面有個firetray-0.x.x.xpi嘅addon file。

	拖入ThunderBird，安裝。
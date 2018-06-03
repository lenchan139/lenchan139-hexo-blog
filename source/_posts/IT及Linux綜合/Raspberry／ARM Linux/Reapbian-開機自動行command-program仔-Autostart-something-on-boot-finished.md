---
title: '[Raspbian] 開機自動行command/program仔 Autostart something on boot finished'
tags:
  - Raspberry/ARM Linux
  - Raspberry
  - Raspbian
  - Google
  - ARM
  - Linux
  - syncthing
  - IoT
  - rpi
categories:
  - IT及Linux綜合
  - Raspberry／ARM Linux
date: 2016-10-20 20:34:10
---

如題，Google到修改呢個文件：

>>
> sudo nano&nbsp;`~/.config/lxsession/LXDE/autostart`

	`但係唔成功，話無呢個file人手搵咗下發現個名有少少變更，鍵入：`

>>
> sudo nano&nbsp;`~/.config/lxsession/LXDE-pi/autostart`

	`跟住輸入假設我要開機自動行 syncthing 呢個command就：`

> `@syncthing`

	`記得開頭加個@。`

	&#8211;

	Englih version:

	enter command:

> sudo nano&nbsp;`~/.config/lxsession/LXDE/autostart`

	`if the file not exsit, try this:`

> sudo nano&nbsp;`~/.config/lxsession/LXDE-pi/autostart`

	`add new command, remember inser @ on begin like:`

> `@syncthing`

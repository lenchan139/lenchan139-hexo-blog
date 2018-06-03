---
title: '[KDE]開機時自動啓動KDE程式而不顯示主窗口（startup on tray）'
tags:
  - Chakra Linux
  - KDE
  - startup
  - tray
  - notebook
  - system setting
  - shutdown
  - kmail
categories:
  - IT及Linux綜合
  - Manjaro／x86 Linux
date: 2015-07-07 17:55:01
---

如題。

	最近總算記得調教一下可愛的kmail，在notebook上check mail鳥。

	搞咗個下晝，最後卡死咗係點樣可以令個kmail開機自己開又唔會有個好撚大嘅主畫面&hellip;&hellip;

	&#8211;

	首先，打開system settings入面嘅startup and shutdown先

	[![snapshot262](https://blog.lenchan139.org/wp-content/uploads/2015/07/snapshot262-600x418.png)](https://blog.lenchan139.org/wp-content/uploads/2015/07/snapshot262.png)

	跟住Add Program，輸入以下command。

> ksystraycmd &#8211;hidden kmail &#8211;nofork

	[![snapshot263](https://blog.lenchan139.org/wp-content/uploads/2015/07/snapshot263.png)](https://blog.lenchan139.org/wp-content/uploads/2015/07/snapshot263.png)

	如果要其他程式自行將kmail轉成你要嘅程式，之後可以重開機試下。

	[![snapshot274](https://blog.lenchan139.org/wp-content/uploads/2015/07/snapshot274-600x405.png)](https://blog.lenchan139.org/wp-content/uploads/2015/07/snapshot274.png)

	（雖然我最後都係用咗Thunderbird&hellip;&hellip;）

	[![snapshot264](https://blog.lenchan139.org/wp-content/uploads/2015/07/snapshot264-600x337.png)](https://blog.lenchan139.org/wp-content/uploads/2015/07/snapshot264.png)

	（貴龍BB真係好可愛〜嗚哇&hellip;&hellip;）

	&nbsp;

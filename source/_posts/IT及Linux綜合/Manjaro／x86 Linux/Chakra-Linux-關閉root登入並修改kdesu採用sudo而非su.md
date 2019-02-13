---
uuid: a26b7827-2fbc-11e9-8b4d-05d549662b79
title: '[Chakra/Linux]關閉root登入並修改kdesu採用sudo而非su'
tags:
  - Chakra Linux
  - root
  - sudo
  - su
  - kdesu
  - Android SDK
  - shortcut
  - user
categories:
  - IT及Linux綜合
  - Manjaro／x86 Linux
date: 2014-06-07 17:50:32
---

如題，這個折騰是因爲我發覺Android SDK Manager是需要而root權限使用，而我又想建立shortcut來開啓它。衆所周知，su/sudo是不具備GUI的，但是直接用kdesu是無法正常開啓它的。

	後來發現原來是因爲kdesu預設是使用su而非sudo，所以無法正常在當前的user開啓特定程式，因此便有了這篇文章w

	&#8211;

	首先禁止Root登入：

> sudo passwd -l root

	其次，kdesu預設是使用su，但是在root禁用的情況下是無法使用的，所以再來是配置kdesu，使他採用sudo

	修改或建立：

> sudo kate /usr/share/config/kdesurc

	填入當中內容：

> [super-user-command]
>
> 		super-user-command=sudo

	儲存，完成！

	&#8211;

	如果你又想要允讓Root變回可登入，鍵入：

> sudo passwd -u root

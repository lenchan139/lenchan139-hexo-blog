---
uuid: a26b7825-2fbc-11e9-8b4d-05d549662b79
title: '[Chakra/Linux]用sudo 取代 su （GUI）'
tags:
  - Chakra Linux
  - sudo
  - su
  - kdesu
  - KDE
  - config
  - kdesurc
  - superuser
categories:
  - IT及Linux綜合
  - Manjaro／x86 Linux
date: 2013-10-21 00:35:00
---

簡單來說KDE下大部分SU請求是依靠kdesu，然後只要簡單修改一下就

`sudo kate /usr/share/config/kdesurc`

然後輸入

`[super-user-command]
super-user-command=sudo `

並保存就可以了

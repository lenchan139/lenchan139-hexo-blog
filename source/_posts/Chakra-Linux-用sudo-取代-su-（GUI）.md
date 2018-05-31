---
title: '[Chakra/Linux]用sudo 取代 su （GUI）'
tags:
  - Chakra/OpenSUSE/x86 Linux
date: 2013-10-21 00:35:00
---

簡單來說KDE下大部分SU請求是依靠kdesu，然後只要簡單修改一下就

`sudo kate /usr/share/config/kdesurc`

然後輸入

`[super-user-command]
super-user-command=sudo `

並保存就可以了
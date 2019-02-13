---
uuid: a26b5117-2fbc-11e9-8b4d-05d549662b79
title: '[Chakra/KDE]透過 Ksuperkey 來達成用Windows Key（Meta/Super鍵）打開 KickOff 的功能！'
tags:
  - Chakra Linux
  - ksuperkey
  - winkey
  - superkey
  - metakey
  - KickOff Menu
  - KDE
  - KDE4
  - xmodmap
categories:
  - IT及Linux綜合
  - Manjaro／x86 Linux
date: 2013-10-03 22:58:00
---

我知道筆記略長……略長
嘛，由於各種原因，反正我就叛逃到Chakra上面，享受起KDE了，爲了秉承一貫（？）的習慣，查了各種Documents後姑且找到個方法。
本來打算用Xmodmap改的，不過經過一晚嘗試都失敗了，於是嘛……
嘛，首先簡單說說Ksuperkey的功能……簡單來說就是將組合鍵映射成某個按鍵之上，透過這個方法我們可以姑且解決需求。

第一步是廢話，首先安裝Ksuperkey啦。如果你是Chakra的話直接

`sudo pacman -S ksuperkey`

如果你是Ubuntu的話……請自己參考[這裏](http://kde-apps.org/content/show.php?content=154569)……

嘛，總之裝好之後在Autostart那新增兩條開機自啓動指令，分別是：

`ksuperkey`
用作自動啓動Ksuperkey

`ksuperkey -e 'Meta_L=Alt_L|F1'`
然後把Meta_L映射成Alt_L+F1這個組合，當然如果你是Super_L之類自己改改就好

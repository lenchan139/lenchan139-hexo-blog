---
title: '[Chakra/Linux]在Chakra裝Flash以及搞定Flash的亂碼問題'
tags:
  - Chakra/OpenSUSE/x86 Linux
date: 2013-10-05 15:35:00
---

前言略……
Chakra本身就有flash，不過在extra來源那，所以我們得啓用extra。

用kate開啓config文件： 
`sudo kate /etc/pacman.conf`

然後找到這兩行：
`#[extra]
#Include = /etc/pacman.d/mirrorlist`

然後去掉#號變成了：
`[extra]
Include = /etc/pacman.d/mirrorlist`

接着更新一下pacman：
`sudo pacman -Syu`

再然後就鍵入指令安裝flash：
`sudo pacman -S flashplugin`

於是就完成了了Flash的安裝，接着安裝一下ttf-arphic-uming，由於主源沒有我們只好用CCR來裝了……
鍵入：
`ccr ttf-arphic-uming`

唔？中間的steps？略過。
畢竟，玩Linux/Unix的不是都有點基礎英文閱讀能力的麼！

Finish： 

<div>[![](https://3.bp.blogspot.com/-sIpuKjusqI8/Uk_AjIbwidI/AAAAAAAADIY/RBuZISv-ekI/s640/%E5%BF%AB%E7%85%A72.png)](https://3.bp.blogspot.com/-sIpuKjusqI8/Uk_AjIbwidI/AAAAAAAADIY/RBuZISv-ekI/s1600/%E5%BF%AB%E7%85%A72.png)</div>
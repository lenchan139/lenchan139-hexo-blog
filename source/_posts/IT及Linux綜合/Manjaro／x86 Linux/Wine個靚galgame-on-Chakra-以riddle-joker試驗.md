---
title: '[Wine個靚galgame on Chakra]以riddle joker試驗'
tags:
  - Linux
  - Wine
  - galgame
  - Chakra Linux
  - Riddle Joker
  - 試驗
  - 日文
  - winetricks
  - pacman
  - lib32
  - 聲音
  - 影片播放
  - 影片
  - Forum
categories:
  - IT及Linux綜合
  - Manjaro／x86 Linux
date: 2018-05-01 01:52:17
---

首先係設定全局變數：

WINEARCH=win32

之後安裝wine同winetricks：

sudo pacman -Syu wine winetricks

&nbsp;

0.日文字體

經由winetricks安裝：

winetricks takao fakejapanese

1.聲音

安裝pluse, alsa 同openal 嘅lib32：

sudo pacman -Syu lib32-alsa-plugins lib32-libpulse lib32-openal

&nbsp;

2.影片播放（OP&amp;ED)

經由winetricks安裝：

winetricks wmp9

&nbsp;

Ref:

[https://bbs.archlinux.org/viewtopic.php?id=135032](https://bbs.archlinux.org/viewtopic.php?id=135032 "[Solved] wine sound not working (pulseaudio)- Arch Linux Forum")

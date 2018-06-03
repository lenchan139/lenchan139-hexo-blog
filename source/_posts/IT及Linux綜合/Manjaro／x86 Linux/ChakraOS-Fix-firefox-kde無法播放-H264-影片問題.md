---
title: '[ChakraOS]Fix firefox-kde無法播放 H264 影片問題'
tags:
  - Chakra Linux
  - firebox
  - firefox-kde
  - H264
  - Video
  - 影片
  - gst-libav
  - pacman
categories:
  - IT及Linux綜合
  - Manjaro／x86 Linux
date: 2014-08-13 22:20:11
---

如題。這個問題我在ChakraOS的Packages Bug Tracker上發了個issue，之後有人回覆了解決方法。

	[《FS#465 &#8211; Firefox-kde》](http://chakraos.org/bugtracker/index.php?do=details&amp;action=details.addvote&amp;task_id=465)

	&#8211;

	概要：這個問題是由於firefox-kde所採用的gst-libav並不在主要pacman的來源之內，反而在testing之內。

	如果你的pacman並沒有testing（注意：是testing，不是unstable）來源，請鍵入：

> sudo nano /etc/pacman.conf

	在空白位置加入：

> [testing]
>
> 		Include = /etc/pacman.d/mirrorlist

	儲存離開。

	之後安裝gst-libav：

> sudo pacman -Sy gst-libav

	即可。

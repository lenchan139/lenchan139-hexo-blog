---
uuid: a26b02f8-2fbc-11e9-8b4d-05d549662b79
title: '[MAC]鎖起Dock唔準改變大細'
tags:
  - MacOS
  - Mac
  - Dock
  - 鎖起
categories:
  - IT及Linux綜合
  - Mac／iOS
date: 2017-01-27 21:10:39
---

如題。

	衆所周知MAC嘅dock係可以有條灰色線拉大縮細成條bar嘅，咁手賤嘅我好易拉親，所以求其Google咗個solution

	打開Terminal，鍵入：

> defaults write com.apple.Dock size-immutable -bool yes; killall Dock

	之後如果想改變嘅話，可以鍵入：

> defaults write com.apple.Dock size-immutable -bool no; killall Dock

	之後可以再修改鳥。改好可以再次鎖起：

> defaults write com.apple.Dock size-immutable -bool yes; killall Dock

	&nbsp;

	參考：

	&nbsp;

	[How to Lock the Dock Size, Position, and Contents in OS X &#8211;&nbsp;macobserver](https://www.macobserver.com/tmo/article/how-to-lock-the-dock-size-position-and-contents-in-os-x)

	&nbsp;

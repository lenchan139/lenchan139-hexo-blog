---
uuid: a26b7826-2fbc-11e9-8b4d-05d549662b79
title: '[Chakra/Linux]調教VLC在zh-hk下是英文而非中文的錯誤'
tags:
  - Chakra Linux
  - Linux
  - VLC
  - zh-hk
  - 翻譯
  - 語言
categories:
  - IT及Linux綜合
  - Manjaro／x86 Linux
date: 2014-02-08 23:07:51
---

如題，簡單概括來說這個問題是因爲在zh-hk環境下並沒有對應的翻譯。

	知道如此那麼解決方法就很簡單了！

	&nbsp;

> sudo cp /usr/share/locale/zh_TW/LC_MESSAGES/vlc.mo /usr/share/locale/zh_HK/LC_MESSAGES/vlc.mo

	&nbsp;

	Finish！

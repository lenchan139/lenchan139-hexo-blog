---
title: '[Chakra/Linux]安裝並讓Steam for Linux至少能打英文……'
tags:
  - Chakra Linux
  - Linux
  - pacman
  - kate
  - language
  - 輸入法
  - IME
  - Input Method Engine
categories:
  - IT及Linux綜合
  - Manjaro／x86 Linux
date: 2013-10-27 11:58:00
---

如題……起碼要來個英文輸入不然連登入也做不了啊所以呢……

安裝：
`sudo pacman -Syu steam`
來修改執行檔：
`sudo kate /usr/bin/steam`
然後在裏面開頭加入一行：
` export LC_CTYPE="zh_US.UTF-8" `
儲存即可

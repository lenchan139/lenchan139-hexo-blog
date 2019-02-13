---
uuid: a26b7828-2fbc-11e9-8b4d-05d549662b79
title: '[ChakraOS]fix spun 在執行pacman -Sy時沒有權限而不會推送更新通知的問題'
tags:
  - Chakra Linux
  - pacman
  - 通知
  - 推送
  - 更新
  - package update
  - fix
  - spun-live
categories:
  - IT及Linux綜合
  - Manjaro／x86 Linux
date: 2014-05-14 19:13:30
---

如題。

	搜尋spun

> sudo pacman -Ss spun

	發現有 spun-live這個包

	移除spun

> sudo pacman -R spun

	安裝spun-live

> sudo pacman -S spun-live

	重開

> reboot

	一切正常w

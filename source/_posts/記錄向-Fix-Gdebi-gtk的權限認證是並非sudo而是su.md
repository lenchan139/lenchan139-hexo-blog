---
title: '[記錄向]Fix Gdebi-gtk的權限認證是並非sudo而是su'
tags:
  - Chakra/OpenSUSE/x86 Linux
date: 2013-08-07 22:14:00
---

最近發現gdebi-gtk要認證的時候是su而非sudo……（不要問我Ubuntu開隨機Root密碼我是怎樣知道的）
最近發現用
`gksu-properties`
運行，將su改成sudo就搞定了
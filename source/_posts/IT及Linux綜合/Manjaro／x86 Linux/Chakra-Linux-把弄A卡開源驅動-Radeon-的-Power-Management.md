---
uuid: a26b7823-2fbc-11e9-8b4d-05d549662b79
title: '[Chakra/Linux]把弄A卡開源驅動 Radeon 的 Power Management'
tags:
  - Chakra Linux
  - ATI
  - Display card
  - AMD
  - 顯示卡
  - Radeon
  - ATI Radeon
  - Power Management
  - 電源管理
  - Open Source
  - Driver
  - 開源
  - 驅動程式
categories:
  - IT及Linux綜合
  - Manjaro／x86 Linux
date: 2013-10-30 21:40:00
---

使用Udev開機是開啓，先新建：



    sudo kate /etc/udev/rules.d/30-radeon-pm.rules`

     然後填入：
    `KERNEL=="card0", SUBSYSTEM=="drm", DRIVERS=="radeon", ATTR{device/power_method}="profile",  ATTR{device/power_profile}="low"

完成:)

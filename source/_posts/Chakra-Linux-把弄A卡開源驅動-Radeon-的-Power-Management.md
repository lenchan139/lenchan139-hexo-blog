---
title: '[Chakra/Linux]把弄A卡開源驅動 Radeon 的 Power Management'
tags:
  - Chakra/OpenSUSE/x86 Linux
date: 2013-10-30 21:40:00
---

使用Udev開機是開啓，先新建：

<pre></pre>

    sudo kate /etc/udev/rules.d/30-radeon-pm.rules`</pre>
    <pre></pre>
    <pre> 然後填入：</pre>
    <pre>`KERNEL=="card0", SUBSYSTEM=="drm", DRIVERS=="radeon", ATTR{device/power_method}="profile",  ATTR{device/power_profile}="low" 

完成:)
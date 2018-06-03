---
title: '[Plasma5]讓KDE開機會自動掛載所有（大概）分區'
tags:
  - Linux
  - Plasma
  - Plasma5
  - KDE　
  -　automount
  - 自動掛載
  - Service Manager 
categories:
  - IT及Linux綜合
  - Manjaro／x86 Linux
date: 2015-11-22 22:41:39
---

如題。

> 首先打開device_automounter.desktop：
>
> 		sudo nano /usr/share/kde4/services/kded/device_automounter.desktop

	修改：

> X-KDE-Kded-phase=1

	改成：

> X-KDE-Kded-phase=0

	使用指令開啓Service Manager：

> kcmshell4 kcmkded

	把Removable Device Automounter開啓。

	之後用指令打開Removable Devices Module：

> kcmshell4 device_automounter_kcm

	把該開的開咗佢。

	[![snapshot482](https://blog.lenchan139.org/wp-content/uploads/2015/11/snapshot482.png)](https://blog.lenchan139.org/wp-content/uploads/2015/11/snapshot482.png)

	收工。

	&#8211;

	Reference: [Automount partitions GUI missing from system settings &#8211; KDE Community Forum](https://forum.kde.org/viewtopic.php?f=289&amp;t=126846)

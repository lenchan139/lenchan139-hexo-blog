---
title: '[Chakra] 說好的Grub呢：想改bootloader config發現其實係無grub嘅——係，UEFI係用systemd-boot架'
tags:
  - Chakra/OpenSUSE/x86 Linux
date: 2016-11-13 12:28:52
---

如題。

	今日手痕裝返Chakra，咪諗住一如既往咁改啊個bootloader個timeout 啦&hellip;&hellip;於是一如以往鍵入：

> sudo nano&nbsp;/etc/default/grub

	file not exsits?! okok，再check下pacman發現根本無裝grub，啫係唔係用grub做bootloader啦。

	咁究竟用咩？經過我奮戰一小時後發現答案係&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;

	**systemd-boot**&hellip;&hellip;嗯。

	咁知道係咩bootloader就好做事啦，打開Chakra嘅友羣嘅Wiki（啫係Arch Linux啊），音速咁跳到去config果part。

	唔，$esp開頭？！

	okok，坐和放寬，再用半粒search。

	Okok，終於得出答案，鍵入：

> sudo nano /boot/loader/loader.conf

	跟住修改要改嘅嘢，完成。

	隨書附送Arch Linux嘅systemd-boot嘅wiki條目：

	[https://wiki.archlinux.org/index.php/Systemd-boot](https://wiki.archlinux.org/index.php/Systemd-boot)
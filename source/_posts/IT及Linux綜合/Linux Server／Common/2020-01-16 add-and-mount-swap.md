---
uuid: add-and-mount-swap-to-linux
title: 爲Linux新增Virtual RAM -- swap並隨開機掛載
tags:
  - docker
  - Manjaro Linux
  - Ubuntu Server
  - Linux Commons
  - SWAP
  - null
categories:
  - IT及Linux綜合
  - Linux Server／Common
date: 2020-01-16 20:33:43
---
大家好，又係我廢文小公主雪娘。話說強者我朋友嘅鹹溼仔S君今日又搵我話佢部Server得512MB RAM唔夠用，所以搵我幫佢加Virtual RAM。
SWAP有兩種方法，一種係直接間一個partition做swap，另一個就係建立一個swapfile，並mount as swap partition。
雖然大家會有幻覺Partition同swap file好似Partition快啲，不過根據資料指出：

> For a 2.6 Linux kernel, there is no performance difference between a swap partition and an unfragmented swap file. When a swap partition/file is enabled by swapon, the 2.6 kernel finds which disk blocks the swapfile is stored on, so that when it comes time to swap, it doesn't have to deal with the filesystem at all.

出處：[swap partition vs file for performance? -- StackExchange](https://serverfault.com/questions/25653/swap-partition-vs-file-for-performance)

# Swap Partition
第一種方法係Swap Partition，首先你要清空一個吉嘅Partition，透過fdisk：
```bash
fdisk
```

之後格式化該分區，例如以 /dev/sdc3爲例：
```bash
mkswap /dev/sdc3
```

啓動新的分區：
```bash
swapon /dev/sdc3
```

之後爲咗能夠令該swap自動隨開機啓用，需要修改fstab：
```bash
nano etc/fstab
```

新增一行：
```
/dev/sdc3 swap swap defaults 0 0
```

儲存離開並重啓：
```bash
reboot
```

# Swapfile
透過dd command 建立你所需要嘅Swapfile：
```bash
dd if=/dev/zero of=/swapfile bs=1M count=512
```

格式化該swapfile：
```bash
mkswap /swapfile
```

之後使得該swapfile識得隨開機啓用，修改fstab：
```bash
nano /etc/fstab
```

新增：
```
/swapfile swap swap defaults 0 0
```
儲存離開，並重啓：
```bash
reboot
```

之後可以透過free command確認是否正確掛載：
```bash
free -m
```
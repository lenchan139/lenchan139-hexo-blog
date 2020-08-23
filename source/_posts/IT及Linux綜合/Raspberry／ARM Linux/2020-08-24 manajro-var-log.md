---
uuid: 20200824-manjaro-var-log-fstab
title: Reaspberry 4 把/var/log等各種頻繁寫入目錄映射到ramdisk提高microsd card嘅壽命
categories:
  - IT及Linux綜合
  - Raspberry／ARM Linux
date: 2020-08-24 03:52:12
---

最近搵返個RPI4出來玩，特登買咗Samsung Pro Endurance。本來打算用SSD經USB BOOT但係講真引導config太麻煩而且太多Bug，最後都係用返High Endurance嘅micro sd boot機。

而Linux部分Directories IO非常頻繁，所以部分會頻繁寫入嘅目錄唔改爲寫入ramdisk之後有助提高microsd card嘅壽命。

爲了達成呢個功能，可以透過修改fstab，把呢啲目錄mount成tmpfs。

鍵入：
```
nano /etc/fstab
```

新增以下幾行（按自己需要增減啦）：
```
tmpfs    /tmp    tmpfs    defaults,noatime,nosuid,size=100m    0 0
tmpfs    /var/tmp    tmpfs    defaults,noatime,nosuid,size=30m    0 0
tmpfs    /var/log    tmpfs    defaults,noatime,nosuid,mode=0755,size=100m    0 0
tmpfs    /var/run    tmpfs    defaults,noatime,nosuid,mode=0755,size=2m    0 0
tmpfs    /var/spool/mqueue    tmpfs    defaults,noatime,nosuid,mode=0700,gid=12,size=30m    0 0
```

儲存，重新開機。

跟住鍵入 df 查看成果：
```bash

# pi @ RPi4-ManjaroARM in ~ [3:59:22] 
$ df
Filesystem     1K-blocks    Used Available Use% Mounted on
dev               819172       0    819172   0% /dev
run               954916    9260    945656   1% /run
/dev/mmcblk0p2 122763428 5711732 111989984   5% /
tmpfs             954916       0    954916   0% /dev/shm
tmpfs               4096       0      4096   0% /sys/fs/cgroup
tmpfs             102400    8080     94320   8% /tmp
tmpfs             102400      80    102320   1% /var/log
tmpfs              30720       0     30720   0% /var/spool/mqueue
tmpfs              30720       0     30720   0% /var/tmp
/dev/mmcblk0p1    218512   46460    172052  22% /boot
tmpfs             190980      52    190928   1% /run/user/1000
```

Yeah，成功！
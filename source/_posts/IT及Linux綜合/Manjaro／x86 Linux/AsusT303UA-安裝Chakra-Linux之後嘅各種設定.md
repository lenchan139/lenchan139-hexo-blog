---
title: '[AsusT303UA]安裝Chakra Linux之後嘅各種設定'
tags:
  - ASUS T303UA
  - ASUS
  - Tablet
  - 平板
  - Chakra Linux
  - 安裝教學
  - IT
  - Linux
  - x86-64
categories:
  - IT及Linux綜合
  - Manjaro／x86 Linux
date: 2018-04-30 21:31:16
---

1.解像度過大，字太細

我選擇降維打擊，鍵入：


    sudo nano /etc/default/grub`

    修改成:

     `GRUB_GFXMODE=&#039;1400x960,1024x768,auto&#039;`

    跟住仲有個類似咁：

     `GRUB_CMDLINE_LINUX_DEFAULT=&#039;quiet slash&#039;`

    加入新嘅arg，類似於：

     `GRUB_CMDLINE_LINUX_DEFAULT=&#039;quiet slash video=1400x960@60&#039;`

    之後儲存即可。

    &nbsp;

    2.Micro-sd card reader自動掛載

    如題，開機唔識自動掛載，請首先鍵入:

    which partprobe

    結果類似咁：

     `/usr/sbin/partprobe`

    記住條path之後修改／新增：

     `sudo nano /etc/sudoers.d/10-partprobe`

    填入：

     `LOGIN_USERNAME ALL = (root) NOPASSWD: /usr/sbin/partprobe`

    之後係auto-start新增以下一行即可：

     `sudo partprobe`

    &nbsp;

    3.單邊聲卡聲音問題

    2個方法、

    3.1.mute其中一邊：

     `amixer -D pulse sset Master 0,100`

    修改pulse conf：

     `sudo nano /usr/share/pulseaudio/alsa-mixer/paths/analog-output.conf.common `

    呢段：

     `[Element PCM]
    switch = mute
    volume = metge
    override-map.1 = all
    override-map.2 = all-left,all-right`

    當中嘅：

     `volume = merge`

    變成：

     `volume= inore`
     `pcm.!default {
        type plug
        slave.pcm &quot;softvol&quot;
    }
    pcm.dmixer {
        type dmix
        ipc_key 1024
        slave {
            pcm &quot;hw:0&quot;
            period_size 4096
            buffer_size 131072
            rate 50000
        }
        bindings {
            0 0
            1 1
        }
    }
    pcm.dsnooper {
        type dsnoop
        ipc_key 1024
        slave {
            pcm &quot;hw:0&quot;
            channels 2
            period_size 4096
            buffer_size 131072
            rate 50000
        }
        bindings {
            0 0
            1 1
            }
    }
    pcm.softvol {
      type softvol
      slave { pcm &quot;dmixer&quot; }
      control {
        name &quot;Master&quot;
        card 0
      }
    }
    ctl.!default {
      type hw
      card 0
    }
    ctl.softvol {
      type hw
      card 0
    }
    ctl.dmixer {
      type hw
      card 0
    }`</pre> [asound.conf](https://gist.github.com/a778fe4f30fe3b177be76d3eb564513c "See asound.conf") [view raw](https://gist.githubusercontent.com/lenchan139/a778fe4f30fe3b177be76d3eb564513c/raw/0ac81c2bfabcff22868a302265e701e23c7951aa/asound.conf "Back to asound.conf")  

    3.2.降級落mono：

    鍵入：

     `sudo nano /etc/asound.conf`

    修改如下：

     `pcm.!default makemono

    pcm.makemono {
        type route
        slave.pcm &quot;hw:0&quot;
        ttable {
            0.0 1    # in-channel 0, out-channel 0, 100% volume
            1.0 1    # in-channel 1, out-channel 0, 100% volume
        }
    }


Ref:

[https://www.kernel.org/doc/Documentation/fb/modedb.txt](https://www.kernel.org/doc/Documentation/fb/modedb.txt "modedb default video mode support - kernel.org")

[https://askubuntu.com/questions/738640/run-script-as-root-immediately-after-login-to-gui](https://askubuntu.com/questions/738640/run-script-as-root-immediately-after-login-to-gui)

[https://blog.robotshell.org/2011/improve-pulseaudio-acoustic-quality/](https://blog.robotshell.org/2011/improve-pulseaudio-acoustic-quality/)

[https://www.linuxquestions.org/questions/linux-newbie-8/reroute-all-audio-to-right-speaker-4175502248/](https://www.linuxquestions.org/questions/linux-newbie-8/reroute-all-audio-to-right-speaker-4175502248/)

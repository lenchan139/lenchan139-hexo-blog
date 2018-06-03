---
title: >-
  [Asus T103H] 安裝Kubuntu 以後嘅各種羞恥（？）設定！ || Setting up touchscreen, audio card and
  microsd reader on Asus T103H with Kubuntu
tags:
  - ASUS
  - ASUS T103H
  - Kubuntu
  - 配置
  - 觸控失靈
  - Sound Card
  - touchscreen
  - microsd card reader
  - microsd 讀卡器
  - x86-64
  - 平板
  - tablet
categories:
  - IT及Linux綜合
  - Manjaro／x86 Linux
date: 2018-04-20 01:25:03
---

Short answer on English:

To solve touchscreen rotation: [https://github.com/lenchan139/ScriptOnLiunxForMe/blob/master/rotate_desktop.sh](https://github.com/lenchan139/ScriptOnLiunxForMe/blob/master/rotate_desktop.sh)

To install sound card driver: [https://github.com/heikomat/linux/tree/cx2072x/cx2072x_fixes_and_manual](https://github.com/heikomat/linux/tree/cx2072x/cx2072x_fixes_and_manual)

To setup internal microsd reader: [http://www.jfwhome.com/2014/03/07/perfect-ubuntu-or-other-linux-on-the-asus-transformer-book-t100/](http://www.jfwhome.com/2014/03/07/perfect-ubuntu-or-other-linux-on-the-asus-transformer-book-t100/) (go to sd card reader part)

1.

前言：

Tablet與Laptop，兩者雖然係極其接近嘅一對，不過因爲家境（？）嘅不同，兩者被迫分開成ARM同X86/AMD64陣營，有着截然不同嘅持久力（？）同形態（？）。然而隨住時日過去，可惡嘅x86陣營受到ARM感化，終於開始誕生出爲Tablet而生嘅愛的結晶……究竟呢場感人肺腑，扣人心弦嘅悲天憫人現代版羅密歐與朱麗葉又會（—被Rider Kick——）

![](https://tto.moe/blog/wp-content/uploads/2018/04/photo_2018-04-20_00-45-24-1024x575.jpg)

（人權圖）

正文：

1.

係，多麼，Vir……sor，首先就咁裝好之後發覺第一個嘅問題係！screen rotation打直咗，要打返橫啦，之後，發覺touch input無跟住打橫。

咁爲咗解決呢個問題寫咗個scripts，首先係 [https://github.com/lenchan139/ScriptOnLiunxForMe/blob/master/rotate_desktop.sh](https://github.com/lenchan139/ScriptOnLiunxForMe/blob/master/rotate_desktop.sh) Down 落來。

鍵入:

    `xinput`

    `len@KDE-Tablet:~$ xinput
    ⎡ Virtual core pointer                          id=2    [master pointer  (3)]
    ⎜   ↳ Virtual core XTEST pointer                id=4    [slave  pointer  (2)]
    ⎜   ↳ ELAN2562:00 04F3:2562                     id=13   [slave  pointer  (2)]
    ⎜   ↳ G603                                      id=20   [slave  pointer  (2)]
    ⎜   ↳ ELAN2562:00 04F3:2562 Pen Pen (0)         id=21   [slave  pointer  (2)]
    ⎜   ↳ ASUS HID Device ASUS HID Device Consumer Control  id=10   [slave  pointer  (2)]
    ⎜   ↳ ASUS HID Device ASUS HID Device Touchpad  id=19   [slave  pointer  (2)]
    ⎣ Virtual core keyboard                         id=3    [master keyboard (2)]
        ↳ Virtual core XTEST keyboard               id=5    [slave  keyboard (3)]
        ↳ Power Button                              id=6    [slave  keyboard (3)]
        ↳ Video Bus                                 id=7    [slave  keyboard (3)]
        ↳ Power Button                              id=8    [slave  keyboard (3)]
        ↳ Sleep Button                              id=9    [slave  keyboard (3)]
        ↳ ELAN2562:00 04F3:2562 Pen                 id=14   [slave  keyboard (3)]
        ↳ Intel HID events                          id=15   [slave  keyboard (3)]
        ↳ Asus WMI hotkeys                          id=16   [slave  keyboard (3)]
        ↳ gpio-keys                                 id=17   [slave  keyboard (3)]
        ↳ gpio-keys                                 id=18   [slave  keyboard (3)]
        ↳ ASUS HID Device ASUS HID Device Consumer Control  id=11   [slave  keyboard (3)]
        ↳ ASUS HID Device ASUS HID Device           id=12   [slave  keyboard (3)]`

之後打開個script，修改開頭嘅const：
    `# Configure these to match your hardware (names taken from xinput output).
    TOUCHPAD=&#039;ASUS HID Device ASUS HID Device Touchpad&#039;
    TOUCHSCREEN=&#039;ELAN2562:00 04F3:2562&#039;
    TOUCHPEN=&#039;ELAN2562:00 04F3:2562 Pen Pen (0)&#039;`

之後就可以咁執行：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`./rotate_desktop.sh right`</pre> <div class="code-embed-infos"> </div> </div>

2.裝支援 cx2072x sound card 嘅 linux kernel

首先係下載兩個嘅deb檔案：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`wget https://github.com/heikomat/linux/releases/download/v4.17-rc1_cx2072x/linux-headers-4.17.0-rc1.Custom_amd64.deb
    wget https://github.com/heikomat/linux/releases/download/v4.17-rc1_cx2072x/linux-image-4.17.0-rc1.Custom_amd64.deb`</pre> <div class="code-embed-infos"> </div> </div>

之後安裝：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`sudo dpkg --install LINUX_IMAGE_DEB_PACKAGE.deb
    sudo dpkg --install LINUX_HEADERS_DEB_PACKAGE.deb`</pre> <div class="code-embed-infos"> </div> </div>

確保pulse 同 linux-firmware裝咗：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`sudo apt install pulseaudio

    sudo apt install linux-firmware`</pre> <div class="code-embed-infos"> </div> </div>

複製ucm文件：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`sudo mkdir --parents /usr/share/alsa/ucm/chtcx2072x
    cd /usr/share/alsa/ucm/chtcx2072x
    sudo wget &quot;https://raw.githubusercontent.com/heikomat/linux/cx2072x/cx2072x_fixes_and_manual/chtcx2072x/HiFi.conf&quot;
    sudo wget &quot;https://raw.githubusercontent.com/heikomat/linux/cx2072x/cx2072x_fixes_and_manual/chtcx2072x/chtcx2072x.conf&quot;`</pre> <div class="code-embed-infos"> </div> </div>

    &nbsp;

設定/etc/pulse/daemon.conf當中嘅realtime-scheduling 爲 no（記得移除開頭嘅分號）：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`sudo sed --in-place --regexp-extended --expression=&#039;s/;?\s*realtime-scheduling\s*=\s*(yes|no)/realtime-scheduling = no/g&#039; /etc/pulse/daemon.conf`</pre> <div class="code-embed-infos"> </div> </div>

    &nbsp;

3.啓動microsd reader

鍵入：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`sudo nano /etc/modprobe.d/sdhci.conf`</pre> <div class="code-embed-infos"> </div> </div>

填入以下內容並儲存：

    <div class="code-embed-wrapper"> <pre class="language-markdown code-embed-pre"  data-start="1" data-line-offset="0">`options sdhci debug_quirks=0x8000`</pre> <div class="code-embed-infos"> </div> </div>

更新返個kernel：
  `update-initramfs -u -k all`

4.Console轉向：

鍵入：

`sudo nano /etc/default/grub`

修改：

GRUB_CMDLINE_LINUX=&#8221;fbcon=rotate:1&#8243;

5.重啓。

就……reboot收工咯。

Ref：

Make audio work on cx2072x devices like the Asus E200HA : [https://github.com/heikomat/linux/tree/cx2072x/cx2072x_fixes_and_manual](https://github.com/heikomat/linux/tree/cx2072x/cx2072x_fixes_and_manual)

UBUNTU (OR OTHER LINUX) ON THE ASUS TRANSFORMER BOOK T100 : [http://www.jfwhome.com/2014/03/07/perfect-ubuntu-or-other-linux-on-the-asus-transformer-book-t100/](http://www.jfwhome.com/2014/03/07/perfect-ubuntu-or-other-linux-on-the-asus-transformer-book-t100/)

Asus E200HA and X206HA Linux Post Install Script : [https://github.com/Grippentech/Asus-E200HA-Linux-Post-Install-Script](https://github.com/Grippentech/Asus-E200HA-Linux-Post-Install-Script)

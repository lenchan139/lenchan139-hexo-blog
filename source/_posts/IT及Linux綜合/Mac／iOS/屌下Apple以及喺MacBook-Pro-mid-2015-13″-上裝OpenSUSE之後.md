---
title: 屌下Apple以及喺MacBook Pro mid-2015 13″ 上裝OpenSUSE之後
tags:
  - Chakra Linux
  - Mac
  - Apple
  - MacBook
  - OpenSUSE
  - Finder
  - 難用
  - 極致
  - New File
  - cmd
  - config
  - icon
categories:
  - IT及Linux綜合
  - Mac／iOS
date: 2018-03-07 13:41:48
---

### 屌下Apple……

*   垃圾Finder，難用嘅極致。New File呢？New File呢？New File呢！
*   極其古怪嘅shortcut：enter個file係改名，cmd+o先係開啓。
*   .DS_Store problem，蘋果你今日食咗藥未？
*   cmd+w熄分頁，cmd+swift+w熄所有分頁，但係唔係所有app支援後者。
*   長期佔用Docker位置嘅Finder……屌你啦。
*   tray同menu bar合體，搞到有時候啲menu長嘅某啲tray icon會消失……比個scrolling啦好嗎？
*   Paste Folder default option係replace——即係folder嘅舊files會消失嗮。
*   Paste Folder 時候一時有，一時無d<span class="RichText CopyrightRichText-richText">uplicate </span>嘅option……fuck
*   finder 嘅搜索default唔係搜尋當前folder，而係全局搜尋……WTF？
*   MTP……MTP……MTP！
*   古怪嘅判定：disable touchpad when mouse plugged in &lt;&lt; 唔少藍牙mouse係唔會work嘅
*   無視窗最大化：一係自己resize，一係真.fullscreen，無中間路線。
*   出新版時從不考慮軟件兼容性
*   越升級越慢

裝好Opensue之後會有兩個方法處理嘅其實。

### **方法一：登登登——放大燈。**

發現個熒幕太大嘅關係啲字好細，所以要做一堆config啦要……

&nbsp;

去Configure Desktop → Display and Monitor → Display Configuration → Scale Display較大佢啲element

去 Configure Desktop → Fonts 較大字型（建議14以上）以及較大DPI（建議128左右）

去 Configure Desktop → Icons → Advanced 較大icon大小（建議128）

之後較大Tray Icons，鍵入：

<div class="code-embed-wrapper">

    sudo nano /usr/share/plasma/plasmoids/org.kde.plasma.private.systemtray/contents/config/main.xml`</pre> <div class="code-embed-infos"> </div> </div>

    搜尋：

    <div class="code-embed-wrapper"> <pre class="language-markup code-embed-pre"  data-start="1" data-line-offset="0">`&lt;entry name=&quot;iconSize&quot; type=&quot;Int&quot;&gt;
    &lt;label&gt;Default icon size for the systray icons, it&#039;s an enum which values mean,
    Small, SmallMedium, Medium, Large, Huge, Enormous respectively. On low
    DPI systems they correspond to 16, 22, 32, 48, 64, 128 pixels. On high
    DPI systems those values would be scaled up, depending on the DPI.&lt;/label&gt;
    &lt;default&gt;1&lt;/default&gt;
    &lt;/entry&gt;`</pre> <div class="code-embed-infos"> </div> </div>

    將

    <div class="code-embed-wrapper"> <pre class="language-markup code-embed-pre"  data-start="1" data-line-offset="0">`&lt;default&gt;1&lt;/default&gt;`</pre> <div class="code-embed-infos"> </div> </div>

    改成

    <div class="code-embed-wrapper"> <pre class="language-markup code-embed-pre"  data-start="1" data-line-offset="0">`&lt;default&gt;2&lt;/default&gt;`</pre> <div class="code-embed-infos"> </div> </div>

    鍵入：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`sudo nano ~/.config/plasma-org.kde.plasma.desktop-appletsrc`</pre> <div class="code-embed-infos"> </div> </div>

    修改iconSize：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`[Containments][47][General]
    extraItems=org.kde.plasma.mediacontroller,org.kde.plasma.battery,org.kde.plasma.printmanager,org.kde.plasma.bluetooth,org.kde.plasma.clipboard,org.kde.plasma.notifications,org.kde.plasma.networkmanagement,org.kde.plasma.devicenotifier
    hiddenItems=org.kde.ktp-contactlist,org.kde.plasma.battery
    knownItems=org.kde.plasma.mediacontroller,org.kde.plasma.battery,org.kde.plasma.printmanager,org.kde.plasma.bluetooth,org.kde.plasma.clipboard,org.kde.plasma.notifications,org.kde.plasma.networkmanagement,org.kde.plasma.devicenotifier
    shownItems=org.kde.plasma.notifications,org.kde.plasma.clipboard
    iconSize=1`</pre> <div class="code-embed-infos"> </div> </div>

    變成：

    <div class="code-embed-wrapper"> <pre class="language-markup code-embed-pre"  data-start="1" data-line-offset="0">`[Containments][47][General]
    extraItems=org.kde.plasma.mediacontroller,org.kde.plasma.battery,org.kde.plasma.printmanager,org.kde.plasma.bluetooth,org.kde.plasma.clipboard,org.kde.plasma.notifications,org.kde.plasma.networkmanagement,org.kde.plasma.devicenotifier
    hiddenItems=org.kde.ktp-contactlist,org.kde.plasma.battery
    knownItems=org.kde.plasma.mediacontroller,org.kde.plasma.battery,org.kde.plasma.printmanager,org.kde.plasma.bluetooth,org.kde.plasma.clipboard,org.kde.plasma.notifications,org.kde.plasma.networkmanagement,org.kde.plasma.devicenotifier
    shownItems=org.kde.plasma.notifications,org.kde.plasma.clipboard
    iconSize=2`</pre> <div class="code-embed-infos"> </div> </div>

    之後設定全局嘅，鍵入：

    <div class="code-embed-wrapper"> <pre class="language-markup code-embed-pre"  data-start="1" data-line-offset="0">`sudo nano ~/.xprofile`</pre> <div class="code-embed-infos"> </div> </div>

    填入：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`export QT_AUTO_SCREEN_SCALE_FACTOR=1
    export GDK_SCALE=2
    export GDK_DPI_SCALE=0.5
     export ELM_SCALE=1.5`</pre> <div class="code-embed-infos"> </div> </div>

    修改SDDM 嘅 DPI，鍵入：

    <div class="code-embed-wrapper"> <pre class="language-markup code-embed-pre"  data-start="1" data-line-offset="0">`sudo nano /etc/sddm.conf`</pre> <div class="code-embed-infos"> </div> </div>

    加入：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`
    ServerArguments=-dpi 166`</pre> <div class="code-embed-infos"> </div> </div>

    ### 方法二：降維打擊

    方法二就係較低解像度，雖然會浪費咗retina mon，但係簡單直接粗暴，適合懶人（如雪娘）。

    首先搵可能嘅resolution，推薦2240*1400呢個：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`cvt 1728 1080`</pre> <div class="code-embed-infos"> </div> </div>

    之後會出現嘅如下劇情：

    <div class="code-embed-wrapper"> <pre class="language-markup code-embed-pre"  data-start="1" data-line-offset="0">`len@linux-1apr:/opt/vivaldi/resources/vivaldi/style&gt; cvt 1728 1080# 1728x1080 59.94 Hz (CVT 1.87MA) hsync: 67.13 kHz; pclk: 155.75 MHz
    Modeline &quot;1728x1080_60.00&quot;  155.75  1728 1840 2024 2320  1080 1083 1089 1120 -hsync +vsync`</pre> <div class="code-embed-infos"> </div> </div>

    copy &#8220;1728x1080_60.00&#8221; 之後嘅，鍵入：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`xrandr --newmode &quot;1728x1080_60.00&quot;  155.75  1728 1840 2024 2320  1080 1083 1089 1120 -hsync +vsync`</pre> <div class="code-embed-infos"> </div> </div>

    list搵返個mon嘅名：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`xrandr --listmonitors`</pre> <div class="code-embed-infos"> </div> </div>

    結果：

    <div class="code-embed-wrapper"> <pre class="language-markup code-embed-pre"  data-start="1" data-line-offset="0">`Monitors: 1
    0: +*eDP-1 1728/286x1080/179+0+0  eDP-1`</pre> <div class="code-embed-infos"> </div> </div>

    之後add返落來：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`xrandr --addmode eDP-1 &quot;1728x1080_60.00&quot;`</pre> <div class="code-embed-infos"> </div> </div>

    之後去configure desktop較返就得啦。

    <div class="code-embed-wrapper"> <pre class="language-markup code-embed-pre"  data-start="1" data-line-offset="0">`xrandr --output eDP-1 --mode “1728x1080_60.00”`</pre> <div class="code-embed-infos"> </div> </div>

    ### Grave 掣調整

    之後下個問題係grave（即係 ´´´´同~~個個掣啊）唔啱，使用xmodmap強行修改，鍵入：

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`nano ~/.xmodmap`</pre> <div class="code-embed-infos"> </div> </div>

    使用 xev 搵到keycode（我係94），之後輸入：

    <div class="code-embed-wrapper"> <pre class="language-markup code-embed-pre"  data-start="1" data-line-offset="0">`keycode 94 = grave asciitilde`</pre> <div class="code-embed-infos"> </div> </div>

    之後載入返設定

    <div class="code-embed-wrapper"> <pre class="language-bash code-embed-pre"  data-start="1" data-line-offset="0">`xmodmap ~/.xmodmap
 <div class="code-embed-infos"> </div> </div>

就解決啦。

&nbsp;

Ref:

HiDPI &#8211; Arch Wiki: [ https://wiki.archlinux.org/index.php/HiDPI#Tray_icons_with_fixed_size](https://wiki.archlinux.org/index.php/HiDPI#Tray_icons_with_fixed_size)

Custom resolution in monitor configuration • KDE Community Forums： [https://forum.kde.org/viewtopic.php?f=83&amp;t=94892](https://forum.kde.org/viewtopic.php?f=83&amp;t=94892)

AppleKeyboard &#8211; Community Help Wiki： [https://help.ubuntu.com/community/AppleKeyboard](https://help.ubuntu.com/community/AppleKeyboard)

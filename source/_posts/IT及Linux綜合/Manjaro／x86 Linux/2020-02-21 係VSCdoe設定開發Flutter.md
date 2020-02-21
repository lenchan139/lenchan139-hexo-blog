---
uuid: vscode-with-flutter-manjaro-basic-config-20200222
title: >-
  係VScode設定以作開發Flutter App
tags:
  - Flutter
  - VSCode 
  - 開發
categories:
  - IT及Linux綜合
  - Manjaro／x86 Linux
date: 2020-02-21 21:58:33
---
大家好，個Blog好似好耐無更新，不過[相簿(photo.tto.moe)](https://photo.tto.moe)嗰邊更新得比較密，可以睇下相治癒一下。

話說最近又有用Flutter寫嘅Project，主要係人手比較少，想減少maintain嘅Code，加上我嘅個人偏愛，所以嘗試下用Flutter寫。

好多人講到呢啲跨平臺嘅Framework有個好神奇嘅myth，仲係認爲呢啲framework極差，或者開個issues list跟住鬧勁多Bugs。可能我開發嘅係個Backend行Firebase嘅Instant Messaging App啦，其實無點試到有咩Bug令到個App寫唔落去——可能之後會有啦，唔知啦。但目前爲止寫落感覺都唔錯，效能數字上係比較慢，不過其實真裝上真機之後其實唔係好能靠效能分得出係Flutter定係Native App。

！[The Engine architecture of Flutter](https://raw.githubusercontent.com/flutter/engine/master/docs/flutter_overview.svg?sanitize=true)
Source: [https://github.com/flutter/flutter/wiki/The-Engine-architecture](https://github.com/flutter/flutter/wiki/The-Engine-architecture)

參考上圖，Flutter其實有自己一套Engine以C/C++開發，之後Provides一整套Widgets以Dart編寫。由於佢本身並非用Native而自行一套嘅Engine，並使用 支援AoT（預先編譯）Dart VM，係Release build嘅Compile階段已經pre-compile好，所以係Production版本嘅Flutter App效能並唔差。

呢個玩法其實同好多遊戲好相似，唔使用Native嘅Canvas，而係自行直接用自己Engine去Rander UI，加上AoT去提高效能。

有人寫咗篇效能對比，可以有啲數字睇下：[Flutter和原生应用性能对比
 - 掘金](https://juejin.im/post/5b85e9f86fb9a01a175dc986)

以及呢個：[Flutter 高性能原理浅析 - 掘金](https://juejin.im/post/5d3be5fd6fb9a07ead5a4243)

# 安裝SDK
首先我哋要先安裝Flutter嘅SDK，你可以用[yay](https://github.com/Jguer/yay)之類嘅程式經由AUR安裝flutter和dart：
```bash
yay -S flutter dart
```
安裝成功後，Flutter會安裝到 /opt/flutter，請更改權限：
```bash
sudo chmod -R 755 /opt/flutter
```
如果你電腦只有一個user，可以把該directory 派俾這唯一User避免更多嘅潛在問題：
```bash
sudo chown -R user:userGroup /opt/flutter
```

如果你不想經由yay而想自行從官網下載安裝，請參閱[官方安裝教學](https://flutter.dev/docs/get-started/install/linux)。

安裝成功之後，請把flutter/bin加入 PATH，打開 ~/.bashrc並新增一行：
```bash
export PATH="$PATH:/opt/flutter/bin"
```

# 安裝Android SDK
之後可以安裝Android SDK，使用[yay](https://github.com/Jguer/yay)安裝：
```bash
yay -S android-sdk
```
跟住會安裝咗係/opt/android-sdk，同樣玩法修改權限：
```bash
sudo chmod -R 755 /opt/android-sdk
```
以及可以直接改owner：
```bash
sudo chown -R user:userGroup /opt/android-sdk
```
跟住編輯~/.bashrc將以下嘅ANDROID_SDK設定加入PATH：
```bash
export ANDROID_HOME="/opt/android-sdk"
export ANDROID_SDK_ROOT=="/opt/android-sdk"
```
儲存，重新開機。

如果你覺得咁好麻煩而且想要其他版本，請善用[Android Studio](https://developer.android.com/studio/)。

# 安裝VSCode
可以透過pacman安裝：
```bash
sudo pacman -S code
```

打開vscode，搜尋flutter 同 dart plugin並安裝。
![](https://photos.smugmug.com/photos/i-95gGCMv/0/4e0f1bf3/M/i-95gGCMv-M.png)
![](https://photos.smugmug.com/photos/i-jkBhHbF/0/f4bb814d/M/i-jkBhHbF-M.png)

之後可以透過flutter command 查看各種安裝情況：
```bash
flutter doctor
```
首先第一個可能係未acceptandroid licenses，可以透過此command accept：
```bash
flutter doctor --android-licenses
```

# 安裝Android Emulator
跟住可以安裝Android Emulator嘅Image同Tools先啦。
首先透過command查看可用嘅package列表：
```bash 
 /opt/android-sdk/tools/bin/sdkmanager --list
```
跟住首先安裝system image：
```bash
/opt/android-sdk/tools/bin/sdkmanager "system-images;android-29;google_apis_playstore;x86_64" 
```
安裝emulator：
```bash
/opt/android-sdk/tools/bin/sdkmanager "emulator" 
```

接受所有Licenses：
```bash
/opt/android/tools/bin/sdkmanager --licenses
```

跟住可以創建emulator，查看可用device：
```bash
/opt/android/tools/bin/avdmanager list device
```

創建（-n 後面係emulator名稱；-k係之前嘅image名稱）：
```bash
/opt/android/tools/bin/avdmanager create avd -n newEmulator -k "system-images;android-29;google_apis_playstore;x86_64"
```


# 設定Flutter Project：
之後創建或打開已有嘅Flutter Project：
```bash
flutter create newProject
```
之後可以更新/下載所有packages：
```bash
flutter pub get
```
之後可以查看已有嘅emulator：
```bash
flutter emulator
```
結果：
```bash
localhost$ flutter emulator
2 available emulators:
newEmulator  • newEmulator  • Google • android
```

用flutter啓動emulator：
```bash
flutter emulator --launch newEmulator
```
係打開咗flutter project 嘅vscode window撳F5，選擇Dart/Flutter：
![](https://photos.smugmug.com/photos/i-pLXvK4D/0/0a18be96/M/i-pLXvK4D-M.png)

之後就會自動執行到emulator。
如果有多個android devices/emulators而唔成功，可以透過右下角嘅切換你：
![](https://photos.smugmug.com/photos/i-TVddMnh/0/c7ef0797/S/i-TVddMnh-S.png)

Enjoy~~~

# 常見問題
Q.行緊Flutter App嘅時候一直顯示"syncing files to device Android SDK"
A.linux kernel 5.5嘅問題，請嘗試降級。
參考：[How to downgrade the kernel?](https://forum.manjaro.org/t/how-to-downgrade-the-kernel/27930)

Q.flutter doctor顯示無Android Device連接即是真係有Device。
A.請Accept所有Android license：
```bash
flutter doctor --android-licenses
```
並新增android-sdk嘅path落flutter：
```bash
flutter config --android-sdk /opt/android-sdk
```
參考：[Unable to locate a development device; please run 'flutter doctor' for information about installing additional components.](https://github.com/flutter/flutter/issues/22649)

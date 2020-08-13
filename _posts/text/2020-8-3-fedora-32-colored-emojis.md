---
title: Colored emojis on Fedora 32 🎉
date: 2020-08-03
---

If you have used Google Chrome, VSCode, Discord, or any other chromium based programs on Fedora 32 you will have noticed that all of the emojis are black and white.

Below I have the instructions to setup colored emojis by hand. If you wish to automate the process just run `curl -fsSL https://hamptonmoore.com/tools/fedora32InstallColoredEmojis.sh | sh`.

If you wish to do it yourself the commands and explainations are below.
To get it work we are going to install the Google Noto Color Emoji font through the following command
`sudo dnf install google-noto-emoji-color-fonts`.

Next make the directory `~/.config/fontconfig/` if it does not already exist. This can be done with the command `mkdir ~/.config/fontconfig/`. After that set the contents of the file `~/.config/fontconfig/fonts.conf` to the following. If the file already has contents just append it to the bottom

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <alias>
    <family>serif</family>
    <prefer>
      <family>Noto Color Emoji</family>
    </prefer>
  </alias>
  <alias>
    <family>sans-serif</family>
    <prefer>
      <family>Noto Color Emoji</family>
    </prefer>
  </alias>
  <alias>
    <family>monospace</family>
    <prefer>
      <family>Noto Color Emoji</family>
    </prefer>
  </alias>
</fontconfig>
```

After the config file is made and set all you need to do is reload the font cache. This is done with `fc-cache -f`. After this just restart all applications that you want colored emojis in.

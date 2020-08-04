echo "Setting up colored emojis"
sudo dnf install google-noto-emoji-color-fonts
echo "Making fontconfig folder"
mkdir ~/.config/fontconfig/
echo "Appending to font config"
echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?> 
<!DOCTYPE fontconfig SYSTEM \"fonts.dtd\"> 
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
</fontconfig>" >> ~/.config/fontconfig/fonts.conf
echo "Reloading font config"
fc-cache -f
echo "Finished! Just restart any applications to get coloured emojis"
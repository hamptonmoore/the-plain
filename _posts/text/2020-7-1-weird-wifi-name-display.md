---
title: Comparing how different devices display the SSID "á̶̛̛̓̿̈͐͆̐̇̒̑̈́͘͝aaa"
date: 2020-07-01
---

After my recent post [Setting the SSID of a Fios Home Router to an emoji](https://hamptonmoore.com/posts/fios-home-router-emoji/) I decided to set my WiFis SSID to "á̶̛̛̓̿̈͐͆̐̇̒̑̈́͘͝aaa".
That name is [36 octets](https://mothereff.in/byte-counter#a%CC%B6%CC%81%CC%93%CC%BF%CC%88%CC%9B%CC%9B%CD%90%CD%98%CD%86%CC%90%CD%9D%CC%87%CC%92%CC%91%CD%84aaa) making it over the 32 octets maxium specified in the 2012 standard of 802.11 Section 6.3.11.2.2. 
My router just cut the name down to 32 octets though to stay complient. 
This was what was being sent according to `iw` `a\xcc\xb6\xcc\x81\xcc\x93\xcc\xbf\xcc\x88\xcc\x9b\xcc\x9b\xcd\x90\xcd\x98\xcd\x86\xcc\x90\xcd\x9d\xcc\x87\xcc\x92\xcc\x91\xcd` with the raw hex being `61ccb6cc81cc93ccbfcc88cc9bcc9bcd90cd98cd86cc90cd9dcc87cc92cc91cd`.

I decided to see how this showed up on different devices and got some pretty strange results. Below are the devices tested sorted rougly to how they acted.

Galaxy S8 running Android 9 with Kernel 4.4.153
![](https://cdn.hampton.pw/hampton.pw/resources/iosWifiBug/android.jpg)

Amazon Firestick
![](https://cdn.hampton.pw/hampton.pw/resources/iosWifiBug/firestick.jpg)

Both the s8 and the Firestick are rendering the result in what I deem as the correct way with it showing the name just with some of the vertical characters cutoff.

iPhone running iOS 13.5.1
![](https://cdn.hampton.pw/hampton.pw/resources/iosWifiBug/iphone-ios1351.jpg)

Apple TV Second Generation
![](https://cdn.hampton.pw/hampton.pw/resources/iosWifiBug/appletvgen2.jpg)

Next comes the iPhone and Apple TV. At first I had no idea what they were rending these characters as. At first I thought it was just extended ascii but that third character, ∂, was not in extended ASCII. After asking around on the Apple discord server someone said it might be using the [Mac OS Roman](https://en.wikipedia.org/wiki/Mac_OS_Roman) character set. It turns out it which is strange because iOS used UTF-8 internally and not Mac OS Roman as that was phased out with the release of Mac OS X.

Speaking of Apple devices, there will not be any photos of MacOS though not from a lack of trying. 
I could not get either of my Macbook to acknowledge that this WiFi network existed.
Neither the Wifi dropdown nor the airport commandline utility would show it.

Windows 10 Pro 10.0.19041
![](https://cdn.hampton.pw/hampton.pw/resources/iosWifiBug/windows10.png)

~~Windows 10 is rendering it using what I believe to be the UTF-8 characters of each octet. This matches what the raw hex of the wifi name would become if you split it up into 8bit bytes and used that as UTF-8 chars.~~
It was pointed out by [@theFerdi265](https://twitter.com/theFerdi265) that this is not the first set of UTF-8 chars like I thought. Instead it is [Windows-1252](https://en.wikipedia.org/wiki/Windows-1252), a single-byte character encoding of the Latin alphabet, used by default in the legacy components of Microsoft Windows for English and some other European languages.

Chromebook running ChromeOS 83.0.4103.97
![](https://cdn.hampton.pw/hampton.pw/resources/iosWifiBug/chromeos.jpg)

ChromeOS is just freaking out not knowing how to render any of the charaters besides the singular a.

Kindle Paperwhite running Firmware 5.10.2
![](https://cdn.hampton.pw/hampton.pw/resources/iosWifiBug/kindlepaperwhite.jpg)

Vizio M55-C2 TV
![](https://cdn.hampton.pw/hampton.pw/resources/iosWifiBug/viziom55-c2.jpg)

Both the Kindle and Vizio TV are showing what `iw` returned with the a and then escaped hexademical characters.

I have no published a follow up to this post, [here](https://hamptonmoore.com/posts/weird-wifi-names-cont/).

Discuss this post on Hacker News [here](https://news.ycombinator.com/item?id=23708056)
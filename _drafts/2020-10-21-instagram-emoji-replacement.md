Recently Instagram added the feature to react to messages with emojis. 
This prompted the question of what counts as an emoji? 
Well on the desktop client there are 1380 different emojis to choose from, with the mobile clients have more but no easy way to count them. 
This inconsistency brought up the question, what counts as an emoji to instagram?

To try to figure this out I wrote a userscript which hijacks the websocket that Instagram and lets you replace emoji reactions with your own emojis, or even any string. 
After some testing it was found that the "surrogate" emoji must have the same number of bytes as the new string that you wish to include. 
Below is a list of some surrogate emojis found on the desktop and what their byte size is.

```
2 - ©   ®

3 - ☺   ☹   ☠   ✋   ✌   ☝   ✊   ✍ 

4 - 😂   😮   😍   😢   👏   🔥   🎉   💯   🤣   🥰   😘   😭   😊   😀   😃   😄   😁   😆   😅   🤣   😂   🙂   🙃   😉   😊   😇   🥰   😍   🤩   😘   😗   😚   😙   😋   😛   😜   
6 - ❤️

7 - #️⃣   0️⃣   1️⃣   2️⃣   3️⃣   4️⃣   5️⃣   6️⃣   7️⃣   8️⃣   9️⃣

11 - 👨‍🦰   👨‍🦱   👨‍🦳   👨‍🦲   👩‍🦰   👩‍🦱   👩‍🦳   👩‍🦲   👨‍🎓   👩‍🎓   👨‍🏫   👩‍🏫   👨‍🌾   👩‍🌾   👨‍🍳   👩‍🍳   👨‍🔧   👩‍🔧   👨‍🏭   👩‍🏭  

13 - 👱‍♀️   👱‍♂️   🙍‍♂️   🙍‍♀️   🙎‍♂️   🙎‍♀️   🙅‍♂️   🙅‍♀️   🙆‍♂️   🙆‍♀️   💁‍♂️   💁‍♀️   🙋‍♂️   🙋‍♀️   🙇‍♂️   🙇‍♀️   🤦‍♂️   🤦‍♀️   🤷‍♂️   🤷‍♀️   👨‍⚕️   👩‍⚕️   👨‍⚖️   👩‍⚖️   👨‍✈️   👩‍✈️   👮‍♂️   👮‍♀️   💂‍♂️   💂‍♀️   👷‍♂️   👷‍♀️   

15 - ⛹️‍♂️   ⛹️‍♀️

16 - 🕵️‍♂️   🕵️‍♀️   🏌️‍♂️   🏌️‍♀️   🏋️‍♂️   🏋️‍♀️

17 - 👁️‍🗨️

18 - 👨‍👩‍👦   👨‍👩‍👧   👨‍👨‍👦   👨‍👨‍👧   👩‍👩‍👦   👩‍👩‍👧   👨‍👦‍👦   👨‍👧‍👦   👨‍👧‍👧   👩‍👦‍👦   👩‍👧‍👦   👩‍👧‍👧

20 - 👨‍❤️‍👨   👩‍❤️‍👩

25 - 👨‍👩‍👧‍👦   👨‍👩‍👦‍👦   👨‍👩‍👧‍👧   👨‍👨‍👧‍👦   👨‍👨‍👦‍👦   👨‍👨‍👧‍👧   👩‍👩‍👧‍👦   👩‍👩‍👦‍👦   👩‍👩‍👧‍👧

27 - 👨‍❤️‍💋‍👨   👩‍❤️‍💋‍👩
```

The following userscript https://gist.github.com/hamptonmoore/5285446c498ab02d4ee5bad6e2aa72ea/raw/392e58ee62a4efc2590796d1f5c365588e750e8d/Instagram-WebbyTrap.user.js, allows for one to replace any emoji with an arbitrary string of the same size. 
This testing led to some pretty usual results including a bug that could crash any Android user.
For example the emoji "⛹️‍♂️" is 15 bytes long, this meant I was able to replace it with the text "thehamptonmoore", which looked like ![](https://scontent-bos3-1.cdninstagram.com/v/t51.2885-15/e35/122011992_847398296004349_7717511482999174910_n.jpg?_nc_ht=scontent-bos3-1.cdninstagram.com&_nc_cat=101&_nc_ohc=-fKHMAV8QVoAX-wndNW&_nc_tp=18&oh=73fd5746afaa9d425208a925c08a399d&oe=5FBBA1A1&ig_cache_key=MjQyNDgzNTAxMTY4NjYzOTc0NQ%3D%3D.2)
Well it looked like that on iOS, on Android it just completely crashed the client refusing to show the message stream until the reaction was changed.
Below are some other examples.

![](https://scontent.cdninstagram.com/v/t51.2885-15/e15/s480x480/122042665_1499113140284551_5099804139186361340_n.jpg?_nc_ht=scontent.cdninstagram.com&_nc_cat=107&_nc_ohc=UNMgx4-xOFoAX-R9x6j&_nc_tp=15&oh=a92430009740f5bad70a0085bb5856e6&oe=5FBA5F0C&ig_cache_key=MjQyNDg2MDg0MDAyNzMwNTcxMw%3D%3D.2)

![](https://scontent.cdninstagram.com/v/t51.2885-15/e35/122267191_1037142930057737_5403002885779376220_n.jpg?_nc_ht=scontent.cdninstagram.com&_nc_cat=105&_nc_ohc=7h-2hRhU3TEAX-mOA6c&_nc_tp=18&oh=13669294a9a1d8ac5a1585a2352a38fa&oe=5FB86B96&ig_cache_key=MjQyNDg2MDg3MTI5OTk3MzY1Mg%3D%3D.2)

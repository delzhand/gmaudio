# Soundcontrol Javascript Webplayer
This webplayer is custom made to control background audio during my D&D games. The usage of this audio player is very simple and described below. Most modern browsers should work, but I explicitly tested Chrome and can confirm it fully works as it's supposed to. 

## Table of Contents
1. Simple Usage Instructions
2. Adding Your Own Tracks
3. Customizing

## 1.Simple Usage Instructions
The use of this little tool is, or at least should be, fairly straightforward. You download this repository, open the `index.html` file in any modern browser. At first the soundcontrol application will not work because it can't find the music files, since these are not included in the repository due to copyright. To make this application work as intended, simply download some audio files you want to use and add a track as described in the section below.

## 2. Adding Your Own Tracks
Adding your own tracks consists of the following steps:
1. Open the `index.html` file in any plaintext-editor, such as Notepad, Notepad++ or any code editor.
2. Scroll untill you see a line that says `<pre id="tracks">`. All the tracks below that, untill the line `</pre>` are what contains the track information for the application. This information is also summarized in the file itself.
3. Every line is a new track, so to add a new track, simple add a new line between the two previously described tags.
4. The line contains 4 pieces of information, separated by a `,`, a comma. This information is (in order):
 1. The background color of the button as a CSS 16-bit HEX color code, used in any HTML or CSS files.
 
  _Tip: If you google your colorname and 'to hex' google can convert your color to a hex code. Alternatively you can Google 'colorpicker' which will give you a full range color picker with hex-support._
 2. The title of the button. This can contain any characters except for a `,` a comma.
 3. The filename of the music file you want to play. This is assumed to be in the `data` folder.
 4. The startposition of the music file. How many seconds from the start it should start playing when you click this button. If set to -1 it means it will just continue playing where it left of. This prevents you from constantly playing the same starting minutes of a track. However for some tracks, such as boss battle tracks, you may want to have the epic intro of the track every time.

 So, let's say you want to add a red button, that plays combat.mp3. You've already put this file in the `data` folder. The title on this button will be 'Combat'. You don't want the file to start over every time you click  the button. This the line you want to add to the HTML code:
 ```
 #ff0000, Combat, combat.mp3, -1
 ```

## 3. Customizing
Since this tool is still in development, I will be adding some more functionality. You are free to customize your own version of this code as you see fit, as long as you don't distribute the code later. Please read the `LICENSE` file for more details. 

This tool is made completely with HTML, JS and CSS, so most webdevelopers should be able to edit this application. Go nuts!
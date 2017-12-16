# Insipid
a simple calendar that reads plaintext files
see it [live](https://hubret.github.io/Insipid)

## Features
- runs in browser in a local setting
- import multiple files via drag-and-drop and via plaintext paste
- export calendar to plaintext
- use the pageup and pagedown keys to navigate calendar
- click on the current working month at the top to go back to today's date

## How to write an Insipid file
- make a .txt file
- the format looks like this:

year: 2017  
month: 11  
day: 13  
memo: i have to do something today
			
- year, month, and day should be one-liners
- memo can be written on multiple lines
- drag finished files into Insipid to throw them up on the calendar

## Advanced Formatting
- use &[0-f] before an entry to change the colour!
- example:

this line will be uncoloured  
&6this line will be gold  
&fthis line will be white  

- `&0`: "#000" black
- `&1`: "#00A" dark blue
- `&2`: "#0A0" dark green
- `&3`: "#0AA" dark aqua
- `&4`: "#A00" dark red
- `&5`: "#A0A" dark purple
- `&6`: "#FA0" gold
- `&7`: "#AAA" gray
- `&8`: "#555" dark gray
- `&9`: "#55F" blue
- `&a`: "#5F5" green
- `&b`: "#5FF" aqua
- `&c`: "#F55" red
- `&d`: "#F5F" magenta
- `&e`: "#FF5" yellow
- `&f`: "#FFF" white

## Known Issues
- changing the working month while editing a memo that is not saved will save the memo in a different location.
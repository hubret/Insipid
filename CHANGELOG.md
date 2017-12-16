# Changelog

## 1.1
- Added colors to memo editors
- Changed all offwhite #eee text to white #fff text because consistency with color codes.
- Fixed bugs
	- switching working month would duplicate memos to other dates

## 1.0.2
- Fixed a bug
	- erasing a memo would not delete it from memory
	
## 1.0.1
- Fixed a bug
	- autosave would not run when the working month was not the same as the current month
	- the exporter would not show any changes until an entry was made in the current month

## 1.0
- Applied the "nuclear option" onto the code. Whole application redone from ground up
- Most if not all functions are implemented!
	- runs in browser in a local setting
	- import multiple files via drag-and-drop and via plaintext paste
	- export calendar to plaintext
	- use arrowkeys to navigate calendar
	- click on the current working month at the top to go back to today's date
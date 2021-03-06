<!---
this is a generated file, changes will be lost.
-->

Overview | [Commands](./reference_02_commands.md) | [Syntax](./reference_03_syntax.md) | [Properties](./reference_04_properties.md) | [Functions](./reference_05_functions.md) | [Event Handlers](./reference_06_events.md) | [Compatibility](./reference_07_compatibility.md)



## Introduction



Welcome to ViperCard, an open source re-creation and re-imagination of 1987's HyperCard. We suggest first watching the example videos.





## Scripting


All objects (all buttons, fields, and cards) have an associated set of code called a "script."

Here is an example script:

```
on mouseUp
    answer "hello, world"
end mouseUp
```


If this script is placed in a button, and the Browse tool is chosen (looks like a hand), the code will be run when the button is clicked.

A line of code beginning with -- is ignored. This is often used to write explanatory comments. It can also be used to temporarily "disable" some code. You can press Cmd+Q in the script editor to quickly comment-out or uncomment a line.


```
on mouseUp
    -- this line is a comment
    answer "hello, world"
end mouseUp
```



The indentation helps readability, but it is not mandatory. The code editor will automatically add indentation whenever you press Tab or Enter.

A long line of code can be continued with a backslash, e.g.


```
answer ("here is how to continue" & \
    "code across two lines")
```


To have a comment spanning many lines, do this,


```
on mouseUp
    --[[this line is a comment
    and so is this
    and also this]]
    answer "hello, world"
end mouseUp
```


The language is not case sensitive. `on mouseup` and `on mouseUp` are equivalent.

A common data type is a string (i.e. text).


```
put "abc" into x
```


Double-quotes ("), not single-quotes ('), must be used. A string with length 0, "", is perfectly valid and used often to represent a missing value. You may see this referred to as an 'empty string'. You can easily test for an empty string with code like:


```
if x is "" then
    answer "empty string"
end if
```


To include a double-quote character in a string, use the quote constant,


```
answer (quote & "a" & quote) -- displays "a"
```


Valid numbers include `123`, `123.456`, and scientific notation like `1.23e6` which means `1.23` multiplied by (`10` to the `6`th power). Numbers can be in the range `[-1e18, 1e18]`, if a number is taken outside this range a runtime error will be thrown. Division by zero, logarithm of a negative, and so on will also cause a runtime error.

`sqrt(0.5)` is a function call meaning to take the square root of `0.5`. `sum(1, 2)` is a function call that adds 1 and 2 and returns 3. A comma separates the values sent. Function calls can be nested, for example, `sum(1, sum(2, 3))`.

You can call a function in two ways. `the mouseLoc` is the same as `mouseLoc()`. `the length of "abc"` is the same as `length("abc")`.

Buttons and fields are referred to as "objects". Cards are also a type of object. And, the entire project, referred to as a "stack", is an object.

A script can set properties of an object with syntax like:


```
set the width of cd btn "myBtn" to 450
```


Choose the button tool and select a button, and its id will be shown in the panel on the right. One can refer to an object by id in a script:


```
set the width of cd btn id 1234 to 450
```


When you are in the Browse tool and you interact with the page by clicking on buttons or pressing keystrokes, this causes messages to be fired. If you click a button, and if that button has a script that happens to have a function called `on mouseUp` defined, then the code inside `on mouseUp` will be run.

The documentation here has a list of Commands, Event Handlers, and Properties that can be set.




## Expressions



You can use expressions like `put 1+2+3+4 into x` or `put sqrt(0.5) + sqrt(0.6) into y` in your code.

Expressions can use parentheses to contain any level of nested sub-expressions, for example,


```
sqrt(0.5)
sqrt(0.5 + sqrt(0.6))
sqrt(0.5 + sqrt(0.6 + sqrt(0.7)))
```

are all valid.

Parentheses are used to dictate the order of operations, since

```
3*(4+5)
```

gives a different answer than

```
(3*4)+5
```


Parentheses are also used for grouping an expression. For example, we needed to get the (n + 1)th line of a variable, we would type `(line (n + 1) of x)`

Do not type something like

```
answer (line n + 1 of x) -- this is hard to read.
```

which is unclear,

```
answer (line (n + 1) of x) -- this is preferred.
```


In the expression `2 + 3`, the symbol `+` is called an operator.

ViperCard also has logical operators like `and`, `or`, and `not`.

See the `operators` page in the Syntax documentation section

for more information.



## Message Box



Open the Message Box by choosing 'Message Box' from the Go menu, or by pressing Cmd+M.

The message box can be used to quickly try out snippets of code. For example, if you want to evaluate some math, you can open the message box, type `put 12*34`, and press Enter. The result will be shown below.

As another example, if you have two buttons, and you want to align the left sides of the buttons, you can type `set the left of cd btn 2 to the left of cd btn 1`, and press Enter, and the action will be performed.

You can use the Up and Down arrow keys to see previously typed commands.

You can use a semicolon to combine many lines, for example `put 2 into x; put x * 3`

You can use the message box to check or change the contents of a global variable. In fact, any variable mentioned in the message box will be assumed to be a global, so you can write `put 4 into myGlobal` without first needing to declare `global myGlobal`.

In your script, you can add debugging statements that trace a value and show it in the message box, as long as the message box is currently open.


```

put 45 * 56 into x
-- if the msg box is open, will show the value of x
-- otherwise, the line is ignored
put x into the msg box
-- code will continue running

```


The shortened form,


```

put 45 * 56 into x
-- if the msg box is open, will show the value of x
put x
```


is also supported.




## Lists/Arrays



Here's a common way to create a list:


```
put "" into myList
repeat with x = 1 to 5
    put 0 into line x of myList
end repeat
```


Append a number to the list:


```
put newline & 20 after myList
```


Insert a number in the list (if the line doesn't yet exist, it will be added)


```
put 6 into line 8 of myList
```


Add 10 to each element of the list:


```
repeat with x = 1 to the number of lines in myList
    put (line x of myList) + 10 into line x of myList
end repeat

```


`myList` is a normal variable, it can be passed as an argument and so on.

**Two-dimensional lists**

Here's a common way to create a 2-d list:

```
put "" into myList
repeat with x = 1 to 5
    repeat with y = 1 to 5
        put 0 into item x of line y of myList
    end repeat
end repeat
```


Insert a new number into the list (it's ok if the line or item does not yet exist, it will be created):


```
put 3 into item 6 of line 8
```


Add 10 to each element of the list:


```
repeat with y = 1 to the number of lines in myList
    repeat with x = 1 to the number of items in line y of myList
        if length(item x of line y of theLine) > 0 theLine
            add 10 to item x of line y of theLine
        end if
    end repeat
end repeat

```




## Variables



Use a statement like 


```
put 3 into x
```


to put the value "3" into a variable named "x". You don't need to first declare x as a variable.

Variable names and function names are case insensitive.

Variable names cannot begin with a numeral, and can contain underscores but no other punctuation. Certain words cannot be used as variable names because they are already keywords or built-in functions. For example, you cannot have a variable named "line" because this is a keyword. You cannot have a variable named "result" because this is a built-in function.

If you try to read from a variable before it has been introduced, a runtime error will occur. `put notSeenBefore into x` will cause an error unless there is a statement assigning a value to `notSeenBefore`.

Use "global" to declare a variable as a global.

1) it can be accessed from any other script

2) its contents are saved even after the function is complete.

For example,


```
global coordX, coordY
put 1 into coordX
put 2 into coordY
```


If another script says

```
global coordX, coordY
answer coordX, coordY
```

it will read the values that were set.

Global variables are, though, reset when you close the stack (the values

are not saved as part of the project.)

**Data types**

A runtime error can be thrown if a value has the wrong

type, e.g.

```
put "abc" + 4 into z
```

causes a runtime error! The addition operator requires numbers, and so creates a runtime error when getting the string `"abc"`.

If you need to convert from a text type to a number, you can use the functions `strToNumber` and `numberToStr`. For example,

```
ask "please enter a number"
put it into x
if strToNumber(x) is not false then
    answer "the number plus one is" && (strToNumber(x) + 1)
end if

```


For `if` and `else if`, only `true` or `false` are accepted, any other value is a runtime error. For example, to check that a string is not empty, you cannot say `if myVar then`, you have to say something like `if length(myVar) > 0 then` instead.

Note that equality checks account for different data types: 


```
if (456 is "456.00") then answer "yes" -- answers yes
```


A "point" data type is two numbers separated by a comma. You can write:

```

put 1 into x
put 2 into y
set the topleft of cd btn "myBtn" to x, y

```


This is the same as writing

```

set the topleft of cd btn "myBtn" to 1, 2
set the topleft of cd btn "myBtn" to "1, 2"
-- or
set the top of cd btn "myBtn" to 1
set the left of cd btn "myBtn" to 2

```



## User Functions


An example of how to define and call a custom function:

```
function myAddition p1, p2
    return p1 + p2
end myAddition
on mouseUp
    put myAddition(1,2) into x
end mouseUp
```


An example of how to define and call a custom handler:

```
on showMessage p1, p2
    put p1 into cd fld "results1"
    put p2 into cd fld "results2"
end showMessage
on mouseUp
    showMessage "hello", "world"
end mouseUp
```


You can define variadic functions (that accept any number of values), see the documentation for the paramCount() function.

No error is thrown if the incorrect number of arguments is given. Missing arguments are given the empty string ("").

```
myAddition(7, 8, 9) -- the extra argument 9 is ignored
myAddition(7, 8) -- p1 is assigned 7, p2 is assigned 8
myAddition(7) -- p1 is assigned 7, p2 is assigned ""
myAddition() -- p1 is assigned "", p2 is assigned ""
```


You can use recursion.

You can place common code in the current card's script, or the stack's script, so that it can be called by many objects. This is because of the message hierarchy:

Messages bubble upwards from a button or field, to the parent card, to the stack, until they are handled.
* If you click on a button:
    * A mouseUp message is created
    * Script of the button is examined. 
    * If there is an 'on mouseUp' handler,
        * Run the code in the mouseUp handler.
        * If the handler completes, stop running code, we're done.
        * If the handler calls 'pass mouseUp', continue:
    * Script of the current card is examined.
    * If there is an 'on mouseUp' handler,
        * Run the code in the mouseUp handler.
        * If the handler completes, stop running code, we're done.
        * If the handler calls 'pass mouseUp', continue:
    * Script of the current stack is examined.
    * If there is an 'on mouseUp' handler,
        * Run the code in the mouseUp handler.

* Similarly, if you are typing text in a field, and type the letter 'a':
    * A afterKeyUp message is created
    * Script of the current field is examined.
    * If there is an 'on afterKeyUp' handler,
        * Run the code in the afterKeyUp handler.
        * If the handler completes, stop running code, we're done.
        * If the handler calls 'pass afterKeyUp', continue:
    * Script of the current card is examined.
    * If there is an 'on afterKeyUp' handler,
        * Run the code in the afterKeyUp handler.
        * If the handler completes, stop running code, we're done.
        * If the handler calls 'pass afterKeyUp', continue:
    * Script of the current stack is examined.
    * If there is an 'on afterKeyUp' handler,
        * Run the code in the mouseUp handler.

Calling `exit to ViperCard` passes the message up to ViperCard to be handled, and then exits all code execution. So it has two uses, it will exit all code execution, and will also fall back to the default ViperCard behavior.

See documentation of the 'pass' command for more information.

Calls to custom commands and procedures also bubble upwards in the same way. A function in the stack's script can be called from any handler on a card, field, or button. A function in the card's script can be called from any handler in a field or button. So, it is useful to put commonly used utility code in a stack script so that it can be called from anywhere.



## Text and Chunks



**Lines**

Use `newline` to refer to a new line character.

Let's say you wanted two lines of text in a field, you would use

the following:


```
put "first line" & newline & "second line" into cd fld "myFld"
```


(You shouldn't have to be concerned with platform differences: the constants 'return', 'cr', 'linefeed' are present for compatibility, but they are all equivalent. For convenience, copying and pasting text in and out of ViperCard will automatically translate newline characters, for example if you are running windows, when you copy text we'll automatically convert to \r\n newlines so it will work seemlessly with other software. Internally, ASCII 10 represents newline.)

**Chunks**

ViperCard can process text by using chunks. If you have a tab-separated list you can get the nth item like this:


```

put "ab" & tab & "cd" & tab & "ef" into myList
set the itemDelimiter to tab
put 2 into n
answer "Result:" & item n of myList

```

If you have a comma-separated list you can get the nth item like this:


```

put "ab,cd,ef" into myList
set the itemDelimiter to ","
put 2 into n
answer "Result:" & item n of myList

```


More advanced examples:


```

answer char 2 of "abcd"
answer char (n + 1) of "abcd"
answer char 2 to 4 of "abcd"

answer item 2 of "ab,cd,ef,gh"
answer item (n + 1) of "ab,cd,ef,gh"
answer item 2 to 4 of "ab,cd,ef,gh"

answer first item of "ab,cd,ef,gh"
answer last item of "ab,cd,ef,gh"
answer any item of "ab,cd,ef,gh"

put "ab" & newline & "cd" & newline & "ef" into myList
answer line 2 of myList
answer line (n + 1) of myList
answer line 2 to 3 of myList

```


Recursive scopes:

```

put "ab,cd" & newline & "ef,gh" & newline & "ij,kl" into myList

answer item 2 of line 2 of myList
answer char 2 of line 2 of myList
answer char 2 of item 2 of line 2 of myList

answer char 2 to 3 of item 2 to 3 of line 2 to 3 of myList

```



**Modifying by chunk**


```

put "abcd" into x
put "A" into char 2 of x
put "A" into char 2 to 4 of x

put "10,20,30" into myList
put "A" into item 2 of myList
put "A" into item 2 to 3 of myList
multiply item 2 of myList by 5
add 1 to item 2 of myList

put "A" into first item of myList
put "A" into last item of myList
put "A" into any item of myList

put "A" into before item 2 of myList
put "A" into after item 2 of myList
put "A" into before char 2 of item 2 of myList

put "A" into before item 2 of cd fld "myFld"
put "A" into after item 2 of cd fld "myFld"
put "A" into before char 2 of item 2 of cd fld "myFld"

put "ab,cd" & newline & "ef,gh" & newline & "ij,kl" into myList
put "A" into item 2 of line 2 of myList
put "A" into char 2 of line 2 of myList
put "A" into char 2 of item 2 of line 2 of myList

put "A" into char 2 to 3 of item 2 to 3 of line 2 to 3 of myList

```


**Backwards compatiblity**

We went to much effort to maintain fidelity with HyperCard's chunk processing. All of the above can be done with words:


```

put "ab cd ef" into x
answer word 2 of x
answer word 2 to 3 of x
put "A" into word 2 of x
put "A" into word 2 to 3 of x
put "A" into char 2 to 3 of word 2 to 3 of x

```


To enable full compatibility with HyperCard, go to `Object->Stack info...` and turn on compatibility mode. Chunk handling will now be identical (including the non-intuitive behavior seen below).


```

-- if compatibility mode is on:
-- we follow HyperCard's non-intuitive behavior for the following:
put "ab,cd" & newline & "ef,gh" & newline & "ij,kl" into myList
put "A" into item 3 of item 4 of myList
put "A" into item 3 of char 2 of myList
delete item 3 of item 4 of myList
delete item 3 of char 2 of myList
add 1 to item 3 of item 4 of myList
add 1 to item 3 of char 2 of myList
answer item 0 of myList
put "A" into item 0 of myList
answer item 4 to 1 of myList
put "A" into item 4 to 1 of myList


-- The only known cases we don't support (we'll throw a runtime error):
answer item -1 of myList
put "A" into item -1 of myList
delete item -1 of myList
answer char 2 of item 4 to 1 of myList
put "A" into char 2 of item 4 to 1 of myList
delete char 2 of item 4 to 1 of myList
delete item 2 to 3 of myList

```


See also documentation for the `delete` command.


## Objects


Ways to refer to a button or field:

```

cd btn id 1234
cd btn "myBtn"
cd btn 2
first cd btn
any cd btn
last cd btn

```


Ways to refer to a card:

```

this card
prev card
next card
first card
second card
last card
card 1
card id 1234
card "name"

```


Ways to refer to a background:

```

this background
prev background
next background
first background
second background
last background
bg 1
bg id 1234
bg "name"

```


Ways to refer to a stack:

```

this stack
stack 1
stack "name"

```

Other ways to refer to objects:

```

answer the name of the target
answer the name of me
answer the name of the owner of cd btn id 1234
put "cd btn id 1234" into x
answer the name of x

function whichObject
    return "cd btn id 1234"
end whichObject
answer the name of whichObject()

```



## Structure



**Loops**

```
repeat with x = 1 to 3
    ...other code here...
end repeat
```


Refer to `repeat` under "syntax" for more information.

**If statements**

```
if x > 1 then
    ...other code here...
else
    ...other code here...
end if
```

Refer to `if` under "syntax" for more information.


**Scripts**

No code can exist outside of a handler or function.

**Handlers**

Handlers look like this


```
on mouseup 
    answer "hello world"
end mouseup
```

    
and respond to an event message.
    
**Functions**

Functions look like this


```
function myAddition p1, p2
    return p1 + p2
end myAddition
```


They can then be called with code like

```
put myAddition(1,2) into x
```

Functions inside of functions are not supported.


**Statements**

You cannot have a line that is just

`sqrt(0.5)`

with no command, this is a syntax error.
    
Statements occur on separate lines, there's no way to have more than one statement on a line.
    
**Expressions**

A set of computations such as `1+2+3+4` or `sqrt(0.5) + sqrt(0.6)` is an expression. Most places that take a value can be given an expression, for example,


```
go card 2
-- is the same as
put 1 into x
go card (x + 1)

put "abc" into cd fld "myFld1"
put "abc" into cd fld (prefix & "1")

put "a" into line 4 of myList
put "a" into line (x+1) of myList

set the left of cd btn "myBtn" to x
set the left of cd btn "myBtn" to (45 + 50 * cos(theta))

```



## Examples


The tutorial videos show helpful example code.

Example 1:

```

-- after creating a field called "myFld":
-- create a btn and put this in its script:
on mouseUp
    -- when you click button "Go", you get 10 points!
    put cd fld "myFld" into score
    put (score + 10) into score
    put score into cd fld "myFld"
end mouseUp


```


Example 2:

```

-- after creating a btn called "fish":
-- create a btn and put this in its script:
on mouseUp
    -- when you click this, the fish moves
    put the top of cd btn "fish" into y
    subtract 10 from y
    set the top of cd btn "fish" to y
end mouseUp


```

Example 3:

```

-- create interactive art.
-- put this in the card script,
-- then when you choose the browse tool and 
-- click on the card, it will draw lines.

on mouseUp
    put the clickH into X
    put the clickV into y
    
    -- choose the line tool to draw lines
    choose "line" tool
    
    -- make a loop that will repeat 10 times
    repeat 10 times
        put random(80) into randx
        put random(80) into randy
        -- will get random # between 1 and 80
        drag from x, y to (x + randx), (y + randy)
    end repeat
end mouseUp
  

```




## Tips & Shortcuts



General tips

* If your script is caught in an infinite loop, click the Stop button (black rectangle) to stop the script
* See more error details, when in the Script Editor, by clicking on the error excerpt
* Double-click the eraser tool to clear paint on the current card

Keyboard shortcuts when editing text,

* Cmd+C to copy
* Cmd+X to cut
* Cmd+V to paste
* Cmd+A to select all
* Cmd+Backspace to delete entire word
* PageUp / PageDown to scroll one page
* Shift+PageUp / Shift+PageDown to select one page
* Home to move to start of line
* Shift+Home to select to start of line
* Cmd+Home to move to the start
* Cmd+Shift+Home to select to the start
* Left Arrow to move to the left
* Shift+Left Arrow to select to the left
* Cmd+Left Arrow to move left one word
* Cmd+Shift+Left Arrow to select left one word
* Cmd+Arrow Up to scroll up
* Cmd+Arrow Down to scroll down
* Cmd+D to duplicate the current line
* Cmd+L to delete the current line
* Cmd+Q to quickly comment-out or uncomment the current line
* Cmd+Q when many lines are selected to comment-out all of them
* Cmd+Q to comment-out a block of code
* Tab key, to auto-indent code in a script

Some of the main differences between ViperCard and HyperCard:
* ViperCard is open source software that can run in any modern web browser
* you can export stacks as a modern json format
* art-stamps feature for adding clip art
* new animation features like save-to-gif
* in ViperCard you have to hit Save to save changes
* but in ViperCard you have extensive undo history and can even undo changes made by a script

A few of the differences between ViperCard and HyperCard:
* You can use `--[[block comments]]` that span many lines.
* You can write `exit to ViperCard` instead of `exit to HyperCard`
* You must specify `cd` or `bg` when referring to a button or field, unless compatibility mode is enabled (Object->Stack Info)
* Currently: message chain for key events is different, on afterkeydown to indicate cannot prevent default action.
* Scripts only run when browse tool is active; you can exit an infinite loop by changing the current tool
* You cannot read a variable that has not been set. `put unsetVar into x` causes a runtime error.
* hilite and checkmark are separate properties
* label and name are separate properties
* You can't have a variable named id, short, long, first, and so on.
* The `choose` command sets the emulated current tool, not the actual tool, and is limited to certain paint operations
* The newline character is \n and not \r




## What's New


New in 0.24
* Script stack trace
* Use `get the shiftKey`, deprecate `get the shiftKey()`
* You can say `the sin of 4`
* You can say `sin of 4`, `sin of cd fld 1`
* Continue lines with logical-not, press `Alt-Enter` in code editor
* Block comments `--[[a comment]]`
* You can use `select`, `mark`, `doMenu` commands
* You can turn on compat mode to allow `put "a" into fld 1`
* Everything is case insensitive, even `cd btn "aBcDe"`
* Improvements to `send` and `do`, script error shown in more helpful line
* Improvements to built in functions like `selectedText`
* Improvements to click features like `wait until the mouseClick`
* You can say `put "card id 2590" into xx; put the name of xx into y`
* You can use values for coords, e.g. `put "3,4" into c; set the loc of cd btn 1 to c`
* Better match subtle differences between `target` and `the target`
* Single-line `if` statements, fewer parentheses needed
* Call custom functions from anywhere
* Better cursors, better rendering on different screen resolutions
* More fonts, all fonts have pixel-perfect spacing
* You can use recursive chunks like `put "a" into char 7 of line 3 of x`
* Improvements to load time by loading some libraries asynchronously
* Common commands in script execution are faster
* Scripts can dynamically create/delete objects, and set scripts
* New features like `set the textstyle of line 3 of cd fld "myFld" to "toggle-bold"`



## Credits



ViperCard

https://github.com/moltenform/vipercard

Copyright (C) 2020 Ben Fisher

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. 

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

ViperCard uses the following libraries:

* Chevrotain
    * https://github.com/SAP/chevrotain
    * Apache License 2.0
* FileSaver.js
    * https://github.com/eligrey/FileSaver.js
    * MIT License
* Golly
    * https://github.com/dannygarcia/golly
    * MIT License
* js-lru
    * https://github.com/rsms/js-lru
    * MIT License
* Clipboard.js
    * https://github.com/zenorocha/clipboard.js
    * MIT License
* base64js
    * https://github.com/beatgammit/base64-js
    * MIT License
* JSGIF
    * https://github.com/antimatter15/jsgif
    * MIT License
* Bresenham easy.filter
    * http://members.chello.at/easyfilter/bresenham.html
    * written permission of author
* lz-string
    * https://github.com/pieroxy/lz-string
    * MIT License
* Pizzicato
    * https://github.com/alemangui/pizzicato
    * MIT License
* Bowser
    * https://github.com/lancedikson/bowser
    * MIT License
* types-text-encoding 
    * https://www.npmjs.com/package/@types/text-encoding
    * MIT License
* deep-freeze
    * https://github.com/substack/deep-freeze
    * Public domain
* pbkdf2 gist by Chris Veness
* description of Mac OS Roman character set
    * https://en.wikipedia.org/wiki/Mac_OS_Roman
    * http://creativecommons.org/licenses/by-sa/3.0/
    * Creative Commons Attribution-ShareAlike
* and a small excerpt from the SciTE code editor,
* ported from C++ to TypeScript by Ben Fisher
* SciTE
    * https://www.scintilla.org/License.txt


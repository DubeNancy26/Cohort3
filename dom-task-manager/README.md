1. Parsing: it is the process of reading html or css code and convert it into format that the browser can understand

2. Tokenization: it is the process of breaking the html code into small token. these token are used to build Dom tree.

3. Dom tree: stands for document object model. browser convert html into tree like structure called dom tree.

4. CSSOM tree: stand for css object model. cssom contain information about stle that should be applied to html elements. it represent the style.

5. Render tree: The browser combine the dom tree and cssom tree to create the Render tree. the render tree containn the element that need to be displayed on the page.

6. Event bubbling: element dtart from target element and moves upward through its parent element.

7. Event Capturing: it is opposite of event bubbling. it enabled by passing true as third argument of addEventListner()

8. event delegation : attaching a single event listner to a parent elemtn instead of addding separate event listenr to every child.
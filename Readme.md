1. getElementById - This returns a single element by its ID.

getElementsByClassName - This returns a collection of elements with the given class.

querySelector - This will return the first element that matches a CSS selector.

querySelectorAll - This returns a list of all elements that match a CSS selector.

2. Create a new element,then set its content or attributes, and then insert it into the desired parent element using appendchild()

3. When an event occurs on an element, it first runs on that element, then propagates upward through its parent elements until reaching the root.

4. Event delegation is a technique where a single event listener is added to a parent element to handle events from its child elements. It is useful because it reduces the number of event listeners, improves performance, and works for dynamically added elements. fo example instead of adding listener to every button in a list simply add the listener to the list instead.

5. preventDefault - stops the default browser action from happening mainly used with forms.

stopPropagation - stops the event from moving up to parent elements to stop event bubbling when needed.

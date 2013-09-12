Autocomplete Specs

- Start on the documentation for the plugin.
- Clean up the pass down of events as we lead down the chain of if checks to start the plugin.
  * Critical area that needs a refactor.
- https://github.com/loopj/jquery-tokeninput/blob/master/src/jquery.tokeninput.js Go through this and implement some of the best practices.
- Implement a backbone view to be called for the search results (row view), and then also implement if backbone is switched on and right params
- REMEMBER The main point of this is that it is a backbone optional plugin as well.  So really focus on that after I have the core down.  
are passed a model to use for the fetching instead of this ajax method.  (They are interchangable)

Example: 
http://jsfiddle.net/vq6MH/146/

Notes on Backend:
https://github.com/Innovation-Toolkit/midas/commit/dfdf07e816ca05e22aeb38c2d0c0dbd3775928f6

[DONE] - Add the ability to pass in a trigger optional param: IE (@) and then that starts the search IE (@joe)
[DONE]- Auto populate your search results, and take you to the links that the search results specify.  
[DONE] - Seperates out the search results into the result, then an ICON for the type of result on the left.
[DONE] - Seperate the search results into a re-usable HTML pattern of some sort (template) not raw injection
[DONE] - Doesn't call the JS method directly on the view, but on keyup, it calls a method that has been mixed in.
[DONE] - It is a jquery plugin, that allows us to pass in features, and other things to assimilate what we want in the plugin.
[DONE] - Have the option of either triggering the event from a plugin paramater, OR from backbone events, and passing false to the plugin
events option.  That option will then bypass that and succeed it with the backbone events.
[DONE] - Checks the type of results being sent back and gives a logical ordering to them based on that, chunking together.  

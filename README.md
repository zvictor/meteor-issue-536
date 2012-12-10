Multiple observers running
==========================

Description
-----------
When using **observe** inside a publish, I see my callback been executed excessively times for every event, may leading to race conditions.

Steps to Reproduce
------------------
Using: Meteor version 0.5.2 (6635ae1007)

 1. Clone this repo;
 2. Execute `meteor` inside it;
 3. Open your browser at [http://localhost:3000/](http://localhost:3000/) (or the place you set it).
 4. **Reload the page**;
 5. Press the "*click me*" button. It will insert a document in database;
 6. Press the "*click me*" button again. It will change the previously created doc, and then will remove it;
 7. Take a look at server's logs;

Expected Behavior
-----------------

    ADDED doc[0]:b3e0d4d1-dc91-4aa3-8778-0daaa6fc8788
    executions:1
    time:1355164452289
    session:cd455872-0beb-42c6-87ff-9bf4fab07337
    
    CHANGED doc[0]:b3e0d4d1-dc91-4aa3-8778-0daaa6fc8788
    executions:1
    time:1355164470893
    session:cd455872-0beb-42c6-87ff-9bf4fab07337
    
    REMOVED doc[0]:b3e0d4d1-dc91-4aa3-8778-0daaa6fc8788
    executions:1
    time:1355164470941
    session:cd455872-0beb-42c6-87ff-9bf4fab07337

Actual Behavior
---------------

    ADDED doc[0]:b3e0d4d1-dc91-4aa3-8778-0daaa6fc8788
    executions:1
    time:1355164452289
    session:7b9dfcdd-0e76-4cff-9b37-7e6ceacfe87a
    
    ADDED doc[0]:b3e0d4d1-dc91-4aa3-8778-0daaa6fc8788
    executions:1,2
    time:1355164452289
    session:cd455872-0beb-42c6-87ff-9bf4fab07337
    
    CHANGED doc[0]:b3e0d4d1-dc91-4aa3-8778-0daaa6fc8788
    executions:1
    time:1355164470893
    session:7b9dfcdd-0e76-4cff-9b37-7e6ceacfe87a
    
    CHANGED doc[0]:b3e0d4d1-dc91-4aa3-8778-0daaa6fc8788
    executions:1,2
    time:1355164470893
    session:cd455872-0beb-42c6-87ff-9bf4fab07337
    
    REMOVED doc[0]:b3e0d4d1-dc91-4aa3-8778-0daaa6fc8788
    executions:1
    time:1355164470941
    session:7b9dfcdd-0e76-4cff-9b37-7e6ceacfe87a
    
    REMOVED doc[0]:b3e0d4d1-dc91-4aa3-8778-0daaa6fc8788
    executions:1,2
    time:1355164470941
    session:cd455872-0beb-42c6-87ff-9bf4fab07337

Workaround
----------
Uncomment the following code in `server.js`:
    this.session.socket.on("close", function() {
      handle.stop();
      Meteor._debug("connection "+self.session.id+" closed");
    });

Unfortunatelly, after some time, the following starts to happens:
*(Try reloading the page many times and wait for connections to time out)*
    Exception from setInterval callback: [TypeError: Cannot call method '_removeObserveHandle' of null]
    Exception from setInterval callback: [TypeError: Cannot call method '_removeObserveHandle' of null]
    Exception from setInterval callback: [TypeError: Cannot call method '_removeObserveHandle' of null]



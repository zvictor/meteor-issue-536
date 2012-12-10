
Meteor.publish("mycolletion", function () {
  return MyCollection.find();
});

Meteor.publish("observer", function () {
  var self = this;
  var handle = MyCollection.find().observe({
    added: function(doc, position){
      logger.call(self, "ADDED", doc, position);
      self.flush();
    },
    changed: function(doc, position){
      logger.call(self, "CHANGED", doc, position);
      self.flush();
    },
    removed: function(doc, position){
      logger.call(self, "REMOVED", doc, position);
      self.flush();
    }
  });

  self.onStop(function () {
    handle.stop();
  });

/*
  this.session.socket.on("close", function() {
    handle.stop();
    Meteor._debug("connection "+self.session.id+" closed");
  });
*/

});

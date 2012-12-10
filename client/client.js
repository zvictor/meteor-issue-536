
Meteor.subscribe("observer");
Meteor.subscribe("mycolletion");

Meteor.startup(function(){
  $("body").append("<button>click me</button>");

  $("button").click(function() {
    //each click add or change (and then remove) an entry, alternately.
    var entry = MyCollection.findOne();
    if(entry){
      //change
      MyCollection.update(entry._id, {$set: {oneKey: Math.random()}});
      //remove
      MyCollection.remove({_id: entry._id});
    } else {
      //add
      MyCollection.insert({oneKey: "oneValue"});
    }
  });

});

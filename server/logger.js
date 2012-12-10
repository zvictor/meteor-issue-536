var executions = {
  ADDED:[],
  CHANGED:[],
  REMOVED:[]
};

function logger(type, doc, position){
  var exec = executions[type];
  var last = exec[exec.length-1]||0;
  var next = last+1;
  exec.push(next);

  Meteor._debug(type+" doc["+position+"]:"+doc._id);
  Meteor._debug("executions:"+exec);
  Meteor._debug("time:"+new Date().getTime());
  Meteor._debug("session:"+this.session.id+"\n");
}


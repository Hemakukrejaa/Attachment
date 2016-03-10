FileCollection = new FS.Collection("FileCollection", {
    stores: [new FS.Store.FileSystem("FileCollection", {path: "~/Hemak"})]
});
FileCollection.allow({
    insert: function (userId, doc) {
        return true;
    },
    update: function (userId, doc) {
        return true;
    },
    remove: function (userId, doc) {
        return true;
    },
    download: function (userId, doc) {
        return true;
    }
});


if(Meteor.isClient){

Meteor.subscribe("fileUploads");
    Template.home.events({
      'click #deleteFileButton ': function (event) {
          FileCollection.remove({_id:this._id});
        
      },
      'change .your-upload-class': function (event, template) {
    FS.Utility.eachFile(event, function (file) {
      var yourFile = new FS.File(file);
      yourFile.creatorId = 123; // todo
      FileCollection.insert(yourFile, function (err, fileObj) {
        if (!err) {
          console.log("inserted without error");
        }
        else {
          console.log("there was an error", err);
        }
      });
    });
  }
});

Template.home.helpers({
  theFiles: function () {
    return FileCollection.find();
  }
});

}
if(Meteor.isServer){
Meteor.publish("fileUploads", function () {
  console.log("publishing fileUploads");
  return FileCollection.find();
});
}


/// <reference path="../../../libs/jquery-1.10.1.js" />
/// <reference path="../../knockout-2.2.1.js" />


function WebMailViewModel() {
    // Data
    var self = this;
    self.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
    self.chosenFolderId = ko.observable();
    self.chosenFolderData = ko.observable();
    self.chosenMailData = ko.observable();

    // Behaviours
    self.goToFolder = function (folder) {
        var data;
        self.chosenFolderId(folder);
        self.chosenMailData(null); // Stop showing a mail
        //$.get('/mail', { folder: folder }, self.chosenFolderData);
        switch (folder) {
            case 'Inbox':
                data = dataInbox;
                break;
            case 'Spam':
                data = dataSpam;
                break;
            case 'Archive':
                data = dataArchive;
                break;
            case 'Sent':
                data = dataSent;
                break;
            default:
                throw new Error({ name: "Invalid Argument", message: "Not valid argument: " + folder });
        }
        self.chosenFolderData(data);
    };

    self.goToMail = function (mail) {
        self.chosenFolderId(mail.folder);
        self.chosenFolderData(null); // Stop showing a folder
    };

    // Show inbox by default
    self.goToFolder('Inbox');

}

var viewModel = new WebMailViewModel();
ko.applyBindings(viewModel);





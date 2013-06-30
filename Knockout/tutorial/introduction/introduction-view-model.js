/// <reference path="../../knockout-2.2.1.js" />

var AppViewModel = function () {
    this.firstName = ko.observable("Nikita");
    this.lastName = ko.observable("Moshensky");
    this.fullName = ko.computed(function () {
        return this.firstName() + ' ' + this.lastName();
    }, this);

    this.capitalizeLastName = function () {
        var currentVal = this.lastName();
        this.lastName(currentVal.toUpperCase());
    };
};

ko.applyBindings(new AppViewModel());
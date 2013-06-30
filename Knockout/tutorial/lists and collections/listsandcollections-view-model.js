/// <reference path="../../knockout-2.2.1.js" />

// Class to represent a row in the seat reservations grid
function SeatReservation(name, initialMeal) {
    var self = this;
    self.personName = ko.observable(name);
    self.meal = ko.observable(initialMeal);

    self.formattedPrice = ko.computed(function () {
        var price = self.meal().price;
        return price ? "$" + price.toFixed(2) : "None";
    });
}

// Overall viewmodel for this screen, along with initial state
function ReservationsViewModel() {
    var self = this;

    // Non-editable catalog data - would come from the server
    self.availableMeals = [
        { mealName: "Standart (sandwich)", price: 0 },
        { mealName: "Premium (lobster)", price: 34.95 },
        { mealName: "Ultimate (whole zebrea)", price: 290 }
    ];

    // Editable data
    self.seats = ko.observableArray([
        new SeatReservation("Steve", self.availableMeals[0]),
        new SeatReservation("Bert", self.availableMeals[0])
    ]);

    // Operations
    self.addSeat = function () {
        var reservation = new SeatReservation("", self.availableMeals[0]);
        self.seats.push(reservation);
    };

    self.removeSeat = function () {
        self.seats.remove(this);
    };

    self.totalSurcharge = ko.computed(function () {
        var total = 0;
        for (var i = 0; i < self.seats().length; i++) {
            total += self.seats()[i].meal().price;
        }
        return total;
    });
}

var viewModel = new ReservationsViewModel();
ko.applyBindings(viewModel);
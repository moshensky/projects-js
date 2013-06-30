var mammal = function (specification) {
    var that = {};

    var getName = function () {
        return specification.name;
    };

    that.getName = getName;

    var says = function () {
        return specification.saying || '';
    };

    that.says = says;

    return that;
};

var cat = function (specification) {
    specification.saying = specification.saying || 'meow';

    var that = mammal(specification);

    var purr = function (n) {
        var i;
        var s = '';
        for (i = 0; i < n; i += 1) {
            if (s) {
                s += '-';
            }
            s += 'r';
        }
        return s;
    };

    that.purr = purr;

    var getName = function () {
        var name = that.says() + ' ' + specification.name + ' ' + that.says();
        return name;
    };

    that.getName = getName;

    return that;
};

// super method
Object.prototype.superior = function (name) {
    var that = this;
    var method = that[name];

    return function () {
        return method.apply(that, arguments);
    };
}

var coolCat = function (specification) {
    var that = cat(specification);
    var superGetName = that.superior('getName');

    var getName = function (n) {
        return 'like ' + superGetName() + ' baby';
    };

    that.getName = getName;

    return that;
}

// test :)
var myMammal = mammal({ name: 'Herb' });
var myCat = cat({ name: 'Henrietta' });
var myCoolCat = coolCat({ name: 'Bix' });










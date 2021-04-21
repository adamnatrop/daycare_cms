const User = require('./User');
const Parent = require('./Parent');
const Child = require('./Child');
const ParentChild = require('./ParentChild');
const Billing = require('./Billing');


Parent.belongsToMany(Child, {
    through: {
        model: ParentChild,
        unique: false
    },
    as: 'children'
});

Child.belongsToMany(Parent, {
    through: {
        model: ParentChild,
        unique: false
    },
    as: 'parents'
});

Child.belongsTo(Billing, {
    foreignKey: 'billing_id'
});



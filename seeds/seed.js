const sequelize = require('../config/connection');
const { User, Parent, Child, ParentChild, Billing } = require('../models');

const userData = require('./userData.json');
const parentData = require('./parentData.json');
const childData = require('./childData.json');
const parentchildData = require('./parentchild.json');
const billingData = require('./billingData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  
  const billing = await Billing.bulkCreate(billingData, {
    individualHooks: true,
    returning: true,
  });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const parents = await Parent.bulkCreate(parentData, {
    individualHooks: true,
    returning: true,
  });

  const children = await Child.bulkCreate(childData, {
    individualHooks: true,
    returning: true,
  });

  const family = await ParentChild.bulkCreate(parentchildData, {
    individualHooks: true,
    returning: true,
  });

  

  process.exit(0);
};

seedDatabase();

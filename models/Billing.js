const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Billing extends Model {}

Billing.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        infant: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        toddler: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        preschooler: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'billing',
    }
);

module.exports = Billing;
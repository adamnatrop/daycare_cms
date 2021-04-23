const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class ParentChild extends Model {}

ParentChild.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        parent_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'parent',
                key: 'id',
            },
        },
        child_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'child',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'parentchild',  
    }
);

module.exports = ParentChild;
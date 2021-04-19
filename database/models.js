const { Sequelize, DataTypes } = require('sequelize');
const db = require('./index.js');

const Subscription = db.define('Subscription', {
    Subscription_Id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
});

const Channel = db.define('Channel', {
    Channel_Id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    Channel_Name: {
        type: DataTypes.STRING
    },
    Channel_URL: {
        type: DataTypes.STRING(1000)
    },
    default_img_URL: {
        type: DataTypes.STRING
    },
    medium_img_URL: {
        type: DataTypes.STRING
    },
    high_img_URL: {
        type: DataTypes.STRING
    },
    Channel_Description: {
        type: DataTypes.STRING(1000)
    },
    Total_Videos: {
        type: DataTypes.INTEGER
    },
});

const User = db.define('User', {
    User_Id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    Email: {
        type: DataTypes.STRING
    },
    Name: {
        type: DataTypes.STRING
    },
});

const Category_Channel = db.define('Category_Channel', {
    Category_Channel_Id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
});

const Category = db.define('Category', {
    Category_Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Category_Name: {
        type: DataTypes.STRING
    },
});

User.hasMany(Subscription);
User.hasMany(Category);
Channel.hasMany(Category_Channel);
Channel.hasMany(Subscription);
Category.belongsTo(User);
Category.hasMany(Category_Channel);
Subscription.belongsTo(User);
Subscription.belongsTo(Channel);
Category_Channel.belongsTo(Category);
Category_Channel.belongsTo(Channel);

module.exports = {
    Subscription: Subscription,
    Channel: Channel,
    User: User,
    Category_Channel: Category_Channel,
    Category: Category
};
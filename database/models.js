const { Sequelize, DataTypes } = require('sequelize');
const db = require('./index.js');

const Subscription = db.define('Subscription', {})

const Channel = db.define('Channel', {
    Channel_Id: {
        type: DataTypes.INTEGER,
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
})

const User = db.define('User', {
    User_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    EMAIL: {
        type: DataTypes.STRING
    },
    Name: {
        type: DataTypes.STRING
    },
})

const Category_Channel = db.define('Category_Channel', {})

const Category = db.define('Category', {
    Category_Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Category_Name: {
        type: DataTypes.STRING
    },
})

///////ASSOCIACTIONS///////
//USER
User.hasMany(Subscription);
User.hasMany(Category);
//CHANNEL
Channel.hasMany(Category_Channel);
Channel.hasMany(Subscription);
//CATEGORY
Category.belongsTo(User);
Category.hasMany(Category_Channel);
//SUBSCRIPTIONS
Subscription.belongsTo(User);
Subscription.belongsTo(Channel);
//CATEGORY_CHANNELS
Category_Channel.belongsTo(Category);
Category_Channel.belongsTo(Channel);

module.exports = {
    Subscription: Subscription,
    Channel: Channel,
    User: User,
    Category_Channel: Category_Channel,
    Category: Category
}
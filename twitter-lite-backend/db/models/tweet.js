'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tweet = sequelize.define('Tweet', {
    message: DataTypes.STRING
  }, {});
  Tweet.associate = function(models) {
     Tweet.belongsTo(models.User, {
       as: "user",
       foreignKey: "userId",
     });
  };
  return Tweet;
};
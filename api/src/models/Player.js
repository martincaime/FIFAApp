const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('player', {
    name: {
      type: DataTypes.STRING
    },
    position: {
      type: DataTypes.STRING
    },
    nation: {
      type: DataTypes.STRING
    },
    club: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
  }
  );
};

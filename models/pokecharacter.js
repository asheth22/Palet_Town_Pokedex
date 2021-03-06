module.exports = function(sequelize, DataTypes) {
  const Pokecharacter = sequelize.define("Pokecharacter", {
    pokeName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,25]
      }
    },
    energyType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,25]
      }
    },
    cardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1,10]
      }
    },
    attack: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,25]
      }
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1,25]
    }
  });

  Post.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Post.belongsTo(models.trainer, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Pokecharacter;
};

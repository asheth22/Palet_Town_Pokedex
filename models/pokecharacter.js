module.exports = function (sequelize, DataTypes) {
  const Pokecharacter = sequelize.define("Pokecharacter", {
    pokeName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 25]
      }
    },
    energyType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 25]
      }
    },
    cardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 10]
      }
    },
    attack: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 25]
      }
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1, 25]
    }

  }, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false,
  });

  Pokecharacter.associate = function (models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Pokecharacter.belongsToMany(models.User, {
      through: 'UserPokemon'

    });
  };

  return Pokecharacter;

};


const db = require("../models");
const _ = require('underscore-node')

// Routes
// =============================================================
module.exports = function (app) {
  // Get all cards for a user
  app.get("/api/cards/:id", function (req, res) {
    db.User.findAll({
      where: {
        id: req.params.id
      },
      include: [db.Pokecharacter]
    }).then(function (dbCards) {
      res.json(dbCards);
    });

  });

  // POST route for adding a new card to the user
  app.post("/api/addcard/:id", async (req, res) => {

    const cardId = req.params.id
    db.User.findOne({
      where: {
        id: req.user.id
      },
      include: [db.Pokecharacter]
    }).then(async function (user) {

      console.log("user.Pokecharacter: ", user.Pokecharacters)
      let PokemonCards = user.Pokecharacters.map(card => card.id);

      PokemonCards.push(cardId);

      user.setPokecharacters(PokemonCards);

      user.save();
      res.json(user);
    });
  })

  // DELETE route for removing a card from the user
  app.delete("/api/cards/:id", async (req, res) => {
    const userId = req.user.id
    const cardId = req.params.id;
    console.log("userid in delete: ", userId)
    console.log("cardid in delete: ", cardId)
    db.User.findAll({
      where: {
        id: req.user.id
      },
      include: [db.Pokecharacter]
    }).then(async function (userC, userId) {
      console.log(userC[0].Pokecharacters);
      let userCards = userC[0].Pokecharacters
      let PokemonCards = []
      console.log(userCards[0].dataValues.id, "card id", req.params.id)
      for (i = 0; i < userCards.length; i++) {
        if (userCards[i].dataValues.id != req.params.id) {
          PokemonCards.push(userCards[i]);
        }
      }
      console.log("Pokecards after delete: ", PokemonCards)
      const user = await db.User.findOne({
        where: {
          id: req.user.id
        },
      })

      user.setPokecharacters(PokemonCards.map(card => card.id));
      user.save();
      res.json(userC);
    });


  });

  // PUT route for updating a column on the server
  app.put("/api/cards/:id/:nickname", function (req, res) {

    db.Pokecharacter.update({
      nickname: req.params.nickname,
    }, {
      where: {
        id: req.params.id
      }
    }).then(function (dbCards) {
      res.json(dbCards);
    });
  });

};
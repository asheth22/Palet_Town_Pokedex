
const db = require("../models");
const _ = require('underscore-node')

// Routes
// =============================================================
module.exports = function(app) {

  app.get("/api/cards/:id", function(req, res) {    
    db.User.findAll({  
      where: {
        id: req.params.id
      },
      include: [db.Pokecharacter]
    }).then(function (dbCards) {     
      res.json(dbCards);
    });

  });
  
  // POST route for saving a new todo
  app.post("/api/addCard/", function(req, res) {
  
    db.Pokecharacter.create({
      pokeName: req.body.pokeName,
      energyType: req.body.energyType,
      cardId: req.body.cardId,
      attack: req.body.attack,
      nickname: req.body.nickname,
    }).then(function(dbCards) {
      
      res.json(dbCards);
    });
  });

  app.delete("/api/cards/:id/:userId", async (req, res) => {
    db.User.findAll({  
      where: {
        id: req.params.id
      },
      include: [db.Pokecharacter]
    }).then(async function (dbCards, userId) {
      
      
      let PokemonCards = []
     
      for (i = 0; i < dbCards.length; i++) {
        if (dbCards[i].id !== req.params.id) {
          PokemonCards.push(dbCards[i]);
        }
      }
      
      const user =  await db.User.findOne({
        where: {
          id: 25
        },                
      })
      
      user.setPokecharacters(PokemonCards.map(card => card.id));
      
      user.save();    
      res.json(dbCards);
    });
        

  });
 
  app.put("/api/cards/:id/:nickname", function(req, res) {

    db.Pokecharacter.update({
      nickname: req.params.nickname,      
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(dbCards) {
      res.json(dbCards);
    });
  });

};
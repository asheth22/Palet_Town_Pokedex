
const db = require("../models");
const _ = require('underscore-node')

// Routes
// =============================================================
module.exports = function(app) {
// Get all cards for a user
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
  
  app.delete("/api/cards/:id", async (req, res) => {
    const userId = req.user.id; 
    db.User.findAll({
      where: {
        id: req.params.id
      },
      include: [db.Pokecharacter]
    }).then(async function (dbCards, userId) {
      console.log(dbCards); 
      
      let PokemonCards = []
     
      for (i = 0; i < dbCards.length; i++) {
        if (dbCards[i].id !== req.params.id) {
          PokemonCards.push(dbCards[i]);
        }
      }
      
      const user =  await db.User.findOne({
        where: {
          id: req.user.id
        },                
      })
      
      // user.setPokecharacters(PokemonCards.map(card => card.id));
      
      // user.save();    
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
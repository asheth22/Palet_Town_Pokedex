
const db = require("../models");


// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the todos
  // app.get("/api/mycards", function(req, res) {
  //   // findAll returns all entries for a table when used with no options
  //   db.Pokecharacter.findAll({
  //     include: [db.User]
  //   }).then(function(dbCards) {
  //     // We have access to the todos as an argument inside of the callback function
  //     res.json(dbCards);
  //   });
  // });


  app.get("/api/cards/:id", function(req, res) {
    // We just have to specify which todo we want to destroy with "where"
    db.User.findAll({  
      where: {
        id: req.params.id
      },
      include: [db.Pokecharacter]
    }).then(function (dbCards) {
      // res.render('mycards', {pokecards: dbCards})
      res.json(dbCards);
    });

  });
  
  // POST route for saving a new todo
  app.post("/api/addCard/", function(req, res) {
    // const pokeC = JSON.parse(re.params.PokeCard)
    db.Pokecharacter.create({
      pokeName: req.body.pokeName,
      energyType: req.body.energyType,
      cardId: req.body.cardId,
      attack: req.body.attack,
      nickname: req.body.nickname,
    }).then(function(dbCards) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbCards);
    });
  });

  // DELETE route for deleting todos. We can get the id of the todo to be deleted from
  // req.params.id
  // app.delete("/api/cards/:id", function(req, res) {
  //   // We just have to specify which todo we want to destroy with "where"
  //   db.Pokecharacter.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbCards) {
  //     res.json(dbCards);
  //   });

  // });

  app.delete("/api/cards/:id/:userId", async (req, res) => {
    db.User.findAll({  
      where: {
        id: req.params.id
      },
      include: [db.Pokecharacter]
    }).then(async function (dbCards, userId) {
      // res.render('mycards', {pokecards: dbCards})
      console.log("dbcards in delete: ", dbCards)
      let PokemonCards = []
      for (i = 0; i < dbCards.length; i++) {
        if (dbCards[i].id !== req.params.id) {
          PokemonCards.push(dbCards[i]);
        }
      }
      console.log("Pokemoncards:", PokemonCards);
      const user =  await db.User.findOne({
        where: {
          id: 2
        },                
      })
      console.log("user", user)
      user.setPokecharacters(PokemonCards.map(card => card.id));
      // PokemonCards.map(card => card.id)
      user.save();
    
      // res.redirect(307, "/api/login");
      res.json(dbCards);
    });
        

  });
  // PUT route for updating todos. We can get the updated todo data from req.body
  app.put("/api/cards/:id/:nickname", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
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
 
$(document).ready(() => {
  const addCardBtn = $(".addCardBtn");
  const delCardBtn = $(".delCardBtn");
  const $updateCardBtn = $(".updateCardBtn");
  const $mycards = $(".mycards")
  const $cardsDD = $(".dropdown-item")

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
    const userId = data.id;
    console.log("user data id:", userId)
    getCards(userId);
    
  });


  function loadCards(pokeCards) {
    console.log("pokecards to add: ", pokeCards);
    let $mycards = $(".mycards")
    $mycards.empty();
    const rowsToAdd = [];
    $mycards.append("<h2> Here are your Cards you Own </h2>")
   
    for (let i = 0; i < pokeCards.length; i++) {
      $mycards.append(`<div class="pokecard pokecard${pokeCards[i].energyType}">
      <br>Pokemon Name:${pokeCards[i].pokeName}</br>
      <br>Card No.: ${pokeCards[i].cardId}</br>
      <br>Attack: ${pokeCards[i].attack}</br>
      </div>`);
    }
  }
function getCards(userId) {
    console.log("user id is: ", userId)
    const queryUrl = "/api/cards/" + userId;
    console.log("query url: ", queryUrl)
    $.ajax({
      method: "GET",
      url: queryUrl,      
    }).then(data => {     
      console.log(data[0].Pokecharacters);      
      loadCards(data[0].Pokecharacters)
     
    });
  }

  function addCard() {
    const pokeCard = {
      pokeName: "Bulbasaur",
      energyType: "Grass",
      cardId: "001",
      attack: "Vine Whip",
      nickname: "new-card"
    }
    
    $.ajax({
      method: "POST",
      url: "/api/addcard/", 
      data: pokeCard
    }).then(data => {     
      console.log("Card added", data);
     
    });

  }

  function updateCard() {
    const id = 2;
    const nickname = 'green'
    $.ajax({
      method: "PUT",
      url: "/api/cards/" + id + "/" + nickname
      
    }).then(data => {     
      console.log("Card updated", data);
     
    });
  }

  function deleteCard() {
    // const id = $(this).data("id");
    const id = 5;
    const userId = 25;
    $.ajax({
      method: "DELETE",
      url: "/api/cards/" + id + "/" + userId
    }).then(data => {     
      console.log("Card Deleted", data);
     
    });
  }

  addCardBtn.on("click", event => {
    event.preventDefault();
    console.log("activated add card")
    addCard(); 
  });
  
  delCardBtn.on("click", event => {
    event.preventDefault();
    console.log("activated delete card")
    deleteCard()
  });

  $updateCardBtn.on("click", event => {
    event.preventDefault();    
    console.log("activated update card")
    updateCard()
  });


  $mycards.on("click", event => {
    event.preventDefault();    
    console.log("card selected with mycard", event.target)
    console.log("card selected with mycard", event.target.cardId)
    // updateCard()
  });

  $cardsDD.on("click", event => {
    event.preventDefault();
    let cardSel = event.target         
    console.log(typeof(event.target))
    const id = $(cardSel).attr('id')
    console.log("card selected id", id)
    // updateCard()
  });
});


 
$(document).ready(() => {
  const addCardBtn = $(".addCardBtn");
  const delCardBtn = $(".delCardBtn");
  const updateCardBtn = $("updateCardBtn");
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
      rowsToAdd.push(pokeCards[i].pokeName);
      $mycards.append(pokeCards[i].pokeName + "<br>");
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
    

  }

  function updateCard() {

  }

  function deleteCard() {
    const id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/todos/" + id
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
    
  });

  updateCardBtn.on("click", event => {
    event.preventDefault();    
    console.log("activated update card")
    updateCard()
  });
});

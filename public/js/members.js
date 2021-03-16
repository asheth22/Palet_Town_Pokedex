
$(document).ready(() => {

  const addCardBtn = $(".addCardBtn");
  const $cardsDD = $(".dropdown-item")
  const $nicknameBtn = $(".nicknameUpdate");
  let nicknameEl = $("#nickname")
  let nickname
  let id = 0;
  let userId;

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
    userId = data.id;
    getCards(userId);
  });

  //function to load and display all cards associated with the user who logged in
  function loadCards(pokeCards) {
    let $mycards = $(".mycards")
    $mycards.empty();
    $mycards.append("<h2> My Cards </h2>")
    for (let i = 0; i < pokeCards.length; i++) {
      $mycards.append(`<div class="pokecard pokecard${pokeCards[i].energyType}">
      <p>Pokemon Name:${pokeCards[i].pokeName}
      <button type="button" class='btn btn-xs btn-danger d-flex justify-content-center dc' id = ${pokeCards[i].id}> x </button></p>
      <p>Nickname: ${pokeCards[i].nickname}</p>
      <p>Card No.: ${pokeCards[i].cardId}</p>
      <p>Attack: ${pokeCards[i].attack}</p>     
      </div>`);
      $mycards.on("click", event => {
        event.preventDefault();
        let cardSel = event.target
        id = $(cardSel).attr('id')
        deleteCard()

      });
    }
  }
  //function to get all the cards from the server and load to the page
  function getCards(userId) {
    const queryUrl = "/api/cards/" + userId;
    $.ajax({
      method: "GET",
      url: queryUrl,
    }).then(data => {
      loadCards(data[0].Pokecharacters)
    });
  }

  //function that calls the post method to add the card and then reload the page so that the added card renders to page
  function addCard() {
    $.ajax({
      method: "POST",
      url: "/api/addcard/" + id
    }).then(data => {
      window.location.reload()
    });
  }

  //function that calls the put method that updates a column and then the page reloads so that the nickname is updated on the page
  function updateCard() {
    const updateURL = "/api/cards/" + id + "/" + nickname
    $.ajax({
      method: "PUT",
      url: updateURL
    }).then(data => {
      window.location.reload()
    });
  }

  //function that calls the delete mothod to remove a card from the page and then reloads the page to remove it
  function deleteCard() {
    $.ajax({
      method: "DELETE",
      url: "/api/cards/" + id
    }).then(data => {
      window.location.reload()
    });
  }

  //event listener for the add button
  addCardBtn.on("click", event => {
    event.preventDefault();
    addCard();
  });

  //function to remove a card that includes the event listener
  function removeCard() {
    $(".delCardBtn").on("click", event => {
      event.preventDefault();
      let cardSel = event.target
      id = $(cardSel).attr('id')
      deleteCard()
    });
  }

  //event listener to update
  $nicknameBtn.on("click", event => {
    event.preventDefault();
    nickname = nicknameEl.val().trim()
    updateCard()
  });

  //event listener
  $cardsDD.on("click", event => {
    event.preventDefault();
    let cardSel = event.target
    id = $(cardSel).attr('id')
  });

  //event listener
  $(".updateCardBtn").on("click", function (event) {
    event.preventDefault();
    popup();
  });

  //event listener
  $(".dropdown-item").on("click", function (event) {
    event.preventDefault();
    let pokemonSelected = this.innerHTML;
    selectPokemon(pokemonSelected);
  });

  //close the modal
  //selcts the pokemon add changes it 
  var modal = document.getElementById("myModal");
  function selectPokemon(pokemon) {
    let mePokemon = pokemon
    $(".meMenu").html(mePokemon);
  };

  //close the modal
  function closeWindow() {
    modal.style.display = "none";
  };

  //open the modal
  function popup() {
    modal.style.display = "block";
    $(".close").on("click", function (event) {
      closeWindow();
    });
  }
});
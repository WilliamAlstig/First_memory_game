document.addEventListener("DOMContentLoaded", () => {
  const images = [
      "chicken_car.jpg",
      "leopard_auditt.png",
      "porsche_911.png",
      "rusty_volvo240.jpg",
      "vet_inte_ens_vad_jag_ska_saga.jpg",
      "volvo_v70.png"
  ];

  // Dubbel uppsättning av bilderna och blanda dem
  const cardImages = shuffle([...images, ...images]);

  const cards = document.querySelectorAll(".spelKortBild");
  let flippedCards = [];
  let matchedCards = 0;

  // Tilldela bilderna till korten
  cards.forEach((card, index) => {
      card.dataset.image = cardImages[index]; // Spara bildnamnet i data-attributet
      card.addEventListener("click", flipCard);
  });

  function flipCard() {
      if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
          this.classList.add("flipped");
          this.src = this.dataset.image; // Sätt bildens src till rätt bild
          flippedCards.push(this);

          if (flippedCards.length === 2) {
              checkForMatch();
          }
      }
  }

  function checkForMatch() {
      const [firstCard, secondCard] = flippedCards;

      if (firstCard.dataset.image === secondCard.dataset.image) {
          matchedCards += 2; // Öka antal matchade kort
          flippedCards = [];
          if (matchedCards === cards.length) {
            setTimeout(() => {
                alert("Grattis! Du har hittat alla par!"); 
                location.reload(); // Uppdatera sidan när användaren trycker "OK"
            }, 500);
        
          }
      } else {
          setTimeout(() => {
              firstCard.classList.remove("flipped");
              secondCard.classList.remove("flipped");
              firstCard.src = "spelkortBaksida.jpg"; // Återställ baksida
              secondCard.src = "spelkortBaksida.jpg";
              flippedCards = [];
          }, 1000);
      }
  }

  function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]]; // Swap element
      }
      return array;
  }
});

const cards = document.querySelectorAll(".card");

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard({ target: clickedCard }) {
  if (cardOne !== clickedCard && !disableDeck) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;

    let cardOneImg = cardOne.querySelector(".back-view img").src;
    let cardTwoImg = cardTwo.querySelector(".back-view img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matched++;
    if (matched === 8) {
      setTimeout(shuffleCard, 1000);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    resetCards();
  } else {
    setTimeout(() => {
      cardOne.classList.add("shake");
      cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
      cardOne.classList.remove("shake", "flip");
      cardTwo.classList.remove("shake", "flip");
      resetCards();
    }, 1200);
  }
}

function resetCards() {
  [cardOne, cardTwo, disableDeck] = [null, null, false];
}

function shuffleCard() {
  matched = 0;
  resetCards();
  let arr = [1, 2, 3, 4, 5, 6, 7, 8];
  arr = [...arr, ...arr].sort(() => Math.random() - 0.5);

  cards.forEach((card, index) => {
    card.classList.remove("flip");
    let img = card.querySelector(".back-view img");
    img.src = `images/img-${arr[index]}.png`;
    card.addEventListener("click", flipCard);
  });
}

shuffleCard();
cards.forEach(card => card.addEventListener("click", flipCard));

// Swiper slider init
new Swiper('.card-wrapper', {
  loop: false,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    0: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 3
    }
  }
});

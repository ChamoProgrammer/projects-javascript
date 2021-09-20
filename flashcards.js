var contenido_array = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

document.getElementById("save_card").addEventListener("click", () => {
  agregar_tarjeta();
});

document.getElementById("delete_cards").addEventListener("click", () => {
  localStorage.clear();
  flashcards.innerHTML = '';
  contenido_array = [];
});

document.getElementById("show_card_box").addEventListener("click", () => {
  document.getElementById("create_card").style.display = "block";
});

document.getElementById("close_card_box").addEventListener("click", () => {
  document.getElementById("create_card").style.display = "none";
});

flashcardMaker = (text) => {
  const flashcard = document.createElement("div");
  const question = document.createElement('h2');
  const answer = document.createElement('h2');

  flashcard.className = 'flashcard';

  question.setAttribute("style", "border-top:1px solid red; padding: 15px; margin-top:30px");
  question.textContent = text.my_question;

  answer.setAttribute("style", "text-align:center; display:none; color:red");
  answer.textContent = text.my_answer;

  flashcard.appendChild(question);
  flashcard.appendChild(answer);

  flashcard.addEventListener("click", () => {
    if(answer.style.display == "none")
      answer.style.display = "block";
    else
      answer.style.display = "none";
  })

  document.querySelector("#flashcards").appendChild(flashcard);
}

contenido_array.forEach(flashcardMaker);

agregar_tarjeta = () => {
  const question = document.querySelector("#question");
  const answer = document.querySelector("#answer");

  let flashcard_info = {
    'my_question' : question.value,
    'my_answer'  : answer.value
  }

  contenido_array.push(flashcard_info);
  localStorage.setItem('items', JSON.stringify(contenido_array));
  flashcardMaker(contenido_array[contenido_array.length - 1]);
  question.value = "";
  answer.value = "";
}
function clearAllCards()
{
    localStorage.clear();
}


function saveCard(myCard) {
   var cards = JSON.parse(localStorage.getItem('cards'));
   if(cards == null)
   {
     cards = [];
   }
   cards.push(myCard);
   let data = JSON.stringify(cards);
   localStorage.setItem('cards', data);
}

function saveCards(){
    let data = JSON.stringify(cards);
    localStorage.setItem('cards', data);
    let read = JSON.parse(localStorage.getItem('cards'));
    console.log(read);
}
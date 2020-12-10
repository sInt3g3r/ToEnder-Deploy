function addTask(task) {
   var cards = JSON.parse(localStorage.getItem('cards'));
   if(cards == null)
   {
     cards = [];
   }
   cards.push(task);
   let data = JSON.stringify(cards);
   localStorage.setItem('cards', data);
   console.log(JSON.parse(localStorage.getItem('cards')));
}

// function saveCards(){
//     let data = JSON.stringify(cards);
//     localStorage.setItem('cards', data);
//     let read = JSON.parse(localStorage.getItem('cards'));
//     console.log(read);
// }
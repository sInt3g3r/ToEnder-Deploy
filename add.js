function load() {
  document.getElementById("btnCancel").addEventListener("click", () => (window.location='/index.html'));
  document.getElementById("btnSave").addEventListener("click", saveTask);
}

function saveTask()
{
    const title = document.getElementById("title").value;
    const text = document.getElementById("description").value; 
    const date = document.getElementById("date").valueAsDate;
    var done = 0;
    if(document.getElementById("cbDone").checked == true)
    {
        done = 1;
    }
    var myTask = {"title":title,"text":text,"date":date.getDate()+'.'+date.getMonth()+'.'+date.getFullYear(),"done":done};
    addTask(myTask);
    window.location='index.html';
};

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
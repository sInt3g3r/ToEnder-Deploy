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
    
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    if(tasks == null || tasks.length == 0)
    {
      var id = 0;
    }
    else
    {
      var id = tasks[tasks.length-1].id;
      id++;
    }
    var myTask = {"id":id,"title":title,"text":text,"date":date.getDate()+'.'+(date.getMonth()+1)+'.'+date.getFullYear(),"done":done};
    addTask(myTask);
    window.location='index.html';
};

function addTask(task) {
   var tasks = JSON.parse(localStorage.getItem('tasks'));
   if(tasks == null)
   {
     tasks = [];
   }
   tasks.push(task);
   let data = JSON.stringify(tasks);
   localStorage.setItem('tasks', data);
   console.log(JSON.parse(localStorage.getItem('tasks')));
}
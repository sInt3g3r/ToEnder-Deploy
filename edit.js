var editIndex = null;

function load() {
  document.getElementById("btnCancel").addEventListener("click", () => (window.location='/index.html'));
  document.getElementById("btnSave").addEventListener("click", saveTask);
  document.getElementById("btnTest").addEventListener("click", getEditTask);
  getEditTask();
}

function getEditTask()
{
  var editID = localStorage.getItem('editID');
  if(editID != null)
  {
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    if(tasks != null)
    {
      for(var i = 0; i < tasks.length ;i++)
      {
        if(tasks[i].id == editID)
        {
          editIndex = i;
          // console.log(tasks[i]);
        }
      }
      //  var ele = document.getElementById("date")
      //  console.log(ele);
      //console.log();
      document.getElementById("title").value = tasks[editIndex].title;
      document.getElementById("description").value = tasks[editIndex].text;
      var splitDate = tasks[editIndex].date.split('.');
      // console.log(splitDate);
      var taskDate = new Date(splitDate[2]+"-"+splitDate[1]+"-"+splitDate[0]);
      // console.log(taskDate);
      document.getElementById("date").valueAsDate = taskDate;
      if(tasks[editIndex].done == 1)
      {
        document.getElementById("cbDone").checked = true;
      }
      else
      {
        document.getElementById("cbDone").checked = false;
      }
    }
  }
  localStorage.removeItem('editID');
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
    tasks[editIndex].title = title;
    tasks[editIndex].text = text;
    tasks[editIndex].date = date.getDate()+'.'+(date.getMonth()+1)+'.'+date.getFullYear();
    tasks[editIndex].done = done;
    console.log(tasks[editIndex]);
    let data = JSON.stringify(tasks);
    localStorage.setItem('tasks', data);
    window.location='index.html';
};
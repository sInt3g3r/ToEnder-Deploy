var activeMonth = 01;

var monthView = {
        "empty":00,
        "Januar":01,
        "Februar":02,
        "März":03,
        "April":04,
        "Mai":05,
        "Juni":06,
        "Juli":07,
        "August":08,
        "September":09,
        "Oktober":10,
        "November":11,
        "Dezember":12
    }

function load() {
    document.getElementById("btnErfassen").addEventListener("click", () => (window.location='/add.html'));
    //document.getElementById("btnTest").addEventListener("click", () => generateEmptyTasks(12));
    document.getElementById("btnTest").addEventListener("click", () => clearAllTasks());

    //generate Month Selection
    for(var i = 1; i < 13; i++)
    {
        currentMonth = Object.keys(monthView)[i];
        document.getElementById("monthSelect").innerHTML += `<input type="button" value="${currentMonth}" id="M${i}">`;
    }

    for(var i = 1; i < 13; i++)
    {
        var btnName = "M" + i; 
        document.getElementById(btnName).addEventListener("click", (event) => selectMonth(event));
    }

}

function clearAllTasks()
{
    localStorage.clear();
}

function selectMonth(event)
{
    for(var i = 1; i < 13; i++)
    {
        var btnName = "M" + i; 
        document.getElementById(btnName).classList.remove("btnClicked");
    }
    var target = event.target;
    target.classList.add("btnClicked");
    activeMonth = monthView[target.value];
    //console.log(activeMonth);
    generateEmptyTasks(activeMonth);
}

function generateEmptyTasks(_month)
{
    var today = new Date();
    var genDate = new Date(today.getFullYear()+'-'+_month+'-'+'01');
    //console.log(genDate.toString());
    //console.log(genDate.getMonth());
    //console.log(_month-1);
    var myMonth = [];
    while(genDate.getMonth() == _month-1)
    {
        myMonth.push(genDate.getDate()+'.'+(genDate.getMonth()+1)+'.'+genDate.getFullYear());
        var myDay = genDate.getDate()+1;
        genDate.setDate(myDay);
    }

    for(var i=0; i < 5; i++)
    {
        document.getElementById("week"+i).innerHTML = ``;
    }

    //console.log(searchForTask("22.11.2020"));

    var weekId = 0;
    myMonth.forEach(date => {
        var week0ele = document.getElementById("week"+weekId);
        var count = week0ele.getElementsByClassName("card").length;
        //console.log(count);

        if(count == 7)
        {
            weekId++;
            count = 0;
        }
        var tasks = searchForTask(date);
        if(tasks != null)
        {
            //console.log(tasks);
        }

        
        var htmlCardStr = `<div class="card" id="${date}">
                            <div class="cardDate">${date}</div>`;
        if(tasks != null)
        {
            tasks.forEach(task => {
                    htmlCardStr += `<div class="task">
                                    <textarea rows="3" cols="20" readonly>${task.title}</textarea>
                                    <br>
                                    <button type="button" id="del${task.id}">Delete</button> 
                                    <button type="button" id="edit${task.id}">Edit</button> 
                                    </div>`;
            });
        }
        htmlCardStr += `</div>`;
        //console.log(htmlCardStr);


        document.getElementById("week"+weekId).innerHTML += htmlCardStr;
    });

    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if(tasks != null)
    {
        for(var i=0; i < tasks.length; i++)
        {
            var delBtn = document.getElementById("del"+tasks[i].id);
            if(delBtn != null)
            {
                delBtn.addEventListener("click", (event) => deleteTask(event));
            }
            var editBtn = document.getElementById("edit"+tasks[i].id);
            if(editBtn != null)
            {
                editBtn.addEventListener("click", (event) => editTask(event));
            }
        }
    }

}

function searchForTask(_date)
{
    var taskOnDate = [];
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if(tasks != null)
    {
        for(var i=0; i < tasks.length; i++)
        {
            if(tasks[i].date == _date)
            {
                taskOnDate.push(tasks[i]);
            }
        }
    }
    if(taskOnDate.length < 1)
    {
        return null;
    }
    else
    {
        return taskOnDate;
    }
}

function deleteTask(event)
{
    const btnId  = event.target.id.substring(3,event.target.id.length);
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let id = null;
    if(tasks != null)
    {
        for(var i=0; i < tasks.length; i++)
        {
            if(tasks[i].id == btnId)
            {
                id = tasks[i].id;
                break;
            }
        }
        tasks.splice(id,1);
        let data = JSON.stringify(tasks);
        localStorage.setItem('tasks', data);
        console.log(JSON.parse(localStorage.getItem('tasks')));
    }
}

function editTask(event)
{
    const btnId  = event.target.id.substring(4,event.target.id.length);
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let id = null;
    if(tasks != null)
    {
        for(var i=0; i < tasks.length; i++)
        {
            if(tasks[i].id == btnId)
            {
                id = tasks[i].id;
                break;
            }
        }
    }
    console.log(id);
    //window.location = '/add.html'
}
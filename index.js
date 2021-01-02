var activeMonthBtn = null;

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
    document.getElementById("btnClear").addEventListener("click", () => clearAllTasks());

    //generate Month Selection
    for(var i = 1; i < 13; i++)
    {
        currentMonth = Object.keys(monthView)[i];
        document.getElementById("monthSelect").innerHTML += `<input type="button" value="${currentMonth}" id="M${i}">`;
    }

    for(var i = 1; i < 13; i++)
    {
        var btnName = "M" + i; 
        document.getElementById(btnName).addEventListener("click", (event) => selectMonth(event,null));
        if(i == 1)
        {
            activeMonthBtn = document.getElementById(btnName);
        }
    }
    selectMonth(null,1);
    console.log(JSON.parse(localStorage.getItem('tasks')));
}

function clearAllTasks()
{
    if(confirm("ACHTUNG: Es werden ALLE Einträge gelöscht. Wirklich Löschen?"))
    {
        localStorage.clear();
    }
}

function selectMonth(event,month)
{
    if(month == null)
    {
        for(var i = 1; i < 13; i++)
        {
            var btnName = "M" + i; 
            document.getElementById(btnName).classList.remove("btnClicked");
        }
        activeMonthBtn = event.target;
        activeMonthBtn.classList.add("btnClicked");
        var activeMonth = monthView[activeMonthBtn.value];
        generateEmptyTasks(activeMonth);
    }
    else
    {
        var btnName = "M" + month;
        activeMonthBtn = document.getElementById(btnName);
        activeMonthBtn.classList.add("btnClicked");
        generateEmptyTasks(month);
    }  
}

function generateEmptyTasks(_month)
{
    var today = new Date();
    var genDate = new Date(today.getFullYear()+'-'+_month+'-'+'01');
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

    var weekId = 0;
    myMonth.forEach(date => {
        var week0ele = document.getElementById("week"+weekId);
        var count = week0ele.getElementsByClassName("card").length;

        if(count == 7)
        {
            weekId++;
            count = 0;
        }
        var tasks = searchForTask(date);
        var htmlCardStr = `<div class="card" id="${date}">
                            <div class="cardDate">${date}</div>`;
        if(tasks != null)
        {
            tasks.forEach(task => {
                    htmlCardStr += `<div class="task">
                                    <textarea rows="3" cols="20" readonly>${task.title}</textarea>
                                    <br>
                                    <button type="button" id="del${task.id}" class="btnTask">Delete</button> 
                                    <button type="button" id="edit${task.id}" class="btnTask">Edit</button> 
                                    </div>`;
            });
        }
        htmlCardStr += `</div>`;
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
                delBtn.classList.add("btnHover");
                delBtn.classList.add("btnTask");
            }
            var editBtn = document.getElementById("edit"+tasks[i].id);
            if(editBtn != null)
            {
                editBtn.addEventListener("click", (event) => editTask(event));
                editBtn.classList.add("btnHover");
                editBtn.classList.add("btnTask");
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
    if(confirm("Task wirklich Löschen?"))
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
                    id = i;
                    break;
                }
            }
            tasks.splice(id,1);
            let data = JSON.stringify(tasks);
            localStorage.setItem('tasks', data);
        }
    }
    selectMonth(null,monthView[activeMonthBtn.value]);
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
    localStorage.setItem('editID', id);
    window.location = '/edit.html'
}
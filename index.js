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
    //document.getElementById("btnTest").addEventListener("click", () => generateEmptyCards(12));
    document.getElementById("btnTest").addEventListener("click", () => clearAllCards());

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

function clearAllCards()
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
    generateEmptyCards(activeMonth);
}

function generateEmptyCards(_month)
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

    //console.log(searchForCard("22.11.2020"));

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
        var actualCard = searchForCard(date);
        if(actualCard != null)
        {
            console.log(actualCard);
        }
        document.getElementById("week"+weekId).innerHTML +=
        `
        <div class="card">
            <div class="cardDate">${date}</div>
            <div class="cardTitle">Titel</div>
            <div class="cardText">Text</div>
        </div>
        `;
    });
}

function searchForCard(_date)
{
    const cards = JSON.parse(localStorage.getItem('cards'));
    for(var i=0; i < cards.length; i++)
    {
        if(cards[i].date == _date)
        {
            return cards[i];
        }
    }
    return null
}



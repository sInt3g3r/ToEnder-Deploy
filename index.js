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
    console.log(activeMonth);
}

function generateEmptyCards()
{
    
}



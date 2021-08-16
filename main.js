let current_time = document.getElementById('current_time');
function C_time() {
    let getTime = new Date();
    return current_time.value = getTime.toLocaleTimeString('en-GB');
}
setInterval(() => {
    C_time();
}, 1000);
validation();
showTodos();
//Can select current time
function validation() {
    let select_routine = document.getElementById('select_routine');
    let todos = localStorage.getItem("todos")
    // Check if conditions are met or not
    let todosObjj = [];
    if (todos != null) {
        todosObjj = JSON.parse(todos);
    }
    if (todosObjj.length != 0) {
        select_routine.removeAttribute('disabled');
        return true;

    } else {
        let attsettter = document.createAttribute('disabled');
        attsettter.value = 'disabled';
        select_routine.setAttributeNode(attsettter);
        return false;
    }
}
function added_validation(title) {
    let routine_empty = document.getElementById('routine_empty');
    validation();
    if (validation()) {
        if (typeof (routine_empty) != 'undefined' && routine_empty != null) {
            routine_empty.remove();

        }
        let select_routine = document.getElementById('select_routine');
        select_routine.innerHTML += `<option>${title}</option>`;
    } else {
        console.log('not added');
    }
}
function no_name_validator(check) {

}


//Function to get total time
function Ttl_time(totalTime) {
    let getTime = new Date().toLocaleTimeString('en-GB');
    let tt_time = new Date(totalTime);
    let timeLeft = getTime - tt_time;
    if (timeLeft <= 0) {
        return "Time Out";
    } else if (timeLeft >= 24) {
        return "Invalid Time";
    } else {
        return timeLeft;
    }
}
function Total_time(totalTime) {
    Ttl_time(totalTime);
}

// Function to calculate wakeup and sleep time difference
function wake_sleep(wakeTime, sleepTime) {
    return sleepTime - wakeTime;
}
//Function to add Routine and To do's
addBtn.addEventListener("click", add_btn);
function add_btn() {
    console.log('added');
    //adding elements
    let routine_name = document.getElementById('routine_name');
    let wakeup_time = document.getElementById('wakeup_time');
    let sleep_time = document.getElementById('sleep_time');
    let select_routine = document.getElementById('routine_name');
    let Notename = document.getElementById('Notename');
    let TimeLen = document.getElementById('TimeLen');
    let notification = document.getElementById('notification');
    let addBtn = document.getElementById('addBtn');

    let time_diff = wake_sleep(wakeup_time, sleep_time);

    let todos = localStorage.getItem("todos")
    // Check if conditions are met or not
    if (todos == null) {
        todosObj = [];
    } else {
        todosObj = JSON.parse(todos);
    }
    let routineList = {
        rt_name: routine_name.value,
        time_diff: time_diff,
        routine: select_routine.checked,
        name: Notename.value,
        time: TimeLen.value,
        notification: notification,
        curtime: current_time.value,
    };
    todosObj.push(routineList);
    localStorage.setItem("todos", JSON.stringify(todosObj));
    added_validation(routine_name.value);
    showTodos();
}

function showTodos() {
    let todos = localStorage.getItem("todos")
    // Check if conditions are met or not
    if (todos == null) {
        todosObj = [];
    } else {
        todosObj = JSON.parse(todos);
    }

    let todospace = document.getElementById('todoSpace');
    let todosCard = "";
    let todosCard2 = "";
    todosObj.forEach((todo, index) => {
        console.log(Total_time(todo.time));
        todosCard += `
       <div class="card my-3">
       <div class="card-header">
         <b>Routine Name: ${todo.rt_name}</b>
       </div>
       <div class="card-body">
         <span class="d-flex">
           <span class="w-50">
             <h5 class="card-title">Time Table</h5>
           </span>
           <span class="w-50" style="position: relative;">
             <p class="total_time" id="totalTime_${index}">Total Time Left: ${Total_time(todo.time)}</p>
           </span>
         </span>
         <div class="form-check">
           <div id="routine_todos_${index}" class="d-flex routine_todos">

           </div>
         </div>
         <br>
         <a href="#" id="${index}" onclick="deletetodo(this.id)" class="btn btn-primary">Delete</a>
       </div>
     </div>`});
    if (todosObj.length != 0) {
        todospace.innerHTML = todosCard;
        let routine_todos;
        todosObj.forEach((todo, index) => {
            routine_todos = document.getElementById(`routine_todos_${index}`);
            todosCard2 += `
            <span class="d-flex nopad">
              <span class="routine_note_time">
                <p>${todo.curtime} => </p>
              </span>
              <span>
                <input class="form-check-input" type="checkbox" value="">${todo.name}
              </span>
            </span>`;
        });
        routine_todos.innerHTML = todosCard2;
    } else {
        todospace.innerHTML = `Nothing to show! Add a Routine first`;
    }
}
function deletetodo(index) {

    let todos = localStorage.getItem("todos");
    if (todos == null) {
        todosObj = [];
    } else {
        todosObj = JSON.parse(todos);
    }
    // btnclkMessage(`danger`, `Note, ${todosObj[index].title} has been deleted from the storage`);
    todosObj.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todosObj));
    showTodos();
}
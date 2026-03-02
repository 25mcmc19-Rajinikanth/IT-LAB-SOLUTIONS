let tasks = []; 

function addTask() {
    let taskText = document.getElementById("taskInput").value;
    let dueDate = document.getElementById("dueDate").value;

    if (taskText === "" || dueDate === "") {
        alert("Please enter task and due date");
        return;
    }

    let task = {
        text: taskText,
        due: new Date(dueDate),
        completed: false
    };

    tasks.push(task);

    sortTasksByDate();
    displayTasks(tasks);

    document.getElementById("taskInput").value = "";
    document.getElementById("dueDate").value = "";
}

function displayTasks(taskArray) {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    taskArray.forEach((task, index) => {
        let li = document.createElement("li");

        li.innerHTML =
            task.text +
            " (Due: " + task.due.toDateString() + ") ";

        if (task.completed) {
            li.classList.add("completed");
        }

        
        let doneBtn = document.createElement("button");
        doneBtn.innerText = "Done";
        doneBtn.onclick = function () {
            tasks[index].completed = !tasks[index].completed;
            displayTasks(tasks);
        };

       
        let delBtn = document.createElement("button");
        delBtn.innerText = "Delete";
        delBtn.onclick = function () {
            tasks.splice(index, 1);
            displayTasks(tasks);
        };

        li.appendChild(doneBtn);
        li.appendChild(delBtn);
        list.appendChild(li);
    });
}

function showAll() {
    displayTasks(tasks);
}

function showCompleted() {
    let completedTasks = tasks.filter(task => task.completed);
    displayTasks(completedTasks);
}

function showPending() {
    let pendingTasks = tasks.filter(task => !task.completed);
    displayTasks(pendingTasks);
}

function sortTasksByDate() {
    tasks.sort((a, b) => a.due - b.due);
}

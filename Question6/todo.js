var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["Pending"] = 0] = "Pending";
    TaskStatus[TaskStatus["Completed"] = 1] = "Completed";
})(TaskStatus || (TaskStatus = {}));
var Task = /** @class */ (function () {
    function Task(id, title, date) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.status = TaskStatus.Pending;
    }
    Task.prototype.markCompleted = function () {
        this.status = TaskStatus.Completed;
    };
    return Task;
}());

var tasks = [];
var taskId = 1;

var taskInput = document.getElementById("taskInput");
var dateInput = document.getElementById("dueDate");
var taskList = document.getElementById("taskList");

function addTaskFromUI() {
    var title = taskInput.value;
    var date = dateInput.value;
    if (title === "" || date === "") {
        alert("Enter task and date");
        return;
    }
    var newTask = new Task(taskId++, title, date);
    tasks.push(newTask);
    taskInput.value = "";
    dateInput.value = "";
    showAll();
}

function displayTasksWithFilter(filter) {
    taskList.innerHTML = "";
    var _loop_1 = function (task) {
        if (filter === "completed" && task.status !== TaskStatus.Completed)
            return "continue";
        if (filter === "pending" && task.status !== TaskStatus.Pending)
            return "continue";
        var li = document.createElement("li");
        li.innerText =
            task.title + " - " + task.date + " - " + TaskStatus[task.status];
        li.onclick = function () {
            task.markCompleted();
            displayTasksWithFilter(filter);
        };
        taskList.appendChild(li);
    };
    for (var _i = 0, tasks_1 = tasks; _i < tasks_1.length; _i++) {
        var task = tasks_1[_i];
        _loop_1(task);
    }
}

function showAll() {
    displayTasksWithFilter("all");
}
function showCompleted() {
    displayTasksWithFilter("completed");
}
function showPending() {
    displayTasksWithFilter("pending");
}

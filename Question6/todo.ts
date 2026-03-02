enum TaskStatus {
    Pending,
    Completed
}

class Task {
    id: number;
    title: string;
    date: string;
    status: TaskStatus;

    constructor(id: number, title: string, date: string) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.status = TaskStatus.Pending;
    }

    markCompleted(): void {
        this.status = TaskStatus.Completed;
    }
}

// Data
let tasks: Task[] = [];
let taskId: number = 1;

// DOM elements
const taskInput = document.getElementById("taskInput") as HTMLInputElement;
const dateInput = document.getElementById("dueDate") as HTMLInputElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;

// Add task
function addTaskFromUI(): void {
    const title: string = taskInput.value;
    const date: string = dateInput.value;

    if (title === "" || date === "") {
        alert("Enter task and date");
        return;
    }

    const newTask = new Task(taskId++, title, date);
    tasks.push(newTask);

    taskInput.value = "";
    dateInput.value = "";

    showAll();
}

// Display with filter
function displayTasksWithFilter(filter: "all" | "completed" | "pending"): void {
    taskList.innerHTML = "";

    for (let task of tasks) {

        if (filter === "completed" && task.status !== TaskStatus.Completed)
            continue;

        if (filter === "pending" && task.status !== TaskStatus.Pending)
            continue;

        const li = document.createElement("li");
        li.innerText =
            task.title + " - " + task.date + " - " + TaskStatus[task.status];

        li.onclick = () => {
            task.markCompleted();
            displayTasksWithFilter(filter);
        };

        taskList.appendChild(li);
    }
}

// Filter functions
function showAll(): void {
    displayTasksWithFilter("all");
}

function showCompleted(): void {
    displayTasksWithFilter("completed");
}

function showPending(): void {
    displayTasksWithFilter("pending");
}

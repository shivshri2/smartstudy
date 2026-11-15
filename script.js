// Get elements from HTML
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

// Load previously saved tasks
let tasks = JSON.parse(localStorage.getItem("smartStudyTasks")) || [];


// Display tasks on the website
function displayTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.innerHTML = "<p>No tasks added yet.</p>";
    }

    tasks.forEach(function(task, index) {

        const taskCard = document.createElement("div");
        taskCard.className = "task-item";

        const title = document.createElement("h3");
        title.textContent = task.title;

        const subject = document.createElement("p");
        subject.textContent = "Subject: " + task.subject;

        const date = document.createElement("p");
        date.textContent = "Due Date: " + task.date.split("-").reverse().join("-");

        const priority = document.createElement("p");
        priority.textContent = "Priority: " + task.priority;

        const status = document.createElement("p");
        status.textContent = task.completed ? "Completed" : "Pending";

        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Undo" : "Mark Complete";

        completeButton.addEventListener("click", function() {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            tasks.splice(index, 1);
            saveTasks();
        });

        taskCard.appendChild(title);
        taskCard.appendChild(subject);
        taskCard.appendChild(date);
        taskCard.appendChild(priority);
        taskCard.appendChild(status);
        taskCard.appendChild(completeButton);
        taskCard.appendChild(deleteButton);

        taskList.appendChild(taskCard);

    });

    updateStatistics();
}


// Save tasks in browser storage
function saveTasks() {

    localStorage.setItem("smartStudyTasks", JSON.stringify(tasks));

    displayTasks();
}


// Add a new task
taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const newTask = {

        title: document.getElementById("taskTitle").value,
        subject: document.getElementById("taskSubject").value,
        date: document.getElementById("taskDate").value,
        priority: document.getElementById("taskPriority").value,
        completed: false

    };

    tasks.push(newTask);

    saveTasks();

    taskForm.reset();

});


// Update dashboard statistics
// Update dashboard statistics and progress report

function updateStatistics() {

    const statCards = document.querySelectorAll(".stat-card p");

    const savedSubjects = JSON.parse(
        localStorage.getItem("smartStudySubjects")
    ) || [];

    const savedRevisions = JSON.parse(
        localStorage.getItem("smartStudyRevisions")
    ) || [];

    const completedTasks = tasks.filter(
        task => task.completed
    ).length;

    const completedRevisions = savedRevisions.filter(
        revision => revision.completed
    ).length;

    // Dashboard statistics

    statCards[0].textContent = savedSubjects.length;
    statCards[1].textContent = tasks.length;
    statCards[2].textContent = completedTasks;
    statCards[3].textContent = tasks.length - completedTasks;


    // Progress report statistics

    document.getElementById("reportSubjects").textContent = savedSubjects.length;

    document.getElementById("reportTasks").textContent = tasks.length;

    document.getElementById("reportCompleted").textContent = completedTasks;

    document.getElementById("reportPending").textContent =
        tasks.length - completedTasks;

    document.getElementById("reportRevisions").textContent =
        completedRevisions;


    // Calculate completion percentage

    const percentage = tasks.length === 0
        ? 0
        : Math.round((completedTasks / tasks.length) * 100);

    document.getElementById("completionPercentage").textContent =
        percentage + "%";

    document.getElementById("progressBarFill").style.width =
        percentage + "%";

}


// Display saved tasks when website opens
displayTasks();

// MY SUBJECTS FUNCTIONALITY

const subjectForm = document.getElementById("subjectForm");
const subjectList = document.getElementById("subjectList");

// Load saved subjects
let subjects = JSON.parse(localStorage.getItem("smartStudySubjects")) || [];


// Display subjects
function displaySubjects() {

    subjectList.innerHTML = "";

    if (subjects.length === 0) {
        subjectList.innerHTML = "<p>No subjects added yet.</p>";
        return;
    }

    subjects.forEach(function(subject, index) {

        const card = document.createElement("div");
        card.className = "subject-card";

        const heading = document.createElement("h3");
        heading.textContent = subject;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {

            subjects.splice(index, 1);

            saveSubjects();

        });

        card.appendChild(heading);
        card.appendChild(deleteButton);

        subjectList.appendChild(card);

    });

}


// Save subjects
function saveSubjects() {

    localStorage.setItem("smartStudySubjects", JSON.stringify(subjects));

    displaySubjects();
updateStatistics();
}


// Add subject
subjectForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const subjectName = document.getElementById("subjectName").value.trim();

    if (subjects.some(subject => subject.toLowerCase() === subjectName.toLowerCase())) {
        alert("This subject already exists!");
        return;
    }

    subjects.push(subjectName);

    saveSubjects();

    subjectForm.reset();

});


// Show saved subjects when website opens
displaySubjects();

// REVISION TRACKER FUNCTIONALITY

const revisionForm = document.getElementById("revisionForm");
const revisionList = document.getElementById("revisionList");

// Load previously saved revision topics
let revisions = JSON.parse(localStorage.getItem("smartStudyRevisions")) || [];


// Display revision topics
function displayRevisions() {

    revisionList.innerHTML = "";

    if (revisions.length === 0) {
        revisionList.innerHTML = "<p>No revision topics added yet.</p>";
        return;
    }

    revisions.forEach(function(revision, index) {

        const card = document.createElement("div");
        card.className = "revision-card";

        const heading = document.createElement("h3");
        heading.textContent = revision.topic;

        const subject = document.createElement("p");
        subject.textContent = "Subject: " + revision.subject;

        const date = document.createElement("p");
        date.textContent = "Revision Date: " + revision.date.split("-").reverse().join("-");

        const status = document.createElement("p");
        status.textContent = revision.completed ? "Status: Revised" : "Status: Pending";

        const completeButton = document.createElement("button");

        completeButton.textContent = revision.completed
            ? "Mark as Pending"
            : "Mark as Revised";

        completeButton.addEventListener("click", function() {

            revisions[index].completed = !revisions[index].completed;

            saveRevisions();

        });

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.style.marginLeft = "10px";
        deleteButton.style.backgroundColor = "#ffe5e5";
        deleteButton.style.color = "#c0392b";

        deleteButton.addEventListener("click", function() {

            revisions.splice(index, 1);

            saveRevisions();

        });

        card.appendChild(heading);
        card.appendChild(subject);
        card.appendChild(date);
        card.appendChild(status);
        card.appendChild(completeButton);
        card.appendChild(deleteButton);

        revisionList.appendChild(card);

    });

}


// Save revision topics
function saveRevisions() {

    localStorage.setItem("smartStudyRevisions", JSON.stringify(revisions));

    displayRevisions();

    updateStatistics();

}


// Add a new revision topic
revisionForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const newRevision = {

        subject: document.getElementById("revisionSubject").value.trim(),
        topic: document.getElementById("revisionTopic").value.trim(),
        date: document.getElementById("revisionDate").value,
        completed: false

    };

    revisions.push(newRevision);

    saveRevisions();

    revisionForm.reset();

});


// Display saved revision topics when website opens
displayRevisions();
// Dynamic Dashboard Greeting
const greeting = document.getElementById("greeting");
const currentHour = new Date().getHours();

if (currentHour >= 5 && currentHour < 12) {
    greeting.textContent = "Good Morning!";
} else if (currentHour >= 12 && currentHour < 17) {
    greeting.textContent = "Good Afternoon!";
} else if (currentHour >= 17 && currentHour < 21) {
    greeting.textContent = "Good Evening!";
} else {
    greeting.textContent = "Welcome Back!";
}
// Display Current Date
const dateElement = document.getElementById("currentDate");

const today = new Date();

dateElement.textContent = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
});
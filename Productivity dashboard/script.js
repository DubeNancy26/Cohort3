const todoCard = document.querySelector('[data-feature="todo"]');
const featureView = document.querySelector("#feature-view");

const backbutton = document.querySelector("#back-button");
const addTaskButton = document.querySelector("#add-task");
const clearAllButton = document.querySelector("#clear-all");

const taskInput = document.querySelector('input[type="text"]');
const taskList = document.querySelector("#task-list");
const taskCount = document.querySelector("#task-count");

const currentDate = document.querySelector("#current-date");
const currentTime = document.querySelector("#current-time");


const plannerDate = document.querySelector("#planner-date");
const plannerText = document.querySelector("#planner-text");
const savePlanButton = document.querySelector("#save-plan");
const planMessage = document.querySelector("#plan-message");

const quoteContent = document.querySelector("#quote-content");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];



const featureCards = document.querySelectorAll(".feature-card");

const featureContents = {
    todo: document.querySelector("#todo-content"),
    planner: document.querySelector("#planner-content"),
    pomodoro: document.querySelector("#pomodoro-content"),
    quote: document.querySelector("#quote-content"),
    weather: document.querySelector("#weather-content"),
    goals: document.querySelector("#goals-content")
};

featureCards.forEach((card) => {
    card.addEventListener("click", () => {
        const featureName = card.dataset.feature;

        featureView.classList.remove("hidden");

        document.querySelector(".dashboard-header").classList.add("hidden");
        document.querySelector(".date-time-card").classList.add("hidden");
        document.querySelector(".feature-grid").classList.add("hidden");

        document.querySelector("#feature-title").textContent =
            card.querySelector("h2").textContent;

        Object.values(featureContents).forEach((content) => {
            content.classList.add("hidden");
        });

        featureContents[featureName].classList.remove("hidden");
    });
});

backbutton.addEventListener("click", () => {
    featureView.classList.add("hidden");

    document.querySelector(".dashboard-header").classList.remove("hidden");
    document.querySelector(".date-time-card").classList.remove("hidden");
    document.querySelector(".feature-grid").classList.remove("hidden");
});



function updateTaskCount() {
    taskCount.textContent = `Total Tasks: ${tasks.length}`;
}


function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.textContent = task.completed
            ? `${task.text} - Completed`
            : task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        li.addEventListener("click", () => {
            task.completed = !task.completed;

            li.textContent = task.completed
                ? `${task.text} - Completed`
                : task.text;

            if (task.completed) {
                li.classList.add("completed");
            } else {
                li.classList.remove("completed");
            }

            addDeleteButton();
            saveTasks();
        });

        
        function addDeleteButton() {
            const deleteButton = document.createElement("button");

            deleteButton.textContent = "Delete";

            deleteButton.addEventListener("click", (event) => {
                event.stopPropagation();

                tasks.splice(index, 1);

                saveTasks();
                displayTasks();
            });

            li.appendChild(deleteButton);
        }

        addDeleteButton();
        taskList.appendChild(li);
    });

    updateTaskCount();
}



function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}



addTaskButton.addEventListener("click", (event) => {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        tasks.push({
            text: taskText,
            completed: false
        });

        saveTasks();
        displayTasks();

        taskInput.value = "";
    }
});



taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTaskButton.click();
    }
});



clearAllButton.addEventListener("click", () => {
    tasks = [];

    saveTasks();
    displayTasks();
});



displayTasks();




function updateDateTime() {
    const now = new Date();

    const date = now.toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    const time = now.toLocaleTimeString("en-IN");

    currentDate.textContent = date;
    currentTime.textContent = time;
}

updateDateTime();

setInterval(updateDateTime, 1000);




// Theme Switch
const themeToggle = document.querySelector("#theme-toggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "Light Mode";
} else {
    document.body.classList.remove("dark");
    themeToggle.textContent = "Dark Mode";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeToggle.textContent = "Light Mode";
        localStorage.setItem("theme", "dark");
    } else {
        themeToggle.textContent = "Dark Mode";
        localStorage.setItem("theme", "light");
    }
});


savePlanButton.addEventListener("click", () => {
    const date = plannerDate.value;
    const plan = plannerText.value.trim();

    if (date === "" || plan === "") {
        planMessage.textContent = "Please select a date and write your plan.";
        return;
    }

    localStorage.setItem(`plan-${date}`, plan);

    planMessage.textContent = "Your plan has been saved successfully.";
});



// Motivation Quote API
async function loadMotivationQuote() {
    quoteContent.innerHTML = `
        <p class="motivation-quote">Loading quote...</p>
    `;

    try {
        const response = await fetch("https://dummyjson.com/quotes/random");

        if (!response.ok) {
            throw new Error("Failed to fetch quote");
        }

        const data = await response.json();

        quoteContent.innerHTML = `
            <p class="motivation-quote">"${data.quote}"</p>
            <p class="quote-author">— ${data.author}</p>
            <button id="new-quote">New Quote</button>
        `;

        document.querySelector("#new-quote").addEventListener("click", loadMotivationQuote);
    } catch (error) {
        quoteContent.innerHTML = `
            <p class="motivation-quote">
                Stay focused and keep moving forward.
            </p>
            <button id="new-quote">Try Again</button>
        `;

        document.querySelector("#new-quote").addEventListener("click", loadMotivationQuote);
    }
}

loadMotivationQuote();


// Pomodoro Timer
const timerDisplay = document.querySelector("#timer-display");
const startTimerButton = document.querySelector("#start-timer");
const pauseTimerButton = document.querySelector("#pause-timer");
const resetTimerButton = document.querySelector("#reset-timer");

let timerSeconds = 25 * 60;
let timerInterval = null;

function updateTimerDisplay() {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;

    timerDisplay.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

startTimerButton.addEventListener("click", () => {
    if (timerInterval !== null) return;

    timerInterval = setInterval(() => {
        if (timerSeconds > 0) {
            timerSeconds--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            alert("Pomodoro session completed!");
        }
    }, 1000);
});

pauseTimerButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
});

resetTimerButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
    timerSeconds = 25 * 60;
    updateTimerDisplay();
});

updateTimerDisplay();

// Real Weather Widget
const cityInput = document.querySelector("#city-input");
const checkWeatherButton = document.querySelector("#check-weather");
const weatherResult = document.querySelector("#weather-result");

checkWeatherButton.addEventListener("click", async () => {
    const city = cityInput.value.trim();

    if (city === "") {
        weatherResult.textContent = "Please enter a city name.";
        return;
    }

    weatherResult.textContent = "Loading weather...";

    try {
        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );

        const locationData = await locationResponse.json();

        if (!locationData.results || locationData.results.length === 0) {
            weatherResult.textContent = "City not found.";
            return;
        }

        const location = locationData.results[0];

        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`
        );

        const weatherData = await weatherResponse.json();
        const currentWeather = weatherData.current;

        weatherResult.innerHTML = `
            <strong>${location.name}</strong><br>
            Temperature: ${currentWeather.temperature_2m}°C<br>
            Humidity: ${currentWeather.relative_humidity_2m}%<br>
            Wind Speed: ${currentWeather.wind_speed_10m} km/h
        `;
    } catch (error) {
        weatherResult.textContent =
            "Unable to load weather. Please try again.";
    }
});

// Dynamic Background
function updateBackground() {
    const hour = new Date().getHours();

    document.body.classList.remove(
        "morning",
        "afternoon",
        "evening",
        "night"
    );

    if (hour >= 5 && hour < 12) {
        document.body.classList.add("morning");
    } else if (hour >= 12 && hour < 17) {
        document.body.classList.add("afternoon");
    } else if (hour >= 17 && hour < 21) {
        document.body.classList.add("evening");
    } else {
        document.body.classList.add("night");
    }
}

updateBackground();

setInterval(updateBackground, 60000);

// Daily Goals
const goalInput = document.querySelector("#goal-input");
const addGoalButton = document.querySelector("#add-goal");
const goalList = document.querySelector("#goal-list");
const goalCount = document.querySelector("#goal-count");

let goals = JSON.parse(localStorage.getItem("goals")) || [];

function displayGoals() {
    goalList.innerHTML = "";

    let completedGoals = 0;

    goals.forEach((goal, index) => {
        const li = document.createElement("li");
        li.textContent = goal.text;

        if (goal.completed) {
            li.classList.add("goal-completed");
            completedGoals++;
        }

        li.addEventListener("click", () => {
            goals[index].completed = !goals[index].completed;

            localStorage.setItem("goals", JSON.stringify(goals));
            displayGoals();
        });

        goalList.appendChild(li);
    });

    goalCount.textContent =
        `Completed Goals: ${completedGoals} / ${goals.length}`;
}

addGoalButton.addEventListener("click", () => {
    const goalText = goalInput.value.trim();

    if (goalText === "") {
        return;
    }

    goals.push({
        text: goalText,
        completed: false
    });

    localStorage.setItem("goals", JSON.stringify(goals));

    goalInput.value = "";
    displayGoals();
});

displayGoals();

// Load Saved Planner
function loadSavedPlan() {
    const date = plannerDate.value;

    if (date === "") {
        plannerText.value = "";
        planMessage.textContent = "";
        return;
    }

    const savedPlan = localStorage.getItem(`plan-${date}`);

    if (savedPlan) {
        plannerText.value = savedPlan;
        planMessage.textContent = "Saved plan loaded.";
    } else {
        plannerText.value = "";
        planMessage.textContent = "";
    }
}

plannerDate.addEventListener("change", loadSavedPlan);

// Load saved plan when page opens
loadSavedPlan();

function loadSavedPlan() {
    const date = plannerDate.value;
    const savedPlan = localStorage.getItem(`plan-${date}`);

    if (savedPlan) {
        plannerText.value = savedPlan;
        planMessage.textContent = "Saved plan loaded.";
    }
}

plannerDate.addEventListener("change", loadSavedPlan);
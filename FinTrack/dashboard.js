const addTransaction = document.querySelector(".transaction-btn button");
const transactionModal = document.querySelector(".transaction-modal");
const closeBtn = document.querySelector(".close-btn");

const transactionType = document.querySelector("#transaction-type");
const transactionDescription = document.querySelector("#transaction-description");
const transactionAmount = document.querySelector("#transaction-amount");
const transactionDate = document.querySelector("#transaction-date");
const transactionCategory = document.querySelector("#transaction-category");
const saveBtn = document.querySelector(".save-btn");

const transactionTableBody = document.querySelector("tbody");
const balanceAmount = document.querySelector(".balance-amount");
const incomeAmount = document.querySelector(".income-amount");
const expenseAmount = document.querySelector(".expense-amount");
const transactionAmountCount = document.querySelector(".transaction-amount");
const searchInput = document.querySelector(".search-bar input");
const typeFilter = document.querySelector(".type-filter");

const darkModeToggle = document.querySelector(".toggle");
const resetBtn = document.querySelector(".reset-btn");
const settingsLink = document.querySelector(".settings-link");

const incomeBar = document.querySelector(".income-bar");
const expenseBar = document.querySelector(".expense-bar");

const incomeChartValue = document.querySelector(".income-chart-value");
const expenseChartValue = document.querySelector(".expense-chart-value");

const usernameText = document.querySelector(".username-text");
const savedUsername = localStorage.getItem("username");




const currencySymbols = {
    USD: "$",
    INR: "₹",
    EUR: "€",
    GBP: "£"
};

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let editIndex = null;

resetBtn.addEventListener("click", function() {

    const confirmReset = confirm("Are you sure you want to delete all transactions?");

    if (!confirmReset) {
        return;
    }

    localStorage.removeItem("transactions");

    transactions = [];

    renderTransactions();
});

darkModeToggle.addEventListener("click", function() {

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark")
    );
});

const savedDarkMode = localStorage.getItem("darkMode");

if (savedDarkMode === "true") {
    document.body.classList.add("dark");
}

searchInput.addEventListener("input", function() {
    renderTransactions();
});

typeFilter.addEventListener("change", function() {
    renderTransactions();
});

addTransaction.addEventListener("click", function() {
    transactionModal.style.display = "flex";
});

closeBtn.addEventListener("click", function() {
    transactionModal.style.display = "none";
});

transactionModal.addEventListener("click", function(event) {

    if (event.target === transactionModal) {
        transactionModal.style.display = "none";
    }

});

saveBtn.addEventListener("click", function() {

    const type = transactionType.value;
    const description = transactionDescription.value;
    const amount = transactionAmount.value;
    const date = transactionDate.value;
    const category = transactionCategory.value;

    if (
        !type ||
        !description ||
        !amount ||
        !date ||
        !category ||
        Number(amount) <= 0
    ) {
        alert("Please fill all the fields");
        return;
    }

    const transaction = {
        id: Date.now(),
        type: type,
        description: description,
        amount: amount,
        date: date,
        category: category
    };

    if (editIndex === null) {
        transactions.push(transaction);
    } else {
        transactions[editIndex] = transaction;
        editIndex = null;
    }

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

    renderTransactions();

    transactionModal.style.display = "none";

    transactionType.value = "Income";
    transactionDescription.value = "";
    transactionAmount.value = "";
    transactionDate.value = "";
    transactionCategory.value = "";
});

function renderTransactions() {

    transactionTableBody.innerHTML = "";

    let totalIncome = 0;
    let totalExpense = 0;

    const searchValue = searchInput.value.toLowerCase();
    const selectedType = typeFilter.value.toLowerCase();

    const selectedCurrency =
        localStorage.getItem("currency") || "USD";

    const currencySymbol =
        currencySymbols[selectedCurrency] || "$";

    let visibleTransactions = 0;

    transactions.forEach(function(transaction, index) {

        if (transaction.type === "Income") {
            totalIncome += Number(transaction.amount);
        }

        if (transaction.type === "Expense") {
            totalExpense += Number(transaction.amount);
        }

        if (
            !transaction.description.toLowerCase().includes(searchValue) &&
            !transaction.category.toLowerCase().includes(searchValue)
        ) {
            return;
        }

        if (
            selectedType !== "all" &&
            transaction.type.toLowerCase() !== selectedType
        ) {
            return;
        }

        visibleTransactions++;

        const row = document.createElement("tr");

        const formattedDate = new Date(
            transaction.date
        ).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

        const amountClass =
            transaction.type === "Income"
                ? "income-text"
                : "expense-text";

        row.innerHTML = `
            <td>${formattedDate}</td>

            <td>${transaction.description}</td>

            <td>${transaction.category}</td>

            <td class="${amountClass}">
                ${currencySymbol}${Number(transaction.amount).toFixed(2)}
            </td>

            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;

        const deleteBtn = row.querySelector(".delete-btn");

        deleteBtn.addEventListener("click", function() {

            transactions.splice(index, 1);

            localStorage.setItem(
                "transactions",
                JSON.stringify(transactions)
            );

            renderTransactions();
        });

        const editBtn = row.querySelector(".edit-btn");

        editBtn.addEventListener("click", function() {

            editIndex = index;

            transactionType.value = transaction.type;
            transactionDescription.value = transaction.description;
            transactionAmount.value = transaction.amount;
            transactionDate.value = transaction.date;
            transactionCategory.value = transaction.category;

            transactionModal.style.display = "flex";
        });

        transactionTableBody.appendChild(row);
    });

    if (visibleTransactions === 0) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td colspan="5" class="no-transactions">
                No transactions found
            </td>
        `;

        transactionTableBody.appendChild(row);
    }

    transactionAmountCount.textContent = transactions.length;

    incomeAmount.textContent =
        `${currencySymbol}${totalIncome.toFixed(2)}`;

    expenseAmount.textContent =
        `${currencySymbol}${totalExpense.toFixed(2)}`;

    const balance = totalIncome - totalExpense;

    balanceAmount.textContent =
        `${currencySymbol}${balance.toFixed(2)}`;

    const maxAmount = Math.max(
        totalIncome,
        totalExpense
    );

    if (maxAmount > 0) {

        incomeBar.style.height =
            `${(totalIncome / maxAmount) * 180}px`;

        expenseBar.style.height =
            `${(totalExpense / maxAmount) * 180}px`;

    } else {

        incomeBar.style.height = "0px";
        expenseBar.style.height = "0px";
    }

    incomeChartValue.textContent =
        `${currencySymbol}${totalIncome.toFixed(2)}`;

    expenseChartValue.textContent =
        `${currencySymbol}${totalExpense.toFixed(2)}`;
}

renderTransactions();

const logoutBtn = document.querySelector(".logout-btn");

logoutBtn.addEventListener("click", function() {

    const confirmLogout = confirm("Are you sure you want to logout?");

    if (!confirmLogout) {
        return;
    }

    localStorage.removeItem("loggedIn");

    window.location.href = "Login.html";
});
if (savedUsername) {
    usernameText.textContent = savedUsername;
}
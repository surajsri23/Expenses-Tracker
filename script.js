document.addEventListener("DOMContentLoaded", function() {
            loadItems();
        });

        function addItem() {
            var expenseDate = document.getElementById("expenseDate").value;
            var itemName = document.getElementById("itemName").value;
            var quantity = parseFloat(document.getElementById("quantity").value);
            var quantityUnit = document.getElementById("quantityUnit").value;
            var amount = parseFloat(document.getElementById("amount").value);
            var total = quantity * amount;
            var newItem = { date: expenseDate, itemName: itemName, quantity: quantity, quantityUnit: quantityUnit, amount: amount, total: total };
            var items = getItemsFromStorage();
            items.push(newItem);
            localStorage.setItem("expenses", JSON.stringify(items));
            displayItems();
        }

        function displayItems(items = getItemsFromStorage()) {
            var expensesList = document.getElementById("expenses");
            var totalElement = document.getElementById("total");
            expensesList.innerHTML = "";
            var totalExpenses = 0;
            items.forEach(function(item, index) {
                var li = document.createElement("li");
                li.textContent = item.date + ": " + item.itemName + ": " + item.quantity + " " + item.quantityUnit + " x ₹" + item.amount + " = ₹" + item.total;

                var deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.onclick = function() {
                    deleteItem(index);
                };

                var modifyButton = document.createElement("button");
                modifyButton.textContent = "Modify";
                modifyButton.onclick = function() {
                    modifyItem(index);
                };

                var actionButtons = document.createElement("div");
                actionButtons.className = "action-buttons";
                actionButtons.appendChild(deleteButton);
                actionButtons.appendChild(modifyButton);

                li.appendChild(actionButtons);
                expensesList.appendChild(li);
                totalExpenses += item.total;
            });
            totalElement.textContent = "Total Expenses: ₹" + totalExpenses.toFixed(2);
        }

        function deleteItem(index) {
            var items = getItemsFromStorage();
            items.splice(index, 1);
            localStorage.setItem("expenses", JSON.stringify(items));
            displayItems();
        }

        function modifyItem(index) {
            var items = getItemsFromStorage();
            var itemToModify = items[index];
            var expenseDate = prompt("Enter new date", itemToModify.date);
            var itemName = prompt("Enter new item name", itemToModify.itemName);
            var quantity = parseFloat(prompt("Enter new quantity", itemToModify.quantity));
            var quantityUnit = prompt("Enter new quantity unit", itemToModify.quantityUnit);
            var amount = parseFloat(prompt("Enter new amount", itemToModify.amount));
            var total = quantity * amount;
            var modifiedItem = { date: expenseDate, itemName: itemName, quantity: quantity, quantityUnit: quantityUnit, amount: amount, total: total };
            items[index] = modifiedItem;
            localStorage.setItem("expenses", JSON.stringify(items));
            displayItems();
        }

        function clearAll() {
            localStorage.removeItem("expenses");
            displayItems();
        }

        function getItemsFromStorage() {
            var items = localStorage.getItem("expenses");
            return items ? JSON.parse(items) : [];
        }

        function loadItems() {
            displayItems();
        }

        function searchItems() {
            var searchDate = document.getElementById("searchDate").value;
            var searchItemName = document.getElementById("searchItemName").value.toLowerCase();
            var items = getItemsFromStorage();

            var filteredItems = items.filter(function(item) {
                return (searchDate ? item.date === searchDate : true) &&
                       (searchItemName ? item.itemName.toLowerCase().includes(searchItemName) : true);
            });

            displayItems(filteredItems);
        }

        function printExpenses() {
            window.print();
        }

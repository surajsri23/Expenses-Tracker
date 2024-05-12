document.addEventListener("DOMContentLoaded", function() {
            loadItems();
        });

        function addItem() {
            var itemName = document.getElementById("itemName").value;
            var quantity = parseFloat(document.getElementById("quantity").value);
            var quantityUnit = document.getElementById("quantityUnit").value;
            var amount = parseFloat(document.getElementById("amount").value);
            var total = quantity * amount;
            var newItem = { itemName: itemName, quantity: quantity, quantityUnit: quantityUnit, amount: amount, total: total };
            var items = getItemsFromStorage();
            items.push(newItem);
            localStorage.setItem("expenses", JSON.stringify(items));
            displayItems();
        }

        function displayItems() {
            var expensesList = document.getElementById("expenses");
            var totalElement = document.getElementById("total");
            expensesList.innerHTML = "";
            var items = getItemsFromStorage();
            var totalExpenses = 0;
            items.forEach(function(item) {
                var li = document.createElement("li");
                li.textContent = item.itemName + ": " + item.quantity + " " + item.quantityUnit + " x ₹" + item.amount + " = ₹" + item.total;
                if (item.amount >= 50) {
                    li.classList.add('highlight');
                }
                expensesList.appendChild(li);
                totalExpenses += item.total;
            });
            totalElement.textContent = "Total Expenses: ₹" + totalExpenses.toFixed(2);
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

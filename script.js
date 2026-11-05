console.log("Welcome to GlowBelle!");

//----------------------------------------------------------//
// PRODUCTS

const productList = document.getElementById("product-list");

const products = [
    {
        name: "Hydrating Face Serum",
        price: 34.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300"
    },
    {
        name: "Glow Moisturizer",
        price: 29.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=300"
    },
    {
        name: "Gentle Facial Cleanser",
        price: 19.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=300"
    }
];

// Select subtotal and items count elements
const subtotalElement = document.getElementById("subtotal");
const itemsCountElement = document.getElementById("items-count");

let subtotal = 0;
let totalItems = 0;


//----------------------------------------------------------//
// DISPLAY PRODUCTS

function displayProducts() {

    productList.innerHTML = "";

    products.forEach(function(product, index) {

        productList.innerHTML += `
            <div class="product">

                <img src="${product.image}" alt="${product.name}">

                <div class="product-info">

                    <h4>${product.name}</h4>

                    <p>$${product.price} × ${product.quantity}</p>

                    <button type="button" class="quantity-btn"
                        onclick="changeQuantity(${index}, -1)">−</button>

                    <span>${product.quantity}</span>

                    <button type="button" class="quantity-btn"
                        onclick="changeQuantity(${index}, 1)">+</button>

                </div>

                <strong>
                    $${(product.price * product.quantity).toFixed(2)}
                </strong>

            </div>
        `;
    });
}


//----------------------------------------------------------//
// CHANGE PRODUCT QUANTITY

function changeQuantity(index, amount) {

    products[index].quantity += amount;

    if (products[index].quantity < 1) {
        products[index].quantity = 1;
    }

    displayProducts();
    calculateSubtotal();
}


//----------------------------------------------------------//
// ORDER CALCULATIONS

const deliveryFeeElement = document.getElementById("delivery-fee");
const discountAmountElement = document.getElementById("discount-amount");
const totalPriceElement = document.getElementById("total-price");

const freeDeliveryMessage = document.getElementById("free-delivery-message");

let deliveryFee = 5;
let discountPercentage = 0;

// Free delivery threshold
const freeDeliveryThreshold = 100;


// Calculate subtotal
function calculateSubtotal() {

    subtotal = 0;
    totalItems = 0;

    products.forEach(function(product) {

        subtotal += product.price * product.quantity;
        totalItems += product.quantity;

    });

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;

    itemsCountElement.textContent =
        `${totalItems} ${totalItems === 1 ? "Item" : "Items"}`;

    updateTotal();
}


// Function to calculate and update total
function updateTotal() {

    const discount = subtotal * (discountPercentage / 100);

    // Check free delivery
    let finalDeliveryFee = deliveryFee;

    if (subtotal >= freeDeliveryThreshold) {

        finalDeliveryFee = 0;

        freeDeliveryMessage.textContent =
            "Congratulations! You qualify for FREE delivery! 💗";

    } else {

        freeDeliveryMessage.textContent =
            `Spend $${(freeDeliveryThreshold - subtotal).toFixed(2)} more for FREE delivery!`;

    }

    const total = subtotal - discount + finalDeliveryFee;

    // Display discount
    discountAmountElement.textContent =
        `$${discount.toFixed(2)}`;

    // Display delivery fee
    deliveryFeeElement.textContent =
        `$${finalDeliveryFee.toFixed(2)}`;

    // Display final total
    totalPriceElement.textContent =
        `$${total.toFixed(2)}`;
}


//----------------------------------------------------------//
// DELIVERY OPTIONS

const deliveryOptions = document.querySelectorAll('input[name="delivery"]');

// Listen for delivery changes
function updateDelivery() {

    const selectedDelivery =
        document.querySelector('input[name="delivery"]:checked');

    if (selectedDelivery.value === "express") {

        deliveryFee = 10;

    } else {

        deliveryFee = 5;

    }

    updateTotal();
}


// Add event listeners to delivery options
deliveryOptions.forEach(function(option) {

    option.addEventListener("change", updateDelivery);

});


//----------------------------------------------------------//
/* PAYMENT METHODS */

const paymentOptions = document.querySelectorAll('input[name="payment"]');

const cardDetails = document.getElementById("card-details");

const cardNumberInput = document.getElementById("card-number");
const expiryInput = document.getElementById("expiry");
const cvvInput = document.getElementById("cvv");


function updatePayment() {

    const selectedPayment =
        document.querySelector('input[name="payment"]:checked');

    if (selectedPayment.value === "card") {

        cardDetails.style.display = "block";

        cardNumberInput.required = true;
        expiryInput.required = true;
        cvvInput.required = true;

    } else {

        cardDetails.style.display = "none";

        cardNumberInput.required = false;
        expiryInput.required = false;
        cvvInput.required = false;

    }
}


// Add event listeners to payment options
paymentOptions.forEach(function(option) {

    option.addEventListener("change", updatePayment);

});


//----------------------------------------------------------//
/* PROMO CODES */

const promoInput = document.getElementById("promo-code");

const applyPromoButton = document.getElementById("apply-promo");

const promoMessage = document.getElementById("promo-message");


applyPromoButton.addEventListener("click", function(event) {

    event.preventDefault();

    const code = promoInput.value.trim().toUpperCase();

    if (code === "SAVE10" || code === "GLOW10") {

        discountPercentage = 10;

        promoMessage.textContent =
            "Congratulations! You got 10% off! 💗";

        promoMessage.className = "success";

    }

    else if (code === "BEAUTY20") {

        discountPercentage = 20;

        promoMessage.textContent =
            "Amazing! You got 20% off! 🎀";

        promoMessage.className = "success";

    }

    else {

        discountPercentage = 0;

        promoMessage.textContent =
            "Invalid promo code. Try again!";

        promoMessage.className = "error";

    }

    // Update order calculations
    updateTotal();

});


//----------------------------------------------------------//
/* BILLING ADDRESS */

const differentBillingCheckbox =
    document.getElementById("different-billing");

const billingDetails =
    document.getElementById("billing-details");

const billingAddressInput =
    document.getElementById("billing-address");

const billingCityInput =
    document.getElementById("billing-city");


function updateBillingAddress() {

    if (differentBillingCheckbox.checked) {

        billingDetails.style.display = "grid";

        billingAddressInput.required = true;
        billingCityInput.required = true;

    } else {

        billingDetails.style.display = "none";

        billingAddressInput.required = false;
        billingCityInput.required = false;

    }
}


differentBillingCheckbox.addEventListener(
    "change",
    updateBillingAddress
);


//----------------------------------------------------------//
/* PREFERRED DELIVERY DATE */

const deliveryDateInput =
    document.getElementById("delivery-date");


// Prevent selecting a past date
const today = new Date();

const year = today.getFullYear();

const month = String(today.getMonth() + 1).padStart(2, "0");

const day = String(today.getDate()).padStart(2, "0");

deliveryDateInput.min = `${year}-${month}-${day}`;


//----------------------------------------------------------//
/* CHECKOUT FORM VALIDATION */

const formMessage = document.getElementById("form-message");

const checkoutForm = document.getElementById("checkout-form");

const fullNameInput = document.getElementById("fullname");


// Clear previous messages when the customer changes the form
checkoutForm.addEventListener("input", function() {

    formMessage.textContent = "";

});


//----------------------------------------------------------//
/* ORDER CONFIRMATION */

const orderConfirmation =
    document.getElementById("order-confirmation");

const confirmationMessage =
    document.getElementById("confirmation-message");

const completedOrderSummary =
    document.getElementById("completed-order-summary");


// Generate order number
function generateOrderNumber() {

    return "GB-" + Date.now();

}


// Escape user-provided text before inserting it into HTML
function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, function(character) {

        const characters = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return characters[character];

    });

}


//----------------------------------------------------------//
/* ORDER HISTORY */

const orderHistory =
    document.getElementById("order-history");

const orderHistoryList =
    document.getElementById("order-history-list");


// Load saved orders
function getOrderHistory() {

    try {

        return JSON.parse(
            localStorage.getItem("glowBelleOrders")
        ) || [];

    } catch (error) {

        return [];

    }

}


// Display order history
function displayOrderHistory() {

    const orders = getOrderHistory();

    orderHistoryList.innerHTML = "";

    if (orders.length === 0) {

        orderHistory.style.display = "none";

        return;

    }

    orderHistory.style.display = "block";

    orders.forEach(function(order) {

        orderHistoryList.innerHTML += `

            <div class="history-item">

                <h3>Order ${escapeHTML(order.orderNumber)}</h3>

                <p>Date: ${escapeHTML(order.date)}</p>

                <p>Total: $${Number(order.total).toFixed(2)}</p>

                <p>Payment: ${escapeHTML(order.payment)}</p>

            </div>

        `;

    });

}


// Save order in localStorage
function saveOrder(order) {

    const orders = getOrderHistory();

    orders.push(order);

    localStorage.setItem(
        "glowBelleOrders",
        JSON.stringify(orders)
    );

}


//----------------------------------------------------------//
/* PLACE ORDER */

checkoutForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Check form validation
    if (checkoutForm.checkValidity()) {

        const customerName = fullNameInput.value.trim();

        const orderNumber = generateOrderNumber();

        const selectedDelivery =
            document.querySelector('input[name="delivery"]:checked').value;

        const selectedPayment =
            document.querySelector('input[name="payment"]:checked').value;

        const paymentMethod =
            selectedPayment === "card"
                ? "Credit / Debit Card"
                : "Cash on Delivery";

        const deliveryMethod =
            selectedDelivery === "express"
                ? "Express Delivery"
                : "Standard Delivery";

        const discount =
            subtotal * (discountPercentage / 100);

        const finalDeliveryFee =
            subtotal >= freeDeliveryThreshold ? 0 : deliveryFee;

        const finalTotal =
            subtotal - discount + finalDeliveryFee;

        const customerAddress =
            document.getElementById("address").value;

        const customerCity =
            document.getElementById("city").value;

        let finalBillingAddress = customerAddress;

        let finalBillingCity = customerCity;

        if (differentBillingCheckbox.checked) {

            finalBillingAddress = billingAddressInput.value;

            finalBillingCity = billingCityInput.value;

        }

        const selectedDate = deliveryDateInput.value;

        // Create order object
        const order = {

            orderNumber: orderNumber,

            date: new Date().toLocaleString(),

            customerName: customerName,

            phone: document.getElementById("phone").value,

            email: document.getElementById("email").value,

            address: customerAddress,

            city: customerCity,

            billingAddress: finalBillingAddress,

            billingCity: finalBillingCity,

            delivery: deliveryMethod,

            deliveryDate: selectedDate,

            payment: paymentMethod,

            products: products.map(function(product) {

                return {

                    name: product.name,

                    price: product.price,

                    quantity: product.quantity

                };

            }),

            subtotal: subtotal,

            discount: discount,

            deliveryFee: finalDeliveryFee,

            total: finalTotal

        };


        // Save order
        saveOrder(order);


        // Display confirmation
        confirmationMessage.textContent =
            `Thank you, ${customerName}! Your order has been placed successfully. 💖`;

        completedOrderSummary.innerHTML = `

            <h3>Order Number: ${escapeHTML(orderNumber)}</h3>

            <p><strong>Customer:</strong> ${escapeHTML(customerName)}</p>

            <h4>Products:</h4>

            ${order.products.map(function(product) {

                return `

                    <p>
                        ${escapeHTML(product.name)}
                        × ${product.quantity}
                        — $${(product.price * product.quantity).toFixed(2)}
                    </p>

                `;

            }).join("")}

            <hr>

            <p>Subtotal: $${subtotal.toFixed(2)}</p>

            <p>Discount: -$${discount.toFixed(2)}</p>

            <p>Delivery: $${finalDeliveryFee.toFixed(2)}</p>

            <h3>Total: $${finalTotal.toFixed(2)}</h3>

            <p>Delivery Method: ${escapeHTML(deliveryMethod)}</p>

            <p>Payment Method: ${escapeHTML(paymentMethod)}</p>

            <p>Delivery Address:
                ${escapeHTML(customerAddress)}, ${escapeHTML(customerCity)}
            </p>

            <p>Billing Address:
                ${escapeHTML(finalBillingAddress)}, ${escapeHTML(finalBillingCity)}
            </p>

            ${selectedDate
                ? `<p>Preferred Delivery Date: ${escapeHTML(selectedDate)}</p>`
                : ""
            }

        `;


        // Show confirmation section
        orderConfirmation.style.display = "block";

        // Hide checkout form after successful order
        checkoutForm.style.display = "none";

        // Display updated order history
        displayOrderHistory();

        // Scroll to confirmation
        orderConfirmation.scrollIntoView({
            behavior: "smooth"
        });

    } else {

        checkoutForm.reportValidity();

    }

});


//----------------------------------------------------------//
/* PRINT RECEIPT */

const printReceiptButton =
    document.getElementById("print-receipt");

printReceiptButton.addEventListener("click", function() {

    window.print();

});


//----------------------------------------------------------//
/* INITIAL PAGE SETUP */

// Display products
displayProducts();

// Calculate initial subtotal
calculateSubtotal();

// Set initial delivery fee
updateDelivery();

// Set initial payment option
updatePayment();

// Set initial billing address
updateBillingAddress();

// Display previous orders
displayOrderHistory();


//----------------------------------------------------------//
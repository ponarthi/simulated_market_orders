document.addEventListener("DOMContentLoaded", () => {
    let currentPrice = generateRandomPrice();
    let orders = [];
  
    // Display the current price
    const priceElement = document.getElementById('current-price');
    priceElement.textContent = currentPrice;
  
    // Simulate price changes
    setInterval(() => {
      currentPrice = generateRandomPrice();
      priceElement.textContent = currentPrice;
  
      // Try to fulfill orders when the price changes
      processOrders();
    }, 2000); // Price updates every 2 seconds
  
    // Handle placing a new order
    document.getElementById('place-order-btn').addEventListener('click', () => {
      const orderType = document.getElementById('order-type').value;
      const price = parseFloat(document.getElementById('price').value);
      const quantity = parseInt(document.getElementById('quantity').value);
  
      if (!price || !quantity || quantity <= 0) {
        alert("Please enter valid price and quantity.");
        return;
      }
  
      // Create new order object
      const newOrder = {
        id: Date.now(),
        type: orderType,
        price: price,
        quantity: quantity,
        status: 'Pending',
      };
  
      // Add to orders list
      orders.push(newOrder);
      displayOrders();
    });
  
    // Process and match orders based on the price updates
    function processOrders() {
      orders.forEach(order => {
        if (order.status === 'Pending') {
          if (order.type === 'market') {
            // Market orders fill immediately at current price
            order.status = 'Filled';
          } else if (order.type === 'limit') {
            // Limit orders fill if the price meets the limit
            if ((order.price <= currentPrice && order.quantity > 0) || (order.price >= currentPrice && order.quantity < 0)) {
              order.status = 'Filled';
            }
          }
        }
      });
  
      // Display updated orders
      displayOrders();
    }
  
    // Function to update the order display
    function displayOrders() {
      const ordersList = document.getElementById('orders-list');
      ordersList.innerHTML = '';
  
      orders.forEach(order => {
        const orderElement = document.createElement('div');
        orderElement.classList.add('order-item');
        orderElement.innerHTML = `
          <p><strong>Order Type:</strong> ${order.type}</p>
          <p><strong>Price:</strong> ${order.price}</p>
          <p><strong>Quantity:</strong> ${order.quantity}</p>
          <p><strong>Status:</strong> ${order.status}</p>
        `;
        ordersList.appendChild(orderElement);
      });
    }
  
    // Function to generate random price data (for simulating the market)
    function generateRandomPrice() {
      return (Math.random() * 100).toFixed(2);
    }
  });
  
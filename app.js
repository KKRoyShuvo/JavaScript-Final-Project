//Description : Here, we have taken a array which stores all the data of the api and also the user inputted item.
// We did not used any POST requst to the api. So, if we reload the page the user inputted item will be vanished.
//We have made the searching normalised like, we can input keywrord in capital or small otherwise we can also search by a portion or a part of the name. 
//we have added validation for item type selection which will be visible as alert.
//Only the cart item count is stored in the local storage of the broswer.
//we have given necessary documentation for better understanding of the functinality and so on.


// Your solution goes here
// API -> https://64b2e33138e74e386d55b072.mockapi.io/api/hanover



// bottom inner texts changing
document.getElementById("iits-developer").innerHTML = "Krishna Kamol Roy Shuvo";

// Hiding the form initially
let itemform = document.getElementById('iits-adminSection');
itemform.style.display = 'none';

//array to store user and api data
let itemsData = [];


// login
let admin = document.getElementById('iits-adminBtn');
admin.addEventListener('click', function() {
  let userid = prompt("Enter Your Id: ");
  let userpass = prompt("Enter your password: ");
  
  // login validity
  if (userid === 'iits' && userpass === '23') {
    itemform.style.display = 'block';
  } else {
    alert("Wrong Credentials.");
  }
});


// Close button functionality for the form
let closeBtn = document.getElementById('iits-cancelBtn');
closeBtn.addEventListener('click', function() {
  itemform.style.display = 'none';
});

// Add new item form
let addNewForm = document.getElementById('iits-addNewForm');
addNewForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Get the input values
  let itemName = document.getElementById('name').value;
  let itemPic = document.getElementById('pic');
  let itemDesc = document.getElementById('desc').value;
  let itemType = document.getElementById('typeItem').value;

  //valildation of selecting itemType
  if (itemType=="invalid") {
    alert("Please select an item type before submission.");
    return; 
  }

  // Create a new item object
  let newItem = {
    name: itemName,
    pic: itemPic,
    desc: itemDesc,
    type: itemType
  };

  // Add the new item to the itemsData array
  itemsData.push(newItem);

  // Populate the items on the webpage with the updated itemsData
  populateItems(itemsData);

  // Clear the form inputs
  addNewForm.reset();
});

  
// Function to populate items on the webpage
function populateItems(items) {
    let itemsContainer = document.getElementById('iits-items');
  
    
    // Clear existing items
    itemsContainer.innerHTML = '';
    // Iterate over the items and create elements dynamically
    items.forEach(item => {
      // Check if the item has valid data
      if (item.name  && item.desc && item.type) {
        let itemDiv = document.createElement('div');
        itemDiv.className = 'item col-md-6 col-lg-4 p-3';
        itemDiv.setAttribute('data-category', item.type);
  
        let cardDiv = document.createElement('div');
        cardDiv.className = 'card';
  
        let imgContainerDiv = document.createElement('div');
        imgContainerDiv.className = 'img-container';
  
        let imgElement = document.createElement('img');
        imgElement.src = item.url;
        imgElement.alt = item.name;
  
        let categorySpan = document.createElement('span');
        categorySpan.className = 'category-pill';
        categorySpan.textContent = item.type;
  
        let cardBodyDiv = document.createElement('div');
        cardBodyDiv.className = 'card-body';
  
        let cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = item.name;
  
        let cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.textContent = item.desc;
  
        let addToCartBtn = document.createElement('button');
        addToCartBtn.className = 'addToCartBtn btn w-100';
        addToCartBtn.textContent = 'Add to cart';
  
        // Append elements to their respective parents
        imgContainerDiv.appendChild(imgElement);
        imgContainerDiv.appendChild(categorySpan);
        cardDiv.appendChild(imgContainerDiv);
        cardBodyDiv.appendChild(cardTitle);
        cardBodyDiv.appendChild(cardText);
        cardBodyDiv.appendChild(addToCartBtn);
        cardDiv.appendChild(cardBodyDiv);
        itemDiv.appendChild(cardDiv);
        itemsContainer.appendChild(itemDiv);
      }
    });
  }
  

// Function to fetch items from the API and update the item list using async/await
async function fetchItemsAndUpdate() {
  try {
    const response = await fetch("https://64b2e33138e74e386d55b072.mockapi.io/api/hanover");
    const data = await response.json();
    // Filter out items with category "invalid"
    const validItems = data.filter(item => item.type !== "invalid");
    // Update the itemsData array with the retrieved data
    itemsData = validItems;
    // Populate the items on the webpage
    populateItems(itemsData);
  } catch (error) {
    console.log("Error fetching items:", error);
  }
}

  

// Call fetchItemsAndUpdate() immediately after all resources have finished loading
window.addEventListener("load", function() {
  fetchItemsAndUpdate();
});

// Add to cart functionality
let cartCounter = document.getElementById('iits-cart_counter');
let addToCartButtons = document.getElementsByClassName('addToCartBtn');
let cartDecButton = document.getElementById('cart_dec');

let itemsContainer = document.getElementById('iits-items');

// Event delegation for the "Add to cart" buttons
itemsContainer.addEventListener('click', function(event) {
  if (event.target.classList.contains('addToCartBtn')) {
    let currentCount = parseInt(cartCounter.textContent);
    let newCount = currentCount + 1;
    cartCounter.textContent = newCount;

    // Store the updated count in local storage
    localStorage.setItem('cartCount', newCount);
  }
});

// Decrease cart count
cartDecButton.addEventListener('click', function() {
  let currentCount = parseInt(cartCounter.textContent);
  if (currentCount > 0) {
    let newCount = currentCount - 1;
    cartCounter.textContent = newCount;

    // Store the updated count in local storage
    localStorage.setItem('cartCount', newCount);
  }
});

// Retrieve cart count from local storage and update the cart counter on page load
let storedCartCount = localStorage.getItem('cartCount');
if (storedCartCount) {
  cartCounter.textContent = storedCartCount;
}



// Function to show all items
function showAllItems() {
  let items = document.querySelectorAll('.item');
  items.forEach(item => {
    item.style.display = 'block';
  });
}

// Radio buttons
let allToggle = document.getElementById('all_toggle');
let coffeeToggle = document.getElementById('coffee_toggle');
let burgerToggle = document.getElementById('burger_toggle');

// Event listeners for the radio buttons
allToggle.addEventListener('click', function () {
  showAllItems();
});

coffeeToggle.addEventListener('click', function () {
  filterItems('coffee');
});

burgerToggle.addEventListener('click', function () {
  filterItems('burger');
});


// Function to filter items based on category
function filterItems(category) {
  let items = document.querySelectorAll('.item');
  items.forEach(item => {
    let itemCategory = item.getAttribute('data-category');
    if (itemCategory === category ) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}


// Search functionality
let foodname = document.getElementsByClassName('card-title')
let searchForm = document.getElementById('searchForm');
let searchInput = document.getElementById('iits-searchBox');
let submitbutton = document.getElementsByClassName("btn")


searchForm.addEventListener('submit', function(e) {
  e.preventDefault();
  let searchQuery = searchInput.value.toLowerCase().trim();

  if (searchQuery !== '') {
    // Filter items based on searchQuery
    const filteredItems = itemsData.filter(item => {
      return item.name.toLowerCase().includes(searchQuery) ||
             item.desc.toLowerCase().includes(searchQuery) ||
             item.type.toLowerCase().includes(searchQuery);
    });

    // Update the displayed items based on the search results
    populateItems(filteredItems);
  } else {
    // If the search query is empty, show all items
    showAllItems();
  }
});
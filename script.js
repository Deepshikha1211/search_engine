// Get DOM elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchHistoryList = document.getElementById('search-history');
const clearHistoryButton = document.getElementById('clear-history');

// Function to load search history from localStorage
function loadSearchHistory() {
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    searchHistoryList.innerHTML = ''; // Clear the list

    history.forEach((item, index) => {
        // Create the list item
        const li = document.createElement('li');
        li.textContent = item;

        // Create a delete button for each search item
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'; // Font Awesome trash icon
        deleteBtn.classList.add('delete-btn');

        // Add an event listener to the delete button
        deleteBtn.addEventListener('click', () => {
            deleteSearchItem(index); // Call the delete function with the item index
        });

        // Append the delete button to the list item
        li.appendChild(deleteBtn);

        // Append the list item to the history list
        searchHistoryList.appendChild(li);
    });
}

// Function to save a search term
function saveSearch(query) {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    history.push(query);
    localStorage.setItem('searchHistory', JSON.stringify(history));
}

// Function to delete a particular search item
function deleteSearchItem(index) {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    history.splice(index, 1); // Remove the item at the given index
    localStorage.setItem('searchHistory', JSON.stringify(history)); // Update localStorage
    loadSearchHistory(); // Reload the updated history
}

// Event listener for search button
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        saveSearch(query);
        loadSearchHistory();
        searchInput.value = ''; // Clear the input
    }
});

// Event listener for clear history button
clearHistoryButton.addEventListener('click', () => {
    localStorage.removeItem('searchHistory'); // Clear all history
    loadSearchHistory();
});

// Load history on page load
document.addEventListener('DOMContentLoaded', loadSearchHistory);

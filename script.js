
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const gallery = document.getElementById('gallery');

    // Load images from JSON file
    function loadImages() {
        const gallery = document.getElementById('gallery');
        const jsonFilePath = gallery.dataset.json;
        fetch(jsonFilePath)
            .then(response => response.json())
            .then(images => {
                displayImages(images);
            })
            .catch(error => {
                console.error('Error loading images:', error);
            });
    }
// Function to display images
function displayImages(images) {
    shuffleArray(images);
    gallery.innerHTML = '';
    images.forEach(image => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.name;
        div.appendChild(img);
        const p = document.createElement('p');
        p.textContent = image.name;
        div.appendChild(p);
        gallery.appendChild(div);

        // Add event listener to copy image to clipboard when clicked
        addCopyEventListener(img, image.src);
    });
}

// Function to add event listener to an image
function addCopyEventListener(img, src) {
    img.addEventListener('click', async () => {
        const response = await fetch(src);
        const blob = await response.blob();
        const data = [new ClipboardItem({ [blob.type]: blob })];
        navigator.clipboard.write(data)
            .then(() => {
                // Show the "Copied!" popup
                document.getElementById('copied-popup').style.display = 'block';
                // Hide the "Copied!" popup after 0.420 seconds
                setTimeout(() => {
                    document.getElementById('copied-popup').style.display = 'none';
                }, 420);
            })
            .catch(console.error);
    });
}

// Function to filter images
function filterImages(images) {
    const searchText = searchInput.value.toLowerCase();
    const filteredImages = images.filter(image => image.name.toLowerCase().includes(searchText));
    
    // Clear the gallery
    gallery.innerHTML = '';

    // Display the filtered images
    filteredImages.forEach(image => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.name;
        div.appendChild(img);
        const p = document.createElement('p');
        p.textContent = image.name;
        div.appendChild(p);
        gallery.appendChild(div);

        // Add event listener to copy image to clipboard when clicked
        addCopyEventListener(img, image.src);
    });
}

    // Event listener for search input
    searchInput.addEventListener('input', () => {
        const gallery = document.getElementById('gallery');
        const jsonFilePath = gallery.dataset.json;
        fetch(jsonFilePath)
            .then(response => response.json())
            .then(images => {
                filterImages(images);
            })
            .catch(error => {
                console.error('Error filtering images:', error);
            });
    });

    // Initially load all images
    loadImages();
});

// Function to shuffle array
function shuffleArray(array) {
    return array;
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Create a new nav element
var nav = document.createElement('nav');

// Create links for the nav
var link1 = document.createElement('a');
link1.href = 'index.html';
link1.textContent = 'home';

link1point5 = document.createElement('a');
link1point5.href = 'pics-that-go-hard.html';
link1point5.textContent = 'pics-that-go-hard';

var link2 = document.createElement('a');
link2.href = 'bitcoin-puppets.html';
link2.textContent = 'bitcoin-puppets';

var link3 = document.createElement('a');
link3.href = 'funny-money.html';
link3.textContent = 'funny-money';

var link4 = document.createElement('a');
link4.href = 'pepes.html';
link4.textContent = 'pepes';

var emojis = document.createElement('a');
emojis.href = 'emojis.html';
emojis.textContent = 'emojis';


var link5 = document.createElement('a');
link5.href = 'contact.html';
link5.textContent = 'contact (send-me-your-edits)';

// Append links to the nav
nav.appendChild(link1);
nav.appendChild(link1point5)
nav.appendChild(link2);
nav.appendChild(link3);
nav.appendChild(link4);
nav.appendChild(emojis);
nav.appendChild(link5);

// Append the nav to the header
document.querySelector('header').appendChild(nav);

// Get all nav links
var navLinks = document.querySelectorAll('nav a');

// Get current page URL
var currentPageUrl = window.location.href;

navLinks.forEach(function(link) {
    if (link.href === currentPageUrl) {
        // Add 'active' class to the current page link
        link.classList.add('active');
    }
});
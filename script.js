document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const gallery = document.getElementById('gallery');

    // Load images from JSON file
    function loadImages() {
        fetch('images.json')
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
        fetch('images.json')
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

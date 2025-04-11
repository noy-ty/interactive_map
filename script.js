// script.js
// Sample points to be added on the map
const points = [
  { x: 34, y: 25, type: 'fruits', image: './images/PXL_20250410_060535942_res.jpg', description: '(מתחת לכביש של האיגלו) עץ תות' },
  { x: 15, y: 10, type: 'fruits', image: './images/PXL_20250410_060850676_res.jpg', description: '(מעל מגורי החיילים) עץ תות' },
  { x: 3, y: 32, type: 'fruits', image: './images/PXL_20250410_061108285_res.jpg', description: '(ממול לעגלת הקפה) עץ תות' },
  { x: 6, y: 37, type: 'fruits', image: './images/PXL_20250410_061437406_res.jpg', description: '(צפונית לגינת הפרפרים) עץ תות' },
  { x: 6, y: 40, type: 'garden', image: './images/PXL_20250410_061337699_res.jpg', description: 'גינת הפרפרים' },
  { x: 25, y: 58, type: 'playground', image: './images/PXL_20250410_061621983_res.jpg', description: 'פינת הטרקטור לישיבה ומשחק לקטנטנים' },
  { x: 34, y: 53, type: 'fruits', image: './images/PXL_20250410_061849635_res.jpg', description: '(בקרבת רחבת בית הכנסת) עץ תות' },
  { x: 40, y: 53, type: 'fruits', image: './images/PXL_20250410_062024140_res.jpg', description: '(מזרחית למגרש החניה) עץ תות' }
];

// Function to define the color for each type of point
function getPointColor(type) {
  const colors = {
    garden: 'green',   // Green for garden
    playground: 'blue',       // Blue for playground
    fruits: 'orange',       // Orange for fruits
    default: 'red'        // Red for other points
  };
  return colors[type] || colors.default;
}

// Function to update the points' positions
function updatePoints() {
  const mapContainer = document.getElementById('mapContainer');
  const mapWidth = mapContainer.offsetWidth;
  const mapHeight = mapContainer.offsetHeight;

  // Remove existing points
  const pointsContainer = document.getElementById('pointsContainer');
  pointsContainer.innerHTML = '';
  
  // Loop through points and add them to the map
  points.forEach(point => {
    addPoint(point, mapWidth, mapHeight);
  });
}  

// Function to add a clickable point to the map
function addPoint(point, mapWidth, mapHeight) {
  const pointDiv = document.createElement('div');
  pointDiv.classList.add('point');

  // Position the point using percentages of map size
  pointDiv.style.left = `${(point.x / 100) * mapWidth}px`;
  pointDiv.style.top = `${(point.y / 100) * mapHeight}px`;

  // Style based on type
  pointDiv.style.backgroundColor = getPointColor(point.type);

  pointDiv.addEventListener('click', (event) => {
    event.stopPropagation();
    showOverlay(point.image, point.description);
  });

  document.getElementById('pointsContainer').appendChild(pointDiv);
}

// Function to show overlay with point details
function showOverlay(image, description) {
  document.getElementById('overlay').style.display = 'flex';
  document.getElementById('overlayImage').src = image;
  document.getElementById('overlayDescription').textContent = description;
}

// Close the overlay when the close button is clicked
document.getElementById('closeBtn').addEventListener('click', () => {
  document.getElementById('overlay').style.display = 'none';
});

// Close the overlay when clicking outside the overlay content
document.getElementById('overlay').addEventListener('click', (event) => {
  // Close the overlay only if the user clicks outside the content
  if (event.target === document.getElementById('overlay')) {
    document.getElementById('overlay').style.display = 'none';
  }
});

// Preload images function
function preloadImages(imageUrls) {
  const promises = imageUrls.map(url => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = resolve;
      img.onerror = reject;
    });
  });
  return Promise.all(promises);
}

// Collect all image URLs from points and preload them
function preloadPointImages() {
  const imageUrls = [];

  points.forEach(point => {
    const imageUrl = point.image;
    if (imageUrl) {
      imageUrls.push(imageUrl);
    }
  });

  return preloadImages(imageUrls);
}

// Call preload function on page load
window.addEventListener('load', () => {
  preloadPointImages().then(() => {
    console.log('Images preloaded successfully');
  }).catch(error => {
    console.error('Error preloading images:', error);
  });
});

// Initial load
updatePoints();

// Recalculate points when the window is resized
window.addEventListener('resize', updatePoints);

// Positioning after page load
window.addEventListener('load', updatePoints);


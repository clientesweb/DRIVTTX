// Preloader
window.addEventListener('load', function() {
    document.getElementById('preloader').style.display = 'none';
});

// Fade-in effect
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

// Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('#carousel img');
const totalSlides = slides.length;

function showSlide(n) {
    currentSlide = (n + totalSlides) % totalSlides;
    const offset = -currentSlide * 100;
    document.getElementById('carousel').style.transform = `translateX(${offset}%)`;
}

document.getElementById('prevBtn').addEventListener('click', () => showSlide(currentSlide - 1));
document.getElementById('nextBtn').addEventListener('click', () => showSlide(currentSlide + 1));

// Auto-advance carousel
setInterval(() => showSlide(currentSlide + 1), 5000);

// YouTube API
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('live-video-container', {
        height: '360',
        width: '640',
        videoId: 'VIDEO_ID', // Replace with your video ID
        playerVars: {
            'autoplay': 1,
            'controls': 1,
        },
        events: {
            'onReady': onPlayerReady,
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

// Load YouTube IFrame Player API code asynchronously
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Load playlist videos
function loadPlaylistVideos() {
    const playlistId = 'YOUR_PLAYLIST_ID'; // Replace with your playlist ID
    const apiKey = 'YOUR_API_KEY'; // Replace with your YouTube API key
    const maxResults = 10; // Number of videos to load

    fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${playlistId}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const playlistContainer = document.getElementById('playlist-container');
            data.items.forEach(item => {
                const videoId = item.snippet.resourceId.videoId;
                const title = item.snippet.title;
                const thumbnail = item.snippet.thumbnails.medium.url;

                const videoElement = document.createElement('div');
                videoElement.className = 'flex-shrink-0 w-64';
                videoElement.innerHTML = `
                    <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noopener noreferrer" class="block">
                        <img src="${thumbnail}" alt="${title}" class="w-full h-36 object-cover rounded-lg shadow-md">
                        <p class="mt-2 text-sm font-semibold">${title}</p>
                    </a>
                `;
                playlistContainer.appendChild(videoElement);
            });
        })
        .catch(error => console.error('Error loading playlist:', error));
}

loadPlaylistVideos();

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message. We will get back to you soon!');
    this.reset();
});

// Newsletter form submission
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your newsletter subscription logic here
    alert('Thank you for subscribing to our newsletter!');
    this.reset();
});

// Scroll to top button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.remove('hidden');
    } else {
        scrollToTopBtn.classList.add('hidden');
    }
});

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Gallery filter
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        filterButtons.forEach(btn => btn.classList.remove('active', 'bg-primary', 'text-black'));
        button.classList.add('active', 'bg-primary', 'text-black');

        galleryItems.forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Reviews
const reviews = [
    { name: "John Doe", text: "DRIVTT Cars captured my Lamborghini beautifully. The video quality is outstanding!", rating: 5, profilePic: "path/to/john-doe.jpg" },
    { name: "Jane Smith", text: "Professional service and amazing results. Highly recommend for any car enthusiast.", rating: 5, profilePic: "path/to/jane-smith.jpg" },
    { name: "Mike Johnson", text: "The team at DRIVTT Cars knows how to showcase luxury vehicles. Excellent work!", rating: 4, profilePic: "path/to/mike-johnson.jpg" }
];

function renderReviews() {
    const container = document.getElementById('reviews-container');
    container.innerHTML = '';
    reviews.forEach((review) => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'bg-gray-900 p-6 rounded-lg';
        reviewElement.innerHTML = `
            <div class="flex items-center mb-4">
                <img src="${review.profilePic}" alt="${review.name}" class="w-12 h-12 rounded-full mr-4">
                <div>
                    <h3 class="font-bold text-primary">${review.name}</h3>
                    <div class="flex">
                        ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
                    </div>
                </div>
            </div>
            <p class="text-lg">"${review.text}"</p>
        `;
        container.appendChild(reviewElement);
    });
}

renderReviews();

// Marcas slider
const marcas = [
    { name: "Brand 1", logo: "path/to/brand1-logo.png" },
    { name: "Brand 2", logo: "path/to/brand2-logo.png" },
    { name: "Brand 3", logo: "path/to/brand3-logo.png" },
    { name: "Brand 4", logo: "path/to/brand4-logo.png" },
    { name: "Brand 5", logo: "path/to/brand5-logo.png" }
];

function renderMarcas() {
    const container = document.getElementById('marcas-slider');
    marcas.forEach((marca) => {
        const marcaElement = document.createElement('div');
        marcaElement.className = 'flex-shrink-0 w-48 mx-4';
        marcaElement.innerHTML = `
            <img src="${marca.logo}" alt="${marca.name}" class="w-full h-auto">
        `;
        container.appendChild(marcaElement);
    });
    // Duplicate the brands for seamless looping
    container.innerHTML += container.innerHTML;
}

renderMarcas();

// PWA Installation
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('installPWA').classList.remove('hidden');
});

document.getElementById('installPWA').addEventListener('click', (e) => {
    document.getElementById('installPWA').classList.add('hidden');
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
    });
});
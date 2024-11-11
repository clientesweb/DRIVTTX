document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // Top Banner with rotating messages and call-to-action buttons
    const bannerMessages = [
        {
            text: "Latest news: Stay informed with DRIVTT Cars - Dubai's premier car videography service",
            cta: "View News",
            link: "#noticias"
        },
        {
            text: "Book your luxury car video shoot today",
            cta: "Book Now",
            link: "#contacto"
        },
        {
            text: "Download our app to stay connected",
            cta: "Download App",
            link: "#descargar-app"
        },
        {
            text: "Follow DRIVTT Cars on all our social media",
            cta: "Follow",
            link: "https://www.instagram.com/drivtt"
        }
    ];
    const bannerElement = document.getElementById('banner-messages');
    let currentMessageIndex = 0;

    function setupBannerMessages() {
        bannerElement.innerHTML = bannerMessages.map(message => `
            <div class="flex-shrink-0 w-full flex justify-between items-center">
                <span>${message.text}</span>
                <a href="${message.link}" class="ml-4 bg-black text-primary px-3 py-1 rounded-full text-sm font-bold hover:bg-gray-800 transition-colors duration-300">${message.cta}</a>
            </div>
        `).join('');
    }

    function rotateBannerMessage() {
        currentMessageIndex = (currentMessageIndex + 1) % bannerMessages.length;
        bannerElement.style.transform = `translateX(-${currentMessageIndex * 100}%)`;
    }

    setupBannerMessages();
    setInterval(rotateBannerMessage, 5000); // Rotate message every 5 seconds

    // Image carousel
    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;

    function showSlide(index) {
        carousel.style.transform = `translateX(-${index * 100}%)`;
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + carousel.children.length) % carousel.children.length;
        showSlide(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % carousel.children.length;
        showSlide(currentIndex);
    });

    // Change slide automatically every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % carousel.children.length;
        showSlide(currentIndex);
    }, 5000);

    // YouTube functionality
    const API_KEY = 'YOUR_YOUTUBE_API_KEY';
    const PLAYLIST_ID = 'YOUR_PLAYLIST_ID';

    async function fetchPlaylistItems() {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=55&key=${API_KEY}`);
        const data = await response.json();
        return data.items;
    }

    function displayLiveVideo(video) {
        const liveContainer = document.getElementById('live-video-container');
        liveContainer.innerHTML = `
            <iframe 
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/${video.snippet.resourceId.videoId}?autoplay=1" 
                frameborder="0" 
                allow="autoplay; encrypted-media" 
                allowfullscreen>
            </iframe>
        `;
    }

    function displayPlaylist(videos) {
        const playlistContainer = document.getElementById('playlist-container');
        playlistContainer.innerHTML = '';

        videos.slice(1, 5).forEach(video => {
            const videoItem = document.createElement('div');
            videoItem.classList.add('flex-shrink-0', 'w-72', 'h-40');
            videoItem.innerHTML = `
                <iframe 
                    class="w-full h-full rounded-xl"
                    src="https://www.youtube.com/embed/${video.snippet.resourceId.videoId}" 
                    frameborder="0" 
                    allow="encrypted-media" 
                    allowfullscreen>
                </iframe>
            `;
            playlistContainer.appendChild(videoItem);
        });
    }

    async function loadVideos() {
        const videos = await fetchPlaylistItems();
        if (videos.length > 0) {
            const latestVideos = videos.reverse().slice(0, 5);
            displayLiveVideo(latestVideos[0]);
            displayPlaylist(latestVideos);
        } else {
            console.warn('No videos found in the playlist.');
        }
    }

    loadVideos();

    // WhatsApp functionality
    const whatsappBtn = document.getElementById('whatsappBtn');
    const whatsappModal = document.getElementById('whatsappModal');
    const closeModal = document.getElementById('closeModal');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const whatsappMessage = document.getElementById('whatsappMessage');

    whatsappBtn.addEventListener('click', () => {
        whatsappModal.classList.remove('hidden');
    });

    closeModal.addEventListener('click', () => {
        whatsappModal.classList.add('hidden');
    });

    sendMessageBtn.addEventListener('click', () => {
        const message = whatsappMessage.value.trim();
        if (message) {
            const phoneNumber = '+971558363696';
            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
            whatsappModal.classList.add('hidden');
            whatsappMessage.value = '';
        } else {
            alert('Please write a message before sending.');
        }
    });

    // Close the modal if clicked outside
    window.addEventListener('click', (event) => {
        if (event.target === whatsappModal) {
            whatsappModal.classList.add('hidden');
        }
    });

    // PWA installation functionality
    let deferredPrompt;
    const installButton = document.getElementById('install-button');

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installButton.classList.remove('hidden');
    });

    installButton.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                console.log('User accepted the install prompt');
            }
            deferredPrompt = null;
        }
    });

    // Contact form
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const whatsappMessage = `Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
        const phoneNumber = '+971558363696';
        const url = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
        window.open(url, '_blank');
        contactForm.reset();
    });

    // Newsletter
    const newsletterForm = document.getElementById('newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = newsletterForm.querySelector('input[type="text"]').value;
        const whatsapp = newsletterForm.querySelector('input[type="tel"]').value;
        const message = `New newsletter subscriber:%0AName: ${name}%0AWhatsApp: ${whatsapp}`;
        const phoneNumber = '+971558363696';
        const url = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(url, '_blank');
        newsletterForm.reset();
    });

    // Reviews Section
    const reviews = [
        { name: "Sarah M.", rating: 5, text: "DRIVTT Cars captured my Lamborghini beautifully. Their attention to detail is unmatched!" },
        { name: "Ahmed K.", rating: 4, text: "Professional service and stunning results. Will definitely use them again for my next car shoot." },
        { name: "Emma L.", rating: 5, text: "The drone shots they took of my Porsche were absolutely breathtaking. Highly recommended!" },
        { name: "Hassan R.", rating: 4, text: "Great team to work with. They made the whole process easy and enjoyable." },
        { name: "Olivia T.", rating: 5, text: "DRIVTT Cars truly knows how to showcase luxury vehicles. The video they made for my Rolls-Royce is simply perfect." }
    ];

    const reviewsContainer = document.getElementById('reviews-container');
    const prevReviewBtn = document.getElementById('prevReview');
    const nextReviewBtn = document.getElementById('nextReview');
    let currentReviewIndex = 0;

    function setupReviews() {
        reviewsContainer.innerHTML = reviews.map(review => `
            <div class="flex-shrink-0 w-full px-4">
                <div class="bg-gray-900 p-6 rounded-lg shadow">
                    <div class="flex items-center mb-4">
                        <div class="text-primary">
                            ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
                        </div>
                        <div class="ml-2 font-bold text-white">${review.name}</div>
                    </div>
                    <p class="text-gray-300">${review.text}</p>
                </div>
            </div>
        `).join('');
    }

    function showReview(index) {
        reviewsContainer.style.transform = `translateX(-${index * 100}%)`;
    }

    prevReviewBtn.addEventListener('click', () => {
        currentReviewIndex = (currentReviewIndex - 1 + reviews.length) % reviews.length;
        showReview(currentReviewIndex);
    });

    nextReviewBtn.addEventListener('click', () => {
        currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
        showReview(currentReviewIndex);
    });

    setupReviews();
    setInterval(() => {
        currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
        showReview(currentReviewIndex);
    }, 5000); // Auto-rotate reviews every 5 seconds

    // Fade-in effect for sections
    const fadeInElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInElements.forEach(element => {
        observer.observe(element);
    });

    // Gallery filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Update active buttons
            filterButtons.forEach(btn => btn.classList.remove('active', 'bg-primary', 'text-black'));
            filterButtons.forEach(btn => btn.classList.add('bg-gray-200', 'text-gray-800'));
            button.classList.add('active', 'bg-primary', 'text-black');
            button.classList.remove('bg-gray-200', 'text-gray-800');

            // Filter gallery items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

console.log("DRIVTT Cars JavaScript loaded successfully!");
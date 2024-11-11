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

// Banner messages
const bannerMessages = [
    "Welcome to DRIVTT Cars - Dubai's Premier Car Videography Service",
    "Book your luxury car video shoot today!",
    "Follow us on Instagram for daily supercar content"
];

let currentBannerMessage = 0;

function rotateBannerMessage() {
    currentBannerMessage = (currentBannerMessage + 1) % bannerMessages.length;
    const bannerContainer = document.getElementById('banner-messages');
    bannerContainer.style.transform = 'translateY(-100%)';
    setTimeout(() => {
        bannerContainer.innerHTML = `<p class="text-center w-full">${bannerMessages[currentBannerMessage]}</p>`;
        bannerContainer.style.transform = 'translateY(0)';
    }, 500);
}

setInterval(rotateBannerMessage, 5000);
rotateBannerMessage();  // Initial call to display the first message

// Reviews carousel
const reviews = [
    { name: "John Doe", text: "DRIVTT Cars captured my Lamborghini beautifully. The video quality is outstanding!", rating: 5 },
    { name: "Jane Smith", text: "Professional service and amazing results. Highly recommend for any car enthusiast.", rating: 5 },
    { name: "Mike Johnson", text: "The team at DRIVTT Cars knows how to showcase luxury vehicles. Excellent work!", rating: 4 }
];

function showReviews() {
    const container = document.getElementById('reviews-container');
    container.innerHTML = '';
    reviews.forEach((review) => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'w-80 flex-shrink-0 p-4 snap-center';
        reviewElement.innerHTML = `
            <div class="bg-gray-900 p-6 rounded-lg h-full flex flex-col justify-between">
                <div>
                    <p class="text-lg mb-4">"${review.text}"</p>
                    <p class="font-bold text-primary">- ${review.name}</p>
                </div>
                <div class="flex justify-center mt-4">
                    ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
                </div>
            </div>
        `;
        container.appendChild(reviewElement);
    });
}

showReviews();

// Brands carousel
const brands = [
    'Brand1', 'Brand2', 'Brand3', 'Brand4', 'Brand5', 'Brand6'
];

function showBrands() {
    const container = document.getElementById('brands-container');
    const brandElements = brands.map(brand => `
        <div class="flex-shrink-0 w-40 h-20 mx-4 bg-gray-800 rounded-lg flex items-center justify-center">
            <img src="/placeholder.svg?height=80&width=160" alt="${brand}" class="max-w-full max-h-full">
        </div>
    `).join('');
    container.innerHTML = brandElements + brandElements; // Duplicate for seamless loop
}

showBrands();

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

// PWA Installation
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

document.getElementById('install-pwa').addEventListener('click', (e) => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
        });
    }
});

// Reservation Modal
const openReservationModal = document.getElementById('openReservationModal');
const closeReservationModal = document.getElementById('closeReservationModal');
const reservationModal = document.getElementById('reservationModal');
const reservationForm = document.getElementById('reservationForm');

openReservationModal.addEventListener('click', () => {
    reservationModal.classList.remove('hidden');
});

closeReservationModal.addEventListener('click', () => {
    reservationModal.classList.add('hidden');
});

reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(reservationForm);
    let message = "New Reservation:\n\n";
    for (let [key, value] of formData.entries()) {
        message += `${key}: ${value}\n`;
    }
    
    // Replace this URL with your actual WhatsApp API endpoint
    const whatsappUrl = `https://api.whatsapp.com/send?phone=YOUR_PHONE_NUMBER&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    reservationModal.classList.add('hidden');
    reservationForm.reset();
});

// Close modal if clicking outside
reservationModal.addEventListener('click', (e) => {
    if (e.target === reservationModal) {
        reservationModal.classList.add('hidden');
    }
});
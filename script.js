let currentPage = 1;
const totalPages = 5;


function flipPage(page) {
    if (currentPage >= totalPages) return;

    page.style.transform = 'rotateY(-180deg)';
    setTimeout(() => {
        page.style.display = 'none';
    }, 500);

    currentPage++;
    const nextPage = document.querySelector(`.page-${currentPage}`);
    nextPage.style.zIndex = totalPages - currentPage + 1;
    nextPage.style.display = 'flex';
    nextPage.style.transform = 'rotateY(0deg)';
}

// Поддержка свайпов
let touchStartX = 0;
document.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX);
document.addEventListener('touchend', e => {
    const touchEndX = e.changedTouches[0].clientX;
    const delta = touchStartX - touchEndX;

    if (Math.abs(delta) > 50 && delta > 0 && currentPage < totalPages) {
        flipPage(document.querySelector(`.page-${currentPage}`));
    }
});

let currentIndex = 0;

function showSlide(index) {
    const carouselInner = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;

    if (index >= totalItems) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalItems - 1;
    } else {
        currentIndex = index;
    }

    const offset = -currentIndex * 100;
    carouselInner.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

// Автоматическое перелистывание (опционально)
setInterval(nextSlide, 3000); // Перелистывание каждые 3 секунды
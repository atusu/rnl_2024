document.addEventListener('keydown', function(e) {
    if (e.keyCode == 65) {
        document.getElementById('audio').play();
    }
});

document.addEventListener("keydown", function (event) {
    const currentSlide = document.querySelector(".current");
    let nextSlide;

    if (event.key === "ArrowRight") {
        nextSlide = currentSlide.nextElementSibling;
    } else if (event.key === "ArrowLeft") {
        nextSlide = currentSlide.previousElementSibling;
    }

    if (nextSlide && nextSlide.classList.contains("slide")) {
        currentSlide.classList.remove("current");
        nextSlide.classList.add("current");
    }
});

const images = document.querySelectorAll('.animate');
let currentImageIndex = 0;

function showImage(index, isNext) {
const previousImage = images[currentImageIndex];
const nextImage = images[index];

// Add the 'active' class to the next image
nextImage.classList.add('active');

// Define the animation directions based on the key press
const nextDirection = isNext ? '150%' : '-150%';
const prevDirection = isNext ? '-150%' : '150%';

// Animate the current image to the left (or right) and fade out
gsap.to(previousImage, { x: prevDirection, opacity: 0, duration: 0.5, onComplete: () => {
    previousImage.style.transform = ''; // Reset transform after animation
    previousImage.classList.remove('active');
}});

// Animate the next image to slide in from the right (or left) and fade in
gsap.fromTo(nextImage, { x: nextDirection, opacity: 0 }, { x: '0', opacity: 1, duration: 0.5 });

currentImageIndex = index;
}

document.addEventListener('keydown', (event) => {
if (event.key === 'd') {
    const nextIndex = (currentImageIndex + 1) % images.length;
    if (nextIndex !== 0) { // Prevent advancing past the last image
        showImage(nextIndex, true); // Pass true for next animation
    }
} else if (event.key === 'a') {
    const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
    if (currentImageIndex !== 0) { // Prevent going before the first image
        showImage(prevIndex, false); // Pass false for previous animation
    }
}
});

// Show the initial image
images[currentImageIndex].classList.add('active');
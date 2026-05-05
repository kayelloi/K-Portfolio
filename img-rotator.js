const images = document.querySelectorAll('.image-rotator img');
let index = 0;

function nextImage() {
    images[index].classList.remove('is-active');
    index = (index + 1) % images.length;
    images[index].classList.add('is-active');
}

let interval = setInterval(nextImage, 2000);

const container = document.querySelector('.image-rotator');

container.addEventListener('mouseenter', () => clearInterval(interval));

container.addEventListener('mouseleave', () => {
    interval = setInterval(nextImage, 2000);
});
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');
hamburger.addEventListener ('click', () => {
    hamburger.classList.toggle('hamburger-activate');
    navMenu.classList.toggle('hidden');
});
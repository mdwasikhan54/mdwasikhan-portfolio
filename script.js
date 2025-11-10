const navMenu = document.getElementById('nav-menu');
const closeMenu = () => {
    navMenu.classList.remove('active');
    menuToggleBtn.classList.remove('active');
};
document.querySelectorAll('.nav-menu ul li a').forEach(link => {
    link.addEventListener('click', closeMenu);
});
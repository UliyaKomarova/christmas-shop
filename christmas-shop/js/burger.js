function burgerMenu() {
    const burgerButton = document.getElementById('burgerButton');
    const nav = document.getElementById('nav');
    const body = document.querySelector('body');
    const activeClassElement = '_active';
    const noScrollPageClass = '_no-scroll';

    burgerButton.addEventListener('click', toggleBurger);
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('nav-list__link')
            || event.target.classList.contains('nav-list__item'))
        {
            closeBurger();
        }
    });
    window.addEventListener('resize', () => {
        const windowWidth = document.documentElement.clientWidth;

        if (windowWidth > 768 && nav.classList.contains(activeClassElement)) {
            closeBurger();
        }
    });

    function toggleBurger() {
        burgerButton.classList.toggle(activeClassElement);
        nav.classList.toggle(activeClassElement);
        body.classList.toggle(noScrollPageClass);
    };

    function closeBurger() {
        burgerButton.classList.remove(activeClassElement);
        nav.classList.remove(activeClassElement);
        body.classList.remove(noScrollPageClass);
    };
};

burgerMenu();


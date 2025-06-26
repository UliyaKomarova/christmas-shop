function scrollToTop() {
    const scrollButtonContainer = document.querySelector('.scroll-page');
    const scrollButton = document.getElementById('scrollToTop');
    const activeClass = '_active';

    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {
        let scrollPosition = window.scrollY;

        if (scrollPosition > 300) {
            scrollButtonContainer.classList.add(activeClass);
        } else {
            scrollButtonContainer.classList.remove(activeClass);
        }
    })
};

scrollToTop();
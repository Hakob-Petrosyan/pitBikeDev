
function openCloseBlock() {
    const openBlockBtn = document.querySelectorAll('[data-open-block-btn]');
    openBlockBtn.forEach(openBtn => {
        openBtn?.addEventListener('click', (event) => {
            const openBlockWrapper = event.target.closest('[data-open-block-wrapper]');
            const openingBlock = openBlockWrapper.querySelector('[data-open-block]');
            openBlockWrapper.classList.toggle('open');
            if (openingBlock.style.maxHeight) {
                openingBlock.removeAttribute('style');
            } else {
                openingBlock.style.maxHeight = openingBlock.scrollHeight + 'px';
            }
        })
    })
}
function mobileMenu(){
    const openMobileMenu = document.querySelector('[data-open-mobile-menu]');
    const headerContainer = document.querySelector('[data-header-container]');
    openMobileMenu?.addEventListener('click', () => {
        headerContainer.classList.add('open-menu');
        document.body.style.overflow = 'hidden';
    })
}
function closeMobileMenu(){
    const closeMobileMenu = document.querySelector('[data-close-mobile-menu]')
    closeMobileMenu?.addEventListener('click', () => {
        const headerContainer = document.querySelector('[data-header-container]');
        headerContainer.classList.remove('open-menu');
        document.body.style.overflow = '';
    })
}


document.addEventListener('DOMContentLoaded', function() {
    openCloseBlock()
    mobileMenu()
    closeMobileMenu()
})
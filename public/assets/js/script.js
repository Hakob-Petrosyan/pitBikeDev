
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
function initMarquees() {
    document.querySelectorAll("[data-marquee]").forEach((marquee) => {
        const track = marquee.querySelector(".marquee-text-track");
        if (track) {
            const originalContent = track.innerHTML;

            const hiddenContent1 = originalContent.replace(
                /<p>/g,
                '<p aria-hidden="true">'
            );
            const hiddenContent2 = originalContent.replace(
                /<p>/g,
                '<p aria-hidden="true">'
            );

            track.innerHTML = originalContent + hiddenContent1 + hiddenContent2;
        }
    });
}


document.addEventListener('DOMContentLoaded', function() {
    openCloseBlock()
    mobileMenu()
    closeMobileMenu()
    initMarquees()
})



function initSliders() {
    const sliderGroupItems = document.querySelectorAll('[data-slider-group-item]');
    if (!sliderGroupItems.length) return;

    sliderGroupItems.forEach(sliderItem => {
        const {
            sliderGroupItem,
            spaceBetween,
            spaceBetweenTablet,
            spaceBetweenMobile,
            slidesView,
            slidesViewTablet,
            slidesViewMobile,
            grabCursor,
            autoPlay,
            slidesLoop,
            reverseDirection,
            slidesSpeed,
            paginationClickable,
            slidesDelay,
            slidesGroup,
            slidesGroupTablet,
            slidesGroupMobile,
            paginationType,
            paginationTypeTablet,
            paginationTypeMobile,
        } = sliderItem.dataset;

        const mobileGroup = parseInt(slidesGroupMobile) || 1;
        const tabletGroup = parseInt(slidesGroupTablet) || 1;
        const desktopGroup = parseInt(slidesGroup) || 1;

        const isGrabCursor = grabCursor === 'true';
        const isAutoPlay = autoPlay === 'true';
        const isSlidesLoop = slidesLoop === 'true';
        const isReverseDirection = reverseDirection === 'true';
        const isPaginationClickable = paginationClickable === 'true';

        // Определяем тип пагинации по брейкпоинтам
        const getPaginationType = () => {
            const width = window.innerWidth;
            if (width < 576) return paginationTypeMobile || paginationTypeTablet || paginationType || 'bullets';
            if (width < 992) return paginationTypeTablet || paginationType || 'bullets';
            return paginationType || 'bullets';
        };

        const paginationEl = `#swiper-pagination__${sliderGroupItem}`;




        // Базовая конфигурация
        const swiperConfig = {
            grabCursor: isGrabCursor,
            loop: isSlidesLoop,
            navigation: {
                nextEl: `#toRight_${sliderGroupItem}`,
                prevEl: `#toLeft_${sliderGroupItem}`,
            },
            breakpoints: {
                300: {
                    spaceBetween: parseFloat(spaceBetweenMobile) || 0,
                    slidesPerView: parseFloat(slidesViewMobile) || 1,
                    slidesPerGroup: mobileGroup,
                },
                576: {
                    spaceBetween: parseFloat(spaceBetweenTablet) || 0,
                    slidesPerView: parseFloat(slidesViewTablet) || 1,
                    slidesPerGroup: tabletGroup,
                },
                1220: {
                    spaceBetween: parseFloat(spaceBetween) || 0,
                    slidesPerView: parseFloat(slidesView) || 1,
                    slidesPerGroup: desktopGroup,
                },
            },
            pagination: {
                el: paginationEl,
                clickable: isPaginationClickable,
                type: getPaginationType(),
                progressbarFillClass: 'swiper-pagination-progressbar-fill',
                renderProgressbar(progressbarFillClass) {
                    return `<span class="${progressbarFillClass}"></span>`;
                },
            },
            speed: parseInt(slidesSpeed) || 1000,
            autoplay: isAutoPlay ? {
                delay: parseInt(slidesDelay) || 3000,
                reverseDirection: isReverseDirection,
            } : false,
        };

        const swiper = new Swiper(`#${sliderGroupItem}`, swiperConfig);

        // При ресайзе обновляем тип пагинации под устройство
        window.addEventListener('resize', () => {
            const newType = getPaginationType();
            if (swiper.params.pagination.type !== newType) {
                swiper.params.pagination.type = newType;
                swiper.pagination.destroy();
                swiper.pagination.init();
                swiper.pagination.render();
                swiper.pagination.update();
            }
        });
    });
}
initSliders()
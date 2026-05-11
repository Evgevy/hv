document.addEventListener("DOMContentLoaded", function () {
    if (typeof Fancybox !== "undefined") {
        Fancybox.bind("[data-fancybox]", {});
    }

    const burger = document.getElementById('burgerBtn');
    const menu = document.getElementById('mobileMenu');
    const close = document.querySelector('.m-close');
    const body = document.body;

    burger.addEventListener('click', () => {
        burger.classList.add('active');
        menu.classList.add('active');
        body.classList.add('no-scroll');
    });
    close.addEventListener('click', () => {
        burger.classList.remove('active');
        menu.classList.remove('active');
        body.classList.remove('no-scroll');
    })


    // HEADER

    const header = document.querySelector('.header');

    if (header) {

        let lastScroll = 0;

        // через сколько начинаем скрывать
        const scrollOffset = header.offsetHeight + 50;

        // body offset
        const setHeaderHeight = () => {
            document.body.style.paddingTop = `${header.offsetHeight}px`;
        };

        setHeaderHeight();

        window.addEventListener('resize', setHeaderHeight);

        window.addEventListener('scroll', () => {

            const currentScroll = window.pageYOffset;

            // в верхней зоне всегда показываем
            if (currentScroll <= scrollOffset) {

                header.classList.remove('header-hidden');

                lastScroll = currentScroll;
                return;
            }

            // скролл вниз
            if (currentScroll > lastScroll) {
                header.classList.add('header-hidden');
            }

            // скролл вверх
            else {
                header.classList.remove('header-hidden');
            }

            lastScroll = currentScroll;

        });

    }

    // Поиск
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');

    const desktopSearchTrigger = document.getElementById('searchTrigger');
    const mobileSearchTrigger = document.getElementById('mobileSearchTrigger');

    if (searchOverlay && searchClose) {

        const openSearch = () => {
            searchOverlay.classList.add('active');
            document.body.classList.add('search-open');
        };

        const closeSearch = () => {
            searchOverlay.classList.remove('active');
            document.body.classList.remove('search-open');
        };

        // ✔️ desktop
        if (desktopSearchTrigger) {
            desktopSearchTrigger.addEventListener('click', (e) => {
                e.preventDefault();
                openSearch();
            });
        }

        // ✔️ mobile
        if (mobileSearchTrigger) {
            mobileSearchTrigger.addEventListener('click', (e) => {
                e.preventDefault();
                openSearch();
            });
        }

        // close
        if (searchClose) {
            searchClose.addEventListener('click', closeSearch);
        }

        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) closeSearch();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeSearch();
        });
    }



   
    let currentCity = "Санкт-Петербург";

const cityOverlay = document.getElementById('cityOverlay');
const cityClose = document.getElementById('cityClose');

const cityDesktop = document.querySelector('.city-current');
const cityMobile = document.querySelector('.city-current-mobile');


// ======================
// ОТКРЫТИЕ (ВСЕ КНОПКИ)
// ======================
const cityTriggers = document.querySelectorAll('.city-trigger');

cityTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
        if (cityOverlay) {
            cityOverlay.classList.add('active');
        }
    });
});


// ======================
// ЗАКРЫТИЕ
// ======================
if (cityClose && cityOverlay) {
    cityClose.addEventListener('click', () => {
        cityOverlay.classList.remove('active');
    });
}


// ======================
// ВЫБОР ГОРОДА
// ======================
document.querySelectorAll('.city-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        currentCity = item.textContent.trim();

        if (cityDesktop) cityDesktop.textContent = currentCity;
        if (cityMobile) cityMobile.textContent = currentCity;

        if (cityOverlay) {
            cityOverlay.classList.remove('active');
        }
    });
});





    const heroSliderEl = document.querySelector(".hero-slider");

    if (heroSliderEl && typeof Swiper !== "undefined") {

        const heroSlider = new Swiper(heroSliderEl, {
            slidesPerView: 1,
            spaceBetween: 16,
            loop: true,
            speed: 1200,
            autoplay: {
                delay: 4000, 
                // disableOnInteraction: false,
            },
            pagination: {
                el: ".hero-pagination",
                clickable: true,
            },

            navigation: {
                nextEl: ".hero-button-next",
                prevEl: ".hero-button-prev",
            },
        });

    }

    const popularSliderEl = document.querySelector(".popular-slider");

    if (popularSliderEl && typeof Swiper !== "undefined") {

        new Swiper(popularSliderEl, {
            slidesPerView: 6,
            spaceBetween: 20,
            loop: false,

            navigation: {
                nextEl: ".popular-button-next",
                prevEl: ".popular-button-prev",
            },

            breakpoints: {
                1900: {
                    slidesPerView: 6,
                },
                1400: {
                    slidesPerView: 5,
                },
                992: {
                    slidesPerView: 4,
                }
            }
        });

    }


    document.querySelectorAll('.nds-toggle input').forEach(toggle => {

        const label = toggle.closest('label');
        const textSpan = label.querySelector('.nds-text');
    
        const priceBlock = toggle.closest('.price');
        if (!priceBlock) return;
    
        const priceValue = priceBlock.querySelector('.price-value');
        if (!priceValue) return;
    
        let priceNds = priceValue.dataset.priceNds;
    
        if (!priceNds) {
            const text = priceValue.textContent.replace(/[^\d.,]/g, '').replace(/\s/g, '');
            priceNds = parseFloat(text.replace(',', '.'));
            priceValue.dataset.priceNds = priceNds;
        }
    
        let priceNoNds = priceValue.dataset.priceNoNds;
        if (!priceNoNds) {
            priceNoNds = priceNds / 1.22;
            priceValue.dataset.priceNoNds = priceNoNds;
        }
    
        const formatPrice = (price) => {
            const rounded = Math.round(price * 100) / 100;
            const parts = rounded.toFixed(2).split('.');
            const rubles = Number(parts[0]).toLocaleString('ru-RU');
            const kopecks = parts[1];
            return rubles + '.' + kopecks;
        };
    
        const updatePrice = () => {
            if (toggle.checked) {
                textSpan.textContent = 'С НДС';
                priceValue.textContent = formatPrice(priceNds) + ' ₽';
            } else {
                textSpan.textContent = 'БЕЗ НДС';
                priceValue.textContent = formatPrice(priceNoNds) + ' ₽';
            }
        };
    
        updatePrice();
        toggle.addEventListener('change', updatePrice);
    });

    const goodsSliderEl = document.querySelector('.goods-slider');

    if (goodsSliderEl && typeof Swiper !== 'undefined') {
        new Swiper(goodsSliderEl, {
            slidesPerView: 4,
            spaceBetween: 24,
            loop: false,
            
            navigation: {
                nextEl: '.goods-button-next',
                prevEl: '.goods-button-prev',
            },
            
            breakpoints: {
                1400: {
                    slidesPerView: 4,
                    spaceBetween: 16,
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 13,
                },
                576: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                }
            }
        });
    }

    document.querySelectorAll('.product-image-slider').forEach((el) => {
        const card = el.closest('.product-card');
        const pagination = card.querySelector('.product-image-pagination');
        const slides = el.querySelectorAll('.swiper-slide');
    
        const swiper = new Swiper(el, {
            slidesPerView: 1,
            effect: 'fade',
            fadeEffect: { crossFade: true },
            speed: 500,
    
            allowTouchMove: true,
    
            pagination: {
                el: pagination,
                clickable: true,
                // dynamicBullets: true
            },
    
            breakpoints: {
                992: {
                    allowTouchMove: false
                }
            }
        });
    
        // hover только десктоп
        if (window.matchMedia('(min-width: 992px)').matches) {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
    
                const index = Math.min(
                    slides.length - 1,
                    Math.max(0, Math.floor(x / (rect.width / slides.length)))
                );
    
                swiper.slideTo(index, 500);
            });
        }
    });

    const partnerSliderEl = document.querySelector('.partners-slider');

    if (partnerSliderEl && typeof Swiper !== 'undefined') {
        new Swiper(partnerSliderEl, {
            slidesPerView: 'auto',
            spaceBetween: 20,
            loop: false,
            
            navigation: {
                nextEl: '.partners-button-next',
                prevEl: '.partners-button-prev',
            },
            
            breakpoints: {
                576: {
                    spaceBetween: 20,
                },
                300: {
                    spaceBetween: 10,
                }
            }
        });
    }

    function format(num) {
        if (!num && num !== 0) return '';
        return Number(num).toLocaleString('ru-RU');
    }

    $(function () {

        if (!document.querySelector('#leasing-calculator')) return;
    
        let state = { price: 700000, percent: 10, term: 13 };
    
        function update() {
    
            const percentEl = document.querySelector("[data-initial-percent]");
            const paymentEl = document.querySelector("[data-initial-payment]");
            const termEl = document.querySelector("[data-loan-term]");
            const sumEl = document.querySelector("[data-sum]");
            const monthlyEl = document.querySelector("#monthly-payment");
    
            if (!percentEl || !paymentEl || !termEl || !sumEl || !monthlyEl) return;
    
            const price = state.price;
            const percent = state.percent;
            const term = state.term;
    
            const initialPayment = Math.round(price * percent / 100);
            const monthly = Math.round((price - initialPayment) / term);
    
            percentEl.textContent = percent;
            paymentEl.innerHTML = format(initialPayment) + " ₽";
            termEl.innerHTML = term + " месяцев";
            sumEl.innerHTML = format(price) + " ₽";
            monthlyEl.innerHTML = format(monthly) + " ₽";
        }
    
        const priceInstance = $("#initial-price").ionRangeSlider({
            min: 700000,
            max: 10000000,
            from: 700000,
            step: 10000,
            onChange: function (data) {
                state.price = data.from;
                update();
            }
        });
    
        const priceSlider = priceInstance.data("ionRangeSlider");
    
        if (priceSlider) {
            priceSlider.update({ from: 700000 });
        }
    
        const percentInstance = $("#initial-payment").ionRangeSlider({
            min: 10,
            max: 46,
            from: 10,
            step: 1,
            onChange: function (data) {
                state.percent = data.from;
                update();
            }
        });
    
        const percentSlider = percentInstance.data("ionRangeSlider");
    
        if (percentSlider) {
            percentSlider.update({ from: 10 });
        }
    
        const termInstance = $("#loan-term").ionRangeSlider({
            min: 13,
            max: 60,
            from: 13,
            step: 1,
            onChange: function (data) {
                state.term = data.from;
                update();
            }
        });
    
        const termSlider = termInstance.data("ionRangeSlider");
    
        if (termSlider) {
            termSlider.update({ from: 13 });
        }
    
        update();
    
    });

    
    const scopeSliderEl = document.querySelector('.scope-slider');

    if (scopeSliderEl && typeof Swiper !== 'undefined') {
        new Swiper(scopeSliderEl, {
            slidesPerView: 1,
            spaceBetween: 16,
            loop: true,
            speed: 1200,
            autoplay: {
                delay: 3000, 
            },
        });
    }

    const vendorSliders = document.querySelectorAll('.single-vendors-slider');

    if (vendorSliders.length && typeof Swiper !== 'undefined') {

        vendorSliders.forEach((slider) => {

            const parent = slider.closest('.single-vendors-content');

            const nextBtn = parent.querySelector('.vendor-next');
            const prevBtn = parent.querySelector('.vendor-prev');

            new Swiper(slider, {
                slidesPerView: 3,
                spaceBetween: 24,
                speed: 1200,

                navigation: {
                    nextEl: nextBtn,
                    prevEl: prevBtn,
                },

                breakpoints: {
                    0: {
                        slidesPerView: 1,
                    },

                    768: {
                        slidesPerView: 2,
                    },

                    1200: {
                        slidesPerView: 3,
                    }
                }
            });

        });

    }

});
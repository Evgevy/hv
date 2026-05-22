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
                300: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },


                500: {
                    slidesPerView: 2,
                },
                
                992: {
                    slidesPerView: 3,
                },

                1200: {
                    slidesPerView: 4,
                },

                1400: {
                    slidesPerView: 5,
                },

                1900: {
                    slidesPerView: 6,
                }
                
            }
        });

    }


    (() => {

        const format = (price) =>
            new Intl.NumberFormat('ru-RU', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(price);
    
        // =========================
        // PRICE BLOCK INIT
        // =========================
        document.querySelectorAll('.price').forEach(priceBlock => {
    
            const priceValue = priceBlock.querySelector('.price-value');
            const ndsToggle = priceBlock.querySelector('.nds-toggle input');
    
            if (!priceValue) return;
    
            const basePrice = Number(priceValue.dataset.priceNds || 0);
    
            let optionPrice = 0;
    
            const render = () => {
                let total = basePrice + optionPrice;
    
                if (ndsToggle && !ndsToggle.checked) {
                    total = total / 1.22;
                }
    
                priceValue.textContent = format(total) + ' ₽';
            };
    
            // даём наружу доступ
            priceBlock._setOptionPrice = (val) => {
                optionPrice = Number(val || 0);
                render();
            };
    
            ndsToggle?.addEventListener('change', render);
    
            render();
        });
    
    
        // =========================
        // OPTIONS (1 SELECT = 1 PRICE)
        // =========================
        document.querySelectorAll('.single-product-options').forEach(wrapper => {
    
            const select = wrapper.querySelector('#productOptionsSelect');
            if (!select) return;
    
            const dropdown = select.querySelector('.single-product-select-dropdown');
            const selected = select.querySelector('.single-product-selected');
            const items = select.querySelectorAll('.single-product-select-item');
    
            const selectedName = select.querySelector('.single-product-select-name');
            const selectedSum = select.querySelector('.single-product-select-sum');
    
            // ВАЖНО: берем цену именно из ЭТОГО блока
            const priceBlock = document.querySelector('.single-product-price-box .price');
    
            // init UI
            select.classList.remove('active');
            if (dropdown) dropdown.style.display = 'none';
    
            const open = () => {
                select.classList.add('active');
                if (dropdown) dropdown.style.display = 'flex';
            };
    
            const close = () => {
                select.classList.remove('active');
                if (dropdown) dropdown.style.display = 'none';
            };
    
            selected?.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
    
                select.classList.contains('active') ? close() : open();
            });
    
            items.forEach(item => {
    
                item.addEventListener('click', () => {
    
                    items.forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
    
                    const optionPrice = Number(item.dataset.price || 0);
    
                    // 🔥 ГЛАВНОЕ: обновление цены
                    if (priceBlock && priceBlock._setOptionPrice) {
                        priceBlock._setOptionPrice(optionPrice);
                    }
    
                    if (selectedName) {
                        selectedName.innerHTML =
                            item.querySelector('.single-product-select-name')?.innerHTML || '';
                    }
    
                    if (selectedSum) {
                        selectedSum.innerHTML =
                            item.querySelector('.single-product-select-sum')?.innerHTML || '';
                    }
    
                    close();
                });
            });
    
            document.addEventListener('click', (e) => {
                if (!select.contains(e.target)) close();
            });
    
        });
    
    })();




    const goodsSliders = document.querySelectorAll('.goods-slider');

    if (goodsSliders.length && typeof Swiper !== 'undefined') {

        goodsSliders.forEach((slider) => {

            const section = slider.closest('.goods');

            const nextBtn = section.querySelector('.goods-button-next');
            const prevBtn = section.querySelector('.goods-button-prev');

            new Swiper(slider, {

                slidesPerView: 4,
                spaceBetween: 24,
                loop: false,

                navigation: {
                    nextEl: nextBtn,
                    prevEl: prevBtn,
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
                        slidesPerView: 2,
                        spaceBetween: 13,
                    },

                    0: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    }

                }

            });

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


    if (typeof Swiper !== 'undefined') {

        const thumbsSlider = document.querySelector('.product-thumbs-slider');
        const mainSlider = document.querySelector('.product-main-slider');
        const wrap = document.querySelector('.product-thumbs-wrap');
    
        if (
            thumbsSlider &&
            mainSlider &&
            wrap &&
            !thumbsSlider.swiper &&
            !mainSlider.swiper
        ) {
    
        const btnTop = wrap.querySelector('.thumbs-nav--top');
        const btnBottom = wrap.querySelector('.thumbs-nav--bottom');
    
        const VISIBLE = 5;
    
        let thumbsSwiper = new Swiper(thumbsSlider, {
            direction: 'vertical',
            slidesPerView: VISIBLE,
            spaceBetween: 12,
            watchSlidesProgress: true,
            slideToClickedSlide: true
        });
    
        let mainSwiper = new Swiper(mainSlider, {
            slidesPerView: 1,
            spaceBetween: 20,
    
            thumbs: {
                swiper: thumbsSwiper
            }
        });
    
        // ===== FADE / ARROWS
    
        function updateArrows() {

            const total = thumbsSwiper.slides.length;
            const canScroll = total > VISIBLE;
        
            if (!canScroll) {
        
                btnTop.style.display = 'none';
                btnBottom.style.display = 'none';
        
                wrap.classList.remove('has-scroll');
                wrap.classList.remove('is-scrolled');
        
                return;
            }
        
            // ВОТ СНАЧАЛА index
            const index = mainSwiper.activeIndex;
            const maxIndex = total - 1;
        
            // НИЖНИЙ ЗАСВЕТ
            if (index < maxIndex) {
                wrap.classList.add('has-scroll');
            } else {
                wrap.classList.remove('has-scroll');
            }
        
            // ВЕРХНИЙ ЗАСВЕТ
            if (index > 0) {
                btnTop.style.display = 'flex';
                wrap.classList.add('is-scrolled');
            } else {
                btnTop.style.display = 'none';
                wrap.classList.remove('is-scrolled');
            }
        
            // НИЖНЯЯ СТРЕЛКА
            if (index < maxIndex) {
                btnBottom.style.display = 'flex';
            } else {
                btnBottom.style.display = 'none';
            }
        }
    
        // ===== ARROWS
    
        btnTop?.addEventListener('click', () => {
            mainSwiper.slidePrev();
        });
    
        btnBottom?.addEventListener('click', () => {
            mainSwiper.slideNext();
        });
    
        // ===== EVENTS
    
        mainSwiper.on('slideChange', updateArrows);
    
        updateArrows();
    }
    }

    

        // REVIEWS FILTER + SHOW MORE

    const reviewsSection = document.querySelector('.reviews');

    if (reviewsSection) {

        const filters = reviewsSection.querySelectorAll('.reviews-filter');
        const reviews = reviewsSection.querySelectorAll('.review-item');
        const empty = reviewsSection.querySelector('.reviews-empty');
        const moreBtn = reviewsSection.querySelector('.reviews-more');

        if (filters.length && reviews.length && empty && moreBtn) {

            let currentFilter = 'all';
            let expanded = false;

            // стартовое состояние
            reviews.forEach((review, index) => {

                if (index === 0) {
                    review.classList.remove('d-none');
                } else {
                    review.classList.add('d-none');
                }

            });

            function updateReviews() {

                let visibleReviews = [];

                reviews.forEach(review => {

                    const rating = review.dataset.rating;

                    if (currentFilter === 'all' || rating === currentFilter) {
                        visibleReviews.push(review);
                    }

                });

                // скрываем все
                reviews.forEach(review => {
                    review.classList.add('d-none');
                });

                // если нет отзывов
                if (!visibleReviews.length) {

                    empty.style.display = 'block';
                    moreBtn.style.display = 'none';

                    return;

                } else {

                    empty.style.display = 'none';

                }

                // показать все
                if (expanded) {

                    visibleReviews.forEach(review => {
                        review.classList.remove('d-none');
                    });

                    moreBtn.textContent = 'Скрыть';

                } else {

                    visibleReviews[0].classList.remove('d-none');

                    moreBtn.textContent = 'Показать еще';

                }

                // кнопка показать еще
                if (visibleReviews.length > 1) {

                    moreBtn.style.display = 'block';

                } else {

                    moreBtn.style.display = 'none';

                }

            }

            // фильтры
            filters.forEach(filter => {

                filter.addEventListener('click', function () {

                    filters.forEach(btn => {
                        btn.classList.remove('active');
                    });

                    this.classList.add('active');

                    currentFilter = this.dataset.rating;

                    expanded = false;

                    updateReviews();

                });

            });

            // показать еще
            moreBtn.addEventListener('click', function () {

                expanded = !expanded;

                updateReviews();

            });

            updateReviews();
        }

    }

    let rulesSwiper = null;

    function initRulesSlider() {

        const slider = document.querySelector('.rules-slider');

        if (!slider) return;

        if (window.innerWidth <= 990 && !rulesSwiper) {

            rulesSwiper = new Swiper(slider, {
                slidesPerView: 1,
                spaceBetween: 16,
                loop: true,

                autoplay: {
                    delay: 3500,
                    disableOnInteraction: false,
                },

                speed: 1500,
            });

        } else if (window.innerWidth > 990 && rulesSwiper) {

            rulesSwiper.destroy(true, true);
            rulesSwiper = null;
        }
    }

    initRulesSlider();

    window.addEventListener('resize', initRulesSlider);



    const talkSliderEl = document.querySelector('.talk-slider');

    if (talkSliderEl && typeof Swiper !== 'undefined') {

        new Swiper(talkSliderEl, {

            slidesPerView: 4,
            spaceBetween: 20,
            speed: 1500,

            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },

            // navigation: {
            //     nextEl: '.talk-next',
            //     prevEl: '.talk-prev',
            // },

            breakpoints: {

                0: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    loop: true,
                },

                500: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                    loop: true,
                },

                1200: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                    loop: true,
                },

                1400: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                    loop: false,
                }
            }
        });
    }

    const mobileThumbs = new Swiper(".product-thumbs-mobile", {
        spaceBetween: 10,
        slidesPerView: 4,
        watchSlidesProgress: true,
        slideToClickedSlide: true,
    });
    
    const mobileMain = new Swiper(".product-main-slider-mobile", {
        slidesPerView: 1,
        spaceBetween: 15,
    
        thumbs: {
            swiper: mobileThumbs
        }
    });


    document.querySelector('.open-gallery')?.addEventListener('click', (e) => {
        e.preventDefault();
    
        const items = [];
    
        document.querySelectorAll('.product-main-slider-mobile .swiper-slide img')
            .forEach(img => {
                items.push({
                    src: img.src,
                    type: "image"
                });
            });
    
        Fancybox.show(items);
    });


    const toggleBtn = document.querySelector('.single-product-toggle');
    const productItems = document.querySelectorAll('.single-product-specs .single-product-list .single-product-item');

    if (toggleBtn && productItems.length) {

        let opened = false;

        // скрываем всё после 5
        productItems.forEach((item, index) => {

            if (index >= 5) {
                item.classList.add('d-none');
            }

        });

        toggleBtn.addEventListener('click', () => {

            opened = !opened;

            productItems.forEach((item, index) => {

                if (index >= 5) {
                    item.classList.toggle('d-none');
                }

            });

            toggleBtn.textContent = opened
                ? 'Скрыть'
                : 'Все характеристики';

        });

    }


    const zoomContainer = document.querySelector('.zoom-container');

    if (zoomContainer) {

        let activeId = null;
        let lockedId = null;

        // =========================
        // ACTIVE STATES
        // =========================

        function setActive(id) {

            if (activeId === id) return;

            clearActive();

            activeId = id;

            document
                .querySelectorAll(`[data-id="${id}"], #${CSS.escape(id)}`)
                .forEach(el => el.classList.add('is-active'));
        }

        function clearActive() {

            if (!activeId) return;

            document
                .querySelectorAll(`[data-id="${activeId}"], #${CSS.escape(activeId)}`)
                .forEach(el => el.classList.remove('is-active'));

            activeId = null;
        }

        // =========================
        // PANELS
        // =========================

        function closePanels() {

            document.querySelectorAll('.service-map--city')
                .forEach(el => {

                    el.classList.add('d-none');
                    el.classList.remove('is-active');

                });
        }

        // =========================
        // PANEL POSITION
        // =========================

        function positionPanel(dot, panel) {

            const scrollContainer = document.querySelector('.service-map');

            const containerRect = scrollContainer.getBoundingClientRect();
            const dotRect = dot.getBoundingClientRect();

            const isMobile = window.innerWidth <= 1200;

            const offset = 12;

            const panelW = panel.offsetWidth;
            const panelH = panel.offsetHeight;

            let x = dotRect.left - containerRect.left + scrollContainer.scrollLeft;
            let y = dotRect.top - containerRect.top + scrollContainer.scrollTop;

            let left;
            let top;

            const viewportW = scrollContainer.clientWidth;
            const viewportH = scrollContainer.clientHeight;

            // MOBILE

            if (isMobile) {

                left = x - panelW / 2;
                top = y - panelH - offset;

                if (top < scrollContainer.scrollTop) {
                    top = y + offset;
                }

                if (left + panelW > scrollContainer.scrollLeft + viewportW) {
                    left = scrollContainer.scrollLeft + viewportW - panelW - offset;
                }

                if (left < scrollContainer.scrollLeft) {
                    left = scrollContainer.scrollLeft + offset;
                }
            }

            // DESKTOP

            else {

                left = x + dotRect.width + offset;
                top = y - panelH / 2;

                if (left + panelW > scrollContainer.scrollLeft + viewportW) {
                    left = x - panelW - offset;
                }

                if (left < scrollContainer.scrollLeft) {
                    left = scrollContainer.scrollLeft + offset;
                }

                if (top < scrollContainer.scrollTop) {
                    top = scrollContainer.scrollTop + offset;
                }

                if (top + panelH > scrollContainer.scrollTop + viewportH) {
                    top = scrollContainer.scrollTop + viewportH - panelH - offset;
                }
            }

            panel.style.left = left + 'px';
            panel.style.top = top + 'px';
        }

        // =========================
        // HOVER
        // =========================

        zoomContainer.addEventListener('mousemove', (e) => {

            const el = e.target.closest('[data-id], circle');

            if (!el) {

                if (!lockedId) clearActive();

                return;
            }

            const id = el.dataset?.id || el.id;

            if (!id) return;

            if (lockedId && lockedId !== id) return;

            setActive(id);
        });

        zoomContainer.addEventListener('mouseleave', () => {

            if (!lockedId) clearActive();

        });

        // =========================
        // PANEL CLICK BLOCK
        // =========================

        document.querySelectorAll('.service-map--city').forEach(panel => {

            panel.addEventListener('click', (e) => {
                e.stopPropagation();
            });

        });

        // =========================
        // GLOBAL CLICK
        // =========================

        document.addEventListener('click', (e) => {

            const dot = e.target.closest('circle');

            // click on dot

            if (dot) {

                const id = dot.id;

                closePanels();

                lockedId = id;

                setActive(id);

                const panel = document.querySelector(`.service-map--city[data-id="${id}"]`);

                if (panel) {

                    panel.classList.remove('d-none');
                    panel.classList.add('is-active');

                    requestAnimationFrame(() => {

                        requestAnimationFrame(() => {

                            positionPanel(dot, panel);

                        });

                    });
                }

                return;
            }

            // click inside svg

            const insideSvg = e.target.closest('.zoom-container');

            if (insideSvg) {

                closePanels();

                lockedId = null;

                clearActive();

                return;
            }

            // click outside

            closePanels();

            lockedId = null;

            clearActive();

        });

    }
    // =====================
    // PRICE RANGE FUNCTION
    // =====================

    function initPriceRange(
        sliderSelector,
        minInputSelector,
        maxInputSelector
    ) {

        if (!$(sliderSelector).length) return;

        const minInput = $(minInputSelector);
        const maxInput = $(maxInputSelector);

        $(sliderSelector).ionRangeSlider({

            type: "double",

            min: 0,
            max: 500000,

            from: 0,
            to: 500000,

            step: 1000,

            skin: "round",

            onStart: updateInputs,
            onChange: updateInputs,

        });

        const instance = $(sliderSelector).data("ionRangeSlider");

        function format(value) {
            return Number(value).toLocaleString('ru-RU');
        }

        function updateInputs(data) {

            minInput.val(format(data.from));
            maxInput.val(format(data.to));

        }

        // =====================
        // INPUT MIN
        // =====================

        minInput.on('input', function () {

            let val = +$(this).val().replace(/\s/g, '');

            if (isNaN(val)) val = 0;

            if (val > instance.result.to) {
                val = instance.result.to;
            }

            instance.update({
                from: val
            });

        });

        // =====================
        // INPUT MAX
        // =====================

        maxInput.on('input', function () {

            let val = +$(this).val().replace(/\s/g, '');

            if (isNaN(val)) val = 500000;

            if (val < instance.result.from) {
                val = instance.result.from;
            }

            instance.update({
                to: val
            });

        });

    }

    // =====================
    // DESKTOP
    // =====================

    initPriceRange(
        '#priceRange',
        '#minPrice',
        '#maxPrice'
    );

    // =====================
    // MOBILE
    // =====================

    initPriceRange(
        '#priceRangeMobile',
        '#minPriceMobile',
        '#maxPriceMobile'
    );



    const list = document.getElementById('brandList');
    const listMobile = document.getElementById('brandListMobile');
    if (list || listMobile) {
        const hidden = list.querySelector('.brand-hidden');
        const hiddenMobile = listMobile.querySelector('.brand-hidden')
        const btns = document.querySelectorAll('.brand-more');

        if (hidden || btns || hiddenMobile) {
            let opened = false;

            btns.forEach(btn => {
                btn.addEventListener('click', () => {

                    opened = !opened;
    
                    
                    hidden.classList.toggle('d-none');
                    hiddenMobile.classList.toggle('d-none');
    
                    btn.textContent = opened ? 'Скрыть' : 'Показать еще';
    
                });
            })
           

        }

        

    }

    document.querySelectorAll('.filter-block').forEach(block => {

        const btn = block.querySelector('.filter-head');
        const body = block.querySelector('.filter-body');
    
        if (!btn || !body) return;
    
        // если блок закрыт — ставим collapsed
        if (!body.classList.contains('show')) {
            btn.classList.add('collapsed');
        } else {
            btn.classList.remove('collapsed');
        }
    
    });



    // ======================
    // MOBILE CATALOG SHOW MORE
    // ======================

    const catalogList = document.getElementById('catalogMobileList');
    const catalogBtn = document.getElementById('catalogMoreBtn');

    if (catalogList && catalogBtn) {

        const items = catalogList.querySelectorAll('.catalog-mobile-item');

        let visible = 4;

        function updateCatalog() {

            // только мобилка
            if (window.innerWidth > 990) {

                items.forEach(item => {
                    item.classList.remove('d-none');
                });

                catalogBtn.classList.add('d-none');

                return;
            }

            // скрываем всё
            items.forEach((item, index) => {

                if (index < visible) {
                    item.classList.remove('d-none');
                } else {
                    item.classList.add('d-none');
                }

            });

            // если <= 4
            if (items.length <= 4) {
                catalogBtn.classList.add('d-none');
                return;
            }

            catalogBtn.classList.remove('d-none');

            // тексты кнопки
            if (visible >= items.length) {

                catalogBtn.textContent = 'Скрыть';

            } else {

                catalogBtn.textContent = 'Показать все категории';

            }
        }

        catalogBtn.addEventListener('click', () => {

            // 4 -> 10
            if (visible === 4) {

                visible += 6;

                if (visible > items.length) {
                    visible = items.length;
                }

            }

            // все -> назад
            else if (visible >= items.length) {

                visible = 4;

            }

            // если еще есть
            else {

                visible = items.length;

            }

            updateCatalog();
        });

        updateCatalog();

        window.addEventListener('resize', updateCatalog);
    }

    

    (function () {

        const btn = document.getElementById('sortMobileBtn');
        const dropdown = document.getElementById('sortMobileDropdown');
        const label = document.getElementById('sortMobileLabel');
        const priceToggle = document.getElementById('sortPriceToggle');
    
        if (!btn || !dropdown || !label || !priceToggle) return;
    
        let activeSort = 'popularity';
        let priceDir = 'desc';
    
        // открыть/закрыть список
        btn.addEventListener('click', () => {
            dropdown.classList.toggle('d-none');
        });
    
        // выбор пункта
        dropdown.querySelectorAll('.sort-mobile-item').forEach(item => {
    
            item.addEventListener('click', () => {
    
                const sort = item.dataset.sort;
                activeSort = sort;
    
                // текст кнопки ВСЕГДА меняется только здесь
                label.textContent = item.textContent.trim();
    
                // active класс
                dropdown.querySelectorAll('.sort-mobile-item')
                    .forEach(i => i.classList.remove('active'));
    
                item.classList.add('active');
    
                // SVG для price отдельно
                if (sort === 'price') {
                    priceToggle.classList.remove('d-none');
                } else {
                    priceToggle.classList.add('d-none');
                }
    
                dropdown.classList.add('d-none');
    
                applySort();
            });
    
        });
    
        // переключение ASC/DESC (ТОЛЬКО если price активен)
        priceToggle.addEventListener('click', (e) => {
    
            e.stopPropagation();
    
            if (activeSort !== 'price') return;
    
            priceDir = priceDir === 'asc' ? 'desc' : 'asc';
    
            priceToggle.classList.toggle('asc', priceDir === 'asc');
    
            applySort();
        });
    
        function applySort() {
            console.log('SORT:', activeSort, priceDir);
        }
    
    })();


    
    // СТРАНИЦА СРАВНЕНИЯ ТОВАРОВ
    if (document.querySelector('.catalog-compare')) {
        
        document.querySelectorAll('.tab-pane').forEach(pane => {
            
            const mainEl = pane.querySelector('.slider-compare');
            const rowEls = pane.querySelectorAll('.swiper-compare-row');

            if (!mainEl) return;

            const slidesCount = mainEl.querySelectorAll('.swiper-wrapper > .swiper-slide').length;
            
            const btnPrev = pane.querySelector('.swiper-button-prev-compare');
            const btnNext = pane.querySelector('.swiper-button-next-compare');

            if (slidesCount <= 3) {
                if (btnPrev) btnPrev.classList.add('d-none');
                if (btnNext) btnNext.classList.add('d-none');
            } else {
                if (btnPrev) btnPrev.classList.remove('d-none');
                if (btnNext) btnNext.classList.remove('d-none');
            }

            const rowSliders = [];
            rowEls.forEach((rowEl) => {
                const r = new Swiper(rowEl, {
                    slidesPerView: 2,
                    spaceBetween: 10,
                    allowTouchMove: false,
                    observer: true,       // Пересчет ширины колонок при смене таба
                    observeParents: true, // Пересчет при показе родительского блока
                    speed: 1200,
                    breakpoints: {
                        576: { slidesPerView: 2, spaceBetween: 10 },
                        768: { slidesPerView: 2, spaceBetween: 10 },
                        992: { slidesPerView: 3, spaceBetween: 10 },
                        1200: { slidesPerView: 3, spaceBetween: 10 }
                    }
                });
                rowSliders.push(r);
            });

            // Главный слайдер карточек товаров в этом табе
            const mainSlider = new Swiper(mainEl, {
                slidesPerView: 2,
                spaceBetween: 10,
                speed: 1200,
                observer: true,       // Пересчет ширины колонок при смене таба
                observeParents: true, // Пересчет при показе родительского блока
                // Если слайдов <= 3, отключаем навигацию в Swiper, иначе — привязываем к кнопкам
                navigation: (slidesCount <= 3) ? false : {
                    nextEl: btnNext,
                    prevEl: btnPrev,
                },
                breakpoints: {
                    576: { slidesPerView: 2, spaceBetween: 10 },
                    768: { slidesPerView: 2, spaceBetween: 10 },
                    992: { slidesPerView: 3, spaceBetween: 10 },
                    1200: { slidesPerView: 3, spaceBetween: 10 }
                }
            });

            // Связываем скролл карточек с характеристиками ВНУТРИ ЭТОГО ТАБА
            // mainSlider.on('slideChange', function () {
            //     const activeIndex = mainSlider.activeIndex;
            //     rowSliders.forEach(slider => {
            //         if (slider.activeIndex !== activeIndex) {
            //             slider.slideTo(activeIndex);
            //         }
            //     });
            // });

            mainSlider.on('setTranslate', function (swiper, translate) {
                rowSliders.forEach(slider => {
                    slider.setTranslate(translate);
                });
            });

            mainSlider.on('setTransition', function (swiper, duration) {
                rowSliders.forEach(slider => {
                    slider.setTransition(duration);
                });
            });
        });
    }


    // ======================
    // COOKIE BANNER
    // ======================

    (function () {

        const banner = document.getElementById("cookieBanner1");
        const btn = document.getElementById("cookieBtn1");

        if (banner || btn) {
             // уже принял cookie → скрываем
            if (localStorage.getItem("cookieAccepted") === "true") {
                banner.style.display = "none";
                return;
            }

            setTimeout(() => {
                banner.style.display = "flex";
            }, 3000);

            btn.addEventListener("click", () => {
                banner.style.display = "none";
                localStorage.setItem("cookieAccepted", "true");
            });
        }

       

    })();


    const bar = document.getElementById("mobileTechBar");

    if (bar && window.innerWidth <= 768) {

        const footer = document.querySelector('footer');

        let lastScroll = window.scrollY;

        const startShowOffset = window.innerHeight * 0.40; // мягкий старт

        function updateBar() {

            const scrollY = window.scrollY;

            const scrollDownEnough = scrollY > startShowOffset;

            // если футер в зоне видимости — скрываем
            const footerRect = footer?.getBoundingClientRect();
            const footerVisible = footerRect
                ? footerRect.top < window.innerHeight
                : false;

            if (scrollDownEnough && !footerVisible) {
                bar.style.display = "flex";
            } else {
                bar.style.display = "none";
            }

            lastScroll = scrollY;
        }

        window.addEventListener("scroll", updateBar, { passive: true });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) {
                bar.style.display = "none";
            }
        });

        updateBar();
    }



    const openSendReview = document.getElementById('openSendReview');

    if (openSendReview) {

        openSendReview.addEventListener('click', () => {

            const sellerModalEl = document.getElementById('sellerLoginModal');
            const sendReviewEl = document.getElementById('sendReviewModal');

            const sellerModal = bootstrap.Modal.getInstance(sellerModalEl);
            sellerModal.hide();

            sellerModalEl.addEventListener('hidden.bs.modal', function handler() {

                const sendReviewModal = new bootstrap.Modal(sendReviewEl);
                sendReviewModal.show();

                sellerModalEl.removeEventListener('hidden.bs.modal', handler);

            });

        });

    }


    const ratingWrap = document.getElementById('reviewRating');
    const ratingInput = document.getElementById('ratingValue');

    if (ratingWrap) {

        const stars = ratingWrap.querySelectorAll('.star');

        let selectedRating = 0;

        // hover
        stars.forEach(star => {

            star.addEventListener('mouseenter', () => {

                const value = Number(star.dataset.value);

                stars.forEach(s => {

                    const current = Number(s.dataset.value);

                    s.classList.toggle('hover', current <= value);

                });

            });

            // click
            star.addEventListener('click', () => {

                selectedRating = Number(star.dataset.value);

                ratingInput.value = selectedRating;

                stars.forEach(s => {

                    const current = Number(s.dataset.value);

                    s.classList.toggle('active', current <= selectedRating);

                });

            });

        });

        // убрать hover
        ratingWrap.addEventListener('mouseleave', () => {

            stars.forEach(s => s.classList.remove('hover'));

        });

    }

});
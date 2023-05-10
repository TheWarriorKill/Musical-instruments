new Swiper('.head__slider', {
    effect: 'fade',
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    autoplay: {
        delay: 5000,
    },
    speed: 2000,
});
new Swiper('.card-slider', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // loop: true,
    speed: 500,
    mousewheel: {
        sensitivity: 0.3,
        eventsTarget: ".card-slider",
    },
    freeMode: true,
    slidesPerView: 4,
})

new Swiper('.card-slider-second', {
    navigation: {
        nextEl: '.swiper-button-next-second',
        prevEl: '.swiper-button-prev-second',
    },
    // loop: true,
    speed: 500,
    mousewheel: {
        sensitivity: 0.3,
        eventsTarget: ".card-slider-second",
    },
    freeMode: true,
    slidesPerView: 4,
})

new Swiper('.card__slider-third', {
    navigation: {
        nextEl: '.swiper-button-next-third',
        prevEl: '.swiper-button-prev-third',
    },
    effect: 'cubic-bezier',
    speed: 400,
    slidesPerView: 5,
    autoplay: {
        delay: 5000,
    },
    // width: 860,
    freeMode: true,
    mousewheel: {
        sensitivity: 0.3,
    },
})

let scroll = document.getElementById('arrow')
let content = document.getElementById('scroll-slider')

scroll.addEventListener('click',()=>{
    content.scrollIntoView({
        behavior: 'smooth',
    })
})

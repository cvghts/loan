import Slider from "./slider";

export default class MainSlider extends Slider {
    constructor (btns) {
        super(btns);
    }

    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        try {
            this.hanson.style.opacity = '0';

            if (n === 3) {
                this.hanson.classList.add('animated');
                setTimeout(() => {
                    this.hanson.style.opacity = '1';
                    this.hanson.classList.add('slideInUp');
                }, 3000);
            } else {
                this.hanson.classList.remove('slideInUp');
            }
        } catch (e) { }

        Array.from(this.slides).forEach(slide => {
            slide.style.display = 'none';
        });

        this.slides[this.slideIndex - 1].style.display = 'block';
    }

    plusSlides(n) {
        if (!this.slideIndex) {
            this.slideIndex = 1;
        }
        this.showSlides(this.slideIndex += n);
    }

    bindTriggers() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.plusSlides(1);
            });

            btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                window.location.href = '/index.html';
            });
        });

        document.querySelectorAll('.prevmodule').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(-1);
            });
        });

        document.querySelectorAll('.nextmodule').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(1);
            });
        });
    }

    linkPageToModels() {
        const trigger = document.querySelector('.showup__content-explore .plus');
        trigger.addEventListener('click', () => {
            window.location.href = '/modules.html';
        });
    }

    linkCardsToModels(cards) {
        this.cards = document.querySelectorAll(cards);
        this.cards.forEach(card => {
            card.addEventListener('click', () => {
                if (card.classList.contains('card-active')) {
                    let index = card.querySelector('.card__controls-count');
                    index = +index.textContent.replace(/[^0-9]/g, '');
                    localStorage.setItem('index', index);
                    window.location.href = '/modules.html';
                }
            });
        });
    }

    showModel() {
        try {
            let index = localStorage.getItem('index');

            if (index && this.container && this.container.classList.contains('moduleapp')) {
                this.slideIndex = +index;
                localStorage.removeItem('index');
                this.showSlides(this.slideIndex);
                return true;
            }
        } catch (e) {}
        return false;
    }

    render() {
        if (this.container) {
            try {
                this.hanson = document.querySelector('.hanson');
            } catch (e) {}

            this.showSlides(this.slideIndex);
            this.bindTriggers();
            try {
                this.showModel();
                this.linkPageToModels();
                this.linkCardsToModels('.showup__content-slider .card');
                this.linkCardsToModels('.modules__content-slider .card');

            } catch(e) {}
        }
    }
}
const myFetcher = async (url, options = null) => {
    const response = await fetch(url);
    const result = await response.json();
    return result;
}

const getImages = async () => {
    const url = 'https://dog.ceo/api/breeds/image/random/10';
    const images = await myFetcher(url);

    images && images.message.map((image, key) => {
        const img = document.createElement('img');
        img.setAttribute('src', image);
        if(key === 0) {
            img.setAttribute('id', 'last-clone');
        } else if((key+1) === images.message.length) {
            img.setAttribute('id', 'first-clone');
        }
        document.querySelector('.slider-wrapper').append(img);
    })
    await setSlider();
}

const setSlider = async () => {

    //Image wrappers
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const sliderImages = sliderWrapper.querySelectorAll('img');


    //Prev & Next Buttons
    const prevBtn = document.querySelector('#prevBtn');
    const nextBtn = document.querySelector('#nextBtn');

    //Set counter
    let counter = 1;

    //Set image size
    const size = sliderImages[0].clientWidth;
    console.dir(sliderImages[0].naturalWidth);

    sliderWrapper.style.transform = 'translateX(' + (-size * counter) + 'px)';

    //Sæt click event på next button
    nextBtn.onclick = () => {
        if (counter >= sliderImages.length - 1) return;
        sliderWrapper.style.transition = 'transform 0.4s ease-in-out';
        counter++;
        sliderWrapper.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }

    //Sæt click event på next button
    prevBtn.onclick = () => {
        if (counter <= 0) return;
        sliderWrapper.style.transition = 'transform 0.4s ease-in-out';
        counter--;
        sliderWrapper.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }

    sliderWrapper.addEventListener('transitionend', () => {
        if (sliderImages[counter].id === 'last-clone') {
            sliderWrapper.style.transistion = 'none';
            counter = sliderImages.length - 2;
            sliderWrapper.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }

        if (sliderImages[counter].id === 'first-clone') {
            sliderWrapper.style.transistion = 'none';
            counter = sliderImages.length - counter;
            sliderWrapper.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }
    });
}

getImages();
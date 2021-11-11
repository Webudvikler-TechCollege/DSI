const myFetcher = async (url, options = null) => {
    const response = await fetch(url);
    const result = await response.json();
    return result;
}

let curImg = 0;
const images = [];
const imageSlides = [];
const slideWrapper = document.querySelector('.slide-wrapper');
const btnNext = document.querySelector('.slider_control_next');
const btnPrev = document.querySelector('.slider_control_prev');
const slider = document.querySelector(".slider");
slider.classList.add("slider");


const getImages = async () => {
    const url = 'https://picsum.photos/v2/list';
    const data = await myFetcher(url);

    data && data.map((item, key) => {
        //console.log(item);
        addImage(item.download_url);
        images.push(item.download_url);
    })
    //setting wrapper width to total width of all images combined
    slideWrapper.style.width = imageSlides.length * slider.offsetWidth + "px";

}

btnNext.addEventListener('click', () => {
    slideImage(true)
});

btnPrev.addEventListener('click', () => {
    slideImage(false)
});

const addImage = (img) => {
    const imgWrap = document.createElement("li");
    const imgElm = document.createElement('img');
    imgElm.src = img;
    imgWrap.append(imgElm)
    document.querySelector('.slide-wrapper').append(imgWrap);
}

const slideImage = (next) => {
    if(next) {
		if (curImg != images.length - 1) {
			curImg++;
        } else {
            slideWrapper.classList.add("noTransition");
            curImg = 0;
            setTimeout(() => {
				slideWrapper.classList.remove("noTransition");
			}, 1);
        }
    } else {
        if(curImg != 0) {
            curImg--;
        } else {
			slideWrapper.classList.add("noTransition");
			curImg = images.length - 1;
			setTimeout(() => {
				slideWrapper.classList.remove("noTransition");
			}, 200);
        }
    }
    console.dir(slider);
	slideWrapper.style =
		"transform: translateX(-" + curImg * slider.offsetWidth + "px)";
}

getImages();
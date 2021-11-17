//Auto slide options
let autoPlayOn = false;
let autoPlayTimer = 4000;

//image options (changing the url will require adjusting the handling of the incoming json file)
let imgUrl = "https://dog.ceo/api/breeds/image/random/";
let imgAmount = 50;

//element variables for the html
let slider;
let slideWrapper;
let imageSlides = [];
let images = [];

//control variables used by the code
let autoPlay;
let currentImg = 0;

//function for creating the base html of the site
function createHtmlPage() {
	//creating slider and adding slider class
	slider = document.createElement("div");
	slider.classList.add("slider");

	//creating next arrow, adding class, adding href, adding text and adding eventlistener
	let nextControl = document.createElement("a");
	nextControl.classList.add("slider_control_next");
	nextControl.setAttribute("href", "#");
	nextControl.innerHTML = ">";
	nextControl.addEventListener("click", () => {
		changeImage(true);
	});

	slider.appendChild(nextControl);

	let prevControl = document.createElement("a");
	prevControl.classList.add("slider_control_prev");
	prevControl.setAttribute("href", "#");
	prevControl.innerHTML = "<";
	prevControl.addEventListener("click", () => {
		changeImage(false);
	});

	slider.appendChild(prevControl);

	slideWrapper = document.createElement("ul");

	slider.appendChild(slideWrapper);

	document.body.appendChild(slider);
}

//function for adding the images to the site
function addImage(img) {
	//creating elements to build on
	let imageSlide = document.createElement("img");
	let imageWrap = document.createElement("li");
	//adding src to the img
	imageSlide.src = img;
	//appending img to the li
	imageWrap.appendChild(imageSlide);
	//setting the width equal to the sliders viewport
	imageWrap.style.width = slider.offsetWidth + "px";
	//appending it to the wrapper
	slideWrapper.appendChild(imageWrap);
	//adding it to the array of img elements
	imageSlides.push(imageWrap);
}

//function for sliding
function changeImage(next) {
	//if next is true,
	if (next) {
		//if current image is not the last one,
		if (currentImg != images.length - 1) {
			//go to next image
			currentImg++;
		} else {
			//else remove transition class to avoid fast image transitions (should fix that instead)
			slideWrapper.classList.add("noTransition");
			//setting img count to first one
			currentImg = 0;
			//after 1 second add transitions again -- the timeout seems unneccery but if its removed it will reenable transitions before actually swapping the img
			setTimeout(() => {
				slideWrapper.classList.remove("noTransition");
			}, 1);
		}
	} else {
		if (currentImg != 0) {
			currentImg--;
		} else {
			slideWrapper.classList.add("noTransition");
			currentImg = images.length - 1;
			setTimeout(() => {
				slideWrapper.classList.remove("noTransition");
			}, 200);
		}
	}
	//sliding to the new img
	slideWrapper.style =
		"transform: translateX(-" + currentImg * slider.offsetWidth + "px)";
	resetTimer();
}

//function to reset the auto slide timer
function resetTimer() {
	//checking if auto play is enabled
	if (autoPlayOn) {
		//if true -- checking if theres a running timer if true clear it
		if (autoPlay) clearInterval(autoPlay);
		//setting a new timer, to use the autoplaytimer from the options in the top, and storing it in a variable
		autoPlay = setInterval(() => changeImage(true), autoPlayTimer);
	}
}

//running the code starts here
createHtmlPage();

//fetching the api data
fetch(imgUrl + imgAmount)
	.then((response) => response.json())
	.then((data) => {
		//running a for loop to add images to my image array and running the function to add images to the slider
		for (const img of data.message) {
			images.push(img);
			addImage(img);
		}
		resetTimer();
		//setting wrapper width to total width of all images combined
		slideWrapper.style.width = imageSlides.length * slider.offsetWidth + "px";
	})
	//cathing errors if any occurs
	.catch((err) => console.error(err));

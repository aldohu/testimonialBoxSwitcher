const about = document.querySelector('.about');
const nameUser = document.querySelector('.name');
const position = document.querySelector('.position');
const image = document.querySelector('.image');
const loadingBar = document.querySelector('.loading');
let number = 0;
let arrayInfo;
const loremIpsumArray = [
	`// Your lorem ipsum text here`,
	`lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
	`Phasellus vitae nibh nec nisl tincidunt vestibulum.`,
	`Vivamus eget nisl nec nunc pulvinar vulputate.`,
];

async function getPersons() {
	try {
		const response = await fetch(
			'https://randomuser.me/api/?results=4&nat=us&inc=name,picture&noinfo',
		);
		const data = await response.json();
		arrayInfo = data.results;
		console.log(arrayInfo);
		return arrayInfo;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

function createInfo(element) {
	about.innerHTML = '';
	nameUser.innerHTML = '';
	position.innerHTML = '';
	image.innerHTML = '';
	about.innerHTML += `${loremIpsumArray[number]}`;
	nameUser.innerHTML += `${element.name.first} ${element.name.last}`;
	position.innerHTML += `${element.name.title}`;
	image.innerHTML += `<img src="${element.picture.medium}" alt="user-image">`;
}

async function main() {
	try {
		await getPersons(); // Wait for getPersons to complete
		if (arrayInfo) {
			const maxCards = 4;
			let cardIndex = 0;

			// Create a function that will call createInfo for the current card
			function loadNextCard() {
				if (cardIndex < maxCards) {
					createInfo(arrayInfo[cardIndex]);
					number++;
					cardIndex++;
				} else {
					console.log('All cards loaded.');
				}
			}
			loadNextCard();
			// Listen for the animationiteration event to change the card
			loadingBar.addEventListener('animationiteration', () => {
				loadNextCard();
			});

			// Set the initial loading start time
			const loadingStartTime = Date.now();
		} else {
			console.log('arrayInfo is not populated yet.');
		}
	} catch (error) {
		console.error(error);
	}
}

main();

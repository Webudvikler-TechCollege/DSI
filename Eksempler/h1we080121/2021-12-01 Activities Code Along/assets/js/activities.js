import { myFetch } from "./helpers/helper.js";

let max_seconds_to_last_update = 3600;

export const getActivityData = async () => {
	let config = await myFetch('../../config.json');
	console.log(config);

	let data = JSON.parse(localStorage.getItem('activities'));
	let last_update = new Date(localStorage.getItem('last_update'));
	let curday = new Date();

	let seconds_since_last_update = Math.round((curday - last_update) / 1000);

	if(!data || seconds_since_last_update > max_seconds_to_last_update) {
		const url = 'https://iws.itcn.dk/techcollege/Schedules?departmentCode=smed';
		const result = await myFetch(url);
		data = result.value;

		localStorage.setItem('activities', JSON.stringify(data));
		localStorage.setItem('last_update', new Date());
	}

	console.log(data);
}
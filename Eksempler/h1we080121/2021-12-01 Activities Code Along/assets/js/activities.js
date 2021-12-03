import { myFetch } from "./helpers/helper.js";

const root = document.getElementById('root');

export const getActivityData = async () => {
	let config = await myFetch('./config.json');

	let data = JSON.parse(localStorage.getItem('activities'));
	let last_update = new Date(localStorage.getItem('last_update'));
	let curday = new Date();

	let nextday = new Date();
	nextday.setDate(curday.getDate()+1);
	nextday.setHours(0,0,0);	

	let seconds_since_last_update = Math.round((curday - last_update) / 1000);

	if(!data || seconds_since_last_update > config.max_seconds_to_last_update) {
		//const url = 'https://iws.itcn.dk/techcollege/Schedules?departmentCode=smed';
		const url = './data.json';
		const result = await myFetch(url);
		data = result.value;

		data = data.filter(elm => config.array_valid_educations.includes(elm.Education));

		const friendly_names = await myFetch('https://api.mediehuset.net/infoboard/subjects');
		const array_friendly_names = friendly_names.result;

		data.map(item => {
			item.StartDate = item.StartDate.replace('+01', '+00');

			item.Time = new Date(item.StartDate).toLocaleTimeString(
				'en-GB', {
					hour: '2-digit',
					minute: '2-digit'
				});

			array_friendly_names.map(word => {
				if(word.name === item.Education) {
					item.Education = word.friendly_name;
				}
				if(word.name === item.Subject) {
					item.Subject = word.friendly_name;
				} 
			})

			data.sort((a,b) => {
				if(a.StartDate === b.StartDate) {
					return a.Education < b.Education ? -1 : 1
				} else {
					return a.StartDate < b.StartDate ? -1 : 1
				}
			})
			
		})


		localStorage.setItem('activities', JSON.stringify(data));
		localStorage.setItem('last_update', new Date());
	}

	let acc_html = `
		<table>
			<tr>
			  <th>Kl.</th>
			  <th>Uddannelse</th>
			  <th>Fag</th>
			  <th>Hold</th>
			  <th>Lokale</th>
			</tr>
	`;

	let arr_subjects = [];
	let arr_nextday_subjects = [];

	arr_subjects.push(...data.filter(elm => new Date(elm.StartDate) >= curday && new Date(elm.StartDate) < nextday));
	arr_nextday_subjects.push(...data.filter(elm => new Date(elm.StartDate) > nextday));

	if(arr_nextday_subjects.length) {
		let nextday_friendly = new Date(arr_nextday_subjects[0].StartDate).toLocaleDateString(
			"da-DK", {
				weekday: "long",
				day: "numeric",
				month: "long"
			}
		)
		arr_subjects.push({ DayName: nextday_friendly });
		arr_subjects.push(...arr_nextday_subjects);
	}

	if(config.max_num_activities) {
		arr_subjects = arr_subjects.slice(0, config.max_num_activities)
	}

	arr_subjects.map(item => {
		acc_html += createRow(item);
	})
	acc_html += `</table>`;
	root.innerHTML = acc_html;
}

function createRow(obj) {
	if(obj.DayName) {
		return `
			<tr>
				<td class="dayname" colspan="5">${obj.DayName}</td>
			</tr>
		`;
	} else {
		return `
			<tr>
				<td>${obj.Time}</td>
				<td>${obj.Education}</td>
				<td>${obj.Subject}</td>
				<td>${obj.Team}</td>
				<td>${obj.Room}</td>
			</tr>
		`;
	}
}
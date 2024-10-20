import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;

const startButton = document.querySelector('[data-start]');
startButton.disabled = true;

const checkDate = selectedDates => {
	userSelectedDate = new Date(selectedDates[0]).getTime();
	return userSelectedDate > Date.now();
};
const blockStart = () => {
	startButton.disabled = true;
	startButton.classList.remove('active');
	iziToast.error({
		message: 'Please choose a date in the future',
		position: 'topRight',
		color: 'red',
	});
};

const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	color: '#F5F5F5',
	onClose(selectedDates) {
		if (!checkDate(selectedDates)) blockStart();
		else {
			startButton.disabled = false;
			!startButton.classList.contains('active')
				? startButton.classList.add('active')
				: startButton;
		}
		// userSelectedDate = selectedDates[0];
	},
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
	// Number of milliseconds per unit of time
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;

	// Remaining days
	const days = Math.floor(ms / day);
	// Remaining hours
	const hours = Math.floor((ms % day) / hour);
	// Remaining minutes
	const minutes = Math.floor(((ms % day) % hour) / minute);
	// Remaining seconds
	const seconds = Math.floor((((ms % day) % hour) % minute) / second);

	return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');
let differ;
function addLeadingZero(value) {
	return ('' + value).padStart(2, '0');
}
const setTimer = () => {
	const fields = [daysField, hoursField, minutesField, secondsField];
	const interval = setInterval(() => {
		differ = userSelectedDate - Date.now();
		const timer = [...Object.values(convertMs(differ))];

		if (differ > -1) {
			fields.forEach((field, index) => {
				field.innerHTML = addLeadingZero(timer[index]);
			});
		} else fields.forEach((field, index) => {
			field.innerHTML = addLeadingZero(0);
		});

		if (differ < 1000) {
			console.log('clear it');
			clearInterval(interval);
		}
	}, 1000);
};

startButton.addEventListener('click', setTimer);

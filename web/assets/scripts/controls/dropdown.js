export default {
	init(el) {
		const btn = el.querySelector('.user-dropdown');
		const dropdownMenu = el.querySelector('.user-dropdown-menu');
		const arrowDown = btn.querySelector('.arrow-down');
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			dropdownMenu.classList.toggle('active');
			arrowDown.classList.toggle('active');
		});
	},
};

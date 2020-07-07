export default {
	init(el) {
		el.addEventListener('click', (e) => {
			e.preventDefault();
			try {
				window.scrollTo({
					'behavior': 'smooth',
					'left': 0,
					'top': document.querySelector(`.${el.dataset.scroll}`).offsetTop,
				});
				document.querySelector('input[type=checkbox]').click();
			}
			catch (error) {
				window.location.href = window.location.origin;
			}
		});
	},
};

export default {
  init(el) {
    const btn = el.querySelector('.js-user-dropdown');
    const dropdownMenu = el.querySelector('.js-user-dropdown-menu');
    const arrowDown = btn.querySelector('.js-arrow-down');

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle('scale-90');
      dropdownMenu.classList.toggle('translate-x-2');
      dropdownMenu.classList.toggle('-translate-y-2');
      dropdownMenu.classList.toggle('z-50');
      dropdownMenu.classList.toggle('invisible');
      dropdownMenu.classList.toggle('opacity-0');
      arrowDown.classList.toggle('!rotate-0');
    });

    window.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!dropdownMenu.classList.contains('invisible')) {
        dropdownMenu.classList.toggle('scale-90');
        dropdownMenu.classList.toggle('translate-x-2');
        dropdownMenu.classList.toggle('-translate-y-2');
        dropdownMenu.classList.toggle('z-50');
        dropdownMenu.classList.toggle('invisible');
        dropdownMenu.classList.toggle('opacity-0');
        arrowDown.classList.toggle('!rotate-0');
      }
    });
  },
};

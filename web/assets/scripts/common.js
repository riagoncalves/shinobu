const common = {
	init() {
		console.log('%c| 🔧 Developed by riagoncalves.dev |', 'background: #111; color: #eee; border-radius:2px; padding:.75rem;');
	},
};

if (typeof window !== 'undefined') {
	common.init();
}
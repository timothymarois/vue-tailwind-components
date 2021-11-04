export default (element) => {
	const elem = document.querySelector(element);

	if (!elem) return [];

	const bounding = elem.getBoundingClientRect();

	let outOfViewport = [];

	if (bounding.top < 0) {
		outOfViewport.push('top')
	} 
	
	if (bounding.left < 0) {
		outOfViewport.push('left')
	} 

	if (bounding.bottom > (window.innerHeight || document.documentElement.clientHeight)) {
		outOfViewport.push('bottom')
	} 

	if (bounding.right > (window.innerWidth || document.documentElement.clientWidth)) {
		outOfViewport.push('right')
	}

	// console.log('outOfViewport returns: ' + outOfViewport);

	return outOfViewport;
}
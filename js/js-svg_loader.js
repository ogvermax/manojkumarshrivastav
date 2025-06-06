/**
 * Process SVGs onLoad
 *
 * @returns {void} Nothing.
 */
window.addEventListener('load', function() {
	// Find our SVGs.
	const svgs = document.querySelectorAll('svg[data-url]');
	const svgsLen = svgs.length;

	// Loop and process.
	for (let i = 0; i < svgsLen; ++i) {
		// Grab the URL and delete the attribute; we no longer
		// need it.
		let url = svgs[i].getAttribute('data-url');
		svgs[i].removeAttribute('data-url');

		// We'll let another function handle the actual fetching
		// so we can use the async modifier.
		fetchSVG(url, svgs[i]);
	}
});

/**
 * Fetch an SVG
 *
 * @param {string} url URL.
 * @param {DOMElement} el Element.
 * @returns {void} Nothing.
 */
const fetchSVG = async function(url, el) {
	// Dog bless fetch() and await, though be advised you'll need
	// to transpile this down to ES5 for older browsers.
	let response = await fetch(url);
	let data = await response.text();

	// This response should be an XML document we can parse.
	const parser = new DOMParser();
	const parsed = parser.parseFromString(data, 'image/svg+xml');
	
	// The file might not actually begin with "<svg>", and
	// for that matter there could be none, or many.
	let svg = parsed.getElementsByTagName('svg');
	if (svg.length) {
		// But we only want the first.
		svg = svg[0];

		// Copy over the attributes first.
		const attr = svg.attributes;
		const attrLen = attr.length;
		for (let i = 0; i < attrLen; ++i) {
			if (attr[i].specified) {
				// Merge classes.
				if ('class' === attr[i].name) {
					const classes = attr[i].value.replace(/\s+/g, ' ').trim().split(' ');
					const classesLen = classes.length;
					for (let j = 0; j < classesLen; ++j) {
						el.classList.add(classes[j]);
					}
				}
				// Add/replace anything else.
				else {
					el.setAttribute(attr[i].name, attr[i].value);
				}
			}
		}

		// Now transfer over the children. Note: IE does not
		// assign an innerHTML property to SVGs, so we need to
		// go node by node.
		while (svg.childNodes.length) {
			el.appendChild(svg.childNodes[0]);
		}
	}
};
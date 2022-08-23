const objectValueGetter = (obj, path, defaultValue = undefined) => {
	const travel = regexp =>
		String.prototype.split
			.call(path, regexp)
			.filter(Boolean)
			.reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
	const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
	return result === undefined || result === obj ? defaultValue : result;
};

// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_get
export default objectValueGetter;

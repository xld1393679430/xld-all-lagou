export const createReactInstance = filber => {
	let instance = null;
	if (filber.tag === 'class_component') {
		instance = new filber.type(filber.props) 
	} else {
		instance = filber.type
	}
	return instance;
}
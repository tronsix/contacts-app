export const formatPhone = phone => {
	let val = phone.replace(/\D/g, '');
	let newVal = '';

	if (val.length > 4) {
		phone = val;
	}

	if (val.length > 3 && val.length < 7) {
		newVal += val.substr(0, 3) + '-';
		val = val.substr(3);
	}

	if (val.length > 5) {
		newVal += val.substr(0, 3) + '-';
		newVal += val.substr(3, 3) + '-';
		val = val.substr(6);
	}

	newVal += val;
	return newVal;
};

export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
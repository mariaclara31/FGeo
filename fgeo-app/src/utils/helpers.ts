import moment from 'moment';

export const formatName = (name: string) => {
	let bName: any = name.split(" ");
	if (bName.length > 1) {
		bName = bName[0] + " " + bName[1][0];
	} else {
		bName = name;
	}
	return bName;
};
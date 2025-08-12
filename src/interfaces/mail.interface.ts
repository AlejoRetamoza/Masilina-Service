export interface Mail {
	fullName: string;
	phoneNumber: string;
	email: string;
	address: string; //solo si es tipo partners
	company: string; //solo si es tipo work-together
	availability: string;
	info: string; //solo si es tipo partners o work-together
	emailType: 'partners' | 'work-together' | 'unit-request';
	propertyType: string; //solo si es tipo unit-request
	propertyLocation: string; //solo si es tipo unit-request
	propertyRoomsQuantity: number | 'flexible'; //solo si es tipo unit-request
}
export class UserClass {

	constructor(
		public id: number,
		public firstName: string,
		public lastName: string,
		public email: string,
		public colorPreference: string,
		public hobbies?: string[]
	) {}
	
	
}
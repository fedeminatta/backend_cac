import User from '../models/User.js';

export default class UsersHelpers {
	parseUsers(data) {
		const { id, name, age } = data;
		const user = new User(
			parseInt(id + Math.random() * 231),
			name,
			parseInt(age)
		);
		return user;
	}
}

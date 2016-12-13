import { Mongo } from 'meteor/mongo';

const People = new Mongo.Collection('people');

People.schema = new SimpleSchema({
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	age: {
		type: Number
	},
	createdAt: {
		type: Date
	}
});

if (Meteor.isServer) {
	People._ensureIndex({
		firstName: 1,
		lastName: 1,
		age: 1
	});

	People._ensureIndex({
		createdAt: 1
	});

	Meteor.publish('people', (search) => {
		let query = {};
		let projection = { limit: 10 };

		if (search) {
			let number = Number(search);

			if (!isNaN(number)) {
				return People.find({ age: number }, projection);
			}

			let regex = new RegExp(search, 'i');

			query = {
				$or: [
					{ firstName: regex },
					{ lastName: regex }
				]
			};
		}

		return People.find(query, projection);
	});
}

export { People }
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

Meteor.startup(() => {
    if (People.find().count() == 0) {
        People.insert({ firstName: "Sang" , lastName: "Cardone", age: 33, createdAt: new Date() });
		People.insert({ firstName: "Ruthann" , lastName: "Jablonski", age: 32, createdAt: new Date() });
		People.insert({ firstName: "Garland" , lastName: "Oatman", age: 31, createdAd: new Date() });
		People.insert({ firstName: "Abdul" , lastName: "Paull", age: 31, createdAd: new Date() });
		People.insert({ firstName: "Stasia" , lastName: "Olivarez", age: 30, createdAd: new Date() });
		People.insert({ firstName: "Tamie" , lastName: "Archer", age: 30, createdAd: new Date() }); 
		People.insert({ firstName: "Racquel" , lastName: "Navarrete", age: 29, createdAd: new Date() });
		People.insert({ firstName: "Tandra" , lastName: "Higuchi", age: 29, createdAd: new Date() });
		People.insert({ firstName: "Scot" , lastName: "Poulton", age: 28, createdAd: new Date() });
		People.insert({ firstName: "Kathryn" , lastName: "Precourt", age: 28, createdAd: new Date() });
		People.insert({ firstName: "Stacy" , lastName: "Zeck", age: 27, createdAd: new Date() });
		People.insert({ firstName: "Trista" , lastName: "Joyce", age: 27, createdAd: new Date() });
		People.insert({ firstName: "Eleonora" , lastName: "Thetford", age: 26, createdAd: new Date() });
		People.insert({ firstName: "Gwen" , lastName: "Herrada", age: 26, createdAd: new Date() });
		People.insert({ firstName: "Sarita" , lastName: "Kung", age: 25, createdAd: new Date() });
		People.insert({ firstName: "Paul" , lastName: "Tanouye", age: 25, createdAd: new Date() });
		People.insert({ firstName: "Emmanuel" , lastName: "Devinney", age: 24, createdAd: new Date() });
		People.insert({ firstName: "Karima" , lastName: "Schuster", age: 24, createdAd: new Date() });
		People.insert({ firstName: "Salena" , lastName: "Clewis", age: 23, createdAd: new Date() });
		People.insert({ firstName: "Carleen" , lastName: "Corrie", age: 23, createdAd: new Date() });
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
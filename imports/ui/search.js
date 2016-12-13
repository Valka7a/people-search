import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { People } from '../api/people.js';

import './search.html';

Template.search.onCreated(() => {
	let template = Template.instance();

	template.searchQuery = new ReactiveVar();
	template.searching   = new ReactiveVar(false);
	template.sorting 	 = new ReactiveVar();

	template.autorun(() => {
		template.subscribe('people', template.searchQuery.get(), () => {
			setTimeout(() => {
				template.searching.set(false);
			}, 300);
		});
	});
});

Template.search.helpers({
	searching() {
		return Template.instance().searching.get();
	},

	query() {
		return Template.instance().searchQuery.get();
	},

	people() {
		let sorting = Template.instance().sorting.get();
		let projection = { limit: 10, sort: { createdAt: -1 }};
		
		let sortingMap = {
			'recent': { createdAt: -1 },
			'firstname-a-z': { firstName: 1 },
			'firstname-z-a': { firstName: -1},
			'lastname-a-z': { lastName: 1 },
			'lastname-z-a': { lastName: -1 },
			'age-asc': { age: 1 },
			'age-desc': { age: -1 }
		};

		if (sorting && sortingMap[sorting]) {
			projection.sort = sortingMap[sorting];
		}

		let people = People.find({}, projection);

		if (people) {
			return people;
		}
	}
});

Template.search.events({
	'keyup [name="search"]' (event, template) {
		let value = event.target.value.trim();

		if (value !== '' && event.keyCode === 13) {
			template.searchQuery.set(value);
			template.searching.set(true);
		}

		if (value === '') {
			template.searchQuery.set(value);
		}
	},

	'change #sorting' (event, template) {
		let value = event.target.value.trim();
		
		if (value !== '') {
			template.sorting.set(value);
		}
	}
});
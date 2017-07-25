import Ember from 'ember';

export default Ember.Component.extend({
    themeList: [
        {
            id: 1,
            name: 'All',
            thumb: '/img/all.png'
        },
        {
            id: 2,
            name: 'Wiki',
            thumb: '/img/wiki.png'
        },
        {
            id: 3,
            name: 'File',
            thumb: '/img/file.png'
        },
        {
            id: 4,
            name: 'Team',
            thumb: '/img/people.png'

        },
    ],
	isOpen: null,
	actions: {
		renderTemplate(id) {
			let self = this;
			let theme = `theme_${id}.json`;
			$.ajax({
				type: 'GET',
				url: '/themes/' + theme,
				async: false,
				success: function(data) {
					self.set('theme', data);
					self.set('isOpen', false);
				}
			});
		},
		toggleProperty(prop) {
			this.toggleProperty(prop);
		}
	}
});

/*global $:true*/

import Ember from 'ember';
import TimeMachine from 'ember-time-machine';

export default Ember.Component.extend({
    themeList: [
        {
            id: 1,
            name: 'All',
            thumb: '/img/all.png',
            description: 'Includes all section types.'
        },
        {
            id: 2,
            name: 'Wiki',
            thumb: '/img/wiki.png',
            description: 'A basic page with title and wiki page.'
        },
        {
            id: 3,
            name: 'File',
            thumb: '/img/file.png',
            description: 'Title and file sections ideal for showcasing papers.'
        },
        {
            id: 4,
            name: 'Team',
            thumb: '/img/people.png',
            description: 'Title and custom section with list of researchers.'

        },
        {
            id: 4,
            name: 'Team',
            thumb: '/img/people.png',
            description: 'Includes all section types.'

        },
        {
            id: 4,
            name: 'Team',
            thumb: '/img/people.png',
            description: 'Includes all section types.'


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
                    const content = Ember.Object.create(data);
                    const timeMachine = TimeMachine.Object.create({ content });
					self.set('theme', timeMachine);
					self.set('isOpen', false);
                    $('body').removeClass('no-scroll');
                }
			});
		},
        openOverlay(){
            this.set('isOpen', true);
            $('body').addClass('no-scroll');
        },
        closeOverlay(){
            this.set('isOpen', false);
            $('body').removeClass('no-scroll');
        },
        dismiss(){
            this.set('isOpen', false);
            $('body').removeClass('no-scroll');

        }
	}
});

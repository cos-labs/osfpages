/*global $:true*/

import Ember from 'ember';
import TimeMachine from 'ember-time-machine';
import ENV from '../../config/environment';

export default Ember.Component.extend({
    themeList: [
        {
            id: 1,
            name: 'All',
            thumb: ENV.rootURL +'img/all.png',
            description: 'Includes all section types.'
        },
        {
            id: 2,
            name: 'Wiki',
            thumb: ENV.rootURL +'img/wiki.png',
            description: 'A basic page with title and wiki page.'
        },
        {
            id: 3,
            name: 'File',
            thumb: ENV.rootURL +'img/file.png',
            description: 'Title and file sections ideal for showcasing papers.'
        },
        {
            id: 4,
            name: 'Institution',
            thumb:  ENV.rootURL +'img/institution.png',
            description: 'Example of an institution homepage.'
        },
        {
            id: 5,
            name: 'Portfolio',
            thumb: ENV.rootURL +'img/portfolio.png',
            description: 'Example of a portfolio page'
        },
        {
            id: 6,
            name: 'RPP',
            thumb: ENV.rootURL +'img/rpp.png',
            description: 'Example of Reproducibility Project: Psychology'
        },
    ],
	isOpen: null,
	actions: {
		renderTemplate(id) {
			let self = this;
			let theme = `theme_${id}.json`;
			$.ajax({
				type: 'GET',
				url: ENV.rootURL +'themes/' + theme,
				async: false,
				success: function(data) {
                    const content = Ember.Object.create(data);
                    const timeMachine = TimeMachine.Object.create({ content });
					self.set('theme', timeMachine);
					self.set('isOpen', false);
                    $('body').scrollTop(0);
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

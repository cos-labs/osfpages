import Ember from 'ember';

export default Ember.Component.extend({
 	isOpen: null,
	actions: {
		renderTemplet(type){
			let self=this;
            let theme;
            switch(type) {
                case 'all':
                    theme = 'theme_1.json'
                    break;
                case 'wiki':
                    theme = 'theme_2.json'
                    break;
                case 'file':
                    theme = 'theme_3.json'
                    break;
                case 'people':
                    theme = 'theme_4.json'
                    break;
            }

			$.ajax({
	            type: 'GET',
	            url: '/themes/'+theme,
	            async: false,
	            success: function (data) {
	                self.set('layers' , data)
	            }});
		},
		toggleProperty(prop){
            this.toggleProperty(prop);
        }
	}
});

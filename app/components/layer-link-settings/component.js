import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		validateLink(){
			//Still need to add link validation

		},
        saveForm() {
            this.set('showSettings', false);
        },
    }
});

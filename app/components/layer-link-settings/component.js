import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		validateLink(){
			//Still need to add link validation 

		},
	    saveForm() {
			console.log(JSON.stringify(this.get('layer').settings.properties));
	    },

  }
});

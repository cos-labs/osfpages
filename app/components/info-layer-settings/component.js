import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
	    saveForm() {
			console.log(JSON.stringify(this.get('layer').settings.properties));
	    }
  }

});

import Ember from 'ember';

export default Ember.Component.extend({
	imageOnLeft: Ember.observer('layer.settings.values.alignment', 'editMode', function() {
		if(this.get('layer.settings.values.alignment') === 'center'){
			Ember.$('textarea').addClass('side-description')
		}else{
			Ember.$('textarea').removeClass('side-description')
		}
	})
});

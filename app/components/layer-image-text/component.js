import Ember from 'ember';

export default Ember.Component.extend({
	imageOnLeft: Ember.observer('layer.settings.alignment', 'editMode', function() {
		if(this.get('layer.settings.alignment') === 'center'){
			Ember.$('textarea').addClass('side-description')
		}else{
			Ember.$('textarea').removeClass('side-description')
		}
	})
});

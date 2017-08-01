import Ember from 'ember';

export default Ember.Component.extend({
	imageOnLeft: Ember.observer('layer.settings.values.alignment', function() {
		if(this.get('layer.settings.values.alignment') === 'center'){
			$('textarea').addClass('side-description')
		}else{
			$('textarea').removeClass('side-description')
		}
  })
});

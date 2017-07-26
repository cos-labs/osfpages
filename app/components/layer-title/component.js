import Ember from 'ember';

export default Ember.Component.extend({
	titleStyle: Ember.computed('layer.settings.values.h1Size', function(){
		let size = this.get('layer.settings.values.h1Size') || 30;
		return Ember.String.htmlSafe('font-size: ' + size + 'px;');
	}),
	didRender(){
		let self = this;
		$.each(this.get('layers'), function( index, layer ) {
			if(layer.component === 'pages-menu'){
				self.set('layer.settings.values.showNavigation' , false)
			}
		});
	}
});

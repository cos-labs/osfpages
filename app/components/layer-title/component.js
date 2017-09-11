/*global $:true*/

import Ember from 'ember';

export default Ember.Component.extend({
	titleStyle: Ember.computed('layer.settings.h1Size', function(){
		let size = this.get('layer.settings.h1Size') || 30;
		return Ember.String.htmlSafe('font-size: ' + size + 'px;');
	}),
	didRender(){
		let self = this;
		$.each(this.get('layers.content'), function( index, layer ) {
			if(layer.component === 'pages-menu'){
				self.set('layer.settings.showNavigation' , false)
			}
		});
	}
});

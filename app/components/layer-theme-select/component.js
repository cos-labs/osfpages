import Ember from 'ember';
import ENV from '../../config/environment';
import TimeMachine from 'ember-time-machine';


export default Ember.Component.extend({
	isOpen: null,
	themeList: [ 
		{
			id: 1,
			name: 'Blue sky',
			colorOne: '#31708f',
			colorTwo: 'snow',
			colorThree: '#98cbe4' 
		},
		{
			id: 2,
			name: 'Blue sky',
			colorOne: '#f07057',
			colorTwo: 'snow',
			colorThree: '#eeeeee' 
		},
		{
			id: 3,
			name: 'Green forest',
			colorOne: '#8BC34A',
			colorTwo: '#DCEDC8',
			colorThree: '#212121' 
		},
		{
			id: 4,
			name: 'Go Science',
			colorOne: '#166595',
			colorTwo: '#ffffff',
			colorThree: '#474747' 
		}
	],
	actions: {
		selectTheme(id) {
			let theme = `theme_${id}.json`;
			$.ajax({
				type: 'GET',
				url: ENV.rootURL +'themes/' + theme,
				async: false,
				success: (data)=> {
					var content = Ember.Object.create(data);

					let layers = this.get('model.theme.content.layers');
					let count = 0;
					this.set("layers", layers.map(layer => {						
						if(count === 0) {
							Ember.set(layer, "settings.bgColor",  data.theme.primaryColor); 
							Ember.set(layer, "settings.color",  data.theme.primaryTextColor); 
						} else if( count === 1) {
							Ember.set(layer, "settings.bgColor",  data.theme.secondaryColor); 
							Ember.set(layer, "settings.color",  data.theme.secondaryTextColor); 
						}
						else {
							Ember.set(layer, "settings.bgColor",  data.theme.tertiaryColor); 
							Ember.set(layer, "settings.color",  data.theme.tertiaryTextColor); 
							count = 0;
						}

						Ember.set(layer, "settings.alignment",  data.theme.alignment); 




						count ++;
						this.set('isOpen', false);
    					$('body').scrollTop(0);
                    	$('body').removeClass('no-scroll');
						return layer;
					}));



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

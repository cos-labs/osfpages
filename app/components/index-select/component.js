import Ember from 'ember';
import ENV from '../../config/environment';


export default Ember.Component.extend({
	didRender(){
		$('.index-page').css({'background' : '#FFC107 url(' + ENV.rootURL+ 'img/bg.png) no-repeat center' ,   'background-size': 'cover'});
	}
});

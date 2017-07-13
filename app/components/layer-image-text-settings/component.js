import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        alignContent (alignment) {
            this.set('layer.settings.properties.textAlignment', alignment);
        },
        imageLocation(location){
            let isLeft = location === 'left' ? true : false;
            this.set('layer.settings.properties.imageOnLeft', isLeft);
        },
        saveForm(){

        }
    }
});

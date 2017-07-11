import Ember from 'ember';
const Layer = Ember.Object.extend();

export default Ember.Component.extend({
    showRemove: false,
    actions: {
        showRemove(){
            this.set('showRemove', true);
        },
        hideRemove(){
            this.set('showRemove', false);
        },
        removeLayer () {
            let index = this.get('index');
            this.get('layers').removeAt(index);
            this.set('showRemove', false);
        }
    }
});

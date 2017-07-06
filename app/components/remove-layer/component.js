import Ember from 'ember';
const Layer = Ember.Object.extend();

export default Ember.Component.extend({
    actions: {
        removeLayer () {
            let index = this.get('index');
             this.get('layers').removeAt(index);
        }
}
});

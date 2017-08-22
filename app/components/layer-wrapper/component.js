import Ember from 'ember';

export default Ember.Component.extend({
    showSettings: false,
    style: Ember.computed('layer.settings.values.bgColor', 'layer.settings.values.color', 'layer.settings.values.url', 'layer.settings.values.backgroundImage', 'layer.settings.values.backgroundCover', 'layer.settings.values.height', function(){
        let bgColor =  'background-color: ' + (this.get('layer.settings.values.bgColor') || '#FFF') + '; ';
        let color =  'color: ' + (this.get('layer.settings.values.color') || '#333') + '; ' ;
        let bgImage = '';
        let bgCover = '';
        if(this.get('layer.component') === 'layer-image'){
            bgImage = 'background-image: url(' + this.get('layer.settings.values.url') + '); '
        } else if (this.get('layer.settings.values.backgroundImage')){
            bgCover = this.get('layer.settings.values.backgroundCover') ? ' background-size: cover;' : '';
            bgImage = 'background-image: url(' + this.get('layer.settings.values.backgroundImage') + '); ';
        }
        let height = this.get('layer.settings.values.height') ? 'height: ' + this.get('layer.settings.values.height') + 'px;' : '';
        return Ember.String.htmlSafe(bgImage + bgCover + height + bgColor + color);
    }),
    actions: {
        showSettings (){
            this.set('showSettings', true);
        },

    }
});

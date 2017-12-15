import Ember from 'ember';

export default Ember.Component.extend({
    showSettings: false,
    style: Ember.computed('layer.settings.bgColor', 'layer.settings.color', 'layer.settings.url', 'layer.settings.backgroundImage', 'layer.settings.backgroundCover', 'layer.settings.height', function(){
        let bgColor =  'background-color: ' + (this.get('layer.settings.bgColor') || '#FFF') + '; ';
        let color =  'color: ' + (this.get('layer.settings.color') || '#333') + '; ' ;
        let bgImage = '';
        let bgCover = '';
        if (this.get('layer.settings.backgroundImage')){
            bgCover = this.get('layer.settings.backgroundCover') ? ' background-size: cover;' : '';
            bgImage = 'background-image: url(' + this.get('layer.settings.backgroundImage') + '); ';
        }
        let height = this.get('layer.settings.height') ? 'height: ' + this.get('layer.settings.height') + 'px;' : '';
        return Ember.String.htmlSafe(bgImage + bgCover + height + bgColor + color);
    }),
    didRender() {
        // if(this.get('editMode')) {
        //     this.set('editModePadding', 'padding-left:50px;padding-right:50px;')
        // } else {
        //     this.set('editModePadding', '')

        // }
        console.log(this.get('layerPadding'))
    },
    actions: {
        showSettings (){
            this.set('showSettings', true);
        },

    }
});

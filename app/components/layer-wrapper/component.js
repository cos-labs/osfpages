import Ember from 'ember';

export default Ember.Component.extend({

    showSettings: false,
    theme: Ember.computed('themes', 'layer.settings.values.themeId', function(){
        return this.get('themes').filter((item)=>{
            return item.id === this.get('layer.settings.values.themeId');
        })[0];
    }),
    style: Ember.computed('theme', 'layer.settings.values.backgroundImage', 'layer.settings.values.backgroundCover', 'layer.settings.values.height', function(){
        let bgColor = 'background-color: ' + this.get('theme.background') + '; ';
        let bgImage = '';
        let bgCover = '';
        if(this.get('layer.component') === 'layer-image'){
            bgImage = 'background-image: url(' + this.get('layer.settings.values.url') + '); '
        } else if (this.get('layer.settings.values.backgroundImage')){
            bgCover = this.get('layer.settings.values.backgroundCover') ? ' background-size: cover;' : '';
            bgImage = 'background-image: url(' + this.get('layer.settings.values.backgroundImage') + '); ';
        }
        let height = this.get('layer.settings.values.height') ? 'height: ' + this.get('layer.settings.values.height') + 'px;' : '';
        let color = 'color: ' + this.get('theme.color') + '; '
        return Ember.String.htmlSafe(bgColor + bgImage + bgCover + color + height);
    }),
    actions: {
        showSettings (){
            this.set('showSettings', true);
        },

    }
});

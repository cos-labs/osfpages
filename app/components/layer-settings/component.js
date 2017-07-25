import Ember from 'ember';

export default Ember.Component.extend({
    file_object: null,

    didRender() {
        this._super(...arguments);
        const str = this.get('layer.settings.values.sectionLink');
        if(str !== undefined){
            this.send('isUrlValid' , str);
        }
    },
    actions: {
        changeSize(direction, item){
            if(direction === 'bigger') {
                this.incrementProperty('layer.settings.values.' + item.value, item.incrementSize);
            }
            if(direction === 'smaller') {
                this.decrementProperty('layer.settings.values.' + item.value, item.incrementSize);
            }
        },
        runOption(option, item){
            this.set('layer.settings.values.' + item.value, option);
        },
        saveForm(){

        },
        isUrlValid(userInput) {
            var regexQuery = "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$";
            var url = new RegExp(regexQuery,"i");
            if (url.test(userInput)) {
                if(userInput.split(".").length > 2){
                    //valid url:
                    $('.input').css('border-color', '#4caf50');

                }
                return true;
            }
            //invalid url:
            $('.input').css('border-color', '#f44336');
            return false;
        }
    }
});

import Ember from 'ember';

export default Ember.Component.extend({
    style: Ember.computed('layer.settings.values.color', function(){
        return Ember.String.htmlSafe('color: ' + (this.get('layer.settings.values.color') || '#333') + '; ');
    }),
    sticky: Ember.observer('layer.settings.values.StickToTop' , function() {
        let topOfNav = $('.pages-menu').offset().top;
        if(this.get('layer.settings.values.StickToTop')){
            $(window).on('scroll.nav', function (e) { 
                if ( $(window).scrollTop() >= topOfNav ) {
                    $('.pages-menu').addClass('sticky-nav')
                }else{
                    $('.pages-menu').removeClass('sticky-nav')
                } 
            });
        }else{
           $(window).off('scroll.nav');
        }
   }),
    actions: {
        scrollToLayer(index){
            let el = $('#layer'+index);
            let offset = el.offset();
            $('body').animate({scrollTop:offset.top}, '500');
        }
    }
});

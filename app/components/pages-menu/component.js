import Ember from 'ember';

export default Ember.Component.extend({
    style: Ember.computed('layer.settings.values.color', function(){
        return Ember.String.htmlSafe('color: ' + (this.get('layer.settings.values.color') || '#333') + '; ');
    }),
    sticky: Ember.observer('layer.settings.values.stickToTop' , 'layers.[]' , function() {
        let topOfNav = null;
        if( $('.pages-menu')[0] ){
            topOfNav = $('.pages-menu').offset().top;
        }
        let self = this;
        if(this.get('layer.settings.values.stickToTop')){
            $(window).on('scroll.nav', function (e) {


                let _topOfNav = null;
                _topOfNav = topOfNav;
                if($('.editMenu')[0]){
                    _topOfNav = topOfNav - 51;
                    if (!self.get('editMode')) {
                        _topOfNav = topOfNav - 120 ;
                    }
                }else{
                    _topOfNav = topOfNav - 67;

                }

                if ( $(window).scrollTop() >= _topOfNav ) {
                    $('.pages-menu').addClass('sticky-nav')
                    if($('.editMenu')[0]){
                        $('.pages-menu').addClass('sticky-nav-adjustment')
                    }

                }else{
                    $('.pages-menu').removeClass('sticky-nav')
                    if($('.editMenu')[0]){
                        $('.pages-menu').removeClass('sticky-nav-adjustment')
                    }
                } 
            });
        }else{
            $(window).off('scroll.nav');
            $('.pages-menu').removeClass('sticky-nav' )
            if($('.editMenu')[0]){
                $('.pages-menu').removeClass('sticky-nav-adjustment')
            }
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

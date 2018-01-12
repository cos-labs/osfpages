/*global $:true*/
import Ember from 'ember';

export default Ember.Component.extend({
    style: Ember.computed('layer.settings.color', 'layer.settings.fontSize', function(){
        return Ember.String.htmlSafe('color: ' + (this.get('layer.settings.color') || '#333') + '; font-size: ' +  (this.get('layer.settings.fontSize')) + 'px;');
    }),
    didRender(){
        let topOfNav = null;
        //These offsets are used to position the nav bar if and when there is the editmode bar present
        const EDIT_MODE_OFFSET = 50;
        const ADMIN_VIEW_MODE_OFFSET = 120;
        const VIEW_MODE_OFFSET = 67;

        if( $('.pages-menu')[0] ){
            topOfNav = $('.pages-menu').offset().top;
        }
        let self = this;
        if(this.get('layer.settings.stickToTop')){
            $(window).on('scroll.nav', function () {
                let paddedNavOffset = null;
                paddedNavOffset = topOfNav;
                if($('.editMenu')[0]){
                    paddedNavOffset = topOfNav - EDIT_MODE_OFFSET;
                    if (!self.get('editMode')) {
                        paddedNavOffset = topOfNav - ADMIN_VIEW_MODE_OFFSET ;
                    }
                }else{
                    paddedNavOffset = topOfNav - VIEW_MODE_OFFSET;

                }

                if ( $(window).scrollTop() >= paddedNavOffset ) {
                    if($('.ghost-nav')[0] === undefined){
                        $('.pages-menu').parent().after("<div class='ghost-nav'></div>")
                    }

                    $('.pages-menu').addClass('sticky-nav')
                    $('.ghost-nav').css('margin-top' , $('.pages-menu').height());

                    if($('.editMenu')[0]){
                        $('.pages-menu').addClass('sticky-nav-adjustment')
                    }
                }else{
                    $('.ghost-nav').remove()

                    $('.pages-menu').removeClass('sticky-nav')
                    $('.ghost-nav').css('margin-top' , '0');

                    if($('.editMenu')[0]){
                        $('.pages-menu').removeClass('sticky-nav-adjustment')
                    }
                }
            });
        }else{
            $('.ghost-nav').remove()

            $(window).off('scroll.nav');
            $('.pages-menu').removeClass('sticky-nav' )
            $('.ghost-nav').css('margin-top' , '0');

            if($('.editMenu')[0]){
                $('.pages-menu').removeClass('sticky-nav-adjustment')
            }
        }

        $('.layer-content').css('padding' , '0');
    },
    actions: {
        scrollToLayer(index){
               // console.log('scroll to',index)
               // console.log(JSON.stringify(this.get('layers.content'), null, 2))
               let el = $('#layer'+index);
               let offset = el.offset();
               console.log(el , offset)
               $('html, body').animate({
                scrollTop: el.offset().top
            }, 500);
           }
       }
   });

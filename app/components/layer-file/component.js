import Ember from 'ember';

export default Ember.Component.extend({
    showSelect: false,
    noFileFound: true,
    marginTop: Ember.computed('editMode', function(){
        if(this.get('editMode')){
            return 'margin-top';
        }
        return '';
    }),
    didRender() {
        if(!this.get('layer.settings.downloadLink')){
            this.get('node.files').then((result)=>{
                result.objectAt(0).get('files').then((files)=>{
                    if(files.length === 0){
                        this.set('noFileFound', true);
                        return false;
                    }else{
                        this.set('noFileFound', false);
                    }
                    let fileDatesLinks = {}
                    let fileModifiedDates = []
                    for(let i = 0; i < files.length; i++){
                        fileModifiedDates.push(files.objectAt(i).get('dateModified'));
                        fileDatesLinks[files.objectAt(i).get('dateModified')] = files.objectAt(i).get('links').download;
                    }
                    let mostRecentDate = new Date(Math.max.apply(null,fileModifiedDates));
                    this.set('layer.settings.downloadLink' , fileDatesLinks[mostRecentDate]);
                });
            });
        }else{
            this.set('noFileFound', false);
        }
    },
    actions: {
        fileDetail(file) {
            this.set('showSelect', false);
            this.set('layer.settings.downloadLink' ,  file.data.links.download)
        },
        showSelect(){
            this.set('showSelect', true);
        },
        hideSelect(){
            this.set('showSelect', false);
        }
    }
});

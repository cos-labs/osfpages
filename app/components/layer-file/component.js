import Ember from 'ember';

export default Ember.Component.extend({
    showSelect: false,
    didRender() {
        if(!this.get('layer.settings.values.downloadLink')){
            this.get('node.files').then((result)=>{
                result.objectAt(0).get('files').then((files)=>{
                    let fileDatesLinks = {}
                    let fileModifiedDates = []
                    for(let i = 0; i < files.length; i++){
                        fileModifiedDates.push(files.objectAt(i).get('dateModified'));
                        fileDatesLinks[files.objectAt(i).get('dateModified')] = files.objectAt(i).get('links').download;
                    }                
                    let mostRecentDate = new Date(Math.max.apply(null,fileModifiedDates));
                    this.set('layer.settings.values.downloadLink' , fileDatesLinks[mostRecentDate]);
                });
            });
        }

    },
    actions: {
        fileDetail(file) {
            this.set('showSelect', false);
            this.set('layer.settings.values.downloadLink' ,  file.data.links.download)
        },
        showSelect(){
            this.set('showSelect', true);
        },
        hideSelect(){
            this.set('showSelect', false);
        }
	}
});

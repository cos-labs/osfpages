import Ember from 'ember';

export default Ember.Component.extend({
    showSelect: false,
    noFileFound: true, //make computed property that observers the layers.[] and if change see if there is a file
    didRender() {

        console.log(this.get('layer.settings.values.downloadLink') ,  this.get('noFileFound'))
        if(!this.get('layer.settings.values.downloadLink')){
            this.get('node.files').then((result)=>{
                result.objectAt(0).get('files').then((files)=>{
                    console.log("files.length" , files.length);
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
                    this.set('layer.settings.values.downloadLink' , fileDatesLinks[mostRecentDate]);
                });
            });
        }else{
            this.set('noFileFound', false);
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

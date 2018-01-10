
import Ember from 'ember';

export default Ember.Component.extend({
  options: {
    theme: "snow", 
    modules: {
      toolbar:[
       [{ 'header': [ 3, false] }]  
      ]    
    }
  },


  actions: {
    updateText(editor) {
      console.log('this is in the updateText')
      this.set('layer.content.settings.sectionDescription' , editor.root.innerHTML)

    }
  }
});

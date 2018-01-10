 import ENV from '../config/environment';

let themeList = [ 'theme_1.json', 'theme_2.json' , 'theme_3.json' , 'theme_4.json'];
let themes = [];

//To add a new theme add the theme to public/defaultThemes folder  and add it to the json list aboive 
function getThemes(themeName){
  $.ajax({
      type: 'GET',
      url: ENV.rootURL + 'defaultThemes/' + themeName,
      async: false,
      success: function(data) {
        themes.push(data);
      },
       error: function(XMLHttpRequest, textStatus, errorThrown) { 
        console.log('ERROR: ' , errorThrown)
      }  
  });
}

themeList.forEach((themeName)=> {
  getThemes(themeName)
});




export {
    themes
};
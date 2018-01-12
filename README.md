# osfpages

OSF Pages is an Open Science Framework (OSF) addon and website builder that helps OSF users build beautiful websites very quickly using their existing project details. OSF Pages doesn't need additional hosting or management and it's free and open source.
 

###  Installation
 
- ```git clone```  this repository, or your fork of it. You can also use apps like SourceTree by adding it as a remote link. 
- yarn install --pure-lockfile
- bower install


### Backend
OSF Pages uses a very basic Django backend to store the pages data. This is a temporary method while OSf Pages is in a prototype mode. 

There is already a deployed application that is linked in the code for prototype use. You don't need to make any changes. If you want to run your local server you need to download and install this Django app:  https://github.com/cos-labs/osfpages-service


### Using with OSF API
OSF Pages relies on OSF API to work with OSF projects and requires calls to be made to the OSF API. As part of your installation you added ember-osf as an addon. You will need to generate a configuration file and build a developer addon in OSF to be able to access the API.
- Add configuration for ember osf by following instructions here: https://github.com/CenterForOpenScience/ember-osf/#specifying-configuration-information
- Create a developer application in OSF by following these steps:
    - In OSF click the dropdown near your profile image on top navbar and select Settings to go to Settings page.
    - From the menu on the left select 'Developer apps'
    - Click on the button that says 'New Application'
    - Enter required information. For local environments your callback url will be ```http://localhost:4200```
    - Click create. 
    - Use the Client ID and secret provided for your application in ember configuration settings

### Running
You will need to define the environment in your terminal application before running ```ember serve``` or you can run it together in this way:

    BACKEND=stage ember serve


## Boilerplate ember instructions

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

### Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Bower](https://bower.io/)
* [Ember CLI](https://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

### Installation

* `git clone <repository-url>` this repository
* `cd osfpages-admin`
* `npm install`
* `bower install`

### Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

#### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

#### Running Tests

* `ember test`
* `ember test --server`

#### Building

* `ember build` (development)
* `ember build --environment production` (production)

#### Deploying

Specify what it takes to deploy your app.

### Creating a new templates 
templates are made of a theme and a layout, below are the structures needed to create a new template

**Creating a new theme** <br>
_public/defaultThemes/_ <br>
create a new theme in this file in the below structure 
``` 
{
	"id": 2,
	"name": "Orange Tree",
	"theme" : {
		"primaryColor" : "#f07057",
		"primaryTextColor" : "snow",
		"secondaryColor" : "snow",
		"secondaryTextColor" : "#black",
		"tertiaryColor" : "#eeeeee",
		"tertiaryTextColor" : "black",
		"alignment": "center",
		"blockSettings" : {
			"layer-title" :{
				"backgroundImage":"https://image.ibb.co/cqBWUw/bg.png"
			}
	}
}

```

**renderer/defaultTheme.js** <br>
_add name of theme to themeList at top of page_ <br>
` let  themeList = [ 'theme_1.json', 'theme_2.json' , 'theme_3.json' , 'theme_4.json']`
<br>
**Create a new template** <br>
_Layouts.js_ <br>
Add a new layout <br>
`"landing-page-v0.0.1": [ "layer-title-v0.0.1", "layer-info-v0.0.1" , "layer-file-v0.0.1"]
`
<br>
**Layer-template-select.js**<br>
_Add to the templatesList (this makes it show up on the page )_ <br>
```
{
    'layoutName': 'Data Feature', //Name on page
    'layout': 'data-feature-v0.0.1',  //Layout with version for use in code 
    'themeId' : 2 , // Theme ID  (theme id 2 would get theme_3.json [0-index])
    'url' : ENV.rootURL +'img/green.png', //Link to image used to show what theme looks like
    'colors':themes[2].theme // pulls in colors from theme to show on page to user
}
```


### Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

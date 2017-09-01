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

### Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

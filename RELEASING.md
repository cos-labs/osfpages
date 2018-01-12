# Releasing osfpages

At the end of each sprint or at points that make sense for the application create a release and push to master a stable version. This means that the current state of the application
- Runs without errors
- Does not include unfinished features
- Does not have console logs or commented out code 
- Is able to work in hosted version (e.g. asset links)


---

#### With git, follow these steps or perform the equivalent in SourceTree 

* On `master`, update `package.json` with new version number. Follow [semver](http://semver.org/).

```json
  "version": "63.12.0",
```

* Commit with message "Bump version".

```
git commit -m "Bump version"
```

* Add git tag.

```
git tag 63.12.0
```


* Push to GitHub.

```
git push
git push --tags
```

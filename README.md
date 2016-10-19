# pipetree

[![Build Status](https://travis-ci.org/dotnetCarpenter/pipetree.svg?branch=master)](https://travis-ci.org/dotnetCarpenter/pipetree)
[![Build Status](https://ci.appveyor.com/api/projects/status/yxqj4kad6trefnj0/branch/master?svg=true)](https://ci.appveyor.com/project/dotnetCarpenter/pipetree/branch/master)
[![Coverage Status](https://coveralls.io/repos/github/dotnetCarpenter/pipetree/badge.svg?branch=master)](https://coveralls.io/github/dotnetCarpenter/pipetree?branch=master)


*Utility library to enable easy piping between nodejs programs and tree traversing of graphs*

```js
const select = require("pipetree").select
const listen = require("pipetree").listen

// get a function to traverse a tree - this one returns the first occurance
// of the field "browser_download_url"
const getDownloadUrl = select.querySelector("browser_download_url")

// use this function when the piped input is read
select.use = () => {
	// use the querySelector from select on the parsed JSON piped input
	const downloadUrl = getDownloadUrl( listen.collectJSON() )
	console.log(downloadUrl)
}

// attach select to handle the "listen" output when read
select.start()
// start listening for piped input
listen.start()
```

# License
MIT
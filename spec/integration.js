"use strict"

const tap	          = require("tap")
const fs	          = require("fs")
const child_process = require("child_process")
const thenify       = require("thenify")
const exec          = thenify(child_process.exec.bind(child_process))
const readFile      = thenify(fs.readFile.bind(fs))

tap.test("downloadUrl should", t => {
  t.plan(1)

  exec(
    "node ./integration/cat.js ./fixtures/releases.json | node ./integration/downloadUrl.js",
    { cwd: __dirname },
    (error, stdout, stderr) => {

      const expected 	= "https://github.com/jasmine/jasmine/releases/download/v2.5.2/jasmine-standalone-2.5.2.zip"
      const actual		= stdout

      t.match(actual, expected, "return the first browser_download_url found")
    }
  )
})

tap.test("lastVersion should", t => {
  t.plan(1)

  exec(
    "node ./integration/cat.js ./fixtures/latestversion.json | node ./integration/lastVersion.js",
    { cwd: __dirname },
    (error, stdout, stderr) => {

      const expected 	= "v2.5.2"
      const actual		= stdout

      t.match(actual, expected, "return the first tag_name found")
    }
  )
})

tap.test("Download jasmine.zip 2.5.2", t => {
  t.plan(1)

  const downloadProcess = exec(
    "httpsget https://api.github.com/repos/jasmine/jasmine/releases/4157608 | ./integration/downloadUrl.js | httpsget",
    { cwd: __dirname,
      encoding: "latin1" }
  ).catch(t.threw)
  const loadFixtureZipFile = readFile(
    `${__dirname}/fixtures/jasmine.zip`,
    { cwd: __dirname,
      encoding: "latin1" }
  ).catch(t.threw)

  Promise.all([
    downloadProcess,
    loadFixtureZipFile
  ]).then(result => {
    const expected = result[1]
    const actual = result[0][0]
    const error = result[0][1]
    if(error) t.threw(error)
    
    t.same(actual, expected, "as latin1")
  }).catch(t.threw)

})

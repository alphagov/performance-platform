performance-platform
====================

This repo will contain useful code for collecting data and integrating with the performance platform.

# Light Gate

## What is it?
Light gate is a javascript snippet for integrating internal user journeys (eg. not cross domain) with an analytics provider. 
It sends data on page load instead of on click to avoid breaking user experience with opening new windows or tabs and to
get around problems with analytics providers timing out on posts. To do this it 'stashes' an event in a cookie and then 
sends the event on the next page load.

## Releasing a new version

1. Install and set up juicer if you don't already have it. 
    - `gem install juicer`
    - `juicer install JsLint`
    - `juicer install closure_compiler`
2. Add any new dependencies to `release_templates/lightGateTemplate.js`
3. In the `performance_platform` directory run `juicer merge -m "closure_compiler" -o "release/lightGate.0.1.0.min.js" release_templates/lightGateTemplate.js` and 
`juicer merge -o "release/lightGate.0.1.0.js" release_templates/lightGateTemplate.js`. Make sure that you bump the version number as appropriate. This will
run JsLint against your code and then minify and combine are necessary. **It is strongly recommended that you run JsLint in strict mode to prevent errors
being created by minifying**.
4. You currently need to run the tests manually by changing `tests/unit/unit_tests.html` to include the new releases.

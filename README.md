performance-platform
====================

This repo contains useful code and information for collecting data and integrating with
the Performance Platform.

## Contents

We use [the GitHub wiki attached to this repository](https://github.com/alphagov/performance-platform/wiki)
for storing useful information like:

- [User Research](https://github.com/alphagov/performance-platform/wiki/User-Research)

## New dev setup

See also: https://github.gds/pages/gds/pp-manual/the-team/new-starters.html

First up, you'll probably need to be added to GitHub and to any relevant
teams in order to get read and write access.

### [gds-boxen](https://github.com/alphagov/gds-boxen)

You can follow along with the README to get a new Mac set up.

Create a personal manifest in `modules/people/` with your GitHub username, and
make sure to include at least:

    class people::your_username {
      # Not sure if these are required, but they (probably) can't hurt
      include vagrant_gem
      include vagrant-dns
      include vagrant-vbguest

      include teams::performance-platform
    }

After completing the setup by running `boxen`, you should have everything you
need to continue.

### pp-development

You'll now have a repo called `pp-development` checked out on your machine from
GHE. Following the README in there will get your dev environment set up,
including creating a VM with Vagrant.

## [Backdrop](https://github.com/alphagov/backdrop)

In your `backdrop` repository, you should be able to `./run_tests.sh` from inside
your shiny new development VM. The repo README has more info.

## [Spotlight](https://github.com/alphagov/spotlight)

In your `spotlight` repository, `npm test` will run some fun Node.js tests.

Getting real data into Spotlight might be something you should do at some
point.

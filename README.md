performance-platform
====================

This repo will contain useful code for collecting data and integrating with
the performance platform.

## Setup

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

### development

You'll now have a repo called `development` checked out on your machine from
GHE. Following the README in there will get your dev environment set up,
including creating a VM with Vagrant.

## [Backdrop](https://github.com/alphagov/backdrop)

In your `backdrop` repository, you should be able to `./run_tests.sh` from inside
your shiny new development VM. The repo README has more info.

## [Limelight](https://github.com/alphagov/limelight)

In your `limelight` repository, `bundle exec rake test:all` will run some fun
Ruby tests.

Getting real data into Limelight might be something you should do at some
point.

## Some other important things you should learn about soon

- Legacy vs new world order
- __Google Apps__: mailing lists and calendars (team and holiday)
- __Meetings__: Show and Tell, All staff monthly (and invites for those)
- Lunch
- Current and near future work
- [Learning wiki](https://github.com/alphagov/wiki/wiki)

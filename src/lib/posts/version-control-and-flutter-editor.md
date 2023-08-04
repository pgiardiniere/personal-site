---
title: "Version Control and Flutter Editor"
date: "2020-05-28"
updated: "2020-05-28"
categories: 
  - "TraffickCam Mobile"
excerpt: Set up TraffickCam Mobile's version control & look into Flutter editor features.
---

## BitBucket with git

In case you don't have git set up with your bitbucket account yet, I personally recommend against using their GUI Sourcetree and instead setting up [SSH keys](https://help.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh) with your account. This way you access BitBucket just the same as GitHub from your command line.

You would also configure your [.ssh/config](https://stackoverflow.com/questions/2419566/best-way-to-use-multiple-ssh-private-keys-on-one-client?rq=1) so git knows which ssh key to use with which host.

If you encounter [this](https://confluence.atlassian.com/bitbucketserverkb/commit-in-bitbucket-server-shows-a-different-username-than-the-one-that-pushes-the-code-779171816.html) issue where commit display names in BitBucket do not match your profile, you can work around it by updating git user.name/user.email properties on a per-repository basis (rather than globally as the linked resolution suggests).


## Flutter editors

Per Flutter's [getting started](https://flutter.dev/docs/get-started/install) guide it seems flutter has first-class support for 2 editors: Android Studio (built from base of IntelliJ IDEA) and VS Code. IntelliJ IDEA shares much of the same functionality as Android Studio. If you prefer, you can also work inside a different editor and run projects from the command line.

The upshot of working in Android Studio or VS Code is the use of so called code hot-swapping. Similar to certain plugins for web developers which produce a live view of their webpage as they make changes to their code, Flutter promises similar functionality for mobile app development.

Android Studio supports building projects using Gradle. This is unlike VS Code which to my knowledge only supports Gradle builds for traditional Java projects. In the frontend traffickcam repo, there are some gradle files, but they're all empty. This leads me to believe the dev before me was working in Android Studio (possibly IntelliJ) but had not defined any Gradle build tasks - I'll have to dig deeper to be sure.

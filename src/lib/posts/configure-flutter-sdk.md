---
title: "Install and Configure the Flutter SDK"
date: "2020-05-29"
updated: "2020-05-29"
categories: 
  - "TraffickCam Mobile"
excerpt: Set up TraffickCam Mobile's Flutter SDK.
--- 

This post consists of a few takeaways from proceeding through the steps of https://flutter.dev/docs/get-started/install

By the time you have finished step 3, you should have the following:

* Latest stable Flutter SDK on your system
* At least 1 editor configured for Flutter/Dart projects
* Tested the demo app on your phone
* Tested the demo app on an Android VM
* A basic understanding of how code hot swapping works
* A basic understanding of Flutter's build modes

Additionally, if you're developing from a macOS workstation, I believe there's a way you can set up iOS VMs to test with as well.

## Flutter Version:

At time of writing, the latest stable version of Flutter for Windows is 1.17.2.  See the release announcement [here](https://medium.com/flutter/announcing-flutter-1-17-4182d8af7f8e).

Potentially worth noting is the mobile app's last code commit appears to have occurred May 5th. Per the Flutter [releases](https://docs.flutter.dev/release/archive?tab=windows) page, that code would have been written in Flutter `v1.12.13+hotfix.9` at highest (assuming work was done within the stable release channel).

I would hope that the most recent Flutter versions within 1.x do not contain incompatibilities with prior versions, but I'm not sure of that. Fortunately, if you need to test your code on a prior version of Flutter, you can set to a version using the `flutter version <vers #>` command.  See more details about flutter sdk updates, versions, and channels [here](https://docs.flutter.dev/release/upgrade).

## Step 1) Install

Also at time of writing, the install process for Flutter SDK requires not only extracting their published zip, but also installing a bunch of upstream Android toolchain dependencies. You acquire these through Android Studio (importantly, with obsolete packages displayed) which will also periodically pull updates for these packages.

Once you have your path environment variable updated, you can start using 'flutter doctor' command from your terminal. This command will assist you through the rest of the install process.

Finally, note that if you define Android Virtual Devices (AVDs) using Android Studio's built-in AVD manager at this time, they should become available to you in other text editors (I can only confirm this behavior for VS Code though).

## Step 3) Test Drive

Play around with the demo app across different IDEs using your physical phone/an AVD, and in different build modes, with hot-swapping enabled/disabled to get a feel for the behaviors of each respective mode.


## Questions

* How to test iOS devices? I'm not sure what our process for testing apple devices was before this, but without an iPhone/mac workstation that's going to prove difficult for me, what with Apple's restrictions on virtualization.
* The beta branch of Flutter includes support for [building web apps](https://flutter.dev/docs/get-started/web). Is it feasible to develop an app which could work across desktop browsers, android, and iOS?

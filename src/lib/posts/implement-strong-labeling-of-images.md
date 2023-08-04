---
title: "Implement Strong Labeling of Images"
date: "2020-05-27"
updated: "2020-05-27"
categories: 
  - "TraffickCam Mobile"
  - "Flutter"
  - "Image Labels"
excerpt: This is my very first blog post with the VIDAR lab at Temple, outlining my first task on the mobile app.
---

## Background:

Investigators using Traffickcam have requested a new feature which would allow them to interact more meaningfully with Traffickcam results by successively querying on individual objects of interest within images. In order to implement such a feature, the images that they query require accurate, region-based labels.

Currently, incoming images from the Traffickcam mobile app do not have any labels. While images can have labels applied after-the-fact to many objects programmatically with relatively high accuracy, some objects require bespoke labeling by people. In both cases, we would still prefer an engaged person to produce the labels, as they will still outperform machines in identifying common objects.

The most readily scalable method to achieve mass-labeling would be to distribute this task to individual users, i.e. to have users submit their photos with labels. It was found that in the experiment conducted in "Understanding Effort and Engagement in the Design of Camera-Centric Crowdsourcing Applications" that implementing Strong Labeling does not appear to have a negative affect on user satisfaction.

As such my research goal this summer is to finish implementing a toggle-able option for end users to create and submit labels on their photos.


## Prior Work:

A student before me started implementing this feature using Flutter, an SDK for dual-deployment of mobile apps to Android and iOS devices. I am to pick up where this student left off and finish implementing the feature.


## To do:

As I have no prior experience with Flutter, we'll have to start with basics.

* Configure Flutter/Dart plugins in an IDE
* Get a simple program running
* Test said program using the Dart VM on desktop (to allow for more rapid prototyping)
* Test said program on my smartphone

Once I have a basic understanding of how to get Flutter programs to run, I would like to observe the behavior of image labeling as implemented in the dummy version of traffickcam used in the cited experiment, as well as review the code.

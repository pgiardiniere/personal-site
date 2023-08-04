<svelte:head>
	<title>About</title>
</svelte:head>

# About Me

I recently completed my Master's at Temple in Computatational Data Science. I spent several years working in the Vision, Imaging, and Data Analysis Research (VIDAR) lab; advised by [Prof. Souvenir](https://cis.temple.edu/~souvenir/)

In my time there, I worked on many projects, mostly pertaining to [TraffickCam](http://traffickcam.org/about), which prevents human trafficking by applying state-of-the-art computer vision techniques to a unique dataset of hotel room images.

My first project was the TraffickCam Mobile App - the public face of TraffickCam. The mobile app is responsible for crowdsourced data collection, i.e. it's where users submit images of hotel rooms to be added to our dataset of hotel room images. 

My task was to write an entirely new app from the ground up using Flutter, then distribute it on the team's existing App Store & Google Play pages. Some of the new required functionality included: Native camera integration & camera preview, a photo review gallery, and strongly-labeled object annotation collection. That app is currently available on the App Store and Google Play Store.

I spent a good deal of time reviewing required machine learning & computer vision fundamentals, primarily through paper reading & self-study of Stanford's in Deep Learning for Computer Vision via self-stufy of Stanford's [CS231n: Deep Learning for Computer Vision](http://cs231n.stanford.edu/) coursework.

I then maintained the TraffickCam Search web app, and the TraffickCam API which handles search queries for the webapp (among other responsibilities). 

How it works: Partner investigators from the [National Center for Missing & Exploited Children](https://www.missingkids.org/) submit an image of a hotel room, scrubbing any victims from the photo. An infilling model then takes the masked region and inpaints it. The inpainted image is then submitted to our image retrieval model trained on our hotels dataset, returning the list of results ranked by similarity.

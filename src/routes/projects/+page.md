<svelte:head>
	<title>Projects</title>
</svelte:head>

# TraffickCam Search

The web search app used by partner investigators. They submit an images to search, along with some optional text & location boundaries to our API, which returns them the most similar set of images, as well as the exact hotel location & room those images came from.

<br>

# TraffickCam API

The API which powers it all - it takes queries from the web search app & runs it through our ML pipeline.

It also serves as image submission endpoint for the mobile app, among various other responsibilities.

<br>

# TraffickCam Mobile

<img src="/images/tcam-mobile.png" alt="TraffickCam Mobile camera GUI" style="width:45%; float:right; margin:10px">

TraffickCam Mobile is a crowdsourced data collection app available on the [App Store](https://apps.apple.com/mn/app/traffickcam/id1067713017?platform=iphone) & [Google Play](https://play.google.com/store/apps/details?id=com.exchangeinitiative.traffickcam&hl=en_US&gl=US&pli=1). It enables users to assist in the fight against human trafficking just by taking photos of the hotel room they're in.

I designed, wrote, and distributed the 2.0+ versions of the app from scratch using Flutter. Some of the new features include:
* In-app camera with live preview
* User-friendly image annotations
* First-time feature walkthrough
* Image review gallery

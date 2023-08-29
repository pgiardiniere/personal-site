<svelte:head>
	<title>Projects</title>
</svelte:head>

<script>
	import Info from '$lib/components/Info.svelte';
</script>

# TraffickCam

I worked on the [TraffickCam project](http://traffickcam.org/about) for 3 years. TraffickCam prevents human trafficking by applying state-of-the-art computer vision techniques to a unique dataset of hotel room images, in partnership with the [National Center for Missing Exploited Children](https://www.missingkids.org/home).

I was the Mobile Developer for 1 year, and then Lead Developer for 2 years. I was entrusted with ownership of all production systems, including: Search, Mobile, the Search API, and more.

## TraffickCam Search

TraffickCam Search is the search web app used by partner investigators. It's powered by an internal API that hosts the computer vision models.

<Info>
<b> Note:</b> The API also hosts the image submission endpoint for the mobile app, among other responsibilities.
</Info>

#### How it works

Partners prepare images by hiding sensitive areas and sending the search request. The API receives this request and fills in the hidden parts of the image using an off-the-shelf model. These infilled images are sent to an in-house model for evaluation. This model has been trained on a special dataset of hotel room images, and during evaluation, it embeds the new image into a feature vector for similarity comparison. Finally, the API responds to the request with a list of results - the most similar hotel room images it found. From any result, partners can view other images from that room and precise hotel details, all inside the search results page.

#### Major Contributions

* Reduced search web app build times by 98% 
* Overhauled API service architecture to promote service cohesion and reduce coupling, resulting in:
  * Reduced image query times by ~10%.
  * Reduced API startup times by ~50%.
  * Increased service observability, by ensuring certain failures could not impact logging.
* Dramatically reduced 3rd party dependencies installed to API environment, improving developer experience and reducing attack surface.
* Performed production app server and database migration, many server updates & software updates, etc.
* Completely rewrote all project documentation, greatly increasing coverage, accuracy, and consistency.


## TraffickCam Mobile

<img src="/images/tcam-mobile.png" alt="TraffickCam Mobile camera GUI" style="width:45%; float:right; margin:10px">

TraffickCam Mobile is a crowdsourced data collection app available on the [App Store](https://apps.apple.com/mn/app/traffickcam/id1067713017?platform=iphone) & [Google Play](https://play.google.com/store/apps/details?id=com.exchangeinitiative.traffickcam&hl=en_US&gl=US&pli=1). It enables users to assist in the fight against human trafficking just by taking photos of the hotel room they're in.

I designed, wrote, and distributed the 2.0+ versions of the app from scratch using Flutter. Some of the new features include:
* In-app camera with live preview
* User-friendly image annotations
* First-time feature walkthrough
* Image review gallery

<svelte:head>
	<title>Projects</title>
</svelte:head>

<script>
	import Info from '$lib/components/Info.svelte';
</script>

# TraffickCam

I was the project's Mobile Developer for 1 year, and then Lead Developer for 2 years. I was entrusted with ownership of all production systems, including: Search, Mobile, the Search API, and more.

## TraffickCam Search/API

**TraffickCam Search** is the web search app used by partner investigators.

**TraffickCam API** is the service-based API which hosts the advanced computer vision models that enable search.

<Info>
<b> Note:</b> TraffickCam API also hosts the image submission endpoint for the mobile app, among other responsibilities.
</Info>

#### How it works

Investigators prepare an image by masking sensitive regions, then submitting it together with optional text & geographical boundaries.

Our API receives the request, infills the masked image regions using an off-the-shelf model, and submits those infilled images to the in-house retrieval model for evaluation. This model is pretrained on a proprietary hotel room dataset, and during evaluation it embeds the new image into a feature vector on which similarity search is performed. It responds to the query with the most similar hotel room images found (restricted by any submitted geographical filters) and returns a list of results, where users can see other images from that room together with the exact hotel location and other useful information.

#### Major Contributions

* Reduced search web app build times by 98% 
* Overhauled API service architecture to promote service cohesion and reduce coupling, resulting in:
  * Reduced image query times by ~10%.
  * Reduced API startup times by ~50%.
  * Increased service observability, by ensuring certain failures could no longer impact logging.
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

---
title: "Hello Minikube"
date: "2023-08-19"
updated: "2023-08-19"
categories: 
  - "kubernetes"
excerpt: Kubernetes guides continues.
---

Following the [install post](/blog/kubernetes-install), I'm now continuing through the guides with [hello-minikube]. It's a short affair, very little explanation beyond just running some of basic commands, so let's get right to it.

The first bit is easy, until you create a service using kubectl's `expose deployment` command, at which point we have an issue where I'm unable to access the cluster 

Per the instructions, for minikube specifically the `LoadBalancer` type makes the service available externally through the command


```bash
minikube service \<service-name\>
```
The issue being it immediately opens the service in the default browser. On the device that minikube is installed to. Which is one I am SSH'd into.

Sure enough, this is rhyming with my experience administering docker services, where I can now see that IP from the host node, but not another node on the LAN:

![local node](/images/hello-minikube-1.png)

![remote node](/images/hello-minikube-2.png)

As a temporary workaround, I'll just work with this from my Windows machine instead of on the (preferred) Ubuntu box `pc2`. I much prefer working directly on linux for these sorts of things, so I'll have to figure that out shortly.


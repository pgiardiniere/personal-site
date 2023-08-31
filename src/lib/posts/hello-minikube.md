---
title: "Hello Minikube"
date: "2023-08-28"
updated: "2023-08-28"
categories: 
  - "kubernetes"
excerpt: Continuation of Kubernetes guides.
---

Following the [install post](/blog/kubernetes-install), I'm now continuing through the guides with [hello-minikube](https://kubernetes.io/docs/tutorials/hello-minikube/). It's a short affair, very little explanation beyond just running some of basic commands, so let's get right to it.

The first bit is easy, until you create a service using kubectl's `expose deployment` command, at which point we have an issue where I'm unable to access the cluster 

Per the instructions, for minikube specifically the `LoadBalancer` type makes the service available externally through the command


```bash
minikube service \<service-name\>
```
The issue being it immediately opens the service in the default browser. On the device that minikube is installed to. Which is one I am SSH'd into.

Sure enough, this is rhyming with my experience administering docker services, where I can now see that IP from the host node, but not another node on the LAN:

![local node](/images/hello-minikube-1.png)

![remote node](/images/hello-minikube-2.png)

Likely it's just a result of default Kubernetes virutal network environment config. As a temporary workaround, I'll just work with this from my Windows machine instead of on the (preferred) Ubuntu box `pc2`. There's plenty of time to get those particulars sorted out later on.

Once you do that, there's not much else to it other than running the commands as they're presented to you. If you've worked with Docker Compose or other container/vm orchestration software before it should be pretty familiar.

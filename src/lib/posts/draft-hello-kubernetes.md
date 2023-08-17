---
title: "Hello, Kubernetes!"
date: "2023-08-17"
categories: 
  - "microservices"
  - "kubernetes"
excerpt: My experience taking first steps with Kubernetes.
---

<script>
    import Callout from '$lib/components/Callout.svelte';
</script>

I've used Docker and Docker Compose to manage a static node with a bunch of services on it before in my time maintaining TraffickCam. I've also used it when deploying models to our high-performance compute cluster, though we would eventually move away from that workflow.

I've been curious about Kubernetes for a long time, so since I've got the time let's jump in and start learning it. I'm following Kubernete's [hello minikube](https://kubernetes.io/docs/tutorials/hello-minikube/) tutorial, after installing the prerequisite [minikube](https://minikube.sigs.k8s.io/docs/start/) and [kubectl](https://minikube.sigs.k8s.io/docs/start/) on my Ubuntu machine.

Afterwards I'll keep following along with the rest of the official Kubernetes [tutorials](https://kubernetes.io/docs/tutorials/).

## Install minicube:

Fortunately, the installs couldn't be simpler. First you grab minikube:

```
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

Then you test it with a simple `minikube start`. 

In my case it complained that my user was not part of the docker group, an extremely [simple config](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user) that comes with a [security notice](https://docs.docker.com/engine/security/#docker-daemon-attack-surface) to always be mindful of the users you give this privilege to, as the docker daemon can royally mess up your host machine in the wrong hands. This is my own personal machine, so we're all good there :)

<blockquote style="font-style: normal;">  
  <b>Note:</b> That issue reminded me, it's been a while since I updated my docker installation, NVIDIA drivers, or my Ubuntu machine in general for some time so I took a moment here to run an <code>apt update</code> and <code>apt upgrade</code>.

  As per usual, NVIDIA drivers require some hand-holding via the [ubuntu-drivers](https://linuxconfig.org/how-to-install-the-nvidia-drivers-on-ubuntu-22-04) utility, but it's all straightforward.
</blockquote>

After taking care of that, we run another `minikube start` and verify it comes up:

![terminal output of minikube start](/images/hello-kubernetes-1.png)

## Install kubectl:

Next you'll want to install `kubectl` so you can start issuing commands via the dedicated controller.


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

## Install:

Fortunately, the install is fairly straightforward. First you grab minikube:

```
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

Then you test it with a simple `minikube start`. 

In my case, it complained that my user was not part of the docker group, an extremely [simple config](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user) that comes with a [security notice](https://docs.docker.com/engine/security/#docker-daemon-attack-surface) to always be mindful of the users you give this privilege to, as the docker daemon can royally mess up your host machine in the wrong hands. This is my own personal machine, so we're all good there :)

>**Note:** That issue reminded me, it's been a while since I updated my docker installation, NVIDIA drivers, or my Ubuntu machine in general for some time so I took a moment here to run an `apt update` and `apt upgrade`.
>
>As per usual, NVIDIA drivers require some hand-holding via the [ubuntu-drivers](https://linuxconfig.org/how-to-install-the-nvidia-drivers-on-ubuntu-22-04) utility, but it's all straightforward.

After taking care of that, we try `minikube start` again and verify it comes up:

![terminal output of minikube start](/images/hello-kubernetes-1.png)

Next you'll want to install `kubectl` so you can start issuing commands via the dedicated controller. Cut again back to its [install guide](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/), following the steps (and always verify your checksums!), or alternatively have minikube handle it by running the following: `minikube kubectl -- get po -A`.

We can then verify both the utilities are available as well as their versions:

To check out the dashboard on localhost, you just run `minikube dashboard`, or `minicube dashboard --url` to get the url in your terminal.

>**Note:**
>
>If you're ssh'd onto a different node within 
your LAN, you'll need to perform some additional config to view the dashboard - specifically, you'll need to perform port forwarding. 
>
>If you're unfamiliar with it, you can do it from the command line by following [this thread](https://stackoverflow.com/questions/47173463/how-to-access-local-kubernetes-minikube-dashboard-remotely) or by allowing VS Code integrated terminal to detect it, if you use that editor.

Now, I'm actually ssh'd into a different machine on my home network to get this done, so I need to open that up

## Minikube config:

Section 3 of the doc [here](https://minikube.sigs.k8s.io/docs/start/) recommends that you configure  
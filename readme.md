# Docker for Developers
Building web apps that run the same in multiple environments can be a time-consuming process. This work session we  will  learn  how to use Docker and how you can efficiently build apps that run consistently across any machine. First, you'll learn about Docker, docker hub, Images, Container and  commands.  Next, you'll learn how to  work with images, as well as Docker containers After that, you'll discover how to get a fully-functional development environment up and running. By the end of this  session, you'll be able create lightweight apps that run the same no matter the environment.


##Installation on Linux

##### Prerequisites

- Install `curl`
 
`sudo apt-get install curl`

##### Install Docker 

- Quick and easy `docker` Install by `script`:

`curl -sSL https://get.docker.com/ | sh`

- Add your user to  `docker` group.


`sudo usermod -aG docker $USER`


- Start the `docker` daemon.

`sudo service docker start`

- Log out or restart your pc to ensures your user is running with the correct permissions.

- Verify your work by running `docker` without `sudo`.

`docker run hello-world`


#####Install Docker Composer 

- `docker compose` install permission.

`sudo chown -R $(whoami) /usr/local/bin`

- Install `docker compose` 

```
curl -L https://github.com/docker/compose/releases/download/1.8.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
```

- `docker compose` executable permissions.

`chmod +x /usr/local/bin/docker-compose`

- Test the installation.

`docker-compose --version`

#####Optional
- Install [Oh My Zsh](https://github.com/robbyrussell/oh-my-zsh) with the [Docker, git plugin](https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins#docker) for autocompletion of docker and git commands. 


# Docker commands

### Pull, Run, Start, Stop and Restart

* `docker pull` pulls an image from docker registry to local machine.

   Usage:`docker pull [OPTIONS] ImageName:TAG`

   Example:`docker pull nginx:1.11.9-alpine`

* `docker run` creates and starts a container in one operation. 

   Usage:`docker run [OPTIONS] ImageName:TAG [COMMAND]`

   Example:`docker run -it --name nginx -p 80:80 -v /some/content:/usr/share/nginx/html:ro nginx:1.11.9-alpine`

* `docker start` starts a container so it is running.

   Usage:`docker start [OPTIONS] ContainerName or ContainerID [CONTAINER...] `


* `docker stop`stops a running container.

   Usage:`docker stop [OPTIONS] ContainerName or ContainerID [CONTAINER...] `


* `docker restart` starts a container so it is running.

   Usage:`docker restart [OPTIONS] ContainerName or ContainerID [CONTAINER...] `


### Build, Execute, Show, Rename, Remove


* `docker build`creates image from Dockerfile.

   Usage:`docker build [OPTIONS] PATH | URL | - `

   Example:`Docker build -t YourImageName:tag . or Dockerfile location`

* `docker exec` Run a command in a running container.

   Usage:`docker exec [OPTIONS] CONTAINER COMMAND [ARG...]`

   Example:`Docker exec -it nginx bash or sh`

* `docker images`shows all images.

* `docker ps` shows running containers.

* `docker ps -a` shows running and stopped containers.

* `docker rename` allows the container to be renamed.

   Usage:`docker rename OldContainerName NewContainerName`

* `docker rm` Remove one or more containers.

   Usage:`docker rm [OPTIONS] ContainerName or ID [CONTAINER...]`

   Example:`Docker rm -f nginx` Force the removal of a running container

* `docker rmi` Remove one or more images.

   Usage:`docker rmi [OPTIONS] ImageName or ID [IMAGE...]`

   Example:`Docker rmi -f nginx` Force removal of the image.

### Debugging

* `docker logs` gets logs from container.

 Usage:`docker logs [OPTIONS] ContainerID or ContainerName`

* `docker inspect`looks at all the info on a container (including IP address)

  Usage:`docker inspect [OPTIONS] ContainerID or ContainerName`

* `docker port` shows public facing port of container.

 Usage:`docker port [OPTIONS] ContainerID or ContainerName`

* `docker top` shows running processes in container.

 Usage:`docker top [OPTIONS] ContainerID or ContainerName`

* `docker stats`shows containers' resource usage statistics.

 Usage:`docker stats [OPTIONS] ContainerID or ContainerName`

* `docker diff` shows changed files in the container's FS.

 Usage:`docker diff [OPTIONS] ContainerID or ContainerName`



### Dockerfile

* `FROM` Sets the Base Image for subsequent instructions.

Usage: `FROM <image>:<tag>`

* `MAINTAINER` Set the Author field of the generated images.

Usage: `MAINTAINER <name>`

* `RUN` execute any commands in a new layer on top of the current image and commit the results.

Usage: `RUN <command>`

* `CMD` provide defaults for an executing container.

Usage: `CMD ["executable","param1","param2"]`

* `EXPOSE` informs Docker that the container listens on the specified network ports at runtime.  NOTE: does not actually make ports accessible.

Usage: `EXPOSE <port> [<port>...]`

* `ENV` sets environment variable.

Usage: `ENV <key> <value> or ENV <key>=<value>`

* `ADD` copies new files, directories or remote file to container. Invalidates caches.

Usage: `ADD <src>... <dest>`

* `COPY` copies new files or directories to container.

Usage: `COPY <src>... <dest>`

* `ENTRYPOINT` configures a container that will run as an executable.

Usage: `ENTRYPOINT ["executable", "param1", "param2"]`

* `VOLUME` creates a mount point for externally mounted volumes or other containers.

Usage: `VOLUME ["/data"]`

* `USER` sets the user name for following RUN / CMD / ENTRYPOINT commands.

Usage: `USER <userName>`

* `WORKDIR` sets the working directory.

Usage: `WORKDIR /path/to/workdir`

* `ARG` defines a build-time variable.

Usage: `ARG <name>[=<default value>]`




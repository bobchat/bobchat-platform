# bobchat-platform
The platform for Bobchat

## System Architecture

This system is built as a Microservice Oriented Architecture (MSOA). Each service is comprised of 

### Internal communication
Services communicate internally via [NATS](https://nats.io/) and [protobuffers](https://developers.google.com/protocol-buffers/). Eachs service subscribes to message topics they are interested in processing. Before publishing a message, the service encodes the request body as a protobuffer. Protobuffers are extremely lightweight (smaller than JSON and XML) and perfect for transporting messages between services. When a services publishes a message, NATS routes the message to the correct processor. The recieving service then processes the message and reports back to the requesting service the results of processing the request. This is an asynchronous [request/response pattern](https://en.wikipedia.org/wiki/Request%E2%80%93response) implemented via [publish/subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) mechanisms. This implentation allows all services to provide the durability of the request/repsonse paradigm while also allowing the flexibility to drop down to the publish/subscribe layer for activities that require it (such as broadcasting via [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API), [HTTP Server Push](https://en.wikipedia.org/wiki/HTTP/2_Server_Push), etc) with minimal changes to the system and without special casing.

### External communication
Services communicate externally via GraphQL. In the future, an external broadcasting system will likely be implemented to provide realtime updates to live data.


## System Operation

#### Google Cloud Services
#### Docker
[Docker](https://www.docker.com/) is the industry standard in software application containerization technology. At its core, it is lightweight virtualization technology. A Docker container encapsulates a single application and its dependencies providing seperation from the operating and file systems. A container can be run nearly anywhere without having to worry about the underlying system archictecture. Docker is easy to use, has a very active community, is contributed to by some of the largest technology companies in the world, and has first-class orchestration support via Kubernetes. Each of the services in this system will run inside its own Docker container. When changes are made to a service, the service will be containerized, and uploaded to Google Cloud Registry for storage. When a container has been thoroughly tested, it will be deployed to Kubernetes via Helm. Each version of the container is kept longterm as an artifact, allowing us to rollback to specific versions of each service if nessecary. 

#### Kubernetes

#### Helm
[Helm](https://helm.sh/) is Kubernetes package manager. Helm facilitates the packaging of application components into Helm Charts, which can be deployed to Kubernetes with a single command. A Helm Chart contains everything Kubernetes needs to run a single service, including information on the Docker container to run, how it should be run, and what other services are relied on. Each service will have its own Helm Chart, and because Helm Charts are composable, it is possible to deploy our entire system with a single command.


## Security

#### Internal Security
TLS Certificates to connect to NATS server.
#### External Security
JWT Tokens, Possibly OIDC in the future


## Monitoring
Monitoring is a multifacted problem spanning system architecture, development, and operations and is paramount in any hyperscale system. You are truly only as good as your monitoring apparatsus. Good monitoring tools allow developers and operators to gauge how the system is performing and debug issues in real time.  This systems implements several monitoring tools that provide both granular and broad views of how the system is performing. In some cases, we measure the same metrics more than once to make absolutely sure the system is performing as expected.

#### Distributed Tracing with Jaeger
Tracing allows developers to track a request all the way through the system from start to finish and measure how each subcomponent of the system behaves. Distributed architectures add the complexity of tracing requests between processes boundaries. To solve this, we use [Jaeger](https://www.jaegertracing.io/). Jaeger facilitates transaction monitoring, the measurement of several types of latency, and the tracking of requests between services, all in realtime. Jaeger comes with a monitoring UI to easily interpret the gathered data. The Jaeger backend will run as a service in our system and aggregate the information gathered by other services. Each service will implement Jaeger tracing protocols via the Jaeger client, which simply means that when services make or receive requests, they will include context information that will be reported to the Jaeger backend. 

#### Application Metrics with Prometheus and Grafana
In addition to tracing, it is important to have insight into the amount of stress your system is placing on the hardware it is running on. [Prometheus](https://prometheus.io/) allows us to collect metrics on CPU usage, memory utilization and BLANK on a per container basis to ensure our hardware is application is performing correctly. [Grafana](https://grafana.com/) is a time-series visualation tool that works with prometheus to make the gathered metrics easy to interpret. 

#### Distributed logging with ELK
ElasticSearch, Logstash, and Kibana make up the ELK stack, a solution to distributed log aggregration, storage, and search.


## Analytics

#### Segment
An analytics gathering platform that allows you to pipe data to 50 different analysis tools. 

#### Google Analytics
The Supreme being of analytics

## Web Client
#### Injected Checkout Widget
## Mobile Client

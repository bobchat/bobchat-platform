# bobchat-platform
The platform for Bobchat

## Architecture

This system is built as a Microservice Oriented Architecture (MSOA). Each service is comprised of 

### Internal communication
Services communicate internally via [NATS](https://nats.io/) and [protobuffers](https://developers.google.com/protocol-buffers/). Eachs service subscribes to message topics they are interested in processing. Before publishing a message, the service encodes the request body as a protobuffer. Protobuffers are extremely lightweight (smaller than JSON and XML) and perfect for transporting messages between services. When a services publishes a message, NATS routes the message to the correct processor. The recieving service then processes the message and reports back to the requesting service the results of processing the request. This is an asynchronous [request/response pattern](https://en.wikipedia.org/wiki/Request%E2%80%93response) implemented via [publish/subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) mechanisms. This implentation allows all services to provide the durability of the request/repsonse paradigm while also allowing the flexibility to drop down to the publish/subscribe layer for activities that require it (such as broadcasting via [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API), [HTTP Server Push](https://en.wikipedia.org/wiki/HTTP/2_Server_Push), etc) with minimal changes to the system and without special casing.

### External communication
Services communicate externally via GraphQL. In the future, an external broadcasting system will likely be implemented to provide realtime updates to live data.

### Monitoring
Monitoring is a multifacted problem spanning system architecture, development, and operations and is paramount in any hyperscale system. You are truly only as good as your monitoring apparatsus. Good monitoring tools allow developers and operators to gauge how the system is performing and debug issues in real time.  This systems implements several monitoring tools that provide both granular and broad views of how the system is performing. 

#### Distributed Tracing with Jaeger
Tracing allows developers to track a request all the way through the system from start to finish and measure how each subcomponent of the system behaves. Distributed architectures add the complexity of tracing requests between processes boundaries. To solve this, we use Jaeger. 

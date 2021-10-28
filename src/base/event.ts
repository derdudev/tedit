type eventName = "click" | "hover";

interface Event {
    type: eventName,
    handler: EventListener
}

export default Event;
export {eventName};
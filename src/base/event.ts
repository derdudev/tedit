type eventName = "click" | "hover" | "keydown";

interface Event {
    type: eventName,
    handler: EventListener
}

export default Event;
export {eventName};
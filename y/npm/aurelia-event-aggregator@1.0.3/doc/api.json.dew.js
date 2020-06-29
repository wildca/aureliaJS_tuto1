export function dew () {
  return exports;
}
var exports = {"name":"aurelia-event-aggregator","children":[{"id":5,"name":"EventAggregator","kind":128,"kindString":"Class","flags":{"isExported":true},"comment":{"shortText":"Enables loosely coupled publish/subscribe messaging."},"children":[{"id":6,"name":"constructor","kind":512,"kindString":"Constructor","flags":{"isExported":true},"comment":{"shortText":"Creates an instance of the EventAggregator class."},"signatures":[{"id":7,"name":"new EventAggregator","kind":16384,"kindString":"Constructor signature","flags":{},"comment":{"shortText":"Creates an instance of the EventAggregator class."},"type":{"type":"reference","name":"EventAggregator","id":5}}],"sources":[{"fileName":"aurelia-event-aggregator.d.ts","line":20,"character":38}]},{"id":8,"name":"publish","kind":2048,"kindString":"Method","flags":{"isExported":true},"signatures":[{"id":9,"name":"publish","kind":4096,"kindString":"Call signature","flags":{},"comment":{"shortText":"Publishes a message."},"parameters":[{"id":10,"name":"event","kind":32768,"kindString":"Parameter","flags":{},"comment":{"text":"The event or channel to publish to."},"type":{"type":"union","types":[{"type":"instrinct","name":"string"},{"type":"instrinct","name":"any"}]}},{"id":11,"name":"data","kind":32768,"kindString":"Parameter","flags":{"isOptional":true},"comment":{"text":"The data to publish on the channel.\n"},"type":{"type":"instrinct","name":"any"}}],"type":{"type":"instrinct","name":"void"}}],"sources":[{"fileName":"aurelia-event-aggregator.d.ts","line":32,"character":9}]},{"id":12,"name":"subscribe","kind":2048,"kindString":"Method","flags":{"isExported":true},"signatures":[{"id":13,"name":"subscribe","kind":4096,"kindString":"Call signature","flags":{},"comment":{"shortText":"Subscribes to a message channel or message type."},"parameters":[{"id":14,"name":"event","kind":32768,"kindString":"Parameter","flags":{},"comment":{"text":"The event channel or event data type."},"type":{"type":"union","types":[{"type":"instrinct","name":"string"},{"type":"reference","name":"Function"}]}},{"id":15,"name":"callback","kind":32768,"kindString":"Parameter","flags":{},"comment":{"text":"The callback to be invoked when the specified message is published.\n"},"type":{"type":"reference","name":"Function"}}],"type":{"type":"reference","name":"Subscription","id":2}}],"sources":[{"fileName":"aurelia-event-aggregator.d.ts","line":39,"character":11}]},{"id":16,"name":"subscribeOnce","kind":2048,"kindString":"Method","flags":{"isExported":true},"signatures":[{"id":17,"name":"subscribeOnce","kind":4096,"kindString":"Call signature","flags":{},"comment":{"shortText":"Subscribes to a message channel or message type, then disposes the subscription automatically after the first message is received."},"parameters":[{"id":18,"name":"event","kind":32768,"kindString":"Parameter","flags":{},"comment":{"text":"The event channel or event data type."},"type":{"type":"union","types":[{"type":"instrinct","name":"string"},{"type":"reference","name":"Function"}]}},{"id":19,"name":"callback","kind":32768,"kindString":"Parameter","flags":{},"comment":{"text":"The callback to be invoked when the specified message is published.\n"},"type":{"type":"reference","name":"Function"}}],"type":{"type":"reference","name":"Subscription","id":2}}],"sources":[{"fileName":"aurelia-event-aggregator.d.ts","line":46,"character":15}]}],"groups":[{"title":"Constructors","kind":512,"children":[6]},{"title":"Methods","kind":2048,"children":[8,12,16]}],"sources":[{"fileName":"aurelia-event-aggregator.d.ts","line":20,"character":36}]},{"id":2,"name":"Subscription","kind":256,"kindString":"Interface","flags":{"isExported":true},"comment":{"shortText":"Represents a disposable subsciption to an EventAggregator event."},"children":[{"id":3,"name":"dispose","kind":2048,"kindString":"Method","flags":{"isExported":true},"signatures":[{"id":4,"name":"dispose","kind":4096,"kindString":"Call signature","flags":{},"comment":{"shortText":"Disposes the subscription."},"type":{"type":"instrinct","name":"void"}}],"sources":[{"fileName":"aurelia-event-aggregator.d.ts","line":11,"character":9}]}],"groups":[{"title":"Methods","kind":2048,"children":[3]}],"sources":[{"fileName":"aurelia-event-aggregator.d.ts","line":6,"character":37}]},{"id":23,"name":"configure","kind":64,"kindString":"Function","flags":{"isExported":true},"signatures":[{"id":24,"name":"configure","kind":4096,"kindString":"Call signature","flags":{},"comment":{"shortText":"Configures a global EA by merging functionality into the Aurelia instance."},"parameters":[{"id":25,"name":"config","kind":32768,"kindString":"Parameter","flags":{},"comment":{"text":"The Aurelia Framework configuration object used to configure the plugin.\n"},"type":{"type":"reference","name":"Object"}}],"type":{"type":"instrinct","name":"void"}}],"sources":[{"fileName":"aurelia-event-aggregator.d.ts","line":59,"character":33}]},{"id":20,"name":"includeEventsIn","kind":64,"kindString":"Function","flags":{"isExported":true},"signatures":[{"id":21,"name":"includeEventsIn","kind":4096,"kindString":"Call signature","flags":{},"comment":{"shortText":"Includes EA functionality into an object instance."},"parameters":[{"id":22,"name":"obj","kind":32768,"kindString":"Parameter","flags":{},"comment":{"text":"The object to mix Event Aggregator functionality into.\n"},"type":{"type":"reference","name":"Object"}}],"type":{"type":"reference","name":"EventAggregator","id":5}}],"sources":[{"fileName":"aurelia-event-aggregator.d.ts","line":53,"character":39}]}],"groups":[{"title":"Classes","kind":128,"children":[5]},{"title":"Interfaces","kind":256,"children":[2]},{"title":"Functions","kind":64,"children":[23,20]}]};
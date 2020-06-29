export function dew () {
  return exports;
}
var exports = {"name":"aurelia-history","children":[{"id":5,"name":"History","kind":128,"kindString":"Class","flags":{"isExported":true},"comment":{"shortText":"An abstract base class for implementors of the basic history api."},"children":[{"id":6,"name":"activate","kind":2048,"kindString":"Method","flags":{"isExported":true},"signatures":[{"id":7,"name":"activate","kind":4096,"kindString":"Call signature","flags":{},"comment":{"shortText":"Activates the history object.","returns":"Whether or not activation occurred.\n"},"parameters":[{"id":8,"name":"options","kind":32768,"kindString":"Parameter","flags":{},"comment":{"text":"The set of options to activate history with."},"type":{"type":"reference","name":"Object"}}],"type":{"type":"instrinct","name":"boolean"}}],"sources":[{"fileName":"aurelia-history.d.ts","line":29,"character":10}]},{"id":9,"name":"deactivate","kind":2048,"kindString":"Method","flags":{"isExported":true},"signatures":[{"id":10,"name":"deactivate","kind":4096,"kindString":"Call signature","flags":{},"comment":{"shortText":"Deactivates the history object."},"type":{"type":"instrinct","name":"void"}}],"sources":[{"fileName":"aurelia-history.d.ts","line":34,"character":12}]},{"id":11,"name":"getAbsoluteRoot","kind":2048,"kindString":"Method","flags":{"isExported":true},"signatures":[{"id":12,"name":"getAbsoluteRoot","kind":4096,"kindString":"Call signature","flags":{},"comment":{"shortText":"Returns the fully-qualified root of the current history object.","returns":"The absolute root of the application.\n"},"type":{"type":"instrinct","name":"string"}}],"sources":[{"fileName":"aurelia-history.d.ts","line":40,"character":17}]},{"id":29,"name":"getHistoryIndex","kind":2048,"kindString":"Method","flags":{"isExported":true},"signatures":[{"id":30,"name":"getHistoryIndex","kind":4096,"kindString":"Call signature","flags":{},"comment":{"shortText":"Returns the current index in the navigation history.","returns":"The current index.\n"},"type":{"type":"instrinct","name":"number"}}],"sources":[{"fileName":"aurelia-history.d.ts","line":79,"character":17}]},{"id":26,"name":"getState","kind":2048,"kindString":"Method","flags":{"isExported":true},"signatures":[{"id":27,"name":"getState","kind":4096,"kindString":"Call signature","flags":{},"comment":{"shortText":"Gets a key in the history page state.","returns":"The value for the key.\n"},"parameters":[{"id":28,"name":"key","kind":32768,"kindString":"Parameter","flags":{},"comment":{"text":"The key for the value."},"type":{"type":"instrinct","name":"string"}}],"type":{"type":"instrinct","name":"any"}}],"sources":[{"fileName":"aurelia-history.d.ts","line":73,"character":10}]},{"id":31,"name":"go","kind":2048,"kindString":"Method","flags":{"isExported":true},"signatures":[{"id":32,"name":"go","kind":4096,"kindString":"Call signature","flags":{},"comment":{"shortText":"Move to a specific position in the navigation history."},"parameters":[{"id":33,"name":"movement","kind":32768,"kindString":"Parameter","flags":{},"comment":{"text":"The amount of steps, positive or negative, to move.\n"},"type":{"type":"instrinct","name":"number"}}],"type":{"type":"instrinct","name":"void"}}],"sources":[{"fileName":"aurelia-history.d.ts","line":85,"character":4}]},{"id":13,"name":"navigate","kind":2048,"kindString":"Method","flags":{"isExported":true},"signatures":[{"id":14,"name":"navigate","kind":4096,"kindString":"Call signature","flags":{},"comment":{"shortText":"Causes a history navigation to occur.","returns":"True if navigation occurred/false otherwise.\n"},"parameters":[{"id":15,"name":"fragment","kind":32768,"kindString":"Parameter","flags":{},"comment":{"text":"The history fragment to navigate to."},"type":{"type":"instrinct","name":"string"}},{"id":16,"name":"options","kind":32768,"kindString":"Parameter","flags":{"isOptional":true},"comment":{"text":"The set of options that specify how the navigation should occur."},"type":{"type":"reference","name":"NavigationOptions","id":2}}],"type":{"type":"instrinct","name":"boolean"}}],"sources":[{"fileName":"aurelia-history.d.ts","line":49,"character":10}]},{"id":17,"name":"navigateBack","kind":2048,"kindString":"Method","flags":{"isExported":true},"signatures":[{"id":18,"name":"navigateBack","kind":4096,"kindString":"Call signature","flags":{},"comment":{"shortText":"Causes the history state to navigate back."},"type":{"type":"instrinct","name":"void"}}],"sources":[{"fileName":"aurelia-history.d.ts","line":54,"character":14}]},{"id":22,"name":"setState","kind":2048,"kindString":"Method","flags":{"isExported":true},"signatures":[{"id":23,"name":"setState","kind":4096,"kindString":"Call signature","flags":{},"comment":{"shortText":"Sets a key in the history page state."},"parameters":[{"id":24,"name":"key","kind":32768,"kindString":"Parameter","flags":{},"comment":{"text":"The key for the value."},"type":{"type":"instrinct","name":"string"}},{"id":25,"name":"value","kind":32768,"kindString":"Parameter","flags":{},"comment":{"text":"The value to set.\n"},"type":{"type":"instrinct","name":"any"}}],"type":{"type":"instrinct","name":"void"}}],"sources":[{"fileName":"aurelia-history.d.ts","line":66,"character":10}]},{"id":19,"name":"setTitle","kind":2048,"kindString":"Method","flags":{"isExported":true},"signatures":[{"id":20,"name":"setTitle","kind":4096,"kindString":"Call signature","flags":{},"comment":{"shortText":"Updates the title associated with the current location."},"parameters":[{"id":21,"name":"title","kind":32768,"kindString":"Parameter","flags":{},"type":{"type":"instrinct","name":"string"}}],"type":{"type":"instrinct","name":"void"}}],"sources":[{"fileName":"aurelia-history.d.ts","line":59,"character":10}]}],"groups":[{"title":"Methods","kind":2048,"children":[6,9,11,29,26,31,13,17,22,19]}],"sources":[{"fileName":"aurelia-history.d.ts","line":21,"character":28}]},{"id":2,"name":"NavigationOptions","kind":256,"kindString":"Interface","flags":{"isExported":true},"comment":{"shortText":"The options that can be specified as part of a history navigation request."},"children":[{"id":3,"name":"replace","kind":1024,"kindString":"Property","flags":{"isExported":true,"isOptional":true},"comment":{"shortText":"Replace the existing route."},"sources":[{"fileName":"aurelia-history.d.ts","line":10,"character":9}],"type":{"type":"instrinct","name":"boolean"}},{"id":4,"name":"trigger","kind":1024,"kindString":"Property","flags":{"isExported":true,"isOptional":true},"comment":{"shortText":"Trigger the router."},"sources":[{"fileName":"aurelia-history.d.ts","line":15,"character":9}],"type":{"type":"instrinct","name":"boolean"}}],"groups":[{"title":"Properties","kind":1024,"children":[3,4]}],"sources":[{"fileName":"aurelia-history.d.ts","line":5,"character":42}]}],"groups":[{"title":"Classes","kind":128,"children":[5]},{"title":"Interfaces","kind":256,"children":[2]}]};
export function dew () {
  throw new Error("Error converting CommonJS file aurelia-pal/src/index.js, please post a jspm bug with this message.\nSyntaxError: unknown: Unexpected token, expected \",\" (8:38)\n\n   6 | * @return The Error instance.\n   7 | */\n>  8 | export function AggregateError(message: string, innerError?: Error, skipIfAlreadyAggregate?: boolean): Error {\n     |                                       ^\n   9 |   if (innerError) {\n  10 |     if (innerError.innerError && skipIfAlreadyAggregate) {\n  11 |       return innerError;\n    at Parser._raise (/Users/whodunit/wildcard/aurelia/aureliaJS_tuto1/node_modules/@babel/parser/lib/index.js:754:17)\n    at Parser.raiseWithData (/Users/whodunit/wildcard/aurelia/aureliaJS_tuto1/node_modules/@babel/parser/lib/index.js:747:17)\n    at Parser.raise (/Users/whodunit/wildcard/aurelia/aureliaJS_tuto1/node_modules/@babel/parser/lib/index.js:741:17)\n    at Parser.unexpected (/Users/whodunit/wildcard/aurelia/aureliaJS_tuto1/node_modules/@babel/parser/lib/index.js:8844:16)\n    at Parser.expect (/Users/whodunit/wildcard/aurelia/aureliaJS_tuto1/node_modules/@babel/parser/lib/index.js:8830:28)\n    at Parser.parseBindingList (/Users/whodunit/wildcard/aurelia/aureliaJS_tuto1/node_modules/@babel/parser/lib/index.js:9219:14)\n    at Parser.parseFunctionParams (/Users/whodunit/wildcard/aurelia/aureliaJS_tuto1/node_modules/@babel/parser/lib/index.js:11931:24)\n    at Parser.parseFunction (/Users/whodunit/wildcard/aurelia/aureliaJS_tuto1/node_modules/@babel/parser/lib/index.js:11906:10)\n    at Parser.parseFunctionStatement (/Users/whodunit/wildcard/aurelia/aureliaJS_tuto1/node_modules/@babel/parser/lib/index.js:11539:17)\n    at Parser.parseStatementContent (/Users/whodunit/wildcard/aurelia/aureliaJS_tuto1/node_modules/@babel/parser/lib/index.js:11231:21)");
}
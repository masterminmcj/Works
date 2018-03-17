System.register(["angular2/platform/browser", "./myapp.component"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, myapp_component_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (myapp_component_1_1) {
                myapp_component_1 = myapp_component_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(myapp_component_1.HelloComponent); //启动组件
        }
    }
});
//# sourceMappingURL=myapp_main.js.map
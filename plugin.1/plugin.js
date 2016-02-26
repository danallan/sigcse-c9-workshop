define(function(require, exports, module) {
    main.consumes = ["Dialog", "commands", "Dialog", "menus", "ui"];
    main.provides = ["c9seminar1"];
    return main;

    function main(options, imports, register) {
        var Dialog = imports.Dialog;
        var menus = imports.menus;
        var ui = imports.ui;
        var command = imports.commands;
        
        /***** Initialization *****/
        var plugin = new Dialog("CS50", main.consumes, {
            name: "CS50 Seminar",
            allowClose: true,
            textselect: true,
            title: "CS50 Seminar Dialog",
            modal: true
        });

        function load() {
            // create a command (that will perform an action)
            command.addCommand({
                name: "cs50seminarDialog1",
                hint: "CS50 Seminar Dialog box",
                group: "General",
                exec: showDialog
            }, plugin);
            
            // add a menu item to show the dialog
            menus.addItemByPath("Window/CS50 Seminar Dialog 1...", new ui.item({
                command: "cs50seminarDialog1"
            }), 41, plugin);
            menus.addItemByPath("Window/~", new ui.divider(), 43, plugin);

        }
        
        /***** Methods *****/
        function showDialog() {
            plugin.show();
        }
        
        
        /***** Lifecycle *****/
        plugin.on("draw", function(e) {
           e.html.innerHTML = "<div>Hello, world!</div>";
        });
        
        plugin.on("load", function() {
            load();
        });

        plugin.on("unload", function() {
            plugin.hide();
        });

        /***** Register and define API *****/
        
        plugin.freezePublicAPI({
            _events: [
                /**
                 * @event show The plugin is shown
                 */
                "show",

                /**
                 * @event hide The plugin is hidden
                 */
                "hide"
            ],

            /**
             * Show the plugin
             */
            show: plugin.show,

            /**
             * Hide the plugin
             */
            hide: plugin.hide,
        });
        
        register(null, {
            "c9seminar1": plugin
        });
    }
});
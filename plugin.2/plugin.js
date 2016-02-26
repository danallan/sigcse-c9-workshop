define(function(require, exports, module) {
    main.consumes = ["Dialog", "commands", "menus", "ui", "proc"];
    main.provides = ["c9seminar2"];
    return main;

    function main(options, imports, register) {
        var Dialog = imports.Dialog;
        var menus = imports.menus;
        var ui = imports.ui;
        var command = imports.commands;
        var proc = imports.proc;
        
        /***** Initialization *****/
        var plugin = new Dialog("CS50", main.consumes, {
            name: "CS50 Seminar 2",
            allowClose: true,
            textselect: true,
            title: "CS50 Seminar Dialog 2",
            modal: true
        });

        var content;

        function load() {
            // create a command (that will perform an action)
            command.addCommand({
                name: "cs50seminarDialog2",
                hint: "CS50 Seminar Dialog box",
                group: "General",
                exec: showDialog
            }, plugin);
            
            // add a menu item to show the dialog
            menus.addItemByPath("Window/CS50 Seminar Dialog 2...", new ui.item({
                command: "cs50seminarDialog2"
            }), 42, plugin);
            menus.addItemByPath("Window/~", new ui.divider(), 43, plugin);

        }
        
        /***** Methods *****/
        function showDialog() {
            plugin.show();
        }

        function fetchInfo() {
            proc.execFile("/home/ubuntu/workspace/seminar", {
                cwd: "/home/ubuntu/workspace"
            }, parseOutput);
        }

        function parseOutput(err, stdout, stderr) {
            if (err)
                content.innerHTML = "Error :(";
            else
            {
                console.log("Received data: " + stdout);
                content.innerHTML = stdout;
            }
            plugin.show();
        }        
        
        /***** Lifecycle *****/
        plugin.on("draw", function(e) {
           e.html.innerHTML = '<div id="content">Hello, world!</div>';
           content = e.html.querySelector("#content");
        });
        
        plugin.on("show", function() {
            fetchInfo();
        });
        
        plugin.on("load", function() {
            load();
        });

        plugin.on("unload", function() {
            content = null;
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
            "c9seminar2": plugin
        });
    }
});
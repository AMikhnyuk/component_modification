import { task1 } from "./task1.js";
import { task2 } from "./task2.js";
webix.ready(function () {
  webix.protoUI(
    {
      name: "modbutton",
      $init: function (config) {
        const state = config.state;
        config.value = config.states[state];
        webix.html.addCss(this.$view, "modbutton" + state);

        this.attachEvent("onItemClick", () => {
          let state = this.config.state;
          webix.html.removeCss(this.$view, "modbutton" + state);
          state++;
          if (state > 2) state = 0;
          this.config.value = this.config.states[state];
          this.config.state = state;
          this.refresh();
          webix.html.addCss(this.$view, "modbutton" + state);
          this.callEvent("onStateChange", [state]);
        });
      },
      $cssName: "modbutton"
    },
    webix.ui.button
  );
  webix.protoUI(
    {
      name: "formControl",
      $init: function (config) {
        config.elements = [];
        const els = config.elements;
        const buttons = {
          cols: [
            { view: "button", value: "Cancel", width: 150 },
            {},
            { view: "button", value: "Save", css: "webix_primary", width: 150 }
          ]
        };
        for (let field of config.fields) {
          els.push({ view: "text", name: field });
        }
        els.push(buttons);
        this.$ready.push(function () {
          const save = this.queryView({view:"button", value:"Save"});
          const cancel = this.queryView({view:"button", value:"Cancel"});
          if (config.saveAction) save.attachEvent("onItemClick", config.saveAction);
          else
            save.attachEvent("onItemClick", function () {
              webix.message("Data save");
            });
          if (config.cancelAction) cancel.attachEvent("onItemClick", config.cancelAction);
          else
            cancel.attachEvent("onItemClick", () => {
              this.clear();
            });
        });
      }
    },
    webix.ui.form
  );
  webix.ui({ cols: [task1, task2] });
});

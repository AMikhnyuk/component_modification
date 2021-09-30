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
        const els = config.elements;
        const buttons = {
          cols: [
            { view: "button", value: "Cancel", width: 150, id: "cancel" },
            {},
            { view: "button", value: "Save", css: "webix_primary", width: 150, id: "save" }
          ]
        };
        for (let field of config.fields) {
          if (field === "one") els.push({ view: "text", label: "Fname" });
          else if (field === "two") els.push({ view: "text", label: "Lname" });
          else if (field === "three") els.push({ view: "text", label: "Addres" });
        }
        els.push(buttons);
        this.$ready.push(function () {
          if (config.saveAction) $$("save").attachEvent("onItemClick", config.saveAction);
          if (config.cancelAction) $$("cancel").attachEvent("onItemClick", config.cancelAction);
        });
      }
    },
    webix.ui.form
  );
  webix.ui({ cols: [task1, task2] });
});

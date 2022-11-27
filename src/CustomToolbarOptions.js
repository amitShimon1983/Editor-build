// @ts-nocheck
import ToolbarView from "@ckeditor/ckeditor5-ui/src/toolbar/toolbarview.js";
import Plugin from "@ckeditor/ckeditor5-core/src/plugin.js";

class CustomToolbarOptions extends Plugin {
  static get pluginName() {
    return "FormattingOptions";
  }
  init() {
    const editor = this.editor;
    editor.ui.componentFactory.add("formattingOptions", (locale) => {
      const toolbarView = (this.toolbarView = new ToolbarView(locale));
      toolbarView.set({
        ariaLabel: "Toolbar options",
        class: ["ck-toolbar-border"],
      });

      toolbarView.fillFromConfig(
        editor.config.get("formattingOptions"),
        editor.ui.componentFactory
      );

      return toolbarView;
    });
  }
}
export default CustomToolbarOptions;

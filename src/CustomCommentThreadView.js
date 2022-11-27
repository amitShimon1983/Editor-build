// @ts-nocheck
import BaseCommentThreadView from "@ckeditor/ckeditor5-comments/src/comments/ui/view/basecommentthreadview.js";
import Template from "@ckeditor/ckeditor5-ui/src/template.js";

export default class CustomCommentThreadView extends BaseCommentThreadView {
  constructor(...args) {
    super(...args);
    const bind = this.bindTemplate;
    this.bind("isResolved").to(
      this._model,
      "attributes",
      (attributes) => !!attributes?.isResolved
    );

    const commentThreadInputView = this.commentThreadInputView;
    const actions = commentThreadInputView.template.children[1];
    const currentUser = commentThreadInputView.template.children[0];

    commentThreadInputView.template.children[0].template.attributes.class = [
      "ck",
      this.length === 0 ? "ck-custom-user" : "ck-user",
      "ck-thread__user",
    ];
    commentThreadInputView.template.children[0].template.children[1].attributes.class =
      ["ck", "ck-user__name"];
    commentThreadInputView.template.children[0].template.children[1].children[0].text =
      [currentUser.name];
    commentThreadInputView.commentInputView.on(
      "change:value",
      (eventInfo, name, value, oldValue) => {
        const domElement = document.createElement("div");
        domElement.innerHTML = value;
        const text = domElement?.textContent || domElement?.innerText;
        if (text.length > 2000) {
          commentThreadInputView.commentInputView.editor.setData(oldValue);
        }
      }
    );

    commentThreadInputView.commentInputView.placeholder =
      this.length === 0 ? "@ mention users to notify" : "Reply to comment...";

    commentThreadInputView.template.children[0].template.children[0] =
      new Template({
        tag: "img",
        attributes: {
          class: ["ck", "ck-user__img", "ck-user__avatar"],
          src: this._localUser.avatar,
          onerror: `this.onerror=null;this.src=''; this.setAttribute('class', 'ck ck-user__img');`,
        },
      });

    actions.cancelButtonView.icon = null;
    actions.cancelButtonView.withText = true;
    actions.cancelButtonView.label = "Cancel";

    actions.submitButtonView.icon = null;
    actions.submitButtonView.withText = true;
    actions.submitButtonView.label = "Comment";

    const templateDefinition = {
      tag: "div",

      attributes: {
        class: ["ck-thread", bind.if("isActive", "ck-thread--active")],
        tabindex: -1,
      },

      children: [
        {
          tag: "div",
          attributes: {
            class: [
              "ck-thread__container",
              this.length === 0 ? "first_thread__child" : "",
            ],
          },
          children: [this.commentsListView, commentThreadInputView],
        },
      ],
    };
    this.setTemplate(templateDefinition);
  }
}

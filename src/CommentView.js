import CommentView from "@ckeditor/ckeditor5-comments/src/comments/ui/view/commentview";
export default class CustomCommentView extends CommentView {
  constructor(...args) {
    super(...args);
  }

  getTemplate() {
    const templateDefinition = super.getTemplate();
    templateDefinition.children[0].attributes.class = "ck-comment-annotation";
    if (this._model.content && this?._config.editorConfig.appData.users) {
      templateDefinition.children[0].children[1].children[2].children.innerHTML =
        this.updateEmailsInContent(
          this._model.content,
          this?._config.editorConfig.appData.users
        );
    }
    return templateDefinition;
  }
  updateComment(eventInfo, commentId, commentContent) {
    console.log({ eventInfo, commentId, commentContent });
  }
  findReplaceMatch(
    text,
    list,
    match
  ) {
    let replaceString = text;
    (list || []).forEach(({ email, name }) => {
      let newEmail = match.replace(/_@email_/gi, email);
      newEmail = newEmail.replace(/_@name_/gi, name);
      newEmail = newEmail.replace(/_@user_/gi, name || email);
      const regStr = new RegExp(`(@${email})`, "gi");
      const matchString = replaceString.search(regStr);
      if (matchString) {
        replaceString = replaceString.replace(regStr, newEmail);
      } else {
        replaceString = replaceString.replace(email, newEmail);
      }
    });
    return replaceString;
  };
  extractEmails(text) {
    return text.match(/@([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
  }
  updateEmailsInContent(content, members) {
    const extractedEmails = this.extractEmails(content) || [];
    if (!extractedEmails.length) {
      return content;
    }
    const emails = extractedEmails.map((str) => {
      const email = str.substr(1, str.length);
      const findMember = members.find(
        (member) => member.email.toLowerCase() === email.toLowerCase()
      );
      if (findMember) {
        return findMember;
      } else {
        return {
          email,
          name: email,
        };
      }
    });
    return this.findReplaceMatch(
      content,
      emails,
      `<span class="mention" data-mention="@_@name_" data-user-name="_@name_" data-user-email="_@email_">@_@user_</span>`
    );
  }
}

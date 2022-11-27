export function MentionCustomization(editor) {
  editor?.conversion?.for?.("upcast")?.elementToAttribute?.({
    view: {
      name: "span",
      key: "data-mention",
      classes: "mention",
      attributes: {
        "data-user-email": true,
        "data-user-name": true,
      },
    },
    model: {
      key: "mention",
      value: (viewItem) => {
        const mentionAttribute = editor?.plugins?.get("Mention")
          ?.toMentionAttribute(viewItem, {
            email: viewItem?.getAttribute("email"),
          });
        return mentionAttribute;
      },
    },
    converterPriority: "high",
  });
  editor?.conversion?.for?.("downcast")?.attributeToElement?.({
    model: "mention",
    view: (modelAttributeValue, { writer }) => {
      if (!modelAttributeValue) {
        return;
      }
      return writer?.createAttributeElement(
        "span",
        {
          class: "mention",
          "data-mention": modelAttributeValue.id,
          "data-user-name": modelAttributeValue.name,
          "data-user-email": modelAttributeValue.email,
        },
        {
          // Make mention attribute to be wrapped by other attribute elements.
          priority: 20,
          // Prevent merging mentions together.
          id: modelAttributeValue.uid,
        }
      );
    },
    converterPriority: "high",
  });
}

import BaseClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import BaseContext from '@ckeditor/ckeditor5-core/src/context.js';;
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
import Image from '@ckeditor/ckeditor5-image/src/image.js';
import Link from '@ckeditor/ckeditor5-link/src/link.js';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed.js';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice.js';
import Comments from '@ckeditor/ckeditor5-comments/src/comments.js';

// Context plugins:
import CommentsRepository from '@ckeditor/ckeditor5-comments/src/comments/commentsrepository.js';
import NarrowSidebar from '@ckeditor/ckeditor5-comments/src/annotations/narrowsidebar.js';
import WideSidebar from '@ckeditor/ckeditor5-comments/src/annotations/widesidebar.js';
import BalloonToolbar from '@ckeditor/ckeditor5-ui/src/toolbar/balloon/balloontoolbar.js';
import GeneralHtmlSupport from '@ckeditor/ckeditor5-html-support/src/generalhtmlsupport.js';
import List from '@ckeditor/ckeditor5-list/src/list.js';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline.js';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat.js';
import Font from '@ckeditor/ckeditor5-font/src/font.js';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';
import Mention from '@ckeditor/ckeditor5-mention/src/mention.js';
import BaseCommentThreadView from "@ckeditor/ckeditor5-comments/src/comments/ui/view/basecommentthreadview.js";
import Template from "@ckeditor/ckeditor5-ui/src/template.js";
import CommentView from '@ckeditor/ckeditor5-comments/src/comments/ui/view/commentview.js';
//adding thread view
import IconView from '@ckeditor/ckeditor5-ui/src/icon/iconview.js';
import ToolbarView from "@ckeditor/ckeditor5-ui/src/toolbar/toolbarview.js";
import { addListToDropdown, createDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils.js';
import Collection from '@ckeditor/ckeditor5-utils/src/collection.js';
import UIModel from '@ckeditor/ckeditor5-ui/src/model.js';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview.js';
import FindAndReplace from '@ckeditor/ckeditor5-find-and-replace/src/findandreplace.js';


class Context extends BaseContext { }

Context.defaultConfig = {
	language: 'en',
	comments: {
		maxCommentsWhenCollapsed: 2,
		maxThreadTotalWeight: 800,
	},
};

Context.builtinPlugins = [CommentsRepository, NarrowSidebar, WideSidebar];

class Editor extends BaseClassicEditor { }
Editor.builtinPlugins = [
	BalloonToolbar,
	Comments,
	Essentials,
	Heading,
	Image,
	List,
	// MediaEmbed,
	PasteFromOffice,
	FindAndReplace,
	GeneralHtmlSupport,
	Link,
	Bold,
	Italic,
	Font,
	Underline,
	Alignment,
	ToolbarView,
];
Editor.defaultConfig = {
	htmlSupport: {
		allow: [
			{
				name: /.*/,
				attributes: true,
				classes: true,
				styles: true,
			},
		],
	},
	balloonToolbar: {
		items: ['comment'],
		shouldNotGroupWhenFull: true,
	},
	removePlugins: ['Markdown'],
};

const ClassicEditor = {
	Editor,
	Context,
	BaseCommentThreadView,
	Template,
	CommentView,
	Mention,
	IconView,
	addListToDropdown,
	createDropdown,
	Collection,
	UIModel,
	ButtonView

}

export default ClassicEditor;

/*
 * 2012-02
 * jQueryを元にした
 * 新設計のXHTML構造に対応したスクリプト
 * container-managerからcontainer-controllerへ名前を変更
 * コンテナの大枠の構成
 *	.container
 *		.commentBox
 *			.headd
 *			.comment-controller
 *			.childComments
 *				.comment
 *			.foot
 *
 * コメントの構成
 * .comment
 *	.head
 *	.comment-controller
 * 	.content
 * 	.foot
 * 	.childComments
 */
(function ($) {

	var methods = {
		init: function (options) {
			// これは
		},
		open: /**
			* @param {jQuery} target
			* @param {boolean} descendant
			*/
			function (target, descendant) {
				var childCommentList = childComments.childNodes;
				for (var int = 0; int < childCommentList.length; int++) {
					if (childCommentList.item(int).nodeType == Node.ELEMENT_NODE) {
						openComment(childCommentList.item(int), true);
					}
				}
				for (var int = 0; int < comment.childNodes.length; int++) {

					if (comment.childNodes.item(int).nodeType == Node.ELEMENT_NODE) {

						/**
						 * @type {Element}
						 */
						var node = comment.childNodes.item(int);
						var classAttrName = getAttrValue(node, "class");
						if (classAttrName == "head") {

						} else if (classAttrName == "childComments") {
							node.attributes.removeNamedItem("style");
							comment.removeAttribute("style");
							if (openChildNodes) {
								openChildComments(node);
							}
						}
					}
				}
			},
		close: /**
		* @param {jQuery} target
		* @param {boolean} descendant
		*/
			function (target, descendant) {
				target.filter();
				for (var int = 0; int < target.childNodes.length; int++) {

					if (target.childNodes.item(int).nodeType == Node.ELEMENT_NODE) {
						/**
						 * @type {Element}
						 */
						var node = target.childNodes.item(int);
						var classAttrName = getAttrValue(node, "class");
						if (classAttrName == "head") {

						} else if (classAttrName == "childComments") {
							var styleAttr = doc.createAttribute("style");
							styleAttr.nodeValue = "display: none";
							node.attributes.setNamedItem(styleAttr);
							var s = doc.createAttribute("style");
							s.nodeValue = "outline: solid 3px red";
							target.setAttributeNode(s);
							if (closeChildNodes) {
								closeChildComments(node);
							}
						}
					}
				}
				var childCommentList = childComments.childNodes;
				for (var int = 0; int < childCommentList.length; int++) {
					if (childCommentList.item(int).nodeType == Node.ELEMENT_NODE) {
						closeComment(childCommentList.item(int), true);
					}
				}
			},
		compress: /**
		* @param {jQuery} target
		* @param {boolean} descendant
		*/
			function (target, descendant) {
				var childCommentList = childComments.childNodes;
				for (var int = 0; int < childCommentList.length; int++) {
					if (childCommentList.item(int).nodeType == Node.ELEMENT_NODE) {
						compressComment(childCommentList.item(int), true);
					}
				}
				/*
		 * 要素の追加や削除はfor文の中では行わないようにしなければならない
		 */
				for (var int = 0; int < comment.childNodes.length; int++) {
					var commentChildNode = comment.childNodes.item(int);

					if (commentChildNode.nodeType == Node.ELEMENT_NODE) {
						var classAttrName = getAttrValue(commentChildNode, "class");
						if (classAttrName == "head") {
							//
							var head = commentChildNode;
							var image;
							for (var int2 = 0; int2 < head.childNodes.length; int2++) {
								var item = head.childNodes.item(int2);
								if (item.nodeName == "dt" && item.nodeValue == "展開／圧縮") {
									item.nextSibling.firstChild;
								}
							}
						} else if (classAttrName == "content") {
							//
							var content = commentChildNode;

							/*
							 * <p class="compressed-text">{compressedText}</p>
							 */
						} else if (classAttrName == "foot") {
							//
							var styleAttr = document.createAttribute("style");
							styleAttr.nodeValue = "display: none;";
							commentChildNode.attributes.setNamedItem(styleAttr);
						} else if (classAttrName == "childComments" && compressChildNodes) {
							//
							compressChildComments(commentChildNode);
						}
					}
				}
			},
		uncompress: /**
		* @param {jQuery} target
		* @param {boolean} descendant
		*/
			function (target, descendant) {
				var childCommentList = childComments.childNodes;
				for (var int = 0; int < childCommentList.length; int++) {
					if (childCommentList.item(int).nodeType == Node.ELEMENT_NODE) {
						uncompressComment(childCommentList.item(int), true);
					}
				}
				// 要素の追加や削除はfor文の中では行わないようにしなければならない
				// 要素の交換は問題ない
				for (var int = 0; int < comment.childNodes.length; int++) {
					var commentChildNode = comment.childNodes.item(int);
					if (commentChildNode.nodeType == Node.ELEMENT_NODE && commentChildNode.hasAttribute("class")) {
						var classAttrName = getAttrValue(commentChildNode, "class");
						if (classAttrName == "head") {
							head = commentChildNode;

						} else if (classAttrName == "compressed-text") {
						} else if (classAttrName == "foot") {
							if (commentChildNode.hasAttribute("style")) {
								commentChildNode.removeAttribute("style");
							}
						} else if (classAttrName == "childComments" && uncompressChildNodes) {// dl.chileComments
							//
							uncompressChildComments(commentChildNode);
						}
					}
				}
			},
		createContaninerControllerComponents: function () {
			var commentBox = $('.commentBox');
			var cc = $('#container-controller');
			if (cc != null) {
				var createDt = function (name) {
					dl.append($('<dt></dt>').text(name));
				}

				var createButton = function (name, script, node) {
					var button = doc.createElementNS(xhtmlns, "input");
					button.setAttribute("type", "button");
					button.setAttribute("value", name);
					//button.setAttribute("onclick", script);
					node.appendChild(button);
				}

				var dl = doc.createElementNS(xhtmlns, "dl");
				cc.appendChild(dl);

				createDt("コメントボックス");
				var cocDd = doc.createElementNS(xhtmlns, "dd");
				dl.appendChild(cocDd);
				createButton("閉じる", "closeComment(commentBox, true);", cocDd);
				createButton("開く", "openComment(commentBox, true);", cocDd);

				var cddd = doc.createElementNS(xhtmlns, "dd");
				dl.appendChild(cddd);
				createButton("開／閉", "clopen(commentBox);", cddd);

				var cucDd = doc.createElementNS(xhtmlns, "dd");
				dl.appendChild(cucDd);
				createButton("圧縮", "compressCommentBox();", cucDd);
				createButton("展開", "uncompressCommentBox();", cucDd);
			}
		},
		compressText: 	/**
			* @param {Node} target
			* @returns {number} length Nodeから抽出した文字列
			*/
			function (target, length) {
				var extractedText = "";
				var text = "[" + extractedText.length + "]" + " " + extractedText.substring(0, length);
				var str = new String;
				for (var int = 0; int < targetNode.childNodes.length; int++) {
					var node = targetNode.childNodes.item(int);
					if (node.nodeType == Node.TEXT_NODE) {
						str = str + node.nodeValue;
					} else {
						str = str + text;
					}
				}
				return str;
			}
	};
	/**
	 * @param {Element}
	 *            comment
	 * @returns {Boolean}
	 */
	function isCompressed(comment) {
		var childNodes = comment.childNodes;
		var flag;
		for (var int = 0; int < childNodes.length; int++) {
			var node = childNodes.item(int);
			if (node.nodeType == Node.ELEMENT_NODE) {
				var classAttr = node.getAttribute("class");
				if (classAttr == "compressed-text") {
					flag = true;
				} else if (classAttr == "content") {
					flag = false;
				}
			}
		}
		return flag;
	}
	/**
	 * idから番号を取得する
	 * 
	 * @param {Element}
	 *            comment #c{number}.comment
	 * @returns {String}
	 */
	function getNumber(comment) {
		var id = getAttrValue(comment, "id");
		return id.substring(1, id.length);
	}
	function getComment(number) {
		return document.getElementById("c" + number);
	}
	$.fn.containerController = function (method) {

		// メソッド呼び出し部分
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.tooltip');
		}
	};
})(jQuery);

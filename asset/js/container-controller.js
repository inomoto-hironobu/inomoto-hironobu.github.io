(function ($) {
    const methods = {
        init(options) {
            // Initialization logic (if needed)
        },

        /**
         * Open comments recursively.
         * @param {jQuery} target
         * @param {boolean} descendant
         */
        open(target, descendant) {
            const childCommentList = target.find('.childComments').children();
            childCommentList.each((_, element) => openComment(element, true));

            target.children().each((_, node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const classAttrName = $(node).attr("class");
                    if (classAttrName === "childComments") {
                        $(node).removeAttr("style");
                        target.removeAttr("style");
                        if (descendant) openChildComments(node);
                    }
                }
            });
        },

        /**
         * Close comments recursively.
         * @param {jQuery} target
         * @param {boolean} descendant
         */
        close(target, descendant) {
            target.children().each((_, node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const classAttrName = $(node).attr("class");
                    if (classAttrName === "childComments") {
                        $(node).css("display", "none");
                        target.css("outline", "solid 3px red");
                        if (descendant) closeChildComments(node);
                    }
                }
            });

            const childCommentList = target.find('.childComments').children();
            childCommentList.each((_, element) => closeComment(element, true));
        },

        /**
         * Compress comments recursively.
         * @param {jQuery} target
         * @param {boolean} descendant
         */
        compress(target, descendant) {
            const childCommentList = target.find('.childComments').children();
            childCommentList.each((_, element) => compressComment(element, true));

            target.children().each((_, node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const classAttrName = $(node).attr("class");
                    switch (classAttrName) {
                        case "head":
                            // Additional logic for head if needed
                            break;
                        case "content":
                            // Handle content compression logic
                            break;
                        case "foot":
                            $(node).css("display", "none");
                            break;
                        case "childComments":
                            if (descendant) compressChildComments(node);
                            break;
                    }
                }
            });
        },

        /**
         * Uncompress comments recursively.
         * @param {jQuery} target
         * @param {boolean} descendant
         */
        uncompress(target, descendant) {
            const childCommentList = target.find('.childComments').children();
            childCommentList.each((_, element) => uncompressComment(element, true));

            target.children().each((_, node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const classAttrName = $(node).attr("class");
                    if (classAttrName === "foot" && $(node).attr("style")) {
                        $(node).removeAttr("style");
                    } else if (classAttrName === "childComments" && descendant) {
                        uncompressChildComments(node);
                    }
                }
            });
        },

        /**
         * Create components for the container controller.
         */
        createContainerControllerComponents() {
            const commentBox = $('.commentBox');
            const cc = $('#container-controller');

            if (cc.length) {
                const createButton = (name, handler, parent) => {
                    const button = $('<input>', {
                        type: 'button',
                        value: name,
                        click: handler
                    });
                    parent.append(button);
                };

                const dl = $('<dl></dl>').appendTo(cc);

                dl.append('<dt>コメントボックス</dt>');
                const cocDd = $('<dd></dd>').appendTo(dl);
                createButton('閉じる', () => closeComment(commentBox, true), cocDd);
                createButton('開く', () => openComment(commentBox, true), cocDd);

                const toggleDd = $('<dd></dd>').appendTo(dl);
                createButton('開／閉', () => clopen(commentBox), toggleDd);

                const compressDd = $('<dd></dd>').appendTo(dl);
                createButton('圧縮', () => compressCommentBox(), compressDd);
                createButton('展開', () => uncompressCommentBox(), compressDd);
            }
        },

        /**
         * Compress text from a target node.
         * @param {Node} target
         * @param {number} length
         * @returns {string}
         */
        compressText(target, length) {
            let extractedText = "";
            target.childNodes.forEach((node) => {
                extractedText += node.nodeType === Node.TEXT_NODE 
                    ? node.nodeValue 
                    : `[${extractedText.length}] ${extractedText.substring(0, length)}`;
            });
            return extractedText;
        }
    };

    /**
     * Check if the comment is compressed.
     * @param {Element} comment
     * @returns {boolean}
     */
    function isCompressed(comment) {
        const childNodes = comment.childNodes;
        for (let node of childNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const classAttr = node.getAttribute("class");
                if (classAttr === "compressed-text") return true;
                if (classAttr === "content") return false;
            }
        }
        return false;
    }

    /**
     * Get the comment number from its ID.
     * @param {Element} comment
     * @returns {string}
     */
    function getNumber(comment) {
        const id = comment.getAttribute("id");
        return id.substring(1);
    }

    /**
     * Get the comment element by its number.
     * @param {string} number
     * @returns {Element}
     */
    function getComment(number) {
        return document.getElementById(`c${number}`);
    }

    /**
     * jQuery plugin function for containerController.
     */
    $.fn.containerController = function (method, ...args) {
        if (methods[method]) {
            return methods[method].apply(this, args);
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, args);
        } else {
            $.error(`Method ${method} does not exist on jQuery.containerController`);
        }
    };
})(jQuery);

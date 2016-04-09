/* */ 
(function(process) {
  (function() {
    'use strict';
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
    };
    (function() {
      'use strict';
      var AlloyEditor = {
        editable: function editable(node, config) {
          config = config || {};
          config.srcNode = node;
          AlloyEditor.implementEventTarget();
          return new AlloyEditor.Core(config);
        },
        getBasePath: function getBasePath() {
          var path = window.ALLOYEDITOR_BASEPATH || '';
          if (!path) {
            var scripts = document.getElementsByTagName('script');
            for (var i = 0; i < scripts.length; i++) {
              var match = scripts[i].src.match(AlloyEditor.regexBasePath);
              if (match) {
                path = match[1];
                break;
              }
            }
          }
          if (path.indexOf(':/') === -1 && path.slice(0, 2) !== '//') {
            if (path.indexOf('/') === 0) {
              path = location.href.match(/^.*?:\/\/[^\/]*/)[0] + path;
            } else {
              path = location.href.match(/^[^\?]*\/(?:)/)[0] + path;
            }
          }
          if (!path) {
            throw 'The AlloyEditor installation path could not be automatically detected. Please set the global variable "ALLOYEDITOR_BASEPATH" before creating editor instances.';
          }
          return path;
        },
        loadLanguageResources: function loadLanguageResources(callback) {
          AlloyEditor.implementEventTarget();
          if (AlloyEditor.Lang.isFunction(callback)) {
            if (AlloyEditor.Strings) {
              setTimeout(callback, 0);
            } else {
              AlloyEditor.once('languageResourcesLoaded', callback);
            }
          }
          if (!AlloyEditor._langResourceRequested) {
            AlloyEditor._langResourceRequested = true;
            var languages = ['af', 'ar', 'bg', 'bn', 'bs', 'ca', 'cs', 'cy', 'da', 'de', 'el', 'en-au', 'en-ca', 'en-gb', 'en', 'eo', 'es', 'et', 'eu', 'fa', 'fi', 'fo', 'fr-ca', 'fr', 'gl', 'gu', 'he', 'hi', 'hr', 'hu', 'id', 'is', 'it', 'ja', 'ka', 'km', 'ko', 'ku', 'lt', 'lv', 'mk', 'mn', 'ms', 'nb', 'nl', 'no', 'pl', 'pt-br', 'pt', 'ro', 'ru', 'si', 'sk', 'sl', 'sq', 'sr-latn', 'sr', 'sv', 'th', 'tr', 'tt', 'ug', 'uk', 'vi', 'zh-cn', 'zh'];
            var userLanguage = navigator.language || navigator.userLanguage || 'en';
            var parts = userLanguage.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/);
            var lang = parts[1];
            var locale = parts[2];
            if (languages.indexOf(lang + '-' + locale) >= 0) {
              lang = lang + '-' + locale;
            } else if (languages.indexOf(lang) === -1) {
              lang = 'en';
            }
            CKEDITOR.scriptLoader.load(AlloyEditor.getUrl('lang/alloy-editor/' + lang + '.js'), function(loaded) {
              if (loaded) {
                AlloyEditor.fire('languageResourcesLoaded');
              }
            }, this);
          }
        },
        getUrl: function getUrl(resource) {
          var basePath = AlloyEditor.getBasePath();
          if (resource.indexOf(':/') === -1 && resource.indexOf('/') !== 0) {
            resource = basePath + resource;
          }
          if (CKEDITOR.timestamp && resource.charAt(resource.length - 1) !== '/' && !/[&?]t=/.test(resource)) {
            resource += (resource.indexOf('?') >= 0 ? '&' : '?') + 't=' + CKEDITOR.timestamp;
          }
          return resource;
        },
        implementEventTarget: function implementEventTarget() {
          if (!AlloyEditor.fire && !AlloyEditor.on) {
            CKEDITOR.event.implementOn(AlloyEditor);
          }
        },
        regexBasePath: /(^|.*[\\\/])(?:alloy-editor[^/]+|alloy-editor)\.js(?:\?.*|;.*)?$/i,
        Buttons: {},
        Toolbars: {}
      };
      if (typeof module !== 'undefined' && _typeof(module.exports) === 'object') {
        module.exports = AlloyEditor;
      }
      if (typeof window !== 'undefined') {
        window.AlloyEditor = AlloyEditor;
      } else if (typeof global !== 'undefined') {
        global.AlloyEditor = AlloyEditor;
      } else if (typeof self !== 'undefined') {
        self.AlloyEditor = AlloyEditor;
      } else {
        this.AlloyEditor = AlloyEditor;
      }
    })();
    var React = (function() {
      return (0, eval)('this').React;
    }());
    if (typeof React === 'undefined') {
      React = AlloyEditor.React;
    }
    var ReactDOM = (function() {
      return (0, eval)('this').ReactDOM;
    }());
    if (typeof React === 'undefined') {
      ReactDOM = AlloyEditor.ReactDOM;
    }
    if (typeof window !== 'undefined') {
      'use strict';
      (function() {
        'use strict';
        CKEDITOR.tools.debounce = CKEDITOR.tools.debounce || function(callback, timeout, context, args) {
          var debounceHandle;
          var callFn = function callFn() {
            var callContext = context || this;
            clearTimeout(debounceHandle);
            var result = [];
            for (var len = arguments.length,
                startIndex = 0; startIndex < len; ++startIndex) {
              result.push(arguments[startIndex]);
            }
            var callArgs = result.concat(args || []);
            debounceHandle = setTimeout(function() {
              callback.apply(callContext, callArgs);
            }, timeout);
          };
          callFn.detach = function() {
            clearTimeout(debounceHandle);
          };
          return callFn;
        };
      })();
      'use strict';
      var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
        return typeof obj;
      } : function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
      };
      (function() {
        'use strict';
        var REGEX_URI_SCHEME = /^(?:[a-z][a-z0-9+\-.]*)\:|^\//i;
        function Link(editor, config) {
          this._editor = editor;
          this.appendProtocol = config && config.appendProtocol === false ? false : true;
        }
        Link.prototype = {
          constructor: Link,
          advanceSelection: function advanceSelection(link) {
            link = link || this.getFromSelection();
            var range = this._editor.getSelection().getRanges()[0];
            if (link) {
              range.moveToElementEditEnd(link);
              var nextNode = range.getNextEditableNode();
              if (nextNode && !this._editor.element.equals(nextNode.getCommonAncestor(link))) {
                var whitespace = /\s/.exec(nextNode.getText());
                var offset = whitespace ? whitespace.index + 1 : 0;
                range.setStart(nextNode, offset);
                range.setEnd(nextNode, offset);
              }
            }
            this._editor.getSelection().selectRanges([range]);
          },
          create: function create(URI, attrs, modifySelection) {
            var selection = this._editor.getSelection();
            var range = selection.getRanges()[0];
            if (range.collapsed) {
              var text = new CKEDITOR.dom.text(URI, this._editor.document);
              range.insertNode(text);
              range.selectNodeContents(text);
            }
            URI = this._getCompleteURI(URI);
            var linkAttrs = CKEDITOR.tools.merge({
              'data-cke-saved-href': URI,
              href: URI
            }, attrs);
            var style = new CKEDITOR.style({
              attributes: linkAttrs,
              element: 'a'
            });
            style.type = CKEDITOR.STYLE_INLINE;
            style.applyToRange(range, this._editor);
            if (modifySelection && modifySelection.advance) {
              this.advanceSelection();
            } else {
              range.select();
            }
          },
          getFromSelection: function getFromSelection() {
            var selection = this._editor.getSelection();
            var selectedElement = selection.getSelectedElement();
            if (selectedElement && selectedElement.is('a')) {
              return selectedElement;
            }
            var range = selection.getRanges()[0];
            if (range) {
              range.shrink(CKEDITOR.SHRINK_TEXT);
              return this._editor.elementPath(range.getCommonAncestor()).contains('a', 1);
            }
            return null;
          },
          remove: function remove(link, modifySelection) {
            var editor = this._editor;
            if (link) {
              if (modifySelection && modifySelection.advance) {
                this.advanceSelection();
              }
              link.remove(editor);
            } else {
              var style = new CKEDITOR.style({
                alwaysRemoveElement: 1,
                element: 'a',
                type: CKEDITOR.STYLE_INLINE
              });
              var selection = editor.getSelection();
              selection.selectElement(selection.getStartElement());
              editor.removeStyle(style);
            }
          },
          update: function update(attrs, link, modifySelection) {
            link = link || this.getFromSelection();
            if (typeof attrs === 'string') {
              link.setAttributes({
                'data-cke-saved-href': attrs,
                href: attrs
              });
            } else if ((typeof attrs === 'undefined' ? 'undefined' : _typeof(attrs)) === 'object') {
              var removeAttrs = [];
              var setAttrs = {};
              Object.keys(attrs).forEach(function(key) {
                if (attrs[key] === null) {
                  if (key === 'href') {
                    removeAttrs.push('data-cke-saved-href');
                  }
                  removeAttrs.push(key);
                } else {
                  if (key === 'href') {
                    setAttrs['data-cke-saved-href'] = attrs[key];
                  }
                  setAttrs[key] = attrs[key];
                }
              });
              link.removeAttributes(removeAttrs);
              link.setAttributes(setAttrs);
            }
            if (modifySelection && modifySelection.advance) {
              this.advanceSelection(link);
            }
          },
          _getCompleteURI: function _getCompleteURI(URI) {
            if (!REGEX_URI_SCHEME.test(URI)) {
              URI = this.appendProtocol ? 'http://' + URI : URI;
            }
            return URI;
          }
        };
        CKEDITOR.Link = CKEDITOR.Link || Link;
      })();
      'use strict';
      (function() {
        'use strict';
        if (CKEDITOR.plugins.get('ae_selectionregion')) {
          return;
        }
        CKEDITOR.SELECTION_TOP_TO_BOTTOM = 0;
        CKEDITOR.SELECTION_BOTTOM_TO_TOP = 1;
        CKEDITOR.SELECTION_LEFT_TO_RIGHT = 2;
        CKEDITOR.SELECTION_RIGHT_TO_LEFT = 3;
        function SelectionRegion() {}
        SelectionRegion.prototype = {
          constructor: SelectionRegion,
          createSelectionFromPoint: function createSelectionFromPoint(x, y) {
            this.createSelectionFromRange(x, y, x, y);
          },
          createSelectionFromRange: function createSelectionFromRange(startX, startY, endX, endY) {
            var end;
            var endContainer;
            var endOffset;
            var range;
            var start;
            var startContainer;
            var startOffset;
            if (typeof document.caretPositionFromPoint === 'function') {
              start = document.caretPositionFromPoint(startX, startY);
              end = document.caretPositionFromPoint(endX, endY);
              startContainer = start.offsetNode;
              endContainer = end.offsetNode;
              startOffset = start.offset;
              endOffset = end.offset;
              range = this.createRange();
            } else if (typeof document.caretRangeFromPoint === 'function') {
              start = document.caretRangeFromPoint(startX, startY);
              end = document.caretRangeFromPoint(endX, endY);
              startContainer = start.startContainer;
              endContainer = end.startContainer;
              startOffset = start.startOffset;
              endOffset = end.startOffset;
              range = this.createRange();
            }
            if (range && document.getSelection) {
              range.setStart(new CKEDITOR.dom.node(startContainer), startOffset);
              range.setEnd(new CKEDITOR.dom.node(endContainer), endOffset);
              this.getSelection().selectRanges([range]);
            } else if (typeof document.body.createTextRange === 'function') {
              var selection = this.getSelection();
              selection.unlock();
              range = document.body.createTextRange();
              range.moveToPoint(startX, startY);
              var endRange = range.duplicate();
              endRange.moveToPoint(endX, endY);
              range.setEndPoint('EndToEnd', endRange);
              range.select();
              this.getSelection().lock();
            }
          },
          getCaretRegion: function getCaretRegion() {
            var selection = this.getSelection();
            var region = {
              bottom: 0,
              left: 0,
              right: 0,
              top: 0
            };
            var bookmarks = selection.createBookmarks();
            if (!bookmarks.length) {
              return region;
            }
            var bookmarkNodeEl = bookmarks[0].startNode.$;
            bookmarkNodeEl.style.display = 'inline-block';
            var region = new CKEDITOR.dom.element(bookmarkNodeEl).getClientRect();
            bookmarkNodeEl.parentNode.removeChild(bookmarkNodeEl);
            var scrollPos = new CKEDITOR.dom.window(window).getScrollPosition();
            region.bottom = scrollPos.y + region.bottom, region.left = scrollPos.x + region.left, region.right = scrollPos.x + region.right, region.top = scrollPos.y + region.top;
            return region;
          },
          getSelectionData: function getSelectionData() {
            var selection = this.getSelection();
            if (!selection.getNative()) {
              return null;
            }
            var result = {
              element: selection.getSelectedElement(),
              text: selection.getSelectedText()
            };
            result.region = this.getSelectionRegion(selection);
            return result;
          },
          getSelectionRegion: function getSelectionRegion() {
            var region = this.getClientRectsRegion();
            region.direction = this.getSelectionDirection();
            region.height = region.bottom - region.top;
            region.width = region.right - region.left;
            return region;
          },
          isSelectionEmpty: function isSelectionEmpty() {
            var ranges;
            var selection = this.getSelection();
            return selection.getType() === CKEDITOR.SELECTION_NONE || (ranges = selection.getRanges()) && ranges.length === 1 && ranges[0].collapsed;
          },
          getClientRectsRegion: function getClientRectsRegion() {
            var selection = this.getSelection();
            var nativeSelection = selection.getNative();
            var defaultRect = {
              bottom: 0,
              height: 0,
              left: 0,
              right: 0,
              top: 0,
              width: 0
            };
            var region = {
              bottom: 0,
              endRect: defaultRect,
              left: 0,
              right: 0,
              top: 0,
              startRect: defaultRect
            };
            if (!nativeSelection) {
              return region;
            }
            var bottom = 0;
            var clientRects;
            var left = Infinity;
            var rangeCount;
            var right = -Infinity;
            var top = Infinity;
            if (nativeSelection.createRange) {
              clientRects = nativeSelection.createRange().getClientRects();
            } else {
              rangeCount = nativeSelection.rangeCount;
              clientRects = nativeSelection.rangeCount > 0 ? nativeSelection.getRangeAt(0).getClientRects() : [];
            }
            if (clientRects.length === 0) {
              region = this.getCaretRegion();
            } else {
              for (var i = 0,
                  length = clientRects.length; i < length; i++) {
                var item = clientRects[i];
                if (item.left < left) {
                  left = item.left;
                }
                if (item.right > right) {
                  right = item.right;
                }
                if (item.top < top) {
                  top = item.top;
                }
                if (item.bottom > bottom) {
                  bottom = item.bottom;
                }
              }
              var scrollPos = new CKEDITOR.dom.window(window).getScrollPosition();
              region.bottom = scrollPos.y + bottom;
              region.left = scrollPos.x + left;
              region.right = scrollPos.x + right;
              region.top = scrollPos.y + top;
              if (clientRects.length) {
                var endRect = clientRects[clientRects.length - 1];
                var startRect = clientRects[0];
                region.endRect = {
                  bottom: scrollPos.y + endRect.bottom,
                  height: endRect.height,
                  left: scrollPos.x + endRect.left,
                  right: scrollPos.x + endRect.right,
                  top: scrollPos.y + endRect.top,
                  width: endRect.width
                };
                region.startRect = {
                  bottom: scrollPos.y + startRect.bottom,
                  height: startRect.height,
                  left: scrollPos.x + startRect.left,
                  right: scrollPos.x + startRect.right,
                  top: scrollPos.y + startRect.top,
                  width: startRect.width
                };
              }
            }
            return region;
          },
          getSelectionDirection: function getSelectionDirection() {
            var direction = CKEDITOR.SELECTION_TOP_TO_BOTTOM;
            var selection = this.getSelection();
            var nativeSelection = selection.getNative();
            if (!nativeSelection) {
              return direction;
            }
            var anchorNode;
            if ((anchorNode = nativeSelection.anchorNode) && anchorNode.compareDocumentPosition) {
              var position = anchorNode.compareDocumentPosition(nativeSelection.focusNode);
              if (!position && nativeSelection.anchorOffset > nativeSelection.focusOffset || position === Node.DOCUMENT_POSITION_PRECEDING) {
                direction = CKEDITOR.SELECTION_BOTTOM_TO_TOP;
              }
            }
            return direction;
          }
        };
        CKEDITOR.plugins.add('ae_selectionregion', {init: function init(editor) {
            var attr,
                hasOwnProperty;
            hasOwnProperty = Object.prototype.hasOwnProperty;
            for (attr in SelectionRegion.prototype) {
              if (hasOwnProperty.call(SelectionRegion.prototype, attr) && typeof editor[attr] === 'undefined') {
                editor[attr] = SelectionRegion.prototype[attr];
              }
            }
          }});
      })();
      'use strict';
      (function() {
        'use strict';
        var IE_NON_DIRECTLY_EDITABLE_ELEMENT = {
          'table': 1,
          'col': 1,
          'colgroup': 1,
          'tbody': 1,
          'td': 1,
          'tfoot': 1,
          'th': 1,
          'thead': 1,
          'tr': 1
        };
        function Table(editor) {
          this._editor = editor;
        }
        Table.HEADING_BOTH = 'Both';
        Table.HEADING_COL = 'Column';
        Table.HEADING_NONE = 'None';
        Table.HEADING_ROW = 'Row';
        Table.prototype = {
          constructor: Table,
          create: function create(config) {
            var editor = this._editor;
            var table = this._createElement('table');
            config = config || {};
            var tbody = table.append(this._createElement('tbody'));
            var rows = config.rows || 1;
            var cols = config.cols || 1;
            for (var i = 0; i < rows; i++) {
              var row = tbody.append(this._createElement('tr'));
              for (var j = 0; j < cols; j++) {
                var cell = row.append(this._createElement('td'));
                cell.appendBogus();
              }
            }
            this.setAttributes(table, config.attrs);
            this.setHeading(table, config.heading);
            editor.insertElement(table);
            var firstCell = new CKEDITOR.dom.element(table.$.rows[0].cells[0]);
            var range = editor.createRange();
            range.moveToPosition(firstCell, CKEDITOR.POSITION_AFTER_START);
            range.select();
            return table;
          },
          getFromSelection: function getFromSelection() {
            var table;
            var selection = this._editor.getSelection();
            var selected = selection.getSelectedElement();
            if (selected && selected.is('table')) {
              table = selected;
            } else {
              var ranges = selection.getRanges();
              if (ranges.length > 0) {
                if (CKEDITOR.env.webkit) {
                  ranges[0].shrink(CKEDITOR.NODE_ELEMENT);
                }
                table = this._editor.elementPath(ranges[0].getCommonAncestor(true)).contains('table', 1);
              }
            }
            return table;
          },
          isEditable: function isEditable(el) {
            if (!CKEDITOR.env.ie || !el.is(IE_NON_DIRECTLY_EDITABLE_ELEMENT)) {
              return !el.isReadOnly();
            }
            if (el.hasAttribute('contenteditable')) {
              return el.getAttribute('contenteditable') !== 'false';
            }
            return this.isEditable(el.getParent());
          },
          getHeading: function getHeading(table) {
            table = table || this.getFromSelection();
            if (!table) {
              return null;
            }
            var rowHeadingSettings = table.$.tHead !== null;
            var colHeadingSettings = true;
            for (var row = 0; row < table.$.rows.length; row++) {
              var cell = table.$.rows[row].cells[0];
              if (cell && cell.nodeName.toLowerCase() !== 'th') {
                colHeadingSettings = false;
                break;
              }
            }
            var headingSettings = Table.HEADING_NONE;
            if (rowHeadingSettings) {
              headingSettings = Table.HEADING_ROW;
            }
            if (colHeadingSettings) {
              headingSettings = headingSettings === Table.HEADING_ROW ? Table.HEADING_BOTH : Table.HEADING_COL;
            }
            return headingSettings;
          },
          remove: function remove(table) {
            var editor = this._editor;
            if (table) {
              table.remove();
            } else {
              table = editor.elementPath().contains('table', 1);
              if (table) {
                var parent = table.getParent();
                var editable = editor.editable();
                if (parent.getChildCount() === 1 && !parent.is('td', 'th') && !parent.equals(editable)) {
                  table = parent;
                }
                var range = editor.createRange();
                range.moveToPosition(table, CKEDITOR.POSITION_BEFORE_START);
                table.remove();
                range.select();
              }
            }
          },
          setAttributes: function setAttributes(table, attrs) {
            if (attrs) {
              Object.keys(attrs).forEach(function(attr) {
                table.setAttribute(attr, attrs[attr]);
              });
            }
          },
          setHeading: function setHeading(table, heading) {
            table = table || this.getFromSelection();
            var i,
                newCell;
            var tableHead;
            var tableBody = table.getElementsByTag('tbody').getItem(0);
            var tableHeading = this.getHeading(table);
            var hadColHeading = tableHeading === Table.HEADING_COL || tableHeading === Table.HEADING_BOTH;
            var needColHeading = heading === Table.HEADING_COL || heading === Table.HEADING_BOTH;
            var needRowHeading = heading === Table.HEADING_ROW || heading === Table.HEADING_BOTH;
            if (!table.$.tHead && needRowHeading) {
              var tableFirstRow = tableBody.getElementsByTag('tr').getItem(0);
              var tableFirstRowChildCount = tableFirstRow.getChildCount();
              for (i = 0; i < tableFirstRowChildCount; i++) {
                var cell = tableFirstRow.getChild(i);
                if (cell.type === CKEDITOR.NODE_ELEMENT && !cell.data('cke-bookmark')) {
                  cell.renameNode('th');
                  cell.setAttribute('scope', 'col');
                }
              }
              tableHead = this._createElement(table.$.createTHead());
              tableHead.append(tableFirstRow.remove());
            }
            if (table.$.tHead !== null && !needRowHeading) {
              tableHead = this._createElement(table.$.tHead);
              var previousFirstRow = tableBody.getFirst();
              while (tableHead.getChildCount() > 0) {
                var newFirstRow = tableHead.getFirst();
                var newFirstRowChildCount = newFirstRow.getChildCount();
                for (i = 0; i < newFirstRowChildCount; i++) {
                  newCell = newFirstRow.getChild(i);
                  if (newCell.type === CKEDITOR.NODE_ELEMENT) {
                    newCell.renameNode('td');
                    newCell.removeAttribute('scope');
                  }
                }
                newFirstRow.insertBefore(previousFirstRow);
              }
              tableHead.remove();
            }
            tableHeading = this.getHeading(table);
            var hasColHeading = tableHeading === Table.HEADING_COL || tableHeading === Table.HEADING_BOTH;
            if (!hasColHeading && needColHeading) {
              for (i = 0; i < table.$.rows.length; i++) {
                if (table.$.rows[i].cells[0].nodeName.toLowerCase() !== 'th') {
                  newCell = new CKEDITOR.dom.element(table.$.rows[i].cells[0]);
                  newCell.renameNode('th');
                  newCell.setAttribute('scope', 'row');
                }
              }
            }
            if (hadColHeading && !needColHeading) {
              for (i = 0; i < table.$.rows.length; i++) {
                var row = new CKEDITOR.dom.element(table.$.rows[i]);
                if (row.getParent().getName() === 'tbody') {
                  newCell = new CKEDITOR.dom.element(row.$.cells[0]);
                  newCell.renameNode('td');
                  newCell.removeAttribute('scope');
                }
              }
            }
          },
          _createElement: function _createElement(name) {
            return new CKEDITOR.dom.element(name, this._editor.document);
          }
        };
        CKEDITOR.on('instanceReady', function(event) {
          var headingCommands = [Table.HEADING_NONE, Table.HEADING_ROW, Table.HEADING_COL, Table.HEADING_BOTH];
          var tableUtils = new Table(event.editor);
          headingCommands.forEach(function(heading) {
            event.editor.addCommand('tableHeading' + heading, {exec: function exec(editor) {
                tableUtils.setHeading(null, heading);
              }});
          });
        });
        CKEDITOR.Table = CKEDITOR.Table || Table;
      })();
      'use strict';
      (function() {
        'use strict';
        CKEDITOR.tools.jsonp = function(urlTemplate, urlParams, callback, errorCallback) {
          var callbackKey = CKEDITOR.tools.getNextNumber();
          urlParams = urlParams || {};
          urlParams.callback = 'CKEDITOR._.jsonpCallbacks[' + callbackKey + ']';
          if (!CKEDITOR._.jsonpCallbacks) {
            CKEDITOR._.jsonpCallbacks = {};
          }
          CKEDITOR._.jsonpCallbacks[callbackKey] = function(response) {
            setTimeout(function() {
              cleanUp();
              callback(response);
            });
          };
          var scriptElement = new CKEDITOR.dom.element('script');
          scriptElement.setAttribute('src', urlTemplate.output(urlParams));
          scriptElement.on('error', function() {
            cleanUp();
            if (errorCallback) {
              errorCallback();
            }
          });
          function cleanUp() {
            if (scriptElement) {
              scriptElement.remove();
              delete CKEDITOR._.jsonpCallbacks[callbackKey];
              scriptElement = null;
            }
          }
          CKEDITOR.document.getBody().append(scriptElement);
          return {
            cancel: cleanUp,
            id: callbackKey
          };
        };
        CKEDITOR.tools.merge = CKEDITOR.tools.merge || function() {
          var result = {};
          for (var i = 0; i < arguments.length; ++i) {
            var obj = arguments[i];
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) {
                result[key] = obj[key];
              }
            }
          }
          return result;
        };
        CKEDITOR.tools.simulate = function(element, event) {
          var eventInstance = document.createEvent('Events');
          eventInstance.initEvent(event, true, false);
          element.dispatchEvent(eventInstance);
        };
      })();
      'use strict';
      (function() {
        'use strict';
        if (CKEDITOR.plugins.get('ae_uicore')) {
          return;
        }
        CKEDITOR.plugins.add('ae_uicore', {
          init: function init(editor) {
            var ariaState = [];
            var ariaElement = this._createAriaElement(editor.id);
            var uiTasksTimeout = editor.config.uicore ? editor.config.uicore.timeout : 50;
            var handleAria = CKEDITOR.tools.debounce(function(event) {
              ariaElement.innerHTML = ariaState.join('. ');
            }, uiTasksTimeout);
            var handleUI = CKEDITOR.tools.debounce(function(event) {
              ariaState = [];
              if (event.name !== 'keyup' || event.data.$.keyCode !== 27 || editor.config.allowEsc) {
                var selectionData = editor.getSelectionData();
                if (selectionData) {
                  editor.fire('editorInteraction', {
                    nativeEvent: event.data.$,
                    selectionData: selectionData
                  });
                }
              }
            }, uiTasksTimeout);
            var handleBlur = function handleBlur(event) {
              event.removeListener('blur', handleBlur);
              event.removeListener('keyup', handleUI);
              event.removeListener('mouseup', handleUI);
              handleUI(event);
            };
            editor.on('ariaUpdate', function(event) {
              ariaState.push(event.data.message);
              handleAria();
            });
            editor.once('contentDom', function() {
              var editable = editor.editable();
              editable.attachListener(editable, 'focus', function(event) {
                editable.attachListener(editable, 'blur', handleBlur);
                editable.attachListener(editable, 'keyup', handleUI);
                editable.attachListener(editable, 'mouseup', handleUI);
                handleUI(event);
              });
            });
            editor.on('destroy', function(event) {
              ariaElement.parentNode.removeChild(ariaElement);
              handleUI.detach();
            });
          },
          _createAriaElement: function _createAriaElement(id) {
            var statusElement = document.createElement('div');
            statusElement.className = 'ae-sr-only';
            statusElement.setAttribute('aria-live', 'polite');
            statusElement.setAttribute('role', 'status');
            statusElement.setAttribute('id', id + 'LiveRegion');
            document.body.appendChild(statusElement);
            return statusElement;
          }
        });
      })();
      'use strict';
      (function() {
        'use strict';
        var isIE = CKEDITOR.env.ie;
        if (CKEDITOR.plugins.get('ae_addimages')) {
          return;
        }
        CKEDITOR.plugins.add('ae_addimages', {
          init: function init(editor) {
            editor.once('contentDom', function() {
              var editable = editor.editable();
              editable.attachListener(editable, 'dragenter', this._onDragEnter, this, {editor: editor});
              editable.attachListener(editable, 'dragover', this._onDragOver, this, {editor: editor});
              editable.attachListener(editable, 'drop', this._onDragDrop, this, {editor: editor});
              editable.attachListener(editable, 'paste', this._onPaste, this, {editor: editor});
            }.bind(this));
          },
          _handleFiles: function _handleFiles(files, editor) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              if (file.type.indexOf('image') === 0) {
                this._processFile(file, editor);
              }
            }
            return false;
          },
          _onDragEnter: function _onDragEnter(event) {
            if (isIE) {
              this._preventEvent(event);
            }
          },
          _onDragOver: function _onDragOver(event) {
            if (isIE) {
              this._preventEvent(event);
            }
          },
          _onDragDrop: function _onDragDrop(event) {
            var nativeEvent = event.data.$;
            new CKEDITOR.dom.event(nativeEvent).preventDefault();
            var editor = event.listenerData.editor;
            event.listenerData.editor.createSelectionFromPoint(nativeEvent.clientX, nativeEvent.clientY);
            this._handleFiles(nativeEvent.dataTransfer.files, editor);
          },
          _onPaste: function _onPaste(event) {
            if (event.data.$.clipboardData) {
              var pastedData = event.data.$.clipboardData.items[0];
              if (pastedData.type.indexOf('image') === 0) {
                var imageFile = pastedData.getAsFile();
                this._processFile(imageFile, event.listenerData.editor);
              }
            }
          },
          _preventEvent: function _preventEvent(event) {
            event = new CKEDITOR.dom.event(event.data.$);
            event.preventDefault();
            event.stopPropagation();
          },
          _processFile: function _processFile(file, editor) {
            var reader = new FileReader();
            reader.addEventListener('loadend', function() {
              var bin = reader.result;
              var el = CKEDITOR.dom.element.createFromHtml('<img src="' + bin + '">');
              editor.insertElement(el);
              var imageData = {
                el: el,
                file: file
              };
              editor.fire('imageAdd', imageData);
            });
            reader.readAsDataURL(file);
          }
        });
      })();
      'use strict';
      (function() {
        'use strict';
        if (CKEDITOR.plugins.get('ae_autolink')) {
          return;
        }
        if (/MSIE ([^;]*)|Trident.*; rv:([0-9.]+)/.test(navigator.userAgent)) {
          document.execCommand('AutoUrlDetect', false, false);
        }
        var KEY_BACK = 8;
        var KEY_COMMA = 188;
        var KEY_ENTER = 13;
        var KEY_SEMICOLON = 186;
        var KEY_SPACE = 32;
        var DELIMITERS = [KEY_COMMA, KEY_ENTER, KEY_SEMICOLON, KEY_SPACE];
        var REGEX_LAST_WORD = /[^\s]+/mg;
        var REGEX_URL = /(https?\:\/\/|www\.)(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?$/i;
        CKEDITOR.plugins.add('ae_autolink', {
          init: function init(editor) {
            editor.once('contentDom', function() {
              var editable = editor.editable();
              editable.attachListener(editable, 'keyup', this._onKeyUp, this, {editor: editor});
            }.bind(this));
          },
          _getLastWord: function _getLastWord(editor) {
            var range = editor.getSelection().getRanges()[0];
            var offset = range.startOffset;
            var previousText = '';
            if (this._currentKeyCode === KEY_ENTER) {
              var previousNode = range.startContainer.getPrevious();
              var lastChild;
              if (previousNode) {
                while (!previousNode.getLast) {
                  previousNode = previousNode.getPrevious();
                }
                lastChild = previousNode.getLast();
                while (lastChild && !lastChild.getText()) {
                  lastChild = lastChild.getPrevious();
                }
              }
              if (!(lastChild && lastChild.$.href)) {
                this._startContainer = lastChild;
                previousText = lastChild ? lastChild.getText() : '';
                this._offset = previousText.length;
              }
            } else {
              this._startContainer = range.startContainer;
              previousText = this._startContainer.getText().substring(0, offset - 1);
              this._offset = offset - 1;
            }
            var lastWord = '';
            var match = previousText.match(REGEX_LAST_WORD);
            if (match) {
              lastWord = match.pop();
            }
            return lastWord;
          },
          _isValidURL: function _isValidURL(link) {
            return REGEX_URL.test(link);
          },
          _onKeyDown: function _onKeyDown(event) {
            var nativeEvent = event.data.$;
            var editor = event.listenerData.editor;
            var editable = editor.editable();
            editable.removeListener('keydown', this._onKeyDown);
            if (nativeEvent.keyCode === KEY_BACK) {
              event.cancel();
              event.data.preventDefault();
              this._removeLink(editor);
            }
            this._ckLink = null;
          },
          _onKeyUp: function _onKeyUp(event) {
            var nativeEvent = event.data.$;
            this._currentKeyCode = nativeEvent.keyCode;
            if (DELIMITERS.indexOf(this._currentKeyCode) !== -1) {
              var editor = event.listenerData.editor;
              var lastWord = this._getLastWord(editor);
              if (this._isValidURL(lastWord)) {
                this._replaceContentByLink(editor, lastWord);
              }
            }
          },
          _replaceContentByLink: function _replaceContentByLink(editor, content) {
            var range = editor.createRange();
            var node = CKEDITOR.dom.element.get(this._startContainer);
            var offset = this._offset;
            range.setStart(node, offset - content.length);
            range.setEnd(node, offset);
            range.select();
            var ckLink = new CKEDITOR.Link(editor);
            ckLink.create(content);
            this._ckLink = ckLink;
            var linkNode = ckLink.getFromSelection();
            editor.fire('autolinkAdd', linkNode);
            this._subscribeToKeyEvent(editor);
            range = editor.getSelection().getRanges()[0];
            if (this._currentKeyCode === KEY_ENTER) {
              var nextEditableNode = range.getNextEditableNode();
              range.setStart(nextEditableNode, 0);
              range.setEnd(nextEditableNode, 0);
            } else {
              var nextNode = range.getNextNode();
              range.setStart(nextNode, 1);
              range.setEnd(nextNode, 1);
            }
            range.select();
          },
          _removeLink: function _removeLink(editor) {
            var range = editor.getSelection().getRanges()[0];
            var caretOffset = range.startOffset;
            var linkNode = this._startContainer.getNext() || this._startContainer;
            var newRange = editor.createRange();
            newRange.setStart(linkNode, 0);
            newRange.setEndAfter(linkNode);
            newRange.select();
            this._ckLink.remove();
            range.setEnd(range.startContainer, caretOffset);
            range.setStart(range.startContainer, caretOffset);
            range.select();
          },
          _subscribeToKeyEvent: function _subscribeToKeyEvent(editor) {
            var editable = editor.editable();
            editable.attachListener(editable, 'keydown', this._onKeyDown, this, {editor: editor}, 1);
          }
        });
      })();
      'use strict';
      (function() {
        'use strict';
        if (CKEDITOR.plugins.get('ae_dragresize')) {
          return;
        }
        var IMAGE_SNAP_TO_SIZE = 7;
        var isWebkit = 'WebkitAppearance' in document.documentElement.style;
        if (isWebkit) {
          CKEDITOR.addCss('img::selection{color:rgba(0,0,0,0)}img.ckimgrsz{outline:1px dashed #000}#ckimgrsz{position:absolute;width:0;height:0;cursor:default;z-index:10001}#ckimgrsz span{display:none;position:absolute;top:0;left:0;width:0;height:0;background-size:100% 100%;opacity:.65;outline:1px dashed #000}#ckimgrsz i{position:absolute;display:block;width:5px;height:5px;background:#fff;border:1px solid #000}#ckimgrsz i.active,#ckimgrsz i:hover{background:#000}#ckimgrsz i.br,#ckimgrsz i.tl{cursor:nwse-resize}#ckimgrsz i.bm,#ckimgrsz i.tm{cursor:ns-resize}#ckimgrsz i.bl,#ckimgrsz i.tr{cursor:nesw-resize}#ckimgrsz i.lm,#ckimgrsz i.rm{cursor:ew-resize}body.dragging-br,body.dragging-br *,body.dragging-tl,body.dragging-tl *{cursor:nwse-resize!important}body.dragging-bm,body.dragging-bm *,body.dragging-tm,body.dragging-tm *{cursor:ns-resize!important}body.dragging-bl,body.dragging-bl *,body.dragging-tr,body.dragging-tr *{cursor:nesw-resize!important}body.dragging-lm,body.dragging-lm *,body.dragging-rm,body.dragging-rm *{cursor:ew-resize!important}');
        }
        CKEDITOR.plugins.add('ae_dragresize', {
          onLoad: function onLoad() {
            if (!isWebkit) {
              return;
            }
          },
          init: function init(editor) {
            if (!isWebkit) {
              return;
            }
            editor.once('contentDom', function(evt) {
              _init(editor);
            });
          }
        });
        function _init(editor) {
          var window = editor.window.$,
              document = editor.document.$;
          var snapToSize = typeof IMAGE_SNAP_TO_SIZE === 'undefined' ? null : IMAGE_SNAP_TO_SIZE;
          var resizer = new Resizer(editor, {snapToSize: snapToSize});
          document.addEventListener('mousedown', function(e) {
            if (resizer.isHandle(e.target)) {
              resizer.initDrag(e);
            }
          }, false);
          function selectionChange() {
            var selection = editor.getSelection();
            if (!selection)
              return;
            if (selection.getType() !== CKEDITOR.SELECTION_NONE && selection.getStartElement().is('img')) {
              if (!window.event || !window.event.button || window.event.button === 0) {
                resizer.show(selection.getStartElement().$);
              }
            } else {
              resizer.hide();
            }
          }
          editor.on('selectionChange', selectionChange);
          editor.on('getData', function(e) {
            var html = e.data.dataValue || '';
            html = html.replace(/<div id="ckimgrsz"([\s\S]*?)<\/div>/i, '');
            html = html.replace(/\b(ckimgrsz)\b/g, '');
            e.data.dataValue = html;
          });
          editor.on('beforeUndoImage', function() {
            resizer.hide();
          });
          editor.on('afterUndoImage', function() {
            selectionChange();
          });
          editor.on('blur', function() {
            resizer.hide();
          });
          editor.on('beforeModeUnload', function self() {
            editor.removeListener('beforeModeUnload', self);
            resizer.hide();
          });
          var resizeTimeout;
          editor.window.on('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(selectionChange, 50);
          });
        }
        function Resizer(editor, cfg) {
          this.editor = editor;
          this.window = editor.window.$;
          this.document = editor.document.$;
          this.cfg = cfg || {};
          this.init();
        }
        Resizer.prototype = {
          init: function init() {
            var container = this.container = this.document.createElement('div');
            container.id = 'ckimgrsz';
            this.preview = this.document.createElement('span');
            container.appendChild(this.preview);
            var handles = this.handles = {
              tl: this.createHandle('tl'),
              tm: this.createHandle('tm'),
              tr: this.createHandle('tr'),
              lm: this.createHandle('lm'),
              rm: this.createHandle('rm'),
              bl: this.createHandle('bl'),
              bm: this.createHandle('bm'),
              br: this.createHandle('br')
            };
            for (var n in handles) {
              container.appendChild(handles[n]);
            }
          },
          createHandle: function createHandle(name) {
            var el = this.document.createElement('i');
            el.classList.add(name);
            return el;
          },
          isHandle: function isHandle(el) {
            var handles = this.handles;
            for (var n in handles) {
              if (handles[n] === el)
                return true;
            }
            return false;
          },
          show: function show(el) {
            this.el = el;
            if (this.cfg.snapToSize) {
              this.otherImages = toArray(this.document.getElementsByTagName('img'));
              this.otherImages.splice(this.otherImages.indexOf(el), 1);
            }
            var box = this.box = getBoundingBox(this.window, el);
            positionElement(this.container, box.left, box.top);
            this.document.body.appendChild(this.container);
            this.el.classList.add('ckimgrsz');
            this.showHandles();
          },
          hide: function hide() {
            var elements = this.document.getElementsByClassName('ckimgrsz');
            for (var i = 0; i < elements.length; ++i) {
              elements[i].classList.remove('ckimgrsz');
            }
            this.hideHandles();
            if (this.container.parentNode) {
              this.container.parentNode.removeChild(this.container);
            }
          },
          initDrag: function initDrag(e) {
            if (e.button !== 0) {
              return;
            }
            var resizer = this;
            var drag = new DragEvent(this.window, this.document);
            drag.onStart = function() {
              resizer.showPreview();
              resizer.isDragging = true;
              resizer.editor.getSelection().lock();
            };
            drag.onDrag = function() {
              resizer.calculateSize(this);
              resizer.updatePreview();
              var box = resizer.previewBox;
              resizer.updateHandles(box, box.left, box.top);
            };
            drag.onRelease = function() {
              resizer.isDragging = false;
              resizer.hidePreview();
              resizer.hide();
              resizer.editor.getSelection().unlock();
              resizer.editor.fire('saveSnapshot');
            };
            drag.onComplete = function() {
              resizer.resizeComplete();
              resizer.editor.fire('saveSnapshot');
            };
            drag.start(e);
          },
          updateHandles: function updateHandles(box, left, top) {
            left = left || 0;
            top = top || 0;
            var handles = this.handles;
            positionElement(handles.tl, -3 + left, -3 + top);
            positionElement(handles.tm, Math.round(box.width / 2) - 3 + left, -3 + top);
            positionElement(handles.tr, box.width - 4 + left, -3 + top);
            positionElement(handles.lm, -3 + left, Math.round(box.height / 2) - 3 + top);
            positionElement(handles.rm, box.width - 4 + left, Math.round(box.height / 2) - 3 + top);
            positionElement(handles.bl, -3 + left, box.height - 4 + top);
            positionElement(handles.bm, Math.round(box.width / 2) - 3 + left, box.height - 4 + top);
            positionElement(handles.br, box.width - 4 + left, box.height - 4 + top);
          },
          showHandles: function showHandles() {
            var handles = this.handles;
            this.updateHandles(this.box);
            for (var n in handles) {
              handles[n].style.display = 'block';
            }
          },
          hideHandles: function hideHandles() {
            var handles = this.handles;
            for (var n in handles) {
              handles[n].style.display = 'none';
            }
          },
          showPreview: function showPreview() {
            this.preview.style.backgroundImage = 'url("' + this.el.src + '")';
            this.calculateSize();
            this.updatePreview();
            this.preview.style.display = 'block';
          },
          updatePreview: function updatePreview() {
            var box = this.previewBox;
            positionElement(this.preview, box.left, box.top);
            resizeElement(this.preview, box.width, box.height);
          },
          hidePreview: function hidePreview() {
            var box = getBoundingBox(this.window, this.preview);
            this.result = {
              width: box.width,
              height: box.height
            };
            this.preview.style.display = 'none';
          },
          calculateSize: function calculateSize(data) {
            var box = this.previewBox = {
              top: 0,
              left: 0,
              width: this.box.width,
              height: this.box.height
            };
            if (!data)
              return;
            var attr = data.target.className;
            if (~attr.indexOf('r')) {
              box.width = Math.max(32, this.box.width + data.delta.x);
            }
            if (~attr.indexOf('b')) {
              box.height = Math.max(32, this.box.height + data.delta.y);
            }
            if (~attr.indexOf('l')) {
              box.width = Math.max(32, this.box.width - data.delta.x);
            }
            if (~attr.indexOf('t')) {
              box.height = Math.max(32, this.box.height - data.delta.y);
            }
            if (attr.indexOf('m') < 0 && !data.keys.shift) {
              var ratio = this.box.width / this.box.height;
              if (box.width / box.height > ratio) {
                box.height = Math.round(box.width / ratio);
              } else {
                box.width = Math.round(box.height * ratio);
              }
            }
            var snapToSize = this.cfg.snapToSize;
            if (snapToSize) {
              var others = this.otherImages;
              for (var i = 0; i < others.length; i++) {
                var other = getBoundingBox(this.window, others[i]);
                if (Math.abs(box.width - other.width) <= snapToSize && Math.abs(box.height - other.height) <= snapToSize) {
                  box.width = other.width;
                  box.height = other.height;
                  break;
                }
              }
            }
            if (~attr.indexOf('l')) {
              box.left = this.box.width - box.width;
            }
            if (~attr.indexOf('t')) {
              box.top = this.box.height - box.height;
            }
          },
          resizeComplete: function resizeComplete() {
            resizeElement(this.el, this.result.width, this.result.height);
          }
        };
        function DragEvent(window, document) {
          this.window = window;
          this.document = document;
          this.events = {
            mousemove: bind(this.mousemove, this),
            keydown: bind(this.keydown, this),
            mouseup: bind(this.mouseup, this)
          };
        }
        DragEvent.prototype = {
          start: function start(e) {
            e.preventDefault();
            e.stopPropagation();
            this.target = e.target;
            this.attr = e.target.className;
            this.startPos = {
              x: e.clientX,
              y: e.clientY
            };
            this.update(e);
            var events = this.events;
            this.document.addEventListener('mousemove', events.mousemove, false);
            this.document.addEventListener('keydown', events.keydown, false);
            this.document.addEventListener('mouseup', events.mouseup, false);
            this.document.body.classList.add('dragging-' + this.attr);
            this.onStart && this.onStart();
          },
          update: function update(e) {
            this.currentPos = {
              x: e.clientX,
              y: e.clientY
            };
            this.delta = {
              x: e.clientX - this.startPos.x,
              y: e.clientY - this.startPos.y
            };
            this.keys = {
              shift: e.shiftKey,
              ctrl: e.ctrlKey,
              alt: e.altKey
            };
          },
          mousemove: function mousemove(e) {
            this.update(e);
            this.onDrag && this.onDrag();
            if (e.which === 0) {
              this.mouseup(e);
            }
          },
          keydown: function keydown(e) {
            if (e.keyCode === 27) {
              this.release();
            }
          },
          mouseup: function mouseup(e) {
            this.update(e);
            this.release();
            this.onComplete && this.onComplete();
          },
          release: function release() {
            this.document.body.classList.remove('dragging-' + this.attr);
            var events = this.events;
            this.document.removeEventListener('mousemove', events.mousemove, false);
            this.document.removeEventListener('keydown', events.keydown, false);
            this.document.removeEventListener('mouseup', events.mouseup, false);
            this.onRelease && this.onRelease();
          }
        };
        function toArray(obj) {
          var len = obj.length,
              arr = new Array(len);
          for (var i = 0; i < len; i++) {
            arr[i] = obj[i];
          }
          return arr;
        }
        function bind(fn, ctx) {
          if (fn.bind) {
            return fn.bind(ctx);
          }
          return function() {
            fn.apply(ctx, arguments);
          };
        }
        function positionElement(el, left, top) {
          el.style.left = String(left) + 'px';
          el.style.top = String(top) + 'px';
        }
        function resizeElement(el, width, height) {
          el.style.width = String(width) + 'px';
          el.style.height = String(height) + 'px';
        }
        function getBoundingBox(window, el) {
          var rect = el.getBoundingClientRect();
          return {
            left: rect.left + window.pageXOffset,
            top: rect.top + window.pageYOffset,
            width: rect.width,
            height: rect.height
          };
        }
      })();
      'use strict';
      (function() {
        'use strict';
        if (CKEDITOR.plugins.get('ae_embed')) {
          return;
        }
        CKEDITOR.DEFAULT_AE_EMBED_URL_TPL = '//alloy.iframe.ly/api/oembed?url={url}&callback={callback}';
        CKEDITOR.DEFAULT_AE_EMBED_WIDGET_TPL = '<div data-ae-embed-url="{url}"></div>';
        CKEDITOR.plugins.add('ae_embed', {
          requires: 'widget',
          init: function init(editor) {
            var AE_EMBED_URL_TPL = new CKEDITOR.template(editor.config.embedUrlTemplate || CKEDITOR.DEFAULT_AE_EMBED_URL_TPL);
            var AE_EMBED_WIDGET_TPL = new CKEDITOR.template(editor.config.embedWidgetTpl || CKEDITOR.DEFAULT_AE_EMBED_WIDGET_TPL);
            var defaultEmbedWidgetUpcastFn = function defaultEmbedWidgetUpcastFn(element, data) {
              if (element.name === 'div' && element.attributes['data-ae-embed-url']) {
                data.url = element.attributes['data-ae-embed-url'];
                return true;
              }
            };
            editor.addCommand('embedUrl', {exec: function exec(editor, data) {
                editor.insertHtml(AE_EMBED_WIDGET_TPL.output({url: data.url}));
              }});
            editor.widgets.add('ae_embed', {
              allowedContent: 'div[!data-ae-embed-url]',
              mask: true,
              requiredContent: 'div[data-ae-embed-url]',
              data: function data(event) {
                var widget = this;
                var url = event.data.url;
                if (url) {
                  CKEDITOR.tools.jsonp(AE_EMBED_URL_TPL, {url: encodeURIComponent(url)}, function(response) {
                    if (response.html) {
                      widget.element.setHtml(response.html);
                    } else {
                      widget.element.setHtml(url);
                    }
                  }, function(msg) {
                    widget.element.setHtml(url);
                  });
                }
              },
              upcast: function upcast(element, data) {
                var embedWidgetUpcastFn = editor.config.embedWidgetUpcastFn || defaultEmbedWidgetUpcastFn;
                return embedWidgetUpcastFn(element, data);
              },
              setSelected: function setSelected(selected) {
                if (selected) {
                  editor.getSelection().selectElement(this.element);
                }
              }
            });
            editor.once('contentDom', function() {
              editor.on('paste', function(event) {
                var link = event.data.dataValue;
                if (/^https?/.test(link)) {
                  event.stop();
                  editor.execCommand('embedUrl', {url: event.data.dataValue});
                }
              });
            });
            editor.filter.addElementCallback(function(element) {
              if ('data-ae-embed-url' in element.attributes) {
                return CKEDITOR.FILTER_SKIP_TREE;
              }
            });
          }
        });
      })();
      'use strict';
      (function() {
        'use strict';
        if (CKEDITOR.plugins.get('ae_imagealignment')) {
          return;
        }
        var IMAGE_ALIGNMENT = {
          CENTER: 'center',
          LEFT: 'left',
          RIGHT: 'right'
        };
        var ALIGN_VALUES = [IMAGE_ALIGNMENT.LEFT, IMAGE_ALIGNMENT.RIGHT, IMAGE_ALIGNMENT.CENTER];
        var CENTERED_IMAGE_STYLE = [{
          name: 'display',
          value: 'block'
        }, {
          name: 'margin-left',
          value: '50%'
        }, {
          name: 'transform',
          value: 'translateX(-50%)',
          vendorPrefixes: ['-ms-']
        }];
        var getImageAlignment = function getImageAlignment(image) {
          var imageAlignment = image.getStyle('float');
          if (!imageAlignment || imageAlignment === 'inherit' || imageAlignment === 'none') {
            imageAlignment = image.getAttribute('align');
          }
          if (!imageAlignment) {
            var centeredImage = CENTERED_IMAGE_STYLE.every(function(style) {
              var styleCheck = image.getStyle(style.name) === style.value;
              if (!styleCheck && style.vendorPrefixes) {
                styleCheck = style.vendorPrefixes.some(function(vendorPrefix) {
                  return image.getStyle(vendorPrefix + style.name) === style.value;
                });
              }
              return styleCheck;
            });
            imageAlignment = centeredImage ? IMAGE_ALIGNMENT.CENTER : null;
          }
          return imageAlignment;
        };
        var removeImageAlignment = function removeImageAlignment(image, imageAlignment) {
          if (imageAlignment === IMAGE_ALIGNMENT.LEFT || imageAlignment === IMAGE_ALIGNMENT.RIGHT) {
            image.removeStyle('float');
            if (imageAlignment === getImageAlignment(image)) {
              image.removeAttribute('align');
            }
          } else if (imageAlignment === IMAGE_ALIGNMENT.CENTER) {
            CENTERED_IMAGE_STYLE.forEach(function(style) {
              image.removeStyle(style.name);
              if (style.vendorPrefixes) {
                style.vendorPrefixes.forEach(function(vendorPrefix) {
                  image.removeStyle(vendorPrefix + style.name);
                });
              }
            });
          }
        };
        var setImageAlignment = function setImageAlignment(image, imageAlignment) {
          removeImageAlignment(image, getImageAlignment(image));
          if (imageAlignment === IMAGE_ALIGNMENT.LEFT || imageAlignment === IMAGE_ALIGNMENT.RIGHT) {
            image.setStyle('float', imageAlignment);
          } else if (imageAlignment === IMAGE_ALIGNMENT.CENTER) {
            CENTERED_IMAGE_STYLE.forEach(function(style) {
              image.setStyle(style.name, style.value);
              if (style.vendorPrefixes) {
                style.vendorPrefixes.forEach(function(vendorPrefix) {
                  image.setStyle(vendorPrefix + style.name, style.value);
                });
              }
            });
          }
        };
        CKEDITOR.plugins.add('ae_imagealignment', {
          afterInit: function afterInit(editor) {
            var self = this;
            ALIGN_VALUES.forEach(function(value) {
              var command = editor.getCommand('justify' + value);
              if (command) {
                command.on('exec', function(event) {
                  var selectionData = editor.getSelectionData();
                  if (selectionData && AlloyEditor.SelectionTest.image({data: {selectionData: selectionData}})) {
                    var image = selectionData.element;
                    var imageAlignment = getImageAlignment(image);
                    if (imageAlignment === value) {
                      removeImageAlignment(image, value);
                    } else {
                      setImageAlignment(image, value);
                    }
                    event.cancel();
                    self.refreshCommands(editor, new CKEDITOR.dom.elementPath(image));
                  }
                });
                command.on('refresh', function(event) {
                  var selectionData = editor.getSelectionData();
                  if (selectionData && AlloyEditor.SelectionTest.image({data: {selectionData: selectionData}})) {
                    var imageAlignment = getImageAlignment(selectionData.element);
                    this.setState(imageAlignment === value ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF);
                    event.cancel();
                  }
                });
              }
            });
          },
          refreshCommands: function refreshCommands(editor, elementPath) {
            ALIGN_VALUES.forEach(function(value) {
              var command = editor.getCommand('justify' + value);
              if (command) {
                command.refresh(editor, elementPath);
              }
            });
          }
        });
      })();
      'use strict';
      (function() {
        'use strict';
        if (CKEDITOR.plugins.get('ae_pasteimages')) {
          return;
        }
        CKEDITOR.plugins.add('ae_pasteimages', {
          init: function init(editor) {
            editor.once('contentDom', function() {
              var editable = editor.editable();
              editable.attachListener(editable, 'paste', this._onPaste, this, {editor: editor});
            }.bind(this));
          },
          _onPaste: function _onPaste(event) {
            if (event.data.$.clipboardData) {
              var pastedData = event.data.$.clipboardData.items[0];
              var editor = event.listenerData.editor;
              if (pastedData.type.indexOf('image') === 0) {
                var reader = new FileReader();
                var imageFile = pastedData.getAsFile();
                reader.onload = function(event) {
                  var el = CKEDITOR.dom.element.createFromHtml('<img src="' + event.target.result + '">');
                  editor.insertElement(el);
                  var imageData = {
                    el: el,
                    file: imageFile
                  };
                  editor.fire('imageAdd', imageData);
                }.bind(this);
                reader.readAsDataURL(imageFile);
              }
            }
          }
        });
      })();
      'use strict';
      (function() {
        'use strict';
        if (CKEDITOR.plugins.get('ae_placeholder')) {
          return;
        }
        CKEDITOR.plugins.add('ae_placeholder', {
          init: function init(editor) {
            editor.on('blur', this._checkEmptyData, this);
            editor.once('contentDom', this._checkEmptyData, this);
          },
          _checkEmptyData: function _checkEmptyData(event) {
            var editor = event.editor;
            if (editor.getData() === '') {
              var editorNode = new CKEDITOR.dom.element(editor.element.$);
              editorNode.setHtml('');
              editorNode.addClass(editor.config.placeholderClass);
            }
          }
        });
      })();
      'use strict';
      (function() {
        'use strict';
        if (CKEDITOR.plugins.get('ae_selectionkeystrokes')) {
          return;
        }
        CKEDITOR.plugins.add('ae_selectionkeystrokes', {
          requires: 'ae_selectionregion',
          init: function init(editor) {
            if (editor.config.selectionKeystrokes) {
              editor.config.selectionKeystrokes.forEach(function(selectionKeystroke) {
                var command = new CKEDITOR.command(editor, {exec: function exec(editor) {
                    editor.fire('editorInteraction', {
                      manualSelection: selectionKeystroke.selection,
                      nativeEvent: {},
                      selectionData: editor.getSelectionData()
                    });
                  }});
                var commandName = 'selectionKeystroke' + selectionKeystroke.selection;
                editor.addCommand(commandName, command);
                editor.setKeystroke(selectionKeystroke.keys, commandName);
              });
            }
          }
        });
      })();
      'use strict';
      (function() {
        'use strict';
        if (CKEDITOR.plugins.get('ae_tableresize')) {
          return;
        }
        var pxUnit = CKEDITOR.tools.cssLength;
        function getWidth(el) {
          return CKEDITOR.env.ie ? el.$.clientWidth : parseInt(el.getComputedStyle('width'), 10);
        }
        function getBorderWidth(element, side) {
          var computed = element.getComputedStyle('border-' + side + '-width'),
              borderMap = {
                thin: '0px',
                medium: '1px',
                thick: '2px'
              };
          if (computed.indexOf('px') < 0) {
            if (computed in borderMap && element.getComputedStyle('border-style') != 'none') {
              computed = borderMap[computed];
            } else {
              computed = 0;
            }
          }
          return parseInt(computed, 10);
        }
        function getMasterPillarRow(table) {
          var $rows = table.$.rows,
              maxCells = 0,
              cellsCount,
              $elected,
              $tr;
          for (var i = 0,
              len = $rows.length; i < len; i++) {
            $tr = $rows[i];
            cellsCount = $tr.cells.length;
            if (cellsCount > maxCells) {
              maxCells = cellsCount;
              $elected = $tr;
            }
          }
          return $elected;
        }
        function buildTableColumnPillars(table) {
          var pillars = [],
              pillarIndex = -1,
              rtl = table.getComputedStyle('direction') === 'rtl';
          var $tr = getMasterPillarRow(table);
          var tbody = new CKEDITOR.dom.element(table.$.tBodies[0]),
              tbodyPosition = tbody.getDocumentPosition();
          for (var i = 0,
              len = $tr.cells.length; i < len; i++) {
            var td = new CKEDITOR.dom.element($tr.cells[i]),
                nextTd = $tr.cells[i + 1] && new CKEDITOR.dom.element($tr.cells[i + 1]);
            pillarIndex += td.$.colSpan || 1;
            var pillarLeft,
                pillarRight,
                pillarWidth;
            var x = td.getDocumentPosition().x;
            rtl ? pillarRight = x + getBorderWidth(td, 'left') : pillarLeft = x + td.$.offsetWidth - getBorderWidth(td, 'right');
            if (nextTd) {
              x = nextTd.getDocumentPosition().x;
              rtl ? pillarLeft = x + nextTd.$.offsetWidth - getBorderWidth(nextTd, 'right') : pillarRight = x + getBorderWidth(nextTd, 'left');
            } else {
              x = table.getDocumentPosition().x;
              rtl ? pillarLeft = x : pillarRight = x + table.$.offsetWidth;
            }
            pillarWidth = Math.max(pillarRight - pillarLeft, 4);
            pillars.push({
              table: table,
              index: pillarIndex,
              x: pillarLeft,
              y: tbodyPosition.y,
              width: pillarWidth,
              height: tbody.$.offsetHeight,
              rtl: rtl
            });
          }
          return pillars;
        }
        function getPillarAtPosition(pillars, positionX) {
          for (var i = 0,
              len = pillars.length; i < len; i++) {
            var pillar = pillars[i];
            if (positionX >= pillar.x && positionX <= pillar.x + pillar.width) {
              return pillar;
            }
          }
          return null;
        }
        function cancel(evt) {
          (evt.data || evt).preventDefault();
        }
        function columnResizer(editor) {
          var pillar,
              document,
              resizer,
              isResizing,
              startOffset,
              currentShift;
          var leftSideCells,
              rightSideCells,
              leftShiftBoundary,
              rightShiftBoundary;
          function detach() {
            pillar = null;
            currentShift = 0;
            isResizing = 0;
            document.removeListener('mouseup', onMouseUp);
            resizer.removeListener('mousedown', onMouseDown);
            resizer.removeListener('mousemove', onMouseMove);
            document.getBody().setStyle('cursor', 'auto');
          }
          function resizeStart() {
            var columnIndex = pillar.index,
                map = CKEDITOR.tools.buildTableMap(pillar.table),
                leftColumnCells = [],
                rightColumnCells = [],
                leftMinSize = Number.MAX_VALUE,
                rightMinSize = leftMinSize,
                rtl = pillar.rtl;
            for (var i = 0,
                len = map.length; i < len; i++) {
              var row = map[i],
                  leftCell = row[columnIndex + (rtl ? 1 : 0)],
                  rightCell = row[columnIndex + (rtl ? 0 : 1)];
              leftCell = leftCell && new CKEDITOR.dom.element(leftCell);
              rightCell = rightCell && new CKEDITOR.dom.element(rightCell);
              if (!leftCell || !rightCell || !leftCell.equals(rightCell)) {
                leftCell && (leftMinSize = Math.min(leftMinSize, getWidth(leftCell)));
                rightCell && (rightMinSize = Math.min(rightMinSize, getWidth(rightCell)));
                leftColumnCells.push(leftCell);
                rightColumnCells.push(rightCell);
              }
            }
            leftSideCells = leftColumnCells;
            rightSideCells = rightColumnCells;
            leftShiftBoundary = pillar.x - leftMinSize;
            rightShiftBoundary = pillar.x + rightMinSize;
            resizer.setOpacity(0.5);
            startOffset = parseInt(resizer.getStyle('left'), 10);
            currentShift = 0;
            isResizing = 1;
            resizer.on('mousemove', onMouseMove);
            document.on('dragstart', cancel);
          }
          function resizeEnd() {
            isResizing = 0;
            resizer.setOpacity(0);
            currentShift && resizeColumn();
            var table = pillar.table;
            setTimeout(function() {
              table.removeCustomData('_cke_table_pillars');
            }, 0);
            document.removeListener('dragstart', cancel);
          }
          function resizeColumn() {
            var rtl = pillar.rtl,
                cellsCount = rtl ? rightSideCells.length : leftSideCells.length;
            for (var i = 0; i < cellsCount; i++) {
              var leftCell = leftSideCells[i],
                  rightCell = rightSideCells[i],
                  table = pillar.table;
              CKEDITOR.tools.setTimeout(function(leftCell, leftOldWidth, rightCell, rightOldWidth, tableWidth, sizeShift) {
                leftCell && leftCell.setStyle('width', pxUnit(Math.max(leftOldWidth + sizeShift, 1)));
                rightCell && rightCell.setStyle('width', pxUnit(Math.max(rightOldWidth - sizeShift, 1)));
                if (tableWidth) {
                  table.setStyle('width', pxUnit(tableWidth + sizeShift * (rtl ? -1 : 1)));
                }
              }, 0, this, [leftCell, leftCell && getWidth(leftCell), rightCell, rightCell && getWidth(rightCell), (!leftCell || !rightCell) && getWidth(table) + getBorderWidth(table, 'left') + getBorderWidth(table, 'right'), currentShift]);
            }
          }
          function onMouseDown(evt) {
            cancel(evt);
            resizeStart();
            document.on('mouseup', onMouseUp, this);
          }
          function onMouseUp(evt) {
            evt.removeListener();
            resizeEnd();
          }
          function onMouseMove(evt) {
            move(evt.data.getPageOffset().x);
          }
          document = editor.document;
          resizer = CKEDITOR.dom.element.createFromHtml('<div data-cke-temp=1 contenteditable=false unselectable=on ' + 'style="position:absolute;cursor:col-resize;filter:alpha(opacity=0);opacity:0;' + 'padding:0;background-color:#004;background-image:none;border:0px none;z-index:10"></div>', document);
          editor.on('destroy', function() {
            resizer.remove();
          });
          document.getDocumentElement().append(resizer);
          this.attachTo = function(targetPillar) {
            if (isResizing) {
              return;
            }
            pillar = targetPillar;
            resizer.setStyles({
              width: pxUnit(targetPillar.width),
              height: pxUnit(targetPillar.height),
              left: pxUnit(targetPillar.x),
              top: pxUnit(targetPillar.y)
            });
            resizer.on('mousedown', onMouseDown, this);
            document.getBody().setStyle('cursor', 'col-resize');
            resizer.show();
          };
          var move = this.move = function(posX) {
            if (!pillar) {
              return 0;
            }
            if (!isResizing && (posX < pillar.x || posX > pillar.x + pillar.width)) {
              detach();
              return 0;
            }
            var resizerNewPosition = posX - Math.round(resizer.$.offsetWidth / 2);
            if (isResizing) {
              if (resizerNewPosition === leftShiftBoundary || resizerNewPosition === rightShiftBoundary) {
                return 1;
              }
              resizerNewPosition = Math.max(resizerNewPosition, leftShiftBoundary);
              resizerNewPosition = Math.min(resizerNewPosition, rightShiftBoundary);
              currentShift = resizerNewPosition - startOffset;
            }
            resizer.setStyle('left', pxUnit(resizerNewPosition));
            return 1;
          };
        }
        function clearPillarsCache(evt) {
          var target = evt.data.getTarget();
          if (evt.name === 'mouseout') {
            if (!target.is('table')) {
              return;
            }
            var dest = new CKEDITOR.dom.element(evt.data.$.relatedTarget || evt.data.$.toElement);
            while (dest && dest.$ && !dest.equals(target) && !dest.is('body')) {
              dest = dest.getParent();
            }
            if (!dest || dest.equals(target)) {
              return;
            }
          }
          target.getAscendant('table', 1).removeCustomData('_cke_table_pillars');
          evt.removeListener();
        }
        CKEDITOR.plugins.add('ae_tableresize', {
          requires: 'ae_tabletools',
          init: function init(editor) {
            editor.on('contentDom', function() {
              var resizer,
                  editable = editor.editable();
              editable.attachListener(editable.isInline() ? editable : editor.document, 'mousemove', function(evt) {
                evt = evt.data;
                var target = evt.getTarget();
                if (target.type !== CKEDITOR.NODE_ELEMENT) {
                  return;
                }
                var pageX = evt.getPageOffset().x;
                if (resizer && resizer.move(pageX)) {
                  cancel(evt);
                  return;
                }
                var table,
                    pillars;
                if (!target.is('table') && !target.getAscendant('tbody', 1)) {
                  return;
                }
                table = target.getAscendant('table', 1);
                if (!editor.editable().contains(table)) {
                  return;
                }
                if (!(pillars = table.getCustomData('_cke_table_pillars'))) {
                  table.setCustomData('_cke_table_pillars', pillars = buildTableColumnPillars(table));
                  table.on('mouseout', clearPillarsCache);
                  table.on('mousedown', clearPillarsCache);
                }
                var pillar = getPillarAtPosition(pillars, pageX);
                if (pillar) {
                  !resizer && (resizer = new columnResizer(editor));
                  resizer.attachTo(pillar);
                }
              });
            });
          }
        });
      })();
      'use strict';
      (function() {
        'use strict';
        if (CKEDITOR.plugins.get('ae_tabletools')) {
          return;
        }
        var cellNodeRegex = /^(?:td|th)$/;
        function getSelectedCells(selection) {
          var ranges = selection.getRanges();
          var retval = [];
          var database = {};
          function moveOutOfCellGuard(node) {
            if (retval.length > 0)
              return;
            if (node.type == CKEDITOR.NODE_ELEMENT && cellNodeRegex.test(node.getName()) && !node.getCustomData('selected_cell')) {
              CKEDITOR.dom.element.setMarker(database, node, 'selected_cell', true);
              retval.push(node);
            }
          }
          for (var i = 0; i < ranges.length; i++) {
            var range = ranges[i];
            if (range.collapsed) {
              var startNode = range.getCommonAncestor();
              var nearestCell = startNode.getAscendant('td', true) || startNode.getAscendant('th', true);
              if (nearestCell)
                retval.push(nearestCell);
            } else {
              var walker = new CKEDITOR.dom.walker(range);
              var node;
              walker.guard = moveOutOfCellGuard;
              while (node = walker.next()) {
                if (node.type != CKEDITOR.NODE_ELEMENT || !node.is(CKEDITOR.dtd.table)) {
                  var parent = node.getAscendant('td', true) || node.getAscendant('th', true);
                  if (parent && !parent.getCustomData('selected_cell')) {
                    CKEDITOR.dom.element.setMarker(database, parent, 'selected_cell', true);
                    retval.push(parent);
                  }
                }
              }
            }
          }
          CKEDITOR.dom.element.clearAllMarkers(database);
          return retval;
        }
        function getFocusElementAfterDelCells(cellsToDelete) {
          var i = 0,
              last = cellsToDelete.length - 1,
              database = {},
              cell,
              focusedCell,
              tr;
          while (cell = cellsToDelete[i++]) {
            CKEDITOR.dom.element.setMarker(database, cell, 'delete_cell', true);
          }
          i = 0;
          while (cell = cellsToDelete[i++]) {
            if ((focusedCell = cell.getPrevious()) && !focusedCell.getCustomData('delete_cell') || (focusedCell = cell.getNext()) && !focusedCell.getCustomData('delete_cell')) {
              CKEDITOR.dom.element.clearAllMarkers(database);
              return focusedCell;
            }
          }
          CKEDITOR.dom.element.clearAllMarkers(database);
          tr = cellsToDelete[0].getParent();
          if (tr = tr.getPrevious())
            return tr.getLast();
          tr = cellsToDelete[last].getParent();
          if (tr = tr.getNext())
            return tr.getChild(0);
          return null;
        }
        function insertRow(selection, insertBefore) {
          var cells = getSelectedCells(selection),
              firstCell = cells[0],
              table = firstCell.getAscendant('table'),
              doc = firstCell.getDocument(),
              startRow = cells[0].getParent(),
              startRowIndex = startRow.$.rowIndex,
              lastCell = cells[cells.length - 1],
              endRowIndex = lastCell.getParent().$.rowIndex + lastCell.$.rowSpan - 1,
              endRow = new CKEDITOR.dom.element(table.$.rows[endRowIndex]),
              rowIndex = insertBefore ? startRowIndex : endRowIndex,
              row = insertBefore ? startRow : endRow;
          var map = CKEDITOR.tools.buildTableMap(table),
              cloneRow = map[rowIndex],
              nextRow = insertBefore ? map[rowIndex - 1] : map[rowIndex + 1],
              width = map[0].length;
          var newRow = doc.createElement('tr');
          for (var i = 0; cloneRow[i] && i < width; i++) {
            var cell;
            if (cloneRow[i].rowSpan > 1 && nextRow && cloneRow[i] == nextRow[i]) {
              cell = cloneRow[i];
              cell.rowSpan += 1;
            } else {
              cell = new CKEDITOR.dom.element(cloneRow[i]).clone();
              cell.removeAttribute('rowSpan');
              cell.appendBogus();
              newRow.append(cell);
              cell = cell.$;
            }
            i += cell.colSpan - 1;
          }
          insertBefore ? newRow.insertBefore(row) : newRow.insertAfter(row);
        }
        function deleteRows(selectionOrRow) {
          if (selectionOrRow instanceof CKEDITOR.dom.selection) {
            var cells = getSelectedCells(selectionOrRow),
                firstCell = cells[0],
                table = firstCell.getAscendant('table'),
                map = CKEDITOR.tools.buildTableMap(table),
                startRow = cells[0].getParent(),
                startRowIndex = startRow.$.rowIndex,
                lastCell = cells[cells.length - 1],
                endRowIndex = lastCell.getParent().$.rowIndex + lastCell.$.rowSpan - 1,
                rowsToDelete = [];
            for (var i = startRowIndex; i <= endRowIndex; i++) {
              var mapRow = map[i],
                  row = new CKEDITOR.dom.element(table.$.rows[i]);
              for (var j = 0; j < mapRow.length; j++) {
                var cell = new CKEDITOR.dom.element(mapRow[j]),
                    cellRowIndex = cell.getParent().$.rowIndex;
                if (cell.$.rowSpan == 1)
                  cell.remove();
                else {
                  cell.$.rowSpan -= 1;
                  if (cellRowIndex == i) {
                    var nextMapRow = map[i + 1];
                    nextMapRow[j - 1] ? cell.insertAfter(new CKEDITOR.dom.element(nextMapRow[j - 1])) : new CKEDITOR.dom.element(table.$.rows[i + 1]).append(cell, 1);
                  }
                }
                j += cell.$.colSpan - 1;
              }
              rowsToDelete.push(row);
            }
            var rows = table.$.rows;
            var cursorPosition = new CKEDITOR.dom.element(rows[endRowIndex + 1] || (startRowIndex > 0 ? rows[startRowIndex - 1] : null) || table.$.parentNode);
            for (i = rowsToDelete.length; i >= 0; i--) {
              deleteRows(rowsToDelete[i]);
            }
            return cursorPosition;
          } else if (selectionOrRow instanceof CKEDITOR.dom.element) {
            table = selectionOrRow.getAscendant('table');
            if (table.$.rows.length == 1)
              table.remove();
            else
              selectionOrRow.remove();
          }
          return null;
        }
        function getCellColIndex(cell, isStart) {
          var row = cell.getParent(),
              rowCells = row.$.cells;
          var colIndex = 0;
          for (var i = 0; i < rowCells.length; i++) {
            var mapCell = rowCells[i];
            colIndex += isStart ? 1 : mapCell.colSpan;
            if (mapCell == cell.$)
              break;
          }
          return colIndex - 1;
        }
        function getColumnsIndices(cells, isStart) {
          var retval = isStart ? Infinity : 0;
          for (var i = 0; i < cells.length; i++) {
            var colIndex = getCellColIndex(cells[i], isStart);
            if (isStart ? colIndex < retval : colIndex > retval)
              retval = colIndex;
          }
          return retval;
        }
        function insertColumn(selection, insertBefore) {
          var cells = getSelectedCells(selection),
              firstCell = cells[0],
              table = firstCell.getAscendant('table'),
              startCol = getColumnsIndices(cells, 1),
              lastCol = getColumnsIndices(cells),
              colIndex = insertBefore ? startCol : lastCol;
          var map = CKEDITOR.tools.buildTableMap(table),
              cloneCol = [],
              nextCol = [],
              height = map.length;
          for (var i = 0; i < height; i++) {
            cloneCol.push(map[i][colIndex]);
            var nextCell = insertBefore ? map[i][colIndex - 1] : map[i][colIndex + 1];
            nextCol.push(nextCell);
          }
          for (i = 0; i < height; i++) {
            var cell;
            if (!cloneCol[i])
              continue;
            if (cloneCol[i].colSpan > 1 && nextCol[i] == cloneCol[i]) {
              cell = cloneCol[i];
              cell.colSpan += 1;
            } else {
              cell = new CKEDITOR.dom.element(cloneCol[i]).clone();
              cell.removeAttribute('colSpan');
              cell.appendBogus();
              cell[insertBefore ? 'insertBefore' : 'insertAfter'].call(cell, new CKEDITOR.dom.element(cloneCol[i]));
              cell = cell.$;
            }
            i += cell.rowSpan - 1;
          }
        }
        function deleteColumns(selectionOrCell) {
          var cells = getSelectedCells(selectionOrCell),
              firstCell = cells[0],
              lastCell = cells[cells.length - 1],
              table = firstCell.getAscendant('table'),
              map = CKEDITOR.tools.buildTableMap(table),
              startColIndex,
              endColIndex,
              rowsToDelete = [];
          for (var i = 0,
              rows = map.length; i < rows; i++) {
            for (var j = 0,
                cols = map[i].length; j < cols; j++) {
              if (map[i][j] == firstCell.$)
                startColIndex = j;
              if (map[i][j] == lastCell.$)
                endColIndex = j;
            }
          }
          for (i = startColIndex; i <= endColIndex; i++) {
            for (j = 0; j < map.length; j++) {
              var mapRow = map[j],
                  row = new CKEDITOR.dom.element(table.$.rows[j]),
                  cell = new CKEDITOR.dom.element(mapRow[i]);
              if (cell.$) {
                if (cell.$.colSpan == 1)
                  cell.remove();
                else
                  cell.$.colSpan -= 1;
                j += cell.$.rowSpan - 1;
                if (!row.$.cells.length)
                  rowsToDelete.push(row);
              }
            }
          }
          var firstRowCells = table.$.rows[0] && table.$.rows[0].cells;
          var cursorPosition = new CKEDITOR.dom.element(firstRowCells[startColIndex] || (startColIndex ? firstRowCells[startColIndex - 1] : table.$.parentNode));
          if (rowsToDelete.length == rows)
            table.remove();
          return cursorPosition;
        }
        function insertCell(selection, insertBefore) {
          var startElement = selection.getStartElement();
          var cell = startElement.getAscendant('td', 1) || startElement.getAscendant('th', 1);
          if (!cell)
            return;
          var newCell = cell.clone();
          newCell.appendBogus();
          if (insertBefore)
            newCell.insertBefore(cell);
          else
            newCell.insertAfter(cell);
        }
        function deleteCells(selectionOrCell) {
          if (selectionOrCell instanceof CKEDITOR.dom.selection) {
            var cellsToDelete = getSelectedCells(selectionOrCell);
            var table = cellsToDelete[0] && cellsToDelete[0].getAscendant('table');
            var cellToFocus = getFocusElementAfterDelCells(cellsToDelete);
            for (var i = cellsToDelete.length - 1; i >= 0; i--) {
              deleteCells(cellsToDelete[i]);
            }
            if (cellToFocus)
              placeCursorInCell(cellToFocus, true);
            else if (table)
              table.remove();
          } else if (selectionOrCell instanceof CKEDITOR.dom.element) {
            var tr = selectionOrCell.getParent();
            if (tr.getChildCount() == 1)
              tr.remove();
            else
              selectionOrCell.remove();
          }
        }
        function trimCell(cell) {
          var bogus = cell.getBogus();
          bogus && bogus.remove();
          cell.trim();
        }
        function placeCursorInCell(cell, placeAtEnd) {
          var docInner = cell.getDocument(),
              docOuter = CKEDITOR.document;
          if (CKEDITOR.env.ie && CKEDITOR.env.version == 10) {
            docOuter.focus();
            docInner.focus();
          }
          var range = new CKEDITOR.dom.range(docInner);
          if (!range['moveToElementEdit' + (placeAtEnd ? 'End' : 'Start')](cell)) {
            range.selectNodeContents(cell);
            range.collapse(placeAtEnd ? false : true);
          }
          range.select(true);
        }
        function cellInRow(tableMap, rowIndex, cell) {
          var oRow = tableMap[rowIndex];
          if (typeof cell == 'undefined')
            return oRow;
          for (var c = 0; oRow && c < oRow.length; c++) {
            if (cell.is && oRow[c] == cell.$)
              return c;
            else if (c == cell)
              return new CKEDITOR.dom.element(oRow[c]);
          }
          return cell.is ? -1 : null;
        }
        function cellInCol(tableMap, colIndex) {
          var oCol = [];
          for (var r = 0; r < tableMap.length; r++) {
            var row = tableMap[r];
            oCol.push(row[colIndex]);
            if (row[colIndex].rowSpan > 1)
              r += row[colIndex].rowSpan - 1;
          }
          return oCol;
        }
        function mergeCells(selection, mergeDirection, isDetect) {
          var cells = getSelectedCells(selection);
          var commonAncestor;
          if ((mergeDirection ? cells.length != 1 : cells.length < 2) || (commonAncestor = selection.getCommonAncestor()) && commonAncestor.type == CKEDITOR.NODE_ELEMENT && commonAncestor.is('table'))
            return false;
          var cell,
              firstCell = cells[0],
              table = firstCell.getAscendant('table'),
              map = CKEDITOR.tools.buildTableMap(table),
              mapHeight = map.length,
              mapWidth = map[0].length,
              startRow = firstCell.getParent().$.rowIndex,
              startColumn = cellInRow(map, startRow, firstCell);
          if (mergeDirection) {
            var targetCell;
            try {
              var rowspan = parseInt(firstCell.getAttribute('rowspan'), 10) || 1;
              var colspan = parseInt(firstCell.getAttribute('colspan'), 10) || 1;
              targetCell = map[mergeDirection == 'up' ? startRow - rowspan : mergeDirection == 'down' ? startRow + rowspan : startRow][mergeDirection == 'left' ? startColumn - colspan : mergeDirection == 'right' ? startColumn + colspan : startColumn];
            } catch (er) {
              return false;
            }
            if (!targetCell || firstCell.$ == targetCell)
              return false;
            cells[mergeDirection == 'up' || mergeDirection == 'left' ? 'unshift' : 'push'](new CKEDITOR.dom.element(targetCell));
          }
          var doc = firstCell.getDocument(),
              lastRowIndex = startRow,
              totalRowSpan = 0,
              totalColSpan = 0,
              frag = !isDetect && new CKEDITOR.dom.documentFragment(doc),
              dimension = 0;
          for (var i = 0; i < cells.length; i++) {
            cell = cells[i];
            var tr = cell.getParent(),
                cellFirstChild = cell.getFirst(),
                colSpan = cell.$.colSpan,
                rowSpan = cell.$.rowSpan,
                rowIndex = tr.$.rowIndex,
                colIndex = cellInRow(map, rowIndex, cell);
            dimension += colSpan * rowSpan;
            totalColSpan = Math.max(totalColSpan, colIndex - startColumn + colSpan);
            totalRowSpan = Math.max(totalRowSpan, rowIndex - startRow + rowSpan);
            if (!isDetect) {
              if (trimCell(cell), cell.getChildren().count()) {
                if (rowIndex != lastRowIndex && cellFirstChild && !(cellFirstChild.isBlockBoundary && cellFirstChild.isBlockBoundary({br: 1}))) {
                  var last = frag.getLast(CKEDITOR.dom.walker.whitespaces(true));
                  if (last && !(last.is && last.is('br')))
                    frag.append('br');
                }
                cell.moveChildren(frag);
              }
              i ? cell.remove() : cell.setHtml('');
            }
            lastRowIndex = rowIndex;
          }
          if (!isDetect) {
            frag.moveChildren(firstCell);
            firstCell.appendBogus();
            if (totalColSpan >= mapWidth)
              firstCell.removeAttribute('rowSpan');
            else
              firstCell.$.rowSpan = totalRowSpan;
            if (totalRowSpan >= mapHeight)
              firstCell.removeAttribute('colSpan');
            else
              firstCell.$.colSpan = totalColSpan;
            var trs = new CKEDITOR.dom.nodeList(table.$.rows),
                count = trs.count();
            for (i = count - 1; i >= 0; i--) {
              var tailTr = trs.getItem(i);
              if (!tailTr.$.cells.length) {
                tailTr.remove();
                count++;
                continue;
              }
            }
            return firstCell;
          } else {
            return totalRowSpan * totalColSpan == dimension;
          }
        }
        function verticalSplitCell(selection, isDetect) {
          var cells = getSelectedCells(selection);
          if (cells.length > 1)
            return false;
          else if (isDetect)
            return true;
          var cell = cells[0],
              tr = cell.getParent(),
              table = tr.getAscendant('table'),
              map = CKEDITOR.tools.buildTableMap(table),
              rowIndex = tr.$.rowIndex,
              colIndex = cellInRow(map, rowIndex, cell),
              rowSpan = cell.$.rowSpan,
              newCell,
              newRowSpan,
              newCellRowSpan,
              newRowIndex;
          if (rowSpan > 1) {
            newRowSpan = Math.ceil(rowSpan / 2);
            newCellRowSpan = Math.floor(rowSpan / 2);
            newRowIndex = rowIndex + newRowSpan;
            var newCellTr = new CKEDITOR.dom.element(table.$.rows[newRowIndex]),
                newCellRow = cellInRow(map, newRowIndex),
                candidateCell;
            newCell = cell.clone();
            for (var c = 0; c < newCellRow.length; c++) {
              candidateCell = newCellRow[c];
              if (candidateCell.parentNode == newCellTr.$ && c > colIndex) {
                newCell.insertBefore(new CKEDITOR.dom.element(candidateCell));
                break;
              } else {
                candidateCell = null;
              }
            }
            if (!candidateCell)
              newCellTr.append(newCell);
          } else {
            newCellRowSpan = newRowSpan = 1;
            newCellTr = tr.clone();
            newCellTr.insertAfter(tr);
            newCellTr.append(newCell = cell.clone());
            var cellsInSameRow = cellInRow(map, rowIndex);
            for (var i = 0; i < cellsInSameRow.length; i++) {
              cellsInSameRow[i].rowSpan++;
            }
          }
          newCell.appendBogus();
          cell.$.rowSpan = newRowSpan;
          newCell.$.rowSpan = newCellRowSpan;
          if (newRowSpan == 1)
            cell.removeAttribute('rowSpan');
          if (newCellRowSpan == 1)
            newCell.removeAttribute('rowSpan');
          return newCell;
        }
        function horizontalSplitCell(selection, isDetect) {
          var cells = getSelectedCells(selection);
          if (cells.length > 1)
            return false;
          else if (isDetect)
            return true;
          var cell = cells[0],
              tr = cell.getParent(),
              table = tr.getAscendant('table'),
              map = CKEDITOR.tools.buildTableMap(table),
              rowIndex = tr.$.rowIndex,
              colIndex = cellInRow(map, rowIndex, cell),
              colSpan = cell.$.colSpan,
              newCell,
              newColSpan,
              newCellColSpan;
          if (colSpan > 1) {
            newColSpan = Math.ceil(colSpan / 2);
            newCellColSpan = Math.floor(colSpan / 2);
          } else {
            newCellColSpan = newColSpan = 1;
            var cellsInSameCol = cellInCol(map, colIndex);
            for (var i = 0; i < cellsInSameCol.length; i++) {
              cellsInSameCol[i].colSpan++;
            }
          }
          newCell = cell.clone();
          newCell.insertAfter(cell);
          newCell.appendBogus();
          cell.$.colSpan = newColSpan;
          newCell.$.colSpan = newCellColSpan;
          if (newColSpan == 1)
            cell.removeAttribute('colSpan');
          if (newCellColSpan == 1)
            newCell.removeAttribute('colSpan');
          return newCell;
        }
        CKEDITOR.plugins.add('ae_tabletools', {
          init: function init(editor) {
            var lang = editor.lang.table;
            function createDef(def) {
              return CKEDITOR.tools.extend(def || {}, {
                contextSensitive: 1,
                refresh: function refresh(editor, path) {
                  this.setState(path.contains({
                    td: 1,
                    th: 1
                  }, 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                }
              });
            }
            function addCmd(name, def) {
              var cmd = editor.getCommand(name);
              if (cmd) {
                return;
              }
              cmd = editor.addCommand(name, def);
              editor.addFeature(cmd);
            }
            addCmd('rowDelete', createDef({
              requiredContent: 'table',
              exec: function exec(editor) {
                var selection = editor.getSelection();
                placeCursorInCell(deleteRows(selection));
              }
            }));
            addCmd('rowInsertBefore', createDef({
              requiredContent: 'table',
              exec: function exec(editor) {
                var selection = editor.getSelection();
                insertRow(selection, true);
              }
            }));
            addCmd('rowInsertAfter', createDef({
              requiredContent: 'table',
              exec: function exec(editor) {
                var selection = editor.getSelection();
                insertRow(selection);
              }
            }));
            addCmd('columnDelete', createDef({
              requiredContent: 'table',
              exec: function exec(editor) {
                var selection = editor.getSelection();
                var element = deleteColumns(selection);
                element && placeCursorInCell(element, true);
              }
            }));
            addCmd('columnInsertBefore', createDef({
              requiredContent: 'table',
              exec: function exec(editor) {
                var selection = editor.getSelection();
                insertColumn(selection, true);
              }
            }));
            addCmd('columnInsertAfter', createDef({
              requiredContent: 'table',
              exec: function exec(editor) {
                var selection = editor.getSelection();
                insertColumn(selection);
              }
            }));
            addCmd('cellDelete', createDef({
              requiredContent: 'table',
              exec: function exec(editor) {
                var selection = editor.getSelection();
                deleteCells(selection);
              }
            }));
            addCmd('cellMerge', createDef({
              allowedContent: 'td[colspan,rowspan]',
              requiredContent: 'td[colspan,rowspan]',
              exec: function exec(editor) {
                placeCursorInCell(mergeCells(editor.getSelection()), true);
              }
            }));
            addCmd('cellMergeRight', createDef({
              allowedContent: 'td[colspan]',
              requiredContent: 'td[colspan]',
              exec: function exec(editor) {
                placeCursorInCell(mergeCells(editor.getSelection(), 'right'), true);
              }
            }));
            addCmd('cellMergeDown', createDef({
              allowedContent: 'td[rowspan]',
              requiredContent: 'td[rowspan]',
              exec: function exec(editor) {
                placeCursorInCell(mergeCells(editor.getSelection(), 'down'), true);
              }
            }));
            addCmd('cellVerticalSplit', createDef({
              allowedContent: 'td[rowspan]',
              requiredContent: 'td[rowspan]',
              exec: function exec(editor) {
                placeCursorInCell(verticalSplitCell(editor.getSelection()));
              }
            }));
            addCmd('cellHorizontalSplit', createDef({
              allowedContent: 'td[colspan]',
              requiredContent: 'td[colspan]',
              exec: function exec(editor) {
                placeCursorInCell(horizontalSplitCell(editor.getSelection()));
              }
            }));
            addCmd('cellInsertBefore', createDef({
              requiredContent: 'table',
              exec: function exec(editor) {
                var selection = editor.getSelection();
                insertCell(selection, true);
              }
            }));
            addCmd('cellInsertAfter', createDef({
              requiredContent: 'table',
              exec: function exec(editor) {
                var selection = editor.getSelection();
                insertCell(selection);
              }
            }));
          },
          getSelectedCells: getSelectedCells
        });
      })();
      CKEDITOR.tools.buildTableMap = function(table) {
        var aRows = table.$.rows;
        var r = -1;
        var aMap = [];
        for (var i = 0; i < aRows.length; i++) {
          r++;
          !aMap[r] && (aMap[r] = []);
          var c = -1;
          for (var j = 0; j < aRows[i].cells.length; j++) {
            var oCell = aRows[i].cells[j];
            c++;
            while (aMap[r][c]) {
              c++;
            }
            var iColSpan = isNaN(oCell.colSpan) ? 1 : oCell.colSpan;
            var iRowSpan = isNaN(oCell.rowSpan) ? 1 : oCell.rowSpan;
            for (var rs = 0; rs < iRowSpan; rs++) {
              if (!aMap[r + rs])
                aMap[r + rs] = [];
              for (var cs = 0; cs < iColSpan; cs++) {
                aMap[r + rs][c + cs] = aRows[i].cells[j];
              }
            }
            c += iColSpan - 1;
          }
        }
        return aMap;
      };
      'use strict';
      (function() {
        'use strict';
        if (CKEDITOR.plugins.get('ae_buttonbridge')) {
          return;
        }
        function noop() {}
        var UNSUPPORTED_BUTTON_API = {toFeature: noop};
        function generateButtonBridge(buttonName, buttonDefinition) {
          var ButtonBridge = AlloyEditor.Buttons[buttonName];
          if (!ButtonBridge) {
            var buttonDisplayName = buttonDefinition.name || buttonDefinition.command || buttonName;
            ButtonBridge = React.createClass(CKEDITOR.tools.merge(UNSUPPORTED_BUTTON_API, {
              displayName: buttonName,
              propTypes: {
                editor: React.PropTypes.object.isRequired,
                tabIndex: React.PropTypes.number
              },
              statics: {key: buttonName},
              render: function render() {
                var buttonClassName = 'ae-button ae-button-bridge';
                var buttonType = 'button-' + buttonDisplayName;
                var iconClassName = 'ae-icon-' + buttonDisplayName;
                var iconStyle = {};
                var cssStyle = CKEDITOR.skin.getIconStyle(buttonDisplayName);
                if (cssStyle) {
                  var cssStyleParts = cssStyle.split(';');
                  iconStyle.backgroundImage = cssStyleParts[0].substring(cssStyleParts[0].indexOf(':') + 1);
                  iconStyle.backgroundPosition = cssStyleParts[1].substring(cssStyleParts[1].indexOf(':') + 1);
                  iconStyle.backgroundSize = cssStyleParts[2].substring(cssStyleParts[2].indexOf(':') + 1);
                }
                return React.createElement('button', {
                  'aria-label': buttonDefinition.label,
                  className: buttonClassName,
                  'data-type': buttonType,
                  onClick: this._handleClick,
                  tabIndex: this.props.tabIndex,
                  title: buttonDefinition.label
                }, React.createElement('span', {
                  className: iconClassName,
                  style: iconStyle
                }));
              },
              _handleClick: function _handleClick(event) {
                var editor = this.props.editor.get('nativeEditor');
                if (buttonDefinition.onClick) {
                  buttonDefinition.onClick.call(this);
                } else {
                  editor.execCommand(buttonDefinition.command);
                }
                editor.fire('actionPerformed', this);
              }
            }));
            AlloyEditor.Buttons[buttonName] = ButtonBridge;
          }
          return ButtonBridge;
        }
        if (!CKEDITOR.plugins.get('button')) {
          CKEDITOR.UI_BUTTON = 'button';
          CKEDITOR.plugins.add('button', {});
        }
        CKEDITOR.plugins.add('ae_buttonbridge', {
          requires: ['ae_uibridge'],
          init: function init(editor) {
            editor.ui.addButton = function(buttonName, buttonDefinition) {
              this.add(buttonName, CKEDITOR.UI_BUTTON, buttonDefinition);
            };
            editor.ui.addHandler(CKEDITOR.UI_BUTTON, {
              add: generateButtonBridge,
              create: function create(buttonDefinition) {
                var buttonName = 'buttonBridge' + (Math.random() * 1e9 >>> 0);
                var ButtonBridge = generateButtonBridge(buttonName, buttonDefinition);
                return new ButtonBridge();
              }
            });
          }
        });
      })();
      'use strict';
      (function() {
        'use strict';
        if (CKEDITOR.plugins.get('ae_panelmenubuttonbridge')) {
          return;
        }
        function noop() {}
        var UNSUPPORTED_PANEL_MENU_BUTTON_API = {createPanel: noop};
        var generatePanelMenuButtonBridge = function generatePanelMenuButtonBridge(panelMenuButtonName, panelMenuButtonDefinition) {
          var PanelMenuButtonBridge = AlloyEditor.Buttons[panelMenuButtonName];
          if (!PanelMenuButtonBridge) {
            var panelMenuButtonDisplayName = panelMenuButtonDefinition.name || panelMenuButtonDefinition.command || buttonName;
            PanelMenuButtonBridge = React.createClass(CKEDITOR.tools.merge(UNSUPPORTED_PANEL_MENU_BUTTON_API, {
              displayName: panelMenuButtonName,
              propTypes: {editor: React.PropTypes.object.isRequired},
              statics: {key: panelMenuButtonName},
              render: function render() {
                var buttonClassName = 'ae-button ae-button-bridge';
                var iconClassName = 'ae-icon-' + panelMenuButtonDisplayName;
                var iconStyle = {};
                var cssStyle = CKEDITOR.skin.getIconStyle(panelMenuButtonDisplayName);
                if (cssStyle) {
                  var cssStyleParts = cssStyle.split(';');
                  iconStyle.backgroundImage = cssStyleParts[0].substring(cssStyleParts[0].indexOf(':') + 1);
                  iconStyle.backgroundPosition = cssStyleParts[1].substring(cssStyleParts[1].indexOf(':') + 1);
                  iconStyle.backgroundSize = cssStyleParts[2].substring(cssStyleParts[2].indexOf(':') + 1);
                }
                var panel;
                if (this.props.expanded) {
                  panel = this._getPanel();
                }
                return React.createElement('div', {className: 'ae-container ae-has-dropdown'}, React.createElement('button', {
                  'aria-expanded': this.props.expanded,
                  'aria-label': panelMenuButtonDefinition.label,
                  className: buttonClassName,
                  onClick: this.props.toggleDropdown,
                  role: 'combobox',
                  tabIndex: this.props.tabIndex,
                  title: panelMenuButtonDefinition.label
                }, React.createElement('span', {
                  className: iconClassName,
                  style: iconStyle
                })), panel);
              },
              _getPanel: function _getPanel() {
                var panel = {
                  hide: this.props.toggleDropdown,
                  show: this.props.toggleDropdown
                };
                var blockElement = new CKEDITOR.dom.element('div');
                var block = {
                  element: blockElement,
                  keys: {}
                };
                if (panelMenuButtonDefinition.onBlock) {
                  panelMenuButtonDefinition.onBlock.call(this, panel, block);
                }
                return React.createElement(AlloyEditor.ButtonDropdown, {onDismiss: this.props.toggleDropdown}, React.createElement('div', {
                  className: blockElement.getAttribute('class'),
                  dangerouslySetInnerHTML: {__html: blockElement.getHtml()}
                }));
              }
            }));
            AlloyEditor.Buttons[panelMenuButtonName] = PanelMenuButtonBridge;
          }
          return PanelMenuButtonBridge;
        };
        if (!CKEDITOR.plugins.get('panelmenubutton')) {
          CKEDITOR.UI_PANELBUTTON = 'panelmenubutton';
          CKEDITOR.plugins.add('panelmenubutton', {});
        }
        CKEDITOR.plugins.add('ae_panelmenubuttonbridge', {
          requires: ['ae_uibridge'],
          init: function init(editor) {
            editor.ui.addPanelMenuButton = function(panelMenuButtonName, panelMenuButtonDefinition) {
              this.add(panelMenuButtonName, CKEDITOR.UI_PANELBUTTON, panelMenuButtonDefinition);
            };
            editor.ui.addHandler(CKEDITOR.UI_PANELBUTTON, {
              add: generatePanelMenuButtonBridge,
              create: function create(panelMenuButtonDefinition) {
                var panelMenuButtonName = 'panelMenuButtonBridge' + (Math.random() * 1e9 >>> 0);
                var PanelMenuButtonBridge = generatePanelMenuButtonBridge(panelMenuButtonName, panelMenuButtonDefinition);
                return new PanelMenuButtonBridge();
              }
            });
          }
        });
      })();
      'use strict';
      (function() {
        'use strict';
        if (CKEDITOR.plugins.get('ae_richcombobridge')) {
          return;
        }
        function noop() {}
        var UNSUPPORTED_RICHCOMBO_API = {
          commit: noop,
          createPanel: noop,
          disable: noop,
          enable: noop,
          getState: noop,
          hideGroup: noop,
          hideItem: noop,
          mark: noop,
          showAll: noop,
          startGroup: noop,
          unmarkAll: noop
        };
        var generateRichComboBridge = function generateRichComboBridge(richComboName, richComboDefinition) {
          var RichComboBridge = AlloyEditor.Buttons[richComboName];
          if (!RichComboBridge) {
            var richComboState = {value: undefined};
            RichComboBridge = React.createClass(CKEDITOR.tools.merge(UNSUPPORTED_RICHCOMBO_API, {
              displayName: richComboName,
              propTypes: {editor: React.PropTypes.object.isRequired},
              statics: {key: richComboName},
              add: function add(value, preview, title) {
                this._items.push({
                  preview: preview,
                  title: title,
                  value: value
                });
              },
              componentWillMount: function componentWillMount() {
                this._items = [];
                this.setValue = this._setValue;
                if (richComboDefinition.init) {
                  richComboDefinition.init.call(this);
                }
                if (richComboDefinition.onRender) {
                  richComboDefinition.onRender.call(this);
                }
              },
              componentWillUnmount: function componentWillUnmount() {
                this._cacheValue(this.state.value);
                this.setValue = this._cacheValue;
              },
              getInitialState: function getInitialState() {
                return {value: richComboState.value};
              },
              getValue: function getValue() {
                return this.state.value;
              },
              render: function render() {
                var richComboLabel = this.state.value || richComboDefinition.label;
                var itemsList;
                if (this.props.expanded) {
                  itemsList = this._getItemsList();
                }
                return React.createElement('div', {className: 'ae-container-dropdown ae-has-dropdown'}, React.createElement('button', {
                  'aria-expanded': this.props.expanded,
                  'aria-label': richComboLabel,
                  className: 'ae-toolbar-element',
                  onClick: this.props.toggleDropdown,
                  role: 'combobox',
                  tabIndex: this.props.tabIndex,
                  title: richComboLabel
                }, React.createElement('div', {className: 'ae-container'}, React.createElement('span', {className: 'ae-container-dropdown-selected-item'}, richComboLabel), React.createElement('span', {className: 'ae-icon-arrow'}))), itemsList);
              },
              _cacheValue: function _cacheValue(value) {
                richComboState.value = value;
              },
              _getItems: function _getItems() {
                var richCombo = this;
                var items = this._items.map(function(item) {
                  return React.createElement('li', {
                    key: item.title,
                    role: 'option'
                  }, React.createElement('button', {
                    className: 'ae-toolbar-element',
                    dangerouslySetInnerHTML: {__html: item.preview},
                    'data-value': item.value,
                    onClick: richCombo._onClick
                  }));
                });
                return items;
              },
              _getItemsList: function _getItemsList() {
                return React.createElement(AlloyEditor.ButtonDropdown, {onDismiss: this.props.toggleDropdown}, this._getItems());
              },
              _onClick: function _onClick(event) {
                var editor = this.props.editor.get('nativeEditor');
                if (richComboDefinition.onClick) {
                  richComboDefinition.onClick.call(this, event.currentTarget.getAttribute('data-value'));
                  editor.fire('actionPerformed', this);
                }
              },
              _setValue: function _setValue(value) {
                this.setState({value: value});
              }
            }));
            AlloyEditor.Buttons[richComboName] = RichComboBridge;
          }
          return RichComboBridge;
        };
        if (!CKEDITOR.plugins.get('richcombo')) {
          CKEDITOR.UI_RICHCOMBO = 'richcombo';
          CKEDITOR.plugins.add('richcombo', {});
        }
        CKEDITOR.plugins.add('ae_richcombobridge', {
          requires: ['ae_uibridge'],
          init: function init(editor) {
            editor.ui.addRichCombo = function(richComboName, richComboDefinition) {
              this.add(richComboName, CKEDITOR.UI_RICHCOMBO, richComboDefinition);
            };
            editor.ui.addHandler(CKEDITOR.UI_RICHCOMBO, {
              add: generateRichComboBridge,
              create: function create(richComboDefinition) {
                var richComboName = 'richComboBridge' + (Math.random() * 1e9 >>> 0);
                var RichComboBridge = generateRichComboBridge(richComboName, richComboDefinition);
                return new RichComboBridge();
              }
            });
          }
        });
      })();
      'use strict';
      (function() {
        'use strict';
        if (CKEDITOR.plugins.get('ae_uibridge')) {
          return;
        }
        CKEDITOR.plugins.add('ae_uibridge', {beforeInit: function beforeInit(editor) {
            var originalUIAddFn = editor.ui.add;
            editor.ui.add = function(name, type, definition) {
              originalUIAddFn.apply(this, arguments);
              var typeHandler = this._.handlers[type];
              if (typeHandler && typeHandler.add) {
                typeHandler.add(name, definition);
              }
            };
          }});
      })();
      'use strict';
      var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
        return typeof obj;
      } : function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
      };
      (function() {
        'use strict';
        var Lang = {
          isArray: function isArray(value) {
            return Object.prototype.toString.call(value) === '[object Array]';
          },
          isBoolean: function isBoolean(value) {
            return typeof value === 'boolean';
          },
          isFunction: function isFunction(value) {
            return typeof value === 'function';
          },
          isNull: function isNull(value) {
            return value === null;
          },
          isNumber: function isNumber(value) {
            return typeof value === 'number' && isFinite(value);
          },
          isObject: function isObject(value) {
            var valueType = typeof value === 'undefined' ? 'undefined' : _typeof(value);
            return value && (valueType === 'object' || Lang.isFunction(value));
          },
          isString: function isString(value) {
            return typeof value === 'string';
          },
          mix: function mix(receiver, supplier) {
            var hasOwnProperty = Object.prototype.hasOwnProperty;
            for (var key in supplier) {
              if (hasOwnProperty.call(supplier, key)) {
                receiver[key] = supplier[key];
              }
            }
          },
          toInt: function toInt(value) {
            return parseInt(value, 10);
          }
        };
        AlloyEditor.Lang = Lang;
      })();
      'use strict';
      (function() {
        'use strict';
        var OOP = {extend: function extend(receiver, supplier, protoProps, staticProps) {
            if (!supplier || !receiver) {
              throw 'extend failed, verify dependencies';
            }
            var supplierProto = supplier.prototype,
                receiverProto = Object.create(supplierProto);
            receiver.prototype = receiverProto;
            receiverProto.constructor = receiver;
            receiver.superclass = supplierProto;
            if (supplier !== Object && supplierProto.constructor === Object.prototype.constructor) {
              supplierProto.constructor = supplier;
            }
            if (protoProps) {
              AlloyEditor.Lang.mix(receiverProto, protoProps);
            }
            if (staticProps) {
              AlloyEditor.Lang.mix(receiver, staticProps);
            }
            return receiver;
          }};
        AlloyEditor.OOP = OOP;
      })();
      'use strict';
      (function() {
        'use strict';
        function Attribute(config) {
          this.__config__ = config || {};
          this.__ATTRS__ = {};
        }
        Attribute.prototype = {
          constructor: Attribute,
          get: function get(attr) {
            var currentAttr = this.constructor.ATTRS[attr];
            if (!currentAttr) {
              return;
            }
            if (!this._isInitialized(attr)) {
              this._init(attr);
            }
            var curValue = this.__ATTRS__[attr];
            if (currentAttr.getter) {
              curValue = this._callStringOrFunction(currentAttr.getter, curValue);
            }
            return curValue;
          },
          set: function set(attr, value) {
            var currentAttr = this.constructor.ATTRS[attr];
            if (!currentAttr) {
              return;
            }
            if (!this._isInitialized(attr)) {
              this._init(attr);
            }
            if (currentAttr.readOnly) {
              return;
            }
            if (currentAttr.writeOnce && this._isInitialized(attr)) {
              return;
            }
            if (currentAttr.validator && !this._callStringOrFunction(currentAttr.validator, value)) {
              return;
            }
            if (currentAttr.setter) {
              value = this._callStringOrFunction(currentAttr.setter, value);
            }
            this.__ATTRS__[attr] = value;
          },
          _callStringOrFunction: function _callStringOrFunction(stringOrFunction, args) {
            var result = null;
            if (!AlloyEditor.Lang.isArray(args)) {
              args = [args];
            }
            if (AlloyEditor.Lang.isString(stringOrFunction) && AlloyEditor.Lang.isFunction(this[stringOrFunction])) {
              result = this[stringOrFunction].apply(this, args);
            } else if (AlloyEditor.Lang.isFunction(stringOrFunction)) {
              result = stringOrFunction.apply(this, args);
            }
            return result;
          },
          _init: function _init(attr) {
            var value;
            var currentAttr = this.constructor.ATTRS[attr];
            var hasDefaultValue = Object.prototype.hasOwnProperty.call(currentAttr, 'value');
            var hasPassedValueViaConfig = Object.prototype.hasOwnProperty.call(this.__config__, attr);
            if (currentAttr.valueFn) {
              value = this._callStringOrFunction(currentAttr.valueFn, value);
              this.__ATTRS__[attr] = value;
            } else if (currentAttr.readOnly) {
              value = currentAttr.value;
            } else if (currentAttr.writeOnce) {
              if (hasPassedValueViaConfig) {
                value = this.__config__[attr];
              } else if (hasDefaultValue) {
                value = currentAttr.value;
              } else {
                return;
              }
            } else if (hasPassedValueViaConfig) {
              value = this.__config__[attr];
            } else if (hasDefaultValue) {
              value = currentAttr.value;
            }
            if (currentAttr.validator && hasPassedValueViaConfig && !this._callStringOrFunction(currentAttr.validator, value)) {
              if (hasDefaultValue) {
                value = currentAttr.value;
              } else {
                return;
              }
            }
            if (currentAttr.setter && hasPassedValueViaConfig) {
              value = this._callStringOrFunction(currentAttr.setter, value);
            }
            this.__ATTRS__[attr] = value;
          },
          _isInitialized: function _isInitialized(attr) {
            return Object.prototype.hasOwnProperty.call(this.__ATTRS__, attr);
          }
        };
        AlloyEditor.Attribute = Attribute;
      })();
      'use strict';
      (function() {
        'use strict';
        function Base(config) {
          Base.superclass.constructor.call(this, config);
          this.init(config);
        }
        AlloyEditor.OOP.extend(Base, AlloyEditor.Attribute, {
          init: function init(config) {
            this._callChain('initializer', config);
          },
          destroy: function destroy() {
            this._callChain('destructor');
          },
          _callChain: function _callChain(wat, args) {
            var arr = [];
            var ctor = this.constructor;
            while (ctor) {
              if (AlloyEditor.Lang.isFunction(ctor.prototype[wat])) {
                arr.push(ctor.prototype[wat]);
              }
              ctor = ctor.superclass ? ctor.superclass.constructor : null;
            }
            arr = arr.reverse();
            args = AlloyEditor.Lang.isArray(args) ? args : [args];
            for (var i = 0; i < arr.length; i++) {
              var item = arr[i];
              item.apply(this, args);
            }
          }
        });
        AlloyEditor.Base = Base;
      })();
      'use strict';
      (function() {
        'use strict';
        var tableSelectionGetArrowBoxClasses = function tableSelectionGetArrowBoxClasses() {
          return 'ae-arrow-box ae-arrow-box-bottom';
        };
        AlloyEditor.SelectionGetArrowBoxClasses = {table: tableSelectionGetArrowBoxClasses};
      })();
      'use strict';
      (function() {
        'use strict';
        var DEFAULT_GUTTER = {
          left: 0,
          top: 0
        };
        var centerToolbar = function centerToolbar(toolbar, rect) {
          var toolbarNode = ReactDOM.findDOMNode(toolbar);
          var halfNodeWidth = toolbarNode.offsetWidth / 2;
          var scrollPosition = new CKEDITOR.dom.window(window).getScrollPosition();
          var gutter = toolbar.props.gutter || DEFAULT_GUTTER;
          var widgetXY = toolbar.getWidgetXYPoint(rect.left + rect.width / 2 - scrollPosition.x, rect.top + scrollPosition.y, CKEDITOR.SELECTION_BOTTOM_TO_TOP);
          toolbar.moveToPoint([widgetXY[0], widgetXY[1]], [rect.left + rect.width / 2 - halfNodeWidth - scrollPosition.x, rect.top - toolbarNode.offsetHeight + scrollPosition.y - gutter.top]);
        };
        var imageSelectionSetPosition = function imageSelectionSetPosition(payload) {
          centerToolbar(this, payload.selectionData.element.getClientRect());
          return true;
        };
        var tableSelectionSetPosition = function tableSelectionSetPosition(payload) {
          var nativeEditor = payload.editor.get('nativeEditor');
          var table = new CKEDITOR.Table(nativeEditor).getFromSelection();
          centerToolbar(this, table.getClientRect());
          return true;
        };
        AlloyEditor.SelectionSetPosition = {
          image: imageSelectionSetPosition,
          table: tableSelectionSetPosition
        };
      })();
      'use strict';
      (function() {
        'use strict';
        var _isRangeAtElementEnd = function _isRangeAtElementEnd(range, element) {
          return element.getText().length === range.endOffset || element.equals(range.startContainer) && element.equals(range.endContainer) && range.startOffset === range.endOffset && range.endOffset === 1;
        };
        var embedSelectionTest = function embedSelectionTest(payload) {
          var editor = payload.editor.get('nativeEditor');
          var embedElement;
          var selection = editor.getSelection();
          if (selection) {
            var range = selection.getRanges()[0];
            if (range) {
              range.shrink(CKEDITOR.SHRINK_TEXT);
              embedElement = editor.elementPath(range.getCommonAncestor()).contains(function(element) {
                return element.getAttribute('data-widget') === 'ae_embed' || element.getAttribute('data-cke-widget-wrapper') && element.find('[data-widget="ae_embed"]');
              }, 1);
            }
          }
          return !!embedElement;
        };
        var linkSelectionTest = function linkSelectionTest(payload) {
          var nativeEditor = payload.editor.get('nativeEditor');
          var range = nativeEditor.getSelection().getRanges()[0];
          var element;
          return !!(nativeEditor.isSelectionEmpty() && (element = new CKEDITOR.Link(nativeEditor).getFromSelection()) && element.getText().length !== range.endOffset && !element.isReadOnly() && !_isRangeAtElementEnd(range, element));
        };
        var imageSelectionTest = function imageSelectionTest(payload) {
          var selectionData = payload.data.selectionData;
          return !!(selectionData.element && selectionData.element.getName() === 'img' && !selectionData.element.isReadOnly());
        };
        var textSelectionTest = function textSelectionTest(payload) {
          var nativeEditor = payload.editor.get('nativeEditor');
          var selectionEmpty = nativeEditor.isSelectionEmpty();
          var selectionData = payload.data.selectionData;
          return !!(!selectionData.element && selectionData.region && !selectionEmpty && !nativeEditor.getSelection().getCommonAncestor().isReadOnly());
        };
        var tableSelectionTest = function tableSelectionTest(payload) {
          var nativeEditor = payload.editor.get('nativeEditor');
          var table = new CKEDITOR.Table(nativeEditor);
          var element = table.getFromSelection();
          return !!(element && table.isEditable(element));
        };
        AlloyEditor.SelectionTest = {
          embed: embedSelectionTest,
          image: imageSelectionTest,
          link: linkSelectionTest,
          table: tableSelectionTest,
          text: textSelectionTest
        };
      })();
      'use strict';
      (function() {
        'use strict';
        var Selections = [{
          name: 'embed',
          buttons: ['embedEdit'],
          test: AlloyEditor.SelectionTest.embed
        }, {
          name: 'link',
          buttons: ['linkEdit'],
          test: AlloyEditor.SelectionTest.link
        }, {
          name: 'image',
          buttons: ['imageLeft', 'imageCenter', 'imageRight'],
          setPosition: AlloyEditor.SelectionSetPosition.image,
          test: AlloyEditor.SelectionTest.image
        }, {
          name: 'text',
          buttons: ['styles', 'bold', 'italic', 'underline', 'link', 'twitter'],
          test: AlloyEditor.SelectionTest.text
        }, {
          name: 'table',
          buttons: ['tableHeading', 'tableRow', 'tableColumn', 'tableCell', 'tableRemove'],
          getArrowBoxClasses: AlloyEditor.SelectionGetArrowBoxClasses.table,
          setPosition: AlloyEditor.SelectionSetPosition.table,
          test: AlloyEditor.SelectionTest.table
        }];
        AlloyEditor.Selections = Selections;
      })();
      'use strict';
      (function() {
        'use strict';
        function Core(config) {
          Core.superclass.constructor.call(this, config);
        }
        AlloyEditor.OOP.extend(Core, AlloyEditor.Base, {
          initializer: function initializer(config) {
            var node = this.get('srcNode');
            if (this.get('enableContentEditable')) {
              node.setAttribute('contenteditable', 'true');
            }
            var editor = CKEDITOR.inline(node);
            editor.config.allowedContent = this.get('allowedContent');
            editor.config.toolbars = this.get('toolbars');
            editor.config.removePlugins = this.get('removePlugins');
            editor.config.extraPlugins = this.get('extraPlugins');
            editor.config.placeholderClass = this.get('placeholderClass');
            editor.config.pasteFromWordRemoveStyles = false;
            editor.config.pasteFromWordRemoveFontStyles = false;
            editor.config.selectionKeystrokes = this.get('selectionKeystrokes');
            AlloyEditor.Lang.mix(editor.config, config);
            editor.once('contentDom', function() {
              var editable = editor.editable();
              editable.addClass('ae-editable');
              editable.editor.on('readOnly', this._onReadOnlyChangeFn.bind(this));
            }.bind(this));
            AlloyEditor.loadLanguageResources(this._renderUI.bind(this));
            this._editor = editor;
          },
          destructor: function destructor() {
            this._destroyed = true;
            if (this._editorUIElement) {
              ReactDOM.unmountComponentAtNode(this._editorUIElement);
              this._editorUIElement.parentNode.removeChild(this._editorUIElement);
            }
            var nativeEditor = this.get('nativeEditor');
            if (nativeEditor) {
              var editable = nativeEditor.editable();
              if (editable) {
                editable.removeClass('ae-editable');
                if (this.get('enableContentEditable')) {
                  this.get('srcNode').setAttribute('contenteditable', 'false');
                }
              }
              nativeEditor.destroy();
            }
          },
          _defaultReadOnlyClickFn: function _defaultReadOnlyClickFn(event) {
            if (event.listenerData.editor.editable().editor.fire('readOnlyClick', event.data) !== false) {
              var ckElement = new CKEDITOR.dom.elementPath(event.data.getTarget(), this);
              var link = ckElement.lastElement;
              if (link) {
                var href = link.$.attributes.href ? link.$.attributes.href.value : null;
                var target = link.$.attributes.target ? link.$.attributes.target.value : null;
                if (target && href) {
                  window.open(href, target);
                } else if (href) {
                  window.location.href = href;
                }
              }
            }
          },
          _getNativeEditor: function _getNativeEditor() {
            return this._editor;
          },
          _onReadOnlyChangeFn: function _onReadOnlyChangeFn(event) {
            if (event.editor.readOnly) {
              event.editor.editable().on('click', this._defaultReadOnlyClickFn, this, {editor: event.editor});
            } else {
              event.editor.editable().removeListener('click', this._defaultReadOnlyClickFn);
            }
          },
          _renderUI: function _renderUI() {
            if (!this._destroyed) {
              var editorUIElement = document.createElement('div');
              editorUIElement.className = 'ae-ui';
              var uiNode = this.get('uiNode') || document.body;
              uiNode.appendChild(editorUIElement);
              this._mainUI = ReactDOM.render(React.createElement(AlloyEditor.UI, {
                editor: this,
                eventsDelay: this.get('eventsDelay'),
                toolbars: this.get('toolbars')
              }), editorUIElement);
              this._editorUIElement = editorUIElement;
              this.get('nativeEditor').fire('uiReady');
            }
          },
          _toElement: function _toElement(value) {
            if (AlloyEditor.Lang.isString(value)) {
              value = document.getElementById(value);
            }
            return value;
          },
          _validateAllowedContent: function _validateAllowedContent(value) {
            return AlloyEditor.Lang.isString(value) || AlloyEditor.Lang.isObject(value) || AlloyEditor.Lang.isBoolean(value);
          },
          _validateToolbars: function _validateToolbars(value) {
            return AlloyEditor.Lang.isObject(value) || AlloyEditor.Lang.isNull(value);
          }
        }, {ATTRS: {
            allowedContent: {
              validator: '_validateAllowedContent',
              value: true,
              writeOnce: true
            },
            enableContentEditable: {
              validator: AlloyEditor.Lang.isBoolean,
              value: true,
              writeOnce: true
            },
            eventsDelay: {
              validator: AlloyEditor.Lang.isNumber,
              value: 100
            },
            extraPlugins: {
              validator: AlloyEditor.Lang.isString,
              value: 'ae_uicore,ae_selectionregion,ae_selectionkeystrokes,ae_dragresize,ae_imagealignment,ae_addimages,ae_placeholder,ae_tabletools,ae_tableresize,ae_autolink,ae_embed',
              writeOnce: true
            },
            nativeEditor: {
              getter: '_getNativeEditor',
              readOnly: true
            },
            placeholderClass: {
              validator: AlloyEditor.Lang.isString,
              value: 'ae-placeholder',
              writeOnce: true
            },
            removePlugins: {
              validator: AlloyEditor.Lang.isString,
              value: 'contextmenu,toolbar,elementspath,resize,liststyle,link',
              writeOnce: true
            },
            selectionKeystrokes: {
              validator: AlloyEditor.Lang.isArray,
              value: [{
                keys: CKEDITOR.CTRL + 76,
                selection: 'link'
              }, {
                keys: CKEDITOR.CTRL + CKEDITOR.SHIFT + 76,
                selection: 'embed'
              }]
            },
            srcNode: {
              setter: '_toElement',
              writeOnce: true
            },
            toolbars: {
              validator: '_validateToolbars',
              value: {
                add: {
                  buttons: ['image', 'embed', 'camera', 'hline', 'table'],
                  tabIndex: 2
                },
                styles: {
                  selections: AlloyEditor.Selections,
                  tabIndex: 1
                }
              }
            },
            uiNode: {
              setter: '_toElement',
              writeOnce: true
            }
          }});
        CKEDITOR.event.implementOn(Core);
        AlloyEditor.Core = Core;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonActionStyle = {applyStyle: function applyStyle() {
            if (AlloyEditor.Lang.isFunction(this.isActive) && AlloyEditor.Lang.isFunction(this.getStyle)) {
              var editor = this.props.editor.get('nativeEditor');
              editor.getSelection().lock();
              if (this.isActive()) {
                editor.removeStyle(this.getStyle());
              } else {
                editor.applyStyle(this.getStyle());
              }
              editor.getSelection().unlock();
              editor.fire('actionPerformed', this);
            }
          }};
        AlloyEditor.ButtonActionStyle = ButtonActionStyle;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonCommandActive = {isActive: function isActive() {
            var editor = this.props.editor.get('nativeEditor');
            var command = editor.getCommand(this.props.command);
            return command ? command.state === CKEDITOR.TRISTATE_ON : false;
          }};
        AlloyEditor.ButtonCommandActive = ButtonCommandActive;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonCommand = {
          propTypes: {
            command: React.PropTypes.string.isRequired,
            modifiesSelection: React.PropTypes.bool
          },
          execCommand: function execCommand(data) {
            var editor = this.props.editor.get('nativeEditor');
            editor.execCommand(this.props.command, data);
            if (this.props.modifiesSelection) {
              editor.selectionChange(true);
            }
            editor.fire('actionPerformed', this);
          }
        };
        AlloyEditor.ButtonCommand = ButtonCommand;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonKeystroke = {
          propTypes: {keystroke: React.PropTypes.object.isRequired},
          componentWillMount: function componentWillMount() {
            var nativeEditor = this.props.editor.get('nativeEditor');
            var keystroke = this.props.keystroke;
            var commandName = keystroke.name || (Math.random() * 1e9 >>> 0).toString();
            var command = nativeEditor.getCommand(commandName);
            if (!command) {
              command = new CKEDITOR.command(nativeEditor, {exec: function(editor) {
                  var keystrokeFn = keystroke.fn;
                  if (AlloyEditor.Lang.isString(keystrokeFn)) {
                    this[keystrokeFn].call(this, editor);
                  } else if (AlloyEditor.Lang.isFunction(keystrokeFn)) {
                    keystrokeFn.call(this, editor);
                  }
                }.bind(this)});
              nativeEditor.addCommand(commandName, command);
            }
            this._defaultKeystrokeCommand = nativeEditor.keystrokeHandler.keystrokes[keystroke.keys];
            nativeEditor.setKeystroke(keystroke.keys, commandName);
          },
          componentWillUnmount: function componentWillUnmount() {
            this.props.editor.get('nativeEditor').setKeystroke(this.props.keystroke.keys, this._defaultKeystrokeCommand);
          }
        };
        AlloyEditor.ButtonKeystroke = ButtonKeystroke;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonStateClasses = {getStateClasses: function getStateClasses() {
            var stateClasses = '';
            if (AlloyEditor.Lang.isFunction(this.isActive) && this.isActive()) {
              stateClasses += 'ae-button-pressed';
            }
            if (AlloyEditor.Lang.isFunction(this.isDisabled) && this.isDisabled()) {
              stateClasses += ' ae-button-disabled';
            }
            return stateClasses;
          }};
        AlloyEditor.ButtonStateClasses = ButtonStateClasses;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonStyle = {
          propTypes: {style: React.PropTypes.object},
          componentWillMount: function componentWillMount() {
            this._style = new CKEDITOR.style(this.props.style);
          },
          componentWillUnmount: function componentWillUnmount() {
            this._style = null;
          },
          getStyle: function getStyle() {
            return this._style;
          },
          isActive: function isActive() {
            var result;
            var editor = this.props.editor.get('nativeEditor');
            var elementPath = editor.elementPath();
            result = this.getStyle().checkActive(elementPath, editor);
            return result;
          }
        };
        AlloyEditor.ButtonStyle = ButtonStyle;
      })();
      'use strict';
      (function() {
        'use strict';
        var ToolbarButtons = {getToolbarButtons: function getToolbarButtons(buttons, additionalProps) {
            var buttonProps = {};
            var toolbarButtons = this.filterExclusive(buttons.filter(function(button) {
              return button && (AlloyEditor.Buttons[button] || AlloyEditor.Buttons[button.name]);
            }).map(function(button) {
              if (AlloyEditor.Lang.isString(button)) {
                button = AlloyEditor.Buttons[button];
              } else if (AlloyEditor.Lang.isString(button.name)) {
                buttonProps[AlloyEditor.Buttons[button.name].key] = button.cfg;
                button = AlloyEditor.Buttons[button.name];
              }
              return button;
            })).map(function(button) {
              var props = this.mergeExclusiveProps({
                editor: this.props.editor,
                key: button.key,
                tabKey: button.key,
                tabIndex: this.props.trigger && this.props.trigger.props.tabKey === button.key ? 0 : -1,
                trigger: this.props.trigger
              }, button.key);
              props = this.mergeDropdownProps(props, button.key);
              if (additionalProps) {
                props = CKEDITOR.tools.merge(props, additionalProps);
              }
              props = CKEDITOR.tools.merge(props, buttonProps[button.key]);
              return React.createElement(button, props);
            }, this);
            return toolbarButtons;
          }};
        AlloyEditor.ToolbarButtons = ToolbarButtons;
      })();
      'use strict';
      (function() {
        'use strict';
        var WidgetArrowBox = {getArrowBoxClasses: function getArrowBoxClasses() {
            var arrowBoxClasses = 'ae-arrow-box';
            if (AlloyEditor.Lang.isFunction(this.getInteractionPoint) && this.getInteractionPoint()) {
              if (this.getInteractionPoint().direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) {
                arrowBoxClasses += ' ae-arrow-box-top';
              } else {
                arrowBoxClasses += ' ae-arrow-box-bottom';
              }
            }
            return arrowBoxClasses;
          }};
        AlloyEditor.WidgetArrowBox = WidgetArrowBox;
      })();
      'use strict';
      (function() {
        'use strict';
        var WidgetDropdown = {
          componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
            this.setState({
              dropdownTrigger: null,
              itemDropdown: null
            });
          },
          getInitialState: function getInitialState() {
            return {
              dropdownTrigger: null,
              itemDropdown: null
            };
          },
          mergeDropdownProps: function mergeDropdownProps(obj, itemKey) {
            return CKEDITOR.tools.merge(obj, {
              expanded: this.state.itemDropdown === itemKey ? true : false,
              tabIndex: this.state.dropdownTrigger === itemKey ? 0 : -1,
              toggleDropdown: this.toggleDropdown.bind(this, itemKey)
            });
          },
          toggleDropdown: function toggleDropdown(itemDropdown, toggleDirection) {
            this.setState({
              dropdownTrigger: itemDropdown,
              itemDropdown: itemDropdown !== this.state.itemDropdown ? itemDropdown : null
            }, function() {
              if (!this.state.itemDropdown) {
                if (this.moveFocus) {
                  this.moveFocus(toggleDirection);
                } else {
                  ReactDOM.findDOMNode(this).focus();
                }
              }
            });
          }
        };
        AlloyEditor.WidgetDropdown = WidgetDropdown;
      })();
      'use strict';
      (function() {
        'use strict';
        var WidgetExclusive = {
          cancelExclusive: function cancelExclusive(itemExclusive) {
            if (this.state.itemExclusive === itemExclusive) {
              this.setState({itemExclusive: null});
            }
          },
          componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
            this.setState({itemExclusive: null});
          },
          filterExclusive: function filterExclusive(items) {
            return items.filter(function(item) {
              if (this.state.itemExclusive) {
                if (this.state.itemExclusive === item.key) {
                  return item;
                }
              } else {
                return item;
              }
            }.bind(this));
          },
          mergeExclusiveProps: function mergeExclusiveProps(obj, itemKey) {
            return CKEDITOR.tools.merge(obj, {
              cancelExclusive: this.cancelExclusive.bind(this, itemKey),
              renderExclusive: this.state.itemExclusive === itemKey,
              requestExclusive: this.requestExclusive.bind(this, itemKey)
            });
          },
          requestExclusive: function requestExclusive(itemExclusive) {
            this.setState({itemExclusive: itemExclusive});
          }
        };
        AlloyEditor.WidgetExclusive = WidgetExclusive;
      })();
      'use strict';
      (function() {
        'use strict';
        var DIRECTION_NONE = 0;
        var DIRECTION_NEXT = 1;
        var DIRECTION_PREV = -1;
        var ACTION_NONE = 0;
        var ACTION_MOVE_FOCUS = 1;
        var ACTION_DISMISS_FOCUS = 2;
        var WidgetFocusManager = {
          propTypes: {
            onDismiss: React.PropTypes.func,
            circular: React.PropTypes.bool.isRequired,
            descendants: React.PropTypes.string.isRequired,
            keys: React.PropTypes.object.isRequired
          },
          componentDidMount: function componentDidMount() {
            this._refresh();
          },
          componentDidUpdate: function componentDidUpdate() {
            this._refresh();
          },
          focus: function focus(event) {
            if (!event || this._isValidTarget(event.target)) {
              if (this._descendants) {
                this._descendants[this._activeDescendant].focus();
                if (event) {
                  event.stopPropagation();
                  event.preventDefault();
                }
              }
            }
          },
          handleKey: function handleKey(event) {
            if (this._isValidTarget(event.target) && this._descendants) {
              var action = this._getFocusAction(event);
              if (action.type) {
                event.stopPropagation();
                event.preventDefault();
                if (action.type === ACTION_MOVE_FOCUS) {
                  this._moveFocus(action.direction);
                }
                if (action.type === ACTION_DISMISS_FOCUS) {
                  this.props.onDismiss(action.direction);
                }
              }
            }
          },
          moveFocus: function moveFocus(direction) {
            direction = AlloyEditor.Lang.isNumber(direction) ? direction : 0;
            this._moveFocus(direction);
          },
          _getFocusAction: function _getFocusAction(event) {
            var action = {type: ACTION_NONE};
            if (this.props.keys) {
              var direction = this._getFocusMoveDirection(event);
              if (direction) {
                action.direction = direction;
                action.type = ACTION_MOVE_FOCUS;
              }
              var dismissAction = this._getFocusDismissAction(event, direction);
              if (dismissAction.dismiss) {
                action.direction = dismissAction.direction;
                action.type = ACTION_DISMISS_FOCUS;
              }
            }
            return action;
          },
          _getFocusDismissAction: function _getFocusDismissAction(event, focusMoveDirection) {
            var dismissAction = {
              direction: focusMoveDirection,
              dismiss: false
            };
            if (this.props.onDismiss) {
              if (this._isValidKey(event.keyCode, this.props.keys.dismiss)) {
                dismissAction.dismiss = true;
              }
              if (this._isValidKey(event.keyCode, this.props.keys.dismissNext)) {
                dismissAction.dismiss = true;
                dismissAction.direction = DIRECTION_NEXT;
              }
              if (this._isValidKey(event.keyCode, this.props.keys.dismissPrev)) {
                dismissAction.dismiss = true;
                dismissAction.direction = DIRECTION_PREV;
              }
              if (!dismissAction.dismiss && !this.props.circular && focusMoveDirection) {
                dismissAction.dismiss = focusMoveDirection === DIRECTION_PREV && this._activeDescendant === 0 || focusMoveDirection === DIRECTION_NEXT && this._activeDescendant === this._descendants.length - 1;
              }
            }
            return dismissAction;
          },
          _getFocusMoveDirection: function _getFocusMoveDirection(event) {
            var direction = DIRECTION_NONE;
            if (this._isValidKey(event.keyCode, this.props.keys.next)) {
              direction = DIRECTION_NEXT;
            }
            if (this._isValidKey(event.keyCode, this.props.keys.prev)) {
              direction = DIRECTION_PREV;
            }
            if (event.shifKey) {
              direction *= -1;
            }
            return direction;
          },
          _isValidKey: function _isValidKey(keyCode, keys) {
            return AlloyEditor.Lang.isArray(keys) ? keys.indexOf(keyCode) !== -1 : keyCode === keys;
          },
          _isValidTarget: function _isValidTarget(element) {
            var tagName = element.tagName.toLowerCase();
            return tagName !== 'input' && tagName !== 'select' && tagName !== 'textarea';
          },
          _moveFocus: function _moveFocus(direction) {
            var numDescendants = this._descendants.length;
            var descendant = this._descendants[this._activeDescendant];
            descendant.setAttribute('tabIndex', -1);
            this._activeDescendant += direction;
            if (this.props.circular) {
              this._activeDescendant = (this._activeDescendant % numDescendants + numDescendants) % numDescendants;
            } else {
              this._activeDescendant = Math.max(Math.min(this._activeDescendant, numDescendants - 1), 0);
            }
            descendant = this._descendants[this._activeDescendant];
            descendant.setAttribute('tabIndex', 0);
            descendant.focus();
          },
          _refresh: function _refresh() {
            var domNode = ReactDOM.findDOMNode(this);
            if (domNode) {
              var descendants = domNode.querySelectorAll(this.props.descendants);
              var priorityDescendants = [];
              this._descendants = [];
              Array.prototype.slice.call(descendants).forEach(function(item) {
                var dataTabIndex = item.getAttribute('data-tabindex');
                if (dataTabIndex) {
                  priorityDescendants.push(item);
                } else {
                  this._descendants.push(item);
                }
              }.bind(this));
              priorityDescendants = priorityDescendants.sort(function(a, b) {
                return AlloyEditor.Lang.toInt(a.getAttribute('data-tabindex')) > AlloyEditor.Lang.toInt(b.getAttribute('data-tabindex'));
              });
              this._descendants = priorityDescendants.concat(this._descendants);
              this._activeDescendant = 0;
              this._descendants.some(function(item, index) {
                if (item.getAttribute('tabindex') === '0') {
                  this._activeDescendant = index;
                  this.focus();
                  return true;
                }
              }.bind(this));
            }
          }
        };
        AlloyEditor.WidgetFocusManager = WidgetFocusManager;
      })();
      'use strict';
      (function() {
        'use strict';
        var WidgetInteractionPoint = {
          propTypes: {editorEvent: React.PropTypes.object},
          getInteractionPoint: function getInteractionPoint() {
            var eventPayload = this.props.editorEvent ? this.props.editorEvent.data : null;
            if (!eventPayload) {
              return;
            }
            var selectionData = eventPayload.selectionData;
            var pos = {
              x: eventPayload.nativeEvent.pageX,
              y: selectionData.region.top
            };
            var direction = selectionData.region.direction;
            var endRect = selectionData.region.endRect;
            var startRect = selectionData.region.startRect;
            if (endRect && startRect && startRect.top === endRect.top) {
              direction = CKEDITOR.SELECTION_BOTTOM_TO_TOP;
            }
            var x;
            var y;
            if (pos.x && pos.y) {
              x = this._getXPoint(selectionData, pos.x);
              if (direction === CKEDITOR.SELECTION_BOTTOM_TO_TOP) {
                y = Math.min(pos.y, selectionData.region.top);
              } else {
                y = Math.max(pos.y, selectionData.region.bottom);
              }
            } else {
              x = selectionData.region.left + selectionData.region.width / 2;
              if (direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) {
                y = selectionData.region.bottom;
              } else {
                y = selectionData.region.top;
              }
            }
            return {
              direction: direction,
              x: x,
              y: y
            };
          },
          _getXPoint: function _getXPoint(selectionData, eventX) {
            var region = selectionData.region;
            var left = region.startRect ? region.startRect.left : region.left;
            var right = region.endRect ? region.endRect.right : region.right;
            var x;
            if (left < eventX && right > eventX) {
              x = eventX;
            } else {
              var leftDist = Math.abs(left - eventX);
              var rightDist = Math.abs(right - eventX);
              if (leftDist < rightDist) {
                x = left;
              } else {
                x = right;
              }
            }
            return x;
          }
        };
        AlloyEditor.WidgetInteractionPoint = WidgetInteractionPoint;
      })();
      'use strict';
      (function() {
        'use strict';
        var WidgetPosition = {
          mixins: [AlloyEditor.WidgetInteractionPoint],
          propTypes: {
            constrainToViewport: React.PropTypes.bool,
            gutter: React.PropTypes.object
          },
          getDefaultProps: function getDefaultProps() {
            return {
              gutter: {
                left: 0,
                top: 10
              },
              constrainToViewport: true
            };
          },
          cancelAnimation: function cancelAnimation() {
            if (window.cancelAnimationFrame) {
              window.cancelAnimationFrame(this._animationFrameId);
            }
          },
          getConstrainedPosition: function getConstrainedPosition(attrs, viewPaneSize) {
            viewPaneSize = viewPaneSize || new CKEDITOR.dom.window(window).getViewPaneSize();
            var x = attrs.left;
            var y = attrs.top;
            if (attrs.left + attrs.width > viewPaneSize.width) {
              x -= attrs.left + attrs.width - viewPaneSize.width;
            }
            if (y < 0) {
              y = 0;
            }
            return {
              x: x,
              y: y
            };
          },
          getWidgetXYPoint: function getWidgetXYPoint(left, top, direction) {
            var domNode = ReactDOM.findDOMNode(this);
            var gutter = this.props.gutter;
            if (direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM || direction === CKEDITOR.SELECTION_BOTTOM_TO_TOP) {
              left = left - gutter.left - domNode.offsetWidth / 2;
              top = direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM ? top + gutter.top : top - domNode.offsetHeight - gutter.top;
            } else if (direction === CKEDITOR.SELECTION_LEFT_TO_RIGHT || direction === CKEDITOR.SELECTION_RIGHT_TO_LEFT) {
              left = direction === CKEDITOR.SELECTION_LEFT_TO_RIGHT ? left + gutter.left + domNode.offsetHeight / 2 : left - 3 * domNode.offsetHeight / 2 - gutter.left;
              top = top - gutter.top - domNode.offsetHeight / 2;
            }
            if (left < 0) {
              left = 0;
            }
            if (top < 0) {
              top = 0;
            }
            return [left, top];
          },
          isVisible: function isVisible() {
            var domNode = ReactDOM.findDOMNode(this);
            if (domNode) {
              var domElement = new CKEDITOR.dom.element(domNode);
              return domElement.hasClass('alloy-editor-visible');
            }
            return false;
          },
          moveToPoint: function moveToPoint(startPoint, endPoint) {
            var domElement = new CKEDITOR.dom.element(ReactDOM.findDOMNode(this));
            domElement.setStyles({
              left: startPoint[0] + 'px',
              top: startPoint[1] + 'px',
              opacity: 0
            });
            domElement.removeClass('alloy-editor-invisible');
            this._animate(function() {
              domElement.addClass('ae-toolbar-transition');
              domElement.addClass('alloy-editor-visible');
              domElement.setStyles({
                left: endPoint[0] + 'px',
                top: endPoint[1] + 'px',
                opacity: 1
              });
            });
          },
          show: function show() {
            var domNode = ReactDOM.findDOMNode(this);
            if (!this.isVisible() && domNode) {
              var interactionPoint = this.getInteractionPoint();
              if (interactionPoint) {
                var domElement = new CKEDITOR.dom.element(domNode);
                var finalX,
                    finalY,
                    initialX,
                    initialY;
                finalX = initialX = parseFloat(domElement.getStyle('left'));
                finalY = initialY = parseFloat(domElement.getStyle('top'));
                if (this.props.constrainToViewport) {
                  var res = this.getConstrainedPosition({
                    height: parseFloat(domNode.offsetHeight),
                    left: finalX,
                    top: finalY,
                    width: parseFloat(domNode.offsetWidth)
                  });
                  finalX = res.x;
                  finalY = res.y;
                }
                if (interactionPoint.direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) {
                  initialY = this.props.selectionData.region.bottom;
                } else {
                  initialY = this.props.selectionData.region.top;
                }
                this.moveToPoint([initialX, initialY], [finalX, finalY]);
              }
            }
          },
          updatePosition: function updatePosition() {
            var interactionPoint = this.getInteractionPoint();
            var domNode = ReactDOM.findDOMNode(this);
            if (interactionPoint && domNode) {
              var xy = this.getWidgetXYPoint(interactionPoint.x, interactionPoint.y, interactionPoint.direction);
              new CKEDITOR.dom.element(domNode).setStyles({
                left: xy[0] + 'px',
                top: xy[1] + 'px'
              });
            }
          },
          _animate: function _animate(callback) {
            if (window.requestAnimationFrame) {
              this._animationFrameId = window.requestAnimationFrame(callback);
            } else {
              callback();
            }
          }
        };
        AlloyEditor.WidgetPosition = WidgetPosition;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonBold = React.createClass({
          displayName: 'ButtonBold',
          mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonKeystroke],
          propTypes: {
            editor: React.PropTypes.object.isRequired,
            label: React.PropTypes.string,
            tabIndex: React.PropTypes.number
          },
          statics: {key: 'bold'},
          getDefaultProps: function getDefaultProps() {
            return {
              command: 'bold',
              keystroke: {
                fn: 'execCommand',
                keys: CKEDITOR.CTRL + 66
              },
              style: {element: 'strong'}
            };
          },
          render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();
            return React.createElement('button', {
              'aria-label': AlloyEditor.Strings.bold,
              'aria-pressed': cssClass.indexOf('pressed') !== -1,
              className: cssClass,
              'data-type': 'button-bold',
              onClick: this.execCommand,
              tabIndex: this.props.tabIndex,
              title: AlloyEditor.Strings.bold
            }, React.createElement('span', {className: 'ae-icon-bold'}));
          }
        });
        AlloyEditor.Buttons[ButtonBold.key] = AlloyEditor.ButtonBold = ButtonBold;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonCameraImage = React.createClass({
          displayName: 'ButtonCameraImage',
          statics: {key: 'cameraImage'},
          getDefaultProps: function getDefaultProps() {
            return {videoWidth: 320};
          },
          componentDidMount: function componentDidMount() {
            ReactDOM.findDOMNode(this.refs.buttonTakePhoto).focus();
          },
          componentWillUnmount: function componentWillUnmount() {
            if (this._stream) {
              if (this._stream.stop) {
                this._stream.stop();
              } else if (this._stream.getVideoTracks) {
                this._stream.getVideoTracks().forEach(function(track) {
                  track.stop();
                });
              }
              this._stream = null;
            }
          },
          render: function render() {
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
            getUserMedia.call(navigator, {
              video: true,
              audio: false
            }, this._handleStreamSuccess, this._handleStreamError);
            return React.createElement('div', {className: 'ae-camera'}, React.createElement('video', {ref: 'videoContainer'}, 'Video stream not available.'), React.createElement('button', {
              className: 'ae-camera-shoot',
              onClick: this.takePhoto,
              ref: 'buttonTakePhoto'
            }, 'Take photo'), React.createElement('canvas', {
              className: 'ae-camera-canvas',
              ref: 'canvasContainer'
            }));
          },
          takePhoto: function takePhoto() {
            var videoEl = ReactDOM.findDOMNode(this.refs.videoContainer);
            var canvasEl = ReactDOM.findDOMNode(this.refs.canvasContainer);
            var context = canvasEl.getContext('2d');
            var height = this._videoHeight;
            var width = this.props.videoWidth;
            if (width && height) {
              canvasEl.width = width;
              canvasEl.height = height;
              context.drawImage(videoEl, 0, 0, width, height);
              var imgURL = canvasEl.toDataURL('image/png');
              var el = CKEDITOR.dom.element.createFromHtml('<img src="' + imgURL + '">');
              var editor = this.props.editor.get('nativeEditor');
              editor.insertElement(el);
              this.props.cancelExclusive();
              editor.fire('actionPerformed', this);
              editor.fire('imageCameraAdd', el);
            }
          },
          _handleStreamError: function _handleStreamError(error) {
            window.alert('An error occurred! ' + error);
          },
          _handleStreamSuccess: function _handleStreamSuccess(stream) {
            var videoEl = ReactDOM.findDOMNode(this.refs.videoContainer);
            var canvasEl = ReactDOM.findDOMNode(this.refs.canvasContainer);
            videoEl.addEventListener('canplay', function(event) {
              var height = videoEl.videoHeight / (videoEl.videoWidth / this.props.videoWidth);
              if (isNaN(height)) {
                height = this.props.videoWidth / (4 / 3);
              }
              videoEl.setAttribute('width', this.props.videoWidth);
              videoEl.setAttribute('height', height);
              canvasEl.setAttribute('width', this.props.videoWidth);
              canvasEl.setAttribute('height', height);
              this._videoHeight = height;
            }.bind(this), false);
            this._stream = stream;
            if (navigator.mozGetUserMedia) {
              videoEl.mozSrcObject = stream;
            } else {
              videoEl.src = (window.URL || window.webkitURL).createObjectURL(stream);
            }
            videoEl.play();
            ReactDOM.findDOMNode(this.refs.buttonTakePhoto).disabled = false;
          }
        });
        AlloyEditor.ButtonCameraImage = ButtonCameraImage;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonCamera = React.createClass({
          displayName: 'ButtonCamera',
          propTypes: {
            editor: React.PropTypes.object.isRequired,
            label: React.PropTypes.string,
            tabIndex: React.PropTypes.number
          },
          statics: {key: 'camera'},
          render: function render() {
            if (this.props.renderExclusive) {
              return React.createElement(AlloyEditor.ButtonCameraImage, this.props);
            } else {
              var disabled = !(navigator.getUserMedia || navigator.webkitGetUserMedia && location.protocol === 'https' || navigator.mozGetUserMedia || navigator.msGetUserMedia);
              var label = disabled ? AlloyEditor.Strings.cameraDisabled : AlloyEditor.Strings.camera;
              return React.createElement('button', {
                'aria-label': label,
                className: 'ae-button',
                'data-type': 'button-image-camera',
                disabled: disabled,
                onClick: this.props.requestExclusive.bind(ButtonCamera.key),
                tabIndex: this.props.tabIndex,
                title: label
              }, React.createElement('span', {className: 'ae-icon-camera'}));
            }
          }
        });
        AlloyEditor.Buttons[ButtonCamera.key] = AlloyEditor.ButtonCamera = ButtonCamera;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonCode = React.createClass({
          displayName: 'ButtonCode',
          mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonActionStyle],
          propTypes: {
            editor: React.PropTypes.object.isRequired,
            label: React.PropTypes.string,
            tabIndex: React.PropTypes.number
          },
          statics: {key: 'code'},
          getDefaultProps: function getDefaultProps() {
            return {style: {element: 'pre'}};
          },
          render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();
            return React.createElement('button', {
              'aria-label': AlloyEditor.Strings.code,
              'aria-pressed': cssClass.indexOf('pressed') !== -1,
              className: cssClass,
              'data-type': 'button-code',
              onClick: this.applyStyle,
              tabIndex: this.props.tabIndex,
              title: AlloyEditor.Strings.code
            }, React.createElement('span', {className: 'ae-icon-code'}));
          }
        });
        AlloyEditor.Buttons[ButtonCode.key] = AlloyEditor.ButtonCode = ButtonCode;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonCommandListItem = React.createClass({
          displayName: 'ButtonCommandListItem',
          mixins: [AlloyEditor.ButtonCommand],
          propTypes: {
            description: React.PropTypes.string.isRequired,
            icon: React.PropTypes.string
          },
          statics: {key: 'buttonCommandListItem'},
          render: function render() {
            return React.createElement('button', {
              'aria-label': this.props.description,
              className: this._getClassName(),
              onClick: this.execCommand,
              tabIndex: this.props.tabIndex
            }, this.props.description);
          },
          _getClassName: function _getClassName() {
            var className = 'ae-toolbar-element';
            if (this.props.icon) {
              className += ' ae-icon-' + this.props.icon;
            }
            return className;
          }
        });
        AlloyEditor.ButtonCommandListItem = ButtonCommandListItem;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonCommandsList = React.createClass({
          displayName: 'ButtonCommandsList',
          mixins: [AlloyEditor.WidgetFocusManager],
          propTypes: {
            commands: React.PropTypes.arrayOf(React.PropTypes.object),
            editor: React.PropTypes.object.isRequired,
            listId: React.PropTypes.string
          },
          statics: {key: 'buttonCommandsList'},
          componentDidMount: function componentDidMount() {
            ReactDOM.findDOMNode(this).focus();
          },
          getDefaultProps: function getDefaultProps() {
            return {
              circular: false,
              descendants: '.ae-toolbar-element',
              keys: {
                dismiss: [27],
                dismissNext: [39],
                dismissPrev: [37],
                next: [40],
                prev: [38]
              }
            };
          },
          render: function render() {
            return React.createElement('div', {
              className: 'ae-dropdown ae-arrow-box ae-arrow-box-top-left',
              onFocus: this.focus,
              onKeyDown: this.handleKey,
              tabIndex: '0'
            }, React.createElement('ul', {
              className: 'ae-listbox',
              id: this.props.listId,
              role: 'listbox'
            }, this._renderActions(this.props.commands)));
          },
          _renderActions: function _renderActions(commands) {
            var editor = this.props.editor;
            var items;
            if (commands && commands.length) {
              items = commands.map(function(item) {
                return React.createElement('li', {
                  key: item.command,
                  role: 'option'
                }, React.createElement(AlloyEditor.ButtonCommandListItem, {
                  command: item.command,
                  description: typeof item.label === 'string' ? item.label : item.label(),
                  editor: editor
                }));
              });
            }
            return items;
          }
        });
        AlloyEditor.ButtonCommandsList = ButtonCommandsList;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonDropdown = React.createClass({
          displayName: 'ButtonDropdown',
          mixins: [AlloyEditor.WidgetFocusManager],
          getDefaultProps: function getDefaultProps() {
            return {
              circular: false,
              descendants: '.ae-toolbar-element',
              keys: {
                dismiss: [27],
                dismissNext: [39],
                dismissPrev: [37],
                next: [40],
                prev: [38]
              }
            };
          },
          statics: {key: 'dropdown'},
          render: function render() {
            return React.createElement('div', {
              className: 'ae-dropdown ae-arrow-box ae-arrow-box-top-left',
              onFocus: this.focus,
              onKeyDown: this.handleKey,
              tabIndex: '0'
            }, React.createElement('ul', {
              className: 'ae-listbox',
              role: 'listbox'
            }, this.props.children));
          }
        });
        AlloyEditor.Buttons[ButtonDropdown.key] = AlloyEditor.ButtonDropdown = ButtonDropdown;
      })();
      'use strict';
      (function() {
        'use strict';
        var KEY_ENTER = 13;
        var KEY_ESC = 27;
        var ButtonEmbedEdit = React.createClass({
          displayName: 'ButtonEmbedEdit',
          propTypes: {editor: React.PropTypes.object.isRequired},
          statics: {key: 'embedEdit'},
          componentDidMount: function componentDidMount() {
            if (this.props.renderExclusive || this.props.manualSelection) {
              if (window.requestAnimationFrame) {
                window.requestAnimationFrame(this._focusLinkInput);
              } else {
                setTimeout(this._focusLinkInput, 0);
              }
            }
          },
          componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
            this.replaceState(this.getInitialState());
          },
          getInitialState: function getInitialState() {
            var editor = this.props.editor.get('nativeEditor');
            var embed;
            var selection = editor.getSelection();
            if (selection) {
              var range = selection.getRanges()[0];
              if (range) {
                range.shrink(CKEDITOR.SHRINK_TEXT);
                embed = editor.elementPath(range.getCommonAncestor()).contains(function(element) {
                  return element.getAttribute('data-widget') === 'ae_embed' || element.getAttribute('data-cke-widget-wrapper') && element.find('[data-widget="ae_embed"]');
                }, 1);
                if (embed && embed.getAttribute('data-widget') !== 'ae_embed') {
                  embed = embed.find('[data-widget="ae_embed"]').getItem(0);
                }
              }
            }
            var href = embed ? embed.getAttribute('data-ae-embed-url') : '';
            return {
              initialLink: {href: href},
              linkHref: href
            };
          },
          render: function render() {
            var clearLinkStyle = {opacity: this.state.linkHref ? 1 : 0};
            return React.createElement('div', {className: 'ae-container-edit-link'}, React.createElement('div', {className: 'ae-container-input xxl'}, React.createElement('input', {
              className: 'ae-input',
              onChange: this._handleLinkHrefChange,
              onKeyDown: this._handleKeyDown,
              placeholder: AlloyEditor.Strings.editLink,
              ref: 'linkInput',
              type: 'text',
              value: this.state.linkHref
            }), React.createElement('button', {
              'aria-label': AlloyEditor.Strings.clearInput,
              className: 'ae-button ae-icon-remove',
              onClick: this._clearLink,
              style: clearLinkStyle,
              title: AlloyEditor.Strings.clear
            })), React.createElement('button', {
              'aria-label': AlloyEditor.Strings.confirm,
              className: 'ae-button',
              disabled: !this._isValidState(),
              onClick: this._embedLink,
              title: AlloyEditor.Strings.confirm
            }, React.createElement('span', {className: 'ae-icon-ok'})));
          },
          _clearLink: function _clearLink() {
            this.setState({linkHref: ''});
          },
          _embedLink: function _embedLink() {
            var nativeEditor = this.props.editor.get('nativeEditor');
            nativeEditor.execCommand('embedUrl', {url: this.state.linkHref});
            this.props.cancelExclusive();
          },
          _focusLinkInput: function _focusLinkInput() {
            ReactDOM.findDOMNode(this.refs.linkInput).focus();
          },
          _handleKeyDown: function _handleKeyDown(event) {
            if (event.keyCode === KEY_ENTER || event.keyCode === KEY_ESC) {
              event.preventDefault();
            }
            if (event.keyCode === KEY_ENTER) {
              this._embedLink();
            } else if (event.keyCode === KEY_ESC) {
              var editor = this.props.editor.get('nativeEditor');
              this.props.cancelExclusive();
              editor.fire('actionPerformed', this);
            }
          },
          _handleLinkHrefChange: function _handleLinkHrefChange(event) {
            this.setState({linkHref: event.target.value});
          },
          _isValidState: function _isValidState() {
            var validState = this.state.linkHref && this.state.linkHref !== this.state.initialLink.href;
            return validState;
          }
        });
        AlloyEditor.Buttons[ButtonEmbedEdit.key] = AlloyEditor.ButtonEmbedEdit = ButtonEmbedEdit;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonEmbed = React.createClass({
          displayName: 'ButtonEmbed',
          mixins: [AlloyEditor.ButtonKeystroke],
          propTypes: {
            editor: React.PropTypes.object.isRequired,
            label: React.PropTypes.string,
            tabIndex: React.PropTypes.number
          },
          statics: {key: 'embed'},
          getDefaultProps: function getDefaultProps() {
            return {keystroke: {
                fn: '_requestExclusive',
                keys: CKEDITOR.CTRL + CKEDITOR.SHIFT + 76
              }};
          },
          render: function render() {
            if (this.props.renderExclusive) {
              return React.createElement(AlloyEditor.ButtonEmbedEdit, this.props);
            } else {
              return React.createElement('button', {
                'aria-label': AlloyEditor.Strings.link,
                className: 'ae-button',
                'data-type': 'button-embed',
                onClick: this._requestExclusive,
                tabIndex: this.props.tabIndex,
                title: AlloyEditor.Strings.link
              }, React.createElement('span', {className: 'ae-icon-add'}));
            }
          },
          _requestExclusive: function _requestExclusive() {
            this.props.requestExclusive(ButtonEmbed.key);
          }
        });
        AlloyEditor.Buttons[ButtonEmbed.key] = AlloyEditor.ButtonEmbed = ButtonEmbed;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonH1 = React.createClass({
          displayName: 'ButtonH1',
          mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonActionStyle],
          propTypes: {
            editor: React.PropTypes.object.isRequired,
            label: React.PropTypes.string,
            tabIndex: React.PropTypes.number
          },
          statics: {key: 'h1'},
          getDefaultProps: function getDefaultProps() {
            return {style: {element: 'h1'}};
          },
          render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();
            return React.createElement('button', {
              'aria-label': AlloyEditor.Strings.h1,
              'aria-pressed': cssClass.indexOf('pressed') !== -1,
              className: cssClass,
              'data-type': 'button-h1',
              onClick: this.applyStyle,
              tabIndex: this.props.tabIndex,
              title: AlloyEditor.Strings.h1
            }, React.createElement('span', {className: 'ae-icon-h1'}));
          }
        });
        AlloyEditor.Buttons[ButtonH1.key] = AlloyEditor.ButtonH1 = ButtonH1;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonH2 = React.createClass({
          displayName: 'ButtonH2',
          mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonActionStyle],
          propTypes: {
            editor: React.PropTypes.object.isRequired,
            label: React.PropTypes.string,
            tabIndex: React.PropTypes.number
          },
          statics: {key: 'h2'},
          getDefaultProps: function getDefaultProps() {
            return {style: {element: 'h2'}};
          },
          render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();
            return React.createElement('button', {
              'aria-label': AlloyEditor.Strings.h2,
              'aria-pressed': cssClass.indexOf('pressed') !== -1,
              className: cssClass,
              'data-type': 'button-h2',
              onClick: this.applyStyle,
              tabIndex: this.props.tabIndex,
              title: AlloyEditor.Strings.h2
            }, React.createElement('span', {className: 'ae-icon-h2'}));
          }
        });
        AlloyEditor.Buttons[ButtonH2.key] = AlloyEditor.ButtonH2 = ButtonH2;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonHline = React.createClass({
          displayName: 'ButtonHline',
          mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonCommand],
          propTypes: {
            editor: React.PropTypes.object.isRequired,
            label: React.PropTypes.string,
            tabIndex: React.PropTypes.number
          },
          statics: {key: 'hline'},
          getDefaultProps: function getDefaultProps() {
            return {
              command: 'horizontalrule',
              style: {element: 'hr'}
            };
          },
          render: function render() {
            return React.createElement('button', {
              'aria-label': AlloyEditor.Strings.horizontalrule,
              className: 'ae-button',
              'data-type': 'button-hline',
              onClick: this.execCommand,
              tabIndex: this.props.tabIndex,
              title: AlloyEditor.Strings.horizontalrule
            }, React.createElement('span', {className: 'ae-icon-separator'}));
          }
        });
        AlloyEditor.Buttons[ButtonHline.key] = AlloyEditor.ButtonHline = ButtonHline;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonImageAlignCenter = React.createClass({
          displayName: 'ButtonImageAlignCenter',
          mixins: [AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonCommandActive],
          propTypes: {
            editor: React.PropTypes.object.isRequired,
            label: React.PropTypes.string,
            tabIndex: React.PropTypes.number
          },
          statics: {key: 'imageCenter'},
          getDefaultProps: function getDefaultProps() {
            return {command: 'justifycenter'};
          },
          render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();
            return React.createElement('button', {
              'aria-label': AlloyEditor.Strings.alignCenter,
              'aria-pressed': cssClass.indexOf('pressed') !== -1,
              className: cssClass,
              'data-type': 'button-image-align-center',
              onClick: this.execCommand,
              tabIndex: this.props.tabIndex,
              title: AlloyEditor.Strings.alignCenter
            }, React.createElement('span', {className: 'ae-icon-align-center'}));
          }
        });
        AlloyEditor.Buttons[ButtonImageAlignCenter.key] = AlloyEditor.ButtonImageAlignCenter = ButtonImageAlignCenter;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonImageAlignLeft = React.createClass({
          displayName: 'ButtonImageAlignLeft',
          mixins: [AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonCommandActive],
          propTypes: {
            editor: React.PropTypes.object.isRequired,
            label: React.PropTypes.string,
            tabIndex: React.PropTypes.number
          },
          statics: {key: 'imageLeft'},
          getDefaultProps: function getDefaultProps() {
            return {command: 'justifyleft'};
          },
          render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();
            return React.createElement('button', {
              'aria-label': AlloyEditor.Strings.alignLeft,
              'aria-pressed': cssClass.indexOf('pressed') !== -1,
              className: cssClass,
              'data-type': 'button-image-align-left',
              onClick: this.execCommand,
              tabIndex: this.props.tabIndex,
              title: AlloyEditor.Strings.alignLeft
            }, React.createElement('span', {className: 'ae-icon-align-left'}));
          }
        });
        AlloyEditor.Buttons[ButtonImageAlignLeft.key] = AlloyEditor.ButtonImageAlignLeft = ButtonImageAlignLeft;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonImageAlignRight = React.createClass({
          displayName: 'ButtonImageAlignRight',
          mixins: [AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonCommandActive],
          propTypes: {
            editor: React.PropTypes.object.isRequired,
            label: React.PropTypes.string,
            tabIndex: React.PropTypes.number
          },
          statics: {key: 'imageRight'},
          getDefaultProps: function getDefaultProps() {
            return {command: 'justifyright'};
          },
          render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();
            return React.createElement('button', {
              'aria-label': AlloyEditor.Strings.alignRight,
              'aria-pressed': cssClass.indexOf('pressed') !== -1,
              className: cssClass,
              'data-type': 'button-image-align-right',
              onClick: this.execCommand,
              tabIndex: this.props.tabIndex,
              title: AlloyEditor.Strings.alignRight
            }, React.createElement('span', {className: 'ae-icon-align-right'}));
          }
        });
        AlloyEditor.Buttons[ButtonImageAlignRight.key] = AlloyEditor.ButtonImageAlignRight = ButtonImageAlignRight;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonImage = React.createClass({
          displayName: 'ButtonImage',
          propTypes: {
            editor: React.PropTypes.object.isRequired,
            label: React.PropTypes.string,
            tabIndex: React.PropTypes.number
          },
          statics: {key: 'image'},
          render: function render() {
            var inputSyle = {display: 'none'};
            return React.createElement('div', null, React.createElement('button', {
              'aria-label': AlloyEditor.Strings.image,
              className: 'ae-button',
              'data-type': 'button-image',
              onClick: this.handleClick,
              tabIndex: this.props.tabIndex,
              title: AlloyEditor.Strings.image
            }, React.createElement('span', {className: 'ae-icon-image'})), React.createElement('input', {
              accept: 'image/*',
              onChange: this._onInputChange,
              ref: 'fileInput',
              style: inputSyle,
              type: 'file'
            }));
          },
          handleClick: function handleClick(event) {
            ReactDOM.findDOMNode(this.refs.fileInput).click();
          },
          _onInputChange: function _onInputChange() {
            var inputEl = ReactDOM.findDOMNode(this.refs.fileInput);
            if (!inputEl.files.length) {
              return;
            }
            var reader = new FileReader();
            var file = inputEl.files[0];
            reader.onload = function(event) {
              var editor = this.props.editor.get('nativeEditor');
              var el = CKEDITOR.dom.element.createFromHtml('<img src="' + event.target.result + '">');
              editor.insertElement(el);
              editor.fire('actionPerformed', this);
              var imageData = {
                el: el,
                file: file
              };
              editor.fire('imageAdd', imageData);
            }.bind(this);
            reader.readAsDataURL(file);
            inputEl.value = '';
          }
        });
        AlloyEditor.Buttons[ButtonImage.key] = AlloyEditor.ButtonImage = ButtonImage;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonItalic = React.createClass({
          displayName: 'ButtonItalic',
          mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonKeystroke],
          propTypes: {
            editor: React.PropTypes.object.isRequired,
            label: React.PropTypes.string,
            tabIndex: React.PropTypes.number
          },
          statics: {key: 'italic'},
          getDefaultProps: function getDefaultProps() {
            return {
              command: 'italic',
              keystroke: {
                fn: 'execCommand',
                keys: CKEDITOR.CTRL + 73
              },
              style: {element: 'em'}
            };
          },
          render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();
            return React.createElement('button', {
              'aria-label': AlloyEditor.Strings.italic,
              'aria-pressed': cssClass.indexOf('pressed') !== -1,
              className: cssClass,
              'data-type': 'button-italic',
              onClick: this.execCommand,
              tabIndex: this.props.tabIndex,
              title: AlloyEditor.Strings.italic
            }, React.createElement('span', {className: 'ae-icon-italic'}));
          }
        });
        AlloyEditor.Buttons[ButtonItalic.key] = AlloyEditor.ButtonItalic = ButtonItalic;
      })();
      'use strict';
      (function() {
        'use strict';
        var KEY_ENTER = 13;
        var KEY_ESC = 27;
        var ButtonLinkEdit = React.createClass({
          displayName: 'ButtonLinkEdit',
          mixins: [AlloyEditor.WidgetDropdown],
          propTypes: {
            allowedTargets: React.PropTypes.arrayOf(React.PropTypes.object),
            appendProtocol: React.PropTypes.bool,
            editor: React.PropTypes.object.isRequired,
            defaultLinkTarget: React.PropTypes.string,
            showTargetSelector: React.PropTypes.bool
          },
          statics: {key: 'linkEdit'},
          componentDidMount: function componentDidMount() {
            if (this.props.renderExclusive || this.props.manualSelection) {
              if (window.requestAnimationFrame) {
                window.requestAnimationFrame(this._focusLinkInput);
              } else {
                setTimeout(this._focusLinkInput, 0);
              }
            }
          },
          componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
            this.replaceState(this.getInitialState());
          },
          getDefaultProps: function getDefaultProps() {
            return {
              defaultLinkTarget: '',
              showTargetSelector: true,
              appendProtocol: true
            };
          },
          getInitialState: function getInitialState() {
            var link = new CKEDITOR.Link(this.props.editor.get('nativeEditor')).getFromSelection();
            var href = link ? link.getAttribute('href') : '';
            var target = link ? link.getAttribute('target') : this.props.defaultLinkTarget;
            return {
              element: link,
              initialLink: {
                href: href,
                target: target
              },
              linkHref: href,
              linkTarget: target
            };
          },
          render: function render() {
            var clearLinkStyle = {opacity: this.state.linkHref ? 1 : 0};
            var targetSelector;
            if (this.props.showTargetSelector) {
              var targetSelectorProps = {
                allowedTargets: this._getAllowedTargetItems(),
                editor: this.props.editor,
                handleLinkTargetChange: this._handleLinkTargetChange,
                onDismiss: this.props.toggleDropdown,
                selectedTarget: this.state.linkTarget || AlloyEditor.Strings.linkTargetDefault
              };
              targetSelectorProps = this.mergeDropdownProps(targetSelectorProps, AlloyEditor.ButtonLinkTargetEdit.key);
              targetSelector = React.createElement(AlloyEditor.ButtonLinkTargetEdit, targetSelectorProps);
            }
            return React.createElement('div', {className: 'ae-container-edit-link'}, React.createElement('button', {
              'aria-label': AlloyEditor.Strings.removeLink,
              className: 'ae-button',
              disabled: !this.state.element,
              onClick: this._removeLink,
              title: AlloyEditor.Strings.remove
            }, React.createElement('span', {className: 'ae-icon-unlink'})), React.createElement('div', {className: 'ae-container-input xxl'}, targetSelector, React.createElement('input', {
              className: 'ae-input',
              onChange: this._handleLinkHrefChange,
              onKeyDown: this._handleKeyDown,
              placeholder: AlloyEditor.Strings.editLink,
              ref: 'linkInput',
              type: 'text',
              value: this.state.linkHref
            }), React.createElement('button', {
              'aria-label': AlloyEditor.Strings.clearInput,
              className: 'ae-button ae-icon-remove',
              onClick: this._clearLink,
              style: clearLinkStyle,
              title: AlloyEditor.Strings.clear
            })), React.createElement('button', {
              'aria-label': AlloyEditor.Strings.confirm,
              className: 'ae-button',
              disabled: !this._isValidState(),
              onClick: this._updateLink,
              title: AlloyEditor.Strings.confirm
            }, React.createElement('span', {className: 'ae-icon-ok'})));
          },
          _clearLink: function _clearLink() {
            this.setState({linkHref: ''});
          },
          _focusLinkInput: function _focusLinkInput() {
            ReactDOM.findDOMNode(this.refs.linkInput).focus();
          },
          _getAllowedTargetItems: function _getAllowedTargetItems() {
            return this.props.allowedLinkTargets || [{
              label: AlloyEditor.Strings.linkTargetSelf,
              value: '_self'
            }, {
              label: AlloyEditor.Strings.linkTargetBlank,
              value: '_blank'
            }, {
              label: AlloyEditor.Strings.linkTargetParent,
              value: '_parent'
            }, {
              label: AlloyEditor.Strings.linkTargetTop,
              value: '_top'
            }];
          },
          _handleKeyDown: function _handleKeyDown(event) {
            if (event.keyCode === KEY_ENTER || event.keyCode === KEY_ESC) {
              event.preventDefault();
            }
            if (event.keyCode === KEY_ENTER) {
              this._updateLink();
            } else if (event.keyCode === KEY_ESC) {
              var editor = this.props.editor.get('nativeEditor');
              new CKEDITOR.Link(editor).advanceSelection();
              this.props.editor.get('nativeEditor').fire('actionPerformed', this);
            }
          },
          _handleLinkHrefChange: function _handleLinkHrefChange(event) {
            this.setState({linkHref: event.target.value});
          },
          _handleLinkTargetChange: function _handleLinkTargetChange(event) {
            this.setState({
              itemDropdown: null,
              linkTarget: event.target.getAttribute('data-value')
            });
          },
          _removeLink: function _removeLink() {
            var editor = this.props.editor.get('nativeEditor');
            var linkUtils = new CKEDITOR.Link(editor);
            var selection = editor.getSelection();
            var bookmarks = selection.createBookmarks();
            linkUtils.remove(this.state.element, {advance: true});
            selection.selectBookmarks(bookmarks);
            this.props.cancelExclusive();
            editor.fire('actionPerformed', this);
          },
          _updateLink: function _updateLink() {
            var editor = this.props.editor.get('nativeEditor');
            var linkUtils = new CKEDITOR.Link(editor, {appendProtocol: this.props.appendProtocol});
            var linkAttrs = {target: this.state.linkTarget};
            var modifySelection = {advance: true};
            if (this.state.linkHref) {
              if (this.state.element) {
                linkAttrs.href = this.state.linkHref;
                linkUtils.update(linkAttrs, this.state.element, modifySelection);
              } else {
                linkUtils.create(this.state.linkHref, linkAttrs, modifySelection);
              }
              editor.fire('actionPerformed', this);
            }
            this.props.cancelExclusive();
          },
          _isValidState: function _isValidState() {
            var validState = this.state.linkHref && (this.state.linkHref !== this.state.initialLink.href || this.state.linkTarget !== this.state.initialLink.target);
            return validState;
          }
        });
        AlloyEditor.Buttons[ButtonLinkEdit.key] = AlloyEditor.ButtonLinkEdit = ButtonLinkEdit;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonLinkTargetEdit = React.createClass({
          displayName: 'ButtonLinkTargetEdit',
          mixins: [AlloyEditor.WidgetFocusManager],
          propTypes: {
            allowedTargets: React.PropTypes.arrayOf(React.PropTypes.object),
            editor: React.PropTypes.object.isRequired,
            selectedTarget: React.PropTypes.string.isRequired
          },
          statics: {key: 'linkTargetEdit'},
          getDefaultProps: function getDefaultProps() {
            return {
              circular: false,
              descendants: '.ae-toolbar-element',
              keys: {
                dismiss: [27],
                dismissNext: [39],
                dismissPrev: [37],
                next: [40],
                prev: [38]
              }
            };
          },
          render: function render() {
            var allowedTargetsList;
            if (this.props.expanded) {
              allowedTargetsList = this._getAllowedTargetsList();
            }
            return React.createElement('div', {
              className: 'ae-container-edit-link-target ae-container-dropdown ae-container-dropdown-medium ae-has-dropdown',
              onFocus: this.focus,
              onKeyDown: this.handleKey,
              tabIndex: '0'
            }, React.createElement('button', {
              'aria-expanded': this.props.expanded,
              'aria-label': this.props.selectedTarget,
              className: 'ae-toolbar-element',
              onClick: this.props.toggleDropdown,
              role: 'combobox',
              tabIndex: this.props.tabIndex,
              title: this.props.selectedTarget
            }, React.createElement('div', {className: 'ae-container'}, React.createElement('span', {className: 'ae-container-dropdown-selected-item'}, this.props.selectedTarget), React.createElement('span', {className: 'ae-icon-arrow'}))), allowedTargetsList);
          },
          shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
            return nextProps.expanded !== this.props.expanded || nextProps.selectedTarget !== this.props.selectedTarget;
          },
          _getAllowedTargetsList: function _getAllowedTargetsList() {
            return React.createElement(AlloyEditor.ButtonDropdown, null, this._getAllowedTargetsListItems());
          },
          _getAllowedTargetsListItems: function _getAllowedTargetsListItems() {
            var handleLinkTargetChange = this.props.handleLinkTargetChange;
            var items = this.props.allowedTargets.map(function(item) {
              return React.createElement('li', {
                key: item.value,
                role: 'option'
              }, React.createElement('button', {
                className: 'ae-toolbar-element',
                'data-value': item.value,
                onClick: handleLinkTargetChange
              }, item.label));
            });
            return items;
          }
        });
        AlloyEditor.Buttons[ButtonLinkTargetEdit.key] = AlloyEditor.ButtonLinkTargetEdit = ButtonLinkTargetEdit;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonLink = React.createClass({
          displayName: 'ButtonLink',
          mixins: [AlloyEditor.ButtonKeystroke, AlloyEditor.ButtonStateClasses],
          propTypes: {
            editor: React.PropTypes.object.isRequired,
            label: React.PropTypes.string,
            tabIndex: React.PropTypes.number
          },
          statics: {key: 'link'},
          getDefaultProps: function getDefaultProps() {
            return {keystroke: {
                fn: '_requestExclusive',
                keys: CKEDITOR.CTRL + 76
              }};
          },
          isActive: function isActive() {
            return new CKEDITOR.Link(this.props.editor.get('nativeEditor')).getFromSelection() !== null;
          },
          render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();
            if (this.props.renderExclusive) {
              return React.createElement(AlloyEditor.ButtonLinkEdit, this.props);
            } else {
              return React.createElement('button', {
                'aria-label': AlloyEditor.Strings.link,
                className: cssClass,
                'data-type': 'button-link',
                onClick: this._requestExclusive,
                tabIndex: this.props.tabIndex,
                title: AlloyEditor.Strings.link
              }, React.createElement('span', {className: 'ae-icon-link'}));
            }
          },
          _requestExclusive: function _requestExclusive() {
            this.props.requestExclusive(ButtonLink.key);
          }
        });
        AlloyEditor.Buttons[ButtonLink.key] = AlloyEditor.ButtonLink = ButtonLink;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonOrderedList = React.createClass({
          displayName: 'ButtonOrderedList',
          mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],
          propTypes: {
            editor: React.PropTypes.object.isRequired,
            label: React.PropTypes.string,
            tabIndex: React.PropTypes.number
          },
          statics: {key: 'ol'},
          getDefaultProps: function getDefaultProps() {
            return {
              command: 'numberedlist',
              style: {element: 'ol'}
            };
          },
          render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();
            return React.createElement('button', {
              'aria-label': AlloyEditor.Strings.numberedlist,
              'aria-pressed': cssClass.indexOf('pressed') !== -1,
              className: cssClass,
              'data-type': 'button-ol',
              onClick: this.execCommand,
              tabIndex: this.props.tabIndex,
              title: AlloyEditor.Strings.numberedlist
            }, React.createElement('span', {className: 'ae-icon-numbered-list'}));
          }
        });
        AlloyEditor.Buttons[ButtonOrderedList.key] = AlloyEditor.ButtonOrderedList = ButtonOrderedList;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonParagraphAlignLeft = React.createClass({
          displayName: 'ButtonParagraphAlignLeft',
          mixins: [AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonCommandActive],
          propTypes: {
            editor: React.PropTypes.object.isRequired,
            label: React.PropTypes.string,
            tabIndex: React.PropTypes.number
          },
          statics: {key: 'paragraphLeft'},
          getDefaultProps: function getDefaultProps() {
            return {command: 'justifyleft'};
          },
          render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();
            return React.createElement('button', {
              'aria-label': AlloyEditor.Strings.alignLeft,
              'aria-pressed': cssClass.indexOf('pressed') !== -1,
              className: cssClass,
              'data-type': 'button-paragraph-align-left',
              onClick: this.execCommand,
              tabIndex: this.props.tabIndex,
              title: AlloyEditor.Strings.alignLeft
            }, React.createElement('span', {className: 'ae-icon-align-left'}));
          }
        });
        AlloyEditor.Buttons[ButtonParagraphAlignLeft.key] = AlloyEditor.ButtonParagraphAlignLeft = ButtonParagraphAlignLeft;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonParagraphAlignRight = React.createClass({
          displayName: 'ButtonParagraphAlignRight',
          mixins: [AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonCommandActive],
          propTypes: {
            editor: React.PropTypes.object.isRequired,
            label: React.PropTypes.string,
            tabIndex: React.PropTypes.number
          },
          statics: {key: 'paragraphRight'},
          getDefaultProps: function getDefaultProps() {
            return {command: 'justifyright'};
          },
          render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();
            return React.createElement('button', {
              'aria-label': AlloyEditor.Strings.alignRight,
              'aria-pressed': cssClass.indexOf('pressed') !== -1,
              className: cssClass,
              'data-type': 'button-paragraph-align-right',
              onClick: this.execCommand,
              tabIndex: this.props.tabIndex,
              title: AlloyEditor.Strings.alignRight
            }, React.createElement('span', {className: 'ae-icon-align-right'}));
          }
        });
        AlloyEditor.Buttons[ButtonParagraphAlignRight.key] = AlloyEditor.ButtonParagraphAlignRight = ButtonParagraphAlignRight;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonParagraphCenter = React.createClass({
          displayName: 'ButtonParagraphCenter',
          mixins: [AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonCommandActive],
          propTypes: {
            editor: React.PropTypes.object.isRequired,
            label: React.PropTypes.string,
            tabIndex: React.PropTypes.number
          },
          statics: {key: 'paragraphCenter'},
          getDefaultProps: function getDefaultProps() {
            return {command: 'justifycenter'};
          },
          render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();
            return React.createElement('button', {
              'aria-label': AlloyEditor.Strings.alignCenter,
              'aria-pressed': cssClass.indexOf('pressed') !== -1,
              className: cssClass,
              'data-type': 'button-paragraph-center',
              onClick: this.execCommand,
              tabIndex: this.props.tabIndex,
              title: AlloyEditor.Strings.alignCenter
            }, React.createElement('span', {className: 'ae-icon-align-center'}));
          }
        });
        AlloyEditor.Buttons[ButtonParagraphCenter.key] = AlloyEditor.ButtonParagraphCenter = ButtonParagraphCenter;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonParagraphJustify = React.createClass({
          displayName: 'ButtonParagraphJustify',
          mixins: [AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonCommandActive],
          propTypes: {
            editor: React.PropTypes.object.isRequired,
            label: React.PropTypes.string,
            tabIndex: React.PropTypes.number
          },
          statics: {key: 'paragraphJustify'},
          getDefaultProps: function getDefaultProps() {
            return {command: 'justifyblock'};
          },
          render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();
            return React.createElement('button', {
              'aria-label': AlloyEditor.Strings.alignJustify,
              'aria-pressed': cssClass.indexOf('pressed') !== -1,
              className: cssClass,
              'data-type': 'button-paragraph-justify',
              onClick: this.execCommand,
              tabIndex: this.props.tabIndex,
              title: AlloyEditor.Strings.alignJustify
            }, React.createElement('span', {className: 'ae-icon-align-justified'}));
          }
        });
        AlloyEditor.Buttons[ButtonParagraphJustify.key] = AlloyEditor.ButtonParagraphJustify = ButtonParagraphJustify;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonQuote = React.createClass({
          displayName: 'ButtonQuote',
          mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],
          propTypes: {
            editor: React.PropTypes.object.isRequired,
            label: React.PropTypes.string,
            tabIndex: React.PropTypes.number
          },
          statics: {key: 'quote'},
          getDefaultProps: function getDefaultProps() {
            return {
              command: 'blockquote',
              style: {element: 'blockquote'}
            };
          },
          render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();
            return React.createElement('button', {
              'aria-label': AlloyEditor.Strings.quote,
              'aria-pressed': cssClass.indexOf('pressed') !== -1,
              className: cssClass,
              'data-type': 'button-quote',
              onClick: this.execCommand,
              tabIndex: this.props.tabIndex,
              title: AlloyEditor.Strings.quote
            }, React.createElement('span', {className: 'ae-icon-quote'}));
          }
        });
        AlloyEditor.Buttons[ButtonQuote.key] = AlloyEditor.ButtonQuote = ButtonQuote;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonRemoveFormat = React.createClass({
          displayName: 'ButtonRemoveFormat',
          mixins: [AlloyEditor.ButtonCommand],
          propTypes: {
            editor: React.PropTypes.object.isRequired,
            label: React.PropTypes.string,
            tabIndex: React.PropTypes.number
          },
          statics: {key: 'removeFormat'},
          getDefaultProps: function getDefaultProps() {
            return {command: 'removeFormat'};
          },
          render: function render() {
            return React.createElement('button', {
              'aria-label': AlloyEditor.Strings.removeformat,
              className: 'ae-button',
              'data-type': 'button-removeformat',
              onClick: this.execCommand,
              tabIndex: this.props.tabIndex,
              title: AlloyEditor.Strings.removeformat
            }, React.createElement('span', {className: 'ae-icon-removeformat'}));
          }
        });
        AlloyEditor.Buttons[ButtonRemoveFormat.key] = AlloyEditor.ButtonRemoveFormat = ButtonRemoveFormat;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonStrike = React.createClass({
          displayName: 'ButtonStrike',
          mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],
          propTypes: {
            editor: React.PropTypes.object.isRequired,
            label: React.PropTypes.string,
            tabIndex: React.PropTypes.number
          },
          statics: {key: 'strike'},
          getDefaultProps: function getDefaultProps() {
            return {
              command: 'strike',
              style: {element: 's'}
            };
          },
          render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();
            return React.createElement('button', {
              'aria-label': AlloyEditor.Strings.strike,
              'aria-pressed': cssClass.indexOf('pressed') !== -1,
              className: cssClass,
              'data-type': 'button-strike',
              onClick: this.execCommand,
              tabIndex: this.props.tabIndex,
              title: AlloyEditor.Strings.strike
            }, React.createElement('span', {className: 'ae-icon-strike'}));
          }
        });
        AlloyEditor.Buttons[ButtonStrike.key] = AlloyEditor.ButtonStrike = ButtonStrike;
      })();
      "use strict";
      (function() {
        'use strict';
        var ButtonsStylesListHeader = React.createClass({
          displayName: "ButtonsStylesListHeader",
          render: function render() {
            if (this.props.styles && this.props.styles.length) {
              return React.createElement("span", {className: "ae-list-header"}, this.props.name);
            } else {
              return null;
            }
          }
        });
        AlloyEditor.ButtonsStylesListHeader = ButtonsStylesListHeader;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonStylesListItemRemove = React.createClass({
          displayName: 'ButtonStylesListItemRemove',
          propTypes: {
            editor: React.PropTypes.object.isRequired,
            label: React.PropTypes.string,
            removeBlocks: React.PropTypes.array,
            tabIndex: React.PropTypes.number
          },
          statics: {key: 'buttonStylesListItemRemove'},
          getDefaultProps: function getDefaultProps() {
            return {removeBlocks: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre']};
          },
          render: function render() {
            return React.createElement('li', {role: 'option'}, React.createElement('button', {
              className: 'ae-toolbar-element',
              onClick: this._removeStyles,
              tabIndex: this.props.tabIndex
            }, AlloyEditor.Strings.normal));
          },
          _removeStyles: function _removeStyles() {
            var editor = this.props.editor.get('nativeEditor');
            editor.execCommand('removeFormat');
            this.props.removeBlocks.forEach(function(blockItem) {
              var blockStyle = new CKEDITOR.style({element: blockItem});
              editor.removeStyle(blockStyle);
            });
            editor.fire('actionPerformed', this);
          }
        });
        AlloyEditor.ButtonStylesListItemRemove = ButtonStylesListItemRemove;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonStylesListItem = React.createClass({
          displayName: 'ButtonStylesListItem',
          mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonActionStyle],
          statics: {key: 'buttonStylesListItem'},
          componentWillMount: function componentWillMount() {
            var styleCfg = {
              element: 'span',
              styles: {margin: 0}
            };
            styleCfg = CKEDITOR.tools.merge(styleCfg, this.props.style);
            this._preview = new CKEDITOR.style(styleCfg).buildPreview(this.props.name);
          },
          render: function render() {
            return React.createElement('button', {
              className: 'ae-toolbar-element',
              dangerouslySetInnerHTML: {__html: this._preview},
              onClick: this._onClick,
              tabIndex: this.props.tabIndex
            });
          },
          _onClick: function _onClick() {
            this.props.editor.get('nativeEditor').execCommand('removeFormat');
            this.applyStyle();
          }
        });
        AlloyEditor.ButtonStylesListItem = ButtonStylesListItem;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonStylesList = React.createClass({
          displayName: 'ButtonStylesList',
          mixins: [AlloyEditor.WidgetFocusManager],
          statics: {key: 'buttonStylesList'},
          componentDidMount: function componentDidMount() {
            ReactDOM.findDOMNode(this).focus();
          },
          componentWillMount: function componentWillMount() {
            var blockStyles = [];
            var inlineStyles = [];
            var objectStyles = [];
            this.props.styles.forEach(function(item) {
              var style = new CKEDITOR.style(item.style);
              if (style.type === CKEDITOR.STYLE_BLOCK) {
                blockStyles.push(item);
              } else if (style.type === CKEDITOR.STYLE_INLINE) {
                inlineStyles.push(item);
              } else if (style.type === CKEDITOR.STYLE_OBJECT) {
                objectStyles.push(item);
              }
            });
            this._blockStyles = blockStyles;
            this._inlineStyles = inlineStyles;
            this._objectStyles = objectStyles;
          },
          getDefaultProps: function getDefaultProps() {
            return {
              circular: false,
              descendants: '.ae-toolbar-element',
              keys: {
                dismiss: [27],
                dismissNext: [39],
                dismissPrev: [37],
                next: [40],
                prev: [38]
              },
              showRemoveStylesItem: true
            };
          },
          render: function render() {
            var removeStylesItem;
            if (this.props.showRemoveStylesItem) {
              removeStylesItem = React.createElement(AlloyEditor.ButtonStylesListItemRemove, {editor: this.props.editor});
            }
            return React.createElement('div', {
              className: 'ae-dropdown ae-arrow-box ae-arrow-box-top-left',
              onFocus: this.focus,
              onKeyDown: this.handleKey,
              tabIndex: '0'
            }, React.createElement('ul', {
              className: 'ae-listbox',
              role: 'listbox'
            }, removeStylesItem, React.createElement(AlloyEditor.ButtonsStylesListHeader, {
              name: AlloyEditor.Strings.blockStyles,
              styles: this._blockStyles
            }), this._renderStylesItems(this._blockStyles), React.createElement(AlloyEditor.ButtonsStylesListHeader, {
              name: AlloyEditor.Strings.inlineStyles,
              styles: this._inlineStyles
            }), this._renderStylesItems(this._inlineStyles), React.createElement(AlloyEditor.ButtonsStylesListHeader, {
              name: AlloyEditor.Strings.objectStyles,
              styles: this._objectStyles
            }), this._renderStylesItems(this._objectStyles)));
          },
          _renderStylesItems: function _renderStylesItems(styles) {
            var editor = this.props.editor;
            var items;
            if (styles && styles.length) {
              items = styles.map(function(item) {
                return React.createElement('li', {
                  key: item.name,
                  role: 'option'
                }, React.createElement(AlloyEditor.ButtonStylesListItem, {
                  editor: editor,
                  name: item.name,
                  style: item.style
                }));
              });
            }
            return items;
          }
        });
        AlloyEditor.ButtonStylesList = ButtonStylesList;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonStyles = React.createClass({
          displayName: 'ButtonStyles',
          propTypes: {
            editor: React.PropTypes.object.isRequired,
            expanded: React.PropTypes.bool,
            label: React.PropTypes.string,
            showRemoveStylesItem: React.PropTypes.bool,
            styles: React.PropTypes.arrayOf(React.PropTypes.object),
            tabIndex: React.PropTypes.number,
            toggleDropdown: React.PropTypes.func
          },
          statics: {key: 'styles'},
          render: function render() {
            var activeStyle = AlloyEditor.Strings.normal;
            var styles = this._getStyles();
            styles.forEach(function(item) {
              if (this._checkActive(item.style)) {
                activeStyle = item.name;
              }
            }.bind(this));
            var buttonStylesList;
            if (this.props.expanded) {
              buttonStylesList = React.createElement(AlloyEditor.ButtonStylesList, {
                editor: this.props.editor,
                onDismiss: this.props.toggleDropdown,
                showRemoveStylesItem: this.props.showRemoveStylesItem,
                styles: styles
              });
            }
            return React.createElement('div', {className: 'ae-container-dropdown ae-has-dropdown'}, React.createElement('button', {
              'aria-expanded': this.props.expanded,
              'aria-label': AlloyEditor.Strings.styles + ' ' + activeStyle,
              className: 'ae-toolbar-element',
              onClick: this.props.toggleDropdown,
              role: 'combobox',
              tabIndex: this.props.tabIndex,
              title: AlloyEditor.Strings.styles + ' ' + activeStyle
            }, React.createElement('div', {className: 'ae-container'}, React.createElement('span', {className: 'ae-container-dropdown-selected-item'}, activeStyle), React.createElement('span', {className: 'ae-icon-arrow'}))), buttonStylesList);
          },
          _checkActive: function _checkActive(styleConfig) {
            var nativeEditor = this.props.editor.get('nativeEditor');
            styleConfig = CKEDITOR.tools.merge({element: 'span'}, styleConfig);
            var style = new CKEDITOR.style(styleConfig);
            return style.checkActive(nativeEditor.elementPath(), nativeEditor);
          },
          _getStyles: function _getStyles() {
            return this.props.styles || [{
              name: AlloyEditor.Strings.h1,
              style: {element: 'h1'}
            }, {
              name: AlloyEditor.Strings.h2,
              style: {element: 'h2'}
            }, {
              name: AlloyEditor.Strings.formatted,
              style: {element: 'pre'}
            }, {
              name: AlloyEditor.Strings.cite,
              style: {element: 'cite'}
            }, {
              name: AlloyEditor.Strings.code,
              style: {element: 'code'}
            }];
          }
        });
        AlloyEditor.Buttons[ButtonStyles.key] = AlloyEditor.ButtonStyles = ButtonStyles;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonSubscript = React.createClass({
          displayName: 'ButtonSubscript',
          mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],
          propTypes: {
            editor: React.PropTypes.object.isRequired,
            label: React.PropTypes.string,
            tabIndex: React.PropTypes.number
          },
          statics: {key: 'subscript'},
          getDefaultProps: function getDefaultProps() {
            return {
              command: 'subscript',
              style: {element: 'sub'}
            };
          },
          render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();
            return React.createElement('button', {
              'aria-label': AlloyEditor.Strings.subscript,
              'aria-pressed': cssClass.indexOf('pressed') !== -1,
              className: cssClass,
              'data-type': 'button-subscript',
              onClick: this.execCommand,
              tabIndex: this.props.tabIndex,
              title: AlloyEditor.Strings.subscript
            }, React.createElement('span', {className: 'ae-icon-subscript'}));
          }
        });
        AlloyEditor.Buttons[ButtonSubscript.key] = AlloyEditor.ButtonSubscript = ButtonSubscript;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonSuperscript = React.createClass({
          displayName: 'ButtonSuperscript',
          mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],
          propTypes: {
            editor: React.PropTypes.object.isRequired,
            label: React.PropTypes.string,
            tabIndex: React.PropTypes.number
          },
          statics: {key: 'superscript'},
          getDefaultProps: function getDefaultProps() {
            return {
              command: 'superscript',
              style: {element: 'sup'}
            };
          },
          render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();
            return React.createElement('button', {
              'aria-label': AlloyEditor.Strings.superscript,
              'aria-pressed': cssClass.indexOf('pressed') !== -1,
              className: cssClass,
              'data-type': 'button-superscript',
              onClick: this.execCommand,
              tabIndex: this.props.tabIndex,
              title: AlloyEditor.Strings.superscript
            }, React.createElement('span', {className: 'ae-icon-superscript'}));
          }
        });
        AlloyEditor.Buttons[ButtonSuperscript.key] = AlloyEditor.ButtonSuperscript = ButtonSuperscript;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonTableCell = React.createClass({
          displayName: 'ButtonTableCell',
          propTypes: {
            commands: React.PropTypes.arrayOf(React.PropTypes.object),
            editor: React.PropTypes.object.isRequired,
            expanded: React.PropTypes.bool,
            label: React.PropTypes.string,
            tabIndex: React.PropTypes.number,
            toggleDropdown: React.PropTypes.func
          },
          statics: {key: 'tableCell'},
          render: function render() {
            var buttonCommandsList;
            var buttonCommandsListId;
            if (this.props.expanded) {
              buttonCommandsListId = ButtonTableCell.key + 'List';
              buttonCommandsList = React.createElement(AlloyEditor.ButtonCommandsList, {
                commands: this._getCommands(),
                editor: this.props.editor,
                listId: buttonCommandsListId,
                onDismiss: this.props.toggleDropdown
              });
            }
            return React.createElement('div', {className: 'ae-container ae-has-dropdown'}, React.createElement('button', {
              'aria-expanded': this.props.expanded,
              'aria-label': AlloyEditor.Strings.cell,
              'aria-owns': buttonCommandsListId,
              className: 'ae-button',
              onClick: this.props.toggleDropdown,
              tabIndex: this.props.tabIndex,
              title: AlloyEditor.Strings.cell
            }, React.createElement('span', {className: 'ae-icon-cell'})), buttonCommandsList);
          },
          _getCommands: function _getCommands() {
            return this.props.commands || [{
              command: 'cellInsertBefore',
              label: AlloyEditor.Strings.cellInsertBefore
            }, {
              command: 'cellInsertAfter',
              label: AlloyEditor.Strings.cellInsertAfter
            }, {
              command: 'cellDelete',
              label: AlloyEditor.Strings.cellDelete
            }, {
              command: 'cellMerge',
              label: AlloyEditor.Strings.cellMerge
            }, {
              command: 'cellMergeDown',
              label: AlloyEditor.Strings.cellMergeDown
            }, {
              command: 'cellMergeRight',
              label: AlloyEditor.Strings.cellMergeRight
            }, {
              command: 'cellHorizontalSplit',
              label: AlloyEditor.Strings.cellSplitHorizontal
            }, {
              command: 'cellVerticalSplit',
              label: AlloyEditor.Strings.cellSplitVertical
            }];
          }
        });
        AlloyEditor.Buttons[ButtonTableCell.key] = AlloyEditor.ButtonTableCell = ButtonTableCell;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonTableColumn = React.createClass({
          displayName: 'ButtonTableColumn',
          propTypes: {
            commands: React.PropTypes.arrayOf(React.PropTypes.object),
            editor: React.PropTypes.object.isRequired,
            expanded: React.PropTypes.bool,
            label: React.PropTypes.string,
            tabIndex: React.PropTypes.number,
            toggleDropdown: React.PropTypes.func
          },
          statics: {key: 'tableColumn'},
          render: function render() {
            var buttonCommandsList,
                buttonCommandsListId;
            if (this.props.expanded) {
              buttonCommandsListId = ButtonTableColumn.key + 'List';
              buttonCommandsList = React.createElement(AlloyEditor.ButtonCommandsList, {
                commands: this._getCommands(),
                editor: this.props.editor,
                listId: buttonCommandsListId,
                onDismiss: this.props.toggleDropdown
              });
            }
            return React.createElement('div', {className: 'ae-container ae-has-dropdown'}, React.createElement('button', {
              'aria-expanded': this.props.expanded,
              'aria-label': AlloyEditor.Strings.column,
              'aria-owns': buttonCommandsListId,
              className: 'ae-button',
              onClick: this.props.toggleDropdown,
              role: 'listbox',
              tabIndex: this.props.tabIndex,
              title: AlloyEditor.Strings.column
            }, React.createElement('span', {className: 'ae-icon-column'})), buttonCommandsList);
          },
          _getCommands: function _getCommands() {
            return this.props.commands || [{
              command: 'columnInsertBefore',
              label: AlloyEditor.Strings.columnInsertBefore
            }, {
              command: 'columnInsertAfter',
              label: AlloyEditor.Strings.columnInsertAfter
            }, {
              command: 'columnDelete',
              label: AlloyEditor.Strings.columnDelete
            }];
          }
        });
        AlloyEditor.Buttons[ButtonTableColumn.key] = AlloyEditor.ButtonTableColumn = ButtonTableColumn;
      })();
      'use strict';
      (function() {
        'use strict';
        var KEY_ENTER = 13;
        var KEY_ESC = 27;
        var ButtonTableEdit = React.createClass({
          displayName: 'ButtonTableEdit',
          propTypes: {
            cancelExclusive: React.PropTypes.func.isRequired,
            editor: React.PropTypes.object.isRequired
          },
          statics: {key: 'tableEdit'},
          getDefaultProps: function getDefaultProps() {
            return {tableAttributes: {
                border: 1,
                cellPadding: 0,
                cellSpacing: 0,
                style: 'width: 100%'
              }};
          },
          componentDidMount: function componentDidMount() {
            ReactDOM.findDOMNode(this.refs.rows).focus();
          },
          getInitialState: function getInitialState() {
            return {
              cols: 3,
              rows: 3
            };
          },
          _createTable: function _createTable() {
            var editor = this.props.editor.get('nativeEditor');
            var tableUtils = new CKEDITOR.Table(editor);
            tableUtils.create({
              attrs: this.props.tableAttributes,
              cols: this.state.cols,
              rows: this.state.rows
            });
            this.props.cancelExclusive();
            editor.fire('actionPerformed', this);
          },
          _handleChange: function _handleChange(inputName, event) {
            var state = {};
            state[inputName] = event.target.value;
            this.setState(state);
          },
          _handleKeyDown: function _handleKeyDown(event) {
            if (event.keyCode === KEY_ENTER || event.keyCode === KEY_ESC) {
              event.preventDefault();
            }
            if (event.keyCode === KEY_ENTER) {
              this._createTable();
            } else if (event.keyCode === KEY_ESC) {
              this.props.cancelExclusive();
            }
          },
          render: function render() {
            var time = Date.now();
            var rowsId = time + 'rows';
            var colsId = time + 'cols';
            return React.createElement('div', {className: 'ae-container-edit-table'}, React.createElement('label', {htmlFor: rowsId}, 'Rows'), React.createElement('div', {className: 'ae-container-input small'}, React.createElement('input', {
              className: 'ae-input',
              id: rowsId,
              onChange: this._handleChange.bind(this, 'rows'),
              min: '1',
              onKeyDown: this._handleKeyDown,
              placeholder: 'Rows',
              ref: 'rows',
              type: 'number',
              value: this.state.rows
            })), React.createElement('label', {htmlFor: colsId}, 'Cols'), React.createElement('div', {className: 'ae-container-input small'}, React.createElement('input', {
              className: 'ae-input',
              id: colsId,
              onChange: this._handleChange.bind(this, 'cols'),
              min: '1',
              onKeyDown: this._handleKeyDown,
              placeholder: 'Colums',
              ref: 'cols',
              type: 'number',
              value: this.state.cols
            })), React.createElement('button', {
              'aria-label': 'Confirm',
              className: 'ae-button',
              onClick: this._createTable
            }, React.createElement('span', {className: 'ae-icon-ok'})));
          }
        });
        AlloyEditor.Buttons[ButtonTableEdit.key] = AlloyEditor.ButtonTableEdit = ButtonTableEdit;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonTableHeading = React.createClass({
          displayName: 'ButtonTableHeading',
          propTypes: {
            commands: React.PropTypes.arrayOf(React.PropTypes.object),
            editor: React.PropTypes.object.isRequired,
            expanded: React.PropTypes.bool,
            label: React.PropTypes.string,
            tabIndex: React.PropTypes.number,
            toggleDropdown: React.PropTypes.func
          },
          statics: {key: 'tableHeading'},
          render: function render() {
            var buttonCommandsList;
            var buttonCommandsListId;
            if (this.props.expanded) {
              buttonCommandsListId = ButtonTableHeading.key + 'List';
              buttonCommandsList = React.createElement(AlloyEditor.ButtonCommandsList, {
                commands: this._getCommands(),
                editor: this.props.editor,
                listId: buttonCommandsListId,
                onDismiss: this.props.toggleDropdown
              });
            }
            var activeHeading = new CKEDITOR.Table(this.props.editor.get('nativeEditor')).getHeading();
            var activeHeadingIntro = AlloyEditor.Strings.headers + ':';
            var activeHeadingLabel = AlloyEditor.Strings['headers' + activeHeading];
            return React.createElement('div', {className: 'ae-container-dropdown-xl ae-has-dropdown'}, React.createElement('button', {
              'aria-expanded': this.props.expanded,
              'aria-label': '',
              className: 'ae-toolbar-element',
              onClick: this.props.toggleDropdown,
              role: 'combobox',
              tabIndex: this.props.tabIndex,
              title: ''
            }, React.createElement('div', {className: 'ae-container'}, React.createElement('span', {className: 'ae-container-dropdown-selected-item'}, activeHeadingIntro, ' ', React.createElement('strong', null, activeHeadingLabel)), React.createElement('span', {className: 'ae-icon-arrow'}))), buttonCommandsList);
          },
          _getCommands: function _getCommands() {
            return this.props.commands || [{
              command: 'tableHeadingNone',
              label: AlloyEditor.Strings.headersNone
            }, {
              command: 'tableHeadingRow',
              label: AlloyEditor.Strings.headersRow
            }, {
              command: 'tableHeadingColumn',
              label: AlloyEditor.Strings.headersColumn
            }, {
              command: 'tableHeadingBoth',
              label: AlloyEditor.Strings.headersBoth
            }];
          }
        });
        AlloyEditor.Buttons[ButtonTableHeading.key] = AlloyEditor.ButtonTableHeading = ButtonTableHeading;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonTableRemove = React.createClass({
          displayName: 'ButtonTableRemove',
          propTypes: {
            editor: React.PropTypes.object.isRequired,
            label: React.PropTypes.string,
            tabIndex: React.PropTypes.number
          },
          statics: {key: 'tableRemove'},
          render: function render() {
            return React.createElement('button', {
              'aria-label': AlloyEditor.Strings.deleteTable,
              className: 'ae-button',
              'data-type': 'button-table-remove',
              onClick: this._removeTable,
              tabIndex: this.props.tabIndex,
              title: AlloyEditor.Strings.deleteTable
            }, React.createElement('span', {className: 'ae-icon-close'}));
          },
          _removeTable: function _removeTable() {
            var editor = this.props.editor.get('nativeEditor');
            var tableUtils = new CKEDITOR.Table(editor);
            tableUtils.remove();
            editor.fire('actionPerformed', this);
          }
        });
        AlloyEditor.Buttons[ButtonTableRemove.key] = AlloyEditor.ButtonTableRemove = ButtonTableRemove;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonTableRow = React.createClass({
          displayName: 'ButtonTableRow',
          propTypes: {
            commands: React.PropTypes.arrayOf(React.PropTypes.object),
            editor: React.PropTypes.object.isRequired,
            expanded: React.PropTypes.bool,
            label: React.PropTypes.string,
            tabIndex: React.PropTypes.number,
            toggleDropdown: React.PropTypes.func
          },
          statics: {key: 'tableRow'},
          render: function render() {
            var buttonCommandsList;
            var buttonCommandsListId;
            if (this.props.expanded) {
              buttonCommandsListId = ButtonTableRow.key + 'List';
              buttonCommandsList = React.createElement(AlloyEditor.ButtonCommandsList, {
                commands: this._getCommands(),
                editor: this.props.editor,
                listId: buttonCommandsListId,
                onDismiss: this.props.toggleDropdown
              });
            }
            return React.createElement('div', {className: 'ae-container ae-has-dropdown'}, React.createElement('button', {
              'aria-expanded': this.props.expanded,
              'aria-label': AlloyEditor.Strings.row,
              'aria-owns': buttonCommandsListId,
              className: 'ae-button',
              onClick: this.props.toggleDropdown,
              role: 'combobox',
              tabIndex: this.props.tabIndex,
              title: AlloyEditor.Strings.row
            }, React.createElement('span', {className: 'ae-icon-row'})), buttonCommandsList);
          },
          _getCommands: function _getCommands() {
            return this.props.commands || [{
              command: 'rowInsertBefore',
              label: AlloyEditor.Strings.rowInsertBefore
            }, {
              command: 'rowInsertAfter',
              label: AlloyEditor.Strings.rowInsertAfter
            }, {
              command: 'rowDelete',
              label: AlloyEditor.Strings.rowDelete
            }];
          }
        });
        AlloyEditor.Buttons[ButtonTableRow.key] = AlloyEditor.ButtonTableRow = ButtonTableRow;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonTable = React.createClass({
          displayName: 'ButtonTable',
          propTypes: {
            editor: React.PropTypes.object.isRequired,
            label: React.PropTypes.string,
            tabIndex: React.PropTypes.number
          },
          statics: {key: 'table'},
          render: function render() {
            if (this.props.renderExclusive) {
              return React.createElement(AlloyEditor.ButtonTableEdit, this.props);
            } else {
              return React.createElement('button', {
                'aria-label': AlloyEditor.Strings.table,
                className: 'ae-button',
                'data-type': 'button-table',
                onClick: this.props.requestExclusive,
                tabIndex: this.props.tabIndex,
                title: AlloyEditor.Strings.table
              }, React.createElement('span', {className: 'ae-icon-table'}));
            }
          }
        });
        AlloyEditor.Buttons[ButtonTable.key] = AlloyEditor.ButtonTable = ButtonTable;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonTwitter = React.createClass({
          displayName: 'ButtonTwitter',
          mixins: [AlloyEditor.ButtonStateClasses],
          propTypes: {
            editor: React.PropTypes.object.isRequired,
            label: React.PropTypes.string,
            tabIndex: React.PropTypes.number
          },
          statics: {key: 'twitter'},
          handleClick: function handleClick() {
            var editor = this.props.editor.get('nativeEditor');
            var linkUtils = new CKEDITOR.Link(editor);
            if (this.isActive()) {
              linkUtils.remove(linkUtils.getFromSelection());
            } else {
              linkUtils.create(this._getHref(), {
                'class': 'ae-twitter-link',
                'target': '_blank'
              });
            }
            editor.fire('actionPerformed', this);
          },
          isActive: function isActive() {
            var link = new CKEDITOR.Link(this.props.editor.get('nativeEditor')).getFromSelection();
            return link && link.getAttribute('href').indexOf('twitter.com/intent/tweet') !== -1;
          },
          render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();
            return React.createElement('button', {
              'aria-label': AlloyEditor.Strings.twitter,
              className: cssClass,
              'data-type': 'button-twitter',
              onClick: this.handleClick,
              tabIndex: this.props.tabIndex,
              title: AlloyEditor.Strings.twitter
            }, React.createElement('span', {className: 'ae-icon-twitter'}));
          },
          _getHref: function _getHref() {
            var nativeEditor = this.props.editor.get('nativeEditor');
            var selectedText = nativeEditor.getSelection().getSelectedText();
            var url = this.props.url;
            var via = this.props.via;
            var twitterHref = 'https://twitter.com/intent/tweet?text=' + selectedText;
            if (url) {
              twitterHref += '&url=' + url;
            }
            if (via) {
              twitterHref += '&via=' + via;
            }
            return twitterHref;
          }
        });
        AlloyEditor.Buttons[ButtonTwitter.key] = AlloyEditor.ButtonTwitter = ButtonTwitter;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonUnorderedlist = React.createClass({
          displayName: 'ButtonUnorderedlist',
          mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],
          propTypes: {
            editor: React.PropTypes.object.isRequired,
            label: React.PropTypes.string,
            tabIndex: React.PropTypes.number
          },
          statics: {key: 'ul'},
          getDefaultProps: function getDefaultProps() {
            return {
              command: 'bulletedlist',
              style: {element: 'ul'}
            };
          },
          render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();
            return React.createElement('button', {
              'aria-label': AlloyEditor.Strings.bulletedlist,
              'aria-pressed': cssClass.indexOf('pressed') !== -1,
              className: cssClass,
              'data-type': 'button-ul',
              onClick: this.execCommand,
              tabIndex: this.props.tabIndex,
              title: AlloyEditor.Strings.bulletedlist
            }, React.createElement('span', {className: 'ae-icon-bulleted-list'}));
          }
        });
        AlloyEditor.Buttons[ButtonUnorderedlist.key] = AlloyEditor.ButtonUnorderedlist = ButtonUnorderedlist;
      })();
      'use strict';
      (function() {
        'use strict';
        var ButtonUnderline = React.createClass({
          displayName: 'ButtonUnderline',
          mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonKeystroke],
          propTypes: {
            editor: React.PropTypes.object.isRequired,
            label: React.PropTypes.string,
            tabIndex: React.PropTypes.number
          },
          statics: {key: 'underline'},
          getDefaultProps: function getDefaultProps() {
            return {
              command: 'underline',
              keystroke: {
                fn: 'execCommand',
                keys: CKEDITOR.CTRL + 85
              },
              style: {element: 'u'}
            };
          },
          render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();
            return React.createElement('button', {
              'aria-label': AlloyEditor.Strings.underline,
              'aria-pressed': cssClass.indexOf('pressed') !== -1,
              className: cssClass,
              'data-type': 'button-underline',
              onClick: this.execCommand,
              tabIndex: this.props.tabIndex,
              title: AlloyEditor.Strings.underline
            }, React.createElement('span', {className: 'ae-icon-underline'}));
          }
        });
        AlloyEditor.Buttons[ButtonUnderline.key] = AlloyEditor.ButtonUnderline = ButtonUnderline;
      })();
      'use strict';
      (function() {
        'use strict';
        var ToolbarAdd = React.createClass({
          displayName: 'ToolbarAdd',
          mixins: [AlloyEditor.WidgetDropdown, AlloyEditor.WidgetExclusive, AlloyEditor.WidgetFocusManager, AlloyEditor.ToolbarButtons, AlloyEditor.WidgetPosition, AlloyEditor.WidgetArrowBox],
          propTypes: {
            config: React.PropTypes.object,
            editor: React.PropTypes.object.isRequired,
            editorEvent: React.PropTypes.object,
            gutterExclusive: React.PropTypes.object,
            label: React.PropTypes.string,
            onDismiss: React.PropTypes.func,
            selectionData: React.PropTypes.object
          },
          statics: {key: 'add'},
          getDefaultProps: function getDefaultProps() {
            return {
              circular: true,
              descendants: '.ae-button',
              gutterExclusive: {
                left: 10,
                top: 0
              },
              keys: {
                dismiss: [27],
                next: [39, 40],
                prev: [37, 38]
              }
            };
          },
          componentDidMount: function componentDidMount() {
            this._updatePosition();
          },
          componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
            this._updatePosition();
            if (this.props.renderExclusive) {
              this.focus();
            }
          },
          render: function render() {
            if (!this.state.itemExclusive && this.props.editorEvent && this.props.editorEvent.data.nativeEvent.target && !this.props.editorEvent.data.nativeEvent.target.isContentEditable) {
              return null;
            }
            var buttons = this._getButtons();
            var className = this._getToolbarClassName();
            return React.createElement('div', {
              'aria-label': AlloyEditor.Strings.add,
              className: className,
              'data-tabindex': this.props.config.tabIndex || 0,
              onFocus: this.focus,
              onKeyDown: this.handleKey,
              role: 'toolbar',
              tabIndex: '-1'
            }, React.createElement('div', {className: 'ae-container'}, buttons));
          },
          _getButtons: function _getButtons() {
            var buttons;
            if (this.props.renderExclusive) {
              buttons = this.getToolbarButtons(this.props.config.buttons);
            } else {
              if (this.props.selectionData && this.props.selectionData.region) {
                buttons = React.createElement('button', {
                  'aria-label': AlloyEditor.Strings.add,
                  className: 'ae-button ae-button-add',
                  onClick: this.props.requestExclusive.bind(this, ToolbarAdd.key),
                  title: AlloyEditor.Strings.add
                }, React.createElement('span', {className: 'ae-icon-add'}));
              }
            }
            return buttons;
          },
          _getToolbarClassName: function _getToolbarClassName() {
            var cssClass = 'ae-toolbar-add';
            if (this.props.renderExclusive) {
              cssClass = 'ae-toolbar ' + this.getArrowBoxClasses();
            }
            return cssClass;
          },
          _updatePosition: function _updatePosition() {
            var region;
            if (!ReactDOM.findDOMNode(this)) {
              return;
            }
            if (this.props.renderExclusive) {
              this.updatePosition();
              this.show();
            } else {
              if (this.props.selectionData) {
                region = this.props.selectionData.region;
              }
              if (region) {
                var domNode = ReactDOM.findDOMNode(this);
                var domElement = new CKEDITOR.dom.element(domNode);
                var startRect = region.startRect || region;
                var left = this.props.editor.get('nativeEditor').editable().getClientRect().left;
                domNode.style.left = left - domNode.offsetWidth - this.props.gutterExclusive.left + 'px';
                domNode.style.top = Math.floor(region.top - domNode.offsetHeight / 2 + startRect.height / 2) + 'px';
                domNode.style.opacity = 1;
                domElement.removeClass('ae-arrow-box');
                this.cancelAnimation();
              }
            }
          }
        });
        AlloyEditor.Toolbars[ToolbarAdd.key] = AlloyEditor.ToolbarAdd = ToolbarAdd;
      })();
      'use strict';
      (function() {
        'use strict';
        var ToolbarStyles = React.createClass({
          displayName: 'ToolbarStyles',
          mixins: [AlloyEditor.WidgetDropdown, AlloyEditor.WidgetExclusive, AlloyEditor.WidgetFocusManager, AlloyEditor.ToolbarButtons, AlloyEditor.WidgetPosition, AlloyEditor.WidgetArrowBox],
          propTypes: {
            config: React.PropTypes.object,
            editor: React.PropTypes.object.isRequired,
            editorEvent: React.PropTypes.object,
            label: React.PropTypes.string,
            onDismiss: React.PropTypes.func,
            selectionData: React.PropTypes.object
          },
          statics: {key: 'styles'},
          componentDidMount: function componentDidMount() {
            this._updatePosition();
          },
          componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
            this._updatePosition();
          },
          getDefaultProps: function getDefaultProps() {
            return {
              circular: true,
              descendants: '.ae-button, .ae-toolbar-element',
              keys: {
                dismiss: [27],
                next: [39, 40],
                prev: [37, 38]
              }
            };
          },
          render: function render() {
            var currentSelection = this._getCurrentSelection();
            if (currentSelection) {
              var getArrowBoxClassesFn = this._getSelectionFunction(currentSelection.getArrowBoxClasses);
              var arrowBoxClasses;
              if (getArrowBoxClassesFn) {
                arrowBoxClasses = getArrowBoxClassesFn();
              } else {
                arrowBoxClasses = this.getArrowBoxClasses();
              }
              var cssClasses = 'ae-toolbar-styles ' + arrowBoxClasses;
              var buttons = this.getToolbarButtons(currentSelection.buttons, {
                manualSelection: this.props.editorEvent ? this.props.editorEvent.data.manualSelection : null,
                selectionType: currentSelection.name
              });
              return React.createElement('div', {
                'aria-label': AlloyEditor.Strings.styles,
                className: cssClasses,
                'data-tabindex': this.props.config.tabIndex || 0,
                onFocus: this.focus,
                onKeyDown: this.handleKey,
                role: 'toolbar',
                tabIndex: '-1'
              }, React.createElement('div', {className: 'ae-container'}, buttons));
            }
            return null;
          },
          _getSelectionFunction: function _getSelectionFunction(selectionFn) {
            var Lang = AlloyEditor.Lang;
            var selectionFunction;
            if (Lang.isFunction(selectionFn)) {
              selectionFunction = selectionFn;
            } else if (Lang.isString(selectionFn)) {
              var parts = selectionFn.split('.');
              var currentMember = window;
              var property = parts.shift();
              while (property && Lang.isObject(currentMember) && Lang.isObject(currentMember[property])) {
                currentMember = currentMember[property];
                property = parts.shift();
              }
              if (Lang.isFunction(currentMember)) {
                selectionFunction = currentMember;
              }
            }
            return selectionFunction;
          },
          _getCurrentSelection: function _getCurrentSelection() {
            var eventPayload = this.props.editorEvent ? this.props.editorEvent.data : null;
            var selection;
            if (eventPayload) {
              this.props.config.selections.some(function(item) {
                var testFn = this._getSelectionFunction(item.test);
                var result;
                if (testFn) {
                  result = eventPayload.manualSelection === item.name || testFn({
                    data: eventPayload,
                    editor: this.props.editor
                  });
                }
                if (result) {
                  selection = item;
                }
                return result;
              }, this);
            }
            return selection;
          },
          _updatePosition: function _updatePosition() {
            if (!ReactDOM.findDOMNode(this)) {
              return;
            }
            var currentSelection = this._getCurrentSelection();
            var result;
            if (currentSelection) {
              var setPositionFn = this._getSelectionFunction(currentSelection.setPosition);
              if (setPositionFn) {
                result = setPositionFn.call(this, {
                  editor: this.props.editor,
                  editorEvent: this.props.editorEvent,
                  selectionData: this.props.selectionData
                });
              }
            }
            if (!result) {
              this.updatePosition();
              this.show();
            }
          }
        });
        AlloyEditor.Toolbars[ToolbarStyles.key] = AlloyEditor.ToolbarStyles = ToolbarStyles;
      })();
      'use strict';
      (function() {
        'use strict';
        var UI = React.createClass({
          displayName: 'UI',
          mixins: [AlloyEditor.WidgetExclusive, AlloyEditor.WidgetFocusManager],
          propTypes: {
            ariaUpdates: React.PropTypes.object,
            editor: React.PropTypes.object.isRequired,
            eventsDelay: React.PropTypes.number,
            toolbars: React.PropTypes.object.isRequired
          },
          getInitialState: function getInitialState() {
            return {hidden: false};
          },
          getDefaultProps: function getDefaultProps() {
            return {
              circular: true,
              descendants: '[class^=ae-toolbar-]',
              eventsDelay: 0,
              keys: {next: 9}
            };
          },
          componentDidMount: function componentDidMount() {
            var editor = this.props.editor.get('nativeEditor');
            editor.on('editorInteraction', this._onEditorInteraction, this);
            editor.on('actionPerformed', this._onActionPerformed, this);
            editor.on('key', this._onEditorKey, this);
            this._mousedownListener = function(event) {
              this._setUIHidden(event.target);
            }.bind(this);
            this._keyDownListener = CKEDITOR.tools.debounce(function(event) {
              this._setUIHidden(document.activeElement);
            }, this.props.eventsDelay, this);
            document.addEventListener('mousedown', this._mousedownListener);
            document.addEventListener('keydown', this._keyDownListener);
          },
          componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
            var domNode = ReactDOM.findDOMNode(this);
            var editor = this.props.editor.get('nativeEditor');
            if (domNode) {
              editor.fire('ariaUpdate', {message: this._getAvailableToolbarsMessage(domNode)});
            }
            editor.fire('editorUpdate', {
              prevProps: prevProps,
              prevState: prevState,
              props: this.props,
              state: this.state
            });
          },
          _getAriaUpdateTemplate: function _getAriaUpdateTemplate(ariaUpdate) {
            if (!this._ariaUpdateTemplates) {
              this._ariaUpdateTemplates = {};
            }
            if (!this._ariaUpdateTemplates[ariaUpdate]) {
              this._ariaUpdateTemplates[ariaUpdate] = new CKEDITOR.template(this._getAriaUpdates()[ariaUpdate]);
            }
            return this._ariaUpdateTemplates[ariaUpdate];
          },
          _getAriaUpdates: function _getAriaUpdates() {
            return this.props.ariaUpdates || {
              noToolbar: AlloyEditor.Strings.ariaUpdateNoToolbar,
              oneToolbar: AlloyEditor.Strings.ariaUpdateOneToolbar,
              manyToolbars: AlloyEditor.Strings.ariaUpdateManyToolbars
            };
          },
          _getAvailableToolbarsMessage: function _getAvailableToolbarsMessage(domNode) {
            var toolbarsNodeList = domNode.querySelectorAll('[role="toolbar"]');
            if (!toolbarsNodeList.length) {
              return this._getAriaUpdates().noToolbar;
            } else {
              var toolbarNames = Array.prototype.slice.call(toolbarsNodeList).map(function(toolbar) {
                return toolbar.getAttribute('aria-label');
              });
              var ariaUpdate = toolbarNames.length === 1 ? 'oneToolbar' : 'manyToolbars';
              return this._getAriaUpdateTemplate(ariaUpdate).output({toolbars: toolbarNames.join(',').replace(/,([^,]*)$/, ' and ' + '$1')});
            }
          },
          componentWillUnmount: function componentWillUnmount() {
            if (this._mousedownListener) {
              document.removeEventListener('mousedown', this._mousedownListener);
            }
            if (this._keyDownListener) {
              this._keyDownListener.detach();
              document.removeEventListener('keydown', this._keyDownListener);
            }
          },
          render: function render() {
            if (this.state.hidden) {
              return null;
            }
            var toolbars = Object.keys(this.props.toolbars).map(function(toolbar) {
              return AlloyEditor.Toolbars[toolbar] || window[toolbar];
            });
            toolbars = this.filterExclusive(toolbars).map(function(toolbar) {
              var props = this.mergeExclusiveProps({
                config: this.props.toolbars[toolbar.key],
                editor: this.props.editor,
                editorEvent: this.state.editorEvent,
                key: toolbar.key,
                onDismiss: this._onDismissToolbarFocus,
                selectionData: this.state.selectionData
              }, toolbar.key);
              return React.createElement(toolbar, props);
            }.bind(this));
            return React.createElement('div', {
              className: 'ae-toolbars',
              onKeyDown: this.handleKey
            }, toolbars);
          },
          _onActionPerformed: function _onActionPerformed(event) {
            var editor = this.props.editor.get('nativeEditor');
            editor.focus();
            this.setState({
              itemExclusive: null,
              selectionData: editor.getSelectionData()
            });
          },
          _onDismissToolbarFocus: function _onDismissToolbarFocus() {
            var editor = this.props.editor.get('nativeEditor');
            editor.focus();
          },
          _onEditorInteraction: function _onEditorInteraction(event) {
            this.setState({
              editorEvent: event,
              hidden: false,
              itemExclusive: null,
              selectionData: event.data.selectionData
            });
          },
          _onEditorKey: function _onEditorKey(event) {
            var nativeEvent = event.data.domEvent.$;
            if (nativeEvent.altKey && nativeEvent.keyCode === 121) {
              this.focus();
            }
          },
          _setUIHidden: function _setUIHidden(target) {
            var domNode = ReactDOM.findDOMNode(this);
            if (domNode) {
              var editable = this.props.editor.get('nativeEditor').editable();
              var targetNode = new CKEDITOR.dom.node(target);
              var res = editable.$ === target || editable.contains(targetNode) || new CKEDITOR.dom.element(domNode).contains(targetNode);
              if (!res) {
                this.setState({hidden: true});
              }
            }
          }
        });
        AlloyEditor.UI = UI;
      })();
    }
  }());
})(require('process'));

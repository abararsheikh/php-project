/* */ 
(function(process) {
  (function() {
    function deployCKEditor() {
      if (typeof CKEDITOR !== 'undefined') {
        CKEDITOR.disableAutoInline = true;
      }
    }
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
    (function(f) {
      var React = f();
      if (typeof module !== "undefined" && typeof module.exports === "object") {
        module.exports.React = React;
      } else if (typeof AlloyEditor === "object") {
        AlloyEditor.React = React;
      } else if (typeof window !== "undefined") {
        window.React = React;
      } else if (typeof self !== "undefined") {
        self.React = React;
      } else if (typeof global !== "undefined") {
        global.React = React;
      } else {
        this.React = React;
      }
    })(function() {
      var define,
          module,
          exports;
      return (function e(t, n, r) {
        function s(o, u) {
          if (!n[o]) {
            if (!t[o]) {
              var a = typeof require == "function" && require;
              if (!u && a)
                return a(o, !0);
              if (i)
                return i(o, !0);
              var f = new Error("Cannot find module '" + o + "'");
              throw f.code = "MODULE_NOT_FOUND", f;
            }
            var l = n[o] = {exports: {}};
            t[o][0].call(l.exports, function(e) {
              var n = t[o][1][e];
              return s(n ? n : e);
            }, l, l.exports, e, t, n, r);
          }
          return n[o].exports;
        }
        var i = typeof require == "function" && require;
        for (var o = 0; o < r.length; o++)
          s(r[o]);
        return s;
      })({
        1: [function(_dereq_, module, exports) {
          'use strict';
          var ReactDOM = _dereq_(35);
          var ReactDOMServer = _dereq_(45);
          var ReactIsomorphic = _dereq_(63);
          var assign = _dereq_(23);
          var deprecated = _dereq_(106);
          var React = {};
          assign(React, ReactIsomorphic);
          assign(React, {
            findDOMNode: deprecated('findDOMNode', 'ReactDOM', 'react-dom', ReactDOM, ReactDOM.findDOMNode),
            render: deprecated('render', 'ReactDOM', 'react-dom', ReactDOM, ReactDOM.render),
            unmountComponentAtNode: deprecated('unmountComponentAtNode', 'ReactDOM', 'react-dom', ReactDOM, ReactDOM.unmountComponentAtNode),
            renderToString: deprecated('renderToString', 'ReactDOMServer', 'react-dom/server', ReactDOMServer, ReactDOMServer.renderToString),
            renderToStaticMarkup: deprecated('renderToStaticMarkup', 'ReactDOMServer', 'react-dom/server', ReactDOMServer, ReactDOMServer.renderToStaticMarkup)
          });
          React.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactDOM;
          module.exports = React;
        }, {
          "106": 106,
          "23": 23,
          "35": 35,
          "45": 45,
          "63": 63
        }],
        2: [function(_dereq_, module, exports) {
          'use strict';
          var ReactMount = _dereq_(65);
          var findDOMNode = _dereq_(108);
          var focusNode = _dereq_(138);
          var Mixin = {componentDidMount: function() {
              if (this.props.autoFocus) {
                focusNode(findDOMNode(this));
              }
            }};
          var AutoFocusUtils = {
            Mixin: Mixin,
            focusDOMComponent: function() {
              focusNode(ReactMount.getNode(this._rootNodeID));
            }
          };
          module.exports = AutoFocusUtils;
        }, {
          "108": 108,
          "138": 138,
          "65": 65
        }],
        3: [function(_dereq_, module, exports) {
          'use strict';
          var EventConstants = _dereq_(15);
          var EventPropagators = _dereq_(19);
          var ExecutionEnvironment = _dereq_(130);
          var FallbackCompositionState = _dereq_(20);
          var SyntheticCompositionEvent = _dereq_(90);
          var SyntheticInputEvent = _dereq_(94);
          var keyOf = _dereq_(148);
          var END_KEYCODES = [9, 13, 27, 32];
          var START_KEYCODE = 229;
          var canUseCompositionEvent = ExecutionEnvironment.canUseDOM && 'CompositionEvent' in window;
          var documentMode = null;
          if (ExecutionEnvironment.canUseDOM && 'documentMode' in document) {
            documentMode = document.documentMode;
          }
          var canUseTextInputEvent = ExecutionEnvironment.canUseDOM && 'TextEvent' in window && !documentMode && !isPresto();
          var useFallbackCompositionData = ExecutionEnvironment.canUseDOM && (!canUseCompositionEvent || documentMode && documentMode > 8 && documentMode <= 11);
          function isPresto() {
            var opera = window.opera;
            return typeof opera === 'object' && typeof opera.version === 'function' && parseInt(opera.version(), 10) <= 12;
          }
          var SPACEBAR_CODE = 32;
          var SPACEBAR_CHAR = String.fromCharCode(SPACEBAR_CODE);
          var topLevelTypes = EventConstants.topLevelTypes;
          var eventTypes = {
            beforeInput: {
              phasedRegistrationNames: {
                bubbled: keyOf({onBeforeInput: null}),
                captured: keyOf({onBeforeInputCapture: null})
              },
              dependencies: [topLevelTypes.topCompositionEnd, topLevelTypes.topKeyPress, topLevelTypes.topTextInput, topLevelTypes.topPaste]
            },
            compositionEnd: {
              phasedRegistrationNames: {
                bubbled: keyOf({onCompositionEnd: null}),
                captured: keyOf({onCompositionEndCapture: null})
              },
              dependencies: [topLevelTypes.topBlur, topLevelTypes.topCompositionEnd, topLevelTypes.topKeyDown, topLevelTypes.topKeyPress, topLevelTypes.topKeyUp, topLevelTypes.topMouseDown]
            },
            compositionStart: {
              phasedRegistrationNames: {
                bubbled: keyOf({onCompositionStart: null}),
                captured: keyOf({onCompositionStartCapture: null})
              },
              dependencies: [topLevelTypes.topBlur, topLevelTypes.topCompositionStart, topLevelTypes.topKeyDown, topLevelTypes.topKeyPress, topLevelTypes.topKeyUp, topLevelTypes.topMouseDown]
            },
            compositionUpdate: {
              phasedRegistrationNames: {
                bubbled: keyOf({onCompositionUpdate: null}),
                captured: keyOf({onCompositionUpdateCapture: null})
              },
              dependencies: [topLevelTypes.topBlur, topLevelTypes.topCompositionUpdate, topLevelTypes.topKeyDown, topLevelTypes.topKeyPress, topLevelTypes.topKeyUp, topLevelTypes.topMouseDown]
            }
          };
          var hasSpaceKeypress = false;
          function isKeypressCommand(nativeEvent) {
            return (nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) && !(nativeEvent.ctrlKey && nativeEvent.altKey);
          }
          function getCompositionEventType(topLevelType) {
            switch (topLevelType) {
              case topLevelTypes.topCompositionStart:
                return eventTypes.compositionStart;
              case topLevelTypes.topCompositionEnd:
                return eventTypes.compositionEnd;
              case topLevelTypes.topCompositionUpdate:
                return eventTypes.compositionUpdate;
            }
          }
          function isFallbackCompositionStart(topLevelType, nativeEvent) {
            return topLevelType === topLevelTypes.topKeyDown && nativeEvent.keyCode === START_KEYCODE;
          }
          function isFallbackCompositionEnd(topLevelType, nativeEvent) {
            switch (topLevelType) {
              case topLevelTypes.topKeyUp:
                return END_KEYCODES.indexOf(nativeEvent.keyCode) !== -1;
              case topLevelTypes.topKeyDown:
                return nativeEvent.keyCode !== START_KEYCODE;
              case topLevelTypes.topKeyPress:
              case topLevelTypes.topMouseDown:
              case topLevelTypes.topBlur:
                return true;
              default:
                return false;
            }
          }
          function getDataFromCustomEvent(nativeEvent) {
            var detail = nativeEvent.detail;
            if (typeof detail === 'object' && 'data' in detail) {
              return detail.data;
            }
            return null;
          }
          var currentComposition = null;
          function extractCompositionEvent(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
            var eventType;
            var fallbackData;
            if (canUseCompositionEvent) {
              eventType = getCompositionEventType(topLevelType);
            } else if (!currentComposition) {
              if (isFallbackCompositionStart(topLevelType, nativeEvent)) {
                eventType = eventTypes.compositionStart;
              }
            } else if (isFallbackCompositionEnd(topLevelType, nativeEvent)) {
              eventType = eventTypes.compositionEnd;
            }
            if (!eventType) {
              return null;
            }
            if (useFallbackCompositionData) {
              if (!currentComposition && eventType === eventTypes.compositionStart) {
                currentComposition = FallbackCompositionState.getPooled(topLevelTarget);
              } else if (eventType === eventTypes.compositionEnd) {
                if (currentComposition) {
                  fallbackData = currentComposition.getData();
                }
              }
            }
            var event = SyntheticCompositionEvent.getPooled(eventType, topLevelTargetID, nativeEvent, nativeEventTarget);
            if (fallbackData) {
              event.data = fallbackData;
            } else {
              var customData = getDataFromCustomEvent(nativeEvent);
              if (customData !== null) {
                event.data = customData;
              }
            }
            EventPropagators.accumulateTwoPhaseDispatches(event);
            return event;
          }
          function getNativeBeforeInputChars(topLevelType, nativeEvent) {
            switch (topLevelType) {
              case topLevelTypes.topCompositionEnd:
                return getDataFromCustomEvent(nativeEvent);
              case topLevelTypes.topKeyPress:
                var which = nativeEvent.which;
                if (which !== SPACEBAR_CODE) {
                  return null;
                }
                hasSpaceKeypress = true;
                return SPACEBAR_CHAR;
              case topLevelTypes.topTextInput:
                var chars = nativeEvent.data;
                if (chars === SPACEBAR_CHAR && hasSpaceKeypress) {
                  return null;
                }
                return chars;
              default:
                return null;
            }
          }
          function getFallbackBeforeInputChars(topLevelType, nativeEvent) {
            if (currentComposition) {
              if (topLevelType === topLevelTypes.topCompositionEnd || isFallbackCompositionEnd(topLevelType, nativeEvent)) {
                var chars = currentComposition.getData();
                FallbackCompositionState.release(currentComposition);
                currentComposition = null;
                return chars;
              }
              return null;
            }
            switch (topLevelType) {
              case topLevelTypes.topPaste:
                return null;
              case topLevelTypes.topKeyPress:
                if (nativeEvent.which && !isKeypressCommand(nativeEvent)) {
                  return String.fromCharCode(nativeEvent.which);
                }
                return null;
              case topLevelTypes.topCompositionEnd:
                return useFallbackCompositionData ? null : nativeEvent.data;
              default:
                return null;
            }
          }
          function extractBeforeInputEvent(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
            var chars;
            if (canUseTextInputEvent) {
              chars = getNativeBeforeInputChars(topLevelType, nativeEvent);
            } else {
              chars = getFallbackBeforeInputChars(topLevelType, nativeEvent);
            }
            if (!chars) {
              return null;
            }
            var event = SyntheticInputEvent.getPooled(eventTypes.beforeInput, topLevelTargetID, nativeEvent, nativeEventTarget);
            event.data = chars;
            EventPropagators.accumulateTwoPhaseDispatches(event);
            return event;
          }
          var BeforeInputEventPlugin = {
            eventTypes: eventTypes,
            extractEvents: function(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
              return [extractCompositionEvent(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget), extractBeforeInputEvent(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget)];
            }
          };
          module.exports = BeforeInputEventPlugin;
        }, {
          "130": 130,
          "148": 148,
          "15": 15,
          "19": 19,
          "20": 20,
          "90": 90,
          "94": 94
        }],
        4: [function(_dereq_, module, exports) {
          'use strict';
          var isUnitlessNumber = {
            animationIterationCount: true,
            boxFlex: true,
            boxFlexGroup: true,
            boxOrdinalGroup: true,
            columnCount: true,
            flex: true,
            flexGrow: true,
            flexPositive: true,
            flexShrink: true,
            flexNegative: true,
            flexOrder: true,
            fontWeight: true,
            lineClamp: true,
            lineHeight: true,
            opacity: true,
            order: true,
            orphans: true,
            tabSize: true,
            widows: true,
            zIndex: true,
            zoom: true,
            fillOpacity: true,
            stopOpacity: true,
            strokeDashoffset: true,
            strokeOpacity: true,
            strokeWidth: true
          };
          function prefixKey(prefix, key) {
            return prefix + key.charAt(0).toUpperCase() + key.substring(1);
          }
          var prefixes = ['Webkit', 'ms', 'Moz', 'O'];
          Object.keys(isUnitlessNumber).forEach(function(prop) {
            prefixes.forEach(function(prefix) {
              isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
            });
          });
          var shorthandPropertyExpansions = {
            background: {
              backgroundAttachment: true,
              backgroundColor: true,
              backgroundImage: true,
              backgroundPositionX: true,
              backgroundPositionY: true,
              backgroundRepeat: true
            },
            backgroundPosition: {
              backgroundPositionX: true,
              backgroundPositionY: true
            },
            border: {
              borderWidth: true,
              borderStyle: true,
              borderColor: true
            },
            borderBottom: {
              borderBottomWidth: true,
              borderBottomStyle: true,
              borderBottomColor: true
            },
            borderLeft: {
              borderLeftWidth: true,
              borderLeftStyle: true,
              borderLeftColor: true
            },
            borderRight: {
              borderRightWidth: true,
              borderRightStyle: true,
              borderRightColor: true
            },
            borderTop: {
              borderTopWidth: true,
              borderTopStyle: true,
              borderTopColor: true
            },
            font: {
              fontStyle: true,
              fontVariant: true,
              fontWeight: true,
              fontSize: true,
              lineHeight: true,
              fontFamily: true
            },
            outline: {
              outlineWidth: true,
              outlineStyle: true,
              outlineColor: true
            }
          };
          var CSSProperty = {
            isUnitlessNumber: isUnitlessNumber,
            shorthandPropertyExpansions: shorthandPropertyExpansions
          };
          module.exports = CSSProperty;
        }, {}],
        5: [function(_dereq_, module, exports) {
          'use strict';
          var CSSProperty = _dereq_(4);
          var ExecutionEnvironment = _dereq_(130);
          var ReactPerf = _dereq_(71);
          var camelizeStyleName = _dereq_(132);
          var dangerousStyleValue = _dereq_(105);
          var hyphenateStyleName = _dereq_(143);
          var memoizeStringOnly = _dereq_(150);
          var warning = _dereq_(155);
          var processStyleName = memoizeStringOnly(function(styleName) {
            return hyphenateStyleName(styleName);
          });
          var hasShorthandPropertyBug = false;
          var styleFloatAccessor = 'cssFloat';
          if (ExecutionEnvironment.canUseDOM) {
            var tempStyle = document.createElement('div').style;
            try {
              tempStyle.font = '';
            } catch (e) {
              hasShorthandPropertyBug = true;
            }
            if (document.documentElement.style.cssFloat === undefined) {
              styleFloatAccessor = 'styleFloat';
            }
          }
          if ("development" !== 'production') {
            var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;
            var badStyleValueWithSemicolonPattern = /;\s*$/;
            var warnedStyleNames = {};
            var warnedStyleValues = {};
            var warnHyphenatedStyleName = function(name) {
              if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
                return;
              }
              warnedStyleNames[name] = true;
              "development" !== 'production' ? warning(false, 'Unsupported style property %s. Did you mean %s?', name, camelizeStyleName(name)) : undefined;
            };
            var warnBadVendoredStyleName = function(name) {
              if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
                return;
              }
              warnedStyleNames[name] = true;
              "development" !== 'production' ? warning(false, 'Unsupported vendor-prefixed style property %s. Did you mean %s?', name, name.charAt(0).toUpperCase() + name.slice(1)) : undefined;
            };
            var warnStyleValueWithSemicolon = function(name, value) {
              if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
                return;
              }
              warnedStyleValues[value] = true;
              "development" !== 'production' ? warning(false, 'Style property values shouldn\'t contain a semicolon. ' + 'Try "%s: %s" instead.', name, value.replace(badStyleValueWithSemicolonPattern, '')) : undefined;
            };
            var warnValidStyle = function(name, value) {
              if (name.indexOf('-') > -1) {
                warnHyphenatedStyleName(name);
              } else if (badVendoredStyleNamePattern.test(name)) {
                warnBadVendoredStyleName(name);
              } else if (badStyleValueWithSemicolonPattern.test(value)) {
                warnStyleValueWithSemicolon(name, value);
              }
            };
          }
          var CSSPropertyOperations = {
            createMarkupForStyles: function(styles) {
              var serialized = '';
              for (var styleName in styles) {
                if (!styles.hasOwnProperty(styleName)) {
                  continue;
                }
                var styleValue = styles[styleName];
                if ("development" !== 'production') {
                  warnValidStyle(styleName, styleValue);
                }
                if (styleValue != null) {
                  serialized += processStyleName(styleName) + ':';
                  serialized += dangerousStyleValue(styleName, styleValue) + ';';
                }
              }
              return serialized || null;
            },
            setValueForStyles: function(node, styles) {
              var style = node.style;
              for (var styleName in styles) {
                if (!styles.hasOwnProperty(styleName)) {
                  continue;
                }
                if ("development" !== 'production') {
                  warnValidStyle(styleName, styles[styleName]);
                }
                var styleValue = dangerousStyleValue(styleName, styles[styleName]);
                if (styleName === 'float') {
                  styleName = styleFloatAccessor;
                }
                if (styleValue) {
                  style[styleName] = styleValue;
                } else {
                  var expansion = hasShorthandPropertyBug && CSSProperty.shorthandPropertyExpansions[styleName];
                  if (expansion) {
                    for (var individualStyleName in expansion) {
                      style[individualStyleName] = '';
                    }
                  } else {
                    style[styleName] = '';
                  }
                }
              }
            }
          };
          ReactPerf.measureMethods(CSSPropertyOperations, 'CSSPropertyOperations', {setValueForStyles: 'setValueForStyles'});
          module.exports = CSSPropertyOperations;
        }, {
          "105": 105,
          "130": 130,
          "132": 132,
          "143": 143,
          "150": 150,
          "155": 155,
          "4": 4,
          "71": 71
        }],
        6: [function(_dereq_, module, exports) {
          'use strict';
          var PooledClass = _dereq_(24);
          var assign = _dereq_(23);
          var invariant = _dereq_(144);
          function CallbackQueue() {
            this._callbacks = null;
            this._contexts = null;
          }
          assign(CallbackQueue.prototype, {
            enqueue: function(callback, context) {
              this._callbacks = this._callbacks || [];
              this._contexts = this._contexts || [];
              this._callbacks.push(callback);
              this._contexts.push(context);
            },
            notifyAll: function() {
              var callbacks = this._callbacks;
              var contexts = this._contexts;
              if (callbacks) {
                !(callbacks.length === contexts.length) ? "development" !== 'production' ? invariant(false, 'Mismatched list of contexts in callback queue') : invariant(false) : undefined;
                this._callbacks = null;
                this._contexts = null;
                for (var i = 0; i < callbacks.length; i++) {
                  callbacks[i].call(contexts[i]);
                }
                callbacks.length = 0;
                contexts.length = 0;
              }
            },
            reset: function() {
              this._callbacks = null;
              this._contexts = null;
            },
            destructor: function() {
              this.reset();
            }
          });
          PooledClass.addPoolingTo(CallbackQueue);
          module.exports = CallbackQueue;
        }, {
          "144": 144,
          "23": 23,
          "24": 24
        }],
        7: [function(_dereq_, module, exports) {
          'use strict';
          var EventConstants = _dereq_(15);
          var EventPluginHub = _dereq_(16);
          var EventPropagators = _dereq_(19);
          var ExecutionEnvironment = _dereq_(130);
          var ReactUpdates = _dereq_(83);
          var SyntheticEvent = _dereq_(92);
          var getEventTarget = _dereq_(114);
          var isEventSupported = _dereq_(119);
          var isTextInputElement = _dereq_(120);
          var keyOf = _dereq_(148);
          var topLevelTypes = EventConstants.topLevelTypes;
          var eventTypes = {change: {
              phasedRegistrationNames: {
                bubbled: keyOf({onChange: null}),
                captured: keyOf({onChangeCapture: null})
              },
              dependencies: [topLevelTypes.topBlur, topLevelTypes.topChange, topLevelTypes.topClick, topLevelTypes.topFocus, topLevelTypes.topInput, topLevelTypes.topKeyDown, topLevelTypes.topKeyUp, topLevelTypes.topSelectionChange]
            }};
          var activeElement = null;
          var activeElementID = null;
          var activeElementValue = null;
          var activeElementValueProp = null;
          function shouldUseChangeEvent(elem) {
            var nodeName = elem.nodeName && elem.nodeName.toLowerCase();
            return nodeName === 'select' || nodeName === 'input' && elem.type === 'file';
          }
          var doesChangeEventBubble = false;
          if (ExecutionEnvironment.canUseDOM) {
            doesChangeEventBubble = isEventSupported('change') && (!('documentMode' in document) || document.documentMode > 8);
          }
          function manualDispatchChangeEvent(nativeEvent) {
            var event = SyntheticEvent.getPooled(eventTypes.change, activeElementID, nativeEvent, getEventTarget(nativeEvent));
            EventPropagators.accumulateTwoPhaseDispatches(event);
            ReactUpdates.batchedUpdates(runEventInBatch, event);
          }
          function runEventInBatch(event) {
            EventPluginHub.enqueueEvents(event);
            EventPluginHub.processEventQueue(false);
          }
          function startWatchingForChangeEventIE8(target, targetID) {
            activeElement = target;
            activeElementID = targetID;
            activeElement.attachEvent('onchange', manualDispatchChangeEvent);
          }
          function stopWatchingForChangeEventIE8() {
            if (!activeElement) {
              return;
            }
            activeElement.detachEvent('onchange', manualDispatchChangeEvent);
            activeElement = null;
            activeElementID = null;
          }
          function getTargetIDForChangeEvent(topLevelType, topLevelTarget, topLevelTargetID) {
            if (topLevelType === topLevelTypes.topChange) {
              return topLevelTargetID;
            }
          }
          function handleEventsForChangeEventIE8(topLevelType, topLevelTarget, topLevelTargetID) {
            if (topLevelType === topLevelTypes.topFocus) {
              stopWatchingForChangeEventIE8();
              startWatchingForChangeEventIE8(topLevelTarget, topLevelTargetID);
            } else if (topLevelType === topLevelTypes.topBlur) {
              stopWatchingForChangeEventIE8();
            }
          }
          var isInputEventSupported = false;
          if (ExecutionEnvironment.canUseDOM) {
            isInputEventSupported = isEventSupported('input') && (!('documentMode' in document) || document.documentMode > 9);
          }
          var newValueProp = {
            get: function() {
              return activeElementValueProp.get.call(this);
            },
            set: function(val) {
              activeElementValue = '' + val;
              activeElementValueProp.set.call(this, val);
            }
          };
          function startWatchingForValueChange(target, targetID) {
            activeElement = target;
            activeElementID = targetID;
            activeElementValue = target.value;
            activeElementValueProp = Object.getOwnPropertyDescriptor(target.constructor.prototype, 'value');
            Object.defineProperty(activeElement, 'value', newValueProp);
            activeElement.attachEvent('onpropertychange', handlePropertyChange);
          }
          function stopWatchingForValueChange() {
            if (!activeElement) {
              return;
            }
            delete activeElement.value;
            activeElement.detachEvent('onpropertychange', handlePropertyChange);
            activeElement = null;
            activeElementID = null;
            activeElementValue = null;
            activeElementValueProp = null;
          }
          function handlePropertyChange(nativeEvent) {
            if (nativeEvent.propertyName !== 'value') {
              return;
            }
            var value = nativeEvent.srcElement.value;
            if (value === activeElementValue) {
              return;
            }
            activeElementValue = value;
            manualDispatchChangeEvent(nativeEvent);
          }
          function getTargetIDForInputEvent(topLevelType, topLevelTarget, topLevelTargetID) {
            if (topLevelType === topLevelTypes.topInput) {
              return topLevelTargetID;
            }
          }
          function handleEventsForInputEventIE(topLevelType, topLevelTarget, topLevelTargetID) {
            if (topLevelType === topLevelTypes.topFocus) {
              stopWatchingForValueChange();
              startWatchingForValueChange(topLevelTarget, topLevelTargetID);
            } else if (topLevelType === topLevelTypes.topBlur) {
              stopWatchingForValueChange();
            }
          }
          function getTargetIDForInputEventIE(topLevelType, topLevelTarget, topLevelTargetID) {
            if (topLevelType === topLevelTypes.topSelectionChange || topLevelType === topLevelTypes.topKeyUp || topLevelType === topLevelTypes.topKeyDown) {
              if (activeElement && activeElement.value !== activeElementValue) {
                activeElementValue = activeElement.value;
                return activeElementID;
              }
            }
          }
          function shouldUseClickEvent(elem) {
            return elem.nodeName && elem.nodeName.toLowerCase() === 'input' && (elem.type === 'checkbox' || elem.type === 'radio');
          }
          function getTargetIDForClickEvent(topLevelType, topLevelTarget, topLevelTargetID) {
            if (topLevelType === topLevelTypes.topClick) {
              return topLevelTargetID;
            }
          }
          var ChangeEventPlugin = {
            eventTypes: eventTypes,
            extractEvents: function(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
              var getTargetIDFunc,
                  handleEventFunc;
              if (shouldUseChangeEvent(topLevelTarget)) {
                if (doesChangeEventBubble) {
                  getTargetIDFunc = getTargetIDForChangeEvent;
                } else {
                  handleEventFunc = handleEventsForChangeEventIE8;
                }
              } else if (isTextInputElement(topLevelTarget)) {
                if (isInputEventSupported) {
                  getTargetIDFunc = getTargetIDForInputEvent;
                } else {
                  getTargetIDFunc = getTargetIDForInputEventIE;
                  handleEventFunc = handleEventsForInputEventIE;
                }
              } else if (shouldUseClickEvent(topLevelTarget)) {
                getTargetIDFunc = getTargetIDForClickEvent;
              }
              if (getTargetIDFunc) {
                var targetID = getTargetIDFunc(topLevelType, topLevelTarget, topLevelTargetID);
                if (targetID) {
                  var event = SyntheticEvent.getPooled(eventTypes.change, targetID, nativeEvent, nativeEventTarget);
                  event.type = 'change';
                  EventPropagators.accumulateTwoPhaseDispatches(event);
                  return event;
                }
              }
              if (handleEventFunc) {
                handleEventFunc(topLevelType, topLevelTarget, topLevelTargetID);
              }
            }
          };
          module.exports = ChangeEventPlugin;
        }, {
          "114": 114,
          "119": 119,
          "120": 120,
          "130": 130,
          "148": 148,
          "15": 15,
          "16": 16,
          "19": 19,
          "83": 83,
          "92": 92
        }],
        8: [function(_dereq_, module, exports) {
          'use strict';
          var nextReactRootIndex = 0;
          var ClientReactRootIndex = {createReactRootIndex: function() {
              return nextReactRootIndex++;
            }};
          module.exports = ClientReactRootIndex;
        }, {}],
        9: [function(_dereq_, module, exports) {
          'use strict';
          var Danger = _dereq_(12);
          var ReactMultiChildUpdateTypes = _dereq_(67);
          var ReactPerf = _dereq_(71);
          var setInnerHTML = _dereq_(124);
          var setTextContent = _dereq_(125);
          var invariant = _dereq_(144);
          function insertChildAt(parentNode, childNode, index) {
            var beforeChild = index >= parentNode.childNodes.length ? null : parentNode.childNodes.item(index);
            parentNode.insertBefore(childNode, beforeChild);
          }
          var DOMChildrenOperations = {
            dangerouslyReplaceNodeWithMarkup: Danger.dangerouslyReplaceNodeWithMarkup,
            updateTextContent: setTextContent,
            processUpdates: function(updates, markupList) {
              var update;
              var initialChildren = null;
              var updatedChildren = null;
              for (var i = 0; i < updates.length; i++) {
                update = updates[i];
                if (update.type === ReactMultiChildUpdateTypes.MOVE_EXISTING || update.type === ReactMultiChildUpdateTypes.REMOVE_NODE) {
                  var updatedIndex = update.fromIndex;
                  var updatedChild = update.parentNode.childNodes[updatedIndex];
                  var parentID = update.parentID;
                  !updatedChild ? "development" !== 'production' ? invariant(false, 'processUpdates(): Unable to find child %s of element. This ' + 'probably means the DOM was unexpectedly mutated (e.g., by the ' + 'browser), usually due to forgetting a <tbody> when using tables, ' + 'nesting tags like <form>, <p>, or <a>, or using non-SVG elements ' + 'in an <svg> parent. Try inspecting the child nodes of the element ' + 'with React ID `%s`.', updatedIndex, parentID) : invariant(false) : undefined;
                  initialChildren = initialChildren || {};
                  initialChildren[parentID] = initialChildren[parentID] || [];
                  initialChildren[parentID][updatedIndex] = updatedChild;
                  updatedChildren = updatedChildren || [];
                  updatedChildren.push(updatedChild);
                }
              }
              var renderedMarkup;
              if (markupList.length && typeof markupList[0] === 'string') {
                renderedMarkup = Danger.dangerouslyRenderMarkup(markupList);
              } else {
                renderedMarkup = markupList;
              }
              if (updatedChildren) {
                for (var j = 0; j < updatedChildren.length; j++) {
                  updatedChildren[j].parentNode.removeChild(updatedChildren[j]);
                }
              }
              for (var k = 0; k < updates.length; k++) {
                update = updates[k];
                switch (update.type) {
                  case ReactMultiChildUpdateTypes.INSERT_MARKUP:
                    insertChildAt(update.parentNode, renderedMarkup[update.markupIndex], update.toIndex);
                    break;
                  case ReactMultiChildUpdateTypes.MOVE_EXISTING:
                    insertChildAt(update.parentNode, initialChildren[update.parentID][update.fromIndex], update.toIndex);
                    break;
                  case ReactMultiChildUpdateTypes.SET_MARKUP:
                    setInnerHTML(update.parentNode, update.content);
                    break;
                  case ReactMultiChildUpdateTypes.TEXT_CONTENT:
                    setTextContent(update.parentNode, update.content);
                    break;
                  case ReactMultiChildUpdateTypes.REMOVE_NODE:
                    break;
                }
              }
            }
          };
          ReactPerf.measureMethods(DOMChildrenOperations, 'DOMChildrenOperations', {updateTextContent: 'updateTextContent'});
          module.exports = DOMChildrenOperations;
        }, {
          "12": 12,
          "124": 124,
          "125": 125,
          "144": 144,
          "67": 67,
          "71": 71
        }],
        10: [function(_dereq_, module, exports) {
          'use strict';
          var invariant = _dereq_(144);
          function checkMask(value, bitmask) {
            return (value & bitmask) === bitmask;
          }
          var DOMPropertyInjection = {
            MUST_USE_ATTRIBUTE: 0x1,
            MUST_USE_PROPERTY: 0x2,
            HAS_SIDE_EFFECTS: 0x4,
            HAS_BOOLEAN_VALUE: 0x8,
            HAS_NUMERIC_VALUE: 0x10,
            HAS_POSITIVE_NUMERIC_VALUE: 0x20 | 0x10,
            HAS_OVERLOADED_BOOLEAN_VALUE: 0x40,
            injectDOMPropertyConfig: function(domPropertyConfig) {
              var Injection = DOMPropertyInjection;
              var Properties = domPropertyConfig.Properties || {};
              var DOMAttributeNamespaces = domPropertyConfig.DOMAttributeNamespaces || {};
              var DOMAttributeNames = domPropertyConfig.DOMAttributeNames || {};
              var DOMPropertyNames = domPropertyConfig.DOMPropertyNames || {};
              var DOMMutationMethods = domPropertyConfig.DOMMutationMethods || {};
              if (domPropertyConfig.isCustomAttribute) {
                DOMProperty._isCustomAttributeFunctions.push(domPropertyConfig.isCustomAttribute);
              }
              for (var propName in Properties) {
                !!DOMProperty.properties.hasOwnProperty(propName) ? "development" !== 'production' ? invariant(false, 'injectDOMPropertyConfig(...): You\'re trying to inject DOM property ' + '\'%s\' which has already been injected. You may be accidentally ' + 'injecting the same DOM property config twice, or you may be ' + 'injecting two configs that have conflicting property names.', propName) : invariant(false) : undefined;
                var lowerCased = propName.toLowerCase();
                var propConfig = Properties[propName];
                var propertyInfo = {
                  attributeName: lowerCased,
                  attributeNamespace: null,
                  propertyName: propName,
                  mutationMethod: null,
                  mustUseAttribute: checkMask(propConfig, Injection.MUST_USE_ATTRIBUTE),
                  mustUseProperty: checkMask(propConfig, Injection.MUST_USE_PROPERTY),
                  hasSideEffects: checkMask(propConfig, Injection.HAS_SIDE_EFFECTS),
                  hasBooleanValue: checkMask(propConfig, Injection.HAS_BOOLEAN_VALUE),
                  hasNumericValue: checkMask(propConfig, Injection.HAS_NUMERIC_VALUE),
                  hasPositiveNumericValue: checkMask(propConfig, Injection.HAS_POSITIVE_NUMERIC_VALUE),
                  hasOverloadedBooleanValue: checkMask(propConfig, Injection.HAS_OVERLOADED_BOOLEAN_VALUE)
                };
                !(!propertyInfo.mustUseAttribute || !propertyInfo.mustUseProperty) ? "development" !== 'production' ? invariant(false, 'DOMProperty: Cannot require using both attribute and property: %s', propName) : invariant(false) : undefined;
                !(propertyInfo.mustUseProperty || !propertyInfo.hasSideEffects) ? "development" !== 'production' ? invariant(false, 'DOMProperty: Properties that have side effects must use property: %s', propName) : invariant(false) : undefined;
                !(propertyInfo.hasBooleanValue + propertyInfo.hasNumericValue + propertyInfo.hasOverloadedBooleanValue <= 1) ? "development" !== 'production' ? invariant(false, 'DOMProperty: Value can be one of boolean, overloaded boolean, or ' + 'numeric value, but not a combination: %s', propName) : invariant(false) : undefined;
                if ("development" !== 'production') {
                  DOMProperty.getPossibleStandardName[lowerCased] = propName;
                }
                if (DOMAttributeNames.hasOwnProperty(propName)) {
                  var attributeName = DOMAttributeNames[propName];
                  propertyInfo.attributeName = attributeName;
                  if ("development" !== 'production') {
                    DOMProperty.getPossibleStandardName[attributeName] = propName;
                  }
                }
                if (DOMAttributeNamespaces.hasOwnProperty(propName)) {
                  propertyInfo.attributeNamespace = DOMAttributeNamespaces[propName];
                }
                if (DOMPropertyNames.hasOwnProperty(propName)) {
                  propertyInfo.propertyName = DOMPropertyNames[propName];
                }
                if (DOMMutationMethods.hasOwnProperty(propName)) {
                  propertyInfo.mutationMethod = DOMMutationMethods[propName];
                }
                DOMProperty.properties[propName] = propertyInfo;
              }
            }
          };
          var defaultValueCache = {};
          var DOMProperty = {
            ID_ATTRIBUTE_NAME: 'data-reactid',
            properties: {},
            getPossibleStandardName: "development" !== 'production' ? {} : null,
            _isCustomAttributeFunctions: [],
            isCustomAttribute: function(attributeName) {
              for (var i = 0; i < DOMProperty._isCustomAttributeFunctions.length; i++) {
                var isCustomAttributeFn = DOMProperty._isCustomAttributeFunctions[i];
                if (isCustomAttributeFn(attributeName)) {
                  return true;
                }
              }
              return false;
            },
            getDefaultValueForProperty: function(nodeName, prop) {
              var nodeDefaults = defaultValueCache[nodeName];
              var testElement;
              if (!nodeDefaults) {
                defaultValueCache[nodeName] = nodeDefaults = {};
              }
              if (!(prop in nodeDefaults)) {
                testElement = document.createElement(nodeName);
                nodeDefaults[prop] = testElement[prop];
              }
              return nodeDefaults[prop];
            },
            injection: DOMPropertyInjection
          };
          module.exports = DOMProperty;
        }, {"144": 144}],
        11: [function(_dereq_, module, exports) {
          'use strict';
          var DOMProperty = _dereq_(10);
          var ReactPerf = _dereq_(71);
          var quoteAttributeValueForBrowser = _dereq_(122);
          var warning = _dereq_(155);
          var VALID_ATTRIBUTE_NAME_REGEX = /^[a-zA-Z_][\w\.\-]*$/;
          var illegalAttributeNameCache = {};
          var validatedAttributeNameCache = {};
          function isAttributeNameSafe(attributeName) {
            if (validatedAttributeNameCache.hasOwnProperty(attributeName)) {
              return true;
            }
            if (illegalAttributeNameCache.hasOwnProperty(attributeName)) {
              return false;
            }
            if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
              validatedAttributeNameCache[attributeName] = true;
              return true;
            }
            illegalAttributeNameCache[attributeName] = true;
            "development" !== 'production' ? warning(false, 'Invalid attribute name: `%s`', attributeName) : undefined;
            return false;
          }
          function shouldIgnoreValue(propertyInfo, value) {
            return value == null || propertyInfo.hasBooleanValue && !value || propertyInfo.hasNumericValue && isNaN(value) || propertyInfo.hasPositiveNumericValue && value < 1 || propertyInfo.hasOverloadedBooleanValue && value === false;
          }
          if ("development" !== 'production') {
            var reactProps = {
              children: true,
              dangerouslySetInnerHTML: true,
              key: true,
              ref: true
            };
            var warnedProperties = {};
            var warnUnknownProperty = function(name) {
              if (reactProps.hasOwnProperty(name) && reactProps[name] || warnedProperties.hasOwnProperty(name) && warnedProperties[name]) {
                return;
              }
              warnedProperties[name] = true;
              var lowerCasedName = name.toLowerCase();
              var standardName = DOMProperty.isCustomAttribute(lowerCasedName) ? lowerCasedName : DOMProperty.getPossibleStandardName.hasOwnProperty(lowerCasedName) ? DOMProperty.getPossibleStandardName[lowerCasedName] : null;
              "development" !== 'production' ? warning(standardName == null, 'Unknown DOM property %s. Did you mean %s?', name, standardName) : undefined;
            };
          }
          var DOMPropertyOperations = {
            createMarkupForID: function(id) {
              return DOMProperty.ID_ATTRIBUTE_NAME + '=' + quoteAttributeValueForBrowser(id);
            },
            setAttributeForID: function(node, id) {
              node.setAttribute(DOMProperty.ID_ATTRIBUTE_NAME, id);
            },
            createMarkupForProperty: function(name, value) {
              var propertyInfo = DOMProperty.properties.hasOwnProperty(name) ? DOMProperty.properties[name] : null;
              if (propertyInfo) {
                if (shouldIgnoreValue(propertyInfo, value)) {
                  return '';
                }
                var attributeName = propertyInfo.attributeName;
                if (propertyInfo.hasBooleanValue || propertyInfo.hasOverloadedBooleanValue && value === true) {
                  return attributeName + '=""';
                }
                return attributeName + '=' + quoteAttributeValueForBrowser(value);
              } else if (DOMProperty.isCustomAttribute(name)) {
                if (value == null) {
                  return '';
                }
                return name + '=' + quoteAttributeValueForBrowser(value);
              } else if ("development" !== 'production') {
                warnUnknownProperty(name);
              }
              return null;
            },
            createMarkupForCustomAttribute: function(name, value) {
              if (!isAttributeNameSafe(name) || value == null) {
                return '';
              }
              return name + '=' + quoteAttributeValueForBrowser(value);
            },
            setValueForProperty: function(node, name, value) {
              var propertyInfo = DOMProperty.properties.hasOwnProperty(name) ? DOMProperty.properties[name] : null;
              if (propertyInfo) {
                var mutationMethod = propertyInfo.mutationMethod;
                if (mutationMethod) {
                  mutationMethod(node, value);
                } else if (shouldIgnoreValue(propertyInfo, value)) {
                  this.deleteValueForProperty(node, name);
                } else if (propertyInfo.mustUseAttribute) {
                  var attributeName = propertyInfo.attributeName;
                  var namespace = propertyInfo.attributeNamespace;
                  if (namespace) {
                    node.setAttributeNS(namespace, attributeName, '' + value);
                  } else if (propertyInfo.hasBooleanValue || propertyInfo.hasOverloadedBooleanValue && value === true) {
                    node.setAttribute(attributeName, '');
                  } else {
                    node.setAttribute(attributeName, '' + value);
                  }
                } else {
                  var propName = propertyInfo.propertyName;
                  if (!propertyInfo.hasSideEffects || '' + node[propName] !== '' + value) {
                    node[propName] = value;
                  }
                }
              } else if (DOMProperty.isCustomAttribute(name)) {
                DOMPropertyOperations.setValueForAttribute(node, name, value);
              } else if ("development" !== 'production') {
                warnUnknownProperty(name);
              }
            },
            setValueForAttribute: function(node, name, value) {
              if (!isAttributeNameSafe(name)) {
                return;
              }
              if (value == null) {
                node.removeAttribute(name);
              } else {
                node.setAttribute(name, '' + value);
              }
            },
            deleteValueForProperty: function(node, name) {
              var propertyInfo = DOMProperty.properties.hasOwnProperty(name) ? DOMProperty.properties[name] : null;
              if (propertyInfo) {
                var mutationMethod = propertyInfo.mutationMethod;
                if (mutationMethod) {
                  mutationMethod(node, undefined);
                } else if (propertyInfo.mustUseAttribute) {
                  node.removeAttribute(propertyInfo.attributeName);
                } else {
                  var propName = propertyInfo.propertyName;
                  var defaultValue = DOMProperty.getDefaultValueForProperty(node.nodeName, propName);
                  if (!propertyInfo.hasSideEffects || '' + node[propName] !== defaultValue) {
                    node[propName] = defaultValue;
                  }
                }
              } else if (DOMProperty.isCustomAttribute(name)) {
                node.removeAttribute(name);
              } else if ("development" !== 'production') {
                warnUnknownProperty(name);
              }
            }
          };
          ReactPerf.measureMethods(DOMPropertyOperations, 'DOMPropertyOperations', {
            setValueForProperty: 'setValueForProperty',
            setValueForAttribute: 'setValueForAttribute',
            deleteValueForProperty: 'deleteValueForProperty'
          });
          module.exports = DOMPropertyOperations;
        }, {
          "10": 10,
          "122": 122,
          "155": 155,
          "71": 71
        }],
        12: [function(_dereq_, module, exports) {
          'use strict';
          var ExecutionEnvironment = _dereq_(130);
          var createNodesFromMarkup = _dereq_(135);
          var emptyFunction = _dereq_(136);
          var getMarkupWrap = _dereq_(140);
          var invariant = _dereq_(144);
          var OPEN_TAG_NAME_EXP = /^(<[^ \/>]+)/;
          var RESULT_INDEX_ATTR = 'data-danger-index';
          function getNodeName(markup) {
            return markup.substring(1, markup.indexOf(' '));
          }
          var Danger = {
            dangerouslyRenderMarkup: function(markupList) {
              !ExecutionEnvironment.canUseDOM ? "development" !== 'production' ? invariant(false, 'dangerouslyRenderMarkup(...): Cannot render markup in a worker ' + 'thread. Make sure `window` and `document` are available globally ' + 'before requiring React when unit testing or use ' + 'ReactDOMServer.renderToString for server rendering.') : invariant(false) : undefined;
              var nodeName;
              var markupByNodeName = {};
              for (var i = 0; i < markupList.length; i++) {
                !markupList[i] ? "development" !== 'production' ? invariant(false, 'dangerouslyRenderMarkup(...): Missing markup.') : invariant(false) : undefined;
                nodeName = getNodeName(markupList[i]);
                nodeName = getMarkupWrap(nodeName) ? nodeName : '*';
                markupByNodeName[nodeName] = markupByNodeName[nodeName] || [];
                markupByNodeName[nodeName][i] = markupList[i];
              }
              var resultList = [];
              var resultListAssignmentCount = 0;
              for (nodeName in markupByNodeName) {
                if (!markupByNodeName.hasOwnProperty(nodeName)) {
                  continue;
                }
                var markupListByNodeName = markupByNodeName[nodeName];
                var resultIndex;
                for (resultIndex in markupListByNodeName) {
                  if (markupListByNodeName.hasOwnProperty(resultIndex)) {
                    var markup = markupListByNodeName[resultIndex];
                    markupListByNodeName[resultIndex] = markup.replace(OPEN_TAG_NAME_EXP, '$1 ' + RESULT_INDEX_ATTR + '="' + resultIndex + '" ');
                  }
                }
                var renderNodes = createNodesFromMarkup(markupListByNodeName.join(''), emptyFunction);
                for (var j = 0; j < renderNodes.length; ++j) {
                  var renderNode = renderNodes[j];
                  if (renderNode.hasAttribute && renderNode.hasAttribute(RESULT_INDEX_ATTR)) {
                    resultIndex = +renderNode.getAttribute(RESULT_INDEX_ATTR);
                    renderNode.removeAttribute(RESULT_INDEX_ATTR);
                    !!resultList.hasOwnProperty(resultIndex) ? "development" !== 'production' ? invariant(false, 'Danger: Assigning to an already-occupied result index.') : invariant(false) : undefined;
                    resultList[resultIndex] = renderNode;
                    resultListAssignmentCount += 1;
                  } else if ("development" !== 'production') {
                    console.error('Danger: Discarding unexpected node:', renderNode);
                  }
                }
              }
              !(resultListAssignmentCount === resultList.length) ? "development" !== 'production' ? invariant(false, 'Danger: Did not assign to every index of resultList.') : invariant(false) : undefined;
              !(resultList.length === markupList.length) ? "development" !== 'production' ? invariant(false, 'Danger: Expected markup to render %s nodes, but rendered %s.', markupList.length, resultList.length) : invariant(false) : undefined;
              return resultList;
            },
            dangerouslyReplaceNodeWithMarkup: function(oldChild, markup) {
              !ExecutionEnvironment.canUseDOM ? "development" !== 'production' ? invariant(false, 'dangerouslyReplaceNodeWithMarkup(...): Cannot render markup in a ' + 'worker thread. Make sure `window` and `document` are available ' + 'globally before requiring React when unit testing or use ' + 'ReactDOMServer.renderToString() for server rendering.') : invariant(false) : undefined;
              !markup ? "development" !== 'production' ? invariant(false, 'dangerouslyReplaceNodeWithMarkup(...): Missing markup.') : invariant(false) : undefined;
              !(oldChild.tagName.toLowerCase() !== 'html') ? "development" !== 'production' ? invariant(false, 'dangerouslyReplaceNodeWithMarkup(...): Cannot replace markup of the ' + '<html> node. This is because browser quirks make this unreliable ' + 'and/or slow. If you want to render to the root you must use ' + 'server rendering. See ReactDOMServer.renderToString().') : invariant(false) : undefined;
              var newChild;
              if (typeof markup === 'string') {
                newChild = createNodesFromMarkup(markup, emptyFunction)[0];
              } else {
                newChild = markup;
              }
              oldChild.parentNode.replaceChild(newChild, oldChild);
            }
          };
          module.exports = Danger;
        }, {
          "130": 130,
          "135": 135,
          "136": 136,
          "140": 140,
          "144": 144
        }],
        13: [function(_dereq_, module, exports) {
          'use strict';
          var keyOf = _dereq_(148);
          var DefaultEventPluginOrder = [keyOf({ResponderEventPlugin: null}), keyOf({SimpleEventPlugin: null}), keyOf({TapEventPlugin: null}), keyOf({EnterLeaveEventPlugin: null}), keyOf({ChangeEventPlugin: null}), keyOf({SelectEventPlugin: null}), keyOf({BeforeInputEventPlugin: null})];
          module.exports = DefaultEventPluginOrder;
        }, {"148": 148}],
        14: [function(_dereq_, module, exports) {
          'use strict';
          var EventConstants = _dereq_(15);
          var EventPropagators = _dereq_(19);
          var SyntheticMouseEvent = _dereq_(96);
          var ReactMount = _dereq_(65);
          var keyOf = _dereq_(148);
          var topLevelTypes = EventConstants.topLevelTypes;
          var getFirstReactDOM = ReactMount.getFirstReactDOM;
          var eventTypes = {
            mouseEnter: {
              registrationName: keyOf({onMouseEnter: null}),
              dependencies: [topLevelTypes.topMouseOut, topLevelTypes.topMouseOver]
            },
            mouseLeave: {
              registrationName: keyOf({onMouseLeave: null}),
              dependencies: [topLevelTypes.topMouseOut, topLevelTypes.topMouseOver]
            }
          };
          var extractedEvents = [null, null];
          var EnterLeaveEventPlugin = {
            eventTypes: eventTypes,
            extractEvents: function(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
              if (topLevelType === topLevelTypes.topMouseOver && (nativeEvent.relatedTarget || nativeEvent.fromElement)) {
                return null;
              }
              if (topLevelType !== topLevelTypes.topMouseOut && topLevelType !== topLevelTypes.topMouseOver) {
                return null;
              }
              var win;
              if (topLevelTarget.window === topLevelTarget) {
                win = topLevelTarget;
              } else {
                var doc = topLevelTarget.ownerDocument;
                if (doc) {
                  win = doc.defaultView || doc.parentWindow;
                } else {
                  win = window;
                }
              }
              var from;
              var to;
              var fromID = '';
              var toID = '';
              if (topLevelType === topLevelTypes.topMouseOut) {
                from = topLevelTarget;
                fromID = topLevelTargetID;
                to = getFirstReactDOM(nativeEvent.relatedTarget || nativeEvent.toElement);
                if (to) {
                  toID = ReactMount.getID(to);
                } else {
                  to = win;
                }
                to = to || win;
              } else {
                from = win;
                to = topLevelTarget;
                toID = topLevelTargetID;
              }
              if (from === to) {
                return null;
              }
              var leave = SyntheticMouseEvent.getPooled(eventTypes.mouseLeave, fromID, nativeEvent, nativeEventTarget);
              leave.type = 'mouseleave';
              leave.target = from;
              leave.relatedTarget = to;
              var enter = SyntheticMouseEvent.getPooled(eventTypes.mouseEnter, toID, nativeEvent, nativeEventTarget);
              enter.type = 'mouseenter';
              enter.target = to;
              enter.relatedTarget = from;
              EventPropagators.accumulateEnterLeaveDispatches(leave, enter, fromID, toID);
              extractedEvents[0] = leave;
              extractedEvents[1] = enter;
              return extractedEvents;
            }
          };
          module.exports = EnterLeaveEventPlugin;
        }, {
          "148": 148,
          "15": 15,
          "19": 19,
          "65": 65,
          "96": 96
        }],
        15: [function(_dereq_, module, exports) {
          'use strict';
          var keyMirror = _dereq_(147);
          var PropagationPhases = keyMirror({
            bubbled: null,
            captured: null
          });
          var topLevelTypes = keyMirror({
            topAbort: null,
            topBlur: null,
            topCanPlay: null,
            topCanPlayThrough: null,
            topChange: null,
            topClick: null,
            topCompositionEnd: null,
            topCompositionStart: null,
            topCompositionUpdate: null,
            topContextMenu: null,
            topCopy: null,
            topCut: null,
            topDoubleClick: null,
            topDrag: null,
            topDragEnd: null,
            topDragEnter: null,
            topDragExit: null,
            topDragLeave: null,
            topDragOver: null,
            topDragStart: null,
            topDrop: null,
            topDurationChange: null,
            topEmptied: null,
            topEncrypted: null,
            topEnded: null,
            topError: null,
            topFocus: null,
            topInput: null,
            topKeyDown: null,
            topKeyPress: null,
            topKeyUp: null,
            topLoad: null,
            topLoadedData: null,
            topLoadedMetadata: null,
            topLoadStart: null,
            topMouseDown: null,
            topMouseMove: null,
            topMouseOut: null,
            topMouseOver: null,
            topMouseUp: null,
            topPaste: null,
            topPause: null,
            topPlay: null,
            topPlaying: null,
            topProgress: null,
            topRateChange: null,
            topReset: null,
            topScroll: null,
            topSeeked: null,
            topSeeking: null,
            topSelectionChange: null,
            topStalled: null,
            topSubmit: null,
            topSuspend: null,
            topTextInput: null,
            topTimeUpdate: null,
            topTouchCancel: null,
            topTouchEnd: null,
            topTouchMove: null,
            topTouchStart: null,
            topVolumeChange: null,
            topWaiting: null,
            topWheel: null
          });
          var EventConstants = {
            topLevelTypes: topLevelTypes,
            PropagationPhases: PropagationPhases
          };
          module.exports = EventConstants;
        }, {"147": 147}],
        16: [function(_dereq_, module, exports) {
          'use strict';
          var EventPluginRegistry = _dereq_(17);
          var EventPluginUtils = _dereq_(18);
          var ReactErrorUtils = _dereq_(56);
          var accumulateInto = _dereq_(102);
          var forEachAccumulated = _dereq_(110);
          var invariant = _dereq_(144);
          var warning = _dereq_(155);
          var listenerBank = {};
          var eventQueue = null;
          var executeDispatchesAndRelease = function(event, simulated) {
            if (event) {
              EventPluginUtils.executeDispatchesInOrder(event, simulated);
              if (!event.isPersistent()) {
                event.constructor.release(event);
              }
            }
          };
          var executeDispatchesAndReleaseSimulated = function(e) {
            return executeDispatchesAndRelease(e, true);
          };
          var executeDispatchesAndReleaseTopLevel = function(e) {
            return executeDispatchesAndRelease(e, false);
          };
          var InstanceHandle = null;
          function validateInstanceHandle() {
            var valid = InstanceHandle && InstanceHandle.traverseTwoPhase && InstanceHandle.traverseEnterLeave;
            "development" !== 'production' ? warning(valid, 'InstanceHandle not injected before use!') : undefined;
          }
          var EventPluginHub = {
            injection: {
              injectMount: EventPluginUtils.injection.injectMount,
              injectInstanceHandle: function(InjectedInstanceHandle) {
                InstanceHandle = InjectedInstanceHandle;
                if ("development" !== 'production') {
                  validateInstanceHandle();
                }
              },
              getInstanceHandle: function() {
                if ("development" !== 'production') {
                  validateInstanceHandle();
                }
                return InstanceHandle;
              },
              injectEventPluginOrder: EventPluginRegistry.injectEventPluginOrder,
              injectEventPluginsByName: EventPluginRegistry.injectEventPluginsByName
            },
            eventNameDispatchConfigs: EventPluginRegistry.eventNameDispatchConfigs,
            registrationNameModules: EventPluginRegistry.registrationNameModules,
            putListener: function(id, registrationName, listener) {
              !(typeof listener === 'function') ? "development" !== 'production' ? invariant(false, 'Expected %s listener to be a function, instead got type %s', registrationName, typeof listener) : invariant(false) : undefined;
              var bankForRegistrationName = listenerBank[registrationName] || (listenerBank[registrationName] = {});
              bankForRegistrationName[id] = listener;
              var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
              if (PluginModule && PluginModule.didPutListener) {
                PluginModule.didPutListener(id, registrationName, listener);
              }
            },
            getListener: function(id, registrationName) {
              var bankForRegistrationName = listenerBank[registrationName];
              return bankForRegistrationName && bankForRegistrationName[id];
            },
            deleteListener: function(id, registrationName) {
              var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
              if (PluginModule && PluginModule.willDeleteListener) {
                PluginModule.willDeleteListener(id, registrationName);
              }
              var bankForRegistrationName = listenerBank[registrationName];
              if (bankForRegistrationName) {
                delete bankForRegistrationName[id];
              }
            },
            deleteAllListeners: function(id) {
              for (var registrationName in listenerBank) {
                if (!listenerBank[registrationName][id]) {
                  continue;
                }
                var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
                if (PluginModule && PluginModule.willDeleteListener) {
                  PluginModule.willDeleteListener(id, registrationName);
                }
                delete listenerBank[registrationName][id];
              }
            },
            extractEvents: function(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
              var events;
              var plugins = EventPluginRegistry.plugins;
              for (var i = 0; i < plugins.length; i++) {
                var possiblePlugin = plugins[i];
                if (possiblePlugin) {
                  var extractedEvents = possiblePlugin.extractEvents(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget);
                  if (extractedEvents) {
                    events = accumulateInto(events, extractedEvents);
                  }
                }
              }
              return events;
            },
            enqueueEvents: function(events) {
              if (events) {
                eventQueue = accumulateInto(eventQueue, events);
              }
            },
            processEventQueue: function(simulated) {
              var processingEventQueue = eventQueue;
              eventQueue = null;
              if (simulated) {
                forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseSimulated);
              } else {
                forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseTopLevel);
              }
              !!eventQueue ? "development" !== 'production' ? invariant(false, 'processEventQueue(): Additional events were enqueued while processing ' + 'an event queue. Support for this has not yet been implemented.') : invariant(false) : undefined;
              ReactErrorUtils.rethrowCaughtError();
            },
            __purge: function() {
              listenerBank = {};
            },
            __getListenerBank: function() {
              return listenerBank;
            }
          };
          module.exports = EventPluginHub;
        }, {
          "102": 102,
          "110": 110,
          "144": 144,
          "155": 155,
          "17": 17,
          "18": 18,
          "56": 56
        }],
        17: [function(_dereq_, module, exports) {
          'use strict';
          var invariant = _dereq_(144);
          var EventPluginOrder = null;
          var namesToPlugins = {};
          function recomputePluginOrdering() {
            if (!EventPluginOrder) {
              return;
            }
            for (var pluginName in namesToPlugins) {
              var PluginModule = namesToPlugins[pluginName];
              var pluginIndex = EventPluginOrder.indexOf(pluginName);
              !(pluginIndex > -1) ? "development" !== 'production' ? invariant(false, 'EventPluginRegistry: Cannot inject event plugins that do not exist in ' + 'the plugin ordering, `%s`.', pluginName) : invariant(false) : undefined;
              if (EventPluginRegistry.plugins[pluginIndex]) {
                continue;
              }
              !PluginModule.extractEvents ? "development" !== 'production' ? invariant(false, 'EventPluginRegistry: Event plugins must implement an `extractEvents` ' + 'method, but `%s` does not.', pluginName) : invariant(false) : undefined;
              EventPluginRegistry.plugins[pluginIndex] = PluginModule;
              var publishedEvents = PluginModule.eventTypes;
              for (var eventName in publishedEvents) {
                !publishEventForPlugin(publishedEvents[eventName], PluginModule, eventName) ? "development" !== 'production' ? invariant(false, 'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.', eventName, pluginName) : invariant(false) : undefined;
              }
            }
          }
          function publishEventForPlugin(dispatchConfig, PluginModule, eventName) {
            !!EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName) ? "development" !== 'production' ? invariant(false, 'EventPluginHub: More than one plugin attempted to publish the same ' + 'event name, `%s`.', eventName) : invariant(false) : undefined;
            EventPluginRegistry.eventNameDispatchConfigs[eventName] = dispatchConfig;
            var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
            if (phasedRegistrationNames) {
              for (var phaseName in phasedRegistrationNames) {
                if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
                  var phasedRegistrationName = phasedRegistrationNames[phaseName];
                  publishRegistrationName(phasedRegistrationName, PluginModule, eventName);
                }
              }
              return true;
            } else if (dispatchConfig.registrationName) {
              publishRegistrationName(dispatchConfig.registrationName, PluginModule, eventName);
              return true;
            }
            return false;
          }
          function publishRegistrationName(registrationName, PluginModule, eventName) {
            !!EventPluginRegistry.registrationNameModules[registrationName] ? "development" !== 'production' ? invariant(false, 'EventPluginHub: More than one plugin attempted to publish the same ' + 'registration name, `%s`.', registrationName) : invariant(false) : undefined;
            EventPluginRegistry.registrationNameModules[registrationName] = PluginModule;
            EventPluginRegistry.registrationNameDependencies[registrationName] = PluginModule.eventTypes[eventName].dependencies;
          }
          var EventPluginRegistry = {
            plugins: [],
            eventNameDispatchConfigs: {},
            registrationNameModules: {},
            registrationNameDependencies: {},
            injectEventPluginOrder: function(InjectedEventPluginOrder) {
              !!EventPluginOrder ? "development" !== 'production' ? invariant(false, 'EventPluginRegistry: Cannot inject event plugin ordering more than ' + 'once. You are likely trying to load more than one copy of React.') : invariant(false) : undefined;
              EventPluginOrder = Array.prototype.slice.call(InjectedEventPluginOrder);
              recomputePluginOrdering();
            },
            injectEventPluginsByName: function(injectedNamesToPlugins) {
              var isOrderingDirty = false;
              for (var pluginName in injectedNamesToPlugins) {
                if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
                  continue;
                }
                var PluginModule = injectedNamesToPlugins[pluginName];
                if (!namesToPlugins.hasOwnProperty(pluginName) || namesToPlugins[pluginName] !== PluginModule) {
                  !!namesToPlugins[pluginName] ? "development" !== 'production' ? invariant(false, 'EventPluginRegistry: Cannot inject two different event plugins ' + 'using the same name, `%s`.', pluginName) : invariant(false) : undefined;
                  namesToPlugins[pluginName] = PluginModule;
                  isOrderingDirty = true;
                }
              }
              if (isOrderingDirty) {
                recomputePluginOrdering();
              }
            },
            getPluginModuleForEvent: function(event) {
              var dispatchConfig = event.dispatchConfig;
              if (dispatchConfig.registrationName) {
                return EventPluginRegistry.registrationNameModules[dispatchConfig.registrationName] || null;
              }
              for (var phase in dispatchConfig.phasedRegistrationNames) {
                if (!dispatchConfig.phasedRegistrationNames.hasOwnProperty(phase)) {
                  continue;
                }
                var PluginModule = EventPluginRegistry.registrationNameModules[dispatchConfig.phasedRegistrationNames[phase]];
                if (PluginModule) {
                  return PluginModule;
                }
              }
              return null;
            },
            _resetEventPlugins: function() {
              EventPluginOrder = null;
              for (var pluginName in namesToPlugins) {
                if (namesToPlugins.hasOwnProperty(pluginName)) {
                  delete namesToPlugins[pluginName];
                }
              }
              EventPluginRegistry.plugins.length = 0;
              var eventNameDispatchConfigs = EventPluginRegistry.eventNameDispatchConfigs;
              for (var eventName in eventNameDispatchConfigs) {
                if (eventNameDispatchConfigs.hasOwnProperty(eventName)) {
                  delete eventNameDispatchConfigs[eventName];
                }
              }
              var registrationNameModules = EventPluginRegistry.registrationNameModules;
              for (var registrationName in registrationNameModules) {
                if (registrationNameModules.hasOwnProperty(registrationName)) {
                  delete registrationNameModules[registrationName];
                }
              }
            }
          };
          module.exports = EventPluginRegistry;
        }, {"144": 144}],
        18: [function(_dereq_, module, exports) {
          'use strict';
          var EventConstants = _dereq_(15);
          var ReactErrorUtils = _dereq_(56);
          var invariant = _dereq_(144);
          var warning = _dereq_(155);
          var injection = {
            Mount: null,
            injectMount: function(InjectedMount) {
              injection.Mount = InjectedMount;
              if ("development" !== 'production') {
                "development" !== 'production' ? warning(InjectedMount && InjectedMount.getNode && InjectedMount.getID, 'EventPluginUtils.injection.injectMount(...): Injected Mount ' + 'module is missing getNode or getID.') : undefined;
              }
            }
          };
          var topLevelTypes = EventConstants.topLevelTypes;
          function isEndish(topLevelType) {
            return topLevelType === topLevelTypes.topMouseUp || topLevelType === topLevelTypes.topTouchEnd || topLevelType === topLevelTypes.topTouchCancel;
          }
          function isMoveish(topLevelType) {
            return topLevelType === topLevelTypes.topMouseMove || topLevelType === topLevelTypes.topTouchMove;
          }
          function isStartish(topLevelType) {
            return topLevelType === topLevelTypes.topMouseDown || topLevelType === topLevelTypes.topTouchStart;
          }
          var validateEventDispatches;
          if ("development" !== 'production') {
            validateEventDispatches = function(event) {
              var dispatchListeners = event._dispatchListeners;
              var dispatchIDs = event._dispatchIDs;
              var listenersIsArr = Array.isArray(dispatchListeners);
              var idsIsArr = Array.isArray(dispatchIDs);
              var IDsLen = idsIsArr ? dispatchIDs.length : dispatchIDs ? 1 : 0;
              var listenersLen = listenersIsArr ? dispatchListeners.length : dispatchListeners ? 1 : 0;
              "development" !== 'production' ? warning(idsIsArr === listenersIsArr && IDsLen === listenersLen, 'EventPluginUtils: Invalid `event`.') : undefined;
            };
          }
          function executeDispatch(event, simulated, listener, domID) {
            var type = event.type || 'unknown-event';
            event.currentTarget = injection.Mount.getNode(domID);
            if (simulated) {
              ReactErrorUtils.invokeGuardedCallbackWithCatch(type, listener, event, domID);
            } else {
              ReactErrorUtils.invokeGuardedCallback(type, listener, event, domID);
            }
            event.currentTarget = null;
          }
          function executeDispatchesInOrder(event, simulated) {
            var dispatchListeners = event._dispatchListeners;
            var dispatchIDs = event._dispatchIDs;
            if ("development" !== 'production') {
              validateEventDispatches(event);
            }
            if (Array.isArray(dispatchListeners)) {
              for (var i = 0; i < dispatchListeners.length; i++) {
                if (event.isPropagationStopped()) {
                  break;
                }
                executeDispatch(event, simulated, dispatchListeners[i], dispatchIDs[i]);
              }
            } else if (dispatchListeners) {
              executeDispatch(event, simulated, dispatchListeners, dispatchIDs);
            }
            event._dispatchListeners = null;
            event._dispatchIDs = null;
          }
          function executeDispatchesInOrderStopAtTrueImpl(event) {
            var dispatchListeners = event._dispatchListeners;
            var dispatchIDs = event._dispatchIDs;
            if ("development" !== 'production') {
              validateEventDispatches(event);
            }
            if (Array.isArray(dispatchListeners)) {
              for (var i = 0; i < dispatchListeners.length; i++) {
                if (event.isPropagationStopped()) {
                  break;
                }
                if (dispatchListeners[i](event, dispatchIDs[i])) {
                  return dispatchIDs[i];
                }
              }
            } else if (dispatchListeners) {
              if (dispatchListeners(event, dispatchIDs)) {
                return dispatchIDs;
              }
            }
            return null;
          }
          function executeDispatchesInOrderStopAtTrue(event) {
            var ret = executeDispatchesInOrderStopAtTrueImpl(event);
            event._dispatchIDs = null;
            event._dispatchListeners = null;
            return ret;
          }
          function executeDirectDispatch(event) {
            if ("development" !== 'production') {
              validateEventDispatches(event);
            }
            var dispatchListener = event._dispatchListeners;
            var dispatchID = event._dispatchIDs;
            !!Array.isArray(dispatchListener) ? "development" !== 'production' ? invariant(false, 'executeDirectDispatch(...): Invalid `event`.') : invariant(false) : undefined;
            var res = dispatchListener ? dispatchListener(event, dispatchID) : null;
            event._dispatchListeners = null;
            event._dispatchIDs = null;
            return res;
          }
          function hasDispatches(event) {
            return !!event._dispatchListeners;
          }
          var EventPluginUtils = {
            isEndish: isEndish,
            isMoveish: isMoveish,
            isStartish: isStartish,
            executeDirectDispatch: executeDirectDispatch,
            executeDispatchesInOrder: executeDispatchesInOrder,
            executeDispatchesInOrderStopAtTrue: executeDispatchesInOrderStopAtTrue,
            hasDispatches: hasDispatches,
            getNode: function(id) {
              return injection.Mount.getNode(id);
            },
            getID: function(node) {
              return injection.Mount.getID(node);
            },
            injection: injection
          };
          module.exports = EventPluginUtils;
        }, {
          "144": 144,
          "15": 15,
          "155": 155,
          "56": 56
        }],
        19: [function(_dereq_, module, exports) {
          'use strict';
          var EventConstants = _dereq_(15);
          var EventPluginHub = _dereq_(16);
          var warning = _dereq_(155);
          var accumulateInto = _dereq_(102);
          var forEachAccumulated = _dereq_(110);
          var PropagationPhases = EventConstants.PropagationPhases;
          var getListener = EventPluginHub.getListener;
          function listenerAtPhase(id, event, propagationPhase) {
            var registrationName = event.dispatchConfig.phasedRegistrationNames[propagationPhase];
            return getListener(id, registrationName);
          }
          function accumulateDirectionalDispatches(domID, upwards, event) {
            if ("development" !== 'production') {
              "development" !== 'production' ? warning(domID, 'Dispatching id must not be null') : undefined;
            }
            var phase = upwards ? PropagationPhases.bubbled : PropagationPhases.captured;
            var listener = listenerAtPhase(domID, event, phase);
            if (listener) {
              event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
              event._dispatchIDs = accumulateInto(event._dispatchIDs, domID);
            }
          }
          function accumulateTwoPhaseDispatchesSingle(event) {
            if (event && event.dispatchConfig.phasedRegistrationNames) {
              EventPluginHub.injection.getInstanceHandle().traverseTwoPhase(event.dispatchMarker, accumulateDirectionalDispatches, event);
            }
          }
          function accumulateTwoPhaseDispatchesSingleSkipTarget(event) {
            if (event && event.dispatchConfig.phasedRegistrationNames) {
              EventPluginHub.injection.getInstanceHandle().traverseTwoPhaseSkipTarget(event.dispatchMarker, accumulateDirectionalDispatches, event);
            }
          }
          function accumulateDispatches(id, ignoredDirection, event) {
            if (event && event.dispatchConfig.registrationName) {
              var registrationName = event.dispatchConfig.registrationName;
              var listener = getListener(id, registrationName);
              if (listener) {
                event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
                event._dispatchIDs = accumulateInto(event._dispatchIDs, id);
              }
            }
          }
          function accumulateDirectDispatchesSingle(event) {
            if (event && event.dispatchConfig.registrationName) {
              accumulateDispatches(event.dispatchMarker, null, event);
            }
          }
          function accumulateTwoPhaseDispatches(events) {
            forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
          }
          function accumulateTwoPhaseDispatchesSkipTarget(events) {
            forEachAccumulated(events, accumulateTwoPhaseDispatchesSingleSkipTarget);
          }
          function accumulateEnterLeaveDispatches(leave, enter, fromID, toID) {
            EventPluginHub.injection.getInstanceHandle().traverseEnterLeave(fromID, toID, accumulateDispatches, leave, enter);
          }
          function accumulateDirectDispatches(events) {
            forEachAccumulated(events, accumulateDirectDispatchesSingle);
          }
          var EventPropagators = {
            accumulateTwoPhaseDispatches: accumulateTwoPhaseDispatches,
            accumulateTwoPhaseDispatchesSkipTarget: accumulateTwoPhaseDispatchesSkipTarget,
            accumulateDirectDispatches: accumulateDirectDispatches,
            accumulateEnterLeaveDispatches: accumulateEnterLeaveDispatches
          };
          module.exports = EventPropagators;
        }, {
          "102": 102,
          "110": 110,
          "15": 15,
          "155": 155,
          "16": 16
        }],
        20: [function(_dereq_, module, exports) {
          'use strict';
          var PooledClass = _dereq_(24);
          var assign = _dereq_(23);
          var getTextContentAccessor = _dereq_(117);
          function FallbackCompositionState(root) {
            this._root = root;
            this._startText = this.getText();
            this._fallbackText = null;
          }
          assign(FallbackCompositionState.prototype, {
            destructor: function() {
              this._root = null;
              this._startText = null;
              this._fallbackText = null;
            },
            getText: function() {
              if ('value' in this._root) {
                return this._root.value;
              }
              return this._root[getTextContentAccessor()];
            },
            getData: function() {
              if (this._fallbackText) {
                return this._fallbackText;
              }
              var start;
              var startValue = this._startText;
              var startLength = startValue.length;
              var end;
              var endValue = this.getText();
              var endLength = endValue.length;
              for (start = 0; start < startLength; start++) {
                if (startValue[start] !== endValue[start]) {
                  break;
                }
              }
              var minEnd = startLength - start;
              for (end = 1; end <= minEnd; end++) {
                if (startValue[startLength - end] !== endValue[endLength - end]) {
                  break;
                }
              }
              var sliceTail = end > 1 ? 1 - end : undefined;
              this._fallbackText = endValue.slice(start, sliceTail);
              return this._fallbackText;
            }
          });
          PooledClass.addPoolingTo(FallbackCompositionState);
          module.exports = FallbackCompositionState;
        }, {
          "117": 117,
          "23": 23,
          "24": 24
        }],
        21: [function(_dereq_, module, exports) {
          'use strict';
          var DOMProperty = _dereq_(10);
          var ExecutionEnvironment = _dereq_(130);
          var MUST_USE_ATTRIBUTE = DOMProperty.injection.MUST_USE_ATTRIBUTE;
          var MUST_USE_PROPERTY = DOMProperty.injection.MUST_USE_PROPERTY;
          var HAS_BOOLEAN_VALUE = DOMProperty.injection.HAS_BOOLEAN_VALUE;
          var HAS_SIDE_EFFECTS = DOMProperty.injection.HAS_SIDE_EFFECTS;
          var HAS_NUMERIC_VALUE = DOMProperty.injection.HAS_NUMERIC_VALUE;
          var HAS_POSITIVE_NUMERIC_VALUE = DOMProperty.injection.HAS_POSITIVE_NUMERIC_VALUE;
          var HAS_OVERLOADED_BOOLEAN_VALUE = DOMProperty.injection.HAS_OVERLOADED_BOOLEAN_VALUE;
          var hasSVG;
          if (ExecutionEnvironment.canUseDOM) {
            var implementation = document.implementation;
            hasSVG = implementation && implementation.hasFeature && implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1');
          }
          var HTMLDOMPropertyConfig = {
            isCustomAttribute: RegExp.prototype.test.bind(/^(data|aria)-[a-z_][a-z\d_.\-]*$/),
            Properties: {
              accept: null,
              acceptCharset: null,
              accessKey: null,
              action: null,
              allowFullScreen: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
              allowTransparency: MUST_USE_ATTRIBUTE,
              alt: null,
              async: HAS_BOOLEAN_VALUE,
              autoComplete: null,
              autoPlay: HAS_BOOLEAN_VALUE,
              capture: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
              cellPadding: null,
              cellSpacing: null,
              charSet: MUST_USE_ATTRIBUTE,
              challenge: MUST_USE_ATTRIBUTE,
              checked: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
              classID: MUST_USE_ATTRIBUTE,
              className: hasSVG ? MUST_USE_ATTRIBUTE : MUST_USE_PROPERTY,
              cols: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
              colSpan: null,
              content: null,
              contentEditable: null,
              contextMenu: MUST_USE_ATTRIBUTE,
              controls: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
              coords: null,
              crossOrigin: null,
              data: null,
              dateTime: MUST_USE_ATTRIBUTE,
              'default': HAS_BOOLEAN_VALUE,
              defer: HAS_BOOLEAN_VALUE,
              dir: null,
              disabled: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
              download: HAS_OVERLOADED_BOOLEAN_VALUE,
              draggable: null,
              encType: null,
              form: MUST_USE_ATTRIBUTE,
              formAction: MUST_USE_ATTRIBUTE,
              formEncType: MUST_USE_ATTRIBUTE,
              formMethod: MUST_USE_ATTRIBUTE,
              formNoValidate: HAS_BOOLEAN_VALUE,
              formTarget: MUST_USE_ATTRIBUTE,
              frameBorder: MUST_USE_ATTRIBUTE,
              headers: null,
              height: MUST_USE_ATTRIBUTE,
              hidden: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
              high: null,
              href: null,
              hrefLang: null,
              htmlFor: null,
              httpEquiv: null,
              icon: null,
              id: MUST_USE_PROPERTY,
              inputMode: MUST_USE_ATTRIBUTE,
              integrity: null,
              is: MUST_USE_ATTRIBUTE,
              keyParams: MUST_USE_ATTRIBUTE,
              keyType: MUST_USE_ATTRIBUTE,
              kind: null,
              label: null,
              lang: null,
              list: MUST_USE_ATTRIBUTE,
              loop: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
              low: null,
              manifest: MUST_USE_ATTRIBUTE,
              marginHeight: null,
              marginWidth: null,
              max: null,
              maxLength: MUST_USE_ATTRIBUTE,
              media: MUST_USE_ATTRIBUTE,
              mediaGroup: null,
              method: null,
              min: null,
              minLength: MUST_USE_ATTRIBUTE,
              multiple: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
              muted: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
              name: null,
              noValidate: HAS_BOOLEAN_VALUE,
              open: HAS_BOOLEAN_VALUE,
              optimum: null,
              pattern: null,
              placeholder: null,
              poster: null,
              preload: null,
              radioGroup: null,
              readOnly: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
              rel: null,
              required: HAS_BOOLEAN_VALUE,
              role: MUST_USE_ATTRIBUTE,
              rows: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
              rowSpan: null,
              sandbox: null,
              scope: null,
              scoped: HAS_BOOLEAN_VALUE,
              scrolling: null,
              seamless: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
              selected: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
              shape: null,
              size: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
              sizes: MUST_USE_ATTRIBUTE,
              span: HAS_POSITIVE_NUMERIC_VALUE,
              spellCheck: null,
              src: null,
              srcDoc: MUST_USE_PROPERTY,
              srcLang: null,
              srcSet: MUST_USE_ATTRIBUTE,
              start: HAS_NUMERIC_VALUE,
              step: null,
              style: null,
              summary: null,
              tabIndex: null,
              target: null,
              title: null,
              type: null,
              useMap: null,
              value: MUST_USE_PROPERTY | HAS_SIDE_EFFECTS,
              width: MUST_USE_ATTRIBUTE,
              wmode: MUST_USE_ATTRIBUTE,
              wrap: null,
              about: MUST_USE_ATTRIBUTE,
              datatype: MUST_USE_ATTRIBUTE,
              inlist: MUST_USE_ATTRIBUTE,
              prefix: MUST_USE_ATTRIBUTE,
              property: MUST_USE_ATTRIBUTE,
              resource: MUST_USE_ATTRIBUTE,
              'typeof': MUST_USE_ATTRIBUTE,
              vocab: MUST_USE_ATTRIBUTE,
              autoCapitalize: null,
              autoCorrect: null,
              autoSave: null,
              color: null,
              itemProp: MUST_USE_ATTRIBUTE,
              itemScope: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
              itemType: MUST_USE_ATTRIBUTE,
              itemID: MUST_USE_ATTRIBUTE,
              itemRef: MUST_USE_ATTRIBUTE,
              results: null,
              security: MUST_USE_ATTRIBUTE,
              unselectable: MUST_USE_ATTRIBUTE
            },
            DOMAttributeNames: {
              acceptCharset: 'accept-charset',
              className: 'class',
              htmlFor: 'for',
              httpEquiv: 'http-equiv'
            },
            DOMPropertyNames: {
              autoCapitalize: 'autocapitalize',
              autoComplete: 'autocomplete',
              autoCorrect: 'autocorrect',
              autoFocus: 'autofocus',
              autoPlay: 'autoplay',
              autoSave: 'autosave',
              encType: 'encoding',
              hrefLang: 'hreflang',
              radioGroup: 'radiogroup',
              spellCheck: 'spellcheck',
              srcDoc: 'srcdoc',
              srcSet: 'srcset'
            }
          };
          module.exports = HTMLDOMPropertyConfig;
        }, {
          "10": 10,
          "130": 130
        }],
        22: [function(_dereq_, module, exports) {
          'use strict';
          var ReactPropTypes = _dereq_(74);
          var ReactPropTypeLocations = _dereq_(73);
          var invariant = _dereq_(144);
          var warning = _dereq_(155);
          var hasReadOnlyValue = {
            'button': true,
            'checkbox': true,
            'image': true,
            'hidden': true,
            'radio': true,
            'reset': true,
            'submit': true
          };
          function _assertSingleLink(inputProps) {
            !(inputProps.checkedLink == null || inputProps.valueLink == null) ? "development" !== 'production' ? invariant(false, 'Cannot provide a checkedLink and a valueLink. If you want to use ' + 'checkedLink, you probably don\'t want to use valueLink and vice versa.') : invariant(false) : undefined;
          }
          function _assertValueLink(inputProps) {
            _assertSingleLink(inputProps);
            !(inputProps.value == null && inputProps.onChange == null) ? "development" !== 'production' ? invariant(false, 'Cannot provide a valueLink and a value or onChange event. If you want ' + 'to use value or onChange, you probably don\'t want to use valueLink.') : invariant(false) : undefined;
          }
          function _assertCheckedLink(inputProps) {
            _assertSingleLink(inputProps);
            !(inputProps.checked == null && inputProps.onChange == null) ? "development" !== 'production' ? invariant(false, 'Cannot provide a checkedLink and a checked property or onChange event. ' + 'If you want to use checked or onChange, you probably don\'t want to ' + 'use checkedLink') : invariant(false) : undefined;
          }
          var propTypes = {
            value: function(props, propName, componentName) {
              if (!props[propName] || hasReadOnlyValue[props.type] || props.onChange || props.readOnly || props.disabled) {
                return null;
              }
              return new Error('You provided a `value` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultValue`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
            },
            checked: function(props, propName, componentName) {
              if (!props[propName] || props.onChange || props.readOnly || props.disabled) {
                return null;
              }
              return new Error('You provided a `checked` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultChecked`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
            },
            onChange: ReactPropTypes.func
          };
          var loggedTypeFailures = {};
          function getDeclarationErrorAddendum(owner) {
            if (owner) {
              var name = owner.getName();
              if (name) {
                return ' Check the render method of `' + name + '`.';
              }
            }
            return '';
          }
          var LinkedValueUtils = {
            checkPropTypes: function(tagName, props, owner) {
              for (var propName in propTypes) {
                if (propTypes.hasOwnProperty(propName)) {
                  var error = propTypes[propName](props, propName, tagName, ReactPropTypeLocations.prop);
                }
                if (error instanceof Error && !(error.message in loggedTypeFailures)) {
                  loggedTypeFailures[error.message] = true;
                  var addendum = getDeclarationErrorAddendum(owner);
                  "development" !== 'production' ? warning(false, 'Failed form propType: %s%s', error.message, addendum) : undefined;
                }
              }
            },
            getValue: function(inputProps) {
              if (inputProps.valueLink) {
                _assertValueLink(inputProps);
                return inputProps.valueLink.value;
              }
              return inputProps.value;
            },
            getChecked: function(inputProps) {
              if (inputProps.checkedLink) {
                _assertCheckedLink(inputProps);
                return inputProps.checkedLink.value;
              }
              return inputProps.checked;
            },
            executeOnChange: function(inputProps, event) {
              if (inputProps.valueLink) {
                _assertValueLink(inputProps);
                return inputProps.valueLink.requestChange(event.target.value);
              } else if (inputProps.checkedLink) {
                _assertCheckedLink(inputProps);
                return inputProps.checkedLink.requestChange(event.target.checked);
              } else if (inputProps.onChange) {
                return inputProps.onChange.call(undefined, event);
              }
            }
          };
          module.exports = LinkedValueUtils;
        }, {
          "144": 144,
          "155": 155,
          "73": 73,
          "74": 74
        }],
        23: [function(_dereq_, module, exports) {
          'use strict';
          function assign(target, sources) {
            if (target == null) {
              throw new TypeError('Object.assign target cannot be null or undefined');
            }
            var to = Object(target);
            var hasOwnProperty = Object.prototype.hasOwnProperty;
            for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
              var nextSource = arguments[nextIndex];
              if (nextSource == null) {
                continue;
              }
              var from = Object(nextSource);
              for (var key in from) {
                if (hasOwnProperty.call(from, key)) {
                  to[key] = from[key];
                }
              }
            }
            return to;
          }
          module.exports = assign;
        }, {}],
        24: [function(_dereq_, module, exports) {
          'use strict';
          var invariant = _dereq_(144);
          var oneArgumentPooler = function(copyFieldsFrom) {
            var Klass = this;
            if (Klass.instancePool.length) {
              var instance = Klass.instancePool.pop();
              Klass.call(instance, copyFieldsFrom);
              return instance;
            } else {
              return new Klass(copyFieldsFrom);
            }
          };
          var twoArgumentPooler = function(a1, a2) {
            var Klass = this;
            if (Klass.instancePool.length) {
              var instance = Klass.instancePool.pop();
              Klass.call(instance, a1, a2);
              return instance;
            } else {
              return new Klass(a1, a2);
            }
          };
          var threeArgumentPooler = function(a1, a2, a3) {
            var Klass = this;
            if (Klass.instancePool.length) {
              var instance = Klass.instancePool.pop();
              Klass.call(instance, a1, a2, a3);
              return instance;
            } else {
              return new Klass(a1, a2, a3);
            }
          };
          var fourArgumentPooler = function(a1, a2, a3, a4) {
            var Klass = this;
            if (Klass.instancePool.length) {
              var instance = Klass.instancePool.pop();
              Klass.call(instance, a1, a2, a3, a4);
              return instance;
            } else {
              return new Klass(a1, a2, a3, a4);
            }
          };
          var fiveArgumentPooler = function(a1, a2, a3, a4, a5) {
            var Klass = this;
            if (Klass.instancePool.length) {
              var instance = Klass.instancePool.pop();
              Klass.call(instance, a1, a2, a3, a4, a5);
              return instance;
            } else {
              return new Klass(a1, a2, a3, a4, a5);
            }
          };
          var standardReleaser = function(instance) {
            var Klass = this;
            !(instance instanceof Klass) ? "development" !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : invariant(false) : undefined;
            instance.destructor();
            if (Klass.instancePool.length < Klass.poolSize) {
              Klass.instancePool.push(instance);
            }
          };
          var DEFAULT_POOL_SIZE = 10;
          var DEFAULT_POOLER = oneArgumentPooler;
          var addPoolingTo = function(CopyConstructor, pooler) {
            var NewKlass = CopyConstructor;
            NewKlass.instancePool = [];
            NewKlass.getPooled = pooler || DEFAULT_POOLER;
            if (!NewKlass.poolSize) {
              NewKlass.poolSize = DEFAULT_POOL_SIZE;
            }
            NewKlass.release = standardReleaser;
            return NewKlass;
          };
          var PooledClass = {
            addPoolingTo: addPoolingTo,
            oneArgumentPooler: oneArgumentPooler,
            twoArgumentPooler: twoArgumentPooler,
            threeArgumentPooler: threeArgumentPooler,
            fourArgumentPooler: fourArgumentPooler,
            fiveArgumentPooler: fiveArgumentPooler
          };
          module.exports = PooledClass;
        }, {"144": 144}],
        25: [function(_dereq_, module, exports) {
          'use strict';
          var ReactInstanceMap = _dereq_(62);
          var findDOMNode = _dereq_(108);
          var warning = _dereq_(155);
          var didWarnKey = '_getDOMNodeDidWarn';
          var ReactBrowserComponentMixin = {getDOMNode: function() {
              "development" !== 'production' ? warning(this.constructor[didWarnKey], '%s.getDOMNode(...) is deprecated. Please use ' + 'ReactDOM.findDOMNode(instance) instead.', ReactInstanceMap.get(this).getName() || this.tagName || 'Unknown') : undefined;
              this.constructor[didWarnKey] = true;
              return findDOMNode(this);
            }};
          module.exports = ReactBrowserComponentMixin;
        }, {
          "108": 108,
          "155": 155,
          "62": 62
        }],
        26: [function(_dereq_, module, exports) {
          'use strict';
          var EventConstants = _dereq_(15);
          var EventPluginHub = _dereq_(16);
          var EventPluginRegistry = _dereq_(17);
          var ReactEventEmitterMixin = _dereq_(57);
          var ReactPerf = _dereq_(71);
          var ViewportMetrics = _dereq_(101);
          var assign = _dereq_(23);
          var isEventSupported = _dereq_(119);
          var alreadyListeningTo = {};
          var isMonitoringScrollValue = false;
          var reactTopListenersCounter = 0;
          var topEventMapping = {
            topAbort: 'abort',
            topBlur: 'blur',
            topCanPlay: 'canplay',
            topCanPlayThrough: 'canplaythrough',
            topChange: 'change',
            topClick: 'click',
            topCompositionEnd: 'compositionend',
            topCompositionStart: 'compositionstart',
            topCompositionUpdate: 'compositionupdate',
            topContextMenu: 'contextmenu',
            topCopy: 'copy',
            topCut: 'cut',
            topDoubleClick: 'dblclick',
            topDrag: 'drag',
            topDragEnd: 'dragend',
            topDragEnter: 'dragenter',
            topDragExit: 'dragexit',
            topDragLeave: 'dragleave',
            topDragOver: 'dragover',
            topDragStart: 'dragstart',
            topDrop: 'drop',
            topDurationChange: 'durationchange',
            topEmptied: 'emptied',
            topEncrypted: 'encrypted',
            topEnded: 'ended',
            topError: 'error',
            topFocus: 'focus',
            topInput: 'input',
            topKeyDown: 'keydown',
            topKeyPress: 'keypress',
            topKeyUp: 'keyup',
            topLoadedData: 'loadeddata',
            topLoadedMetadata: 'loadedmetadata',
            topLoadStart: 'loadstart',
            topMouseDown: 'mousedown',
            topMouseMove: 'mousemove',
            topMouseOut: 'mouseout',
            topMouseOver: 'mouseover',
            topMouseUp: 'mouseup',
            topPaste: 'paste',
            topPause: 'pause',
            topPlay: 'play',
            topPlaying: 'playing',
            topProgress: 'progress',
            topRateChange: 'ratechange',
            topScroll: 'scroll',
            topSeeked: 'seeked',
            topSeeking: 'seeking',
            topSelectionChange: 'selectionchange',
            topStalled: 'stalled',
            topSuspend: 'suspend',
            topTextInput: 'textInput',
            topTimeUpdate: 'timeupdate',
            topTouchCancel: 'touchcancel',
            topTouchEnd: 'touchend',
            topTouchMove: 'touchmove',
            topTouchStart: 'touchstart',
            topVolumeChange: 'volumechange',
            topWaiting: 'waiting',
            topWheel: 'wheel'
          };
          var topListenersIDKey = '_reactListenersID' + String(Math.random()).slice(2);
          function getListeningForDocument(mountAt) {
            if (!Object.prototype.hasOwnProperty.call(mountAt, topListenersIDKey)) {
              mountAt[topListenersIDKey] = reactTopListenersCounter++;
              alreadyListeningTo[mountAt[topListenersIDKey]] = {};
            }
            return alreadyListeningTo[mountAt[topListenersIDKey]];
          }
          var ReactBrowserEventEmitter = assign({}, ReactEventEmitterMixin, {
            ReactEventListener: null,
            injection: {injectReactEventListener: function(ReactEventListener) {
                ReactEventListener.setHandleTopLevel(ReactBrowserEventEmitter.handleTopLevel);
                ReactBrowserEventEmitter.ReactEventListener = ReactEventListener;
              }},
            setEnabled: function(enabled) {
              if (ReactBrowserEventEmitter.ReactEventListener) {
                ReactBrowserEventEmitter.ReactEventListener.setEnabled(enabled);
              }
            },
            isEnabled: function() {
              return !!(ReactBrowserEventEmitter.ReactEventListener && ReactBrowserEventEmitter.ReactEventListener.isEnabled());
            },
            listenTo: function(registrationName, contentDocumentHandle) {
              var mountAt = contentDocumentHandle;
              var isListening = getListeningForDocument(mountAt);
              var dependencies = EventPluginRegistry.registrationNameDependencies[registrationName];
              var topLevelTypes = EventConstants.topLevelTypes;
              for (var i = 0; i < dependencies.length; i++) {
                var dependency = dependencies[i];
                if (!(isListening.hasOwnProperty(dependency) && isListening[dependency])) {
                  if (dependency === topLevelTypes.topWheel) {
                    if (isEventSupported('wheel')) {
                      ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topWheel, 'wheel', mountAt);
                    } else if (isEventSupported('mousewheel')) {
                      ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topWheel, 'mousewheel', mountAt);
                    } else {
                      ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topWheel, 'DOMMouseScroll', mountAt);
                    }
                  } else if (dependency === topLevelTypes.topScroll) {
                    if (isEventSupported('scroll', true)) {
                      ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelTypes.topScroll, 'scroll', mountAt);
                    } else {
                      ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topScroll, 'scroll', ReactBrowserEventEmitter.ReactEventListener.WINDOW_HANDLE);
                    }
                  } else if (dependency === topLevelTypes.topFocus || dependency === topLevelTypes.topBlur) {
                    if (isEventSupported('focus', true)) {
                      ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelTypes.topFocus, 'focus', mountAt);
                      ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelTypes.topBlur, 'blur', mountAt);
                    } else if (isEventSupported('focusin')) {
                      ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topFocus, 'focusin', mountAt);
                      ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topBlur, 'focusout', mountAt);
                    }
                    isListening[topLevelTypes.topBlur] = true;
                    isListening[topLevelTypes.topFocus] = true;
                  } else if (topEventMapping.hasOwnProperty(dependency)) {
                    ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(dependency, topEventMapping[dependency], mountAt);
                  }
                  isListening[dependency] = true;
                }
              }
            },
            trapBubbledEvent: function(topLevelType, handlerBaseName, handle) {
              return ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelType, handlerBaseName, handle);
            },
            trapCapturedEvent: function(topLevelType, handlerBaseName, handle) {
              return ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelType, handlerBaseName, handle);
            },
            ensureScrollValueMonitoring: function() {
              if (!isMonitoringScrollValue) {
                var refresh = ViewportMetrics.refreshScrollValues;
                ReactBrowserEventEmitter.ReactEventListener.monitorScrollValue(refresh);
                isMonitoringScrollValue = true;
              }
            },
            eventNameDispatchConfigs: EventPluginHub.eventNameDispatchConfigs,
            registrationNameModules: EventPluginHub.registrationNameModules,
            putListener: EventPluginHub.putListener,
            getListener: EventPluginHub.getListener,
            deleteListener: EventPluginHub.deleteListener,
            deleteAllListeners: EventPluginHub.deleteAllListeners
          });
          ReactPerf.measureMethods(ReactBrowserEventEmitter, 'ReactBrowserEventEmitter', {
            putListener: 'putListener',
            deleteListener: 'deleteListener'
          });
          module.exports = ReactBrowserEventEmitter;
        }, {
          "101": 101,
          "119": 119,
          "15": 15,
          "16": 16,
          "17": 17,
          "23": 23,
          "57": 57,
          "71": 71
        }],
        27: [function(_dereq_, module, exports) {
          'use strict';
          var ReactReconciler = _dereq_(76);
          var instantiateReactComponent = _dereq_(118);
          var shouldUpdateReactComponent = _dereq_(126);
          var traverseAllChildren = _dereq_(127);
          var warning = _dereq_(155);
          function instantiateChild(childInstances, child, name) {
            var keyUnique = childInstances[name] === undefined;
            if ("development" !== 'production') {
              "development" !== 'production' ? warning(keyUnique, 'flattenChildren(...): Encountered two children with the same key, ' + '`%s`. Child keys must be unique; when two children share a key, only ' + 'the first child will be used.', name) : undefined;
            }
            if (child != null && keyUnique) {
              childInstances[name] = instantiateReactComponent(child, null);
            }
          }
          var ReactChildReconciler = {
            instantiateChildren: function(nestedChildNodes, transaction, context) {
              if (nestedChildNodes == null) {
                return null;
              }
              var childInstances = {};
              traverseAllChildren(nestedChildNodes, instantiateChild, childInstances);
              return childInstances;
            },
            updateChildren: function(prevChildren, nextChildren, transaction, context) {
              if (!nextChildren && !prevChildren) {
                return null;
              }
              var name;
              for (name in nextChildren) {
                if (!nextChildren.hasOwnProperty(name)) {
                  continue;
                }
                var prevChild = prevChildren && prevChildren[name];
                var prevElement = prevChild && prevChild._currentElement;
                var nextElement = nextChildren[name];
                if (prevChild != null && shouldUpdateReactComponent(prevElement, nextElement)) {
                  ReactReconciler.receiveComponent(prevChild, nextElement, transaction, context);
                  nextChildren[name] = prevChild;
                } else {
                  if (prevChild) {
                    ReactReconciler.unmountComponent(prevChild, name);
                  }
                  var nextChildInstance = instantiateReactComponent(nextElement, null);
                  nextChildren[name] = nextChildInstance;
                }
              }
              for (name in prevChildren) {
                if (prevChildren.hasOwnProperty(name) && !(nextChildren && nextChildren.hasOwnProperty(name))) {
                  ReactReconciler.unmountComponent(prevChildren[name]);
                }
              }
              return nextChildren;
            },
            unmountChildren: function(renderedChildren) {
              for (var name in renderedChildren) {
                if (renderedChildren.hasOwnProperty(name)) {
                  var renderedChild = renderedChildren[name];
                  ReactReconciler.unmountComponent(renderedChild);
                }
              }
            }
          };
          module.exports = ReactChildReconciler;
        }, {
          "118": 118,
          "126": 126,
          "127": 127,
          "155": 155,
          "76": 76
        }],
        28: [function(_dereq_, module, exports) {
          'use strict';
          var PooledClass = _dereq_(24);
          var ReactElement = _dereq_(52);
          var emptyFunction = _dereq_(136);
          var traverseAllChildren = _dereq_(127);
          var twoArgumentPooler = PooledClass.twoArgumentPooler;
          var fourArgumentPooler = PooledClass.fourArgumentPooler;
          var userProvidedKeyEscapeRegex = /\/(?!\/)/g;
          function escapeUserProvidedKey(text) {
            return ('' + text).replace(userProvidedKeyEscapeRegex, '//');
          }
          function ForEachBookKeeping(forEachFunction, forEachContext) {
            this.func = forEachFunction;
            this.context = forEachContext;
            this.count = 0;
          }
          ForEachBookKeeping.prototype.destructor = function() {
            this.func = null;
            this.context = null;
            this.count = 0;
          };
          PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);
          function forEachSingleChild(bookKeeping, child, name) {
            var func = bookKeeping.func;
            var context = bookKeeping.context;
            func.call(context, child, bookKeeping.count++);
          }
          function forEachChildren(children, forEachFunc, forEachContext) {
            if (children == null) {
              return children;
            }
            var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
            traverseAllChildren(children, forEachSingleChild, traverseContext);
            ForEachBookKeeping.release(traverseContext);
          }
          function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
            this.result = mapResult;
            this.keyPrefix = keyPrefix;
            this.func = mapFunction;
            this.context = mapContext;
            this.count = 0;
          }
          MapBookKeeping.prototype.destructor = function() {
            this.result = null;
            this.keyPrefix = null;
            this.func = null;
            this.context = null;
            this.count = 0;
          };
          PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);
          function mapSingleChildIntoContext(bookKeeping, child, childKey) {
            var result = bookKeeping.result;
            var keyPrefix = bookKeeping.keyPrefix;
            var func = bookKeeping.func;
            var context = bookKeeping.context;
            var mappedChild = func.call(context, child, bookKeeping.count++);
            if (Array.isArray(mappedChild)) {
              mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
            } else if (mappedChild != null) {
              if (ReactElement.isValidElement(mappedChild)) {
                mappedChild = ReactElement.cloneAndReplaceKey(mappedChild, keyPrefix + (mappedChild !== child ? escapeUserProvidedKey(mappedChild.key || '') + '/' : '') + childKey);
              }
              result.push(mappedChild);
            }
          }
          function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
            var escapedPrefix = '';
            if (prefix != null) {
              escapedPrefix = escapeUserProvidedKey(prefix) + '/';
            }
            var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
            traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
            MapBookKeeping.release(traverseContext);
          }
          function mapChildren(children, func, context) {
            if (children == null) {
              return children;
            }
            var result = [];
            mapIntoWithKeyPrefixInternal(children, result, null, func, context);
            return result;
          }
          function forEachSingleChildDummy(traverseContext, child, name) {
            return null;
          }
          function countChildren(children, context) {
            return traverseAllChildren(children, forEachSingleChildDummy, null);
          }
          function toArray(children) {
            var result = [];
            mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
            return result;
          }
          var ReactChildren = {
            forEach: forEachChildren,
            map: mapChildren,
            mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
            count: countChildren,
            toArray: toArray
          };
          module.exports = ReactChildren;
        }, {
          "127": 127,
          "136": 136,
          "24": 24,
          "52": 52
        }],
        29: [function(_dereq_, module, exports) {
          'use strict';
          var ReactComponent = _dereq_(30);
          var ReactElement = _dereq_(52);
          var ReactPropTypeLocations = _dereq_(73);
          var ReactPropTypeLocationNames = _dereq_(72);
          var ReactNoopUpdateQueue = _dereq_(69);
          var assign = _dereq_(23);
          var emptyObject = _dereq_(137);
          var invariant = _dereq_(144);
          var keyMirror = _dereq_(147);
          var keyOf = _dereq_(148);
          var warning = _dereq_(155);
          var MIXINS_KEY = keyOf({mixins: null});
          var SpecPolicy = keyMirror({
            DEFINE_ONCE: null,
            DEFINE_MANY: null,
            OVERRIDE_BASE: null,
            DEFINE_MANY_MERGED: null
          });
          var injectedMixins = [];
          var warnedSetProps = false;
          function warnSetProps() {
            if (!warnedSetProps) {
              warnedSetProps = true;
              "development" !== 'production' ? warning(false, 'setProps(...) and replaceProps(...) are deprecated. ' + 'Instead, call render again at the top level.') : undefined;
            }
          }
          var ReactClassInterface = {
            mixins: SpecPolicy.DEFINE_MANY,
            statics: SpecPolicy.DEFINE_MANY,
            propTypes: SpecPolicy.DEFINE_MANY,
            contextTypes: SpecPolicy.DEFINE_MANY,
            childContextTypes: SpecPolicy.DEFINE_MANY,
            getDefaultProps: SpecPolicy.DEFINE_MANY_MERGED,
            getInitialState: SpecPolicy.DEFINE_MANY_MERGED,
            getChildContext: SpecPolicy.DEFINE_MANY_MERGED,
            render: SpecPolicy.DEFINE_ONCE,
            componentWillMount: SpecPolicy.DEFINE_MANY,
            componentDidMount: SpecPolicy.DEFINE_MANY,
            componentWillReceiveProps: SpecPolicy.DEFINE_MANY,
            shouldComponentUpdate: SpecPolicy.DEFINE_ONCE,
            componentWillUpdate: SpecPolicy.DEFINE_MANY,
            componentDidUpdate: SpecPolicy.DEFINE_MANY,
            componentWillUnmount: SpecPolicy.DEFINE_MANY,
            updateComponent: SpecPolicy.OVERRIDE_BASE
          };
          var RESERVED_SPEC_KEYS = {
            displayName: function(Constructor, displayName) {
              Constructor.displayName = displayName;
            },
            mixins: function(Constructor, mixins) {
              if (mixins) {
                for (var i = 0; i < mixins.length; i++) {
                  mixSpecIntoComponent(Constructor, mixins[i]);
                }
              }
            },
            childContextTypes: function(Constructor, childContextTypes) {
              if ("development" !== 'production') {
                validateTypeDef(Constructor, childContextTypes, ReactPropTypeLocations.childContext);
              }
              Constructor.childContextTypes = assign({}, Constructor.childContextTypes, childContextTypes);
            },
            contextTypes: function(Constructor, contextTypes) {
              if ("development" !== 'production') {
                validateTypeDef(Constructor, contextTypes, ReactPropTypeLocations.context);
              }
              Constructor.contextTypes = assign({}, Constructor.contextTypes, contextTypes);
            },
            getDefaultProps: function(Constructor, getDefaultProps) {
              if (Constructor.getDefaultProps) {
                Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
              } else {
                Constructor.getDefaultProps = getDefaultProps;
              }
            },
            propTypes: function(Constructor, propTypes) {
              if ("development" !== 'production') {
                validateTypeDef(Constructor, propTypes, ReactPropTypeLocations.prop);
              }
              Constructor.propTypes = assign({}, Constructor.propTypes, propTypes);
            },
            statics: function(Constructor, statics) {
              mixStaticSpecIntoComponent(Constructor, statics);
            },
            autobind: function() {}
          };
          function validateTypeDef(Constructor, typeDef, location) {
            for (var propName in typeDef) {
              if (typeDef.hasOwnProperty(propName)) {
                "development" !== 'production' ? warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName) : undefined;
              }
            }
          }
          function validateMethodOverride(proto, name) {
            var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;
            if (ReactClassMixin.hasOwnProperty(name)) {
              !(specPolicy === SpecPolicy.OVERRIDE_BASE) ? "development" !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to override ' + '`%s` from your class specification. Ensure that your method names ' + 'do not overlap with React methods.', name) : invariant(false) : undefined;
            }
            if (proto.hasOwnProperty(name)) {
              !(specPolicy === SpecPolicy.DEFINE_MANY || specPolicy === SpecPolicy.DEFINE_MANY_MERGED) ? "development" !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to define ' + '`%s` on your component more than once. This conflict may be due ' + 'to a mixin.', name) : invariant(false) : undefined;
            }
          }
          function mixSpecIntoComponent(Constructor, spec) {
            if (!spec) {
              return;
            }
            !(typeof spec !== 'function') ? "development" !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to ' + 'use a component class as a mixin. Instead, just use a regular object.') : invariant(false) : undefined;
            !!ReactElement.isValidElement(spec) ? "development" !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to ' + 'use a component as a mixin. Instead, just use a regular object.') : invariant(false) : undefined;
            var proto = Constructor.prototype;
            if (spec.hasOwnProperty(MIXINS_KEY)) {
              RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
            }
            for (var name in spec) {
              if (!spec.hasOwnProperty(name)) {
                continue;
              }
              if (name === MIXINS_KEY) {
                continue;
              }
              var property = spec[name];
              validateMethodOverride(proto, name);
              if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
                RESERVED_SPEC_KEYS[name](Constructor, property);
              } else {
                var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
                var isAlreadyDefined = proto.hasOwnProperty(name);
                var isFunction = typeof property === 'function';
                var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;
                if (shouldAutoBind) {
                  if (!proto.__reactAutoBindMap) {
                    proto.__reactAutoBindMap = {};
                  }
                  proto.__reactAutoBindMap[name] = property;
                  proto[name] = property;
                } else {
                  if (isAlreadyDefined) {
                    var specPolicy = ReactClassInterface[name];
                    !(isReactClassMethod && (specPolicy === SpecPolicy.DEFINE_MANY_MERGED || specPolicy === SpecPolicy.DEFINE_MANY)) ? "development" !== 'production' ? invariant(false, 'ReactClass: Unexpected spec policy %s for key %s ' + 'when mixing in component specs.', specPolicy, name) : invariant(false) : undefined;
                    if (specPolicy === SpecPolicy.DEFINE_MANY_MERGED) {
                      proto[name] = createMergedResultFunction(proto[name], property);
                    } else if (specPolicy === SpecPolicy.DEFINE_MANY) {
                      proto[name] = createChainedFunction(proto[name], property);
                    }
                  } else {
                    proto[name] = property;
                    if ("development" !== 'production') {
                      if (typeof property === 'function' && spec.displayName) {
                        proto[name].displayName = spec.displayName + '_' + name;
                      }
                    }
                  }
                }
              }
            }
          }
          function mixStaticSpecIntoComponent(Constructor, statics) {
            if (!statics) {
              return;
            }
            for (var name in statics) {
              var property = statics[name];
              if (!statics.hasOwnProperty(name)) {
                continue;
              }
              var isReserved = (name in RESERVED_SPEC_KEYS);
              !!isReserved ? "development" !== 'production' ? invariant(false, 'ReactClass: You are attempting to define a reserved ' + 'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' + 'as an instance property instead; it will still be accessible on the ' + 'constructor.', name) : invariant(false) : undefined;
              var isInherited = (name in Constructor);
              !!isInherited ? "development" !== 'production' ? invariant(false, 'ReactClass: You are attempting to define ' + '`%s` on your component more than once. This conflict may be ' + 'due to a mixin.', name) : invariant(false) : undefined;
              Constructor[name] = property;
            }
          }
          function mergeIntoWithNoDuplicateKeys(one, two) {
            !(one && two && typeof one === 'object' && typeof two === 'object') ? "development" !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.') : invariant(false) : undefined;
            for (var key in two) {
              if (two.hasOwnProperty(key)) {
                !(one[key] === undefined) ? "development" !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): ' + 'Tried to merge two objects with the same key: `%s`. This conflict ' + 'may be due to a mixin; in particular, this may be caused by two ' + 'getInitialState() or getDefaultProps() methods returning objects ' + 'with clashing keys.', key) : invariant(false) : undefined;
                one[key] = two[key];
              }
            }
            return one;
          }
          function createMergedResultFunction(one, two) {
            return function mergedResult() {
              var a = one.apply(this, arguments);
              var b = two.apply(this, arguments);
              if (a == null) {
                return b;
              } else if (b == null) {
                return a;
              }
              var c = {};
              mergeIntoWithNoDuplicateKeys(c, a);
              mergeIntoWithNoDuplicateKeys(c, b);
              return c;
            };
          }
          function createChainedFunction(one, two) {
            return function chainedFunction() {
              one.apply(this, arguments);
              two.apply(this, arguments);
            };
          }
          function bindAutoBindMethod(component, method) {
            var boundMethod = method.bind(component);
            if ("development" !== 'production') {
              boundMethod.__reactBoundContext = component;
              boundMethod.__reactBoundMethod = method;
              boundMethod.__reactBoundArguments = null;
              var componentName = component.constructor.displayName;
              var _bind = boundMethod.bind;
              boundMethod.bind = function(newThis) {
                for (var _len = arguments.length,
                    args = Array(_len > 1 ? _len - 1 : 0),
                    _key = 1; _key < _len; _key++) {
                  args[_key - 1] = arguments[_key];
                }
                if (newThis !== component && newThis !== null) {
                  "development" !== 'production' ? warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName) : undefined;
                } else if (!args.length) {
                  "development" !== 'production' ? warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName) : undefined;
                  return boundMethod;
                }
                var reboundMethod = _bind.apply(boundMethod, arguments);
                reboundMethod.__reactBoundContext = component;
                reboundMethod.__reactBoundMethod = method;
                reboundMethod.__reactBoundArguments = args;
                return reboundMethod;
              };
            }
            return boundMethod;
          }
          function bindAutoBindMethods(component) {
            for (var autoBindKey in component.__reactAutoBindMap) {
              if (component.__reactAutoBindMap.hasOwnProperty(autoBindKey)) {
                var method = component.__reactAutoBindMap[autoBindKey];
                component[autoBindKey] = bindAutoBindMethod(component, method);
              }
            }
          }
          var ReactClassMixin = {
            replaceState: function(newState, callback) {
              this.updater.enqueueReplaceState(this, newState);
              if (callback) {
                this.updater.enqueueCallback(this, callback);
              }
            },
            isMounted: function() {
              return this.updater.isMounted(this);
            },
            setProps: function(partialProps, callback) {
              if ("development" !== 'production') {
                warnSetProps();
              }
              this.updater.enqueueSetProps(this, partialProps);
              if (callback) {
                this.updater.enqueueCallback(this, callback);
              }
            },
            replaceProps: function(newProps, callback) {
              if ("development" !== 'production') {
                warnSetProps();
              }
              this.updater.enqueueReplaceProps(this, newProps);
              if (callback) {
                this.updater.enqueueCallback(this, callback);
              }
            }
          };
          var ReactClassComponent = function() {};
          assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);
          var ReactClass = {
            createClass: function(spec) {
              var Constructor = function(props, context, updater) {
                if ("development" !== 'production') {
                  "development" !== 'production' ? warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory') : undefined;
                }
                if (this.__reactAutoBindMap) {
                  bindAutoBindMethods(this);
                }
                this.props = props;
                this.context = context;
                this.refs = emptyObject;
                this.updater = updater || ReactNoopUpdateQueue;
                this.state = null;
                var initialState = this.getInitialState ? this.getInitialState() : null;
                if ("development" !== 'production') {
                  if (typeof initialState === 'undefined' && this.getInitialState._isMockFunction) {
                    initialState = null;
                  }
                }
                !(typeof initialState === 'object' && !Array.isArray(initialState)) ? "development" !== 'production' ? invariant(false, '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent') : invariant(false) : undefined;
                this.state = initialState;
              };
              Constructor.prototype = new ReactClassComponent();
              Constructor.prototype.constructor = Constructor;
              injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));
              mixSpecIntoComponent(Constructor, spec);
              if (Constructor.getDefaultProps) {
                Constructor.defaultProps = Constructor.getDefaultProps();
              }
              if ("development" !== 'production') {
                if (Constructor.getDefaultProps) {
                  Constructor.getDefaultProps.isReactClassApproved = {};
                }
                if (Constructor.prototype.getInitialState) {
                  Constructor.prototype.getInitialState.isReactClassApproved = {};
                }
              }
              !Constructor.prototype.render ? "development" !== 'production' ? invariant(false, 'createClass(...): Class specification must implement a `render` method.') : invariant(false) : undefined;
              if ("development" !== 'production') {
                "development" !== 'production' ? warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component') : undefined;
                "development" !== 'production' ? warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component') : undefined;
              }
              for (var methodName in ReactClassInterface) {
                if (!Constructor.prototype[methodName]) {
                  Constructor.prototype[methodName] = null;
                }
              }
              return Constructor;
            },
            injection: {injectMixin: function(mixin) {
                injectedMixins.push(mixin);
              }}
          };
          module.exports = ReactClass;
        }, {
          "137": 137,
          "144": 144,
          "147": 147,
          "148": 148,
          "155": 155,
          "23": 23,
          "30": 30,
          "52": 52,
          "69": 69,
          "72": 72,
          "73": 73
        }],
        30: [function(_dereq_, module, exports) {
          'use strict';
          var ReactNoopUpdateQueue = _dereq_(69);
          var canDefineProperty = _dereq_(104);
          var emptyObject = _dereq_(137);
          var invariant = _dereq_(144);
          var warning = _dereq_(155);
          function ReactComponent(props, context, updater) {
            this.props = props;
            this.context = context;
            this.refs = emptyObject;
            this.updater = updater || ReactNoopUpdateQueue;
          }
          ReactComponent.prototype.isReactComponent = {};
          ReactComponent.prototype.setState = function(partialState, callback) {
            !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? "development" !== 'production' ? invariant(false, 'setState(...): takes an object of state variables to update or a ' + 'function which returns an object of state variables.') : invariant(false) : undefined;
            if ("development" !== 'production') {
              "development" !== 'production' ? warning(partialState != null, 'setState(...): You passed an undefined or null state object; ' + 'instead, use forceUpdate().') : undefined;
            }
            this.updater.enqueueSetState(this, partialState);
            if (callback) {
              this.updater.enqueueCallback(this, callback);
            }
          };
          ReactComponent.prototype.forceUpdate = function(callback) {
            this.updater.enqueueForceUpdate(this);
            if (callback) {
              this.updater.enqueueCallback(this, callback);
            }
          };
          if ("development" !== 'production') {
            var deprecatedAPIs = {
              getDOMNode: ['getDOMNode', 'Use ReactDOM.findDOMNode(component) instead.'],
              isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
              replaceProps: ['replaceProps', 'Instead, call render again at the top level.'],
              replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).'],
              setProps: ['setProps', 'Instead, call render again at the top level.']
            };
            var defineDeprecationWarning = function(methodName, info) {
              if (canDefineProperty) {
                Object.defineProperty(ReactComponent.prototype, methodName, {get: function() {
                    "development" !== 'production' ? warning(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]) : undefined;
                    return undefined;
                  }});
              }
            };
            for (var fnName in deprecatedAPIs) {
              if (deprecatedAPIs.hasOwnProperty(fnName)) {
                defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
              }
            }
          }
          module.exports = ReactComponent;
        }, {
          "104": 104,
          "137": 137,
          "144": 144,
          "155": 155,
          "69": 69
        }],
        31: [function(_dereq_, module, exports) {
          'use strict';
          var ReactDOMIDOperations = _dereq_(40);
          var ReactMount = _dereq_(65);
          var ReactComponentBrowserEnvironment = {
            processChildrenUpdates: ReactDOMIDOperations.dangerouslyProcessChildrenUpdates,
            replaceNodeWithMarkupByID: ReactDOMIDOperations.dangerouslyReplaceNodeWithMarkupByID,
            unmountIDFromEnvironment: function(rootNodeID) {
              ReactMount.purgeID(rootNodeID);
            }
          };
          module.exports = ReactComponentBrowserEnvironment;
        }, {
          "40": 40,
          "65": 65
        }],
        32: [function(_dereq_, module, exports) {
          'use strict';
          var invariant = _dereq_(144);
          var injected = false;
          var ReactComponentEnvironment = {
            unmountIDFromEnvironment: null,
            replaceNodeWithMarkupByID: null,
            processChildrenUpdates: null,
            injection: {injectEnvironment: function(environment) {
                !!injected ? "development" !== 'production' ? invariant(false, 'ReactCompositeComponent: injectEnvironment() can only be called once.') : invariant(false) : undefined;
                ReactComponentEnvironment.unmountIDFromEnvironment = environment.unmountIDFromEnvironment;
                ReactComponentEnvironment.replaceNodeWithMarkupByID = environment.replaceNodeWithMarkupByID;
                ReactComponentEnvironment.processChildrenUpdates = environment.processChildrenUpdates;
                injected = true;
              }}
          };
          module.exports = ReactComponentEnvironment;
        }, {"144": 144}],
        33: [function(_dereq_, module, exports) {
          'use strict';
          var ReactComponentEnvironment = _dereq_(32);
          var ReactCurrentOwner = _dereq_(34);
          var ReactElement = _dereq_(52);
          var ReactInstanceMap = _dereq_(62);
          var ReactPerf = _dereq_(71);
          var ReactPropTypeLocations = _dereq_(73);
          var ReactPropTypeLocationNames = _dereq_(72);
          var ReactReconciler = _dereq_(76);
          var ReactUpdateQueue = _dereq_(82);
          var assign = _dereq_(23);
          var emptyObject = _dereq_(137);
          var invariant = _dereq_(144);
          var shouldUpdateReactComponent = _dereq_(126);
          var warning = _dereq_(155);
          function getDeclarationErrorAddendum(component) {
            var owner = component._currentElement._owner || null;
            if (owner) {
              var name = owner.getName();
              if (name) {
                return ' Check the render method of `' + name + '`.';
              }
            }
            return '';
          }
          function StatelessComponent(Component) {}
          StatelessComponent.prototype.render = function() {
            var Component = ReactInstanceMap.get(this)._currentElement.type;
            return Component(this.props, this.context, this.updater);
          };
          var nextMountID = 1;
          var ReactCompositeComponentMixin = {
            construct: function(element) {
              this._currentElement = element;
              this._rootNodeID = null;
              this._instance = null;
              this._pendingElement = null;
              this._pendingStateQueue = null;
              this._pendingReplaceState = false;
              this._pendingForceUpdate = false;
              this._renderedComponent = null;
              this._context = null;
              this._mountOrder = 0;
              this._topLevelWrapper = null;
              this._pendingCallbacks = null;
            },
            mountComponent: function(rootID, transaction, context) {
              this._context = context;
              this._mountOrder = nextMountID++;
              this._rootNodeID = rootID;
              var publicProps = this._processProps(this._currentElement.props);
              var publicContext = this._processContext(context);
              var Component = this._currentElement.type;
              var inst;
              var renderedElement;
              var canInstantiate = ('prototype' in Component);
              if (canInstantiate) {
                if ("development" !== 'production') {
                  ReactCurrentOwner.current = this;
                  try {
                    inst = new Component(publicProps, publicContext, ReactUpdateQueue);
                  } finally {
                    ReactCurrentOwner.current = null;
                  }
                } else {
                  inst = new Component(publicProps, publicContext, ReactUpdateQueue);
                }
              }
              if (!canInstantiate || inst === null || inst === false || ReactElement.isValidElement(inst)) {
                renderedElement = inst;
                inst = new StatelessComponent(Component);
              }
              if ("development" !== 'production') {
                if (inst.render == null) {
                  "development" !== 'production' ? warning(false, '%s(...): No `render` method found on the returned component ' + 'instance: you may have forgotten to define `render`, returned ' + 'null/false from a stateless component, or tried to render an ' + 'element whose type is a function that isn\'t a React component.', Component.displayName || Component.name || 'Component') : undefined;
                } else {
                  "development" !== 'production' ? warning(Component.prototype && Component.prototype.isReactComponent || !canInstantiate || !(inst instanceof Component), '%s(...): React component classes must extend React.Component.', Component.displayName || Component.name || 'Component') : undefined;
                }
              }
              inst.props = publicProps;
              inst.context = publicContext;
              inst.refs = emptyObject;
              inst.updater = ReactUpdateQueue;
              this._instance = inst;
              ReactInstanceMap.set(inst, this);
              if ("development" !== 'production') {
                "development" !== 'production' ? warning(!inst.getInitialState || inst.getInitialState.isReactClassApproved, 'getInitialState was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Did you mean to define a state property instead?', this.getName() || 'a component') : undefined;
                "development" !== 'production' ? warning(!inst.getDefaultProps || inst.getDefaultProps.isReactClassApproved, 'getDefaultProps was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Use a static property to define defaultProps instead.', this.getName() || 'a component') : undefined;
                "development" !== 'production' ? warning(!inst.propTypes, 'propTypes was defined as an instance property on %s. Use a static ' + 'property to define propTypes instead.', this.getName() || 'a component') : undefined;
                "development" !== 'production' ? warning(!inst.contextTypes, 'contextTypes was defined as an instance property on %s. Use a ' + 'static property to define contextTypes instead.', this.getName() || 'a component') : undefined;
                "development" !== 'production' ? warning(typeof inst.componentShouldUpdate !== 'function', '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', this.getName() || 'A component') : undefined;
                "development" !== 'production' ? warning(typeof inst.componentDidUnmount !== 'function', '%s has a method called ' + 'componentDidUnmount(). But there is no such lifecycle method. ' + 'Did you mean componentWillUnmount()?', this.getName() || 'A component') : undefined;
                "development" !== 'production' ? warning(typeof inst.componentWillRecieveProps !== 'function', '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', this.getName() || 'A component') : undefined;
              }
              var initialState = inst.state;
              if (initialState === undefined) {
                inst.state = initialState = null;
              }
              !(typeof initialState === 'object' && !Array.isArray(initialState)) ? "development" !== 'production' ? invariant(false, '%s.state: must be set to an object or null', this.getName() || 'ReactCompositeComponent') : invariant(false) : undefined;
              this._pendingStateQueue = null;
              this._pendingReplaceState = false;
              this._pendingForceUpdate = false;
              if (inst.componentWillMount) {
                inst.componentWillMount();
                if (this._pendingStateQueue) {
                  inst.state = this._processPendingState(inst.props, inst.context);
                }
              }
              if (renderedElement === undefined) {
                renderedElement = this._renderValidatedComponent();
              }
              this._renderedComponent = this._instantiateReactComponent(renderedElement);
              var markup = ReactReconciler.mountComponent(this._renderedComponent, rootID, transaction, this._processChildContext(context));
              if (inst.componentDidMount) {
                transaction.getReactMountReady().enqueue(inst.componentDidMount, inst);
              }
              return markup;
            },
            unmountComponent: function() {
              var inst = this._instance;
              if (inst.componentWillUnmount) {
                inst.componentWillUnmount();
              }
              ReactReconciler.unmountComponent(this._renderedComponent);
              this._renderedComponent = null;
              this._instance = null;
              this._pendingStateQueue = null;
              this._pendingReplaceState = false;
              this._pendingForceUpdate = false;
              this._pendingCallbacks = null;
              this._pendingElement = null;
              this._context = null;
              this._rootNodeID = null;
              this._topLevelWrapper = null;
              ReactInstanceMap.remove(inst);
            },
            _maskContext: function(context) {
              var maskedContext = null;
              var Component = this._currentElement.type;
              var contextTypes = Component.contextTypes;
              if (!contextTypes) {
                return emptyObject;
              }
              maskedContext = {};
              for (var contextName in contextTypes) {
                maskedContext[contextName] = context[contextName];
              }
              return maskedContext;
            },
            _processContext: function(context) {
              var maskedContext = this._maskContext(context);
              if ("development" !== 'production') {
                var Component = this._currentElement.type;
                if (Component.contextTypes) {
                  this._checkPropTypes(Component.contextTypes, maskedContext, ReactPropTypeLocations.context);
                }
              }
              return maskedContext;
            },
            _processChildContext: function(currentContext) {
              var Component = this._currentElement.type;
              var inst = this._instance;
              var childContext = inst.getChildContext && inst.getChildContext();
              if (childContext) {
                !(typeof Component.childContextTypes === 'object') ? "development" !== 'production' ? invariant(false, '%s.getChildContext(): childContextTypes must be defined in order to ' + 'use getChildContext().', this.getName() || 'ReactCompositeComponent') : invariant(false) : undefined;
                if ("development" !== 'production') {
                  this._checkPropTypes(Component.childContextTypes, childContext, ReactPropTypeLocations.childContext);
                }
                for (var name in childContext) {
                  !(name in Component.childContextTypes) ? "development" !== 'production' ? invariant(false, '%s.getChildContext(): key "%s" is not defined in childContextTypes.', this.getName() || 'ReactCompositeComponent', name) : invariant(false) : undefined;
                }
                return assign({}, currentContext, childContext);
              }
              return currentContext;
            },
            _processProps: function(newProps) {
              if ("development" !== 'production') {
                var Component = this._currentElement.type;
                if (Component.propTypes) {
                  this._checkPropTypes(Component.propTypes, newProps, ReactPropTypeLocations.prop);
                }
              }
              return newProps;
            },
            _checkPropTypes: function(propTypes, props, location) {
              var componentName = this.getName();
              for (var propName in propTypes) {
                if (propTypes.hasOwnProperty(propName)) {
                  var error;
                  try {
                    !(typeof propTypes[propName] === 'function') ? "development" !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually ' + 'from React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], propName) : invariant(false) : undefined;
                    error = propTypes[propName](props, propName, componentName, location);
                  } catch (ex) {
                    error = ex;
                  }
                  if (error instanceof Error) {
                    var addendum = getDeclarationErrorAddendum(this);
                    if (location === ReactPropTypeLocations.prop) {
                      "development" !== 'production' ? warning(false, 'Failed Composite propType: %s%s', error.message, addendum) : undefined;
                    } else {
                      "development" !== 'production' ? warning(false, 'Failed Context Types: %s%s', error.message, addendum) : undefined;
                    }
                  }
                }
              }
            },
            receiveComponent: function(nextElement, transaction, nextContext) {
              var prevElement = this._currentElement;
              var prevContext = this._context;
              this._pendingElement = null;
              this.updateComponent(transaction, prevElement, nextElement, prevContext, nextContext);
            },
            performUpdateIfNecessary: function(transaction) {
              if (this._pendingElement != null) {
                ReactReconciler.receiveComponent(this, this._pendingElement || this._currentElement, transaction, this._context);
              }
              if (this._pendingStateQueue !== null || this._pendingForceUpdate) {
                this.updateComponent(transaction, this._currentElement, this._currentElement, this._context, this._context);
              }
            },
            updateComponent: function(transaction, prevParentElement, nextParentElement, prevUnmaskedContext, nextUnmaskedContext) {
              var inst = this._instance;
              var nextContext = this._context === nextUnmaskedContext ? inst.context : this._processContext(nextUnmaskedContext);
              var nextProps;
              if (prevParentElement === nextParentElement) {
                nextProps = nextParentElement.props;
              } else {
                nextProps = this._processProps(nextParentElement.props);
                if (inst.componentWillReceiveProps) {
                  inst.componentWillReceiveProps(nextProps, nextContext);
                }
              }
              var nextState = this._processPendingState(nextProps, nextContext);
              var shouldUpdate = this._pendingForceUpdate || !inst.shouldComponentUpdate || inst.shouldComponentUpdate(nextProps, nextState, nextContext);
              if ("development" !== 'production') {
                "development" !== 'production' ? warning(typeof shouldUpdate !== 'undefined', '%s.shouldComponentUpdate(): Returned undefined instead of a ' + 'boolean value. Make sure to return true or false.', this.getName() || 'ReactCompositeComponent') : undefined;
              }
              if (shouldUpdate) {
                this._pendingForceUpdate = false;
                this._performComponentUpdate(nextParentElement, nextProps, nextState, nextContext, transaction, nextUnmaskedContext);
              } else {
                this._currentElement = nextParentElement;
                this._context = nextUnmaskedContext;
                inst.props = nextProps;
                inst.state = nextState;
                inst.context = nextContext;
              }
            },
            _processPendingState: function(props, context) {
              var inst = this._instance;
              var queue = this._pendingStateQueue;
              var replace = this._pendingReplaceState;
              this._pendingReplaceState = false;
              this._pendingStateQueue = null;
              if (!queue) {
                return inst.state;
              }
              if (replace && queue.length === 1) {
                return queue[0];
              }
              var nextState = assign({}, replace ? queue[0] : inst.state);
              for (var i = replace ? 1 : 0; i < queue.length; i++) {
                var partial = queue[i];
                assign(nextState, typeof partial === 'function' ? partial.call(inst, nextState, props, context) : partial);
              }
              return nextState;
            },
            _performComponentUpdate: function(nextElement, nextProps, nextState, nextContext, transaction, unmaskedContext) {
              var inst = this._instance;
              var hasComponentDidUpdate = Boolean(inst.componentDidUpdate);
              var prevProps;
              var prevState;
              var prevContext;
              if (hasComponentDidUpdate) {
                prevProps = inst.props;
                prevState = inst.state;
                prevContext = inst.context;
              }
              if (inst.componentWillUpdate) {
                inst.componentWillUpdate(nextProps, nextState, nextContext);
              }
              this._currentElement = nextElement;
              this._context = unmaskedContext;
              inst.props = nextProps;
              inst.state = nextState;
              inst.context = nextContext;
              this._updateRenderedComponent(transaction, unmaskedContext);
              if (hasComponentDidUpdate) {
                transaction.getReactMountReady().enqueue(inst.componentDidUpdate.bind(inst, prevProps, prevState, prevContext), inst);
              }
            },
            _updateRenderedComponent: function(transaction, context) {
              var prevComponentInstance = this._renderedComponent;
              var prevRenderedElement = prevComponentInstance._currentElement;
              var nextRenderedElement = this._renderValidatedComponent();
              if (shouldUpdateReactComponent(prevRenderedElement, nextRenderedElement)) {
                ReactReconciler.receiveComponent(prevComponentInstance, nextRenderedElement, transaction, this._processChildContext(context));
              } else {
                var thisID = this._rootNodeID;
                var prevComponentID = prevComponentInstance._rootNodeID;
                ReactReconciler.unmountComponent(prevComponentInstance);
                this._renderedComponent = this._instantiateReactComponent(nextRenderedElement);
                var nextMarkup = ReactReconciler.mountComponent(this._renderedComponent, thisID, transaction, this._processChildContext(context));
                this._replaceNodeWithMarkupByID(prevComponentID, nextMarkup);
              }
            },
            _replaceNodeWithMarkupByID: function(prevComponentID, nextMarkup) {
              ReactComponentEnvironment.replaceNodeWithMarkupByID(prevComponentID, nextMarkup);
            },
            _renderValidatedComponentWithoutOwnerOrContext: function() {
              var inst = this._instance;
              var renderedComponent = inst.render();
              if ("development" !== 'production') {
                if (typeof renderedComponent === 'undefined' && inst.render._isMockFunction) {
                  renderedComponent = null;
                }
              }
              return renderedComponent;
            },
            _renderValidatedComponent: function() {
              var renderedComponent;
              ReactCurrentOwner.current = this;
              try {
                renderedComponent = this._renderValidatedComponentWithoutOwnerOrContext();
              } finally {
                ReactCurrentOwner.current = null;
              }
              !(renderedComponent === null || renderedComponent === false || ReactElement.isValidElement(renderedComponent)) ? "development" !== 'production' ? invariant(false, '%s.render(): A valid ReactComponent must be returned. You may have ' + 'returned undefined, an array or some other invalid object.', this.getName() || 'ReactCompositeComponent') : invariant(false) : undefined;
              return renderedComponent;
            },
            attachRef: function(ref, component) {
              var inst = this.getPublicInstance();
              !(inst != null) ? "development" !== 'production' ? invariant(false, 'Stateless function components cannot have refs.') : invariant(false) : undefined;
              var publicComponentInstance = component.getPublicInstance();
              if ("development" !== 'production') {
                var componentName = component && component.getName ? component.getName() : 'a component';
                "development" !== 'production' ? warning(publicComponentInstance != null, 'Stateless function components cannot be given refs ' + '(See ref "%s" in %s created by %s). ' + 'Attempts to access this ref will fail.', ref, componentName, this.getName()) : undefined;
              }
              var refs = inst.refs === emptyObject ? inst.refs = {} : inst.refs;
              refs[ref] = publicComponentInstance;
            },
            detachRef: function(ref) {
              var refs = this.getPublicInstance().refs;
              delete refs[ref];
            },
            getName: function() {
              var type = this._currentElement.type;
              var constructor = this._instance && this._instance.constructor;
              return type.displayName || constructor && constructor.displayName || type.name || constructor && constructor.name || null;
            },
            getPublicInstance: function() {
              var inst = this._instance;
              if (inst instanceof StatelessComponent) {
                return null;
              }
              return inst;
            },
            _instantiateReactComponent: null
          };
          ReactPerf.measureMethods(ReactCompositeComponentMixin, 'ReactCompositeComponent', {
            mountComponent: 'mountComponent',
            updateComponent: 'updateComponent',
            _renderValidatedComponent: '_renderValidatedComponent'
          });
          var ReactCompositeComponent = {Mixin: ReactCompositeComponentMixin};
          module.exports = ReactCompositeComponent;
        }, {
          "126": 126,
          "137": 137,
          "144": 144,
          "155": 155,
          "23": 23,
          "32": 32,
          "34": 34,
          "52": 52,
          "62": 62,
          "71": 71,
          "72": 72,
          "73": 73,
          "76": 76,
          "82": 82
        }],
        34: [function(_dereq_, module, exports) {
          'use strict';
          var ReactCurrentOwner = {current: null};
          module.exports = ReactCurrentOwner;
        }, {}],
        35: [function(_dereq_, module, exports) {
          'use strict';
          var ReactCurrentOwner = _dereq_(34);
          var ReactDOMTextComponent = _dereq_(46);
          var ReactDefaultInjection = _dereq_(49);
          var ReactInstanceHandles = _dereq_(61);
          var ReactMount = _dereq_(65);
          var ReactPerf = _dereq_(71);
          var ReactReconciler = _dereq_(76);
          var ReactUpdates = _dereq_(83);
          var ReactVersion = _dereq_(84);
          var findDOMNode = _dereq_(108);
          var renderSubtreeIntoContainer = _dereq_(123);
          var warning = _dereq_(155);
          ReactDefaultInjection.inject();
          var render = ReactPerf.measure('React', 'render', ReactMount.render);
          var React = {
            findDOMNode: findDOMNode,
            render: render,
            unmountComponentAtNode: ReactMount.unmountComponentAtNode,
            version: ReactVersion,
            unstable_batchedUpdates: ReactUpdates.batchedUpdates,
            unstable_renderSubtreeIntoContainer: renderSubtreeIntoContainer
          };
          if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject === 'function') {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
              CurrentOwner: ReactCurrentOwner,
              InstanceHandles: ReactInstanceHandles,
              Mount: ReactMount,
              Reconciler: ReactReconciler,
              TextComponent: ReactDOMTextComponent
            });
          }
          if ("development" !== 'production') {
            var ExecutionEnvironment = _dereq_(130);
            if (ExecutionEnvironment.canUseDOM && window.top === window.self) {
              if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
                if (navigator.userAgent.indexOf('Chrome') > -1 && navigator.userAgent.indexOf('Edge') === -1 || navigator.userAgent.indexOf('Firefox') > -1) {
                  console.debug('Download the React DevTools for a better development experience: ' + 'https://fb.me/react-devtools');
                }
              }
              var ieCompatibilityMode = document.documentMode && document.documentMode < 8;
              "development" !== 'production' ? warning(!ieCompatibilityMode, 'Internet Explorer is running in compatibility mode; please add the ' + 'following tag to your HTML to prevent this from happening: ' + '<meta http-equiv="X-UA-Compatible" content="IE=edge" />') : undefined;
              var expectedFeatures = [Array.isArray, Array.prototype.every, Array.prototype.forEach, Array.prototype.indexOf, Array.prototype.map, Date.now, Function.prototype.bind, Object.keys, String.prototype.split, String.prototype.trim, Object.create, Object.freeze];
              for (var i = 0; i < expectedFeatures.length; i++) {
                if (!expectedFeatures[i]) {
                  console.error('One or more ES5 shim/shams expected by React are not available: ' + 'https://fb.me/react-warning-polyfills');
                  break;
                }
              }
            }
          }
          module.exports = React;
        }, {
          "108": 108,
          "123": 123,
          "130": 130,
          "155": 155,
          "34": 34,
          "46": 46,
          "49": 49,
          "61": 61,
          "65": 65,
          "71": 71,
          "76": 76,
          "83": 83,
          "84": 84
        }],
        36: [function(_dereq_, module, exports) {
          'use strict';
          var mouseListenerNames = {
            onClick: true,
            onDoubleClick: true,
            onMouseDown: true,
            onMouseMove: true,
            onMouseUp: true,
            onClickCapture: true,
            onDoubleClickCapture: true,
            onMouseDownCapture: true,
            onMouseMoveCapture: true,
            onMouseUpCapture: true
          };
          var ReactDOMButton = {getNativeProps: function(inst, props, context) {
              if (!props.disabled) {
                return props;
              }
              var nativeProps = {};
              for (var key in props) {
                if (props.hasOwnProperty(key) && !mouseListenerNames[key]) {
                  nativeProps[key] = props[key];
                }
              }
              return nativeProps;
            }};
          module.exports = ReactDOMButton;
        }, {}],
        37: [function(_dereq_, module, exports) {
          'use strict';
          var AutoFocusUtils = _dereq_(2);
          var CSSPropertyOperations = _dereq_(5);
          var DOMProperty = _dereq_(10);
          var DOMPropertyOperations = _dereq_(11);
          var EventConstants = _dereq_(15);
          var ReactBrowserEventEmitter = _dereq_(26);
          var ReactComponentBrowserEnvironment = _dereq_(31);
          var ReactDOMButton = _dereq_(36);
          var ReactDOMInput = _dereq_(41);
          var ReactDOMOption = _dereq_(42);
          var ReactDOMSelect = _dereq_(43);
          var ReactDOMTextarea = _dereq_(47);
          var ReactMount = _dereq_(65);
          var ReactMultiChild = _dereq_(66);
          var ReactPerf = _dereq_(71);
          var ReactUpdateQueue = _dereq_(82);
          var assign = _dereq_(23);
          var canDefineProperty = _dereq_(104);
          var escapeTextContentForBrowser = _dereq_(107);
          var invariant = _dereq_(144);
          var isEventSupported = _dereq_(119);
          var keyOf = _dereq_(148);
          var setInnerHTML = _dereq_(124);
          var setTextContent = _dereq_(125);
          var shallowEqual = _dereq_(153);
          var validateDOMNesting = _dereq_(128);
          var warning = _dereq_(155);
          var deleteListener = ReactBrowserEventEmitter.deleteListener;
          var listenTo = ReactBrowserEventEmitter.listenTo;
          var registrationNameModules = ReactBrowserEventEmitter.registrationNameModules;
          var CONTENT_TYPES = {
            'string': true,
            'number': true
          };
          var CHILDREN = keyOf({children: null});
          var STYLE = keyOf({style: null});
          var HTML = keyOf({__html: null});
          var ELEMENT_NODE_TYPE = 1;
          function getDeclarationErrorAddendum(internalInstance) {
            if (internalInstance) {
              var owner = internalInstance._currentElement._owner || null;
              if (owner) {
                var name = owner.getName();
                if (name) {
                  return ' This DOM node was rendered by `' + name + '`.';
                }
              }
            }
            return '';
          }
          var legacyPropsDescriptor;
          if ("development" !== 'production') {
            legacyPropsDescriptor = {props: {
                enumerable: false,
                get: function() {
                  var component = this._reactInternalComponent;
                  "development" !== 'production' ? warning(false, 'ReactDOMComponent: Do not access .props of a DOM node; instead, ' + 'recreate the props as `render` did originally or read the DOM ' + 'properties/attributes directly from this node (e.g., ' + 'this.refs.box.className).%s', getDeclarationErrorAddendum(component)) : undefined;
                  return component._currentElement.props;
                }
              }};
          }
          function legacyGetDOMNode() {
            if ("development" !== 'production') {
              var component = this._reactInternalComponent;
              "development" !== 'production' ? warning(false, 'ReactDOMComponent: Do not access .getDOMNode() of a DOM node; ' + 'instead, use the node directly.%s', getDeclarationErrorAddendum(component)) : undefined;
            }
            return this;
          }
          function legacyIsMounted() {
            var component = this._reactInternalComponent;
            if ("development" !== 'production') {
              "development" !== 'production' ? warning(false, 'ReactDOMComponent: Do not access .isMounted() of a DOM node.%s', getDeclarationErrorAddendum(component)) : undefined;
            }
            return !!component;
          }
          function legacySetStateEtc() {
            if ("development" !== 'production') {
              var component = this._reactInternalComponent;
              "development" !== 'production' ? warning(false, 'ReactDOMComponent: Do not access .setState(), .replaceState(), or ' + '.forceUpdate() of a DOM node. This is a no-op.%s', getDeclarationErrorAddendum(component)) : undefined;
            }
          }
          function legacySetProps(partialProps, callback) {
            var component = this._reactInternalComponent;
            if ("development" !== 'production') {
              "development" !== 'production' ? warning(false, 'ReactDOMComponent: Do not access .setProps() of a DOM node. ' + 'Instead, call ReactDOM.render again at the top level.%s', getDeclarationErrorAddendum(component)) : undefined;
            }
            if (!component) {
              return;
            }
            ReactUpdateQueue.enqueueSetPropsInternal(component, partialProps);
            if (callback) {
              ReactUpdateQueue.enqueueCallbackInternal(component, callback);
            }
          }
          function legacyReplaceProps(partialProps, callback) {
            var component = this._reactInternalComponent;
            if ("development" !== 'production') {
              "development" !== 'production' ? warning(false, 'ReactDOMComponent: Do not access .replaceProps() of a DOM node. ' + 'Instead, call ReactDOM.render again at the top level.%s', getDeclarationErrorAddendum(component)) : undefined;
            }
            if (!component) {
              return;
            }
            ReactUpdateQueue.enqueueReplacePropsInternal(component, partialProps);
            if (callback) {
              ReactUpdateQueue.enqueueCallbackInternal(component, callback);
            }
          }
          function friendlyStringify(obj) {
            if (typeof obj === 'object') {
              if (Array.isArray(obj)) {
                return '[' + obj.map(friendlyStringify).join(', ') + ']';
              } else {
                var pairs = [];
                for (var key in obj) {
                  if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var keyEscaped = /^[a-z$_][\w$_]*$/i.test(key) ? key : JSON.stringify(key);
                    pairs.push(keyEscaped + ': ' + friendlyStringify(obj[key]));
                  }
                }
                return '{' + pairs.join(', ') + '}';
              }
            } else if (typeof obj === 'string') {
              return JSON.stringify(obj);
            } else if (typeof obj === 'function') {
              return '[function object]';
            }
            return String(obj);
          }
          var styleMutationWarning = {};
          function checkAndWarnForMutatedStyle(style1, style2, component) {
            if (style1 == null || style2 == null) {
              return;
            }
            if (shallowEqual(style1, style2)) {
              return;
            }
            var componentName = component._tag;
            var owner = component._currentElement._owner;
            var ownerName;
            if (owner) {
              ownerName = owner.getName();
            }
            var hash = ownerName + '|' + componentName;
            if (styleMutationWarning.hasOwnProperty(hash)) {
              return;
            }
            styleMutationWarning[hash] = true;
            "development" !== 'production' ? warning(false, '`%s` was passed a style object that has previously been mutated. ' + 'Mutating `style` is deprecated. Consider cloning it beforehand. Check ' + 'the `render` %s. Previous style: %s. Mutated style: %s.', componentName, owner ? 'of `' + ownerName + '`' : 'using <' + componentName + '>', friendlyStringify(style1), friendlyStringify(style2)) : undefined;
          }
          function assertValidProps(component, props) {
            if (!props) {
              return;
            }
            if ("development" !== 'production') {
              if (voidElementTags[component._tag]) {
                "development" !== 'production' ? warning(props.children == null && props.dangerouslySetInnerHTML == null, '%s is a void element tag and must not have `children` or ' + 'use `props.dangerouslySetInnerHTML`.%s', component._tag, component._currentElement._owner ? ' Check the render method of ' + component._currentElement._owner.getName() + '.' : '') : undefined;
              }
            }
            if (props.dangerouslySetInnerHTML != null) {
              !(props.children == null) ? "development" !== 'production' ? invariant(false, 'Can only set one of `children` or `props.dangerouslySetInnerHTML`.') : invariant(false) : undefined;
              !(typeof props.dangerouslySetInnerHTML === 'object' && HTML in props.dangerouslySetInnerHTML) ? "development" !== 'production' ? invariant(false, '`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. ' + 'Please visit https://fb.me/react-invariant-dangerously-set-inner-html ' + 'for more information.') : invariant(false) : undefined;
            }
            if ("development" !== 'production') {
              "development" !== 'production' ? warning(props.innerHTML == null, 'Directly setting property `innerHTML` is not permitted. ' + 'For more information, lookup documentation on `dangerouslySetInnerHTML`.') : undefined;
              "development" !== 'production' ? warning(!props.contentEditable || props.children == null, 'A component is `contentEditable` and contains `children` managed by ' + 'React. It is now your responsibility to guarantee that none of ' + 'those nodes are unexpectedly modified or duplicated. This is ' + 'probably not intentional.') : undefined;
            }
            !(props.style == null || typeof props.style === 'object') ? "development" !== 'production' ? invariant(false, 'The `style` prop expects a mapping from style properties to values, ' + 'not a string. For example, style={{marginRight: spacing + \'em\'}} when ' + 'using JSX.%s', getDeclarationErrorAddendum(component)) : invariant(false) : undefined;
          }
          function enqueuePutListener(id, registrationName, listener, transaction) {
            if ("development" !== 'production') {
              "development" !== 'production' ? warning(registrationName !== 'onScroll' || isEventSupported('scroll', true), 'This browser doesn\'t support the `onScroll` event') : undefined;
            }
            var container = ReactMount.findReactContainerForID(id);
            if (container) {
              var doc = container.nodeType === ELEMENT_NODE_TYPE ? container.ownerDocument : container;
              listenTo(registrationName, doc);
            }
            transaction.getReactMountReady().enqueue(putListener, {
              id: id,
              registrationName: registrationName,
              listener: listener
            });
          }
          function putListener() {
            var listenerToPut = this;
            ReactBrowserEventEmitter.putListener(listenerToPut.id, listenerToPut.registrationName, listenerToPut.listener);
          }
          var mediaEvents = {
            topAbort: 'abort',
            topCanPlay: 'canplay',
            topCanPlayThrough: 'canplaythrough',
            topDurationChange: 'durationchange',
            topEmptied: 'emptied',
            topEncrypted: 'encrypted',
            topEnded: 'ended',
            topError: 'error',
            topLoadedData: 'loadeddata',
            topLoadedMetadata: 'loadedmetadata',
            topLoadStart: 'loadstart',
            topPause: 'pause',
            topPlay: 'play',
            topPlaying: 'playing',
            topProgress: 'progress',
            topRateChange: 'ratechange',
            topSeeked: 'seeked',
            topSeeking: 'seeking',
            topStalled: 'stalled',
            topSuspend: 'suspend',
            topTimeUpdate: 'timeupdate',
            topVolumeChange: 'volumechange',
            topWaiting: 'waiting'
          };
          function trapBubbledEventsLocal() {
            var inst = this;
            !inst._rootNodeID ? "development" !== 'production' ? invariant(false, 'Must be mounted to trap events') : invariant(false) : undefined;
            var node = ReactMount.getNode(inst._rootNodeID);
            !node ? "development" !== 'production' ? invariant(false, 'trapBubbledEvent(...): Requires node to be rendered.') : invariant(false) : undefined;
            switch (inst._tag) {
              case 'iframe':
                inst._wrapperState.listeners = [ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes.topLoad, 'load', node)];
                break;
              case 'video':
              case 'audio':
                inst._wrapperState.listeners = [];
                for (var event in mediaEvents) {
                  if (mediaEvents.hasOwnProperty(event)) {
                    inst._wrapperState.listeners.push(ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes[event], mediaEvents[event], node));
                  }
                }
                break;
              case 'img':
                inst._wrapperState.listeners = [ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes.topError, 'error', node), ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes.topLoad, 'load', node)];
                break;
              case 'form':
                inst._wrapperState.listeners = [ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes.topReset, 'reset', node), ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes.topSubmit, 'submit', node)];
                break;
            }
          }
          function mountReadyInputWrapper() {
            ReactDOMInput.mountReadyWrapper(this);
          }
          function postUpdateSelectWrapper() {
            ReactDOMSelect.postUpdateWrapper(this);
          }
          var omittedCloseTags = {
            'area': true,
            'base': true,
            'br': true,
            'col': true,
            'embed': true,
            'hr': true,
            'img': true,
            'input': true,
            'keygen': true,
            'link': true,
            'meta': true,
            'param': true,
            'source': true,
            'track': true,
            'wbr': true
          };
          var newlineEatingTags = {
            'listing': true,
            'pre': true,
            'textarea': true
          };
          var voidElementTags = assign({'menuitem': true}, omittedCloseTags);
          var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
          var validatedTagCache = {};
          var hasOwnProperty = ({}).hasOwnProperty;
          function validateDangerousTag(tag) {
            if (!hasOwnProperty.call(validatedTagCache, tag)) {
              !VALID_TAG_REGEX.test(tag) ? "development" !== 'production' ? invariant(false, 'Invalid tag: %s', tag) : invariant(false) : undefined;
              validatedTagCache[tag] = true;
            }
          }
          function processChildContextDev(context, inst) {
            context = assign({}, context);
            var info = context[validateDOMNesting.ancestorInfoContextKey];
            context[validateDOMNesting.ancestorInfoContextKey] = validateDOMNesting.updatedAncestorInfo(info, inst._tag, inst);
            return context;
          }
          function isCustomComponent(tagName, props) {
            return tagName.indexOf('-') >= 0 || props.is != null;
          }
          function ReactDOMComponent(tag) {
            validateDangerousTag(tag);
            this._tag = tag.toLowerCase();
            this._renderedChildren = null;
            this._previousStyle = null;
            this._previousStyleCopy = null;
            this._rootNodeID = null;
            this._wrapperState = null;
            this._topLevelWrapper = null;
            this._nodeWithLegacyProperties = null;
            if ("development" !== 'production') {
              this._unprocessedContextDev = null;
              this._processedContextDev = null;
            }
          }
          ReactDOMComponent.displayName = 'ReactDOMComponent';
          ReactDOMComponent.Mixin = {
            construct: function(element) {
              this._currentElement = element;
            },
            mountComponent: function(rootID, transaction, context) {
              this._rootNodeID = rootID;
              var props = this._currentElement.props;
              switch (this._tag) {
                case 'iframe':
                case 'img':
                case 'form':
                case 'video':
                case 'audio':
                  this._wrapperState = {listeners: null};
                  transaction.getReactMountReady().enqueue(trapBubbledEventsLocal, this);
                  break;
                case 'button':
                  props = ReactDOMButton.getNativeProps(this, props, context);
                  break;
                case 'input':
                  ReactDOMInput.mountWrapper(this, props, context);
                  props = ReactDOMInput.getNativeProps(this, props, context);
                  break;
                case 'option':
                  ReactDOMOption.mountWrapper(this, props, context);
                  props = ReactDOMOption.getNativeProps(this, props, context);
                  break;
                case 'select':
                  ReactDOMSelect.mountWrapper(this, props, context);
                  props = ReactDOMSelect.getNativeProps(this, props, context);
                  context = ReactDOMSelect.processChildContext(this, props, context);
                  break;
                case 'textarea':
                  ReactDOMTextarea.mountWrapper(this, props, context);
                  props = ReactDOMTextarea.getNativeProps(this, props, context);
                  break;
              }
              assertValidProps(this, props);
              if ("development" !== 'production') {
                if (context[validateDOMNesting.ancestorInfoContextKey]) {
                  validateDOMNesting(this._tag, this, context[validateDOMNesting.ancestorInfoContextKey]);
                }
              }
              if ("development" !== 'production') {
                this._unprocessedContextDev = context;
                this._processedContextDev = processChildContextDev(context, this);
                context = this._processedContextDev;
              }
              var mountImage;
              if (transaction.useCreateElement) {
                var ownerDocument = context[ReactMount.ownerDocumentContextKey];
                var el = ownerDocument.createElement(this._currentElement.type);
                DOMPropertyOperations.setAttributeForID(el, this._rootNodeID);
                ReactMount.getID(el);
                this._updateDOMProperties({}, props, transaction, el);
                this._createInitialChildren(transaction, props, context, el);
                mountImage = el;
              } else {
                var tagOpen = this._createOpenTagMarkupAndPutListeners(transaction, props);
                var tagContent = this._createContentMarkup(transaction, props, context);
                if (!tagContent && omittedCloseTags[this._tag]) {
                  mountImage = tagOpen + '/>';
                } else {
                  mountImage = tagOpen + '>' + tagContent + '</' + this._currentElement.type + '>';
                }
              }
              switch (this._tag) {
                case 'input':
                  transaction.getReactMountReady().enqueue(mountReadyInputWrapper, this);
                case 'button':
                case 'select':
                case 'textarea':
                  if (props.autoFocus) {
                    transaction.getReactMountReady().enqueue(AutoFocusUtils.focusDOMComponent, this);
                  }
                  break;
              }
              return mountImage;
            },
            _createOpenTagMarkupAndPutListeners: function(transaction, props) {
              var ret = '<' + this._currentElement.type;
              for (var propKey in props) {
                if (!props.hasOwnProperty(propKey)) {
                  continue;
                }
                var propValue = props[propKey];
                if (propValue == null) {
                  continue;
                }
                if (registrationNameModules.hasOwnProperty(propKey)) {
                  if (propValue) {
                    enqueuePutListener(this._rootNodeID, propKey, propValue, transaction);
                  }
                } else {
                  if (propKey === STYLE) {
                    if (propValue) {
                      if ("development" !== 'production') {
                        this._previousStyle = propValue;
                      }
                      propValue = this._previousStyleCopy = assign({}, props.style);
                    }
                    propValue = CSSPropertyOperations.createMarkupForStyles(propValue);
                  }
                  var markup = null;
                  if (this._tag != null && isCustomComponent(this._tag, props)) {
                    if (propKey !== CHILDREN) {
                      markup = DOMPropertyOperations.createMarkupForCustomAttribute(propKey, propValue);
                    }
                  } else {
                    markup = DOMPropertyOperations.createMarkupForProperty(propKey, propValue);
                  }
                  if (markup) {
                    ret += ' ' + markup;
                  }
                }
              }
              if (transaction.renderToStaticMarkup) {
                return ret;
              }
              var markupForID = DOMPropertyOperations.createMarkupForID(this._rootNodeID);
              return ret + ' ' + markupForID;
            },
            _createContentMarkup: function(transaction, props, context) {
              var ret = '';
              var innerHTML = props.dangerouslySetInnerHTML;
              if (innerHTML != null) {
                if (innerHTML.__html != null) {
                  ret = innerHTML.__html;
                }
              } else {
                var contentToUse = CONTENT_TYPES[typeof props.children] ? props.children : null;
                var childrenToUse = contentToUse != null ? null : props.children;
                if (contentToUse != null) {
                  ret = escapeTextContentForBrowser(contentToUse);
                } else if (childrenToUse != null) {
                  var mountImages = this.mountChildren(childrenToUse, transaction, context);
                  ret = mountImages.join('');
                }
              }
              if (newlineEatingTags[this._tag] && ret.charAt(0) === '\n') {
                return '\n' + ret;
              } else {
                return ret;
              }
            },
            _createInitialChildren: function(transaction, props, context, el) {
              var innerHTML = props.dangerouslySetInnerHTML;
              if (innerHTML != null) {
                if (innerHTML.__html != null) {
                  setInnerHTML(el, innerHTML.__html);
                }
              } else {
                var contentToUse = CONTENT_TYPES[typeof props.children] ? props.children : null;
                var childrenToUse = contentToUse != null ? null : props.children;
                if (contentToUse != null) {
                  setTextContent(el, contentToUse);
                } else if (childrenToUse != null) {
                  var mountImages = this.mountChildren(childrenToUse, transaction, context);
                  for (var i = 0; i < mountImages.length; i++) {
                    el.appendChild(mountImages[i]);
                  }
                }
              }
            },
            receiveComponent: function(nextElement, transaction, context) {
              var prevElement = this._currentElement;
              this._currentElement = nextElement;
              this.updateComponent(transaction, prevElement, nextElement, context);
            },
            updateComponent: function(transaction, prevElement, nextElement, context) {
              var lastProps = prevElement.props;
              var nextProps = this._currentElement.props;
              switch (this._tag) {
                case 'button':
                  lastProps = ReactDOMButton.getNativeProps(this, lastProps);
                  nextProps = ReactDOMButton.getNativeProps(this, nextProps);
                  break;
                case 'input':
                  ReactDOMInput.updateWrapper(this);
                  lastProps = ReactDOMInput.getNativeProps(this, lastProps);
                  nextProps = ReactDOMInput.getNativeProps(this, nextProps);
                  break;
                case 'option':
                  lastProps = ReactDOMOption.getNativeProps(this, lastProps);
                  nextProps = ReactDOMOption.getNativeProps(this, nextProps);
                  break;
                case 'select':
                  lastProps = ReactDOMSelect.getNativeProps(this, lastProps);
                  nextProps = ReactDOMSelect.getNativeProps(this, nextProps);
                  break;
                case 'textarea':
                  ReactDOMTextarea.updateWrapper(this);
                  lastProps = ReactDOMTextarea.getNativeProps(this, lastProps);
                  nextProps = ReactDOMTextarea.getNativeProps(this, nextProps);
                  break;
              }
              if ("development" !== 'production') {
                if (this._unprocessedContextDev !== context) {
                  this._unprocessedContextDev = context;
                  this._processedContextDev = processChildContextDev(context, this);
                }
                context = this._processedContextDev;
              }
              assertValidProps(this, nextProps);
              this._updateDOMProperties(lastProps, nextProps, transaction, null);
              this._updateDOMChildren(lastProps, nextProps, transaction, context);
              if (!canDefineProperty && this._nodeWithLegacyProperties) {
                this._nodeWithLegacyProperties.props = nextProps;
              }
              if (this._tag === 'select') {
                transaction.getReactMountReady().enqueue(postUpdateSelectWrapper, this);
              }
            },
            _updateDOMProperties: function(lastProps, nextProps, transaction, node) {
              var propKey;
              var styleName;
              var styleUpdates;
              for (propKey in lastProps) {
                if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey)) {
                  continue;
                }
                if (propKey === STYLE) {
                  var lastStyle = this._previousStyleCopy;
                  for (styleName in lastStyle) {
                    if (lastStyle.hasOwnProperty(styleName)) {
                      styleUpdates = styleUpdates || {};
                      styleUpdates[styleName] = '';
                    }
                  }
                  this._previousStyleCopy = null;
                } else if (registrationNameModules.hasOwnProperty(propKey)) {
                  if (lastProps[propKey]) {
                    deleteListener(this._rootNodeID, propKey);
                  }
                } else if (DOMProperty.properties[propKey] || DOMProperty.isCustomAttribute(propKey)) {
                  if (!node) {
                    node = ReactMount.getNode(this._rootNodeID);
                  }
                  DOMPropertyOperations.deleteValueForProperty(node, propKey);
                }
              }
              for (propKey in nextProps) {
                var nextProp = nextProps[propKey];
                var lastProp = propKey === STYLE ? this._previousStyleCopy : lastProps[propKey];
                if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp) {
                  continue;
                }
                if (propKey === STYLE) {
                  if (nextProp) {
                    if ("development" !== 'production') {
                      checkAndWarnForMutatedStyle(this._previousStyleCopy, this._previousStyle, this);
                      this._previousStyle = nextProp;
                    }
                    nextProp = this._previousStyleCopy = assign({}, nextProp);
                  } else {
                    this._previousStyleCopy = null;
                  }
                  if (lastProp) {
                    for (styleName in lastProp) {
                      if (lastProp.hasOwnProperty(styleName) && (!nextProp || !nextProp.hasOwnProperty(styleName))) {
                        styleUpdates = styleUpdates || {};
                        styleUpdates[styleName] = '';
                      }
                    }
                    for (styleName in nextProp) {
                      if (nextProp.hasOwnProperty(styleName) && lastProp[styleName] !== nextProp[styleName]) {
                        styleUpdates = styleUpdates || {};
                        styleUpdates[styleName] = nextProp[styleName];
                      }
                    }
                  } else {
                    styleUpdates = nextProp;
                  }
                } else if (registrationNameModules.hasOwnProperty(propKey)) {
                  if (nextProp) {
                    enqueuePutListener(this._rootNodeID, propKey, nextProp, transaction);
                  } else if (lastProp) {
                    deleteListener(this._rootNodeID, propKey);
                  }
                } else if (isCustomComponent(this._tag, nextProps)) {
                  if (!node) {
                    node = ReactMount.getNode(this._rootNodeID);
                  }
                  if (propKey === CHILDREN) {
                    nextProp = null;
                  }
                  DOMPropertyOperations.setValueForAttribute(node, propKey, nextProp);
                } else if (DOMProperty.properties[propKey] || DOMProperty.isCustomAttribute(propKey)) {
                  if (!node) {
                    node = ReactMount.getNode(this._rootNodeID);
                  }
                  if (nextProp != null) {
                    DOMPropertyOperations.setValueForProperty(node, propKey, nextProp);
                  } else {
                    DOMPropertyOperations.deleteValueForProperty(node, propKey);
                  }
                }
              }
              if (styleUpdates) {
                if (!node) {
                  node = ReactMount.getNode(this._rootNodeID);
                }
                CSSPropertyOperations.setValueForStyles(node, styleUpdates);
              }
            },
            _updateDOMChildren: function(lastProps, nextProps, transaction, context) {
              var lastContent = CONTENT_TYPES[typeof lastProps.children] ? lastProps.children : null;
              var nextContent = CONTENT_TYPES[typeof nextProps.children] ? nextProps.children : null;
              var lastHtml = lastProps.dangerouslySetInnerHTML && lastProps.dangerouslySetInnerHTML.__html;
              var nextHtml = nextProps.dangerouslySetInnerHTML && nextProps.dangerouslySetInnerHTML.__html;
              var lastChildren = lastContent != null ? null : lastProps.children;
              var nextChildren = nextContent != null ? null : nextProps.children;
              var lastHasContentOrHtml = lastContent != null || lastHtml != null;
              var nextHasContentOrHtml = nextContent != null || nextHtml != null;
              if (lastChildren != null && nextChildren == null) {
                this.updateChildren(null, transaction, context);
              } else if (lastHasContentOrHtml && !nextHasContentOrHtml) {
                this.updateTextContent('');
              }
              if (nextContent != null) {
                if (lastContent !== nextContent) {
                  this.updateTextContent('' + nextContent);
                }
              } else if (nextHtml != null) {
                if (lastHtml !== nextHtml) {
                  this.updateMarkup('' + nextHtml);
                }
              } else if (nextChildren != null) {
                this.updateChildren(nextChildren, transaction, context);
              }
            },
            unmountComponent: function() {
              switch (this._tag) {
                case 'iframe':
                case 'img':
                case 'form':
                case 'video':
                case 'audio':
                  var listeners = this._wrapperState.listeners;
                  if (listeners) {
                    for (var i = 0; i < listeners.length; i++) {
                      listeners[i].remove();
                    }
                  }
                  break;
                case 'input':
                  ReactDOMInput.unmountWrapper(this);
                  break;
                case 'html':
                case 'head':
                case 'body':
                  !false ? "development" !== 'production' ? invariant(false, '<%s> tried to unmount. Because of cross-browser quirks it is ' + 'impossible to unmount some top-level components (eg <html>, ' + '<head>, and <body>) reliably and efficiently. To fix this, have a ' + 'single top-level component that never unmounts render these ' + 'elements.', this._tag) : invariant(false) : undefined;
                  break;
              }
              this.unmountChildren();
              ReactBrowserEventEmitter.deleteAllListeners(this._rootNodeID);
              ReactComponentBrowserEnvironment.unmountIDFromEnvironment(this._rootNodeID);
              this._rootNodeID = null;
              this._wrapperState = null;
              if (this._nodeWithLegacyProperties) {
                var node = this._nodeWithLegacyProperties;
                node._reactInternalComponent = null;
                this._nodeWithLegacyProperties = null;
              }
            },
            getPublicInstance: function() {
              if (!this._nodeWithLegacyProperties) {
                var node = ReactMount.getNode(this._rootNodeID);
                node._reactInternalComponent = this;
                node.getDOMNode = legacyGetDOMNode;
                node.isMounted = legacyIsMounted;
                node.setState = legacySetStateEtc;
                node.replaceState = legacySetStateEtc;
                node.forceUpdate = legacySetStateEtc;
                node.setProps = legacySetProps;
                node.replaceProps = legacyReplaceProps;
                if ("development" !== 'production') {
                  if (canDefineProperty) {
                    Object.defineProperties(node, legacyPropsDescriptor);
                  } else {
                    node.props = this._currentElement.props;
                  }
                } else {
                  node.props = this._currentElement.props;
                }
                this._nodeWithLegacyProperties = node;
              }
              return this._nodeWithLegacyProperties;
            }
          };
          ReactPerf.measureMethods(ReactDOMComponent, 'ReactDOMComponent', {
            mountComponent: 'mountComponent',
            updateComponent: 'updateComponent'
          });
          assign(ReactDOMComponent.prototype, ReactDOMComponent.Mixin, ReactMultiChild.Mixin);
          module.exports = ReactDOMComponent;
        }, {
          "10": 10,
          "104": 104,
          "107": 107,
          "11": 11,
          "119": 119,
          "124": 124,
          "125": 125,
          "128": 128,
          "144": 144,
          "148": 148,
          "15": 15,
          "153": 153,
          "155": 155,
          "2": 2,
          "23": 23,
          "26": 26,
          "31": 31,
          "36": 36,
          "41": 41,
          "42": 42,
          "43": 43,
          "47": 47,
          "5": 5,
          "65": 65,
          "66": 66,
          "71": 71,
          "82": 82
        }],
        38: [function(_dereq_, module, exports) {
          'use strict';
          var ReactElement = _dereq_(52);
          var ReactElementValidator = _dereq_(53);
          var mapObject = _dereq_(149);
          function createDOMFactory(tag) {
            if ("development" !== 'production') {
              return ReactElementValidator.createFactory(tag);
            }
            return ReactElement.createFactory(tag);
          }
          var ReactDOMFactories = mapObject({
            a: 'a',
            abbr: 'abbr',
            address: 'address',
            area: 'area',
            article: 'article',
            aside: 'aside',
            audio: 'audio',
            b: 'b',
            base: 'base',
            bdi: 'bdi',
            bdo: 'bdo',
            big: 'big',
            blockquote: 'blockquote',
            body: 'body',
            br: 'br',
            button: 'button',
            canvas: 'canvas',
            caption: 'caption',
            cite: 'cite',
            code: 'code',
            col: 'col',
            colgroup: 'colgroup',
            data: 'data',
            datalist: 'datalist',
            dd: 'dd',
            del: 'del',
            details: 'details',
            dfn: 'dfn',
            dialog: 'dialog',
            div: 'div',
            dl: 'dl',
            dt: 'dt',
            em: 'em',
            embed: 'embed',
            fieldset: 'fieldset',
            figcaption: 'figcaption',
            figure: 'figure',
            footer: 'footer',
            form: 'form',
            h1: 'h1',
            h2: 'h2',
            h3: 'h3',
            h4: 'h4',
            h5: 'h5',
            h6: 'h6',
            head: 'head',
            header: 'header',
            hgroup: 'hgroup',
            hr: 'hr',
            html: 'html',
            i: 'i',
            iframe: 'iframe',
            img: 'img',
            input: 'input',
            ins: 'ins',
            kbd: 'kbd',
            keygen: 'keygen',
            label: 'label',
            legend: 'legend',
            li: 'li',
            link: 'link',
            main: 'main',
            map: 'map',
            mark: 'mark',
            menu: 'menu',
            menuitem: 'menuitem',
            meta: 'meta',
            meter: 'meter',
            nav: 'nav',
            noscript: 'noscript',
            object: 'object',
            ol: 'ol',
            optgroup: 'optgroup',
            option: 'option',
            output: 'output',
            p: 'p',
            param: 'param',
            picture: 'picture',
            pre: 'pre',
            progress: 'progress',
            q: 'q',
            rp: 'rp',
            rt: 'rt',
            ruby: 'ruby',
            s: 's',
            samp: 'samp',
            script: 'script',
            section: 'section',
            select: 'select',
            small: 'small',
            source: 'source',
            span: 'span',
            strong: 'strong',
            style: 'style',
            sub: 'sub',
            summary: 'summary',
            sup: 'sup',
            table: 'table',
            tbody: 'tbody',
            td: 'td',
            textarea: 'textarea',
            tfoot: 'tfoot',
            th: 'th',
            thead: 'thead',
            time: 'time',
            title: 'title',
            tr: 'tr',
            track: 'track',
            u: 'u',
            ul: 'ul',
            'var': 'var',
            video: 'video',
            wbr: 'wbr',
            circle: 'circle',
            clipPath: 'clipPath',
            defs: 'defs',
            ellipse: 'ellipse',
            g: 'g',
            image: 'image',
            line: 'line',
            linearGradient: 'linearGradient',
            mask: 'mask',
            path: 'path',
            pattern: 'pattern',
            polygon: 'polygon',
            polyline: 'polyline',
            radialGradient: 'radialGradient',
            rect: 'rect',
            stop: 'stop',
            svg: 'svg',
            text: 'text',
            tspan: 'tspan'
          }, createDOMFactory);
          module.exports = ReactDOMFactories;
        }, {
          "149": 149,
          "52": 52,
          "53": 53
        }],
        39: [function(_dereq_, module, exports) {
          'use strict';
          var ReactDOMFeatureFlags = {useCreateElement: false};
          module.exports = ReactDOMFeatureFlags;
        }, {}],
        40: [function(_dereq_, module, exports) {
          'use strict';
          var DOMChildrenOperations = _dereq_(9);
          var DOMPropertyOperations = _dereq_(11);
          var ReactMount = _dereq_(65);
          var ReactPerf = _dereq_(71);
          var invariant = _dereq_(144);
          var INVALID_PROPERTY_ERRORS = {
            dangerouslySetInnerHTML: '`dangerouslySetInnerHTML` must be set using `updateInnerHTMLByID()`.',
            style: '`style` must be set using `updateStylesByID()`.'
          };
          var ReactDOMIDOperations = {
            updatePropertyByID: function(id, name, value) {
              var node = ReactMount.getNode(id);
              !!INVALID_PROPERTY_ERRORS.hasOwnProperty(name) ? "development" !== 'production' ? invariant(false, 'updatePropertyByID(...): %s', INVALID_PROPERTY_ERRORS[name]) : invariant(false) : undefined;
              if (value != null) {
                DOMPropertyOperations.setValueForProperty(node, name, value);
              } else {
                DOMPropertyOperations.deleteValueForProperty(node, name);
              }
            },
            dangerouslyReplaceNodeWithMarkupByID: function(id, markup) {
              var node = ReactMount.getNode(id);
              DOMChildrenOperations.dangerouslyReplaceNodeWithMarkup(node, markup);
            },
            dangerouslyProcessChildrenUpdates: function(updates, markup) {
              for (var i = 0; i < updates.length; i++) {
                updates[i].parentNode = ReactMount.getNode(updates[i].parentID);
              }
              DOMChildrenOperations.processUpdates(updates, markup);
            }
          };
          ReactPerf.measureMethods(ReactDOMIDOperations, 'ReactDOMIDOperations', {
            dangerouslyReplaceNodeWithMarkupByID: 'dangerouslyReplaceNodeWithMarkupByID',
            dangerouslyProcessChildrenUpdates: 'dangerouslyProcessChildrenUpdates'
          });
          module.exports = ReactDOMIDOperations;
        }, {
          "11": 11,
          "144": 144,
          "65": 65,
          "71": 71,
          "9": 9
        }],
        41: [function(_dereq_, module, exports) {
          'use strict';
          var ReactDOMIDOperations = _dereq_(40);
          var LinkedValueUtils = _dereq_(22);
          var ReactMount = _dereq_(65);
          var ReactUpdates = _dereq_(83);
          var assign = _dereq_(23);
          var invariant = _dereq_(144);
          var instancesByReactID = {};
          function forceUpdateIfMounted() {
            if (this._rootNodeID) {
              ReactDOMInput.updateWrapper(this);
            }
          }
          var ReactDOMInput = {
            getNativeProps: function(inst, props, context) {
              var value = LinkedValueUtils.getValue(props);
              var checked = LinkedValueUtils.getChecked(props);
              var nativeProps = assign({}, props, {
                defaultChecked: undefined,
                defaultValue: undefined,
                value: value != null ? value : inst._wrapperState.initialValue,
                checked: checked != null ? checked : inst._wrapperState.initialChecked,
                onChange: inst._wrapperState.onChange
              });
              return nativeProps;
            },
            mountWrapper: function(inst, props) {
              if ("development" !== 'production') {
                LinkedValueUtils.checkPropTypes('input', props, inst._currentElement._owner);
              }
              var defaultValue = props.defaultValue;
              inst._wrapperState = {
                initialChecked: props.defaultChecked || false,
                initialValue: defaultValue != null ? defaultValue : null,
                onChange: _handleChange.bind(inst)
              };
            },
            mountReadyWrapper: function(inst) {
              instancesByReactID[inst._rootNodeID] = inst;
            },
            unmountWrapper: function(inst) {
              delete instancesByReactID[inst._rootNodeID];
            },
            updateWrapper: function(inst) {
              var props = inst._currentElement.props;
              var checked = props.checked;
              if (checked != null) {
                ReactDOMIDOperations.updatePropertyByID(inst._rootNodeID, 'checked', checked || false);
              }
              var value = LinkedValueUtils.getValue(props);
              if (value != null) {
                ReactDOMIDOperations.updatePropertyByID(inst._rootNodeID, 'value', '' + value);
              }
            }
          };
          function _handleChange(event) {
            var props = this._currentElement.props;
            var returnValue = LinkedValueUtils.executeOnChange(props, event);
            ReactUpdates.asap(forceUpdateIfMounted, this);
            var name = props.name;
            if (props.type === 'radio' && name != null) {
              var rootNode = ReactMount.getNode(this._rootNodeID);
              var queryRoot = rootNode;
              while (queryRoot.parentNode) {
                queryRoot = queryRoot.parentNode;
              }
              var group = queryRoot.querySelectorAll('input[name=' + JSON.stringify('' + name) + '][type="radio"]');
              for (var i = 0; i < group.length; i++) {
                var otherNode = group[i];
                if (otherNode === rootNode || otherNode.form !== rootNode.form) {
                  continue;
                }
                var otherID = ReactMount.getID(otherNode);
                !otherID ? "development" !== 'production' ? invariant(false, 'ReactDOMInput: Mixing React and non-React radio inputs with the ' + 'same `name` is not supported.') : invariant(false) : undefined;
                var otherInstance = instancesByReactID[otherID];
                !otherInstance ? "development" !== 'production' ? invariant(false, 'ReactDOMInput: Unknown radio button ID %s.', otherID) : invariant(false) : undefined;
                ReactUpdates.asap(forceUpdateIfMounted, otherInstance);
              }
            }
            return returnValue;
          }
          module.exports = ReactDOMInput;
        }, {
          "144": 144,
          "22": 22,
          "23": 23,
          "40": 40,
          "65": 65,
          "83": 83
        }],
        42: [function(_dereq_, module, exports) {
          'use strict';
          var ReactChildren = _dereq_(28);
          var ReactDOMSelect = _dereq_(43);
          var assign = _dereq_(23);
          var warning = _dereq_(155);
          var valueContextKey = ReactDOMSelect.valueContextKey;
          var ReactDOMOption = {
            mountWrapper: function(inst, props, context) {
              if ("development" !== 'production') {
                "development" !== 'production' ? warning(props.selected == null, 'Use the `defaultValue` or `value` props on <select> instead of ' + 'setting `selected` on <option>.') : undefined;
              }
              var selectValue = context[valueContextKey];
              var selected = null;
              if (selectValue != null) {
                selected = false;
                if (Array.isArray(selectValue)) {
                  for (var i = 0; i < selectValue.length; i++) {
                    if ('' + selectValue[i] === '' + props.value) {
                      selected = true;
                      break;
                    }
                  }
                } else {
                  selected = '' + selectValue === '' + props.value;
                }
              }
              inst._wrapperState = {selected: selected};
            },
            getNativeProps: function(inst, props, context) {
              var nativeProps = assign({
                selected: undefined,
                children: undefined
              }, props);
              if (inst._wrapperState.selected != null) {
                nativeProps.selected = inst._wrapperState.selected;
              }
              var content = '';
              ReactChildren.forEach(props.children, function(child) {
                if (child == null) {
                  return;
                }
                if (typeof child === 'string' || typeof child === 'number') {
                  content += child;
                } else {
                  "development" !== 'production' ? warning(false, 'Only strings and numbers are supported as <option> children.') : undefined;
                }
              });
              nativeProps.children = content;
              return nativeProps;
            }
          };
          module.exports = ReactDOMOption;
        }, {
          "155": 155,
          "23": 23,
          "28": 28,
          "43": 43
        }],
        43: [function(_dereq_, module, exports) {
          'use strict';
          var LinkedValueUtils = _dereq_(22);
          var ReactMount = _dereq_(65);
          var ReactUpdates = _dereq_(83);
          var assign = _dereq_(23);
          var warning = _dereq_(155);
          var valueContextKey = '__ReactDOMSelect_value$' + Math.random().toString(36).slice(2);
          function updateOptionsIfPendingUpdateAndMounted() {
            if (this._rootNodeID && this._wrapperState.pendingUpdate) {
              this._wrapperState.pendingUpdate = false;
              var props = this._currentElement.props;
              var value = LinkedValueUtils.getValue(props);
              if (value != null) {
                updateOptions(this, props, value);
              }
            }
          }
          function getDeclarationErrorAddendum(owner) {
            if (owner) {
              var name = owner.getName();
              if (name) {
                return ' Check the render method of `' + name + '`.';
              }
            }
            return '';
          }
          var valuePropNames = ['value', 'defaultValue'];
          function checkSelectPropTypes(inst, props) {
            var owner = inst._currentElement._owner;
            LinkedValueUtils.checkPropTypes('select', props, owner);
            for (var i = 0; i < valuePropNames.length; i++) {
              var propName = valuePropNames[i];
              if (props[propName] == null) {
                continue;
              }
              if (props.multiple) {
                "development" !== 'production' ? warning(Array.isArray(props[propName]), 'The `%s` prop supplied to <select> must be an array if ' + '`multiple` is true.%s', propName, getDeclarationErrorAddendum(owner)) : undefined;
              } else {
                "development" !== 'production' ? warning(!Array.isArray(props[propName]), 'The `%s` prop supplied to <select> must be a scalar ' + 'value if `multiple` is false.%s', propName, getDeclarationErrorAddendum(owner)) : undefined;
              }
            }
          }
          function updateOptions(inst, multiple, propValue) {
            var selectedValue,
                i;
            var options = ReactMount.getNode(inst._rootNodeID).options;
            if (multiple) {
              selectedValue = {};
              for (i = 0; i < propValue.length; i++) {
                selectedValue['' + propValue[i]] = true;
              }
              for (i = 0; i < options.length; i++) {
                var selected = selectedValue.hasOwnProperty(options[i].value);
                if (options[i].selected !== selected) {
                  options[i].selected = selected;
                }
              }
            } else {
              selectedValue = '' + propValue;
              for (i = 0; i < options.length; i++) {
                if (options[i].value === selectedValue) {
                  options[i].selected = true;
                  return;
                }
              }
              if (options.length) {
                options[0].selected = true;
              }
            }
          }
          var ReactDOMSelect = {
            valueContextKey: valueContextKey,
            getNativeProps: function(inst, props, context) {
              return assign({}, props, {
                onChange: inst._wrapperState.onChange,
                value: undefined
              });
            },
            mountWrapper: function(inst, props) {
              if ("development" !== 'production') {
                checkSelectPropTypes(inst, props);
              }
              var value = LinkedValueUtils.getValue(props);
              inst._wrapperState = {
                pendingUpdate: false,
                initialValue: value != null ? value : props.defaultValue,
                onChange: _handleChange.bind(inst),
                wasMultiple: Boolean(props.multiple)
              };
            },
            processChildContext: function(inst, props, context) {
              var childContext = assign({}, context);
              childContext[valueContextKey] = inst._wrapperState.initialValue;
              return childContext;
            },
            postUpdateWrapper: function(inst) {
              var props = inst._currentElement.props;
              inst._wrapperState.initialValue = undefined;
              var wasMultiple = inst._wrapperState.wasMultiple;
              inst._wrapperState.wasMultiple = Boolean(props.multiple);
              var value = LinkedValueUtils.getValue(props);
              if (value != null) {
                inst._wrapperState.pendingUpdate = false;
                updateOptions(inst, Boolean(props.multiple), value);
              } else if (wasMultiple !== Boolean(props.multiple)) {
                if (props.defaultValue != null) {
                  updateOptions(inst, Boolean(props.multiple), props.defaultValue);
                } else {
                  updateOptions(inst, Boolean(props.multiple), props.multiple ? [] : '');
                }
              }
            }
          };
          function _handleChange(event) {
            var props = this._currentElement.props;
            var returnValue = LinkedValueUtils.executeOnChange(props, event);
            this._wrapperState.pendingUpdate = true;
            ReactUpdates.asap(updateOptionsIfPendingUpdateAndMounted, this);
            return returnValue;
          }
          module.exports = ReactDOMSelect;
        }, {
          "155": 155,
          "22": 22,
          "23": 23,
          "65": 65,
          "83": 83
        }],
        44: [function(_dereq_, module, exports) {
          'use strict';
          var ExecutionEnvironment = _dereq_(130);
          var getNodeForCharacterOffset = _dereq_(116);
          var getTextContentAccessor = _dereq_(117);
          function isCollapsed(anchorNode, anchorOffset, focusNode, focusOffset) {
            return anchorNode === focusNode && anchorOffset === focusOffset;
          }
          function getIEOffsets(node) {
            var selection = document.selection;
            var selectedRange = selection.createRange();
            var selectedLength = selectedRange.text.length;
            var fromStart = selectedRange.duplicate();
            fromStart.moveToElementText(node);
            fromStart.setEndPoint('EndToStart', selectedRange);
            var startOffset = fromStart.text.length;
            var endOffset = startOffset + selectedLength;
            return {
              start: startOffset,
              end: endOffset
            };
          }
          function getModernOffsets(node) {
            var selection = window.getSelection && window.getSelection();
            if (!selection || selection.rangeCount === 0) {
              return null;
            }
            var anchorNode = selection.anchorNode;
            var anchorOffset = selection.anchorOffset;
            var focusNode = selection.focusNode;
            var focusOffset = selection.focusOffset;
            var currentRange = selection.getRangeAt(0);
            try {
              currentRange.startContainer.nodeType;
              currentRange.endContainer.nodeType;
            } catch (e) {
              return null;
            }
            var isSelectionCollapsed = isCollapsed(selection.anchorNode, selection.anchorOffset, selection.focusNode, selection.focusOffset);
            var rangeLength = isSelectionCollapsed ? 0 : currentRange.toString().length;
            var tempRange = currentRange.cloneRange();
            tempRange.selectNodeContents(node);
            tempRange.setEnd(currentRange.startContainer, currentRange.startOffset);
            var isTempRangeCollapsed = isCollapsed(tempRange.startContainer, tempRange.startOffset, tempRange.endContainer, tempRange.endOffset);
            var start = isTempRangeCollapsed ? 0 : tempRange.toString().length;
            var end = start + rangeLength;
            var detectionRange = document.createRange();
            detectionRange.setStart(anchorNode, anchorOffset);
            detectionRange.setEnd(focusNode, focusOffset);
            var isBackward = detectionRange.collapsed;
            return {
              start: isBackward ? end : start,
              end: isBackward ? start : end
            };
          }
          function setIEOffsets(node, offsets) {
            var range = document.selection.createRange().duplicate();
            var start,
                end;
            if (typeof offsets.end === 'undefined') {
              start = offsets.start;
              end = start;
            } else if (offsets.start > offsets.end) {
              start = offsets.end;
              end = offsets.start;
            } else {
              start = offsets.start;
              end = offsets.end;
            }
            range.moveToElementText(node);
            range.moveStart('character', start);
            range.setEndPoint('EndToStart', range);
            range.moveEnd('character', end - start);
            range.select();
          }
          function setModernOffsets(node, offsets) {
            if (!window.getSelection) {
              return;
            }
            var selection = window.getSelection();
            var length = node[getTextContentAccessor()].length;
            var start = Math.min(offsets.start, length);
            var end = typeof offsets.end === 'undefined' ? start : Math.min(offsets.end, length);
            if (!selection.extend && start > end) {
              var temp = end;
              end = start;
              start = temp;
            }
            var startMarker = getNodeForCharacterOffset(node, start);
            var endMarker = getNodeForCharacterOffset(node, end);
            if (startMarker && endMarker) {
              var range = document.createRange();
              range.setStart(startMarker.node, startMarker.offset);
              selection.removeAllRanges();
              if (start > end) {
                selection.addRange(range);
                selection.extend(endMarker.node, endMarker.offset);
              } else {
                range.setEnd(endMarker.node, endMarker.offset);
                selection.addRange(range);
              }
            }
          }
          var useIEOffsets = ExecutionEnvironment.canUseDOM && 'selection' in document && !('getSelection' in window);
          var ReactDOMSelection = {
            getOffsets: useIEOffsets ? getIEOffsets : getModernOffsets,
            setOffsets: useIEOffsets ? setIEOffsets : setModernOffsets
          };
          module.exports = ReactDOMSelection;
        }, {
          "116": 116,
          "117": 117,
          "130": 130
        }],
        45: [function(_dereq_, module, exports) {
          'use strict';
          var ReactDefaultInjection = _dereq_(49);
          var ReactServerRendering = _dereq_(80);
          var ReactVersion = _dereq_(84);
          ReactDefaultInjection.inject();
          var ReactDOMServer = {
            renderToString: ReactServerRendering.renderToString,
            renderToStaticMarkup: ReactServerRendering.renderToStaticMarkup,
            version: ReactVersion
          };
          module.exports = ReactDOMServer;
        }, {
          "49": 49,
          "80": 80,
          "84": 84
        }],
        46: [function(_dereq_, module, exports) {
          'use strict';
          var DOMChildrenOperations = _dereq_(9);
          var DOMPropertyOperations = _dereq_(11);
          var ReactComponentBrowserEnvironment = _dereq_(31);
          var ReactMount = _dereq_(65);
          var assign = _dereq_(23);
          var escapeTextContentForBrowser = _dereq_(107);
          var setTextContent = _dereq_(125);
          var validateDOMNesting = _dereq_(128);
          var ReactDOMTextComponent = function(props) {};
          assign(ReactDOMTextComponent.prototype, {
            construct: function(text) {
              this._currentElement = text;
              this._stringText = '' + text;
              this._rootNodeID = null;
              this._mountIndex = 0;
            },
            mountComponent: function(rootID, transaction, context) {
              if ("development" !== 'production') {
                if (context[validateDOMNesting.ancestorInfoContextKey]) {
                  validateDOMNesting('span', null, context[validateDOMNesting.ancestorInfoContextKey]);
                }
              }
              this._rootNodeID = rootID;
              if (transaction.useCreateElement) {
                var ownerDocument = context[ReactMount.ownerDocumentContextKey];
                var el = ownerDocument.createElement('span');
                DOMPropertyOperations.setAttributeForID(el, rootID);
                ReactMount.getID(el);
                setTextContent(el, this._stringText);
                return el;
              } else {
                var escapedText = escapeTextContentForBrowser(this._stringText);
                if (transaction.renderToStaticMarkup) {
                  return escapedText;
                }
                return '<span ' + DOMPropertyOperations.createMarkupForID(rootID) + '>' + escapedText + '</span>';
              }
            },
            receiveComponent: function(nextText, transaction) {
              if (nextText !== this._currentElement) {
                this._currentElement = nextText;
                var nextStringText = '' + nextText;
                if (nextStringText !== this._stringText) {
                  this._stringText = nextStringText;
                  var node = ReactMount.getNode(this._rootNodeID);
                  DOMChildrenOperations.updateTextContent(node, nextStringText);
                }
              }
            },
            unmountComponent: function() {
              ReactComponentBrowserEnvironment.unmountIDFromEnvironment(this._rootNodeID);
            }
          });
          module.exports = ReactDOMTextComponent;
        }, {
          "107": 107,
          "11": 11,
          "125": 125,
          "128": 128,
          "23": 23,
          "31": 31,
          "65": 65,
          "9": 9
        }],
        47: [function(_dereq_, module, exports) {
          'use strict';
          var LinkedValueUtils = _dereq_(22);
          var ReactDOMIDOperations = _dereq_(40);
          var ReactUpdates = _dereq_(83);
          var assign = _dereq_(23);
          var invariant = _dereq_(144);
          var warning = _dereq_(155);
          function forceUpdateIfMounted() {
            if (this._rootNodeID) {
              ReactDOMTextarea.updateWrapper(this);
            }
          }
          var ReactDOMTextarea = {
            getNativeProps: function(inst, props, context) {
              !(props.dangerouslySetInnerHTML == null) ? "development" !== 'production' ? invariant(false, '`dangerouslySetInnerHTML` does not make sense on <textarea>.') : invariant(false) : undefined;
              var nativeProps = assign({}, props, {
                defaultValue: undefined,
                value: undefined,
                children: inst._wrapperState.initialValue,
                onChange: inst._wrapperState.onChange
              });
              return nativeProps;
            },
            mountWrapper: function(inst, props) {
              if ("development" !== 'production') {
                LinkedValueUtils.checkPropTypes('textarea', props, inst._currentElement._owner);
              }
              var defaultValue = props.defaultValue;
              var children = props.children;
              if (children != null) {
                if ("development" !== 'production') {
                  "development" !== 'production' ? warning(false, 'Use the `defaultValue` or `value` props instead of setting ' + 'children on <textarea>.') : undefined;
                }
                !(defaultValue == null) ? "development" !== 'production' ? invariant(false, 'If you supply `defaultValue` on a <textarea>, do not pass children.') : invariant(false) : undefined;
                if (Array.isArray(children)) {
                  !(children.length <= 1) ? "development" !== 'production' ? invariant(false, '<textarea> can only have at most one child.') : invariant(false) : undefined;
                  children = children[0];
                }
                defaultValue = '' + children;
              }
              if (defaultValue == null) {
                defaultValue = '';
              }
              var value = LinkedValueUtils.getValue(props);
              inst._wrapperState = {
                initialValue: '' + (value != null ? value : defaultValue),
                onChange: _handleChange.bind(inst)
              };
            },
            updateWrapper: function(inst) {
              var props = inst._currentElement.props;
              var value = LinkedValueUtils.getValue(props);
              if (value != null) {
                ReactDOMIDOperations.updatePropertyByID(inst._rootNodeID, 'value', '' + value);
              }
            }
          };
          function _handleChange(event) {
            var props = this._currentElement.props;
            var returnValue = LinkedValueUtils.executeOnChange(props, event);
            ReactUpdates.asap(forceUpdateIfMounted, this);
            return returnValue;
          }
          module.exports = ReactDOMTextarea;
        }, {
          "144": 144,
          "155": 155,
          "22": 22,
          "23": 23,
          "40": 40,
          "83": 83
        }],
        48: [function(_dereq_, module, exports) {
          'use strict';
          var ReactUpdates = _dereq_(83);
          var Transaction = _dereq_(100);
          var assign = _dereq_(23);
          var emptyFunction = _dereq_(136);
          var RESET_BATCHED_UPDATES = {
            initialize: emptyFunction,
            close: function() {
              ReactDefaultBatchingStrategy.isBatchingUpdates = false;
            }
          };
          var FLUSH_BATCHED_UPDATES = {
            initialize: emptyFunction,
            close: ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)
          };
          var TRANSACTION_WRAPPERS = [FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES];
          function ReactDefaultBatchingStrategyTransaction() {
            this.reinitializeTransaction();
          }
          assign(ReactDefaultBatchingStrategyTransaction.prototype, Transaction.Mixin, {getTransactionWrappers: function() {
              return TRANSACTION_WRAPPERS;
            }});
          var transaction = new ReactDefaultBatchingStrategyTransaction();
          var ReactDefaultBatchingStrategy = {
            isBatchingUpdates: false,
            batchedUpdates: function(callback, a, b, c, d, e) {
              var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;
              ReactDefaultBatchingStrategy.isBatchingUpdates = true;
              if (alreadyBatchingUpdates) {
                callback(a, b, c, d, e);
              } else {
                transaction.perform(callback, null, a, b, c, d, e);
              }
            }
          };
          module.exports = ReactDefaultBatchingStrategy;
        }, {
          "100": 100,
          "136": 136,
          "23": 23,
          "83": 83
        }],
        49: [function(_dereq_, module, exports) {
          'use strict';
          var BeforeInputEventPlugin = _dereq_(3);
          var ChangeEventPlugin = _dereq_(7);
          var ClientReactRootIndex = _dereq_(8);
          var DefaultEventPluginOrder = _dereq_(13);
          var EnterLeaveEventPlugin = _dereq_(14);
          var ExecutionEnvironment = _dereq_(130);
          var HTMLDOMPropertyConfig = _dereq_(21);
          var ReactBrowserComponentMixin = _dereq_(25);
          var ReactComponentBrowserEnvironment = _dereq_(31);
          var ReactDefaultBatchingStrategy = _dereq_(48);
          var ReactDOMComponent = _dereq_(37);
          var ReactDOMTextComponent = _dereq_(46);
          var ReactEventListener = _dereq_(58);
          var ReactInjection = _dereq_(59);
          var ReactInstanceHandles = _dereq_(61);
          var ReactMount = _dereq_(65);
          var ReactReconcileTransaction = _dereq_(75);
          var SelectEventPlugin = _dereq_(86);
          var ServerReactRootIndex = _dereq_(87);
          var SimpleEventPlugin = _dereq_(88);
          var SVGDOMPropertyConfig = _dereq_(85);
          var alreadyInjected = false;
          function inject() {
            if (alreadyInjected) {
              return;
            }
            alreadyInjected = true;
            ReactInjection.EventEmitter.injectReactEventListener(ReactEventListener);
            ReactInjection.EventPluginHub.injectEventPluginOrder(DefaultEventPluginOrder);
            ReactInjection.EventPluginHub.injectInstanceHandle(ReactInstanceHandles);
            ReactInjection.EventPluginHub.injectMount(ReactMount);
            ReactInjection.EventPluginHub.injectEventPluginsByName({
              SimpleEventPlugin: SimpleEventPlugin,
              EnterLeaveEventPlugin: EnterLeaveEventPlugin,
              ChangeEventPlugin: ChangeEventPlugin,
              SelectEventPlugin: SelectEventPlugin,
              BeforeInputEventPlugin: BeforeInputEventPlugin
            });
            ReactInjection.NativeComponent.injectGenericComponentClass(ReactDOMComponent);
            ReactInjection.NativeComponent.injectTextComponentClass(ReactDOMTextComponent);
            ReactInjection.Class.injectMixin(ReactBrowserComponentMixin);
            ReactInjection.DOMProperty.injectDOMPropertyConfig(HTMLDOMPropertyConfig);
            ReactInjection.DOMProperty.injectDOMPropertyConfig(SVGDOMPropertyConfig);
            ReactInjection.EmptyComponent.injectEmptyComponent('noscript');
            ReactInjection.Updates.injectReconcileTransaction(ReactReconcileTransaction);
            ReactInjection.Updates.injectBatchingStrategy(ReactDefaultBatchingStrategy);
            ReactInjection.RootIndex.injectCreateReactRootIndex(ExecutionEnvironment.canUseDOM ? ClientReactRootIndex.createReactRootIndex : ServerReactRootIndex.createReactRootIndex);
            ReactInjection.Component.injectEnvironment(ReactComponentBrowserEnvironment);
            if ("development" !== 'production') {
              var url = ExecutionEnvironment.canUseDOM && window.location.href || '';
              if (/[?&]react_perf\b/.test(url)) {
                var ReactDefaultPerf = _dereq_(50);
                ReactDefaultPerf.start();
              }
            }
          }
          module.exports = {inject: inject};
        }, {
          "13": 13,
          "130": 130,
          "14": 14,
          "21": 21,
          "25": 25,
          "3": 3,
          "31": 31,
          "37": 37,
          "46": 46,
          "48": 48,
          "50": 50,
          "58": 58,
          "59": 59,
          "61": 61,
          "65": 65,
          "7": 7,
          "75": 75,
          "8": 8,
          "85": 85,
          "86": 86,
          "87": 87,
          "88": 88
        }],
        50: [function(_dereq_, module, exports) {
          'use strict';
          var DOMProperty = _dereq_(10);
          var ReactDefaultPerfAnalysis = _dereq_(51);
          var ReactMount = _dereq_(65);
          var ReactPerf = _dereq_(71);
          var performanceNow = _dereq_(152);
          function roundFloat(val) {
            return Math.floor(val * 100) / 100;
          }
          function addValue(obj, key, val) {
            obj[key] = (obj[key] || 0) + val;
          }
          var ReactDefaultPerf = {
            _allMeasurements: [],
            _mountStack: [0],
            _injected: false,
            start: function() {
              if (!ReactDefaultPerf._injected) {
                ReactPerf.injection.injectMeasure(ReactDefaultPerf.measure);
              }
              ReactDefaultPerf._allMeasurements.length = 0;
              ReactPerf.enableMeasure = true;
            },
            stop: function() {
              ReactPerf.enableMeasure = false;
            },
            getLastMeasurements: function() {
              return ReactDefaultPerf._allMeasurements;
            },
            printExclusive: function(measurements) {
              measurements = measurements || ReactDefaultPerf._allMeasurements;
              var summary = ReactDefaultPerfAnalysis.getExclusiveSummary(measurements);
              console.table(summary.map(function(item) {
                return {
                  'Component class name': item.componentName,
                  'Total inclusive time (ms)': roundFloat(item.inclusive),
                  'Exclusive mount time (ms)': roundFloat(item.exclusive),
                  'Exclusive render time (ms)': roundFloat(item.render),
                  'Mount time per instance (ms)': roundFloat(item.exclusive / item.count),
                  'Render time per instance (ms)': roundFloat(item.render / item.count),
                  'Instances': item.count
                };
              }));
            },
            printInclusive: function(measurements) {
              measurements = measurements || ReactDefaultPerf._allMeasurements;
              var summary = ReactDefaultPerfAnalysis.getInclusiveSummary(measurements);
              console.table(summary.map(function(item) {
                return {
                  'Owner > component': item.componentName,
                  'Inclusive time (ms)': roundFloat(item.time),
                  'Instances': item.count
                };
              }));
              console.log('Total time:', ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2) + ' ms');
            },
            getMeasurementsSummaryMap: function(measurements) {
              var summary = ReactDefaultPerfAnalysis.getInclusiveSummary(measurements, true);
              return summary.map(function(item) {
                return {
                  'Owner > component': item.componentName,
                  'Wasted time (ms)': item.time,
                  'Instances': item.count
                };
              });
            },
            printWasted: function(measurements) {
              measurements = measurements || ReactDefaultPerf._allMeasurements;
              console.table(ReactDefaultPerf.getMeasurementsSummaryMap(measurements));
              console.log('Total time:', ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2) + ' ms');
            },
            printDOM: function(measurements) {
              measurements = measurements || ReactDefaultPerf._allMeasurements;
              var summary = ReactDefaultPerfAnalysis.getDOMSummary(measurements);
              console.table(summary.map(function(item) {
                var result = {};
                result[DOMProperty.ID_ATTRIBUTE_NAME] = item.id;
                result.type = item.type;
                result.args = JSON.stringify(item.args);
                return result;
              }));
              console.log('Total time:', ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2) + ' ms');
            },
            _recordWrite: function(id, fnName, totalTime, args) {
              var writes = ReactDefaultPerf._allMeasurements[ReactDefaultPerf._allMeasurements.length - 1].writes;
              writes[id] = writes[id] || [];
              writes[id].push({
                type: fnName,
                time: totalTime,
                args: args
              });
            },
            measure: function(moduleName, fnName, func) {
              return function() {
                for (var _len = arguments.length,
                    args = Array(_len),
                    _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }
                var totalTime;
                var rv;
                var start;
                if (fnName === '_renderNewRootComponent' || fnName === 'flushBatchedUpdates') {
                  ReactDefaultPerf._allMeasurements.push({
                    exclusive: {},
                    inclusive: {},
                    render: {},
                    counts: {},
                    writes: {},
                    displayNames: {},
                    totalTime: 0,
                    created: {}
                  });
                  start = performanceNow();
                  rv = func.apply(this, args);
                  ReactDefaultPerf._allMeasurements[ReactDefaultPerf._allMeasurements.length - 1].totalTime = performanceNow() - start;
                  return rv;
                } else if (fnName === '_mountImageIntoNode' || moduleName === 'ReactBrowserEventEmitter' || moduleName === 'ReactDOMIDOperations' || moduleName === 'CSSPropertyOperations' || moduleName === 'DOMChildrenOperations' || moduleName === 'DOMPropertyOperations') {
                  start = performanceNow();
                  rv = func.apply(this, args);
                  totalTime = performanceNow() - start;
                  if (fnName === '_mountImageIntoNode') {
                    var mountID = ReactMount.getID(args[1]);
                    ReactDefaultPerf._recordWrite(mountID, fnName, totalTime, args[0]);
                  } else if (fnName === 'dangerouslyProcessChildrenUpdates') {
                    args[0].forEach(function(update) {
                      var writeArgs = {};
                      if (update.fromIndex !== null) {
                        writeArgs.fromIndex = update.fromIndex;
                      }
                      if (update.toIndex !== null) {
                        writeArgs.toIndex = update.toIndex;
                      }
                      if (update.textContent !== null) {
                        writeArgs.textContent = update.textContent;
                      }
                      if (update.markupIndex !== null) {
                        writeArgs.markup = args[1][update.markupIndex];
                      }
                      ReactDefaultPerf._recordWrite(update.parentID, update.type, totalTime, writeArgs);
                    });
                  } else {
                    var id = args[0];
                    if (typeof id === 'object') {
                      id = ReactMount.getID(args[0]);
                    }
                    ReactDefaultPerf._recordWrite(id, fnName, totalTime, Array.prototype.slice.call(args, 1));
                  }
                  return rv;
                } else if (moduleName === 'ReactCompositeComponent' && (fnName === 'mountComponent' || fnName === 'updateComponent' || fnName === '_renderValidatedComponent')) {
                  if (this._currentElement.type === ReactMount.TopLevelWrapper) {
                    return func.apply(this, args);
                  }
                  var rootNodeID = fnName === 'mountComponent' ? args[0] : this._rootNodeID;
                  var isRender = fnName === '_renderValidatedComponent';
                  var isMount = fnName === 'mountComponent';
                  var mountStack = ReactDefaultPerf._mountStack;
                  var entry = ReactDefaultPerf._allMeasurements[ReactDefaultPerf._allMeasurements.length - 1];
                  if (isRender) {
                    addValue(entry.counts, rootNodeID, 1);
                  } else if (isMount) {
                    entry.created[rootNodeID] = true;
                    mountStack.push(0);
                  }
                  start = performanceNow();
                  rv = func.apply(this, args);
                  totalTime = performanceNow() - start;
                  if (isRender) {
                    addValue(entry.render, rootNodeID, totalTime);
                  } else if (isMount) {
                    var subMountTime = mountStack.pop();
                    mountStack[mountStack.length - 1] += totalTime;
                    addValue(entry.exclusive, rootNodeID, totalTime - subMountTime);
                    addValue(entry.inclusive, rootNodeID, totalTime);
                  } else {
                    addValue(entry.inclusive, rootNodeID, totalTime);
                  }
                  entry.displayNames[rootNodeID] = {
                    current: this.getName(),
                    owner: this._currentElement._owner ? this._currentElement._owner.getName() : '<root>'
                  };
                  return rv;
                } else {
                  return func.apply(this, args);
                }
              };
            }
          };
          module.exports = ReactDefaultPerf;
        }, {
          "10": 10,
          "152": 152,
          "51": 51,
          "65": 65,
          "71": 71
        }],
        51: [function(_dereq_, module, exports) {
          'use strict';
          var assign = _dereq_(23);
          var DONT_CARE_THRESHOLD = 1.2;
          var DOM_OPERATION_TYPES = {
            '_mountImageIntoNode': 'set innerHTML',
            INSERT_MARKUP: 'set innerHTML',
            MOVE_EXISTING: 'move',
            REMOVE_NODE: 'remove',
            SET_MARKUP: 'set innerHTML',
            TEXT_CONTENT: 'set textContent',
            'setValueForProperty': 'update attribute',
            'setValueForAttribute': 'update attribute',
            'deleteValueForProperty': 'remove attribute',
            'dangerouslyReplaceNodeWithMarkupByID': 'replace'
          };
          function getTotalTime(measurements) {
            var totalTime = 0;
            for (var i = 0; i < measurements.length; i++) {
              var measurement = measurements[i];
              totalTime += measurement.totalTime;
            }
            return totalTime;
          }
          function getDOMSummary(measurements) {
            var items = [];
            measurements.forEach(function(measurement) {
              Object.keys(measurement.writes).forEach(function(id) {
                measurement.writes[id].forEach(function(write) {
                  items.push({
                    id: id,
                    type: DOM_OPERATION_TYPES[write.type] || write.type,
                    args: write.args
                  });
                });
              });
            });
            return items;
          }
          function getExclusiveSummary(measurements) {
            var candidates = {};
            var displayName;
            for (var i = 0; i < measurements.length; i++) {
              var measurement = measurements[i];
              var allIDs = assign({}, measurement.exclusive, measurement.inclusive);
              for (var id in allIDs) {
                displayName = measurement.displayNames[id].current;
                candidates[displayName] = candidates[displayName] || {
                  componentName: displayName,
                  inclusive: 0,
                  exclusive: 0,
                  render: 0,
                  count: 0
                };
                if (measurement.render[id]) {
                  candidates[displayName].render += measurement.render[id];
                }
                if (measurement.exclusive[id]) {
                  candidates[displayName].exclusive += measurement.exclusive[id];
                }
                if (measurement.inclusive[id]) {
                  candidates[displayName].inclusive += measurement.inclusive[id];
                }
                if (measurement.counts[id]) {
                  candidates[displayName].count += measurement.counts[id];
                }
              }
            }
            var arr = [];
            for (displayName in candidates) {
              if (candidates[displayName].exclusive >= DONT_CARE_THRESHOLD) {
                arr.push(candidates[displayName]);
              }
            }
            arr.sort(function(a, b) {
              return b.exclusive - a.exclusive;
            });
            return arr;
          }
          function getInclusiveSummary(measurements, onlyClean) {
            var candidates = {};
            var inclusiveKey;
            for (var i = 0; i < measurements.length; i++) {
              var measurement = measurements[i];
              var allIDs = assign({}, measurement.exclusive, measurement.inclusive);
              var cleanComponents;
              if (onlyClean) {
                cleanComponents = getUnchangedComponents(measurement);
              }
              for (var id in allIDs) {
                if (onlyClean && !cleanComponents[id]) {
                  continue;
                }
                var displayName = measurement.displayNames[id];
                inclusiveKey = displayName.owner + ' > ' + displayName.current;
                candidates[inclusiveKey] = candidates[inclusiveKey] || {
                  componentName: inclusiveKey,
                  time: 0,
                  count: 0
                };
                if (measurement.inclusive[id]) {
                  candidates[inclusiveKey].time += measurement.inclusive[id];
                }
                if (measurement.counts[id]) {
                  candidates[inclusiveKey].count += measurement.counts[id];
                }
              }
            }
            var arr = [];
            for (inclusiveKey in candidates) {
              if (candidates[inclusiveKey].time >= DONT_CARE_THRESHOLD) {
                arr.push(candidates[inclusiveKey]);
              }
            }
            arr.sort(function(a, b) {
              return b.time - a.time;
            });
            return arr;
          }
          function getUnchangedComponents(measurement) {
            var cleanComponents = {};
            var dirtyLeafIDs = Object.keys(measurement.writes);
            var allIDs = assign({}, measurement.exclusive, measurement.inclusive);
            for (var id in allIDs) {
              var isDirty = false;
              for (var i = 0; i < dirtyLeafIDs.length; i++) {
                if (dirtyLeafIDs[i].indexOf(id) === 0) {
                  isDirty = true;
                  break;
                }
              }
              if (measurement.created[id]) {
                isDirty = true;
              }
              if (!isDirty && measurement.counts[id] > 0) {
                cleanComponents[id] = true;
              }
            }
            return cleanComponents;
          }
          var ReactDefaultPerfAnalysis = {
            getExclusiveSummary: getExclusiveSummary,
            getInclusiveSummary: getInclusiveSummary,
            getDOMSummary: getDOMSummary,
            getTotalTime: getTotalTime
          };
          module.exports = ReactDefaultPerfAnalysis;
        }, {"23": 23}],
        52: [function(_dereq_, module, exports) {
          'use strict';
          var ReactCurrentOwner = _dereq_(34);
          var assign = _dereq_(23);
          var canDefineProperty = _dereq_(104);
          var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;
          var RESERVED_PROPS = {
            key: true,
            ref: true,
            __self: true,
            __source: true
          };
          var ReactElement = function(type, key, ref, self, source, owner, props) {
            var element = {
              $$typeof: REACT_ELEMENT_TYPE,
              type: type,
              key: key,
              ref: ref,
              props: props,
              _owner: owner
            };
            if ("development" !== 'production') {
              element._store = {};
              if (canDefineProperty) {
                Object.defineProperty(element._store, 'validated', {
                  configurable: false,
                  enumerable: false,
                  writable: true,
                  value: false
                });
                Object.defineProperty(element, '_self', {
                  configurable: false,
                  enumerable: false,
                  writable: false,
                  value: self
                });
                Object.defineProperty(element, '_source', {
                  configurable: false,
                  enumerable: false,
                  writable: false,
                  value: source
                });
              } else {
                element._store.validated = false;
                element._self = self;
                element._source = source;
              }
              Object.freeze(element.props);
              Object.freeze(element);
            }
            return element;
          };
          ReactElement.createElement = function(type, config, children) {
            var propName;
            var props = {};
            var key = null;
            var ref = null;
            var self = null;
            var source = null;
            if (config != null) {
              ref = config.ref === undefined ? null : config.ref;
              key = config.key === undefined ? null : '' + config.key;
              self = config.__self === undefined ? null : config.__self;
              source = config.__source === undefined ? null : config.__source;
              for (propName in config) {
                if (config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                  props[propName] = config[propName];
                }
              }
            }
            var childrenLength = arguments.length - 2;
            if (childrenLength === 1) {
              props.children = children;
            } else if (childrenLength > 1) {
              var childArray = Array(childrenLength);
              for (var i = 0; i < childrenLength; i++) {
                childArray[i] = arguments[i + 2];
              }
              props.children = childArray;
            }
            if (type && type.defaultProps) {
              var defaultProps = type.defaultProps;
              for (propName in defaultProps) {
                if (typeof props[propName] === 'undefined') {
                  props[propName] = defaultProps[propName];
                }
              }
            }
            return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
          };
          ReactElement.createFactory = function(type) {
            var factory = ReactElement.createElement.bind(null, type);
            factory.type = type;
            return factory;
          };
          ReactElement.cloneAndReplaceKey = function(oldElement, newKey) {
            var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
            return newElement;
          };
          ReactElement.cloneAndReplaceProps = function(oldElement, newProps) {
            var newElement = ReactElement(oldElement.type, oldElement.key, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, newProps);
            if ("development" !== 'production') {
              newElement._store.validated = oldElement._store.validated;
            }
            return newElement;
          };
          ReactElement.cloneElement = function(element, config, children) {
            var propName;
            var props = assign({}, element.props);
            var key = element.key;
            var ref = element.ref;
            var self = element._self;
            var source = element._source;
            var owner = element._owner;
            if (config != null) {
              if (config.ref !== undefined) {
                ref = config.ref;
                owner = ReactCurrentOwner.current;
              }
              if (config.key !== undefined) {
                key = '' + config.key;
              }
              for (propName in config) {
                if (config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                  props[propName] = config[propName];
                }
              }
            }
            var childrenLength = arguments.length - 2;
            if (childrenLength === 1) {
              props.children = children;
            } else if (childrenLength > 1) {
              var childArray = Array(childrenLength);
              for (var i = 0; i < childrenLength; i++) {
                childArray[i] = arguments[i + 2];
              }
              props.children = childArray;
            }
            return ReactElement(element.type, key, ref, self, source, owner, props);
          };
          ReactElement.isValidElement = function(object) {
            return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
          };
          module.exports = ReactElement;
        }, {
          "104": 104,
          "23": 23,
          "34": 34
        }],
        53: [function(_dereq_, module, exports) {
          'use strict';
          var ReactElement = _dereq_(52);
          var ReactPropTypeLocations = _dereq_(73);
          var ReactPropTypeLocationNames = _dereq_(72);
          var ReactCurrentOwner = _dereq_(34);
          var canDefineProperty = _dereq_(104);
          var getIteratorFn = _dereq_(115);
          var invariant = _dereq_(144);
          var warning = _dereq_(155);
          function getDeclarationErrorAddendum() {
            if (ReactCurrentOwner.current) {
              var name = ReactCurrentOwner.current.getName();
              if (name) {
                return ' Check the render method of `' + name + '`.';
              }
            }
            return '';
          }
          var ownerHasKeyUseWarning = {};
          var loggedTypeFailures = {};
          function validateExplicitKey(element, parentType) {
            if (!element._store || element._store.validated || element.key != null) {
              return;
            }
            element._store.validated = true;
            var addenda = getAddendaForKeyUse('uniqueKey', element, parentType);
            if (addenda === null) {
              return;
            }
            "development" !== 'production' ? warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s%s', addenda.parentOrOwner || '', addenda.childOwner || '', addenda.url || '') : undefined;
          }
          function getAddendaForKeyUse(messageType, element, parentType) {
            var addendum = getDeclarationErrorAddendum();
            if (!addendum) {
              var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
              if (parentName) {
                addendum = ' Check the top-level render call using <' + parentName + '>.';
              }
            }
            var memoizer = ownerHasKeyUseWarning[messageType] || (ownerHasKeyUseWarning[messageType] = {});
            if (memoizer[addendum]) {
              return null;
            }
            memoizer[addendum] = true;
            var addenda = {
              parentOrOwner: addendum,
              url: ' See https://fb.me/react-warning-keys for more information.',
              childOwner: null
            };
            if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
              addenda.childOwner = ' It was passed a child from ' + element._owner.getName() + '.';
            }
            return addenda;
          }
          function validateChildKeys(node, parentType) {
            if (typeof node !== 'object') {
              return;
            }
            if (Array.isArray(node)) {
              for (var i = 0; i < node.length; i++) {
                var child = node[i];
                if (ReactElement.isValidElement(child)) {
                  validateExplicitKey(child, parentType);
                }
              }
            } else if (ReactElement.isValidElement(node)) {
              if (node._store) {
                node._store.validated = true;
              }
            } else if (node) {
              var iteratorFn = getIteratorFn(node);
              if (iteratorFn) {
                if (iteratorFn !== node.entries) {
                  var iterator = iteratorFn.call(node);
                  var step;
                  while (!(step = iterator.next()).done) {
                    if (ReactElement.isValidElement(step.value)) {
                      validateExplicitKey(step.value, parentType);
                    }
                  }
                }
              }
            }
          }
          function checkPropTypes(componentName, propTypes, props, location) {
            for (var propName in propTypes) {
              if (propTypes.hasOwnProperty(propName)) {
                var error;
                try {
                  !(typeof propTypes[propName] === 'function') ? "development" !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], propName) : invariant(false) : undefined;
                  error = propTypes[propName](props, propName, componentName, location);
                } catch (ex) {
                  error = ex;
                }
                "development" !== 'production' ? warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', ReactPropTypeLocationNames[location], propName, typeof error) : undefined;
                if (error instanceof Error && !(error.message in loggedTypeFailures)) {
                  loggedTypeFailures[error.message] = true;
                  var addendum = getDeclarationErrorAddendum();
                  "development" !== 'production' ? warning(false, 'Failed propType: %s%s', error.message, addendum) : undefined;
                }
              }
            }
          }
          function validatePropTypes(element) {
            var componentClass = element.type;
            if (typeof componentClass !== 'function') {
              return;
            }
            var name = componentClass.displayName || componentClass.name;
            if (componentClass.propTypes) {
              checkPropTypes(name, componentClass.propTypes, element.props, ReactPropTypeLocations.prop);
            }
            if (typeof componentClass.getDefaultProps === 'function') {
              "development" !== 'production' ? warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : undefined;
            }
          }
          var ReactElementValidator = {
            createElement: function(type, props, children) {
              var validType = typeof type === 'string' || typeof type === 'function';
              "development" !== 'production' ? warning(validType, 'React.createElement: type should not be null, undefined, boolean, or ' + 'number. It should be a string (for DOM elements) or a ReactClass ' + '(for composite components).%s', getDeclarationErrorAddendum()) : undefined;
              var element = ReactElement.createElement.apply(this, arguments);
              if (element == null) {
                return element;
              }
              if (validType) {
                for (var i = 2; i < arguments.length; i++) {
                  validateChildKeys(arguments[i], type);
                }
              }
              validatePropTypes(element);
              return element;
            },
            createFactory: function(type) {
              var validatedFactory = ReactElementValidator.createElement.bind(null, type);
              validatedFactory.type = type;
              if ("development" !== 'production') {
                if (canDefineProperty) {
                  Object.defineProperty(validatedFactory, 'type', {
                    enumerable: false,
                    get: function() {
                      "development" !== 'production' ? warning(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.') : undefined;
                      Object.defineProperty(this, 'type', {value: type});
                      return type;
                    }
                  });
                }
              }
              return validatedFactory;
            },
            cloneElement: function(element, props, children) {
              var newElement = ReactElement.cloneElement.apply(this, arguments);
              for (var i = 2; i < arguments.length; i++) {
                validateChildKeys(arguments[i], newElement.type);
              }
              validatePropTypes(newElement);
              return newElement;
            }
          };
          module.exports = ReactElementValidator;
        }, {
          "104": 104,
          "115": 115,
          "144": 144,
          "155": 155,
          "34": 34,
          "52": 52,
          "72": 72,
          "73": 73
        }],
        54: [function(_dereq_, module, exports) {
          'use strict';
          var ReactElement = _dereq_(52);
          var ReactEmptyComponentRegistry = _dereq_(55);
          var ReactReconciler = _dereq_(76);
          var assign = _dereq_(23);
          var placeholderElement;
          var ReactEmptyComponentInjection = {injectEmptyComponent: function(component) {
              placeholderElement = ReactElement.createElement(component);
            }};
          var ReactEmptyComponent = function(instantiate) {
            this._currentElement = null;
            this._rootNodeID = null;
            this._renderedComponent = instantiate(placeholderElement);
          };
          assign(ReactEmptyComponent.prototype, {
            construct: function(element) {},
            mountComponent: function(rootID, transaction, context) {
              ReactEmptyComponentRegistry.registerNullComponentID(rootID);
              this._rootNodeID = rootID;
              return ReactReconciler.mountComponent(this._renderedComponent, rootID, transaction, context);
            },
            receiveComponent: function() {},
            unmountComponent: function(rootID, transaction, context) {
              ReactReconciler.unmountComponent(this._renderedComponent);
              ReactEmptyComponentRegistry.deregisterNullComponentID(this._rootNodeID);
              this._rootNodeID = null;
              this._renderedComponent = null;
            }
          });
          ReactEmptyComponent.injection = ReactEmptyComponentInjection;
          module.exports = ReactEmptyComponent;
        }, {
          "23": 23,
          "52": 52,
          "55": 55,
          "76": 76
        }],
        55: [function(_dereq_, module, exports) {
          'use strict';
          var nullComponentIDsRegistry = {};
          function isNullComponentID(id) {
            return !!nullComponentIDsRegistry[id];
          }
          function registerNullComponentID(id) {
            nullComponentIDsRegistry[id] = true;
          }
          function deregisterNullComponentID(id) {
            delete nullComponentIDsRegistry[id];
          }
          var ReactEmptyComponentRegistry = {
            isNullComponentID: isNullComponentID,
            registerNullComponentID: registerNullComponentID,
            deregisterNullComponentID: deregisterNullComponentID
          };
          module.exports = ReactEmptyComponentRegistry;
        }, {}],
        56: [function(_dereq_, module, exports) {
          'use strict';
          var caughtError = null;
          function invokeGuardedCallback(name, func, a, b) {
            try {
              return func(a, b);
            } catch (x) {
              if (caughtError === null) {
                caughtError = x;
              }
              return undefined;
            }
          }
          var ReactErrorUtils = {
            invokeGuardedCallback: invokeGuardedCallback,
            invokeGuardedCallbackWithCatch: invokeGuardedCallback,
            rethrowCaughtError: function() {
              if (caughtError) {
                var error = caughtError;
                caughtError = null;
                throw error;
              }
            }
          };
          if ("development" !== 'production') {
            if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' && typeof document !== 'undefined' && typeof document.createEvent === 'function') {
              var fakeNode = document.createElement('react');
              ReactErrorUtils.invokeGuardedCallback = function(name, func, a, b) {
                var boundFunc = func.bind(null, a, b);
                var evtType = 'react-' + name;
                fakeNode.addEventListener(evtType, boundFunc, false);
                var evt = document.createEvent('Event');
                evt.initEvent(evtType, false, false);
                fakeNode.dispatchEvent(evt);
                fakeNode.removeEventListener(evtType, boundFunc, false);
              };
            }
          }
          module.exports = ReactErrorUtils;
        }, {}],
        57: [function(_dereq_, module, exports) {
          'use strict';
          var EventPluginHub = _dereq_(16);
          function runEventQueueInBatch(events) {
            EventPluginHub.enqueueEvents(events);
            EventPluginHub.processEventQueue(false);
          }
          var ReactEventEmitterMixin = {handleTopLevel: function(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
              var events = EventPluginHub.extractEvents(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget);
              runEventQueueInBatch(events);
            }};
          module.exports = ReactEventEmitterMixin;
        }, {"16": 16}],
        58: [function(_dereq_, module, exports) {
          'use strict';
          var EventListener = _dereq_(129);
          var ExecutionEnvironment = _dereq_(130);
          var PooledClass = _dereq_(24);
          var ReactInstanceHandles = _dereq_(61);
          var ReactMount = _dereq_(65);
          var ReactUpdates = _dereq_(83);
          var assign = _dereq_(23);
          var getEventTarget = _dereq_(114);
          var getUnboundedScrollPosition = _dereq_(141);
          var DOCUMENT_FRAGMENT_NODE_TYPE = 11;
          function findParent(node) {
            var nodeID = ReactMount.getID(node);
            var rootID = ReactInstanceHandles.getReactRootIDFromNodeID(nodeID);
            var container = ReactMount.findReactContainerForID(rootID);
            var parent = ReactMount.getFirstReactDOM(container);
            return parent;
          }
          function TopLevelCallbackBookKeeping(topLevelType, nativeEvent) {
            this.topLevelType = topLevelType;
            this.nativeEvent = nativeEvent;
            this.ancestors = [];
          }
          assign(TopLevelCallbackBookKeeping.prototype, {destructor: function() {
              this.topLevelType = null;
              this.nativeEvent = null;
              this.ancestors.length = 0;
            }});
          PooledClass.addPoolingTo(TopLevelCallbackBookKeeping, PooledClass.twoArgumentPooler);
          function handleTopLevelImpl(bookKeeping) {
            void handleTopLevelWithPath;
            handleTopLevelWithoutPath(bookKeeping);
          }
          function handleTopLevelWithoutPath(bookKeeping) {
            var topLevelTarget = ReactMount.getFirstReactDOM(getEventTarget(bookKeeping.nativeEvent)) || window;
            var ancestor = topLevelTarget;
            while (ancestor) {
              bookKeeping.ancestors.push(ancestor);
              ancestor = findParent(ancestor);
            }
            for (var i = 0; i < bookKeeping.ancestors.length; i++) {
              topLevelTarget = bookKeeping.ancestors[i];
              var topLevelTargetID = ReactMount.getID(topLevelTarget) || '';
              ReactEventListener._handleTopLevel(bookKeeping.topLevelType, topLevelTarget, topLevelTargetID, bookKeeping.nativeEvent, getEventTarget(bookKeeping.nativeEvent));
            }
          }
          function handleTopLevelWithPath(bookKeeping) {
            var path = bookKeeping.nativeEvent.path;
            var currentNativeTarget = path[0];
            var eventsFired = 0;
            for (var i = 0; i < path.length; i++) {
              var currentPathElement = path[i];
              if (currentPathElement.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE) {
                currentNativeTarget = path[i + 1];
              }
              var reactParent = ReactMount.getFirstReactDOM(currentPathElement);
              if (reactParent === currentPathElement) {
                var currentPathElementID = ReactMount.getID(currentPathElement);
                var newRootID = ReactInstanceHandles.getReactRootIDFromNodeID(currentPathElementID);
                bookKeeping.ancestors.push(currentPathElement);
                var topLevelTargetID = ReactMount.getID(currentPathElement) || '';
                eventsFired++;
                ReactEventListener._handleTopLevel(bookKeeping.topLevelType, currentPathElement, topLevelTargetID, bookKeeping.nativeEvent, currentNativeTarget);
                while (currentPathElementID !== newRootID) {
                  i++;
                  currentPathElement = path[i];
                  currentPathElementID = ReactMount.getID(currentPathElement);
                }
              }
            }
            if (eventsFired === 0) {
              ReactEventListener._handleTopLevel(bookKeeping.topLevelType, window, '', bookKeeping.nativeEvent, getEventTarget(bookKeeping.nativeEvent));
            }
          }
          function scrollValueMonitor(cb) {
            var scrollPosition = getUnboundedScrollPosition(window);
            cb(scrollPosition);
          }
          var ReactEventListener = {
            _enabled: true,
            _handleTopLevel: null,
            WINDOW_HANDLE: ExecutionEnvironment.canUseDOM ? window : null,
            setHandleTopLevel: function(handleTopLevel) {
              ReactEventListener._handleTopLevel = handleTopLevel;
            },
            setEnabled: function(enabled) {
              ReactEventListener._enabled = !!enabled;
            },
            isEnabled: function() {
              return ReactEventListener._enabled;
            },
            trapBubbledEvent: function(topLevelType, handlerBaseName, handle) {
              var element = handle;
              if (!element) {
                return null;
              }
              return EventListener.listen(element, handlerBaseName, ReactEventListener.dispatchEvent.bind(null, topLevelType));
            },
            trapCapturedEvent: function(topLevelType, handlerBaseName, handle) {
              var element = handle;
              if (!element) {
                return null;
              }
              return EventListener.capture(element, handlerBaseName, ReactEventListener.dispatchEvent.bind(null, topLevelType));
            },
            monitorScrollValue: function(refresh) {
              var callback = scrollValueMonitor.bind(null, refresh);
              EventListener.listen(window, 'scroll', callback);
            },
            dispatchEvent: function(topLevelType, nativeEvent) {
              if (!ReactEventListener._enabled) {
                return;
              }
              var bookKeeping = TopLevelCallbackBookKeeping.getPooled(topLevelType, nativeEvent);
              try {
                ReactUpdates.batchedUpdates(handleTopLevelImpl, bookKeeping);
              } finally {
                TopLevelCallbackBookKeeping.release(bookKeeping);
              }
            }
          };
          module.exports = ReactEventListener;
        }, {
          "114": 114,
          "129": 129,
          "130": 130,
          "141": 141,
          "23": 23,
          "24": 24,
          "61": 61,
          "65": 65,
          "83": 83
        }],
        59: [function(_dereq_, module, exports) {
          'use strict';
          var DOMProperty = _dereq_(10);
          var EventPluginHub = _dereq_(16);
          var ReactComponentEnvironment = _dereq_(32);
          var ReactClass = _dereq_(29);
          var ReactEmptyComponent = _dereq_(54);
          var ReactBrowserEventEmitter = _dereq_(26);
          var ReactNativeComponent = _dereq_(68);
          var ReactPerf = _dereq_(71);
          var ReactRootIndex = _dereq_(78);
          var ReactUpdates = _dereq_(83);
          var ReactInjection = {
            Component: ReactComponentEnvironment.injection,
            Class: ReactClass.injection,
            DOMProperty: DOMProperty.injection,
            EmptyComponent: ReactEmptyComponent.injection,
            EventPluginHub: EventPluginHub.injection,
            EventEmitter: ReactBrowserEventEmitter.injection,
            NativeComponent: ReactNativeComponent.injection,
            Perf: ReactPerf.injection,
            RootIndex: ReactRootIndex.injection,
            Updates: ReactUpdates.injection
          };
          module.exports = ReactInjection;
        }, {
          "10": 10,
          "16": 16,
          "26": 26,
          "29": 29,
          "32": 32,
          "54": 54,
          "68": 68,
          "71": 71,
          "78": 78,
          "83": 83
        }],
        60: [function(_dereq_, module, exports) {
          'use strict';
          var ReactDOMSelection = _dereq_(44);
          var containsNode = _dereq_(133);
          var focusNode = _dereq_(138);
          var getActiveElement = _dereq_(139);
          function isInDocument(node) {
            return containsNode(document.documentElement, node);
          }
          var ReactInputSelection = {
            hasSelectionCapabilities: function(elem) {
              var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
              return nodeName && (nodeName === 'input' && elem.type === 'text' || nodeName === 'textarea' || elem.contentEditable === 'true');
            },
            getSelectionInformation: function() {
              var focusedElem = getActiveElement();
              return {
                focusedElem: focusedElem,
                selectionRange: ReactInputSelection.hasSelectionCapabilities(focusedElem) ? ReactInputSelection.getSelection(focusedElem) : null
              };
            },
            restoreSelection: function(priorSelectionInformation) {
              var curFocusedElem = getActiveElement();
              var priorFocusedElem = priorSelectionInformation.focusedElem;
              var priorSelectionRange = priorSelectionInformation.selectionRange;
              if (curFocusedElem !== priorFocusedElem && isInDocument(priorFocusedElem)) {
                if (ReactInputSelection.hasSelectionCapabilities(priorFocusedElem)) {
                  ReactInputSelection.setSelection(priorFocusedElem, priorSelectionRange);
                }
                focusNode(priorFocusedElem);
              }
            },
            getSelection: function(input) {
              var selection;
              if ('selectionStart' in input) {
                selection = {
                  start: input.selectionStart,
                  end: input.selectionEnd
                };
              } else if (document.selection && (input.nodeName && input.nodeName.toLowerCase() === 'input')) {
                var range = document.selection.createRange();
                if (range.parentElement() === input) {
                  selection = {
                    start: -range.moveStart('character', -input.value.length),
                    end: -range.moveEnd('character', -input.value.length)
                  };
                }
              } else {
                selection = ReactDOMSelection.getOffsets(input);
              }
              return selection || {
                start: 0,
                end: 0
              };
            },
            setSelection: function(input, offsets) {
              var start = offsets.start;
              var end = offsets.end;
              if (typeof end === 'undefined') {
                end = start;
              }
              if ('selectionStart' in input) {
                input.selectionStart = start;
                input.selectionEnd = Math.min(end, input.value.length);
              } else if (document.selection && (input.nodeName && input.nodeName.toLowerCase() === 'input')) {
                var range = input.createTextRange();
                range.collapse(true);
                range.moveStart('character', start);
                range.moveEnd('character', end - start);
                range.select();
              } else {
                ReactDOMSelection.setOffsets(input, offsets);
              }
            }
          };
          module.exports = ReactInputSelection;
        }, {
          "133": 133,
          "138": 138,
          "139": 139,
          "44": 44
        }],
        61: [function(_dereq_, module, exports) {
          'use strict';
          var ReactRootIndex = _dereq_(78);
          var invariant = _dereq_(144);
          var SEPARATOR = '.';
          var SEPARATOR_LENGTH = SEPARATOR.length;
          var MAX_TREE_DEPTH = 10000;
          function getReactRootIDString(index) {
            return SEPARATOR + index.toString(36);
          }
          function isBoundary(id, index) {
            return id.charAt(index) === SEPARATOR || index === id.length;
          }
          function isValidID(id) {
            return id === '' || id.charAt(0) === SEPARATOR && id.charAt(id.length - 1) !== SEPARATOR;
          }
          function isAncestorIDOf(ancestorID, descendantID) {
            return descendantID.indexOf(ancestorID) === 0 && isBoundary(descendantID, ancestorID.length);
          }
          function getParentID(id) {
            return id ? id.substr(0, id.lastIndexOf(SEPARATOR)) : '';
          }
          function getNextDescendantID(ancestorID, destinationID) {
            !(isValidID(ancestorID) && isValidID(destinationID)) ? "development" !== 'production' ? invariant(false, 'getNextDescendantID(%s, %s): Received an invalid React DOM ID.', ancestorID, destinationID) : invariant(false) : undefined;
            !isAncestorIDOf(ancestorID, destinationID) ? "development" !== 'production' ? invariant(false, 'getNextDescendantID(...): React has made an invalid assumption about ' + 'the DOM hierarchy. Expected `%s` to be an ancestor of `%s`.', ancestorID, destinationID) : invariant(false) : undefined;
            if (ancestorID === destinationID) {
              return ancestorID;
            }
            var start = ancestorID.length + SEPARATOR_LENGTH;
            var i;
            for (i = start; i < destinationID.length; i++) {
              if (isBoundary(destinationID, i)) {
                break;
              }
            }
            return destinationID.substr(0, i);
          }
          function getFirstCommonAncestorID(oneID, twoID) {
            var minLength = Math.min(oneID.length, twoID.length);
            if (minLength === 0) {
              return '';
            }
            var lastCommonMarkerIndex = 0;
            for (var i = 0; i <= minLength; i++) {
              if (isBoundary(oneID, i) && isBoundary(twoID, i)) {
                lastCommonMarkerIndex = i;
              } else if (oneID.charAt(i) !== twoID.charAt(i)) {
                break;
              }
            }
            var longestCommonID = oneID.substr(0, lastCommonMarkerIndex);
            !isValidID(longestCommonID) ? "development" !== 'production' ? invariant(false, 'getFirstCommonAncestorID(%s, %s): Expected a valid React DOM ID: %s', oneID, twoID, longestCommonID) : invariant(false) : undefined;
            return longestCommonID;
          }
          function traverseParentPath(start, stop, cb, arg, skipFirst, skipLast) {
            start = start || '';
            stop = stop || '';
            !(start !== stop) ? "development" !== 'production' ? invariant(false, 'traverseParentPath(...): Cannot traverse from and to the same ID, `%s`.', start) : invariant(false) : undefined;
            var traverseUp = isAncestorIDOf(stop, start);
            !(traverseUp || isAncestorIDOf(start, stop)) ? "development" !== 'production' ? invariant(false, 'traverseParentPath(%s, %s, ...): Cannot traverse from two IDs that do ' + 'not have a parent path.', start, stop) : invariant(false) : undefined;
            var depth = 0;
            var traverse = traverseUp ? getParentID : getNextDescendantID;
            for (var id = start; ; id = traverse(id, stop)) {
              var ret;
              if ((!skipFirst || id !== start) && (!skipLast || id !== stop)) {
                ret = cb(id, traverseUp, arg);
              }
              if (ret === false || id === stop) {
                break;
              }
              !(depth++ < MAX_TREE_DEPTH) ? "development" !== 'production' ? invariant(false, 'traverseParentPath(%s, %s, ...): Detected an infinite loop while ' + 'traversing the React DOM ID tree. This may be due to malformed IDs: %s', start, stop, id) : invariant(false) : undefined;
            }
          }
          var ReactInstanceHandles = {
            createReactRootID: function() {
              return getReactRootIDString(ReactRootIndex.createReactRootIndex());
            },
            createReactID: function(rootID, name) {
              return rootID + name;
            },
            getReactRootIDFromNodeID: function(id) {
              if (id && id.charAt(0) === SEPARATOR && id.length > 1) {
                var index = id.indexOf(SEPARATOR, 1);
                return index > -1 ? id.substr(0, index) : id;
              }
              return null;
            },
            traverseEnterLeave: function(leaveID, enterID, cb, upArg, downArg) {
              var ancestorID = getFirstCommonAncestorID(leaveID, enterID);
              if (ancestorID !== leaveID) {
                traverseParentPath(leaveID, ancestorID, cb, upArg, false, true);
              }
              if (ancestorID !== enterID) {
                traverseParentPath(ancestorID, enterID, cb, downArg, true, false);
              }
            },
            traverseTwoPhase: function(targetID, cb, arg) {
              if (targetID) {
                traverseParentPath('', targetID, cb, arg, true, false);
                traverseParentPath(targetID, '', cb, arg, false, true);
              }
            },
            traverseTwoPhaseSkipTarget: function(targetID, cb, arg) {
              if (targetID) {
                traverseParentPath('', targetID, cb, arg, true, true);
                traverseParentPath(targetID, '', cb, arg, true, true);
              }
            },
            traverseAncestors: function(targetID, cb, arg) {
              traverseParentPath('', targetID, cb, arg, true, false);
            },
            getFirstCommonAncestorID: getFirstCommonAncestorID,
            _getNextDescendantID: getNextDescendantID,
            isAncestorIDOf: isAncestorIDOf,
            SEPARATOR: SEPARATOR
          };
          module.exports = ReactInstanceHandles;
        }, {
          "144": 144,
          "78": 78
        }],
        62: [function(_dereq_, module, exports) {
          'use strict';
          var ReactInstanceMap = {
            remove: function(key) {
              key._reactInternalInstance = undefined;
            },
            get: function(key) {
              return key._reactInternalInstance;
            },
            has: function(key) {
              return key._reactInternalInstance !== undefined;
            },
            set: function(key, value) {
              key._reactInternalInstance = value;
            }
          };
          module.exports = ReactInstanceMap;
        }, {}],
        63: [function(_dereq_, module, exports) {
          'use strict';
          var ReactChildren = _dereq_(28);
          var ReactComponent = _dereq_(30);
          var ReactClass = _dereq_(29);
          var ReactDOMFactories = _dereq_(38);
          var ReactElement = _dereq_(52);
          var ReactElementValidator = _dereq_(53);
          var ReactPropTypes = _dereq_(74);
          var ReactVersion = _dereq_(84);
          var assign = _dereq_(23);
          var onlyChild = _dereq_(121);
          var createElement = ReactElement.createElement;
          var createFactory = ReactElement.createFactory;
          var cloneElement = ReactElement.cloneElement;
          if ("development" !== 'production') {
            createElement = ReactElementValidator.createElement;
            createFactory = ReactElementValidator.createFactory;
            cloneElement = ReactElementValidator.cloneElement;
          }
          var React = {
            Children: {
              map: ReactChildren.map,
              forEach: ReactChildren.forEach,
              count: ReactChildren.count,
              toArray: ReactChildren.toArray,
              only: onlyChild
            },
            Component: ReactComponent,
            createElement: createElement,
            cloneElement: cloneElement,
            isValidElement: ReactElement.isValidElement,
            PropTypes: ReactPropTypes,
            createClass: ReactClass.createClass,
            createFactory: createFactory,
            createMixin: function(mixin) {
              return mixin;
            },
            DOM: ReactDOMFactories,
            version: ReactVersion,
            __spread: assign
          };
          module.exports = React;
        }, {
          "121": 121,
          "23": 23,
          "28": 28,
          "29": 29,
          "30": 30,
          "38": 38,
          "52": 52,
          "53": 53,
          "74": 74,
          "84": 84
        }],
        64: [function(_dereq_, module, exports) {
          'use strict';
          var adler32 = _dereq_(103);
          var TAG_END = /\/?>/;
          var ReactMarkupChecksum = {
            CHECKSUM_ATTR_NAME: 'data-react-checksum',
            addChecksumToMarkup: function(markup) {
              var checksum = adler32(markup);
              return markup.replace(TAG_END, ' ' + ReactMarkupChecksum.CHECKSUM_ATTR_NAME + '="' + checksum + '"$&');
            },
            canReuseMarkup: function(markup, element) {
              var existingChecksum = element.getAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
              existingChecksum = existingChecksum && parseInt(existingChecksum, 10);
              var markupChecksum = adler32(markup);
              return markupChecksum === existingChecksum;
            }
          };
          module.exports = ReactMarkupChecksum;
        }, {"103": 103}],
        65: [function(_dereq_, module, exports) {
          'use strict';
          var DOMProperty = _dereq_(10);
          var ReactBrowserEventEmitter = _dereq_(26);
          var ReactCurrentOwner = _dereq_(34);
          var ReactDOMFeatureFlags = _dereq_(39);
          var ReactElement = _dereq_(52);
          var ReactEmptyComponentRegistry = _dereq_(55);
          var ReactInstanceHandles = _dereq_(61);
          var ReactInstanceMap = _dereq_(62);
          var ReactMarkupChecksum = _dereq_(64);
          var ReactPerf = _dereq_(71);
          var ReactReconciler = _dereq_(76);
          var ReactUpdateQueue = _dereq_(82);
          var ReactUpdates = _dereq_(83);
          var assign = _dereq_(23);
          var emptyObject = _dereq_(137);
          var containsNode = _dereq_(133);
          var instantiateReactComponent = _dereq_(118);
          var invariant = _dereq_(144);
          var setInnerHTML = _dereq_(124);
          var shouldUpdateReactComponent = _dereq_(126);
          var validateDOMNesting = _dereq_(128);
          var warning = _dereq_(155);
          var ATTR_NAME = DOMProperty.ID_ATTRIBUTE_NAME;
          var nodeCache = {};
          var ELEMENT_NODE_TYPE = 1;
          var DOC_NODE_TYPE = 9;
          var DOCUMENT_FRAGMENT_NODE_TYPE = 11;
          var ownerDocumentContextKey = '__ReactMount_ownerDocument$' + Math.random().toString(36).slice(2);
          var instancesByReactRootID = {};
          var containersByReactRootID = {};
          if ("development" !== 'production') {
            var rootElementsByReactRootID = {};
          }
          var findComponentRootReusableArray = [];
          function firstDifferenceIndex(string1, string2) {
            var minLen = Math.min(string1.length, string2.length);
            for (var i = 0; i < minLen; i++) {
              if (string1.charAt(i) !== string2.charAt(i)) {
                return i;
              }
            }
            return string1.length === string2.length ? -1 : minLen;
          }
          function getReactRootElementInContainer(container) {
            if (!container) {
              return null;
            }
            if (container.nodeType === DOC_NODE_TYPE) {
              return container.documentElement;
            } else {
              return container.firstChild;
            }
          }
          function getReactRootID(container) {
            var rootElement = getReactRootElementInContainer(container);
            return rootElement && ReactMount.getID(rootElement);
          }
          function getID(node) {
            var id = internalGetID(node);
            if (id) {
              if (nodeCache.hasOwnProperty(id)) {
                var cached = nodeCache[id];
                if (cached !== node) {
                  !!isValid(cached, id) ? "development" !== 'production' ? invariant(false, 'ReactMount: Two valid but unequal nodes with the same `%s`: %s', ATTR_NAME, id) : invariant(false) : undefined;
                  nodeCache[id] = node;
                }
              } else {
                nodeCache[id] = node;
              }
            }
            return id;
          }
          function internalGetID(node) {
            return node && node.getAttribute && node.getAttribute(ATTR_NAME) || '';
          }
          function setID(node, id) {
            var oldID = internalGetID(node);
            if (oldID !== id) {
              delete nodeCache[oldID];
            }
            node.setAttribute(ATTR_NAME, id);
            nodeCache[id] = node;
          }
          function getNode(id) {
            if (!nodeCache.hasOwnProperty(id) || !isValid(nodeCache[id], id)) {
              nodeCache[id] = ReactMount.findReactNodeByID(id);
            }
            return nodeCache[id];
          }
          function getNodeFromInstance(instance) {
            var id = ReactInstanceMap.get(instance)._rootNodeID;
            if (ReactEmptyComponentRegistry.isNullComponentID(id)) {
              return null;
            }
            if (!nodeCache.hasOwnProperty(id) || !isValid(nodeCache[id], id)) {
              nodeCache[id] = ReactMount.findReactNodeByID(id);
            }
            return nodeCache[id];
          }
          function isValid(node, id) {
            if (node) {
              !(internalGetID(node) === id) ? "development" !== 'production' ? invariant(false, 'ReactMount: Unexpected modification of `%s`', ATTR_NAME) : invariant(false) : undefined;
              var container = ReactMount.findReactContainerForID(id);
              if (container && containsNode(container, node)) {
                return true;
              }
            }
            return false;
          }
          function purgeID(id) {
            delete nodeCache[id];
          }
          var deepestNodeSoFar = null;
          function findDeepestCachedAncestorImpl(ancestorID) {
            var ancestor = nodeCache[ancestorID];
            if (ancestor && isValid(ancestor, ancestorID)) {
              deepestNodeSoFar = ancestor;
            } else {
              return false;
            }
          }
          function findDeepestCachedAncestor(targetID) {
            deepestNodeSoFar = null;
            ReactInstanceHandles.traverseAncestors(targetID, findDeepestCachedAncestorImpl);
            var foundNode = deepestNodeSoFar;
            deepestNodeSoFar = null;
            return foundNode;
          }
          function mountComponentIntoNode(componentInstance, rootID, container, transaction, shouldReuseMarkup, context) {
            if (ReactDOMFeatureFlags.useCreateElement) {
              context = assign({}, context);
              if (container.nodeType === DOC_NODE_TYPE) {
                context[ownerDocumentContextKey] = container;
              } else {
                context[ownerDocumentContextKey] = container.ownerDocument;
              }
            }
            if ("development" !== 'production') {
              if (context === emptyObject) {
                context = {};
              }
              var tag = container.nodeName.toLowerCase();
              context[validateDOMNesting.ancestorInfoContextKey] = validateDOMNesting.updatedAncestorInfo(null, tag, null);
            }
            var markup = ReactReconciler.mountComponent(componentInstance, rootID, transaction, context);
            componentInstance._renderedComponent._topLevelWrapper = componentInstance;
            ReactMount._mountImageIntoNode(markup, container, shouldReuseMarkup, transaction);
          }
          function batchedMountComponentIntoNode(componentInstance, rootID, container, shouldReuseMarkup, context) {
            var transaction = ReactUpdates.ReactReconcileTransaction.getPooled(shouldReuseMarkup);
            transaction.perform(mountComponentIntoNode, null, componentInstance, rootID, container, transaction, shouldReuseMarkup, context);
            ReactUpdates.ReactReconcileTransaction.release(transaction);
          }
          function unmountComponentFromNode(instance, container) {
            ReactReconciler.unmountComponent(instance);
            if (container.nodeType === DOC_NODE_TYPE) {
              container = container.documentElement;
            }
            while (container.lastChild) {
              container.removeChild(container.lastChild);
            }
          }
          function hasNonRootReactChild(node) {
            var reactRootID = getReactRootID(node);
            return reactRootID ? reactRootID !== ReactInstanceHandles.getReactRootIDFromNodeID(reactRootID) : false;
          }
          function findFirstReactDOMImpl(node) {
            for (; node && node.parentNode !== node; node = node.parentNode) {
              if (node.nodeType !== 1) {
                continue;
              }
              var nodeID = internalGetID(node);
              if (!nodeID) {
                continue;
              }
              var reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(nodeID);
              var current = node;
              var lastID;
              do {
                lastID = internalGetID(current);
                current = current.parentNode;
                if (current == null) {
                  return null;
                }
              } while (lastID !== reactRootID);
              if (current === containersByReactRootID[reactRootID]) {
                return node;
              }
            }
            return null;
          }
          var TopLevelWrapper = function() {};
          TopLevelWrapper.prototype.isReactComponent = {};
          if ("development" !== 'production') {
            TopLevelWrapper.displayName = 'TopLevelWrapper';
          }
          TopLevelWrapper.prototype.render = function() {
            return this.props;
          };
          var ReactMount = {
            TopLevelWrapper: TopLevelWrapper,
            _instancesByReactRootID: instancesByReactRootID,
            scrollMonitor: function(container, renderCallback) {
              renderCallback();
            },
            _updateRootComponent: function(prevComponent, nextElement, container, callback) {
              ReactMount.scrollMonitor(container, function() {
                ReactUpdateQueue.enqueueElementInternal(prevComponent, nextElement);
                if (callback) {
                  ReactUpdateQueue.enqueueCallbackInternal(prevComponent, callback);
                }
              });
              if ("development" !== 'production') {
                rootElementsByReactRootID[getReactRootID(container)] = getReactRootElementInContainer(container);
              }
              return prevComponent;
            },
            _registerComponent: function(nextComponent, container) {
              !(container && (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE || container.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE)) ? "development" !== 'production' ? invariant(false, '_registerComponent(...): Target container is not a DOM element.') : invariant(false) : undefined;
              ReactBrowserEventEmitter.ensureScrollValueMonitoring();
              var reactRootID = ReactMount.registerContainer(container);
              instancesByReactRootID[reactRootID] = nextComponent;
              return reactRootID;
            },
            _renderNewRootComponent: function(nextElement, container, shouldReuseMarkup, context) {
              "development" !== 'production' ? warning(ReactCurrentOwner.current == null, '_renderNewRootComponent(): Render methods should be a pure function ' + 'of props and state; triggering nested component updates from ' + 'render is not allowed. If necessary, trigger nested updates in ' + 'componentDidUpdate. Check the render method of %s.', ReactCurrentOwner.current && ReactCurrentOwner.current.getName() || 'ReactCompositeComponent') : undefined;
              var componentInstance = instantiateReactComponent(nextElement, null);
              var reactRootID = ReactMount._registerComponent(componentInstance, container);
              ReactUpdates.batchedUpdates(batchedMountComponentIntoNode, componentInstance, reactRootID, container, shouldReuseMarkup, context);
              if ("development" !== 'production') {
                rootElementsByReactRootID[reactRootID] = getReactRootElementInContainer(container);
              }
              return componentInstance;
            },
            renderSubtreeIntoContainer: function(parentComponent, nextElement, container, callback) {
              !(parentComponent != null && parentComponent._reactInternalInstance != null) ? "development" !== 'production' ? invariant(false, 'parentComponent must be a valid React Component') : invariant(false) : undefined;
              return ReactMount._renderSubtreeIntoContainer(parentComponent, nextElement, container, callback);
            },
            _renderSubtreeIntoContainer: function(parentComponent, nextElement, container, callback) {
              !ReactElement.isValidElement(nextElement) ? "development" !== 'production' ? invariant(false, 'ReactDOM.render(): Invalid component element.%s', typeof nextElement === 'string' ? ' Instead of passing an element string, make sure to instantiate ' + 'it by passing it to React.createElement.' : typeof nextElement === 'function' ? ' Instead of passing a component class, make sure to instantiate ' + 'it by passing it to React.createElement.' : nextElement != null && nextElement.props !== undefined ? ' This may be caused by unintentionally loading two independent ' + 'copies of React.' : '') : invariant(false) : undefined;
              "development" !== 'production' ? warning(!container || !container.tagName || container.tagName.toUpperCase() !== 'BODY', 'render(): Rendering components directly into document.body is ' + 'discouraged, since its children are often manipulated by third-party ' + 'scripts and browser extensions. This may lead to subtle ' + 'reconciliation issues. Try rendering into a container element created ' + 'for your app.') : undefined;
              var nextWrappedElement = new ReactElement(TopLevelWrapper, null, null, null, null, null, nextElement);
              var prevComponent = instancesByReactRootID[getReactRootID(container)];
              if (prevComponent) {
                var prevWrappedElement = prevComponent._currentElement;
                var prevElement = prevWrappedElement.props;
                if (shouldUpdateReactComponent(prevElement, nextElement)) {
                  var publicInst = prevComponent._renderedComponent.getPublicInstance();
                  var updatedCallback = callback && function() {
                    callback.call(publicInst);
                  };
                  ReactMount._updateRootComponent(prevComponent, nextWrappedElement, container, updatedCallback);
                  return publicInst;
                } else {
                  ReactMount.unmountComponentAtNode(container);
                }
              }
              var reactRootElement = getReactRootElementInContainer(container);
              var containerHasReactMarkup = reactRootElement && !!internalGetID(reactRootElement);
              var containerHasNonRootReactChild = hasNonRootReactChild(container);
              if ("development" !== 'production') {
                "development" !== 'production' ? warning(!containerHasNonRootReactChild, 'render(...): Replacing React-rendered children with a new root ' + 'component. If you intended to update the children of this node, ' + 'you should instead have the existing children update their state ' + 'and render the new components instead of calling ReactDOM.render.') : undefined;
                if (!containerHasReactMarkup || reactRootElement.nextSibling) {
                  var rootElementSibling = reactRootElement;
                  while (rootElementSibling) {
                    if (internalGetID(rootElementSibling)) {
                      "development" !== 'production' ? warning(false, 'render(): Target node has markup rendered by React, but there ' + 'are unrelated nodes as well. This is most commonly caused by ' + 'white-space inserted around server-rendered markup.') : undefined;
                      break;
                    }
                    rootElementSibling = rootElementSibling.nextSibling;
                  }
                }
              }
              var shouldReuseMarkup = containerHasReactMarkup && !prevComponent && !containerHasNonRootReactChild;
              var component = ReactMount._renderNewRootComponent(nextWrappedElement, container, shouldReuseMarkup, parentComponent != null ? parentComponent._reactInternalInstance._processChildContext(parentComponent._reactInternalInstance._context) : emptyObject)._renderedComponent.getPublicInstance();
              if (callback) {
                callback.call(component);
              }
              return component;
            },
            render: function(nextElement, container, callback) {
              return ReactMount._renderSubtreeIntoContainer(null, nextElement, container, callback);
            },
            registerContainer: function(container) {
              var reactRootID = getReactRootID(container);
              if (reactRootID) {
                reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(reactRootID);
              }
              if (!reactRootID) {
                reactRootID = ReactInstanceHandles.createReactRootID();
              }
              containersByReactRootID[reactRootID] = container;
              return reactRootID;
            },
            unmountComponentAtNode: function(container) {
              "development" !== 'production' ? warning(ReactCurrentOwner.current == null, 'unmountComponentAtNode(): Render methods should be a pure function ' + 'of props and state; triggering nested component updates from render ' + 'is not allowed. If necessary, trigger nested updates in ' + 'componentDidUpdate. Check the render method of %s.', ReactCurrentOwner.current && ReactCurrentOwner.current.getName() || 'ReactCompositeComponent') : undefined;
              !(container && (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE || container.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE)) ? "development" !== 'production' ? invariant(false, 'unmountComponentAtNode(...): Target container is not a DOM element.') : invariant(false) : undefined;
              var reactRootID = getReactRootID(container);
              var component = instancesByReactRootID[reactRootID];
              if (!component) {
                var containerHasNonRootReactChild = hasNonRootReactChild(container);
                var containerID = internalGetID(container);
                var isContainerReactRoot = containerID && containerID === ReactInstanceHandles.getReactRootIDFromNodeID(containerID);
                if ("development" !== 'production') {
                  "development" !== 'production' ? warning(!containerHasNonRootReactChild, 'unmountComponentAtNode(): The node you\'re attempting to unmount ' + 'was rendered by React and is not a top-level container. %s', isContainerReactRoot ? 'You may have accidentally passed in a React root node instead ' + 'of its container.' : 'Instead, have the parent component update its state and ' + 'rerender in order to remove this component.') : undefined;
                }
                return false;
              }
              ReactUpdates.batchedUpdates(unmountComponentFromNode, component, container);
              delete instancesByReactRootID[reactRootID];
              delete containersByReactRootID[reactRootID];
              if ("development" !== 'production') {
                delete rootElementsByReactRootID[reactRootID];
              }
              return true;
            },
            findReactContainerForID: function(id) {
              var reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(id);
              var container = containersByReactRootID[reactRootID];
              if ("development" !== 'production') {
                var rootElement = rootElementsByReactRootID[reactRootID];
                if (rootElement && rootElement.parentNode !== container) {
                  "development" !== 'production' ? warning(internalGetID(rootElement) === reactRootID, 'ReactMount: Root element ID differed from reactRootID.') : undefined;
                  var containerChild = container.firstChild;
                  if (containerChild && reactRootID === internalGetID(containerChild)) {
                    rootElementsByReactRootID[reactRootID] = containerChild;
                  } else {
                    "development" !== 'production' ? warning(false, 'ReactMount: Root element has been removed from its original ' + 'container. New container: %s', rootElement.parentNode) : undefined;
                  }
                }
              }
              return container;
            },
            findReactNodeByID: function(id) {
              var reactRoot = ReactMount.findReactContainerForID(id);
              return ReactMount.findComponentRoot(reactRoot, id);
            },
            getFirstReactDOM: function(node) {
              return findFirstReactDOMImpl(node);
            },
            findComponentRoot: function(ancestorNode, targetID) {
              var firstChildren = findComponentRootReusableArray;
              var childIndex = 0;
              var deepestAncestor = findDeepestCachedAncestor(targetID) || ancestorNode;
              if ("development" !== 'production') {
                "development" !== 'production' ? warning(deepestAncestor != null, 'React can\'t find the root component node for data-reactid value ' + '`%s`. If you\'re seeing this message, it probably means that ' + 'you\'ve loaded two copies of React on the page. At this time, only ' + 'a single copy of React can be loaded at a time.', targetID) : undefined;
              }
              firstChildren[0] = deepestAncestor.firstChild;
              firstChildren.length = 1;
              while (childIndex < firstChildren.length) {
                var child = firstChildren[childIndex++];
                var targetChild;
                while (child) {
                  var childID = ReactMount.getID(child);
                  if (childID) {
                    if (targetID === childID) {
                      targetChild = child;
                    } else if (ReactInstanceHandles.isAncestorIDOf(childID, targetID)) {
                      firstChildren.length = childIndex = 0;
                      firstChildren.push(child.firstChild);
                    }
                  } else {
                    firstChildren.push(child.firstChild);
                  }
                  child = child.nextSibling;
                }
                if (targetChild) {
                  firstChildren.length = 0;
                  return targetChild;
                }
              }
              firstChildren.length = 0;
              !false ? "development" !== 'production' ? invariant(false, 'findComponentRoot(..., %s): Unable to find element. This probably ' + 'means the DOM was unexpectedly mutated (e.g., by the browser), ' + 'usually due to forgetting a <tbody> when using tables, nesting tags ' + 'like <form>, <p>, or <a>, or using non-SVG elements in an <svg> ' + 'parent. ' + 'Try inspecting the child nodes of the element with React ID `%s`.', targetID, ReactMount.getID(ancestorNode)) : invariant(false) : undefined;
            },
            _mountImageIntoNode: function(markup, container, shouldReuseMarkup, transaction) {
              !(container && (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE || container.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE)) ? "development" !== 'production' ? invariant(false, 'mountComponentIntoNode(...): Target container is not valid.') : invariant(false) : undefined;
              if (shouldReuseMarkup) {
                var rootElement = getReactRootElementInContainer(container);
                if (ReactMarkupChecksum.canReuseMarkup(markup, rootElement)) {
                  return;
                } else {
                  var checksum = rootElement.getAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
                  rootElement.removeAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
                  var rootMarkup = rootElement.outerHTML;
                  rootElement.setAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME, checksum);
                  var normalizedMarkup = markup;
                  if ("development" !== 'production') {
                    var normalizer;
                    if (container.nodeType === ELEMENT_NODE_TYPE) {
                      normalizer = document.createElement('div');
                      normalizer.innerHTML = markup;
                      normalizedMarkup = normalizer.innerHTML;
                    } else {
                      normalizer = document.createElement('iframe');
                      document.body.appendChild(normalizer);
                      normalizer.contentDocument.write(markup);
                      normalizedMarkup = normalizer.contentDocument.documentElement.outerHTML;
                      document.body.removeChild(normalizer);
                    }
                  }
                  var diffIndex = firstDifferenceIndex(normalizedMarkup, rootMarkup);
                  var difference = ' (client) ' + normalizedMarkup.substring(diffIndex - 20, diffIndex + 20) + '\n (server) ' + rootMarkup.substring(diffIndex - 20, diffIndex + 20);
                  !(container.nodeType !== DOC_NODE_TYPE) ? "development" !== 'production' ? invariant(false, 'You\'re trying to render a component to the document using ' + 'server rendering but the checksum was invalid. This usually ' + 'means you rendered a different component type or props on ' + 'the client from the one on the server, or your render() ' + 'methods are impure. React cannot handle this case due to ' + 'cross-browser quirks by rendering at the document root. You ' + 'should look for environment dependent code in your components ' + 'and ensure the props are the same client and server side:\n%s', difference) : invariant(false) : undefined;
                  if ("development" !== 'production') {
                    "development" !== 'production' ? warning(false, 'React attempted to reuse markup in a container but the ' + 'checksum was invalid. This generally means that you are ' + 'using server rendering and the markup generated on the ' + 'server was not what the client was expecting. React injected ' + 'new markup to compensate which works but you have lost many ' + 'of the benefits of server rendering. Instead, figure out ' + 'why the markup being generated is different on the client ' + 'or server:\n%s', difference) : undefined;
                  }
                }
              }
              !(container.nodeType !== DOC_NODE_TYPE) ? "development" !== 'production' ? invariant(false, 'You\'re trying to render a component to the document but ' + 'you didn\'t use server rendering. We can\'t do this ' + 'without using server rendering due to cross-browser quirks. ' + 'See ReactDOMServer.renderToString() for server rendering.') : invariant(false) : undefined;
              if (transaction.useCreateElement) {
                while (container.lastChild) {
                  container.removeChild(container.lastChild);
                }
                container.appendChild(markup);
              } else {
                setInnerHTML(container, markup);
              }
            },
            ownerDocumentContextKey: ownerDocumentContextKey,
            getReactRootID: getReactRootID,
            getID: getID,
            setID: setID,
            getNode: getNode,
            getNodeFromInstance: getNodeFromInstance,
            isValid: isValid,
            purgeID: purgeID
          };
          ReactPerf.measureMethods(ReactMount, 'ReactMount', {
            _renderNewRootComponent: '_renderNewRootComponent',
            _mountImageIntoNode: '_mountImageIntoNode'
          });
          module.exports = ReactMount;
        }, {
          "10": 10,
          "118": 118,
          "124": 124,
          "126": 126,
          "128": 128,
          "133": 133,
          "137": 137,
          "144": 144,
          "155": 155,
          "23": 23,
          "26": 26,
          "34": 34,
          "39": 39,
          "52": 52,
          "55": 55,
          "61": 61,
          "62": 62,
          "64": 64,
          "71": 71,
          "76": 76,
          "82": 82,
          "83": 83
        }],
        66: [function(_dereq_, module, exports) {
          'use strict';
          var ReactComponentEnvironment = _dereq_(32);
          var ReactMultiChildUpdateTypes = _dereq_(67);
          var ReactCurrentOwner = _dereq_(34);
          var ReactReconciler = _dereq_(76);
          var ReactChildReconciler = _dereq_(27);
          var flattenChildren = _dereq_(109);
          var updateDepth = 0;
          var updateQueue = [];
          var markupQueue = [];
          function enqueueInsertMarkup(parentID, markup, toIndex) {
            updateQueue.push({
              parentID: parentID,
              parentNode: null,
              type: ReactMultiChildUpdateTypes.INSERT_MARKUP,
              markupIndex: markupQueue.push(markup) - 1,
              content: null,
              fromIndex: null,
              toIndex: toIndex
            });
          }
          function enqueueMove(parentID, fromIndex, toIndex) {
            updateQueue.push({
              parentID: parentID,
              parentNode: null,
              type: ReactMultiChildUpdateTypes.MOVE_EXISTING,
              markupIndex: null,
              content: null,
              fromIndex: fromIndex,
              toIndex: toIndex
            });
          }
          function enqueueRemove(parentID, fromIndex) {
            updateQueue.push({
              parentID: parentID,
              parentNode: null,
              type: ReactMultiChildUpdateTypes.REMOVE_NODE,
              markupIndex: null,
              content: null,
              fromIndex: fromIndex,
              toIndex: null
            });
          }
          function enqueueSetMarkup(parentID, markup) {
            updateQueue.push({
              parentID: parentID,
              parentNode: null,
              type: ReactMultiChildUpdateTypes.SET_MARKUP,
              markupIndex: null,
              content: markup,
              fromIndex: null,
              toIndex: null
            });
          }
          function enqueueTextContent(parentID, textContent) {
            updateQueue.push({
              parentID: parentID,
              parentNode: null,
              type: ReactMultiChildUpdateTypes.TEXT_CONTENT,
              markupIndex: null,
              content: textContent,
              fromIndex: null,
              toIndex: null
            });
          }
          function processQueue() {
            if (updateQueue.length) {
              ReactComponentEnvironment.processChildrenUpdates(updateQueue, markupQueue);
              clearQueue();
            }
          }
          function clearQueue() {
            updateQueue.length = 0;
            markupQueue.length = 0;
          }
          var ReactMultiChild = {Mixin: {
              _reconcilerInstantiateChildren: function(nestedChildren, transaction, context) {
                if ("development" !== 'production') {
                  if (this._currentElement) {
                    try {
                      ReactCurrentOwner.current = this._currentElement._owner;
                      return ReactChildReconciler.instantiateChildren(nestedChildren, transaction, context);
                    } finally {
                      ReactCurrentOwner.current = null;
                    }
                  }
                }
                return ReactChildReconciler.instantiateChildren(nestedChildren, transaction, context);
              },
              _reconcilerUpdateChildren: function(prevChildren, nextNestedChildrenElements, transaction, context) {
                var nextChildren;
                if ("development" !== 'production') {
                  if (this._currentElement) {
                    try {
                      ReactCurrentOwner.current = this._currentElement._owner;
                      nextChildren = flattenChildren(nextNestedChildrenElements);
                    } finally {
                      ReactCurrentOwner.current = null;
                    }
                    return ReactChildReconciler.updateChildren(prevChildren, nextChildren, transaction, context);
                  }
                }
                nextChildren = flattenChildren(nextNestedChildrenElements);
                return ReactChildReconciler.updateChildren(prevChildren, nextChildren, transaction, context);
              },
              mountChildren: function(nestedChildren, transaction, context) {
                var children = this._reconcilerInstantiateChildren(nestedChildren, transaction, context);
                this._renderedChildren = children;
                var mountImages = [];
                var index = 0;
                for (var name in children) {
                  if (children.hasOwnProperty(name)) {
                    var child = children[name];
                    var rootID = this._rootNodeID + name;
                    var mountImage = ReactReconciler.mountComponent(child, rootID, transaction, context);
                    child._mountIndex = index++;
                    mountImages.push(mountImage);
                  }
                }
                return mountImages;
              },
              updateTextContent: function(nextContent) {
                updateDepth++;
                var errorThrown = true;
                try {
                  var prevChildren = this._renderedChildren;
                  ReactChildReconciler.unmountChildren(prevChildren);
                  for (var name in prevChildren) {
                    if (prevChildren.hasOwnProperty(name)) {
                      this._unmountChild(prevChildren[name]);
                    }
                  }
                  this.setTextContent(nextContent);
                  errorThrown = false;
                } finally {
                  updateDepth--;
                  if (!updateDepth) {
                    if (errorThrown) {
                      clearQueue();
                    } else {
                      processQueue();
                    }
                  }
                }
              },
              updateMarkup: function(nextMarkup) {
                updateDepth++;
                var errorThrown = true;
                try {
                  var prevChildren = this._renderedChildren;
                  ReactChildReconciler.unmountChildren(prevChildren);
                  for (var name in prevChildren) {
                    if (prevChildren.hasOwnProperty(name)) {
                      this._unmountChildByName(prevChildren[name], name);
                    }
                  }
                  this.setMarkup(nextMarkup);
                  errorThrown = false;
                } finally {
                  updateDepth--;
                  if (!updateDepth) {
                    if (errorThrown) {
                      clearQueue();
                    } else {
                      processQueue();
                    }
                  }
                }
              },
              updateChildren: function(nextNestedChildrenElements, transaction, context) {
                updateDepth++;
                var errorThrown = true;
                try {
                  this._updateChildren(nextNestedChildrenElements, transaction, context);
                  errorThrown = false;
                } finally {
                  updateDepth--;
                  if (!updateDepth) {
                    if (errorThrown) {
                      clearQueue();
                    } else {
                      processQueue();
                    }
                  }
                }
              },
              _updateChildren: function(nextNestedChildrenElements, transaction, context) {
                var prevChildren = this._renderedChildren;
                var nextChildren = this._reconcilerUpdateChildren(prevChildren, nextNestedChildrenElements, transaction, context);
                this._renderedChildren = nextChildren;
                if (!nextChildren && !prevChildren) {
                  return;
                }
                var name;
                var lastIndex = 0;
                var nextIndex = 0;
                for (name in nextChildren) {
                  if (!nextChildren.hasOwnProperty(name)) {
                    continue;
                  }
                  var prevChild = prevChildren && prevChildren[name];
                  var nextChild = nextChildren[name];
                  if (prevChild === nextChild) {
                    this.moveChild(prevChild, nextIndex, lastIndex);
                    lastIndex = Math.max(prevChild._mountIndex, lastIndex);
                    prevChild._mountIndex = nextIndex;
                  } else {
                    if (prevChild) {
                      lastIndex = Math.max(prevChild._mountIndex, lastIndex);
                      this._unmountChild(prevChild);
                    }
                    this._mountChildByNameAtIndex(nextChild, name, nextIndex, transaction, context);
                  }
                  nextIndex++;
                }
                for (name in prevChildren) {
                  if (prevChildren.hasOwnProperty(name) && !(nextChildren && nextChildren.hasOwnProperty(name))) {
                    this._unmountChild(prevChildren[name]);
                  }
                }
              },
              unmountChildren: function() {
                var renderedChildren = this._renderedChildren;
                ReactChildReconciler.unmountChildren(renderedChildren);
                this._renderedChildren = null;
              },
              moveChild: function(child, toIndex, lastIndex) {
                if (child._mountIndex < lastIndex) {
                  enqueueMove(this._rootNodeID, child._mountIndex, toIndex);
                }
              },
              createChild: function(child, mountImage) {
                enqueueInsertMarkup(this._rootNodeID, mountImage, child._mountIndex);
              },
              removeChild: function(child) {
                enqueueRemove(this._rootNodeID, child._mountIndex);
              },
              setTextContent: function(textContent) {
                enqueueTextContent(this._rootNodeID, textContent);
              },
              setMarkup: function(markup) {
                enqueueSetMarkup(this._rootNodeID, markup);
              },
              _mountChildByNameAtIndex: function(child, name, index, transaction, context) {
                var rootID = this._rootNodeID + name;
                var mountImage = ReactReconciler.mountComponent(child, rootID, transaction, context);
                child._mountIndex = index;
                this.createChild(child, mountImage);
              },
              _unmountChild: function(child) {
                this.removeChild(child);
                child._mountIndex = null;
              }
            }};
          module.exports = ReactMultiChild;
        }, {
          "109": 109,
          "27": 27,
          "32": 32,
          "34": 34,
          "67": 67,
          "76": 76
        }],
        67: [function(_dereq_, module, exports) {
          'use strict';
          var keyMirror = _dereq_(147);
          var ReactMultiChildUpdateTypes = keyMirror({
            INSERT_MARKUP: null,
            MOVE_EXISTING: null,
            REMOVE_NODE: null,
            SET_MARKUP: null,
            TEXT_CONTENT: null
          });
          module.exports = ReactMultiChildUpdateTypes;
        }, {"147": 147}],
        68: [function(_dereq_, module, exports) {
          'use strict';
          var assign = _dereq_(23);
          var invariant = _dereq_(144);
          var autoGenerateWrapperClass = null;
          var genericComponentClass = null;
          var tagToComponentClass = {};
          var textComponentClass = null;
          var ReactNativeComponentInjection = {
            injectGenericComponentClass: function(componentClass) {
              genericComponentClass = componentClass;
            },
            injectTextComponentClass: function(componentClass) {
              textComponentClass = componentClass;
            },
            injectComponentClasses: function(componentClasses) {
              assign(tagToComponentClass, componentClasses);
            }
          };
          function getComponentClassForElement(element) {
            if (typeof element.type === 'function') {
              return element.type;
            }
            var tag = element.type;
            var componentClass = tagToComponentClass[tag];
            if (componentClass == null) {
              tagToComponentClass[tag] = componentClass = autoGenerateWrapperClass(tag);
            }
            return componentClass;
          }
          function createInternalComponent(element) {
            !genericComponentClass ? "development" !== 'production' ? invariant(false, 'There is no registered component for the tag %s', element.type) : invariant(false) : undefined;
            return new genericComponentClass(element.type, element.props);
          }
          function createInstanceForText(text) {
            return new textComponentClass(text);
          }
          function isTextComponent(component) {
            return component instanceof textComponentClass;
          }
          var ReactNativeComponent = {
            getComponentClassForElement: getComponentClassForElement,
            createInternalComponent: createInternalComponent,
            createInstanceForText: createInstanceForText,
            isTextComponent: isTextComponent,
            injection: ReactNativeComponentInjection
          };
          module.exports = ReactNativeComponent;
        }, {
          "144": 144,
          "23": 23
        }],
        69: [function(_dereq_, module, exports) {
          'use strict';
          var warning = _dereq_(155);
          function warnTDZ(publicInstance, callerName) {
            if ("development" !== 'production') {
              "development" !== 'production' ? warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, publicInstance.constructor && publicInstance.constructor.displayName || '') : undefined;
            }
          }
          var ReactNoopUpdateQueue = {
            isMounted: function(publicInstance) {
              return false;
            },
            enqueueCallback: function(publicInstance, callback) {},
            enqueueForceUpdate: function(publicInstance) {
              warnTDZ(publicInstance, 'forceUpdate');
            },
            enqueueReplaceState: function(publicInstance, completeState) {
              warnTDZ(publicInstance, 'replaceState');
            },
            enqueueSetState: function(publicInstance, partialState) {
              warnTDZ(publicInstance, 'setState');
            },
            enqueueSetProps: function(publicInstance, partialProps) {
              warnTDZ(publicInstance, 'setProps');
            },
            enqueueReplaceProps: function(publicInstance, props) {
              warnTDZ(publicInstance, 'replaceProps');
            }
          };
          module.exports = ReactNoopUpdateQueue;
        }, {"155": 155}],
        70: [function(_dereq_, module, exports) {
          'use strict';
          var invariant = _dereq_(144);
          var ReactOwner = {
            isValidOwner: function(object) {
              return !!(object && typeof object.attachRef === 'function' && typeof object.detachRef === 'function');
            },
            addComponentAsRefTo: function(component, ref, owner) {
              !ReactOwner.isValidOwner(owner) ? "development" !== 'production' ? invariant(false, 'addComponentAsRefTo(...): Only a ReactOwner can have refs. You might ' + 'be adding a ref to a component that was not created inside a component\'s ' + '`render` method, or you have multiple copies of React loaded ' + '(details: https://fb.me/react-refs-must-have-owner).') : invariant(false) : undefined;
              owner.attachRef(ref, component);
            },
            removeComponentAsRefFrom: function(component, ref, owner) {
              !ReactOwner.isValidOwner(owner) ? "development" !== 'production' ? invariant(false, 'removeComponentAsRefFrom(...): Only a ReactOwner can have refs. You might ' + 'be removing a ref to a component that was not created inside a component\'s ' + '`render` method, or you have multiple copies of React loaded ' + '(details: https://fb.me/react-refs-must-have-owner).') : invariant(false) : undefined;
              if (owner.getPublicInstance().refs[ref] === component.getPublicInstance()) {
                owner.detachRef(ref);
              }
            }
          };
          module.exports = ReactOwner;
        }, {"144": 144}],
        71: [function(_dereq_, module, exports) {
          'use strict';
          var ReactPerf = {
            enableMeasure: false,
            storedMeasure: _noMeasure,
            measureMethods: function(object, objectName, methodNames) {
              if ("development" !== 'production') {
                for (var key in methodNames) {
                  if (!methodNames.hasOwnProperty(key)) {
                    continue;
                  }
                  object[key] = ReactPerf.measure(objectName, methodNames[key], object[key]);
                }
              }
            },
            measure: function(objName, fnName, func) {
              if ("development" !== 'production') {
                var measuredFunc = null;
                var wrapper = function() {
                  if (ReactPerf.enableMeasure) {
                    if (!measuredFunc) {
                      measuredFunc = ReactPerf.storedMeasure(objName, fnName, func);
                    }
                    return measuredFunc.apply(this, arguments);
                  }
                  return func.apply(this, arguments);
                };
                wrapper.displayName = objName + '_' + fnName;
                return wrapper;
              }
              return func;
            },
            injection: {injectMeasure: function(measure) {
                ReactPerf.storedMeasure = measure;
              }}
          };
          function _noMeasure(objName, fnName, func) {
            return func;
          }
          module.exports = ReactPerf;
        }, {}],
        72: [function(_dereq_, module, exports) {
          'use strict';
          var ReactPropTypeLocationNames = {};
          if ("development" !== 'production') {
            ReactPropTypeLocationNames = {
              prop: 'prop',
              context: 'context',
              childContext: 'child context'
            };
          }
          module.exports = ReactPropTypeLocationNames;
        }, {}],
        73: [function(_dereq_, module, exports) {
          'use strict';
          var keyMirror = _dereq_(147);
          var ReactPropTypeLocations = keyMirror({
            prop: null,
            context: null,
            childContext: null
          });
          module.exports = ReactPropTypeLocations;
        }, {"147": 147}],
        74: [function(_dereq_, module, exports) {
          'use strict';
          var ReactElement = _dereq_(52);
          var ReactPropTypeLocationNames = _dereq_(72);
          var emptyFunction = _dereq_(136);
          var getIteratorFn = _dereq_(115);
          var ANONYMOUS = '<<anonymous>>';
          var ReactPropTypes = {
            array: createPrimitiveTypeChecker('array'),
            bool: createPrimitiveTypeChecker('boolean'),
            func: createPrimitiveTypeChecker('function'),
            number: createPrimitiveTypeChecker('number'),
            object: createPrimitiveTypeChecker('object'),
            string: createPrimitiveTypeChecker('string'),
            any: createAnyTypeChecker(),
            arrayOf: createArrayOfTypeChecker,
            element: createElementTypeChecker(),
            instanceOf: createInstanceTypeChecker,
            node: createNodeChecker(),
            objectOf: createObjectOfTypeChecker,
            oneOf: createEnumTypeChecker,
            oneOfType: createUnionTypeChecker,
            shape: createShapeTypeChecker
          };
          function createChainableTypeChecker(validate) {
            function checkType(isRequired, props, propName, componentName, location, propFullName) {
              componentName = componentName || ANONYMOUS;
              propFullName = propFullName || propName;
              if (props[propName] == null) {
                var locationName = ReactPropTypeLocationNames[location];
                if (isRequired) {
                  return new Error('Required ' + locationName + ' `' + propFullName + '` was not specified in ' + ('`' + componentName + '`.'));
                }
                return null;
              } else {
                return validate(props, propName, componentName, location, propFullName);
              }
            }
            var chainedCheckType = checkType.bind(null, false);
            chainedCheckType.isRequired = checkType.bind(null, true);
            return chainedCheckType;
          }
          function createPrimitiveTypeChecker(expectedType) {
            function validate(props, propName, componentName, location, propFullName) {
              var propValue = props[propName];
              var propType = getPropType(propValue);
              if (propType !== expectedType) {
                var locationName = ReactPropTypeLocationNames[location];
                var preciseType = getPreciseType(propValue);
                return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
              }
              return null;
            }
            return createChainableTypeChecker(validate);
          }
          function createAnyTypeChecker() {
            return createChainableTypeChecker(emptyFunction.thatReturns(null));
          }
          function createArrayOfTypeChecker(typeChecker) {
            function validate(props, propName, componentName, location, propFullName) {
              var propValue = props[propName];
              if (!Array.isArray(propValue)) {
                var locationName = ReactPropTypeLocationNames[location];
                var propType = getPropType(propValue);
                return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
              }
              for (var i = 0; i < propValue.length; i++) {
                var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']');
                if (error instanceof Error) {
                  return error;
                }
              }
              return null;
            }
            return createChainableTypeChecker(validate);
          }
          function createElementTypeChecker() {
            function validate(props, propName, componentName, location, propFullName) {
              if (!ReactElement.isValidElement(props[propName])) {
                var locationName = ReactPropTypeLocationNames[location];
                return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a single ReactElement.'));
              }
              return null;
            }
            return createChainableTypeChecker(validate);
          }
          function createInstanceTypeChecker(expectedClass) {
            function validate(props, propName, componentName, location, propFullName) {
              if (!(props[propName] instanceof expectedClass)) {
                var locationName = ReactPropTypeLocationNames[location];
                var expectedClassName = expectedClass.name || ANONYMOUS;
                var actualClassName = getClassName(props[propName]);
                return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
              }
              return null;
            }
            return createChainableTypeChecker(validate);
          }
          function createEnumTypeChecker(expectedValues) {
            if (!Array.isArray(expectedValues)) {
              return createChainableTypeChecker(function() {
                return new Error('Invalid argument supplied to oneOf, expected an instance of array.');
              });
            }
            function validate(props, propName, componentName, location, propFullName) {
              var propValue = props[propName];
              for (var i = 0; i < expectedValues.length; i++) {
                if (propValue === expectedValues[i]) {
                  return null;
                }
              }
              var locationName = ReactPropTypeLocationNames[location];
              var valuesString = JSON.stringify(expectedValues);
              return new Error('Invalid ' + locationName + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
            }
            return createChainableTypeChecker(validate);
          }
          function createObjectOfTypeChecker(typeChecker) {
            function validate(props, propName, componentName, location, propFullName) {
              var propValue = props[propName];
              var propType = getPropType(propValue);
              if (propType !== 'object') {
                var locationName = ReactPropTypeLocationNames[location];
                return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
              }
              for (var key in propValue) {
                if (propValue.hasOwnProperty(key)) {
                  var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key);
                  if (error instanceof Error) {
                    return error;
                  }
                }
              }
              return null;
            }
            return createChainableTypeChecker(validate);
          }
          function createUnionTypeChecker(arrayOfTypeCheckers) {
            if (!Array.isArray(arrayOfTypeCheckers)) {
              return createChainableTypeChecker(function() {
                return new Error('Invalid argument supplied to oneOfType, expected an instance of array.');
              });
            }
            function validate(props, propName, componentName, location, propFullName) {
              for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
                var checker = arrayOfTypeCheckers[i];
                if (checker(props, propName, componentName, location, propFullName) == null) {
                  return null;
                }
              }
              var locationName = ReactPropTypeLocationNames[location];
              return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
            }
            return createChainableTypeChecker(validate);
          }
          function createNodeChecker() {
            function validate(props, propName, componentName, location, propFullName) {
              if (!isNode(props[propName])) {
                var locationName = ReactPropTypeLocationNames[location];
                return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
              }
              return null;
            }
            return createChainableTypeChecker(validate);
          }
          function createShapeTypeChecker(shapeTypes) {
            function validate(props, propName, componentName, location, propFullName) {
              var propValue = props[propName];
              var propType = getPropType(propValue);
              if (propType !== 'object') {
                var locationName = ReactPropTypeLocationNames[location];
                return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
              }
              for (var key in shapeTypes) {
                var checker = shapeTypes[key];
                if (!checker) {
                  continue;
                }
                var error = checker(propValue, key, componentName, location, propFullName + '.' + key);
                if (error) {
                  return error;
                }
              }
              return null;
            }
            return createChainableTypeChecker(validate);
          }
          function isNode(propValue) {
            switch (typeof propValue) {
              case 'number':
              case 'string':
              case 'undefined':
                return true;
              case 'boolean':
                return !propValue;
              case 'object':
                if (Array.isArray(propValue)) {
                  return propValue.every(isNode);
                }
                if (propValue === null || ReactElement.isValidElement(propValue)) {
                  return true;
                }
                var iteratorFn = getIteratorFn(propValue);
                if (iteratorFn) {
                  var iterator = iteratorFn.call(propValue);
                  var step;
                  if (iteratorFn !== propValue.entries) {
                    while (!(step = iterator.next()).done) {
                      if (!isNode(step.value)) {
                        return false;
                      }
                    }
                  } else {
                    while (!(step = iterator.next()).done) {
                      var entry = step.value;
                      if (entry) {
                        if (!isNode(entry[1])) {
                          return false;
                        }
                      }
                    }
                  }
                } else {
                  return false;
                }
                return true;
              default:
                return false;
            }
          }
          function getPropType(propValue) {
            var propType = typeof propValue;
            if (Array.isArray(propValue)) {
              return 'array';
            }
            if (propValue instanceof RegExp) {
              return 'object';
            }
            return propType;
          }
          function getPreciseType(propValue) {
            var propType = getPropType(propValue);
            if (propType === 'object') {
              if (propValue instanceof Date) {
                return 'date';
              } else if (propValue instanceof RegExp) {
                return 'regexp';
              }
            }
            return propType;
          }
          function getClassName(propValue) {
            if (!propValue.constructor || !propValue.constructor.name) {
              return '<<anonymous>>';
            }
            return propValue.constructor.name;
          }
          module.exports = ReactPropTypes;
        }, {
          "115": 115,
          "136": 136,
          "52": 52,
          "72": 72
        }],
        75: [function(_dereq_, module, exports) {
          'use strict';
          var CallbackQueue = _dereq_(6);
          var PooledClass = _dereq_(24);
          var ReactBrowserEventEmitter = _dereq_(26);
          var ReactDOMFeatureFlags = _dereq_(39);
          var ReactInputSelection = _dereq_(60);
          var Transaction = _dereq_(100);
          var assign = _dereq_(23);
          var SELECTION_RESTORATION = {
            initialize: ReactInputSelection.getSelectionInformation,
            close: ReactInputSelection.restoreSelection
          };
          var EVENT_SUPPRESSION = {
            initialize: function() {
              var currentlyEnabled = ReactBrowserEventEmitter.isEnabled();
              ReactBrowserEventEmitter.setEnabled(false);
              return currentlyEnabled;
            },
            close: function(previouslyEnabled) {
              ReactBrowserEventEmitter.setEnabled(previouslyEnabled);
            }
          };
          var ON_DOM_READY_QUEUEING = {
            initialize: function() {
              this.reactMountReady.reset();
            },
            close: function() {
              this.reactMountReady.notifyAll();
            }
          };
          var TRANSACTION_WRAPPERS = [SELECTION_RESTORATION, EVENT_SUPPRESSION, ON_DOM_READY_QUEUEING];
          function ReactReconcileTransaction(forceHTML) {
            this.reinitializeTransaction();
            this.renderToStaticMarkup = false;
            this.reactMountReady = CallbackQueue.getPooled(null);
            this.useCreateElement = !forceHTML && ReactDOMFeatureFlags.useCreateElement;
          }
          var Mixin = {
            getTransactionWrappers: function() {
              return TRANSACTION_WRAPPERS;
            },
            getReactMountReady: function() {
              return this.reactMountReady;
            },
            destructor: function() {
              CallbackQueue.release(this.reactMountReady);
              this.reactMountReady = null;
            }
          };
          assign(ReactReconcileTransaction.prototype, Transaction.Mixin, Mixin);
          PooledClass.addPoolingTo(ReactReconcileTransaction);
          module.exports = ReactReconcileTransaction;
        }, {
          "100": 100,
          "23": 23,
          "24": 24,
          "26": 26,
          "39": 39,
          "6": 6,
          "60": 60
        }],
        76: [function(_dereq_, module, exports) {
          'use strict';
          var ReactRef = _dereq_(77);
          function attachRefs() {
            ReactRef.attachRefs(this, this._currentElement);
          }
          var ReactReconciler = {
            mountComponent: function(internalInstance, rootID, transaction, context) {
              var markup = internalInstance.mountComponent(rootID, transaction, context);
              if (internalInstance._currentElement && internalInstance._currentElement.ref != null) {
                transaction.getReactMountReady().enqueue(attachRefs, internalInstance);
              }
              return markup;
            },
            unmountComponent: function(internalInstance) {
              ReactRef.detachRefs(internalInstance, internalInstance._currentElement);
              internalInstance.unmountComponent();
            },
            receiveComponent: function(internalInstance, nextElement, transaction, context) {
              var prevElement = internalInstance._currentElement;
              if (nextElement === prevElement && context === internalInstance._context) {
                return;
              }
              var refsChanged = ReactRef.shouldUpdateRefs(prevElement, nextElement);
              if (refsChanged) {
                ReactRef.detachRefs(internalInstance, prevElement);
              }
              internalInstance.receiveComponent(nextElement, transaction, context);
              if (refsChanged && internalInstance._currentElement && internalInstance._currentElement.ref != null) {
                transaction.getReactMountReady().enqueue(attachRefs, internalInstance);
              }
            },
            performUpdateIfNecessary: function(internalInstance, transaction) {
              internalInstance.performUpdateIfNecessary(transaction);
            }
          };
          module.exports = ReactReconciler;
        }, {"77": 77}],
        77: [function(_dereq_, module, exports) {
          'use strict';
          var ReactOwner = _dereq_(70);
          var ReactRef = {};
          function attachRef(ref, component, owner) {
            if (typeof ref === 'function') {
              ref(component.getPublicInstance());
            } else {
              ReactOwner.addComponentAsRefTo(component, ref, owner);
            }
          }
          function detachRef(ref, component, owner) {
            if (typeof ref === 'function') {
              ref(null);
            } else {
              ReactOwner.removeComponentAsRefFrom(component, ref, owner);
            }
          }
          ReactRef.attachRefs = function(instance, element) {
            if (element === null || element === false) {
              return;
            }
            var ref = element.ref;
            if (ref != null) {
              attachRef(ref, instance, element._owner);
            }
          };
          ReactRef.shouldUpdateRefs = function(prevElement, nextElement) {
            var prevEmpty = prevElement === null || prevElement === false;
            var nextEmpty = nextElement === null || nextElement === false;
            return (prevEmpty || nextEmpty || nextElement._owner !== prevElement._owner || nextElement.ref !== prevElement.ref);
          };
          ReactRef.detachRefs = function(instance, element) {
            if (element === null || element === false) {
              return;
            }
            var ref = element.ref;
            if (ref != null) {
              detachRef(ref, instance, element._owner);
            }
          };
          module.exports = ReactRef;
        }, {"70": 70}],
        78: [function(_dereq_, module, exports) {
          'use strict';
          var ReactRootIndexInjection = {injectCreateReactRootIndex: function(_createReactRootIndex) {
              ReactRootIndex.createReactRootIndex = _createReactRootIndex;
            }};
          var ReactRootIndex = {
            createReactRootIndex: null,
            injection: ReactRootIndexInjection
          };
          module.exports = ReactRootIndex;
        }, {}],
        79: [function(_dereq_, module, exports) {
          'use strict';
          var ReactServerBatchingStrategy = {
            isBatchingUpdates: false,
            batchedUpdates: function(callback) {}
          };
          module.exports = ReactServerBatchingStrategy;
        }, {}],
        80: [function(_dereq_, module, exports) {
          'use strict';
          var ReactDefaultBatchingStrategy = _dereq_(48);
          var ReactElement = _dereq_(52);
          var ReactInstanceHandles = _dereq_(61);
          var ReactMarkupChecksum = _dereq_(64);
          var ReactServerBatchingStrategy = _dereq_(79);
          var ReactServerRenderingTransaction = _dereq_(81);
          var ReactUpdates = _dereq_(83);
          var emptyObject = _dereq_(137);
          var instantiateReactComponent = _dereq_(118);
          var invariant = _dereq_(144);
          function renderToString(element) {
            !ReactElement.isValidElement(element) ? "development" !== 'production' ? invariant(false, 'renderToString(): You must pass a valid ReactElement.') : invariant(false) : undefined;
            var transaction;
            try {
              ReactUpdates.injection.injectBatchingStrategy(ReactServerBatchingStrategy);
              var id = ReactInstanceHandles.createReactRootID();
              transaction = ReactServerRenderingTransaction.getPooled(false);
              return transaction.perform(function() {
                var componentInstance = instantiateReactComponent(element, null);
                var markup = componentInstance.mountComponent(id, transaction, emptyObject);
                return ReactMarkupChecksum.addChecksumToMarkup(markup);
              }, null);
            } finally {
              ReactServerRenderingTransaction.release(transaction);
              ReactUpdates.injection.injectBatchingStrategy(ReactDefaultBatchingStrategy);
            }
          }
          function renderToStaticMarkup(element) {
            !ReactElement.isValidElement(element) ? "development" !== 'production' ? invariant(false, 'renderToStaticMarkup(): You must pass a valid ReactElement.') : invariant(false) : undefined;
            var transaction;
            try {
              ReactUpdates.injection.injectBatchingStrategy(ReactServerBatchingStrategy);
              var id = ReactInstanceHandles.createReactRootID();
              transaction = ReactServerRenderingTransaction.getPooled(true);
              return transaction.perform(function() {
                var componentInstance = instantiateReactComponent(element, null);
                return componentInstance.mountComponent(id, transaction, emptyObject);
              }, null);
            } finally {
              ReactServerRenderingTransaction.release(transaction);
              ReactUpdates.injection.injectBatchingStrategy(ReactDefaultBatchingStrategy);
            }
          }
          module.exports = {
            renderToString: renderToString,
            renderToStaticMarkup: renderToStaticMarkup
          };
        }, {
          "118": 118,
          "137": 137,
          "144": 144,
          "48": 48,
          "52": 52,
          "61": 61,
          "64": 64,
          "79": 79,
          "81": 81,
          "83": 83
        }],
        81: [function(_dereq_, module, exports) {
          'use strict';
          var PooledClass = _dereq_(24);
          var CallbackQueue = _dereq_(6);
          var Transaction = _dereq_(100);
          var assign = _dereq_(23);
          var emptyFunction = _dereq_(136);
          var ON_DOM_READY_QUEUEING = {
            initialize: function() {
              this.reactMountReady.reset();
            },
            close: emptyFunction
          };
          var TRANSACTION_WRAPPERS = [ON_DOM_READY_QUEUEING];
          function ReactServerRenderingTransaction(renderToStaticMarkup) {
            this.reinitializeTransaction();
            this.renderToStaticMarkup = renderToStaticMarkup;
            this.reactMountReady = CallbackQueue.getPooled(null);
            this.useCreateElement = false;
          }
          var Mixin = {
            getTransactionWrappers: function() {
              return TRANSACTION_WRAPPERS;
            },
            getReactMountReady: function() {
              return this.reactMountReady;
            },
            destructor: function() {
              CallbackQueue.release(this.reactMountReady);
              this.reactMountReady = null;
            }
          };
          assign(ReactServerRenderingTransaction.prototype, Transaction.Mixin, Mixin);
          PooledClass.addPoolingTo(ReactServerRenderingTransaction);
          module.exports = ReactServerRenderingTransaction;
        }, {
          "100": 100,
          "136": 136,
          "23": 23,
          "24": 24,
          "6": 6
        }],
        82: [function(_dereq_, module, exports) {
          'use strict';
          var ReactCurrentOwner = _dereq_(34);
          var ReactElement = _dereq_(52);
          var ReactInstanceMap = _dereq_(62);
          var ReactUpdates = _dereq_(83);
          var assign = _dereq_(23);
          var invariant = _dereq_(144);
          var warning = _dereq_(155);
          function enqueueUpdate(internalInstance) {
            ReactUpdates.enqueueUpdate(internalInstance);
          }
          function getInternalInstanceReadyForUpdate(publicInstance, callerName) {
            var internalInstance = ReactInstanceMap.get(publicInstance);
            if (!internalInstance) {
              if ("development" !== 'production') {
                "development" !== 'production' ? warning(!callerName, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, publicInstance.constructor.displayName) : undefined;
              }
              return null;
            }
            if ("development" !== 'production') {
              "development" !== 'production' ? warning(ReactCurrentOwner.current == null, '%s(...): Cannot update during an existing state transition ' + '(such as within `render`). Render methods should be a pure function ' + 'of props and state.', callerName) : undefined;
            }
            return internalInstance;
          }
          var ReactUpdateQueue = {
            isMounted: function(publicInstance) {
              if ("development" !== 'production') {
                var owner = ReactCurrentOwner.current;
                if (owner !== null) {
                  "development" !== 'production' ? warning(owner._warnedAboutRefsInRender, '%s is accessing isMounted inside its render() function. ' + 'render() should be a pure function of props and state. It should ' + 'never access something that requires stale data from the previous ' + 'render, such as refs. Move this logic to componentDidMount and ' + 'componentDidUpdate instead.', owner.getName() || 'A component') : undefined;
                  owner._warnedAboutRefsInRender = true;
                }
              }
              var internalInstance = ReactInstanceMap.get(publicInstance);
              if (internalInstance) {
                return !!internalInstance._renderedComponent;
              } else {
                return false;
              }
            },
            enqueueCallback: function(publicInstance, callback) {
              !(typeof callback === 'function') ? "development" !== 'production' ? invariant(false, 'enqueueCallback(...): You called `setProps`, `replaceProps`, ' + '`setState`, `replaceState`, or `forceUpdate` with a callback that ' + 'isn\'t callable.') : invariant(false) : undefined;
              var internalInstance = getInternalInstanceReadyForUpdate(publicInstance);
              if (!internalInstance) {
                return null;
              }
              if (internalInstance._pendingCallbacks) {
                internalInstance._pendingCallbacks.push(callback);
              } else {
                internalInstance._pendingCallbacks = [callback];
              }
              enqueueUpdate(internalInstance);
            },
            enqueueCallbackInternal: function(internalInstance, callback) {
              !(typeof callback === 'function') ? "development" !== 'production' ? invariant(false, 'enqueueCallback(...): You called `setProps`, `replaceProps`, ' + '`setState`, `replaceState`, or `forceUpdate` with a callback that ' + 'isn\'t callable.') : invariant(false) : undefined;
              if (internalInstance._pendingCallbacks) {
                internalInstance._pendingCallbacks.push(callback);
              } else {
                internalInstance._pendingCallbacks = [callback];
              }
              enqueueUpdate(internalInstance);
            },
            enqueueForceUpdate: function(publicInstance) {
              var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'forceUpdate');
              if (!internalInstance) {
                return;
              }
              internalInstance._pendingForceUpdate = true;
              enqueueUpdate(internalInstance);
            },
            enqueueReplaceState: function(publicInstance, completeState) {
              var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'replaceState');
              if (!internalInstance) {
                return;
              }
              internalInstance._pendingStateQueue = [completeState];
              internalInstance._pendingReplaceState = true;
              enqueueUpdate(internalInstance);
            },
            enqueueSetState: function(publicInstance, partialState) {
              var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'setState');
              if (!internalInstance) {
                return;
              }
              var queue = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue = []);
              queue.push(partialState);
              enqueueUpdate(internalInstance);
            },
            enqueueSetProps: function(publicInstance, partialProps) {
              var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'setProps');
              if (!internalInstance) {
                return;
              }
              ReactUpdateQueue.enqueueSetPropsInternal(internalInstance, partialProps);
            },
            enqueueSetPropsInternal: function(internalInstance, partialProps) {
              var topLevelWrapper = internalInstance._topLevelWrapper;
              !topLevelWrapper ? "development" !== 'production' ? invariant(false, 'setProps(...): You called `setProps` on a ' + 'component with a parent. This is an anti-pattern since props will ' + 'get reactively updated when rendered. Instead, change the owner\'s ' + '`render` method to pass the correct value as props to the component ' + 'where it is created.') : invariant(false) : undefined;
              var wrapElement = topLevelWrapper._pendingElement || topLevelWrapper._currentElement;
              var element = wrapElement.props;
              var props = assign({}, element.props, partialProps);
              topLevelWrapper._pendingElement = ReactElement.cloneAndReplaceProps(wrapElement, ReactElement.cloneAndReplaceProps(element, props));
              enqueueUpdate(topLevelWrapper);
            },
            enqueueReplaceProps: function(publicInstance, props) {
              var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'replaceProps');
              if (!internalInstance) {
                return;
              }
              ReactUpdateQueue.enqueueReplacePropsInternal(internalInstance, props);
            },
            enqueueReplacePropsInternal: function(internalInstance, props) {
              var topLevelWrapper = internalInstance._topLevelWrapper;
              !topLevelWrapper ? "development" !== 'production' ? invariant(false, 'replaceProps(...): You called `replaceProps` on a ' + 'component with a parent. This is an anti-pattern since props will ' + 'get reactively updated when rendered. Instead, change the owner\'s ' + '`render` method to pass the correct value as props to the component ' + 'where it is created.') : invariant(false) : undefined;
              var wrapElement = topLevelWrapper._pendingElement || topLevelWrapper._currentElement;
              var element = wrapElement.props;
              topLevelWrapper._pendingElement = ReactElement.cloneAndReplaceProps(wrapElement, ReactElement.cloneAndReplaceProps(element, props));
              enqueueUpdate(topLevelWrapper);
            },
            enqueueElementInternal: function(internalInstance, newElement) {
              internalInstance._pendingElement = newElement;
              enqueueUpdate(internalInstance);
            }
          };
          module.exports = ReactUpdateQueue;
        }, {
          "144": 144,
          "155": 155,
          "23": 23,
          "34": 34,
          "52": 52,
          "62": 62,
          "83": 83
        }],
        83: [function(_dereq_, module, exports) {
          'use strict';
          var CallbackQueue = _dereq_(6);
          var PooledClass = _dereq_(24);
          var ReactPerf = _dereq_(71);
          var ReactReconciler = _dereq_(76);
          var Transaction = _dereq_(100);
          var assign = _dereq_(23);
          var invariant = _dereq_(144);
          var dirtyComponents = [];
          var asapCallbackQueue = CallbackQueue.getPooled();
          var asapEnqueued = false;
          var batchingStrategy = null;
          function ensureInjected() {
            !(ReactUpdates.ReactReconcileTransaction && batchingStrategy) ? "development" !== 'production' ? invariant(false, 'ReactUpdates: must inject a reconcile transaction class and batching ' + 'strategy') : invariant(false) : undefined;
          }
          var NESTED_UPDATES = {
            initialize: function() {
              this.dirtyComponentsLength = dirtyComponents.length;
            },
            close: function() {
              if (this.dirtyComponentsLength !== dirtyComponents.length) {
                dirtyComponents.splice(0, this.dirtyComponentsLength);
                flushBatchedUpdates();
              } else {
                dirtyComponents.length = 0;
              }
            }
          };
          var UPDATE_QUEUEING = {
            initialize: function() {
              this.callbackQueue.reset();
            },
            close: function() {
              this.callbackQueue.notifyAll();
            }
          };
          var TRANSACTION_WRAPPERS = [NESTED_UPDATES, UPDATE_QUEUEING];
          function ReactUpdatesFlushTransaction() {
            this.reinitializeTransaction();
            this.dirtyComponentsLength = null;
            this.callbackQueue = CallbackQueue.getPooled();
            this.reconcileTransaction = ReactUpdates.ReactReconcileTransaction.getPooled(false);
          }
          assign(ReactUpdatesFlushTransaction.prototype, Transaction.Mixin, {
            getTransactionWrappers: function() {
              return TRANSACTION_WRAPPERS;
            },
            destructor: function() {
              this.dirtyComponentsLength = null;
              CallbackQueue.release(this.callbackQueue);
              this.callbackQueue = null;
              ReactUpdates.ReactReconcileTransaction.release(this.reconcileTransaction);
              this.reconcileTransaction = null;
            },
            perform: function(method, scope, a) {
              return Transaction.Mixin.perform.call(this, this.reconcileTransaction.perform, this.reconcileTransaction, method, scope, a);
            }
          });
          PooledClass.addPoolingTo(ReactUpdatesFlushTransaction);
          function batchedUpdates(callback, a, b, c, d, e) {
            ensureInjected();
            batchingStrategy.batchedUpdates(callback, a, b, c, d, e);
          }
          function mountOrderComparator(c1, c2) {
            return c1._mountOrder - c2._mountOrder;
          }
          function runBatchedUpdates(transaction) {
            var len = transaction.dirtyComponentsLength;
            !(len === dirtyComponents.length) ? "development" !== 'production' ? invariant(false, 'Expected flush transaction\'s stored dirty-components length (%s) to ' + 'match dirty-components array length (%s).', len, dirtyComponents.length) : invariant(false) : undefined;
            dirtyComponents.sort(mountOrderComparator);
            for (var i = 0; i < len; i++) {
              var component = dirtyComponents[i];
              var callbacks = component._pendingCallbacks;
              component._pendingCallbacks = null;
              ReactReconciler.performUpdateIfNecessary(component, transaction.reconcileTransaction);
              if (callbacks) {
                for (var j = 0; j < callbacks.length; j++) {
                  transaction.callbackQueue.enqueue(callbacks[j], component.getPublicInstance());
                }
              }
            }
          }
          var flushBatchedUpdates = function() {
            while (dirtyComponents.length || asapEnqueued) {
              if (dirtyComponents.length) {
                var transaction = ReactUpdatesFlushTransaction.getPooled();
                transaction.perform(runBatchedUpdates, null, transaction);
                ReactUpdatesFlushTransaction.release(transaction);
              }
              if (asapEnqueued) {
                asapEnqueued = false;
                var queue = asapCallbackQueue;
                asapCallbackQueue = CallbackQueue.getPooled();
                queue.notifyAll();
                CallbackQueue.release(queue);
              }
            }
          };
          flushBatchedUpdates = ReactPerf.measure('ReactUpdates', 'flushBatchedUpdates', flushBatchedUpdates);
          function enqueueUpdate(component) {
            ensureInjected();
            if (!batchingStrategy.isBatchingUpdates) {
              batchingStrategy.batchedUpdates(enqueueUpdate, component);
              return;
            }
            dirtyComponents.push(component);
          }
          function asap(callback, context) {
            !batchingStrategy.isBatchingUpdates ? "development" !== 'production' ? invariant(false, 'ReactUpdates.asap: Can\'t enqueue an asap callback in a context where' + 'updates are not being batched.') : invariant(false) : undefined;
            asapCallbackQueue.enqueue(callback, context);
            asapEnqueued = true;
          }
          var ReactUpdatesInjection = {
            injectReconcileTransaction: function(ReconcileTransaction) {
              !ReconcileTransaction ? "development" !== 'production' ? invariant(false, 'ReactUpdates: must provide a reconcile transaction class') : invariant(false) : undefined;
              ReactUpdates.ReactReconcileTransaction = ReconcileTransaction;
            },
            injectBatchingStrategy: function(_batchingStrategy) {
              !_batchingStrategy ? "development" !== 'production' ? invariant(false, 'ReactUpdates: must provide a batching strategy') : invariant(false) : undefined;
              !(typeof _batchingStrategy.batchedUpdates === 'function') ? "development" !== 'production' ? invariant(false, 'ReactUpdates: must provide a batchedUpdates() function') : invariant(false) : undefined;
              !(typeof _batchingStrategy.isBatchingUpdates === 'boolean') ? "development" !== 'production' ? invariant(false, 'ReactUpdates: must provide an isBatchingUpdates boolean attribute') : invariant(false) : undefined;
              batchingStrategy = _batchingStrategy;
            }
          };
          var ReactUpdates = {
            ReactReconcileTransaction: null,
            batchedUpdates: batchedUpdates,
            enqueueUpdate: enqueueUpdate,
            flushBatchedUpdates: flushBatchedUpdates,
            injection: ReactUpdatesInjection,
            asap: asap
          };
          module.exports = ReactUpdates;
        }, {
          "100": 100,
          "144": 144,
          "23": 23,
          "24": 24,
          "6": 6,
          "71": 71,
          "76": 76
        }],
        84: [function(_dereq_, module, exports) {
          'use strict';
          module.exports = '0.14.2';
        }, {}],
        85: [function(_dereq_, module, exports) {
          'use strict';
          var DOMProperty = _dereq_(10);
          var MUST_USE_ATTRIBUTE = DOMProperty.injection.MUST_USE_ATTRIBUTE;
          var NS = {
            xlink: 'http://www.w3.org/1999/xlink',
            xml: 'http://www.w3.org/XML/1998/namespace'
          };
          var SVGDOMPropertyConfig = {
            Properties: {
              clipPath: MUST_USE_ATTRIBUTE,
              cx: MUST_USE_ATTRIBUTE,
              cy: MUST_USE_ATTRIBUTE,
              d: MUST_USE_ATTRIBUTE,
              dx: MUST_USE_ATTRIBUTE,
              dy: MUST_USE_ATTRIBUTE,
              fill: MUST_USE_ATTRIBUTE,
              fillOpacity: MUST_USE_ATTRIBUTE,
              fontFamily: MUST_USE_ATTRIBUTE,
              fontSize: MUST_USE_ATTRIBUTE,
              fx: MUST_USE_ATTRIBUTE,
              fy: MUST_USE_ATTRIBUTE,
              gradientTransform: MUST_USE_ATTRIBUTE,
              gradientUnits: MUST_USE_ATTRIBUTE,
              markerEnd: MUST_USE_ATTRIBUTE,
              markerMid: MUST_USE_ATTRIBUTE,
              markerStart: MUST_USE_ATTRIBUTE,
              offset: MUST_USE_ATTRIBUTE,
              opacity: MUST_USE_ATTRIBUTE,
              patternContentUnits: MUST_USE_ATTRIBUTE,
              patternUnits: MUST_USE_ATTRIBUTE,
              points: MUST_USE_ATTRIBUTE,
              preserveAspectRatio: MUST_USE_ATTRIBUTE,
              r: MUST_USE_ATTRIBUTE,
              rx: MUST_USE_ATTRIBUTE,
              ry: MUST_USE_ATTRIBUTE,
              spreadMethod: MUST_USE_ATTRIBUTE,
              stopColor: MUST_USE_ATTRIBUTE,
              stopOpacity: MUST_USE_ATTRIBUTE,
              stroke: MUST_USE_ATTRIBUTE,
              strokeDasharray: MUST_USE_ATTRIBUTE,
              strokeLinecap: MUST_USE_ATTRIBUTE,
              strokeOpacity: MUST_USE_ATTRIBUTE,
              strokeWidth: MUST_USE_ATTRIBUTE,
              textAnchor: MUST_USE_ATTRIBUTE,
              transform: MUST_USE_ATTRIBUTE,
              version: MUST_USE_ATTRIBUTE,
              viewBox: MUST_USE_ATTRIBUTE,
              x1: MUST_USE_ATTRIBUTE,
              x2: MUST_USE_ATTRIBUTE,
              x: MUST_USE_ATTRIBUTE,
              xlinkActuate: MUST_USE_ATTRIBUTE,
              xlinkArcrole: MUST_USE_ATTRIBUTE,
              xlinkHref: MUST_USE_ATTRIBUTE,
              xlinkRole: MUST_USE_ATTRIBUTE,
              xlinkShow: MUST_USE_ATTRIBUTE,
              xlinkTitle: MUST_USE_ATTRIBUTE,
              xlinkType: MUST_USE_ATTRIBUTE,
              xmlBase: MUST_USE_ATTRIBUTE,
              xmlLang: MUST_USE_ATTRIBUTE,
              xmlSpace: MUST_USE_ATTRIBUTE,
              y1: MUST_USE_ATTRIBUTE,
              y2: MUST_USE_ATTRIBUTE,
              y: MUST_USE_ATTRIBUTE
            },
            DOMAttributeNamespaces: {
              xlinkActuate: NS.xlink,
              xlinkArcrole: NS.xlink,
              xlinkHref: NS.xlink,
              xlinkRole: NS.xlink,
              xlinkShow: NS.xlink,
              xlinkTitle: NS.xlink,
              xlinkType: NS.xlink,
              xmlBase: NS.xml,
              xmlLang: NS.xml,
              xmlSpace: NS.xml
            },
            DOMAttributeNames: {
              clipPath: 'clip-path',
              fillOpacity: 'fill-opacity',
              fontFamily: 'font-family',
              fontSize: 'font-size',
              gradientTransform: 'gradientTransform',
              gradientUnits: 'gradientUnits',
              markerEnd: 'marker-end',
              markerMid: 'marker-mid',
              markerStart: 'marker-start',
              patternContentUnits: 'patternContentUnits',
              patternUnits: 'patternUnits',
              preserveAspectRatio: 'preserveAspectRatio',
              spreadMethod: 'spreadMethod',
              stopColor: 'stop-color',
              stopOpacity: 'stop-opacity',
              strokeDasharray: 'stroke-dasharray',
              strokeLinecap: 'stroke-linecap',
              strokeOpacity: 'stroke-opacity',
              strokeWidth: 'stroke-width',
              textAnchor: 'text-anchor',
              viewBox: 'viewBox',
              xlinkActuate: 'xlink:actuate',
              xlinkArcrole: 'xlink:arcrole',
              xlinkHref: 'xlink:href',
              xlinkRole: 'xlink:role',
              xlinkShow: 'xlink:show',
              xlinkTitle: 'xlink:title',
              xlinkType: 'xlink:type',
              xmlBase: 'xml:base',
              xmlLang: 'xml:lang',
              xmlSpace: 'xml:space'
            }
          };
          module.exports = SVGDOMPropertyConfig;
        }, {"10": 10}],
        86: [function(_dereq_, module, exports) {
          'use strict';
          var EventConstants = _dereq_(15);
          var EventPropagators = _dereq_(19);
          var ExecutionEnvironment = _dereq_(130);
          var ReactInputSelection = _dereq_(60);
          var SyntheticEvent = _dereq_(92);
          var getActiveElement = _dereq_(139);
          var isTextInputElement = _dereq_(120);
          var keyOf = _dereq_(148);
          var shallowEqual = _dereq_(153);
          var topLevelTypes = EventConstants.topLevelTypes;
          var skipSelectionChangeEvent = ExecutionEnvironment.canUseDOM && 'documentMode' in document && document.documentMode <= 11;
          var eventTypes = {select: {
              phasedRegistrationNames: {
                bubbled: keyOf({onSelect: null}),
                captured: keyOf({onSelectCapture: null})
              },
              dependencies: [topLevelTypes.topBlur, topLevelTypes.topContextMenu, topLevelTypes.topFocus, topLevelTypes.topKeyDown, topLevelTypes.topMouseDown, topLevelTypes.topMouseUp, topLevelTypes.topSelectionChange]
            }};
          var activeElement = null;
          var activeElementID = null;
          var lastSelection = null;
          var mouseDown = false;
          var hasListener = false;
          var ON_SELECT_KEY = keyOf({onSelect: null});
          function getSelection(node) {
            if ('selectionStart' in node && ReactInputSelection.hasSelectionCapabilities(node)) {
              return {
                start: node.selectionStart,
                end: node.selectionEnd
              };
            } else if (window.getSelection) {
              var selection = window.getSelection();
              return {
                anchorNode: selection.anchorNode,
                anchorOffset: selection.anchorOffset,
                focusNode: selection.focusNode,
                focusOffset: selection.focusOffset
              };
            } else if (document.selection) {
              var range = document.selection.createRange();
              return {
                parentElement: range.parentElement(),
                text: range.text,
                top: range.boundingTop,
                left: range.boundingLeft
              };
            }
          }
          function constructSelectEvent(nativeEvent, nativeEventTarget) {
            if (mouseDown || activeElement == null || activeElement !== getActiveElement()) {
              return null;
            }
            var currentSelection = getSelection(activeElement);
            if (!lastSelection || !shallowEqual(lastSelection, currentSelection)) {
              lastSelection = currentSelection;
              var syntheticEvent = SyntheticEvent.getPooled(eventTypes.select, activeElementID, nativeEvent, nativeEventTarget);
              syntheticEvent.type = 'select';
              syntheticEvent.target = activeElement;
              EventPropagators.accumulateTwoPhaseDispatches(syntheticEvent);
              return syntheticEvent;
            }
            return null;
          }
          var SelectEventPlugin = {
            eventTypes: eventTypes,
            extractEvents: function(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
              if (!hasListener) {
                return null;
              }
              switch (topLevelType) {
                case topLevelTypes.topFocus:
                  if (isTextInputElement(topLevelTarget) || topLevelTarget.contentEditable === 'true') {
                    activeElement = topLevelTarget;
                    activeElementID = topLevelTargetID;
                    lastSelection = null;
                  }
                  break;
                case topLevelTypes.topBlur:
                  activeElement = null;
                  activeElementID = null;
                  lastSelection = null;
                  break;
                case topLevelTypes.topMouseDown:
                  mouseDown = true;
                  break;
                case topLevelTypes.topContextMenu:
                case topLevelTypes.topMouseUp:
                  mouseDown = false;
                  return constructSelectEvent(nativeEvent, nativeEventTarget);
                case topLevelTypes.topSelectionChange:
                  if (skipSelectionChangeEvent) {
                    break;
                  }
                case topLevelTypes.topKeyDown:
                case topLevelTypes.topKeyUp:
                  return constructSelectEvent(nativeEvent, nativeEventTarget);
              }
              return null;
            },
            didPutListener: function(id, registrationName, listener) {
              if (registrationName === ON_SELECT_KEY) {
                hasListener = true;
              }
            }
          };
          module.exports = SelectEventPlugin;
        }, {
          "120": 120,
          "130": 130,
          "139": 139,
          "148": 148,
          "15": 15,
          "153": 153,
          "19": 19,
          "60": 60,
          "92": 92
        }],
        87: [function(_dereq_, module, exports) {
          'use strict';
          var GLOBAL_MOUNT_POINT_MAX = Math.pow(2, 53);
          var ServerReactRootIndex = {createReactRootIndex: function() {
              return Math.ceil(Math.random() * GLOBAL_MOUNT_POINT_MAX);
            }};
          module.exports = ServerReactRootIndex;
        }, {}],
        88: [function(_dereq_, module, exports) {
          'use strict';
          var EventConstants = _dereq_(15);
          var EventListener = _dereq_(129);
          var EventPropagators = _dereq_(19);
          var ReactMount = _dereq_(65);
          var SyntheticClipboardEvent = _dereq_(89);
          var SyntheticEvent = _dereq_(92);
          var SyntheticFocusEvent = _dereq_(93);
          var SyntheticKeyboardEvent = _dereq_(95);
          var SyntheticMouseEvent = _dereq_(96);
          var SyntheticDragEvent = _dereq_(91);
          var SyntheticTouchEvent = _dereq_(97);
          var SyntheticUIEvent = _dereq_(98);
          var SyntheticWheelEvent = _dereq_(99);
          var emptyFunction = _dereq_(136);
          var getEventCharCode = _dereq_(111);
          var invariant = _dereq_(144);
          var keyOf = _dereq_(148);
          var topLevelTypes = EventConstants.topLevelTypes;
          var eventTypes = {
            abort: {phasedRegistrationNames: {
                bubbled: keyOf({onAbort: true}),
                captured: keyOf({onAbortCapture: true})
              }},
            blur: {phasedRegistrationNames: {
                bubbled: keyOf({onBlur: true}),
                captured: keyOf({onBlurCapture: true})
              }},
            canPlay: {phasedRegistrationNames: {
                bubbled: keyOf({onCanPlay: true}),
                captured: keyOf({onCanPlayCapture: true})
              }},
            canPlayThrough: {phasedRegistrationNames: {
                bubbled: keyOf({onCanPlayThrough: true}),
                captured: keyOf({onCanPlayThroughCapture: true})
              }},
            click: {phasedRegistrationNames: {
                bubbled: keyOf({onClick: true}),
                captured: keyOf({onClickCapture: true})
              }},
            contextMenu: {phasedRegistrationNames: {
                bubbled: keyOf({onContextMenu: true}),
                captured: keyOf({onContextMenuCapture: true})
              }},
            copy: {phasedRegistrationNames: {
                bubbled: keyOf({onCopy: true}),
                captured: keyOf({onCopyCapture: true})
              }},
            cut: {phasedRegistrationNames: {
                bubbled: keyOf({onCut: true}),
                captured: keyOf({onCutCapture: true})
              }},
            doubleClick: {phasedRegistrationNames: {
                bubbled: keyOf({onDoubleClick: true}),
                captured: keyOf({onDoubleClickCapture: true})
              }},
            drag: {phasedRegistrationNames: {
                bubbled: keyOf({onDrag: true}),
                captured: keyOf({onDragCapture: true})
              }},
            dragEnd: {phasedRegistrationNames: {
                bubbled: keyOf({onDragEnd: true}),
                captured: keyOf({onDragEndCapture: true})
              }},
            dragEnter: {phasedRegistrationNames: {
                bubbled: keyOf({onDragEnter: true}),
                captured: keyOf({onDragEnterCapture: true})
              }},
            dragExit: {phasedRegistrationNames: {
                bubbled: keyOf({onDragExit: true}),
                captured: keyOf({onDragExitCapture: true})
              }},
            dragLeave: {phasedRegistrationNames: {
                bubbled: keyOf({onDragLeave: true}),
                captured: keyOf({onDragLeaveCapture: true})
              }},
            dragOver: {phasedRegistrationNames: {
                bubbled: keyOf({onDragOver: true}),
                captured: keyOf({onDragOverCapture: true})
              }},
            dragStart: {phasedRegistrationNames: {
                bubbled: keyOf({onDragStart: true}),
                captured: keyOf({onDragStartCapture: true})
              }},
            drop: {phasedRegistrationNames: {
                bubbled: keyOf({onDrop: true}),
                captured: keyOf({onDropCapture: true})
              }},
            durationChange: {phasedRegistrationNames: {
                bubbled: keyOf({onDurationChange: true}),
                captured: keyOf({onDurationChangeCapture: true})
              }},
            emptied: {phasedRegistrationNames: {
                bubbled: keyOf({onEmptied: true}),
                captured: keyOf({onEmptiedCapture: true})
              }},
            encrypted: {phasedRegistrationNames: {
                bubbled: keyOf({onEncrypted: true}),
                captured: keyOf({onEncryptedCapture: true})
              }},
            ended: {phasedRegistrationNames: {
                bubbled: keyOf({onEnded: true}),
                captured: keyOf({onEndedCapture: true})
              }},
            error: {phasedRegistrationNames: {
                bubbled: keyOf({onError: true}),
                captured: keyOf({onErrorCapture: true})
              }},
            focus: {phasedRegistrationNames: {
                bubbled: keyOf({onFocus: true}),
                captured: keyOf({onFocusCapture: true})
              }},
            input: {phasedRegistrationNames: {
                bubbled: keyOf({onInput: true}),
                captured: keyOf({onInputCapture: true})
              }},
            keyDown: {phasedRegistrationNames: {
                bubbled: keyOf({onKeyDown: true}),
                captured: keyOf({onKeyDownCapture: true})
              }},
            keyPress: {phasedRegistrationNames: {
                bubbled: keyOf({onKeyPress: true}),
                captured: keyOf({onKeyPressCapture: true})
              }},
            keyUp: {phasedRegistrationNames: {
                bubbled: keyOf({onKeyUp: true}),
                captured: keyOf({onKeyUpCapture: true})
              }},
            load: {phasedRegistrationNames: {
                bubbled: keyOf({onLoad: true}),
                captured: keyOf({onLoadCapture: true})
              }},
            loadedData: {phasedRegistrationNames: {
                bubbled: keyOf({onLoadedData: true}),
                captured: keyOf({onLoadedDataCapture: true})
              }},
            loadedMetadata: {phasedRegistrationNames: {
                bubbled: keyOf({onLoadedMetadata: true}),
                captured: keyOf({onLoadedMetadataCapture: true})
              }},
            loadStart: {phasedRegistrationNames: {
                bubbled: keyOf({onLoadStart: true}),
                captured: keyOf({onLoadStartCapture: true})
              }},
            mouseDown: {phasedRegistrationNames: {
                bubbled: keyOf({onMouseDown: true}),
                captured: keyOf({onMouseDownCapture: true})
              }},
            mouseMove: {phasedRegistrationNames: {
                bubbled: keyOf({onMouseMove: true}),
                captured: keyOf({onMouseMoveCapture: true})
              }},
            mouseOut: {phasedRegistrationNames: {
                bubbled: keyOf({onMouseOut: true}),
                captured: keyOf({onMouseOutCapture: true})
              }},
            mouseOver: {phasedRegistrationNames: {
                bubbled: keyOf({onMouseOver: true}),
                captured: keyOf({onMouseOverCapture: true})
              }},
            mouseUp: {phasedRegistrationNames: {
                bubbled: keyOf({onMouseUp: true}),
                captured: keyOf({onMouseUpCapture: true})
              }},
            paste: {phasedRegistrationNames: {
                bubbled: keyOf({onPaste: true}),
                captured: keyOf({onPasteCapture: true})
              }},
            pause: {phasedRegistrationNames: {
                bubbled: keyOf({onPause: true}),
                captured: keyOf({onPauseCapture: true})
              }},
            play: {phasedRegistrationNames: {
                bubbled: keyOf({onPlay: true}),
                captured: keyOf({onPlayCapture: true})
              }},
            playing: {phasedRegistrationNames: {
                bubbled: keyOf({onPlaying: true}),
                captured: keyOf({onPlayingCapture: true})
              }},
            progress: {phasedRegistrationNames: {
                bubbled: keyOf({onProgress: true}),
                captured: keyOf({onProgressCapture: true})
              }},
            rateChange: {phasedRegistrationNames: {
                bubbled: keyOf({onRateChange: true}),
                captured: keyOf({onRateChangeCapture: true})
              }},
            reset: {phasedRegistrationNames: {
                bubbled: keyOf({onReset: true}),
                captured: keyOf({onResetCapture: true})
              }},
            scroll: {phasedRegistrationNames: {
                bubbled: keyOf({onScroll: true}),
                captured: keyOf({onScrollCapture: true})
              }},
            seeked: {phasedRegistrationNames: {
                bubbled: keyOf({onSeeked: true}),
                captured: keyOf({onSeekedCapture: true})
              }},
            seeking: {phasedRegistrationNames: {
                bubbled: keyOf({onSeeking: true}),
                captured: keyOf({onSeekingCapture: true})
              }},
            stalled: {phasedRegistrationNames: {
                bubbled: keyOf({onStalled: true}),
                captured: keyOf({onStalledCapture: true})
              }},
            submit: {phasedRegistrationNames: {
                bubbled: keyOf({onSubmit: true}),
                captured: keyOf({onSubmitCapture: true})
              }},
            suspend: {phasedRegistrationNames: {
                bubbled: keyOf({onSuspend: true}),
                captured: keyOf({onSuspendCapture: true})
              }},
            timeUpdate: {phasedRegistrationNames: {
                bubbled: keyOf({onTimeUpdate: true}),
                captured: keyOf({onTimeUpdateCapture: true})
              }},
            touchCancel: {phasedRegistrationNames: {
                bubbled: keyOf({onTouchCancel: true}),
                captured: keyOf({onTouchCancelCapture: true})
              }},
            touchEnd: {phasedRegistrationNames: {
                bubbled: keyOf({onTouchEnd: true}),
                captured: keyOf({onTouchEndCapture: true})
              }},
            touchMove: {phasedRegistrationNames: {
                bubbled: keyOf({onTouchMove: true}),
                captured: keyOf({onTouchMoveCapture: true})
              }},
            touchStart: {phasedRegistrationNames: {
                bubbled: keyOf({onTouchStart: true}),
                captured: keyOf({onTouchStartCapture: true})
              }},
            volumeChange: {phasedRegistrationNames: {
                bubbled: keyOf({onVolumeChange: true}),
                captured: keyOf({onVolumeChangeCapture: true})
              }},
            waiting: {phasedRegistrationNames: {
                bubbled: keyOf({onWaiting: true}),
                captured: keyOf({onWaitingCapture: true})
              }},
            wheel: {phasedRegistrationNames: {
                bubbled: keyOf({onWheel: true}),
                captured: keyOf({onWheelCapture: true})
              }}
          };
          var topLevelEventsToDispatchConfig = {
            topAbort: eventTypes.abort,
            topBlur: eventTypes.blur,
            topCanPlay: eventTypes.canPlay,
            topCanPlayThrough: eventTypes.canPlayThrough,
            topClick: eventTypes.click,
            topContextMenu: eventTypes.contextMenu,
            topCopy: eventTypes.copy,
            topCut: eventTypes.cut,
            topDoubleClick: eventTypes.doubleClick,
            topDrag: eventTypes.drag,
            topDragEnd: eventTypes.dragEnd,
            topDragEnter: eventTypes.dragEnter,
            topDragExit: eventTypes.dragExit,
            topDragLeave: eventTypes.dragLeave,
            topDragOver: eventTypes.dragOver,
            topDragStart: eventTypes.dragStart,
            topDrop: eventTypes.drop,
            topDurationChange: eventTypes.durationChange,
            topEmptied: eventTypes.emptied,
            topEncrypted: eventTypes.encrypted,
            topEnded: eventTypes.ended,
            topError: eventTypes.error,
            topFocus: eventTypes.focus,
            topInput: eventTypes.input,
            topKeyDown: eventTypes.keyDown,
            topKeyPress: eventTypes.keyPress,
            topKeyUp: eventTypes.keyUp,
            topLoad: eventTypes.load,
            topLoadedData: eventTypes.loadedData,
            topLoadedMetadata: eventTypes.loadedMetadata,
            topLoadStart: eventTypes.loadStart,
            topMouseDown: eventTypes.mouseDown,
            topMouseMove: eventTypes.mouseMove,
            topMouseOut: eventTypes.mouseOut,
            topMouseOver: eventTypes.mouseOver,
            topMouseUp: eventTypes.mouseUp,
            topPaste: eventTypes.paste,
            topPause: eventTypes.pause,
            topPlay: eventTypes.play,
            topPlaying: eventTypes.playing,
            topProgress: eventTypes.progress,
            topRateChange: eventTypes.rateChange,
            topReset: eventTypes.reset,
            topScroll: eventTypes.scroll,
            topSeeked: eventTypes.seeked,
            topSeeking: eventTypes.seeking,
            topStalled: eventTypes.stalled,
            topSubmit: eventTypes.submit,
            topSuspend: eventTypes.suspend,
            topTimeUpdate: eventTypes.timeUpdate,
            topTouchCancel: eventTypes.touchCancel,
            topTouchEnd: eventTypes.touchEnd,
            topTouchMove: eventTypes.touchMove,
            topTouchStart: eventTypes.touchStart,
            topVolumeChange: eventTypes.volumeChange,
            topWaiting: eventTypes.waiting,
            topWheel: eventTypes.wheel
          };
          for (var type in topLevelEventsToDispatchConfig) {
            topLevelEventsToDispatchConfig[type].dependencies = [type];
          }
          var ON_CLICK_KEY = keyOf({onClick: null});
          var onClickListeners = {};
          var SimpleEventPlugin = {
            eventTypes: eventTypes,
            extractEvents: function(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent, nativeEventTarget) {
              var dispatchConfig = topLevelEventsToDispatchConfig[topLevelType];
              if (!dispatchConfig) {
                return null;
              }
              var EventConstructor;
              switch (topLevelType) {
                case topLevelTypes.topAbort:
                case topLevelTypes.topCanPlay:
                case topLevelTypes.topCanPlayThrough:
                case topLevelTypes.topDurationChange:
                case topLevelTypes.topEmptied:
                case topLevelTypes.topEncrypted:
                case topLevelTypes.topEnded:
                case topLevelTypes.topError:
                case topLevelTypes.topInput:
                case topLevelTypes.topLoad:
                case topLevelTypes.topLoadedData:
                case topLevelTypes.topLoadedMetadata:
                case topLevelTypes.topLoadStart:
                case topLevelTypes.topPause:
                case topLevelTypes.topPlay:
                case topLevelTypes.topPlaying:
                case topLevelTypes.topProgress:
                case topLevelTypes.topRateChange:
                case topLevelTypes.topReset:
                case topLevelTypes.topSeeked:
                case topLevelTypes.topSeeking:
                case topLevelTypes.topStalled:
                case topLevelTypes.topSubmit:
                case topLevelTypes.topSuspend:
                case topLevelTypes.topTimeUpdate:
                case topLevelTypes.topVolumeChange:
                case topLevelTypes.topWaiting:
                  EventConstructor = SyntheticEvent;
                  break;
                case topLevelTypes.topKeyPress:
                  if (getEventCharCode(nativeEvent) === 0) {
                    return null;
                  }
                case topLevelTypes.topKeyDown:
                case topLevelTypes.topKeyUp:
                  EventConstructor = SyntheticKeyboardEvent;
                  break;
                case topLevelTypes.topBlur:
                case topLevelTypes.topFocus:
                  EventConstructor = SyntheticFocusEvent;
                  break;
                case topLevelTypes.topClick:
                  if (nativeEvent.button === 2) {
                    return null;
                  }
                case topLevelTypes.topContextMenu:
                case topLevelTypes.topDoubleClick:
                case topLevelTypes.topMouseDown:
                case topLevelTypes.topMouseMove:
                case topLevelTypes.topMouseOut:
                case topLevelTypes.topMouseOver:
                case topLevelTypes.topMouseUp:
                  EventConstructor = SyntheticMouseEvent;
                  break;
                case topLevelTypes.topDrag:
                case topLevelTypes.topDragEnd:
                case topLevelTypes.topDragEnter:
                case topLevelTypes.topDragExit:
                case topLevelTypes.topDragLeave:
                case topLevelTypes.topDragOver:
                case topLevelTypes.topDragStart:
                case topLevelTypes.topDrop:
                  EventConstructor = SyntheticDragEvent;
                  break;
                case topLevelTypes.topTouchCancel:
                case topLevelTypes.topTouchEnd:
                case topLevelTypes.topTouchMove:
                case topLevelTypes.topTouchStart:
                  EventConstructor = SyntheticTouchEvent;
                  break;
                case topLevelTypes.topScroll:
                  EventConstructor = SyntheticUIEvent;
                  break;
                case topLevelTypes.topWheel:
                  EventConstructor = SyntheticWheelEvent;
                  break;
                case topLevelTypes.topCopy:
                case topLevelTypes.topCut:
                case topLevelTypes.topPaste:
                  EventConstructor = SyntheticClipboardEvent;
                  break;
              }
              !EventConstructor ? "development" !== 'production' ? invariant(false, 'SimpleEventPlugin: Unhandled event type, `%s`.', topLevelType) : invariant(false) : undefined;
              var event = EventConstructor.getPooled(dispatchConfig, topLevelTargetID, nativeEvent, nativeEventTarget);
              EventPropagators.accumulateTwoPhaseDispatches(event);
              return event;
            },
            didPutListener: function(id, registrationName, listener) {
              if (registrationName === ON_CLICK_KEY) {
                var node = ReactMount.getNode(id);
                if (!onClickListeners[id]) {
                  onClickListeners[id] = EventListener.listen(node, 'click', emptyFunction);
                }
              }
            },
            willDeleteListener: function(id, registrationName) {
              if (registrationName === ON_CLICK_KEY) {
                onClickListeners[id].remove();
                delete onClickListeners[id];
              }
            }
          };
          module.exports = SimpleEventPlugin;
        }, {
          "111": 111,
          "129": 129,
          "136": 136,
          "144": 144,
          "148": 148,
          "15": 15,
          "19": 19,
          "65": 65,
          "89": 89,
          "91": 91,
          "92": 92,
          "93": 93,
          "95": 95,
          "96": 96,
          "97": 97,
          "98": 98,
          "99": 99
        }],
        89: [function(_dereq_, module, exports) {
          'use strict';
          var SyntheticEvent = _dereq_(92);
          var ClipboardEventInterface = {clipboardData: function(event) {
              return 'clipboardData' in event ? event.clipboardData : window.clipboardData;
            }};
          function SyntheticClipboardEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
            SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
          }
          SyntheticEvent.augmentClass(SyntheticClipboardEvent, ClipboardEventInterface);
          module.exports = SyntheticClipboardEvent;
        }, {"92": 92}],
        90: [function(_dereq_, module, exports) {
          'use strict';
          var SyntheticEvent = _dereq_(92);
          var CompositionEventInterface = {data: null};
          function SyntheticCompositionEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
            SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
          }
          SyntheticEvent.augmentClass(SyntheticCompositionEvent, CompositionEventInterface);
          module.exports = SyntheticCompositionEvent;
        }, {"92": 92}],
        91: [function(_dereq_, module, exports) {
          'use strict';
          var SyntheticMouseEvent = _dereq_(96);
          var DragEventInterface = {dataTransfer: null};
          function SyntheticDragEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
            SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
          }
          SyntheticMouseEvent.augmentClass(SyntheticDragEvent, DragEventInterface);
          module.exports = SyntheticDragEvent;
        }, {"96": 96}],
        92: [function(_dereq_, module, exports) {
          'use strict';
          var PooledClass = _dereq_(24);
          var assign = _dereq_(23);
          var emptyFunction = _dereq_(136);
          var warning = _dereq_(155);
          var EventInterface = {
            type: null,
            currentTarget: emptyFunction.thatReturnsNull,
            eventPhase: null,
            bubbles: null,
            cancelable: null,
            timeStamp: function(event) {
              return event.timeStamp || Date.now();
            },
            defaultPrevented: null,
            isTrusted: null
          };
          function SyntheticEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
            this.dispatchConfig = dispatchConfig;
            this.dispatchMarker = dispatchMarker;
            this.nativeEvent = nativeEvent;
            this.target = nativeEventTarget;
            this.currentTarget = nativeEventTarget;
            var Interface = this.constructor.Interface;
            for (var propName in Interface) {
              if (!Interface.hasOwnProperty(propName)) {
                continue;
              }
              var normalize = Interface[propName];
              if (normalize) {
                this[propName] = normalize(nativeEvent);
              } else {
                this[propName] = nativeEvent[propName];
              }
            }
            var defaultPrevented = nativeEvent.defaultPrevented != null ? nativeEvent.defaultPrevented : nativeEvent.returnValue === false;
            if (defaultPrevented) {
              this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
            } else {
              this.isDefaultPrevented = emptyFunction.thatReturnsFalse;
            }
            this.isPropagationStopped = emptyFunction.thatReturnsFalse;
          }
          assign(SyntheticEvent.prototype, {
            preventDefault: function() {
              this.defaultPrevented = true;
              var event = this.nativeEvent;
              if ("development" !== 'production') {
                "development" !== 'production' ? warning(event, 'This synthetic event is reused for performance reasons. If you\'re ' + 'seeing this, you\'re calling `preventDefault` on a ' + 'released/nullified synthetic event. This is a no-op. See ' + 'https://fb.me/react-event-pooling for more information.') : undefined;
              }
              if (!event) {
                return;
              }
              if (event.preventDefault) {
                event.preventDefault();
              } else {
                event.returnValue = false;
              }
              this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
            },
            stopPropagation: function() {
              var event = this.nativeEvent;
              if ("development" !== 'production') {
                "development" !== 'production' ? warning(event, 'This synthetic event is reused for performance reasons. If you\'re ' + 'seeing this, you\'re calling `stopPropagation` on a ' + 'released/nullified synthetic event. This is a no-op. See ' + 'https://fb.me/react-event-pooling for more information.') : undefined;
              }
              if (!event) {
                return;
              }
              if (event.stopPropagation) {
                event.stopPropagation();
              } else {
                event.cancelBubble = true;
              }
              this.isPropagationStopped = emptyFunction.thatReturnsTrue;
            },
            persist: function() {
              this.isPersistent = emptyFunction.thatReturnsTrue;
            },
            isPersistent: emptyFunction.thatReturnsFalse,
            destructor: function() {
              var Interface = this.constructor.Interface;
              for (var propName in Interface) {
                this[propName] = null;
              }
              this.dispatchConfig = null;
              this.dispatchMarker = null;
              this.nativeEvent = null;
            }
          });
          SyntheticEvent.Interface = EventInterface;
          SyntheticEvent.augmentClass = function(Class, Interface) {
            var Super = this;
            var prototype = Object.create(Super.prototype);
            assign(prototype, Class.prototype);
            Class.prototype = prototype;
            Class.prototype.constructor = Class;
            Class.Interface = assign({}, Super.Interface, Interface);
            Class.augmentClass = Super.augmentClass;
            PooledClass.addPoolingTo(Class, PooledClass.fourArgumentPooler);
          };
          PooledClass.addPoolingTo(SyntheticEvent, PooledClass.fourArgumentPooler);
          module.exports = SyntheticEvent;
        }, {
          "136": 136,
          "155": 155,
          "23": 23,
          "24": 24
        }],
        93: [function(_dereq_, module, exports) {
          'use strict';
          var SyntheticUIEvent = _dereq_(98);
          var FocusEventInterface = {relatedTarget: null};
          function SyntheticFocusEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
            SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
          }
          SyntheticUIEvent.augmentClass(SyntheticFocusEvent, FocusEventInterface);
          module.exports = SyntheticFocusEvent;
        }, {"98": 98}],
        94: [function(_dereq_, module, exports) {
          'use strict';
          var SyntheticEvent = _dereq_(92);
          var InputEventInterface = {data: null};
          function SyntheticInputEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
            SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
          }
          SyntheticEvent.augmentClass(SyntheticInputEvent, InputEventInterface);
          module.exports = SyntheticInputEvent;
        }, {"92": 92}],
        95: [function(_dereq_, module, exports) {
          'use strict';
          var SyntheticUIEvent = _dereq_(98);
          var getEventCharCode = _dereq_(111);
          var getEventKey = _dereq_(112);
          var getEventModifierState = _dereq_(113);
          var KeyboardEventInterface = {
            key: getEventKey,
            location: null,
            ctrlKey: null,
            shiftKey: null,
            altKey: null,
            metaKey: null,
            repeat: null,
            locale: null,
            getModifierState: getEventModifierState,
            charCode: function(event) {
              if (event.type === 'keypress') {
                return getEventCharCode(event);
              }
              return 0;
            },
            keyCode: function(event) {
              if (event.type === 'keydown' || event.type === 'keyup') {
                return event.keyCode;
              }
              return 0;
            },
            which: function(event) {
              if (event.type === 'keypress') {
                return getEventCharCode(event);
              }
              if (event.type === 'keydown' || event.type === 'keyup') {
                return event.keyCode;
              }
              return 0;
            }
          };
          function SyntheticKeyboardEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
            SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
          }
          SyntheticUIEvent.augmentClass(SyntheticKeyboardEvent, KeyboardEventInterface);
          module.exports = SyntheticKeyboardEvent;
        }, {
          "111": 111,
          "112": 112,
          "113": 113,
          "98": 98
        }],
        96: [function(_dereq_, module, exports) {
          'use strict';
          var SyntheticUIEvent = _dereq_(98);
          var ViewportMetrics = _dereq_(101);
          var getEventModifierState = _dereq_(113);
          var MouseEventInterface = {
            screenX: null,
            screenY: null,
            clientX: null,
            clientY: null,
            ctrlKey: null,
            shiftKey: null,
            altKey: null,
            metaKey: null,
            getModifierState: getEventModifierState,
            button: function(event) {
              var button = event.button;
              if ('which' in event) {
                return button;
              }
              return button === 2 ? 2 : button === 4 ? 1 : 0;
            },
            buttons: null,
            relatedTarget: function(event) {
              return event.relatedTarget || (event.fromElement === event.srcElement ? event.toElement : event.fromElement);
            },
            pageX: function(event) {
              return 'pageX' in event ? event.pageX : event.clientX + ViewportMetrics.currentScrollLeft;
            },
            pageY: function(event) {
              return 'pageY' in event ? event.pageY : event.clientY + ViewportMetrics.currentScrollTop;
            }
          };
          function SyntheticMouseEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
            SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
          }
          SyntheticUIEvent.augmentClass(SyntheticMouseEvent, MouseEventInterface);
          module.exports = SyntheticMouseEvent;
        }, {
          "101": 101,
          "113": 113,
          "98": 98
        }],
        97: [function(_dereq_, module, exports) {
          'use strict';
          var SyntheticUIEvent = _dereq_(98);
          var getEventModifierState = _dereq_(113);
          var TouchEventInterface = {
            touches: null,
            targetTouches: null,
            changedTouches: null,
            altKey: null,
            metaKey: null,
            ctrlKey: null,
            shiftKey: null,
            getModifierState: getEventModifierState
          };
          function SyntheticTouchEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
            SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
          }
          SyntheticUIEvent.augmentClass(SyntheticTouchEvent, TouchEventInterface);
          module.exports = SyntheticTouchEvent;
        }, {
          "113": 113,
          "98": 98
        }],
        98: [function(_dereq_, module, exports) {
          'use strict';
          var SyntheticEvent = _dereq_(92);
          var getEventTarget = _dereq_(114);
          var UIEventInterface = {
            view: function(event) {
              if (event.view) {
                return event.view;
              }
              var target = getEventTarget(event);
              if (target != null && target.window === target) {
                return target;
              }
              var doc = target.ownerDocument;
              if (doc) {
                return doc.defaultView || doc.parentWindow;
              } else {
                return window;
              }
            },
            detail: function(event) {
              return event.detail || 0;
            }
          };
          function SyntheticUIEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
            SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
          }
          SyntheticEvent.augmentClass(SyntheticUIEvent, UIEventInterface);
          module.exports = SyntheticUIEvent;
        }, {
          "114": 114,
          "92": 92
        }],
        99: [function(_dereq_, module, exports) {
          'use strict';
          var SyntheticMouseEvent = _dereq_(96);
          var WheelEventInterface = {
            deltaX: function(event) {
              return 'deltaX' in event ? event.deltaX : 'wheelDeltaX' in event ? -event.wheelDeltaX : 0;
            },
            deltaY: function(event) {
              return 'deltaY' in event ? event.deltaY : 'wheelDeltaY' in event ? -event.wheelDeltaY : 'wheelDelta' in event ? -event.wheelDelta : 0;
            },
            deltaZ: null,
            deltaMode: null
          };
          function SyntheticWheelEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
            SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
          }
          SyntheticMouseEvent.augmentClass(SyntheticWheelEvent, WheelEventInterface);
          module.exports = SyntheticWheelEvent;
        }, {"96": 96}],
        100: [function(_dereq_, module, exports) {
          'use strict';
          var invariant = _dereq_(144);
          var Mixin = {
            reinitializeTransaction: function() {
              this.transactionWrappers = this.getTransactionWrappers();
              if (this.wrapperInitData) {
                this.wrapperInitData.length = 0;
              } else {
                this.wrapperInitData = [];
              }
              this._isInTransaction = false;
            },
            _isInTransaction: false,
            getTransactionWrappers: null,
            isInTransaction: function() {
              return !!this._isInTransaction;
            },
            perform: function(method, scope, a, b, c, d, e, f) {
              !!this.isInTransaction() ? "development" !== 'production' ? invariant(false, 'Transaction.perform(...): Cannot initialize a transaction when there ' + 'is already an outstanding transaction.') : invariant(false) : undefined;
              var errorThrown;
              var ret;
              try {
                this._isInTransaction = true;
                errorThrown = true;
                this.initializeAll(0);
                ret = method.call(scope, a, b, c, d, e, f);
                errorThrown = false;
              } finally {
                try {
                  if (errorThrown) {
                    try {
                      this.closeAll(0);
                    } catch (err) {}
                  } else {
                    this.closeAll(0);
                  }
                } finally {
                  this._isInTransaction = false;
                }
              }
              return ret;
            },
            initializeAll: function(startIndex) {
              var transactionWrappers = this.transactionWrappers;
              for (var i = startIndex; i < transactionWrappers.length; i++) {
                var wrapper = transactionWrappers[i];
                try {
                  this.wrapperInitData[i] = Transaction.OBSERVED_ERROR;
                  this.wrapperInitData[i] = wrapper.initialize ? wrapper.initialize.call(this) : null;
                } finally {
                  if (this.wrapperInitData[i] === Transaction.OBSERVED_ERROR) {
                    try {
                      this.initializeAll(i + 1);
                    } catch (err) {}
                  }
                }
              }
            },
            closeAll: function(startIndex) {
              !this.isInTransaction() ? "development" !== 'production' ? invariant(false, 'Transaction.closeAll(): Cannot close transaction when none are open.') : invariant(false) : undefined;
              var transactionWrappers = this.transactionWrappers;
              for (var i = startIndex; i < transactionWrappers.length; i++) {
                var wrapper = transactionWrappers[i];
                var initData = this.wrapperInitData[i];
                var errorThrown;
                try {
                  errorThrown = true;
                  if (initData !== Transaction.OBSERVED_ERROR && wrapper.close) {
                    wrapper.close.call(this, initData);
                  }
                  errorThrown = false;
                } finally {
                  if (errorThrown) {
                    try {
                      this.closeAll(i + 1);
                    } catch (e) {}
                  }
                }
              }
              this.wrapperInitData.length = 0;
            }
          };
          var Transaction = {
            Mixin: Mixin,
            OBSERVED_ERROR: {}
          };
          module.exports = Transaction;
        }, {"144": 144}],
        101: [function(_dereq_, module, exports) {
          'use strict';
          var ViewportMetrics = {
            currentScrollLeft: 0,
            currentScrollTop: 0,
            refreshScrollValues: function(scrollPosition) {
              ViewportMetrics.currentScrollLeft = scrollPosition.x;
              ViewportMetrics.currentScrollTop = scrollPosition.y;
            }
          };
          module.exports = ViewportMetrics;
        }, {}],
        102: [function(_dereq_, module, exports) {
          'use strict';
          var invariant = _dereq_(144);
          function accumulateInto(current, next) {
            !(next != null) ? "development" !== 'production' ? invariant(false, 'accumulateInto(...): Accumulated items must not be null or undefined.') : invariant(false) : undefined;
            if (current == null) {
              return next;
            }
            var currentIsArray = Array.isArray(current);
            var nextIsArray = Array.isArray(next);
            if (currentIsArray && nextIsArray) {
              current.push.apply(current, next);
              return current;
            }
            if (currentIsArray) {
              current.push(next);
              return current;
            }
            if (nextIsArray) {
              return [current].concat(next);
            }
            return [current, next];
          }
          module.exports = accumulateInto;
        }, {"144": 144}],
        103: [function(_dereq_, module, exports) {
          'use strict';
          var MOD = 65521;
          function adler32(data) {
            var a = 1;
            var b = 0;
            var i = 0;
            var l = data.length;
            var m = l & ~0x3;
            while (i < m) {
              for (; i < Math.min(i + 4096, m); i += 4) {
                b += (a += data.charCodeAt(i)) + (a += data.charCodeAt(i + 1)) + (a += data.charCodeAt(i + 2)) + (a += data.charCodeAt(i + 3));
              }
              a %= MOD;
              b %= MOD;
            }
            for (; i < l; i++) {
              b += a += data.charCodeAt(i);
            }
            a %= MOD;
            b %= MOD;
            return a | b << 16;
          }
          module.exports = adler32;
        }, {}],
        104: [function(_dereq_, module, exports) {
          'use strict';
          var canDefineProperty = false;
          if ("development" !== 'production') {
            try {
              Object.defineProperty({}, 'x', {get: function() {}});
              canDefineProperty = true;
            } catch (x) {}
          }
          module.exports = canDefineProperty;
        }, {}],
        105: [function(_dereq_, module, exports) {
          'use strict';
          var CSSProperty = _dereq_(4);
          var isUnitlessNumber = CSSProperty.isUnitlessNumber;
          function dangerousStyleValue(name, value) {
            var isEmpty = value == null || typeof value === 'boolean' || value === '';
            if (isEmpty) {
              return '';
            }
            var isNonNumeric = isNaN(value);
            if (isNonNumeric || value === 0 || isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name]) {
              return '' + value;
            }
            if (typeof value === 'string') {
              value = value.trim();
            }
            return value + 'px';
          }
          module.exports = dangerousStyleValue;
        }, {"4": 4}],
        106: [function(_dereq_, module, exports) {
          'use strict';
          var assign = _dereq_(23);
          var warning = _dereq_(155);
          function deprecated(fnName, newModule, newPackage, ctx, fn) {
            var warned = false;
            if ("development" !== 'production') {
              var newFn = function() {
                "development" !== 'production' ? warning(warned, 'React.%s is deprecated. Please use %s.%s from require' + '(\'%s\') ' + 'instead.', fnName, newModule, fnName, newPackage) : undefined;
                warned = true;
                return fn.apply(ctx, arguments);
              };
              return assign(newFn, fn);
            }
            return fn;
          }
          module.exports = deprecated;
        }, {
          "155": 155,
          "23": 23
        }],
        107: [function(_dereq_, module, exports) {
          'use strict';
          var ESCAPE_LOOKUP = {
            '&': '&amp;',
            '>': '&gt;',
            '<': '&lt;',
            '"': '&quot;',
            '\'': '&#x27;'
          };
          var ESCAPE_REGEX = /[&><"']/g;
          function escaper(match) {
            return ESCAPE_LOOKUP[match];
          }
          function escapeTextContentForBrowser(text) {
            return ('' + text).replace(ESCAPE_REGEX, escaper);
          }
          module.exports = escapeTextContentForBrowser;
        }, {}],
        108: [function(_dereq_, module, exports) {
          'use strict';
          var ReactCurrentOwner = _dereq_(34);
          var ReactInstanceMap = _dereq_(62);
          var ReactMount = _dereq_(65);
          var invariant = _dereq_(144);
          var warning = _dereq_(155);
          function findDOMNode(componentOrElement) {
            if ("development" !== 'production') {
              var owner = ReactCurrentOwner.current;
              if (owner !== null) {
                "development" !== 'production' ? warning(owner._warnedAboutRefsInRender, '%s is accessing getDOMNode or findDOMNode inside its render(). ' + 'render() should be a pure function of props and state. It should ' + 'never access something that requires stale data from the previous ' + 'render, such as refs. Move this logic to componentDidMount and ' + 'componentDidUpdate instead.', owner.getName() || 'A component') : undefined;
                owner._warnedAboutRefsInRender = true;
              }
            }
            if (componentOrElement == null) {
              return null;
            }
            if (componentOrElement.nodeType === 1) {
              return componentOrElement;
            }
            if (ReactInstanceMap.has(componentOrElement)) {
              return ReactMount.getNodeFromInstance(componentOrElement);
            }
            !(componentOrElement.render == null || typeof componentOrElement.render !== 'function') ? "development" !== 'production' ? invariant(false, 'findDOMNode was called on an unmounted component.') : invariant(false) : undefined;
            !false ? "development" !== 'production' ? invariant(false, 'Element appears to be neither ReactComponent nor DOMNode (keys: %s)', Object.keys(componentOrElement)) : invariant(false) : undefined;
          }
          module.exports = findDOMNode;
        }, {
          "144": 144,
          "155": 155,
          "34": 34,
          "62": 62,
          "65": 65
        }],
        109: [function(_dereq_, module, exports) {
          'use strict';
          var traverseAllChildren = _dereq_(127);
          var warning = _dereq_(155);
          function flattenSingleChildIntoContext(traverseContext, child, name) {
            var result = traverseContext;
            var keyUnique = result[name] === undefined;
            if ("development" !== 'production') {
              "development" !== 'production' ? warning(keyUnique, 'flattenChildren(...): Encountered two children with the same key, ' + '`%s`. Child keys must be unique; when two children share a key, only ' + 'the first child will be used.', name) : undefined;
            }
            if (keyUnique && child != null) {
              result[name] = child;
            }
          }
          function flattenChildren(children) {
            if (children == null) {
              return children;
            }
            var result = {};
            traverseAllChildren(children, flattenSingleChildIntoContext, result);
            return result;
          }
          module.exports = flattenChildren;
        }, {
          "127": 127,
          "155": 155
        }],
        110: [function(_dereq_, module, exports) {
          'use strict';
          var forEachAccumulated = function(arr, cb, scope) {
            if (Array.isArray(arr)) {
              arr.forEach(cb, scope);
            } else if (arr) {
              cb.call(scope, arr);
            }
          };
          module.exports = forEachAccumulated;
        }, {}],
        111: [function(_dereq_, module, exports) {
          'use strict';
          function getEventCharCode(nativeEvent) {
            var charCode;
            var keyCode = nativeEvent.keyCode;
            if ('charCode' in nativeEvent) {
              charCode = nativeEvent.charCode;
              if (charCode === 0 && keyCode === 13) {
                charCode = 13;
              }
            } else {
              charCode = keyCode;
            }
            if (charCode >= 32 || charCode === 13) {
              return charCode;
            }
            return 0;
          }
          module.exports = getEventCharCode;
        }, {}],
        112: [function(_dereq_, module, exports) {
          'use strict';
          var getEventCharCode = _dereq_(111);
          var normalizeKey = {
            'Esc': 'Escape',
            'Spacebar': ' ',
            'Left': 'ArrowLeft',
            'Up': 'ArrowUp',
            'Right': 'ArrowRight',
            'Down': 'ArrowDown',
            'Del': 'Delete',
            'Win': 'OS',
            'Menu': 'ContextMenu',
            'Apps': 'ContextMenu',
            'Scroll': 'ScrollLock',
            'MozPrintableKey': 'Unidentified'
          };
          var translateToKey = {
            8: 'Backspace',
            9: 'Tab',
            12: 'Clear',
            13: 'Enter',
            16: 'Shift',
            17: 'Control',
            18: 'Alt',
            19: 'Pause',
            20: 'CapsLock',
            27: 'Escape',
            32: ' ',
            33: 'PageUp',
            34: 'PageDown',
            35: 'End',
            36: 'Home',
            37: 'ArrowLeft',
            38: 'ArrowUp',
            39: 'ArrowRight',
            40: 'ArrowDown',
            45: 'Insert',
            46: 'Delete',
            112: 'F1',
            113: 'F2',
            114: 'F3',
            115: 'F4',
            116: 'F5',
            117: 'F6',
            118: 'F7',
            119: 'F8',
            120: 'F9',
            121: 'F10',
            122: 'F11',
            123: 'F12',
            144: 'NumLock',
            145: 'ScrollLock',
            224: 'Meta'
          };
          function getEventKey(nativeEvent) {
            if (nativeEvent.key) {
              var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
              if (key !== 'Unidentified') {
                return key;
              }
            }
            if (nativeEvent.type === 'keypress') {
              var charCode = getEventCharCode(nativeEvent);
              return charCode === 13 ? 'Enter' : String.fromCharCode(charCode);
            }
            if (nativeEvent.type === 'keydown' || nativeEvent.type === 'keyup') {
              return translateToKey[nativeEvent.keyCode] || 'Unidentified';
            }
            return '';
          }
          module.exports = getEventKey;
        }, {"111": 111}],
        113: [function(_dereq_, module, exports) {
          'use strict';
          var modifierKeyToProp = {
            'Alt': 'altKey',
            'Control': 'ctrlKey',
            'Meta': 'metaKey',
            'Shift': 'shiftKey'
          };
          function modifierStateGetter(keyArg) {
            var syntheticEvent = this;
            var nativeEvent = syntheticEvent.nativeEvent;
            if (nativeEvent.getModifierState) {
              return nativeEvent.getModifierState(keyArg);
            }
            var keyProp = modifierKeyToProp[keyArg];
            return keyProp ? !!nativeEvent[keyProp] : false;
          }
          function getEventModifierState(nativeEvent) {
            return modifierStateGetter;
          }
          module.exports = getEventModifierState;
        }, {}],
        114: [function(_dereq_, module, exports) {
          'use strict';
          function getEventTarget(nativeEvent) {
            var target = nativeEvent.target || nativeEvent.srcElement || window;
            return target.nodeType === 3 ? target.parentNode : target;
          }
          module.exports = getEventTarget;
        }, {}],
        115: [function(_dereq_, module, exports) {
          'use strict';
          var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
          var FAUX_ITERATOR_SYMBOL = '@@iterator';
          function getIteratorFn(maybeIterable) {
            var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
            if (typeof iteratorFn === 'function') {
              return iteratorFn;
            }
          }
          module.exports = getIteratorFn;
        }, {}],
        116: [function(_dereq_, module, exports) {
          'use strict';
          function getLeafNode(node) {
            while (node && node.firstChild) {
              node = node.firstChild;
            }
            return node;
          }
          function getSiblingNode(node) {
            while (node) {
              if (node.nextSibling) {
                return node.nextSibling;
              }
              node = node.parentNode;
            }
          }
          function getNodeForCharacterOffset(root, offset) {
            var node = getLeafNode(root);
            var nodeStart = 0;
            var nodeEnd = 0;
            while (node) {
              if (node.nodeType === 3) {
                nodeEnd = nodeStart + node.textContent.length;
                if (nodeStart <= offset && nodeEnd >= offset) {
                  return {
                    node: node,
                    offset: offset - nodeStart
                  };
                }
                nodeStart = nodeEnd;
              }
              node = getLeafNode(getSiblingNode(node));
            }
          }
          module.exports = getNodeForCharacterOffset;
        }, {}],
        117: [function(_dereq_, module, exports) {
          'use strict';
          var ExecutionEnvironment = _dereq_(130);
          var contentKey = null;
          function getTextContentAccessor() {
            if (!contentKey && ExecutionEnvironment.canUseDOM) {
              contentKey = 'textContent' in document.documentElement ? 'textContent' : 'innerText';
            }
            return contentKey;
          }
          module.exports = getTextContentAccessor;
        }, {"130": 130}],
        118: [function(_dereq_, module, exports) {
          'use strict';
          var ReactCompositeComponent = _dereq_(33);
          var ReactEmptyComponent = _dereq_(54);
          var ReactNativeComponent = _dereq_(68);
          var assign = _dereq_(23);
          var invariant = _dereq_(144);
          var warning = _dereq_(155);
          var ReactCompositeComponentWrapper = function() {};
          assign(ReactCompositeComponentWrapper.prototype, ReactCompositeComponent.Mixin, {_instantiateReactComponent: instantiateReactComponent});
          function getDeclarationErrorAddendum(owner) {
            if (owner) {
              var name = owner.getName();
              if (name) {
                return ' Check the render method of `' + name + '`.';
              }
            }
            return '';
          }
          function isInternalComponentType(type) {
            return typeof type === 'function' && typeof type.prototype !== 'undefined' && typeof type.prototype.mountComponent === 'function' && typeof type.prototype.receiveComponent === 'function';
          }
          function instantiateReactComponent(node) {
            var instance;
            if (node === null || node === false) {
              instance = new ReactEmptyComponent(instantiateReactComponent);
            } else if (typeof node === 'object') {
              var element = node;
              !(element && (typeof element.type === 'function' || typeof element.type === 'string')) ? "development" !== 'production' ? invariant(false, 'Element type is invalid: expected a string (for built-in components) ' + 'or a class/function (for composite components) but got: %s.%s', element.type == null ? element.type : typeof element.type, getDeclarationErrorAddendum(element._owner)) : invariant(false) : undefined;
              if (typeof element.type === 'string') {
                instance = ReactNativeComponent.createInternalComponent(element);
              } else if (isInternalComponentType(element.type)) {
                instance = new element.type(element);
              } else {
                instance = new ReactCompositeComponentWrapper();
              }
            } else if (typeof node === 'string' || typeof node === 'number') {
              instance = ReactNativeComponent.createInstanceForText(node);
            } else {
              !false ? "development" !== 'production' ? invariant(false, 'Encountered invalid React node of type %s', typeof node) : invariant(false) : undefined;
            }
            if ("development" !== 'production') {
              "development" !== 'production' ? warning(typeof instance.construct === 'function' && typeof instance.mountComponent === 'function' && typeof instance.receiveComponent === 'function' && typeof instance.unmountComponent === 'function', 'Only React Components can be mounted.') : undefined;
            }
            instance.construct(node);
            instance._mountIndex = 0;
            instance._mountImage = null;
            if ("development" !== 'production') {
              instance._isOwnerNecessary = false;
              instance._warnedAboutRefsInRender = false;
            }
            if ("development" !== 'production') {
              if (Object.preventExtensions) {
                Object.preventExtensions(instance);
              }
            }
            return instance;
          }
          module.exports = instantiateReactComponent;
        }, {
          "144": 144,
          "155": 155,
          "23": 23,
          "33": 33,
          "54": 54,
          "68": 68
        }],
        119: [function(_dereq_, module, exports) {
          'use strict';
          var ExecutionEnvironment = _dereq_(130);
          var useHasFeature;
          if (ExecutionEnvironment.canUseDOM) {
            useHasFeature = document.implementation && document.implementation.hasFeature && document.implementation.hasFeature('', '') !== true;
          }
          function isEventSupported(eventNameSuffix, capture) {
            if (!ExecutionEnvironment.canUseDOM || capture && !('addEventListener' in document)) {
              return false;
            }
            var eventName = 'on' + eventNameSuffix;
            var isSupported = (eventName in document);
            if (!isSupported) {
              var element = document.createElement('div');
              element.setAttribute(eventName, 'return;');
              isSupported = typeof element[eventName] === 'function';
            }
            if (!isSupported && useHasFeature && eventNameSuffix === 'wheel') {
              isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
            }
            return isSupported;
          }
          module.exports = isEventSupported;
        }, {"130": 130}],
        120: [function(_dereq_, module, exports) {
          'use strict';
          var supportedInputTypes = {
            'color': true,
            'date': true,
            'datetime': true,
            'datetime-local': true,
            'email': true,
            'month': true,
            'number': true,
            'password': true,
            'range': true,
            'search': true,
            'tel': true,
            'text': true,
            'time': true,
            'url': true,
            'week': true
          };
          function isTextInputElement(elem) {
            var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
            return nodeName && (nodeName === 'input' && supportedInputTypes[elem.type] || nodeName === 'textarea');
          }
          module.exports = isTextInputElement;
        }, {}],
        121: [function(_dereq_, module, exports) {
          'use strict';
          var ReactElement = _dereq_(52);
          var invariant = _dereq_(144);
          function onlyChild(children) {
            !ReactElement.isValidElement(children) ? "development" !== 'production' ? invariant(false, 'onlyChild must be passed a children with exactly one child.') : invariant(false) : undefined;
            return children;
          }
          module.exports = onlyChild;
        }, {
          "144": 144,
          "52": 52
        }],
        122: [function(_dereq_, module, exports) {
          'use strict';
          var escapeTextContentForBrowser = _dereq_(107);
          function quoteAttributeValueForBrowser(value) {
            return '"' + escapeTextContentForBrowser(value) + '"';
          }
          module.exports = quoteAttributeValueForBrowser;
        }, {"107": 107}],
        123: [function(_dereq_, module, exports) {
          'use strict';
          var ReactMount = _dereq_(65);
          module.exports = ReactMount.renderSubtreeIntoContainer;
        }, {"65": 65}],
        124: [function(_dereq_, module, exports) {
          'use strict';
          var ExecutionEnvironment = _dereq_(130);
          var WHITESPACE_TEST = /^[ \r\n\t\f]/;
          var NONVISIBLE_TEST = /<(!--|link|noscript|meta|script|style)[ \r\n\t\f\/>]/;
          var setInnerHTML = function(node, html) {
            node.innerHTML = html;
          };
          if (typeof MSApp !== 'undefined' && MSApp.execUnsafeLocalFunction) {
            setInnerHTML = function(node, html) {
              MSApp.execUnsafeLocalFunction(function() {
                node.innerHTML = html;
              });
            };
          }
          if (ExecutionEnvironment.canUseDOM) {
            var testElement = document.createElement('div');
            testElement.innerHTML = ' ';
            if (testElement.innerHTML === '') {
              setInnerHTML = function(node, html) {
                if (node.parentNode) {
                  node.parentNode.replaceChild(node, node);
                }
                if (WHITESPACE_TEST.test(html) || html[0] === '<' && NONVISIBLE_TEST.test(html)) {
                  node.innerHTML = String.fromCharCode(0xFEFF) + html;
                  var textNode = node.firstChild;
                  if (textNode.data.length === 1) {
                    node.removeChild(textNode);
                  } else {
                    textNode.deleteData(0, 1);
                  }
                } else {
                  node.innerHTML = html;
                }
              };
            }
          }
          module.exports = setInnerHTML;
        }, {"130": 130}],
        125: [function(_dereq_, module, exports) {
          'use strict';
          var ExecutionEnvironment = _dereq_(130);
          var escapeTextContentForBrowser = _dereq_(107);
          var setInnerHTML = _dereq_(124);
          var setTextContent = function(node, text) {
            node.textContent = text;
          };
          if (ExecutionEnvironment.canUseDOM) {
            if (!('textContent' in document.documentElement)) {
              setTextContent = function(node, text) {
                setInnerHTML(node, escapeTextContentForBrowser(text));
              };
            }
          }
          module.exports = setTextContent;
        }, {
          "107": 107,
          "124": 124,
          "130": 130
        }],
        126: [function(_dereq_, module, exports) {
          'use strict';
          function shouldUpdateReactComponent(prevElement, nextElement) {
            var prevEmpty = prevElement === null || prevElement === false;
            var nextEmpty = nextElement === null || nextElement === false;
            if (prevEmpty || nextEmpty) {
              return prevEmpty === nextEmpty;
            }
            var prevType = typeof prevElement;
            var nextType = typeof nextElement;
            if (prevType === 'string' || prevType === 'number') {
              return nextType === 'string' || nextType === 'number';
            } else {
              return nextType === 'object' && prevElement.type === nextElement.type && prevElement.key === nextElement.key;
            }
            return false;
          }
          module.exports = shouldUpdateReactComponent;
        }, {}],
        127: [function(_dereq_, module, exports) {
          'use strict';
          var ReactCurrentOwner = _dereq_(34);
          var ReactElement = _dereq_(52);
          var ReactInstanceHandles = _dereq_(61);
          var getIteratorFn = _dereq_(115);
          var invariant = _dereq_(144);
          var warning = _dereq_(155);
          var SEPARATOR = ReactInstanceHandles.SEPARATOR;
          var SUBSEPARATOR = ':';
          var userProvidedKeyEscaperLookup = {
            '=': '=0',
            '.': '=1',
            ':': '=2'
          };
          var userProvidedKeyEscapeRegex = /[=.:]/g;
          var didWarnAboutMaps = false;
          function userProvidedKeyEscaper(match) {
            return userProvidedKeyEscaperLookup[match];
          }
          function getComponentKey(component, index) {
            if (component && component.key != null) {
              return wrapUserProvidedKey(component.key);
            }
            return index.toString(36);
          }
          function escapeUserProvidedKey(text) {
            return ('' + text).replace(userProvidedKeyEscapeRegex, userProvidedKeyEscaper);
          }
          function wrapUserProvidedKey(key) {
            return '$' + escapeUserProvidedKey(key);
          }
          function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
            var type = typeof children;
            if (type === 'undefined' || type === 'boolean') {
              children = null;
            }
            if (children === null || type === 'string' || type === 'number' || ReactElement.isValidElement(children)) {
              callback(traverseContext, children, nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
              return 1;
            }
            var child;
            var nextName;
            var subtreeCount = 0;
            var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;
            if (Array.isArray(children)) {
              for (var i = 0; i < children.length; i++) {
                child = children[i];
                nextName = nextNamePrefix + getComponentKey(child, i);
                subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
              }
            } else {
              var iteratorFn = getIteratorFn(children);
              if (iteratorFn) {
                var iterator = iteratorFn.call(children);
                var step;
                if (iteratorFn !== children.entries) {
                  var ii = 0;
                  while (!(step = iterator.next()).done) {
                    child = step.value;
                    nextName = nextNamePrefix + getComponentKey(child, ii++);
                    subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
                  }
                } else {
                  if ("development" !== 'production') {
                    "development" !== 'production' ? warning(didWarnAboutMaps, 'Using Maps as children is not yet fully supported. It is an ' + 'experimental feature that might be removed. Convert it to a ' + 'sequence / iterable of keyed ReactElements instead.') : undefined;
                    didWarnAboutMaps = true;
                  }
                  while (!(step = iterator.next()).done) {
                    var entry = step.value;
                    if (entry) {
                      child = entry[1];
                      nextName = nextNamePrefix + wrapUserProvidedKey(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
                      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
                    }
                  }
                }
              } else if (type === 'object') {
                var addendum = '';
                if ("development" !== 'production') {
                  addendum = ' If you meant to render a collection of children, use an array ' + 'instead or wrap the object using createFragment(object) from the ' + 'React add-ons.';
                  if (children._isReactElement) {
                    addendum = ' It looks like you\'re using an element created by a different ' + 'version of React. Make sure to use only one copy of React.';
                  }
                  if (ReactCurrentOwner.current) {
                    var name = ReactCurrentOwner.current.getName();
                    if (name) {
                      addendum += ' Check the render method of `' + name + '`.';
                    }
                  }
                }
                var childrenString = String(children);
                !false ? "development" !== 'production' ? invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : invariant(false) : undefined;
              }
            }
            return subtreeCount;
          }
          function traverseAllChildren(children, callback, traverseContext) {
            if (children == null) {
              return 0;
            }
            return traverseAllChildrenImpl(children, '', callback, traverseContext);
          }
          module.exports = traverseAllChildren;
        }, {
          "115": 115,
          "144": 144,
          "155": 155,
          "34": 34,
          "52": 52,
          "61": 61
        }],
        128: [function(_dereq_, module, exports) {
          'use strict';
          var assign = _dereq_(23);
          var emptyFunction = _dereq_(136);
          var warning = _dereq_(155);
          var validateDOMNesting = emptyFunction;
          if ("development" !== 'production') {
            var specialTags = ['address', 'applet', 'area', 'article', 'aside', 'base', 'basefont', 'bgsound', 'blockquote', 'body', 'br', 'button', 'caption', 'center', 'col', 'colgroup', 'dd', 'details', 'dir', 'div', 'dl', 'dt', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'iframe', 'img', 'input', 'isindex', 'li', 'link', 'listing', 'main', 'marquee', 'menu', 'menuitem', 'meta', 'nav', 'noembed', 'noframes', 'noscript', 'object', 'ol', 'p', 'param', 'plaintext', 'pre', 'script', 'section', 'select', 'source', 'style', 'summary', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'title', 'tr', 'track', 'ul', 'wbr', 'xmp'];
            var inScopeTags = ['applet', 'caption', 'html', 'table', 'td', 'th', 'marquee', 'object', 'template', 'foreignObject', 'desc', 'title'];
            var buttonScopeTags = inScopeTags.concat(['button']);
            var impliedEndTags = ['dd', 'dt', 'li', 'option', 'optgroup', 'p', 'rp', 'rt'];
            var emptyAncestorInfo = {
              parentTag: null,
              formTag: null,
              aTagInScope: null,
              buttonTagInScope: null,
              nobrTagInScope: null,
              pTagInButtonScope: null,
              listItemTagAutoclosing: null,
              dlItemTagAutoclosing: null
            };
            var updatedAncestorInfo = function(oldInfo, tag, instance) {
              var ancestorInfo = assign({}, oldInfo || emptyAncestorInfo);
              var info = {
                tag: tag,
                instance: instance
              };
              if (inScopeTags.indexOf(tag) !== -1) {
                ancestorInfo.aTagInScope = null;
                ancestorInfo.buttonTagInScope = null;
                ancestorInfo.nobrTagInScope = null;
              }
              if (buttonScopeTags.indexOf(tag) !== -1) {
                ancestorInfo.pTagInButtonScope = null;
              }
              if (specialTags.indexOf(tag) !== -1 && tag !== 'address' && tag !== 'div' && tag !== 'p') {
                ancestorInfo.listItemTagAutoclosing = null;
                ancestorInfo.dlItemTagAutoclosing = null;
              }
              ancestorInfo.parentTag = info;
              if (tag === 'form') {
                ancestorInfo.formTag = info;
              }
              if (tag === 'a') {
                ancestorInfo.aTagInScope = info;
              }
              if (tag === 'button') {
                ancestorInfo.buttonTagInScope = info;
              }
              if (tag === 'nobr') {
                ancestorInfo.nobrTagInScope = info;
              }
              if (tag === 'p') {
                ancestorInfo.pTagInButtonScope = info;
              }
              if (tag === 'li') {
                ancestorInfo.listItemTagAutoclosing = info;
              }
              if (tag === 'dd' || tag === 'dt') {
                ancestorInfo.dlItemTagAutoclosing = info;
              }
              return ancestorInfo;
            };
            var isTagValidWithParent = function(tag, parentTag) {
              switch (parentTag) {
                case 'select':
                  return tag === 'option' || tag === 'optgroup' || tag === '#text';
                case 'optgroup':
                  return tag === 'option' || tag === '#text';
                case 'option':
                  return tag === '#text';
                case 'tr':
                  return tag === 'th' || tag === 'td' || tag === 'style' || tag === 'script' || tag === 'template';
                case 'tbody':
                case 'thead':
                case 'tfoot':
                  return tag === 'tr' || tag === 'style' || tag === 'script' || tag === 'template';
                case 'colgroup':
                  return tag === 'col' || tag === 'template';
                case 'table':
                  return tag === 'caption' || tag === 'colgroup' || tag === 'tbody' || tag === 'tfoot' || tag === 'thead' || tag === 'style' || tag === 'script' || tag === 'template';
                case 'head':
                  return tag === 'base' || tag === 'basefont' || tag === 'bgsound' || tag === 'link' || tag === 'meta' || tag === 'title' || tag === 'noscript' || tag === 'noframes' || tag === 'style' || tag === 'script' || tag === 'template';
                case 'html':
                  return tag === 'head' || tag === 'body';
              }
              switch (tag) {
                case 'h1':
                case 'h2':
                case 'h3':
                case 'h4':
                case 'h5':
                case 'h6':
                  return parentTag !== 'h1' && parentTag !== 'h2' && parentTag !== 'h3' && parentTag !== 'h4' && parentTag !== 'h5' && parentTag !== 'h6';
                case 'rp':
                case 'rt':
                  return impliedEndTags.indexOf(parentTag) === -1;
                case 'caption':
                case 'col':
                case 'colgroup':
                case 'frame':
                case 'head':
                case 'tbody':
                case 'td':
                case 'tfoot':
                case 'th':
                case 'thead':
                case 'tr':
                  return parentTag == null;
              }
              return true;
            };
            var findInvalidAncestorForTag = function(tag, ancestorInfo) {
              switch (tag) {
                case 'address':
                case 'article':
                case 'aside':
                case 'blockquote':
                case 'center':
                case 'details':
                case 'dialog':
                case 'dir':
                case 'div':
                case 'dl':
                case 'fieldset':
                case 'figcaption':
                case 'figure':
                case 'footer':
                case 'header':
                case 'hgroup':
                case 'main':
                case 'menu':
                case 'nav':
                case 'ol':
                case 'p':
                case 'section':
                case 'summary':
                case 'ul':
                case 'pre':
                case 'listing':
                case 'table':
                case 'hr':
                case 'xmp':
                case 'h1':
                case 'h2':
                case 'h3':
                case 'h4':
                case 'h5':
                case 'h6':
                  return ancestorInfo.pTagInButtonScope;
                case 'form':
                  return ancestorInfo.formTag || ancestorInfo.pTagInButtonScope;
                case 'li':
                  return ancestorInfo.listItemTagAutoclosing;
                case 'dd':
                case 'dt':
                  return ancestorInfo.dlItemTagAutoclosing;
                case 'button':
                  return ancestorInfo.buttonTagInScope;
                case 'a':
                  return ancestorInfo.aTagInScope;
                case 'nobr':
                  return ancestorInfo.nobrTagInScope;
              }
              return null;
            };
            var findOwnerStack = function(instance) {
              if (!instance) {
                return [];
              }
              var stack = [];
              do {
                stack.push(instance);
              } while (instance = instance._currentElement._owner);
              stack.reverse();
              return stack;
            };
            var didWarn = {};
            validateDOMNesting = function(childTag, childInstance, ancestorInfo) {
              ancestorInfo = ancestorInfo || emptyAncestorInfo;
              var parentInfo = ancestorInfo.parentTag;
              var parentTag = parentInfo && parentInfo.tag;
              var invalidParent = isTagValidWithParent(childTag, parentTag) ? null : parentInfo;
              var invalidAncestor = invalidParent ? null : findInvalidAncestorForTag(childTag, ancestorInfo);
              var problematic = invalidParent || invalidAncestor;
              if (problematic) {
                var ancestorTag = problematic.tag;
                var ancestorInstance = problematic.instance;
                var childOwner = childInstance && childInstance._currentElement._owner;
                var ancestorOwner = ancestorInstance && ancestorInstance._currentElement._owner;
                var childOwners = findOwnerStack(childOwner);
                var ancestorOwners = findOwnerStack(ancestorOwner);
                var minStackLen = Math.min(childOwners.length, ancestorOwners.length);
                var i;
                var deepestCommon = -1;
                for (i = 0; i < minStackLen; i++) {
                  if (childOwners[i] === ancestorOwners[i]) {
                    deepestCommon = i;
                  } else {
                    break;
                  }
                }
                var UNKNOWN = '(unknown)';
                var childOwnerNames = childOwners.slice(deepestCommon + 1).map(function(inst) {
                  return inst.getName() || UNKNOWN;
                });
                var ancestorOwnerNames = ancestorOwners.slice(deepestCommon + 1).map(function(inst) {
                  return inst.getName() || UNKNOWN;
                });
                var ownerInfo = [].concat(deepestCommon !== -1 ? childOwners[deepestCommon].getName() || UNKNOWN : [], ancestorOwnerNames, ancestorTag, invalidAncestor ? ['...'] : [], childOwnerNames, childTag).join(' > ');
                var warnKey = !!invalidParent + '|' + childTag + '|' + ancestorTag + '|' + ownerInfo;
                if (didWarn[warnKey]) {
                  return;
                }
                didWarn[warnKey] = true;
                if (invalidParent) {
                  var info = '';
                  if (ancestorTag === 'table' && childTag === 'tr') {
                    info += ' Add a <tbody> to your code to match the DOM tree generated by ' + 'the browser.';
                  }
                  "development" !== 'production' ? warning(false, 'validateDOMNesting(...): <%s> cannot appear as a child of <%s>. ' + 'See %s.%s', childTag, ancestorTag, ownerInfo, info) : undefined;
                } else {
                  "development" !== 'production' ? warning(false, 'validateDOMNesting(...): <%s> cannot appear as a descendant of ' + '<%s>. See %s.', childTag, ancestorTag, ownerInfo) : undefined;
                }
              }
            };
            validateDOMNesting.ancestorInfoContextKey = '__validateDOMNesting_ancestorInfo$' + Math.random().toString(36).slice(2);
            validateDOMNesting.updatedAncestorInfo = updatedAncestorInfo;
            validateDOMNesting.isTagValidInContext = function(tag, ancestorInfo) {
              ancestorInfo = ancestorInfo || emptyAncestorInfo;
              var parentInfo = ancestorInfo.parentTag;
              var parentTag = parentInfo && parentInfo.tag;
              return isTagValidWithParent(tag, parentTag) && !findInvalidAncestorForTag(tag, ancestorInfo);
            };
          }
          module.exports = validateDOMNesting;
        }, {
          "136": 136,
          "155": 155,
          "23": 23
        }],
        129: [function(_dereq_, module, exports) {
          'use strict';
          var emptyFunction = _dereq_(136);
          var EventListener = {
            listen: function(target, eventType, callback) {
              if (target.addEventListener) {
                target.addEventListener(eventType, callback, false);
                return {remove: function() {
                    target.removeEventListener(eventType, callback, false);
                  }};
              } else if (target.attachEvent) {
                target.attachEvent('on' + eventType, callback);
                return {remove: function() {
                    target.detachEvent('on' + eventType, callback);
                  }};
              }
            },
            capture: function(target, eventType, callback) {
              if (target.addEventListener) {
                target.addEventListener(eventType, callback, true);
                return {remove: function() {
                    target.removeEventListener(eventType, callback, true);
                  }};
              } else {
                if ("development" !== 'production') {
                  console.error('Attempted to listen to events during the capture phase on a ' + 'browser that does not support the capture phase. Your application ' + 'will not receive some events.');
                }
                return {remove: emptyFunction};
              }
            },
            registerDefault: function() {}
          };
          module.exports = EventListener;
        }, {"136": 136}],
        130: [function(_dereq_, module, exports) {
          'use strict';
          var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
          var ExecutionEnvironment = {
            canUseDOM: canUseDOM,
            canUseWorkers: typeof Worker !== 'undefined',
            canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),
            canUseViewport: canUseDOM && !!window.screen,
            isInWorker: !canUseDOM
          };
          module.exports = ExecutionEnvironment;
        }, {}],
        131: [function(_dereq_, module, exports) {
          "use strict";
          var _hyphenPattern = /-(.)/g;
          function camelize(string) {
            return string.replace(_hyphenPattern, function(_, character) {
              return character.toUpperCase();
            });
          }
          module.exports = camelize;
        }, {}],
        132: [function(_dereq_, module, exports) {
          'use strict';
          var camelize = _dereq_(131);
          var msPattern = /^-ms-/;
          function camelizeStyleName(string) {
            return camelize(string.replace(msPattern, 'ms-'));
          }
          module.exports = camelizeStyleName;
        }, {"131": 131}],
        133: [function(_dereq_, module, exports) {
          'use strict';
          var isTextNode = _dereq_(146);
          function containsNode(_x, _x2) {
            var _again = true;
            _function: while (_again) {
              var outerNode = _x,
                  innerNode = _x2;
              _again = false;
              if (!outerNode || !innerNode) {
                return false;
              } else if (outerNode === innerNode) {
                return true;
              } else if (isTextNode(outerNode)) {
                return false;
              } else if (isTextNode(innerNode)) {
                _x = outerNode;
                _x2 = innerNode.parentNode;
                _again = true;
                continue _function;
              } else if (outerNode.contains) {
                return outerNode.contains(innerNode);
              } else if (outerNode.compareDocumentPosition) {
                return !!(outerNode.compareDocumentPosition(innerNode) & 16);
              } else {
                return false;
              }
            }
          }
          module.exports = containsNode;
        }, {"146": 146}],
        134: [function(_dereq_, module, exports) {
          'use strict';
          var toArray = _dereq_(154);
          function hasArrayNature(obj) {
            return (!!obj && (typeof obj == 'object' || typeof obj == 'function') && 'length' in obj && !('setInterval' in obj) && typeof obj.nodeType != 'number' && (Array.isArray(obj) || 'callee' in obj || 'item' in obj));
          }
          function createArrayFromMixed(obj) {
            if (!hasArrayNature(obj)) {
              return [obj];
            } else if (Array.isArray(obj)) {
              return obj.slice();
            } else {
              return toArray(obj);
            }
          }
          module.exports = createArrayFromMixed;
        }, {"154": 154}],
        135: [function(_dereq_, module, exports) {
          'use strict';
          var ExecutionEnvironment = _dereq_(130);
          var createArrayFromMixed = _dereq_(134);
          var getMarkupWrap = _dereq_(140);
          var invariant = _dereq_(144);
          var dummyNode = ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;
          var nodeNamePattern = /^\s*<(\w+)/;
          function getNodeName(markup) {
            var nodeNameMatch = markup.match(nodeNamePattern);
            return nodeNameMatch && nodeNameMatch[1].toLowerCase();
          }
          function createNodesFromMarkup(markup, handleScript) {
            var node = dummyNode;
            !!!dummyNode ? "development" !== 'production' ? invariant(false, 'createNodesFromMarkup dummy not initialized') : invariant(false) : undefined;
            var nodeName = getNodeName(markup);
            var wrap = nodeName && getMarkupWrap(nodeName);
            if (wrap) {
              node.innerHTML = wrap[1] + markup + wrap[2];
              var wrapDepth = wrap[0];
              while (wrapDepth--) {
                node = node.lastChild;
              }
            } else {
              node.innerHTML = markup;
            }
            var scripts = node.getElementsByTagName('script');
            if (scripts.length) {
              !handleScript ? "development" !== 'production' ? invariant(false, 'createNodesFromMarkup(...): Unexpected <script> element rendered.') : invariant(false) : undefined;
              createArrayFromMixed(scripts).forEach(handleScript);
            }
            var nodes = createArrayFromMixed(node.childNodes);
            while (node.lastChild) {
              node.removeChild(node.lastChild);
            }
            return nodes;
          }
          module.exports = createNodesFromMarkup;
        }, {
          "130": 130,
          "134": 134,
          "140": 140,
          "144": 144
        }],
        136: [function(_dereq_, module, exports) {
          "use strict";
          function makeEmptyFunction(arg) {
            return function() {
              return arg;
            };
          }
          function emptyFunction() {}
          emptyFunction.thatReturns = makeEmptyFunction;
          emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
          emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
          emptyFunction.thatReturnsNull = makeEmptyFunction(null);
          emptyFunction.thatReturnsThis = function() {
            return this;
          };
          emptyFunction.thatReturnsArgument = function(arg) {
            return arg;
          };
          module.exports = emptyFunction;
        }, {}],
        137: [function(_dereq_, module, exports) {
          'use strict';
          var emptyObject = {};
          if ("development" !== 'production') {
            Object.freeze(emptyObject);
          }
          module.exports = emptyObject;
        }, {}],
        138: [function(_dereq_, module, exports) {
          'use strict';
          function focusNode(node) {
            try {
              node.focus();
            } catch (e) {}
          }
          module.exports = focusNode;
        }, {}],
        139: [function(_dereq_, module, exports) {
          'use strict';
          function getActiveElement() {
            if (typeof document === 'undefined') {
              return null;
            }
            try {
              return document.activeElement || document.body;
            } catch (e) {
              return document.body;
            }
          }
          module.exports = getActiveElement;
        }, {}],
        140: [function(_dereq_, module, exports) {
          'use strict';
          var ExecutionEnvironment = _dereq_(130);
          var invariant = _dereq_(144);
          var dummyNode = ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;
          var shouldWrap = {};
          var selectWrap = [1, '<select multiple="true">', '</select>'];
          var tableWrap = [1, '<table>', '</table>'];
          var trWrap = [3, '<table><tbody><tr>', '</tr></tbody></table>'];
          var svgWrap = [1, '<svg xmlns="http://www.w3.org/2000/svg">', '</svg>'];
          var markupWrap = {
            '*': [1, '?<div>', '</div>'],
            'area': [1, '<map>', '</map>'],
            'col': [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
            'legend': [1, '<fieldset>', '</fieldset>'],
            'param': [1, '<object>', '</object>'],
            'tr': [2, '<table><tbody>', '</tbody></table>'],
            'optgroup': selectWrap,
            'option': selectWrap,
            'caption': tableWrap,
            'colgroup': tableWrap,
            'tbody': tableWrap,
            'tfoot': tableWrap,
            'thead': tableWrap,
            'td': trWrap,
            'th': trWrap
          };
          var svgElements = ['circle', 'clipPath', 'defs', 'ellipse', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'text', 'tspan'];
          svgElements.forEach(function(nodeName) {
            markupWrap[nodeName] = svgWrap;
            shouldWrap[nodeName] = true;
          });
          function getMarkupWrap(nodeName) {
            !!!dummyNode ? "development" !== 'production' ? invariant(false, 'Markup wrapping node not initialized') : invariant(false) : undefined;
            if (!markupWrap.hasOwnProperty(nodeName)) {
              nodeName = '*';
            }
            if (!shouldWrap.hasOwnProperty(nodeName)) {
              if (nodeName === '*') {
                dummyNode.innerHTML = '<link />';
              } else {
                dummyNode.innerHTML = '<' + nodeName + '></' + nodeName + '>';
              }
              shouldWrap[nodeName] = !dummyNode.firstChild;
            }
            return shouldWrap[nodeName] ? markupWrap[nodeName] : null;
          }
          module.exports = getMarkupWrap;
        }, {
          "130": 130,
          "144": 144
        }],
        141: [function(_dereq_, module, exports) {
          'use strict';
          function getUnboundedScrollPosition(scrollable) {
            if (scrollable === window) {
              return {
                x: window.pageXOffset || document.documentElement.scrollLeft,
                y: window.pageYOffset || document.documentElement.scrollTop
              };
            }
            return {
              x: scrollable.scrollLeft,
              y: scrollable.scrollTop
            };
          }
          module.exports = getUnboundedScrollPosition;
        }, {}],
        142: [function(_dereq_, module, exports) {
          'use strict';
          var _uppercasePattern = /([A-Z])/g;
          function hyphenate(string) {
            return string.replace(_uppercasePattern, '-$1').toLowerCase();
          }
          module.exports = hyphenate;
        }, {}],
        143: [function(_dereq_, module, exports) {
          'use strict';
          var hyphenate = _dereq_(142);
          var msPattern = /^ms-/;
          function hyphenateStyleName(string) {
            return hyphenate(string).replace(msPattern, '-ms-');
          }
          module.exports = hyphenateStyleName;
        }, {"142": 142}],
        144: [function(_dereq_, module, exports) {
          'use strict';
          var invariant = function(condition, format, a, b, c, d, e, f) {
            if ("development" !== 'production') {
              if (format === undefined) {
                throw new Error('invariant requires an error message argument');
              }
            }
            if (!condition) {
              var error;
              if (format === undefined) {
                error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
              } else {
                var args = [a, b, c, d, e, f];
                var argIndex = 0;
                error = new Error('Invariant Violation: ' + format.replace(/%s/g, function() {
                  return args[argIndex++];
                }));
              }
              error.framesToPop = 1;
              throw error;
            }
          };
          module.exports = invariant;
        }, {}],
        145: [function(_dereq_, module, exports) {
          'use strict';
          function isNode(object) {
            return !!(object && (typeof Node === 'function' ? object instanceof Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
          }
          module.exports = isNode;
        }, {}],
        146: [function(_dereq_, module, exports) {
          'use strict';
          var isNode = _dereq_(145);
          function isTextNode(object) {
            return isNode(object) && object.nodeType == 3;
          }
          module.exports = isTextNode;
        }, {"145": 145}],
        147: [function(_dereq_, module, exports) {
          'use strict';
          var invariant = _dereq_(144);
          var keyMirror = function(obj) {
            var ret = {};
            var key;
            !(obj instanceof Object && !Array.isArray(obj)) ? "development" !== 'production' ? invariant(false, 'keyMirror(...): Argument must be an object.') : invariant(false) : undefined;
            for (key in obj) {
              if (!obj.hasOwnProperty(key)) {
                continue;
              }
              ret[key] = key;
            }
            return ret;
          };
          module.exports = keyMirror;
        }, {"144": 144}],
        148: [function(_dereq_, module, exports) {
          "use strict";
          var keyOf = function(oneKeyObj) {
            var key;
            for (key in oneKeyObj) {
              if (!oneKeyObj.hasOwnProperty(key)) {
                continue;
              }
              return key;
            }
            return null;
          };
          module.exports = keyOf;
        }, {}],
        149: [function(_dereq_, module, exports) {
          'use strict';
          var hasOwnProperty = Object.prototype.hasOwnProperty;
          function mapObject(object, callback, context) {
            if (!object) {
              return null;
            }
            var result = {};
            for (var name in object) {
              if (hasOwnProperty.call(object, name)) {
                result[name] = callback.call(context, object[name], name, object);
              }
            }
            return result;
          }
          module.exports = mapObject;
        }, {}],
        150: [function(_dereq_, module, exports) {
          'use strict';
          function memoizeStringOnly(callback) {
            var cache = {};
            return function(string) {
              if (!cache.hasOwnProperty(string)) {
                cache[string] = callback.call(this, string);
              }
              return cache[string];
            };
          }
          module.exports = memoizeStringOnly;
        }, {}],
        151: [function(_dereq_, module, exports) {
          'use strict';
          var ExecutionEnvironment = _dereq_(130);
          var performance;
          if (ExecutionEnvironment.canUseDOM) {
            performance = window.performance || window.msPerformance || window.webkitPerformance;
          }
          module.exports = performance || {};
        }, {"130": 130}],
        152: [function(_dereq_, module, exports) {
          'use strict';
          var performance = _dereq_(151);
          var curPerformance = performance;
          if (!curPerformance || !curPerformance.now) {
            curPerformance = Date;
          }
          var performanceNow = curPerformance.now.bind(curPerformance);
          module.exports = performanceNow;
        }, {"151": 151}],
        153: [function(_dereq_, module, exports) {
          'use strict';
          var hasOwnProperty = Object.prototype.hasOwnProperty;
          function shallowEqual(objA, objB) {
            if (objA === objB) {
              return true;
            }
            if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
              return false;
            }
            var keysA = Object.keys(objA);
            var keysB = Object.keys(objB);
            if (keysA.length !== keysB.length) {
              return false;
            }
            var bHasOwnProperty = hasOwnProperty.bind(objB);
            for (var i = 0; i < keysA.length; i++) {
              if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
                return false;
              }
            }
            return true;
          }
          module.exports = shallowEqual;
        }, {}],
        154: [function(_dereq_, module, exports) {
          'use strict';
          var invariant = _dereq_(144);
          function toArray(obj) {
            var length = obj.length;
            !(!Array.isArray(obj) && (typeof obj === 'object' || typeof obj === 'function')) ? "development" !== 'production' ? invariant(false, 'toArray: Array-like object expected') : invariant(false) : undefined;
            !(typeof length === 'number') ? "development" !== 'production' ? invariant(false, 'toArray: Object needs a length property') : invariant(false) : undefined;
            !(length === 0 || length - 1 in obj) ? "development" !== 'production' ? invariant(false, 'toArray: Object should have keys for indices') : invariant(false) : undefined;
            if (obj.hasOwnProperty) {
              try {
                return Array.prototype.slice.call(obj);
              } catch (e) {}
            }
            var ret = Array(length);
            for (var ii = 0; ii < length; ii++) {
              ret[ii] = obj[ii];
            }
            return ret;
          }
          module.exports = toArray;
        }, {"144": 144}],
        155: [function(_dereq_, module, exports) {
          'use strict';
          var emptyFunction = _dereq_(136);
          var warning = emptyFunction;
          if ("development" !== 'production') {
            warning = function(condition, format) {
              for (var _len = arguments.length,
                  args = Array(_len > 2 ? _len - 2 : 0),
                  _key = 2; _key < _len; _key++) {
                args[_key - 2] = arguments[_key];
              }
              if (format === undefined) {
                throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
              }
              if (format.indexOf('Failed Composite propType: ') === 0) {
                return;
              }
              if (!condition) {
                var argIndex = 0;
                var message = 'Warning: ' + format.replace(/%s/g, function() {
                  return args[argIndex++];
                });
                if (typeof console !== 'undefined') {
                  console.error(message);
                }
                try {
                  throw new Error(message);
                } catch (x) {}
              }
            };
          }
          module.exports = warning;
        }, {"136": 136}]
      }, {}, [1])(1);
    });
    ;
    (function(f) {
      if (typeof module !== "undefined" && typeof module.exports === "object") {
        module.exports.ReactDOM = f(module.exports.React);
      } else if (typeof AlloyEditor === "object") {
        AlloyEditor.ReactDOM = f(AlloyEditor.React);
      } else if (typeof window !== "undefined") {
        window.ReactDOM = f(window.React);
      } else if (typeof self !== "undefined") {
        self.ReactDOM = f(self.React);
      } else if (typeof global !== "undefined") {
        global.ReactDOM = f(global.React);
      } else {
        this.ReactDOM = f(this.React);
      }
    })(function(React) {
      return React.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    });
    var React = (function() {
      return (0, eval)('this').React;
    }());
    if (typeof React === 'undefined' && typeof AlloyEditor !== 'undefined') {
      React = AlloyEditor.React;
    }
    if (typeof React === 'undefined' && typeof require === 'function') {
      React = require('react');
    }
    var ReactDOM = (function() {
      return (0, eval)('this').ReactDOM;
    }());
    if (typeof ReactDOM === 'undefined' && typeof AlloyEditor !== 'undefined') {
      ReactDOM = AlloyEditor.ReactDOM;
    }
    if (typeof ReactDOM === 'undefined' && typeof require === 'function') {
      ReactDOM = require('react-dom');
    }
    if (typeof window !== 'undefined') {
      deployCKEditor();
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

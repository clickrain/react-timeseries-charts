'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pondjs = require('pondjs');

var _EventMarker = require('./EventMarker');

var _EventMarker2 = _interopRequireDefault(_EventMarker);

var _styler = require('../js/styler');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  Copyright (c) 2015-present, The Regents of the University of California,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  through Lawrence Berkeley National Laboratory (subject to receipt
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  of any required approvals from the U.S. Dept. of Energy).
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var defaultStyle = {
  normal: { fill: 'steelblue', opacity: 0.8 },
  highlighted: { fill: 'steelblue', opacity: 1.0 },
  selected: { fill: 'steelblue', opacity: 1.0 },
  muted: { fill: 'steelblue', opacity: 0.4 }
};

/**
 * Renders a bar chart based on IndexedEvents within a TimeSeries.
 *
 * This BarChart implementation is a little different that other time axis
 * bar charts in that it will render across a the time range of the event
 * rather than rendering to specific categories. As a result,
 * a Aug-2014 bar will render between the Aug 2014 tick mark and the Sept 2014
 * tickmark.
 *
 * The BarChart will render a single TimeSeries. You can specify the columns
 * you want to render with the `columns` prop. Each column will be stacked on
 * the other, in the order specified in the `columns` array.
 *
 * The BarChart supports selection of individual bars. To control this use
 * `onSelectionChange` to get a callback of selection changed. Your callback
 * will be called with with the selection (and object containing the event
 * and column). You can pass this back into the BarChart as `selection`. For
 * example:
 *
 * ```
 *  <BarChart
 *      ...
 *      selection={this.state.selection}
 *      onSelectionChange={selection => this.setState({selection})} />
 * ```
 *
 * Similarly you can monitor which bar is being hovered over with the
 * `onHighlightChange` callback. This can be used to determine the info text
 * to display. Info text will display a box (like a tooltip) with a line
 * connecting it to the bar. You use the `info` prop to evoke this and to
 * supply the text for the info box. See the styling notes below for more
 * information on this.
 *
 * ### Styling
 *
 * A BarChart supports per-column or per-event styling. Styles can be set for
 * each of the four states that are possible for each event: normal, highlighted,
 * selected and muted. To style per-column, supply an object. For per-event styling
 * supply a function: `(event, column) => {}` The functon will return a style object.
 *
 * See the `style` prop in the API documentation for more information.
 *
 * Separately the size of the bars can be controlled with the `spacing` and
 * `offset` props. Spacing controls the gap between the bars. Offset moves the
 * bars left or right by the given number of pixels. You can use this to place
 * bars along side each other. Alternatively, you can give each column a fixed width
 * using the `size` prop. In this case this size will be used over the size
 * determined from the timerange of the event and the `spacing`.
 *
 * The highlight info for each bar is also able to be styled using the `infoStyle`.
 * This enables you to control the drawing of the box, connecting lines and dot.
 * Using the `infoWidth` and `infoHeight` props you can control the size of the
 * box, which is fixed. For the info inside the box, it's up to you: it can either
 * be a simple string or an array of {label, value} pairs.
 */

var BarChart = function (_React$Component) {
  _inherits(BarChart, _React$Component);

  function BarChart() {
    _classCallCheck(this, BarChart);

    return _possibleConstructorReturn(this, (BarChart.__proto__ || Object.getPrototypeOf(BarChart)).apply(this, arguments));
  }

  _createClass(BarChart, [{
    key: 'handleHover',
    value: function handleHover(e, event, column) {
      var bar = { event: event, column: column };
      if (this.props.onHighlightChange) {
        this.props.onHighlightChange(bar);
      }
    }
  }, {
    key: 'handleHoverLeave',
    value: function handleHoverLeave() {
      if (this.props.onHighlightChange) {
        this.props.onHighlightChange(null);
      }
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e, event, column) {
      var bar = { event: event, column: column };
      if (this.props.onSelectionChange) {
        this.props.onSelectionChange(bar);
      }
      e.stopPropagation();
    }
  }, {
    key: 'providedStyleMap',
    value: function providedStyleMap(column) {
      var style = {};
      if (this.props.style) {
        if (this.props.style instanceof _styler.Styler) {
          style = this.props.style.barChartStyle()[column];
        } else if (_underscore2.default.isFunction(this.props.style)) {
          style = this.props.style(column);
        } else if (_underscore2.default.isObject(this.props.style)) {
          style = this.props.style ? this.props.style[column] : defaultStyle;
        }
      }
      return style;
    }

    /**
     * Returns the style used for drawing the path
     */

  }, {
    key: 'style',
    value: function style(column, event) {
      var style = void 0;
      var styleMap = this.providedStyleMap(column);

      var isHighlighted = this.props.highlighted && column === this.props.highlighted.column && _pondjs.Event.is(this.props.highlighted.event, event);

      var isSelected = this.props.selected && column === this.props.selected.column && _pondjs.Event.is(this.props.selected.event, event);

      if (this.props.selected) {
        if (isSelected) {
          style = (0, _merge2.default)(true, defaultStyle.selected, styleMap.selected ? styleMap.selected : {});
        } else if (isHighlighted) {
          style = (0, _merge2.default)(true, defaultStyle.highlighted, styleMap.highlighted ? styleMap.highlighted : {});
        } else {
          style = (0, _merge2.default)(true, defaultStyle.muted, styleMap.muted ? styleMap.muted : {});
        }
      } else if (isHighlighted) {
        style = (0, _merge2.default)(true, defaultStyle.highlighted, styleMap.highlighted ? styleMap.highlighted : {});
      } else {
        style = (0, _merge2.default)(true, defaultStyle.normal, styleMap.normal ? styleMap.normal : {});
      }

      return style;
    }
  }, {
    key: 'renderBars',
    value: function renderBars() {
      var _this2 = this;

      var spacing = +this.props.spacing;
      var offset = +this.props.offset;
      var series = this.props.series;
      var timeScale = this.props.timeScale;
      var yScale = this.props.yScale;
      var columns = this.props.columns || ['value'];

      var bars = [];
      var eventMarker = void 0;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var event = _step.value;

          var begin = event.begin();
          var end = event.end();
          var beginPos = timeScale(begin) + spacing;
          var endPos = timeScale(end) - spacing;

          var width = void 0;
          if (_this2.props.size) {
            width = _this2.props.size;
          } else {
            width = endPos - beginPos;
          }

          if (width < 1) {
            width = 1;
          }

          var x = void 0;
          if (_this2.props.size) {
            var center = timeScale(begin) + (timeScale(end) - timeScale(begin)) / 2;
            x = center - _this2.props.size / 2 + offset;
          } else {
            x = timeScale(begin) + spacing + offset;
          }

          var yBase = yScale(0);
          var yposPositive = yBase;
          var yposNegative = yBase;
          if (columns) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              var _loop2 = function _loop2() {
                var column = _step2.value;

                var index = event.index();
                var key = series.name() + '-' + index + '-' + column;
                var value = event.get(column);
                var style = _this2.style(column, event);

                var height = yScale(0) - yScale(value);
                // Allow negative values. Minimum bar height = 1 pixel.
                // Stack negative bars below X-axis and positive above X-Axis
                var positiveBar = height >= 0;
                height = Math.max(Math.abs(height), 1);
                var y = positiveBar ? yposPositive - height : yposNegative;

                // Event marker if info provided and hovering
                var isHighlighted = _this2.props.highlighted && column === _this2.props.highlighted.column && _pondjs.Event.is(_this2.props.highlighted.event, event);
                if (isHighlighted && _this2.props.info) {
                  eventMarker = _react2.default.createElement(_EventMarker2.default, _extends({}, _this2.props, {
                    offsetX: offset,
                    offsetY: yBase - (positiveBar ? yposPositive : yposNegative),
                    event: event,
                    column: column
                  }));
                }

                var box = { x: x, y: y, width: width, height: height };
                var barProps = _extends({ key: key }, box, { style: style });

                if (_this2.props.onSelectionChange) {
                  barProps.onClick = function (e) {
                    return _this2.handleClick(e, event, column);
                  };
                }
                if (_this2.props.onHighlightChange) {
                  barProps.onMouseMove = function (e) {
                    return _this2.handleHover(e, event, column);
                  };
                  barProps.onMouseLeave = function () {
                    return _this2.handleHoverLeave();
                  };
                }

                bars.push(_react2.default.createElement('rect', barProps));

                if (positiveBar) {
                  yposPositive -= height;
                } else {
                  yposNegative += height;
                }
              };

              for (var _iterator2 = columns[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                _loop2();
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
          }
        };

        for (var _iterator = series.events()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return _react2.default.createElement(
        'g',
        null,
        bars,
        eventMarker
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'g',
        null,
        this.renderBars()
      );
    }
  }]);

  return BarChart;
}(_react2.default.Component);

exports.default = BarChart;


BarChart.propTypes = {
  /**
   * What [Pond TimeSeries](http://software.es.net/pond#timeseries)
   * data to visualize
   */
  series: _react2.default.PropTypes.instanceOf(_pondjs.TimeSeries).isRequired,

  /**
   * The distance in pixels to inset the bar chart from its actual timerange
   */
  spacing: _react2.default.PropTypes.number,

  /**
   * The distance in pixels to offset the bar from its center position within the timerange
   * it represents
   */
  offset: _react2.default.PropTypes.number,

  /**
   * A list of columns within the series that will be stacked on top of each other
   */
  columns: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string),

  /**
   * The style of the bar chart drawing (using SVG CSS properties).
   * This is an object with a key for each column which is being drawn,
   * per the `columns` prop. For each column a style is defined for
   * each state the bar may be in. This style is the CSS properties for
   * the underlying SVG <Rect>, so most likely you'll define fill and
   * opacity.
   *
   * For example:
   * ```
   * style = {
   *     columnName: {
   *         normal: {
   *             fill: "steelblue",
   *             opacity: 0.8,
   *         },
   *         highlighted: {
   *             fill: "#a7c4dd",
   *             opacity: 1.0,
   *         },
   *         selected: {
   *             fill: "orange",
   *             opacity: 1.0,
   *         },
   *         muted: {
   *             fill: "grey",
   *             opacity: 0.5
   *         }
   *     }
   * }
   * ```
   *
   * You can also supply a function, which will be called with an event
   * and column. The function should return an object containing the
   * four states (normal, highlighted, selected and muted) and the corresponding
   * CSS properties.
   */
  style: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.object, _react2.default.PropTypes.func, _react2.default.PropTypes.instanceOf(_styler.Styler)]),

  /**
   * The style of the info box and connecting lines
   */
  infoStyle: _react2.default.PropTypes.object, //eslint-disable-line

  /**
   * The width of the hover info box
   */
  infoWidth: _react2.default.PropTypes.number, //eslint-disable-line

  /**
   * The height of the hover info box
   */
  infoHeight: _react2.default.PropTypes.number, //eslint-disable-line

  /**
   * Alter the format of the timestamp shown on the info box.
   * This may be either a function or a string. If you provide a function
   * that will be passed an Index and should return a string. For example:
   * ```
   *     index => moment(index.begin()).format("Do MMM 'YY")
   * ```
   * Alternatively you can pass in a d3 format string. That will be applied
   * to the begin time of the Index range.
   */
  infoTimeFormat: _react2.default.PropTypes.oneOfType([//eslint-disable-line
  _react2.default.PropTypes.string, //eslint-disable-line
  _react2.default.PropTypes.func //eslint-disable-line
  ]),

  /**
   * The values to show in the info box. This is an array of
   * objects, with each object specifying the label and value
   * to be shown in the info box.
   */
  info: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
    label: _react2.default.PropTypes.string, //eslint-disable-line
    value: _react2.default.PropTypes.string })),

  /**
   * If size is specified, then the bar will be this number of pixels wide. This
   * prop takes priority over "spacing".
   */
  size: _react2.default.PropTypes.number,

  /**
   * The selected item, which will be rendered in the "selected" style.
   * If a bar is selected, all other bars will be rendered in the "muted" style.
   *
   * See also `onSelectionChange`
   */
  selected: _react2.default.PropTypes.shape({
    event: _react2.default.PropTypes.instanceOf(_pondjs.IndexedEvent),
    column: _react2.default.PropTypes.string
  }),

  /**
   * A callback that will be called when the selection changes. It will be called
   * with an object containing the event and column.
   */
  onSelectionChange: _react2.default.PropTypes.func,

  /**
   * The highlighted item, which will be rendered in the "highlighted" style.
   *
   * See also `onHighlightChange`
   */
  highlighted: _react2.default.PropTypes.shape({
    event: _react2.default.PropTypes.instanceOf(_pondjs.IndexedEvent),
    column: _react2.default.PropTypes.string
  }),

  /**
   * A callback that will be called when the hovered over bar changes.
   * It will be called with an object containing the event and column.
   */
  onHighlightChange: _react2.default.PropTypes.func,

  /**
   * [Internal] The timeScale supplied by the surrounding ChartContainer
   */
  timeScale: _react2.default.PropTypes.func,

  /**
   * [Internal] The yScale supplied by the associated YAxis
   */
  yScale: _react2.default.PropTypes.func

};

BarChart.defaultProps = {
  columns: ['value'],
  spacing: 1.0,
  offset: 0,
  infoStyle: {
    line: {
      stroke: '#999',
      cursor: 'crosshair',
      pointerEvents: 'none'
    },
    box: {
      fill: 'white',
      opacity: 0.90,
      stroke: '#999',
      pointerEvents: 'none'
    },
    dot: {
      fill: '#999'
    }
  },
  infoWidth: 90,
  infoHeight: 30
};
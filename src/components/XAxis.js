/**
 *  Copyright (c) 2015-present, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import merge from 'merge';
import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';  // eslint-disable-line

import { TimeAxis } from 'react-axis';
import { select } from 'd3-selection';
import { timeFormat } from 'd3-time-format';

import 'moment-duration-format';

function scaleAsString(scale) {
  return `${scale.domain().toString()}-${scale.range().toString()}`;
}

const defaultStyle = {
  labels: {
    labelColor: '#8B7E7E', // Default label color
    labelWeight: 100,
    labelSize: 11,
  },
  axis: {
    axisColor: '#C0C0C0',
  },
};

/**
 * Renders a horizontal time axis. This is used internally by the ChartContainer
 * as a result of you specifying the timerange for the chart. Please see the API
 * docs for ChartContainer for more information.
 */
export default class XAxis extends React.Component {

  /*
  renderTimeAxis(scale) {
    let axis;

    const tickSize = this.props.showGrid ? -this.props.gridHeight : 10;
    const utc = this.props.utc;

    if (this.props.format === 'day') {
      axis = axisBottom(scale)
        .tickArguments([utc ? utcDay : timeDay, 1])
        .tickFormat(timeFormat('%d'))
        .tickSizeOuter(0);
    } else if (this.props.format === 'month') {
      axis = axisBottom(scale)
        .tickArguments([utc ? utcMonth : timeMonth, 1])
        .tickFormat(timeFormat('%B'))
        .tickSizeOuter(0);
    } else if (this.props.format === 'year') {
      axis = axisBottom(scale)
        .tickArguments([utc ? utcYear : timeYear, 1])
        .tickFormat(timeFormat('%Y'))
        .tickSizeOuter(0);
    } else if (this.props.format === 'relative') {
      axis = axisBottom(scale)
        .tickFormat(d => moment.duration(+d).format())
        .tickSizeOuter(0);
    } else {
      axis = axisBottom(scale)
        .tickSize(0);
    }

    // Style


    const labelStyle = merge(true,
                 defaultStyle.labels,
                 this.props.style.labels ? this.props.style.labels : {});
    const axisStyle = merge(true,
                defaultStyle.axis,
                this.props.style.axis ? this.props.style.axis : {});
    const { axisColor } = axisStyle;
    const { labelColor, labelWeight, labelSize } = labelStyle;
  */
   
  render() {
    const [ beginTime, endTime ] = this.props.scale.domain();
    const [ x1, x2 ] = this.props.scale.range();
    console.log(beginTime, endTime, this.props.scale.range());

    return (
      <TimeAxis
        beginTime={beginTime}
        endTime={endTime}
        timezone="America/Chicago"
        position="bottom"
        width={x2 - x1}
        height={this.props.height}
      />
    );
  }
}

XAxis.defaultProps = {
  showGrid: false,
  style: defaultStyle,
};

XAxis.propTypes = {
  scale: React.PropTypes.func.isRequired,
  showGrid: React.PropTypes.bool,
  gridHeight: React.PropTypes.number,
  format: React.PropTypes.string,
  utc: React.PropTypes.bool,
  style: React.PropTypes.shape({
    labels: React.PropTypes.object,     // eslint-disable-line
    axis: React.PropTypes.object,       // eslint-disable-line
  }),
};

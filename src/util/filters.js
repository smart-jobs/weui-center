/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
import _ from 'lodash';
import moment from 'moment';

export function dict(value, type) {
  if (!value) return '';
  value = value.toString();
  if (this.codes) {
    value = _.get(this.codes, [type, value]) || value;
  }
  return value;
}

export function date(value, formmat) {
  if (!_.isDate(value)) return '';
  return moment(value).format(formmat);
}

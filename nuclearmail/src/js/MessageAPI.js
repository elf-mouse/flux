/** @flow */
/* global gapi */

var ActionType = require('./ActionType');
var API = require('./API');
var Dispatcher = require('./Dispatcher');
var MessageTranslator = require('./MessageTranslator');
var RSVP = require('rsvp');
var _ = require('lodash');

import type {TMessage} from './Types';
type Message = typeof TMessage;

function getByIDs(
  options: {ids: Array<string>}
): Promise<Array<Message>> {
  return API.wrap(() => {
    var batch = gapi.client.newHttpBatch();
    options.ids.forEach(id => {
      batch.add(
        gapi.client.gmail.users.messages.get({userId: 'me', id}),
        {id}
      );
    });
    return API.execute(batch).then(
      response => options.ids.map(messageID => {
        return MessageTranslator.translate(response[messageID].result);
      })
    );
  });
}

module.exports = {
  getByIDs,
};

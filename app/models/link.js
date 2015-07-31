var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var linkSchema = new Schema({
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: {type: Number, default: 0}
});

linkSchema.pre('save', function(model, attrs, options){
  var shasum = crypto.createHash('sha1');
  shasum.update(model.url);
  model.code = shasum.digest('hex').slice(0, 5));
});

var Link = mongoose.model('Link', linkSchema);

module.exports = Link;


/*
var db = require('../config');
var crypto = require('crypto');

var Link = db.Model.extend({
  tableName: 'urls',
  hasTimestamps: true,
  defaults: {
    visits: 0
  },
  initialize: function(){
    this.on('creating', function(model, attrs, options){
      var shasum = crypto.createHash('sha1');
      shasum.update(model.get('url'));
      model.set('code', shasum.digest('hex').slice(0, 5));
    });
  }
});

module.exports = Link;
*/
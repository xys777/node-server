/**
 * Created by a514804 on 10/27/2016.
 */

var MultipartParser
  ,NL = '\r\n' // RFC2046 S4.1.1
  ,BOUNDARY_PREFIX = NL+'--' // RFC2046 S5.1.1
  ,HEADER_PAIR_DELIM = ':'
  ,HEADER_SUB_DELIM = '='
  ;

module.exports = MultipartParser = function(contentType,data) {
  this.parts = {};
  this.fields = [];
  this.isMultipart = false;

  if ( typeof contentType === 'string' ) {
    contentType = contentType.trim();
    this.isMultipart = contentType.indexOf('multipart/form-data') === 0;
    parse.call(this,contentType,data);
  }
};

function parse(contentType,data) {
  var self = this;
  if ( !this.isMultipart ) {
    return;
  }
  if ( data.substr(0,NL.length) != NL ) {
    data = NL+data;
  }
  var params = parseHeaderValue(contentType);
  if ( params.hasOwnProperty('boundary') ) {
    var parts = data.split(BOUNDARY_PREFIX+params.boundary);
    parts.forEach(function(chunk,i,arr) {
      // split the headers and body for this chunk
      var pieces = splitHeaderBody(chunk);
      if ( pieces.header && pieces.body ) {
        // build headers object
        var headers = parseHeader(pieces.header);
        // if nested multipart form-data, recurse
        if ( headers.hasOwnProperty('content-type') && headers['content-type'].indexOf('multipart/form-data') === 0 ) {
          parse.call(this,headers['content-type'],pieces.body);
        } else if ( headers.hasOwnProperty('content-disposition') ) {
          var disposition = parseHeaderValue(headers['content-disposition']);
          if ( disposition.hasOwnProperty('name') ) {
            self.fields.push(disposition.name);
            self.parts[disposition.name] = {
              headers: headers,
              disposition: disposition,
              mime: headers['content-type']||'',
              body: pieces.body
            };
          }
        }
      }
    });
  }
}

function splitHeaderBody(data) {
  var sections = data.split(NL+NL);
  return {
    header: sections.shift()||'',
    body: sections.join()||''
  };
}

function parseHeader(header) {
  var headers = {},
    headersArr = header.split(NL)
      .map(function(v){return v.trim();})
      .filter(function(v){return !!v;})
  headersArr.forEach(function(v){
    var o = {},
      t = v.split(HEADER_PAIR_DELIM,2);
    if ( typeof t[1] == 'string' ) {
      t[1] = t[1].trim();
    }
    headers[t[0].toLowerCase().trim()] = t[1];
  });
  return headers;
}

function parseHeaderValue(value) {
  var params = {},
    paramsArr = value.split(';')
      .map(function(v){return v.trim();})
      .filter(function(v){return !!(v||v.indexOf('='));});
  paramsArr.forEach(function(v){
    var o = {},
      t = v.split(HEADER_SUB_DELIM,2);
    if ( typeof t[1] == 'string' ) {
      t[1] = t[1].replace(/^[\s'"]+|[\s'"]+$/g,'');
    }
    params[t[0].toLowerCase().trim()] = t[1];
  });
  return params;
}

function createUrl(query) {
  var baseUrl = 'http://en.wikipedia.org/w/api.php';
  params = {};
  params.action = 'query';
  params.list = 'search';
  params.srsearch = query;
  params.utf8 = '';
  console.log(params)
  var paramUrl = baseUrl + '?' + serialize(params);
  return paramUrl;
}

function serialize(params) {
  var urlString = Object.keys(params).map(function(key) {
    return key + '=' + params[key];
  }).join('&');
  return urlString;
}


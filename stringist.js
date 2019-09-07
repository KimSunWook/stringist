function stringist(json) {
  if (typeof json != 'string') {
    json = JSON.stringify(json, undefined, '\t');
  }

  var
    arr = [],
    _key = 'color:#FC5572', // Red
    _string = 'color:#A33AF6', // Purple
    _number = 'color:#FFAC1F', // Yellow
    _boolean = 'color:#1D68FF', // Blue
    _null = 'color:#44AE11'; // Green

  json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
    var style = _number;
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        style = _key;
      } else {
        style = _string;
      }
    } else if (/true|false/.test(match)) {
      style = _boolean;
    } else if (/null/.test(match)) {
      style = _null;
    }
    arr.push(style);
    arr.push('');
    return '%c' + match + '%c';
  });

  arr.unshift(json);

  console.log.apply(console, arr);
}

window.stringist = stringist;

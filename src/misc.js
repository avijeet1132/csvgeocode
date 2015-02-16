module.exports = {
  //Is it numeric and between -180 and +180?
  isNumeric: function(number) {
    return !Array.isArray(number) && (number - parseFloat(number) + 1) >= 0 && number >= -180 && number <= 180;
  },
  //Escape address to include as GET parameter
  url: function(url,address) {
      return url.replace("{{a}}",address.replace(/ /g,"+").replace(/[&]/g,"%26"));
  },
  //Try to auto-discover missing column names
  discoverOptions: function(options,row) {

    for (var key in row) {
      if (options.lat === null && key.trim().match(/^lat(itude)?$/i)) {
        options.lat = key;
        continue;
      }
      if (options.lng === null && key.trim().match(/^lo?ng(itude)?$/i)) {
        options.lng = key;
        continue;
      }
      if (options.address === null && key.trim().match(/^(street[^a-z]*)?addr(ess)?$/i)) {
        options.address = key;
        continue;
      }
    }

    if (options.lat === null) {
      options.lat = "lat";
    }

    if (options.lng === null) {
      options.lng = "lng";
    }

    return options;

  }
};
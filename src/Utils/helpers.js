// @flow


export function FormatDate(datesString, multiple) {
  const monthStr = {
    0: 'januari',
    1: 'februari',
    2: 'mars',
    3: 'april',
    4: 'maj',
    5: 'juni',
    6: 'juli',
    7: 'augusti',
    8: 'september',
    9: 'oktober',
    10: 'november',
    11: 'december'
  };

  // Fetching all dates from Drupal but we just set next as date.
  const dates = datesString.split(', ');
  const day = null;
  let formatted = null;
  for (const d of dates) {
    const date = new Date();
    const unixNow = Math.round(+date.setHours(0, 0, 0, 0) / 1000);

    if (d < unixNow) continue;
    const dateStamp = parseInt(d) * 1000;
    // if (isAndroid) {
    //   date_stamp = date_stamp + (1000 * 60 * 60 * 4);
    // }
    const dateObj = new Date(dateStamp);
    let day = null;
    if (multiple) {
      day = multiple;
    } else {
      day = dateObj.getDate();
    }
    const month = monthStr[dateObj.getMonth()];
    formatted = `${day} ${month}`;
    break;
  }
  return formatted;
}

export function FormatIntro(intro) {
  return `${intro.substring(0, 70)} ...`;
}

export function FormatCoords(position) {
  // Storing 6 digit floats in backend.
  let { latitude } = position;
  let { longitude } = position;
  if (latitude.toString().length > 6) {
    latitude = parseFloat(latitude).toPrecision(6);
  }
  if (longitude.toString().length > 6) {
    longitude = parseFloat(longitude).toPrecision(6);
  }
  const coords = {
    latitude,
    longitude,
  };
  return coords;
}

export function FormatSlug(string) {
    const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœṕŕßśșțùúüûǘẃẍÿź·/_,:;'
    const b = 'aaaaaaaaceeeeghiiiimnnnoooooprssstuuuuuwxyz------'
    const p = new RegExp(a.split('').join('|'), 'g')

    return string.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
}

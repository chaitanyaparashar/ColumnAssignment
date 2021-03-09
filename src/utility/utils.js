export function isEmpty(obj) {
  // console.log(typeof(obj));
  if (obj !== null && obj !== undefined) {
    // for general objects
    if (typeof obj === 'string') {
      if (obj.trim() === '' || obj == 'null') {
        // for string
        return true;
      }

      return false;
    } else if (obj.length <= 0) {
      // for array
      return true;
    } else if (typeof obj === 'object') {
      const keys = Object.keys(obj);
      const len = keys.length;
      if (len <= 0) {
        return true;
      }
      return false;
    }
    return false;
  }

  return true;
}

// library returns multiple duplicate entries, this func is to filter unique items.

export const filterArrayForPhone = (arr) => {
  if (isEmpty(arr)) {
    return;
  }
  let valueData = [];
  valueData.push(arr[0]);
  let arrData = arr.filter((value, index) => {
    if (index === 0) {
      return true;
    }
    return !value.number
      .replace(/[^0-9]+/g, '')
      .trim()
      .match(valueData[0].number.replace(/[^0-9]+/g, '').trim());
  });
  if (arrData.length === 0) {
    return valueData;
  } else {
    return arrData;
  }
};

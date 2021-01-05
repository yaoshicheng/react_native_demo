export const isURL = (str_url) => {
   const re =  /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
//   var re = new RegExp(strRegex);
   return re.test(str_url);
}
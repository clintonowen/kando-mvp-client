export const normalizeResponseErrors = res => {
  if (!res.ok) {
    if (
      res.headers.has('content-type') &&
      res.headers.get('content-type').startsWith('application/json')
      ) {
        // It's a nice JSON error returned by us, so decode it
        return res.json().then(err => Promise.reject(err));
      }
      // It's a less informative error returned by express
      return Promise.reject({
        code: res.status,
        message: res.statusText
      });
    }
  return res;
};

export const makeId = () => {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 24; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
  
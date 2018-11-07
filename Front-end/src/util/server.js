export const server = (path, method, body) => new Promise((resolve, reject) => {
  fetch(
    process.env.REACT_APP_SERVER + path,
    {
      method: method? method: 'GET',
      body
    }
  ).then(
    dat => dat.json()
  ).then(
    ({ data, err }) => (
      err? reject(err): resolve(data)
    )
  );
})
// export default function ImageApi(searchInfo, page) {
//   const KEY = '24397796-604c3a9fc6ff44cceee5653ad';
//   const BASE_URL = 'https://pixabay.com/api/';
//   return fetch(
//     `${BASE_URL}?q=${searchInfo}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
//   ).then(response => {
//     if (response.ok) {
//       return response.json();
//     }
//     return Promise.reject(new Error(`Sorry no matches found`));
//   });
// }
// =======
function fetchGallery(searchInfo, page) {
  const KEY = '24397796-604c3a9fc6ff44cceee5653ad';
  const BASE_URL = 'https://pixabay.com/api/';
  console.log(page);
  return fetch(
    `${BASE_URL}?q=${searchInfo}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`No results`));
  });
}

export default fetchGallery;

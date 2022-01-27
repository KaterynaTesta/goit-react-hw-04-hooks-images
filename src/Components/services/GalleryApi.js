import axios from 'axios';
const KEY = '24397796-604c3a9fc6ff44cceee5653ad';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const fetchGallery = async (data, page) => {
  const result = await axios.get(
    `?q=${data}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  );
  const { hits } = result.data;
  return hits;
};
export default fetchGallery;

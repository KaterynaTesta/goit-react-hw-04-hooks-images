import { useEffect, useState } from 'react';
import Searchbar from './Components/SearchBar/SearchBar';
import ImageGallery from './Components/ImageGallery/ImageGallery';
import fetchGallery from './Components/services/GalleryApi';
import Loader from './Components/Loader/Loader';
import Button from './Components/Button/Button';
import Modal from './Components/Modal/Modal';
// import s from './App.module.css';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [searchInfo, setSearchInfo] = useState([]);
  const [page, setPage] = useState('1');
  const [images, setImages] = useState('');
  const [isLoadMore, setIsLoadMore] = useState(false);

  const onModalOpen = () => setIsOpenModal(true);
  const onModalClose = () => setIsOpenModal(false);

  const onImageOpen = img => {
    setLargeImage(img);
    onModalOpen();
  };
  useEffect(() => {
    if (!images) return;
    setLoading(true);
    const getimages = async () => {
      try {
        const searchInfo = await fetchGallery(images, page);
        setSearchInfo(prevInfo => [...prevInfo, ...searchInfo]);
        setLoading(false);
        setIsLoadMore(true);
        if (searchInfo.length < 12) {
          setIsLoadMore(false);
        }
      } catch (error) {
        alert('Whooops, Error');
        setLoading(false);
      }
    };
    getimages();
  }, [images, page]);

  const handleFormSubmit = name => {
    setIsLoadMore(false);
    setSearchInfo([]);
    setPage(1);
    setImages(name);
  };
  const onClickLoadMore = () => {
    setPage(prevState => prevState + 1);
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };
  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />

      <ImageGallery searchInfo={searchInfo} onModalShow={onImageOpen} />
      {isLoadMore && <Button onLoadMore={onClickLoadMore} />}
      {isOpenModal && <Modal image={largeImage} onClose={onModalClose}></Modal>}
      {loading && <Loader />}
    </>
  );
}
//  // export default class App extends Component
// //   state = {
// //     searchInfo: '',
// //     images: [],
// //     page: 1,
// //     status: 'idle',
// //     largeImage: '',
// //   };

// //   componentDidUpdate(prevProps, prevState) {
// //     // if (prevState.searchInfo !== this.state.searchInfo) {
// //     //   this.fetchInfo();
// //     // }
// //     if (prevState.searchInfo !== this.state.searchInfo || prevState.page !== this.state.page) {
// //       this.fetchInfo();
// //     }
// //   }

// //   handleFormSubmit = name => {
// //     this.setState({ searchInfo: name, page: 1, images: [] });
// //   };

// //   fetchInfo = () => {
// //     const { searchInfo, page } = this.state;
// //     this.setState({ status: 'pending' });
// //     console.log(page);

// //     fetchGallery(searchInfo, this.state.page).then(images => {
// //       if (images.totalHits !== 0) {
// //         return this.setState(prevState => ({
// //           images: [...prevState.images, ...images.hits],
// //           status: 'resolved',
// //         }));
// //       }
// //       return this.setState({ status: 'rejected' });
// //     });
// //   };

// //   onLoadMore = () => {
// //     this.setState(prevState => ({ page: prevState.page + 1 }));

// //     window.scrollTo({
// //       top: document.documentElement.scrollHeight,
// //       behavior: 'smooth',
// //     });
// //   };

// //   onCloseModal = () => {
// //     this.setState({ largeImage: '' });
// //   };
// //   onImageOpen = largeImage => {
// //     this.setState({ largeImage: largeImage });
// //   };
// //   render() {
// //     const { status, images, page, largeImage } = this.state;
// //     return (
// //       <>
// //         <Searchbar onSubmit={this.handleFormSubmit} />
// //         {status === 'idle' && ''}
// //         {status === 'pending' && <Loader />}
// //         {status === 'pending' && page > 1 && (
// //           <>
// //             <ImageGallery images={images} onModalShow={this.onImageOpen} />
// //             <Loader />
// //           </>
// //         )}
// //         {status === 'resolved' && (
// //           <>
// //             <ImageGallery images={images} onModalShow={this.onImageOpen} />

// //             <Button onLoadMore={this.onLoadMore} />
// //           </>
// //         )}
// //         {status === 'rejected' && alert('Plese try again')}
// //         {largeImage && <Modal image={largeImage} onClose={this.onCloseModal}></Modal>}
// //       </>
// //     );
// //   }
// // }
//  */}

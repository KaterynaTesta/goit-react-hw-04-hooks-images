import { Component } from 'react';
import Searchbar from './Components/SearchBar/SearchBar';
import ImageGallery from './Components/ImageGallery/ImageGallery';
import fetchGallery from './Components/services/GalleryApi';
import Loader from './Components/Loader/Loader';
import Button from './Components/Button/Button';
import Modal from './Components/Modal/Modal';
// import s from './App.module.css';

export default class App extends Component {
  state = {
    searchInfo: '',
    images: [],
    page: 1,
    status: 'idle',
    largeImage: '',
  };

  componentDidUpdate(prevProps, prevState) {
    // if (prevState.searchInfo !== this.state.searchInfo) {
    //   this.fetchInfo();
    // }
    if (prevState.searchInfo !== this.state.searchInfo || prevState.page !== this.state.page) {
      this.fetchInfo();
    }
  }

  handleFormSubmit = name => {
    this.setState({ searchInfo: name, page: 1, images: [] });
  };

  fetchInfo = () => {
    const { searchInfo, page } = this.state;
    this.setState({ status: 'pending' });
    console.log(page);

    fetchGallery(searchInfo, this.state.page).then(images => {
      if (images.totalHits !== 0) {
        return this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          status: 'resolved',
        }));
      }
      return this.setState({ status: 'rejected' });
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  onCloseModal = () => {
    this.setState({ largeImage: '' });
  };
  onImageOpen = largeImage => {
    this.setState({ largeImage: largeImage });
  };
  render() {
    const { status, images, page, largeImage } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === 'idle' && ''}
        {status === 'pending' && <Loader />}
        {status === 'pending' && page > 1 && (
          <>
            <ImageGallery images={images} onModalShow={this.onImageOpen} />
            <Loader />
          </>
        )}
        {status === 'resolved' && (
          <>
            <ImageGallery images={images} onModalShow={this.onImageOpen} />

            <Button onLoadMore={this.onLoadMore} />
          </>
        )}
        {status === 'rejected' && alert('Plese try again')}
        {largeImage && <Modal image={largeImage} onClose={this.onCloseModal}></Modal>}
      </>
    );
  }
}

// ==============================
//   sendQueryInState = data => {
//     this.setState(data);
//   };
//   componentDidUpdate(prevProps, prevState) {
//     const prevQuery = prevProps.query;
//     const nextQuery = this.props.query;

//     if (prevQuery !== nextQuery) {
//       this.setState({ status: 'pending' });
//       ImageApi(nextQuery)
//         .then(response => {
//           if (response.ok) {
//             return response.json();
//           }
//           return Promise.reject(new Error(`no images on request`));
//         })
//         .then(({ hits }) => {
//           if (hits.length === 0) {
//             this.setState({ status: 'rejected' });
//           } else {
//             const newHits = this.match(hits);
//             this.setState({
//               gallery: newHits,
//               status: 'resolved',
//               page: this.state.page + 1,
//               searchQuery: nextQuery,
//             });
//           }
//         })
//         .catch(error => {
//           this.setState({ status: 'rejected' });
//           console.log(error);
//         });
//     }
//   }

//   loadmore = () => {
//     const { searchQuery, page } = this.state;

//     ImageApi(searchQuery, page)
//       .then(response => {
//         return response.json();
//       })
//       .then(({ hits }) => {
//         const newHits = this.match(hits);
//         this.setState(prevState => ({
//           gallery: [...prevState.gallery, ...newHits],
//           page: page + 1,
//         }));
//       })
//       .then(() => {
//         window.scrollTo({
//           top: document.documentElement.scrollHeight,
//           behavior: 'smooth',
//         });
//       })
//       .catch(error => {
//         this.setState({ status: 'rejected' });
//         console.log(error);
//       });
//   };

//   match(arr) {
//     const newArr = [];
//     arr.forEach(({ id, largeImageURL, tags }) => {
//       newArr.push({ id, largeImageURL, tags });
//     });
//     return newArr;
//   }

//   toggleModal = () => {
//     this.setState(prevState => ({ showModal: !prevState.showModal }));
//   };

//   decrementModal = () => {
//     const { currentImgIdx, gallery } = this.state;
//     if (currentImgIdx > 0) {
//       this.setState({
//         modalImgSrc: gallery[currentImgIdx - 1].largeImageURL,
//         currentImgIdx: currentImgIdx - 1,
//       });
//     }
//   };

//   incrementModal = () => {
//     const { currentImgIdx, gallery } = this.state;
//     if (currentImgIdx < gallery.length - 1) {
//       this.setState({
//         modalImgSrc: gallery[currentImgIdx + 1].largeImageURL,
//         currentImgIdx: currentImgIdx + 1,
//       });
//     }
//   };

//   modalOpen = (src, alt, id) => {
//     this.setState({
//       largeImageURL: src,
//       alt,
//     });
//     this.toggleModal();

//     this.state.gallery.map((item, idx) => {
//       if (item.id === id) {
//         this.setState({
//           currentImgIdx: idx,
//         });
//       }
//       return '';
//     });
//   };
//   render() {
//     const { status, gallery, page, largeImageURL, modalImgSrc, alt } = this.state;
//     return (
//       <div>
//         <Searchbar onSubmit={this.sendQueryInState} />
//         {status === 'idle' && ''}
//         {status === 'pending' && (
//           <BallTriangle
//             type="Audio"
//             color="#3f51b5"
//             height={100}
//             width={100}
//             timeout={300000}
//             style={{ textAlign: 'center', paddingTop: '25px', justifyContent: 'center' }}
//           />
//         )}
//         {status === 'pending' && page > 1 && (
//           <>
//             <ImageGallery query={gallery} onOpenModal={this.modalOpen} />
//           </>
//         )}
//         {status === 'resolved' && (
//           <>
//             <ImageGallery query={gallery} />
//             <Modal
//               onClose={this.toggleModal}
//               onLeft={this.decrementModal}
//               onRight={this.incrementModal}
//               src={modalImgSrc || largeImageURL}
//               tags={alt}
//             />
//             <Button onClick={this.loadmore} />
//           </>
//         )}
//         {status === 'rejected' && alert('Plese try again')}
//         {largeImageURL && <Modal image={largeImageURL} onClose={this.toggleModal} />}
//       </div>
//     );
//   }
// }

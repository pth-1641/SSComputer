import axios from 'axios';
import { useEffect, useState } from 'preact/hooks';
import { useParams } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import ProductBasic from '../../components/ProductBasic';
import ProductDetails from '../../components/ProductDetails';
import ProductReviews from '../../components/ProductReviews';
import ProductSpecs from '../../components/ProductSpecs';
import ProductsSlider from '../../components/ProductsSlider';

function DriveDetails() {
  const [drive, setDrive] = useState();
  const [currentTab, setCurrentTab] = useState('specs');
  const { id } = useParams();
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/drives/${id}`);
      setDrive(data);
    })();
  }, []);

  if (!drive) {
    return <></>;
  }

  return (
    <div className='max-w-6xl mx-auto'>
      <ProductBasic
        item={drive}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        inventory={drive.quantity}
      />
      {currentTab === 'specs' && (
        <ProductSpecs specs={drive.details} title={drive.title} />
      )}
      {currentTab === 'details' && (
        <ProductDetails details={drive.details.review} title={drive.title} />
      )}
      {currentTab === 'reviews' && <ProductReviews />}
    </div>
  );
}

export default DriveDetails;

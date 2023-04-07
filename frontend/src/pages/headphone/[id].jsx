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

function HeadphoneDetails() {
  const [headphone, setHeadphone] = useState();
  const [currentTab, setCurrentTab] = useState('specs');
  const { id } = useParams();
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/headphones/${id}`);
      setHeadphone(data);
    })();
  }, []);

  if (!headphone) {
    return <></>;
  }

  return (
    <div className='max-w-6xl mx-auto'>
      <ProductBasic
        item={headphone}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        inventory={headphone.quantity}
      />
      {currentTab === 'specs' && (
        <ProductSpecs specs={headphone.details} title={headphone.title} />
      )}
      {currentTab === 'details' && (
        <ProductDetails
          details={headphone.details.review}
          title={headphone.title}
        />
      )}
      {currentTab === 'reviews' && <ProductReviews />}
    </div>
  );
}

export default HeadphoneDetails;

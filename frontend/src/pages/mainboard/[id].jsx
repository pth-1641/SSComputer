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

function MainboardDetails() {
  const [mainboard, setMainboard] = useState();
  const [currentTab, setCurrentTab] = useState('specs');
  const { id } = useParams();
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/mainboards/${id}`);
      setMainboard(data);
    })();
  }, []);

  if (!mainboard) {
    return <></>;
  }

  return (
    <div className='max-w-6xl mx-auto'>
      <ProductBasic
        item={mainboard}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        inventory={mainboard.quantity}
      />
      {currentTab === 'specs' && (
        <ProductSpecs specs={mainboard.details} title={mainboard.title} />
      )}
      {currentTab === 'details' && (
        <ProductDetails
          details={mainboard.details.review}
          title={mainboard.title}
        />
      )}
      {currentTab === 'reviews' && <ProductReviews />}
    </div>
  );
}

export default MainboardDetails;

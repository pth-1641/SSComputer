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

function ScreenDetails() {
  const [screen, setScreen] = useState();
  const [currentTab, setCurrentTab] = useState('specs');
  const { id } = useParams();
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/screens/${id}`);
      setScreen(data);
    })();
  }, []);

  if (!screen) {
    return <></>;
  }

  return (
    <div className='max-w-6xl mx-auto'>
      <ProductBasic
        item={screen}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        inventory={screen.quantity}
      />
      {currentTab === 'specs' && (
        <ProductSpecs specs={screen.details} title={screen.title} />
      )}
      {currentTab === 'details' && (
        <ProductDetails details={screen.details.review} title={screen.title} />
      )}
      {currentTab === 'reviews' && <ProductReviews />}
    </div>
  );
}

export default ScreenDetails;

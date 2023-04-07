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

function MouseDetails() {
  const [mouse, setMouse] = useState();
  const [currentTab, setCurrentTab] = useState('specs');
  const { id } = useParams();
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/mice/${id}`);
      setMouse(data);
    })();
  }, []);

  if (!mouse) {
    return <></>;
  }

  return (
    <div className='max-w-6xl mx-auto'>
      <ProductBasic
        item={mouse}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        inventory={mouse.quantity}
      />
      {currentTab === 'specs' && (
        <ProductSpecs specs={mouse.details} title={mouse.title} />
      )}
      {currentTab === 'details' && (
        <ProductDetails details={mouse.details.review} title={mouse.title} />
      )}
      {currentTab === 'reviews' && <ProductReviews />}
    </div>
  );
}

export default MouseDetails;

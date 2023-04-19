import axios from 'axios';
import { useEffect, useState } from 'preact/hooks';
import {
  AiOutlineCloudUpload,
  AiOutlineMinusSquare,
  AiOutlinePlus,
} from 'react-icons/ai';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { IoCloseSharp } from 'react-icons/io5';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { toast } from 'react-hot-toast';

function CreateItem() {
  const id = new Date().getTime();
  const navigate = useNavigate();

  const [previewThumbnail, setPreviewThumbnail] = useState('');
  const [selectedThumb, setSelectedThumb] = useState();
  const [shortDes, setShortDes] = useState('');
  const [featuredPic, setFeaturedPic] = useState();
  const [previewFeaturedPic, setPreviewFeaturedPic] = useState('');
  const [searchParams] = useSearchParams();
  const [features, setFeatures] = useState([{ type: '', name: '', id }]);
  const [specs, setSpecs] = useState([{ label: '', detail: '', id }]);
  const [details, setDetails] = useState([
    { title: '', detail: '', thumbnail: '', id },
  ]);
  const [gallery, setGallery] = useState([]);
  const [previewGallery, setPreviewGallery] = useState([]);

  const formik = useFormik({
    initialValues: {
      title: '',
      price: 0,
      quantity: 0,
      brand: '',
    },
    onSubmit: async (values) => {
      if (!values.title) {
        toast.error('Không thể để trống tên sản phẩm');
        return;
      }
      if (!values.brand) {
        toast.error('Không thể để trống thương hiệu');
        return;
      }
      if (!selectedThumb) {
        toast.error('Không thể để trống ảnh đại diện');
        return;
      }
      if (values.price <= 0) {
        toast.error('Giá tiền không thể bằng 0');
        return;
      }
      const thumbnail = await uploadImages([selectedThumb]);
      const itemGallery = await uploadImages(gallery);
      const token = localStorage.getItem('access-token');
      const category = searchParams.get('category');
      const { data } = await axios.post(
        `${category}/create`,
        {
          ...values,
          thumbnail: thumbnail[0],
          features,
          details: {
            gallery: itemGallery,
            basic: specs,
            review: {
              shortDescription: {
                title: shortDes,
                thumbnail: featuredPic,
              },
              features: details,
            },
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.status !== 200) {
        toast.error(data.message);
      }
      toast.success('Tạo thành công');
      navigate(`/admin?tab=${category}`);
    },
  });

  const uploadImages = async (items) => {
    const result = items.map(async (item) => {
      const body = new FormData();
      body.set('key', import.meta.env.VITE_IMGBB_KEY);
      body.append('image', item);
      const { data } = await axios({
        method: 'post',
        url: 'https://api.imgbb.com/1/upload',
        data: body,
      });
      return data.data.url;
    });
    const urls = await Promise.all(result);
    return urls;
  };

  const handleChangeThumbnail = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setSelectedThumb(e.target.files[0]);
  };

  const handleRemoveThumbnail = () => {
    setSelectedThumb(undefined);
    setPreviewThumbnail(undefined);
  };

  const handleChangeFeaturedPic = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setFeaturedPic(e.target.files[0]);
  };

  const handleRemoveFeaturedPic = () => {
    setFeaturedPic(undefined);
    setPreviewFeaturedPic(undefined);
  };

  const handleAddNewSpecs = () => {
    const isEmpty = specs.some((x) => !x.label.trim() || !x.detail.trim());
    if (isEmpty) return;
    setSpecs([...specs, { label: '', detail: '', id: new Date().getTime() }]);
  };

  const handleAddNewDetails = () => {
    const isEmpty = details.some(
      (x) => !x.title.trim() && !x.thumbnail.trim() && !x.detail.trim()
    );
    if (isEmpty) return;
    setDetails([
      ...details,
      { title: '', thumbnail: '', detail: '', id: new Date().getTime() },
    ]);
  };

  const handleAddNewFeature = () => {
    const isEmpty = features.some((x) => !x.name.trim() || !x.type.trim());
    if (isEmpty) return;
    setFeatures([
      ...features,
      { type: '', name: '', id: new Date().getTime() },
    ]);
  };

  const handleChangeGallery = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setGallery([...gallery, e.target.files[0]]);
    setPreviewGallery([
      ...previewGallery,
      { id: e.target.files[0].lastModified, objectUrl },
    ]);
  };

  const handleRemoveGallery = (item) => {
    const filteredPreviewGallery = previewGallery.filter(
      (x) => x.objectUrl !== item.objectUrl
    );
    const filteredGallery = gallery.filter((x) => x.lastModified !== item.id);
    setPreviewGallery(filteredPreviewGallery);
    setGallery(filteredGallery);
  };

  useEffect(() => {
    if (!selectedThumb) return;
    const objectUrl = URL.createObjectURL(selectedThumb);
    setPreviewThumbnail(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedThumb]);

  useEffect(() => {
    if (!featuredPic) return;
    const objectUrl = URL.createObjectURL(featuredPic);
    setPreviewFeaturedPic(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [featuredPic]);

  return (
    <div className='bg-emerald-50 pt-8 pb-16'>
      <div className='max-w-4xl mx-auto shadow-lg rounded-lg px-6  py-8 bg-white'>
        <form onSubmit={formik.handleSubmit}>
          <div className='flex flex-col'>
            <label htmlFor='thumbnail'>Ảnh</label>
            {previewThumbnail ? (
              <div className='h-28 w-28 rounded-sm overflow-hidden aspect-square relative'>
                <img
                  src={previewThumbnail}
                  className='object-cover w-full h-full'
                />
                <span
                  className='absolute top-0 -right-0 z-10 text-rose-600 text-lg cursor-pointer'
                  onClick={handleRemoveThumbnail}
                >
                  <IoCloseCircleSharp />
                </span>
              </div>
            ) : (
              <div class='flex items-center w-full'>
                <label
                  for='thumbnail'
                  class='flex flex-col items-center justify-center w-20 h-20 border border-gray-300 rounded-lg cursor-pointer bg-gray-50'
                >
                  <div class='pt-5 pb-6'>
                    <span className='text-4xl text-gray-700'>
                      <AiOutlineCloudUpload />
                    </span>
                  </div>
                  <input
                    id='thumbnail'
                    type='file'
                    class='hidden'
                    name='thumbnail'
                    onInput={handleChangeThumbnail}
                    multiple={false}
                    accept='image/*'
                  />
                </label>
              </div>
            )}
          </div>
          <div className='flex flex-col mt-2'>
            <label htmlFor='gallery'>Bộ sưu tập</label>
            <div class='flex items-center w-full gap-2'>
              <div className='flex items-center gap-2'>
                {previewGallery.map((item) => (
                  <div
                    key={item.id}
                    className='h-20 rounded-sm overflow-hidden aspect-square relative'
                  >
                    <img
                      src={item.objectUrl}
                      className='object-cover w-full h-full'
                    />
                    <span
                      className='absolute top-0 -right-0 z-10 text-rose-600 text-lg cursor-pointer'
                      onClick={() => handleRemoveGallery(item)}
                    >
                      <IoCloseCircleSharp />
                    </span>
                  </div>
                ))}
              </div>
              <label
                for='gallery'
                class='flex flex-col items-center justify-center border aspect-square h-10 border-gray-300   rounded-lg cursor-pointer bg-gray-50'
              >
                <div class='text-2xl text-gray-700'>
                  <MdOutlineAddPhotoAlternate />
                </div>
                <input
                  id='gallery'
                  type='file'
                  class='hidden'
                  name='gallery'
                  onInput={handleChangeGallery}
                  multiple={false}
                  accept='image/*'
                />
              </label>
            </div>
          </div>
          <div className='flex flex-col mt-2'>
            <label htmlFor='title'>Tên sản phẩm</label>
            <input
              type='text'
              name='title'
              className='border outline-none px-2 py-0.5 rounded'
              value={formik.values.title}
              onInput={formik.handleChange}
            />
          </div>
          <div className='flex flex-col mt-2'>
            <label htmlFor='brand'>Thương hiệu</label>
            <input
              type='text'
              name='brand'
              className='border outline-none px-2 py-0.5 rounded'
              value={formik.values.brand}
              onInput={formik.handleChange}
            />
          </div>
          <div className='flex flex-col mt-2'>
            <label htmlFor='price'>Giá</label>
            <input
              type='number'
              name='price'
              className='border outline-none px-2 py-0.5 rounded'
              value={formik.values.price}
              onInput={formik.handleChange}
            />
          </div>
          <div className='flex flex-col mt-2'>
            <label htmlFor='quantity'>Số lượng</label>
            <input
              type='number'
              name='quantity'
              className='border outline-none px-2 py-0.5 rounded'
              value={formik.values.quantity}
              onInput={formik.handleChange}
            />
          </div>
          <div className='grid grid-cols-10 mt-4 gap-2'>
            <label htmlFor='features' className='col-span-2'>
              Tính năng nổi bật
            </label>
            <div className='col-span-8'>
              {features.map((feature) => (
                <div className='grid grid-cols-12 gap-4 mb-2'>
                  <input
                    type='text'
                    className='col-span-4 border outline-none px-2 py-0.5 rounded'
                    value={feature.type}
                    onInput={(e) => (feature.type = e.target.value)}
                    placeholder='Tên'
                  />
                  <input
                    type='text'
                    className='col-span-7 border outline-none px-2 py-0.5 rounded'
                    value={feature.name}
                    onInput={(e) => (feature.name = e.target.value)}
                    placeholder='Chi tiêt'
                  />
                  <span
                    className='col-span-1 flex items-center text-2xl text-red-500 cursor-pointer'
                    onClick={() =>
                      setFeatures(features.filter((x) => x.id !== feature.id))
                    }
                  >
                    <AiOutlineMinusSquare />
                  </span>
                </div>
              ))}
              <button
                className='bg-sky-500 text-white px-2 py-0.5 mt-2 rounded-sm flex gap-1 items-center'
                type='button'
                onClick={handleAddNewFeature}
              >
                <AiOutlinePlus /> Thêm
              </button>
            </div>
          </div>
          <div className='grid grid-cols-10 mt-4 gap-2'>
            <label htmlFor='quantity' className='col-span-2'>
              Thông số kỹ thuật
            </label>
            <div className='col-span-8'>
              {specs.map((spec) => (
                <div className='grid grid-cols-12 gap-4 mb-2'>
                  <input
                    type='text'
                    className='col-span-4 border outline-none px-2 py-0.5 rounded'
                    value={spec.label}
                    onInput={(e) => (spec.label = e.target.value)}
                    placeholder='Tên'
                  />
                  <input
                    type='text'
                    className='col-span-7 border outline-none px-2 py-0.5 rounded'
                    value={spec.detail}
                    onInput={(e) => (spec.detail = e.target.value)}
                    placeholder='Chi tiêt'
                  />
                  <span
                    className='col-span-1 flex items-center text-2xl text-red-500 cursor-pointer'
                    onClick={() =>
                      setSpecs(specs.filter((x) => x.id !== spec.id))
                    }
                  >
                    <AiOutlineMinusSquare />
                  </span>
                </div>
              ))}
              <button
                className='bg-sky-500 text-white px-2 py-0.5 mt-2 rounded-sm flex gap-1 items-center'
                type='button'
                onClick={handleAddNewSpecs}
              >
                <AiOutlinePlus /> Thêm
              </button>
            </div>
          </div>
          <div className='grid grid-cols-10 mt-4 gap-2'>
            <label htmlFor='quantity' className='col-span-2'>
              Chi tiết sản phẩm
            </label>
            <div className='col-span-8'>
              <textarea
                cols='30'
                rows='3'
                className='resize-none w-full rounded border outline-none px-2 py-0.5'
                placeholder='Miêu tả ngắn gọn sản phẩm'
                value={shortDes}
                onInput={(e) => setShortDes(e.target.value)}
              ></textarea>
              {previewFeaturedPic ? (
                <div className='h-28 w-28 rounded-sm overflow-hidden aspect-square relative'>
                  <img
                    src={previewFeaturedPic}
                    className='object-cover w-full h-full'
                  />
                  <span
                    className='absolute top-0 -right-0 z-10 text-rose-600 text-lg cursor-pointer'
                    onClick={handleRemoveFeaturedPic}
                  >
                    <IoCloseCircleSharp />
                  </span>
                </div>
              ) : (
                <div class='flex items-center w-full'>
                  <label
                    for='thumbnail'
                    class='flex flex-col items-center justify-center w-20 h-20 border border-gray-300 rounded-lg cursor-pointer bg-gray-50'
                  >
                    <div class='pt-5 pb-6'>
                      <span className='text-4xl text-gray-700'>
                        <AiOutlineCloudUpload />
                      </span>
                    </div>
                    <input
                      id='thumbnail'
                      type='file'
                      class='hidden'
                      name='thumbnail'
                      onInput={handleChangeFeaturedPic}
                      multiple={false}
                      accept='image/*'
                    />
                  </label>
                </div>
              )}
              <hr className='mt-5 border-dashed border-2' />
              {details.map((detail) => (
                <div className='grid grid-cols-12 items-start gap-4 mt-5'>
                  <div className='col-span-11 flex flex-col gap-2'>
                    <input
                      type='text'
                      className='col-span-4 border outline-none px-2 py-0.5 rounded'
                      placeholder='Tiêu đề'
                      value={detail.title}
                      onInput={(e) => (detail.title = e.target.value)}
                    />
                    <input
                      type='text'
                      className='col-span-7 border outline-none px-2 py-0.5 rounded'
                      placeholder='Chi tiết'
                      value={detail.detail}
                      onInput={(e) => (detail.detail = e.target.value)}
                    />
                    {/* <input
                      type='text'
                      className='col-span-7 border outline-none px-2 py-0.5 rounded'
                      placeholder='Ảnh'
                      value={detail.thumbnail}
                      onInput={(e) => (detail.thumbnail = e.target.value)}
                    /> */}
                  </div>
                  <span
                    className='col-span-1 flex items-center text-2xl text-red-500 cursor-pointer'
                    onClick={() =>
                      setDetails(details.filter((x) => x.id !== detail.id))
                    }
                  >
                    <AiOutlineMinusSquare />
                  </span>
                </div>
              ))}
              <button
                className='bg-sky-500 text-white px-2 py-0.5 mt-2 rounded-sm flex gap-1 items-center'
                type='button'
                onClick={handleAddNewDetails}
              >
                <AiOutlinePlus /> Thêm
              </button>
            </div>
          </div>
          <div className='mt-4 flex justify-end items-center gap-2'>
            <button
              className='px-3 py-0.5 border border-emerald-500 text-emerald-500 text-lg rounded-sm'
              type='button'
              onClick={() =>
                navigate(`/admin?tab=${searchParams.get('category')}`)
              }
            >
              Trở lại
            </button>
            <button
              className='px-3 py-0.5 bg-emerald-500 text-white text-lg rounded-sm'
              type='submit'
            >
              Tạo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateItem;

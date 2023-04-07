import { useEffect, useState } from 'preact/hooks';

function specs({ specs, title }) {
  const [listSpecs, setListSpecs] = useState([]);

  useEffect(() => {
    const list = [];
    const specsCopy = { ...specs };
    delete specsCopy.review;
    delete specsCopy.gallery;

    Object.values(specsCopy).forEach((v) => {
      if (!Array.isArray(v[0]) && typeof v[0] !== 'string') list.push(...v);
    });
    setListSpecs(list);
  }, []);

  if (!listSpecs.length) {
    return (
      <p className='text-center my-10 font-medium'>
        Chưa có cấu hình chi tiết của {title}
      </p>
    );
  }

  return (
    <table className='w-full max-w-5xl mx-auto my-10'>
      {listSpecs.map((spec) => (
        <tr className='border'>
          <td className='border px-4 py-2 bg-emerald-50'>
            {spec.label?.split(':')[0]}
          </td>
          <td className='px-4 py-2'>{spec.detail || 'Không có thông tin'}</td>
        </tr>
      ))}
      {typeof specs.accessory?.[0] === 'string' && (
        <tr className='border'>
          <td className='border px-4 py-2 bg-emerald-50'>Phụ kiện</td>
          <td className='px-4 py-2'>
            {specs.accessory.length ? specs.accessory.join(', ') : 'Không'}
          </td>
        </tr>
      )}
    </table>
  );
}

export default specs;

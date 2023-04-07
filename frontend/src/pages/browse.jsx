import { Link } from 'react-router-dom';

const genres = [
  {
    thumbnail:
      'https://img.icons8.com/external-febrian-hidayat-gradient-febrian-hidayat/128/null/external-Tower-PC-pc-gaming-febrian-hidayat-gradient-febrian-hidayat.png',
    title: 'Vỏ case',
    link: '/case',
  },
  {
    thumbnail:
      'https://img.icons8.com/external-febrian-hidayat-gradient-febrian-hidayat/128/null/external-Motherboard-pc-gaming-febrian-hidayat-gradient-febrian-hidayat.png',
    title: 'Mainboard',
    link: '/mainboard',
  },
  {
    thumbnail:
      'https://img.icons8.com/external-febrian-hidayat-gradient-febrian-hidayat/128/null/external-Personal-Computer-pc-gaming-febrian-hidayat-gradient-febrian-hidayat.png',
    title: 'Máy tính',
    link: '/computer',
  },
  {
    thumbnail:
      'https://img.icons8.com/external-febrian-hidayat-gradient-febrian-hidayat/128/null/external-Laptop-pc-gaming-febrian-hidayat-gradient-febrian-hidayat.png',
    title: 'Laptop',
    link: '/laptop',
  },
  {
    thumbnail:
      'https://img.icons8.com/external-febrian-hidayat-gradient-febrian-hidayat/128/null/external-Solid-State-Drive-pc-gaming-febrian-hidayat-gradient-febrian-hidayat.png',
    title: 'CPU',
    link: '/cpu',
  },
  {
    thumbnail:
      'https://img.icons8.com/external-febrian-hidayat-gradient-febrian-hidayat/128/null/external-Video-Graphics-Adapter-pc-gaming-febrian-hidayat-gradient-febrian-hidayat.png',
    title: 'GPU',
    link: '/gpu',
  },
  {
    thumbnail:
      'https://img.icons8.com/external-febrian-hidayat-gradient-febrian-hidayat/128/null/external-Random-Access-Memory-pc-gaming-febrian-hidayat-gradient-febrian-hidayat.png',
    title: 'RAM',
    link: '/ram',
  },
  {
    thumbnail:
      'https://img.icons8.com/external-febrian-hidayat-gradient-febrian-hidayat/128/null/external-Hard-Disk-Drive-pc-gaming-febrian-hidayat-gradient-febrian-hidayat.png',
    title: 'Ổ cứng',
    link: '/drive',
  },
  {
    thumbnail:
      'https://img.icons8.com/external-febrian-hidayat-gradient-febrian-hidayat/128/null/external-Power-Supply-pc-gaming-febrian-hidayat-gradient-febrian-hidayat.png',
    title: 'Nguồn máy tính',
    link: '/psu',
  },
  {
    thumbnail:
      'https://img.icons8.com/external-febrian-hidayat-gradient-febrian-hidayat/128/null/external-Cooler-pc-gaming-febrian-hidayat-gradient-febrian-hidayat.png',
    title: 'Tản nhiệt',
    link: '/cooler',
  },
  {
    thumbnail:
      'https://img.icons8.com/external-febrian-hidayat-gradient-febrian-hidayat/128/null/external-Curved-Monitor-pc-gaming-febrian-hidayat-gradient-febrian-hidayat.png',
    title: 'Màn hình',
    link: '/screen',
  },
  {
    thumbnail:
      'https://img.icons8.com/external-febrian-hidayat-gradient-febrian-hidayat/128/null/external-Headphones-pc-gaming-febrian-hidayat-gradient-febrian-hidayat.png',
    title: 'Tai nghe',
    link: '/headphone',
  },
  {
    thumbnail:
      'https://img.icons8.com/external-febrian-hidayat-gradient-febrian-hidayat/128/null/external-Mouse-pc-gaming-febrian-hidayat-gradient-febrian-hidayat-2.png',
    title: 'Chuột',
    link: '/mouse',
  },
  {
    thumbnail:
      'https://img.icons8.com/external-febrian-hidayat-gradient-febrian-hidayat/128/null/external-Keyboard-pc-gaming-febrian-hidayat-gradient-febrian-hidayat.png',
    title: 'Bàn phím',
    link: '/keyboard',
  },
];

function AllGenres() {
  return (
    <div className='max-w-7xl grid grid-cols-4 items-center gap-10 flex-wrap mx-auto my-14'>
      {genres.map(({ link, thumbnail, title }) => (
        <Link key={link} to={link}>
          <div className='bg-white py-3 cursor-pointer shadow hover:shadow-md duration-150 hover:scale-[1.02]'>
            <img
              src={thumbnail}
              alt={title}
              className='aspect-square h-20 mx-auto object-fit'
            />
            <h3 className='text-lg text-center font-medium'>{title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default AllGenres;

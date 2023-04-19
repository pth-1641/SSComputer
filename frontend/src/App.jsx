import { useEffect } from 'preact/hooks';
import { Toaster, useToasterStore } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages';
import AllGenres from './pages/browse';
import Cases from './pages/case';
import CaseDetails from './pages/case/[id]';
import Coolers from './pages/cooler';
import CoolerDetails from './pages/cooler/[id]';
import Cpus from './pages/cpu';
import CpuDetails from './pages/cpu/[id]';
import Drives from './pages/drive';
import DriveDetails from './pages/drive/[id]';
import Gpus from './pages/gpu';
import GpuDetails from './pages/gpu/[id]';
import Headphones from './pages/headphone';
import HeadphoneDetails from './pages/headphone/[id]';
import Keyboards from './pages/keyboard';
import KeyboardDetails from './pages/keyboard/[id]';
import Laptop from './pages/laptop/index';
import LaptopDetails from './pages/laptop/[id]';
import Mainboards from './pages/mainboard';
import MainboardDetails from './pages/mainboard/[id]';
import Mice from './pages/mouse';
import MouseDetails from './pages/mouse/[id]';
import Order from './pages/order';
import Computers from './pages/pc';
import ComputerDetails from './pages/pc/[id]';
import Psus from './pages/psu';
import PsuDetails from './pages/psu/[id]';
import Rams from './pages/ram';
import RamDetails from './pages/ram/[id]';
import ResetPassword from './pages/reset-password';
import Screens from './pages/screen';
import ScreenDetails from './pages/screen/[id]';
import Search from './pages/search';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import User from './pages/user';
import Admin from './pages/admin';
import EditItem from './pages/admin/edit';
import CreateItem from './pages/admin/create';

export function App() {
  const { toasts } = useToasterStore();

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= 1)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  return (
    <>
      <Navbar />
      <Toaster
        toastOptions={{
          className: 'min-w-max border',
        }}
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/laptop' element={<Laptop />} />
        <Route path='/laptop/:id' element={<LaptopDetails />} />
        <Route path='/computer' element={<Computers />} />
        <Route path='/computer/:id' element={<ComputerDetails />} />
        <Route path='/gpu' element={<Gpus />} />
        <Route path='/gpu/:id' element={<GpuDetails />} />
        <Route path='/screen' element={<Screens />} />
        <Route path='/screen/:id' element={<ScreenDetails />} />
        <Route path='/drive' element={<Drives />} />
        <Route path='/drive/:id' element={<DriveDetails />} />
        <Route path='/headphone' element={<Headphones />} />
        <Route path='/headphone/:id' element={<HeadphoneDetails />} />
        <Route path='/mouse' element={<Mice />} />
        <Route path='/mouse/:id' element={<MouseDetails />} />
        <Route path='/keyboard' element={<Keyboards />} />
        <Route path='/keyboard/:id' element={<KeyboardDetails />} />
        <Route path='/user' element={<User />} />
        <Route path='/browse' element={<AllGenres />} />
        <Route path='/case' element={<Cases />} />
        <Route path='/case/:id' element={<CaseDetails />} />
        <Route path='/mainboard' element={<Mainboards />} />
        <Route path='/mainboard/:id' element={<MainboardDetails />} />
        <Route path='/cpu' element={<Cpus />} />
        <Route path='/cpu/:id' element={<CpuDetails />} />
        <Route path='/ram' element={<Rams />} />
        <Route path='/ram/:id' element={<RamDetails />} />
        <Route path='/psu' element={<Psus />} />
        <Route path='/psu/:id' element={<PsuDetails />} />
        <Route path='/cooler' element={<Coolers />} />
        <Route path='/cooler/:id' element={<CoolerDetails />} />
        <Route path='/search' element={<Search />} />
        <Route path='/order' element={<Order />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/edit' element={<EditItem />} />
        <Route path='/admin/create' element={<CreateItem />} />
      </Routes>
      <Footer />
    </>
  );
}

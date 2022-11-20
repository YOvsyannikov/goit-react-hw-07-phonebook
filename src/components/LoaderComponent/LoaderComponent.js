// import Loader from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/ColorRing';
import s from './LoaderComponent.module.css';

function LoaderComponent() {
  return (
    <div className={s.overlay}>
      {/* <Loader type="ColorRing" height="32" /> */}
    </div>
  );
}

export default LoaderComponent;

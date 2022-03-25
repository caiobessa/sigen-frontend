import './App.css';
import sessionUtil from './util/sessionUtil';
import Menu from "./components/shared/menu/Menu";


export default function App() {

  const tokenUsuario = sessionUtil.getTokenCookieDecode();

  return (
    <div className="App" >
      <Menu usuario={tokenUsuario} />
    </div>
  );
}

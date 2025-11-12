import { useAtomValue } from "jotai";
import Loggedin from "./pages/Loggedin";
import { loginAtom } from "./state";
import UnLoggedin from "./pages/UnLoggedin";
import Header from "./components/layout/Header";

export default function App(){
  const login=useAtomValue(loginAtom);
  return (
    <div>
      <Header/>
      {login?<Loggedin/>:<UnLoggedin/>}
    </div>
  );
}

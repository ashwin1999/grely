import { Switch, Route } from "react-router-dom";
import Lev1 from "./Components/Lev1";
import Lev2 from "./Components/Lev2";
import Lev3 from "./Components/Lev3";
import Lev4 from "./Components/Lev4";
import Lev5 from "./Components/Lev5";
// import Word from "./Components/Word";
import Home from "./Components/Home";

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/level1" component={Lev1} />
      <Route path="/level2" component={Lev2} />
      <Route path="/level3" component={Lev3} />
      <Route path="/level4" component={Lev4} />
      <Route path="/level5" component={Lev5} />
      {/* <Route path="/word/:word" component={Word} /> */}
    </Switch>
  );
}

export default App;

import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import Lev from "./Components/Lev";

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/level/:id" component={Lev} />
    </Switch>
  );
}

export default App;

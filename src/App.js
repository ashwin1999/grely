import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import Lev from "./Components/Lev";
import Dict from "./Components/Dict";
import WordGym from "./Components/WordGym";

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/level/:id" component={Lev} />
      <Route path="/dictionary" component={Dict} />
      <Route path="/gym" component={WordGym} />
    </Switch>
  );
}

export default App;

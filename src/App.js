import "./App.scss";
import PrincipalPage from "./Pages/principalPage/PrincipalPage";
import Counter from "./components/counter/Counter";
import Header from "./components/header/Header";
import PlayerContextContainer from "./context/Player.context";

function App() {
  return (
    <div className="App">
      <PlayerContextContainer>
        <Header />
        <PrincipalPage />
        <Counter />
      </PlayerContextContainer>
    </div>
  );
}

export default App;

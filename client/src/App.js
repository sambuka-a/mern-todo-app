import { useState } from "react";
import Header from "./components/Header/Header";
import List from "./components/List/List";

function App() {
  const [theme, setTheme] = useState(true);

  const handleThemeChange = () => {
    setTheme(theme ? false : true)
  }

  return (
    <>
      <Header themeSwitch={handleThemeChange} theme={theme}/>
      <List theme={theme}/>
    </>
    
  );
}

export default App;

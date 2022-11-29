import { useState } from "react";
import Header from "./components/Header/Header";
import List from "./components/List/List";

function App() {
  const [theme, setTheme] = useState('light');

  const handleThemeChange = () => {
    setTheme((theme === 'light' ? 'dark' : 'light'))
  }

  return (
    <>
      <Header themeSwitch={handleThemeChange} theme={theme}/>
      <List theme={theme}/>
    </>
    
  );
}

export default App;

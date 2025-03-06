import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { SelectorProvider } from "./components/ContextSelector";
import { EchoesProvider } from "./components/ContextEchoes";
import { NavigationProvider } from "./components/ContextNavigation";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import SelectorChoice from "./components/SelectorChoice";
import SelectorOriginal from './components/selectors/SelectorOriginal';
import SelectorSpiral from "./components/selectors/SelectorSpiral";

function App() {

  return (
    <>
      <NavigationProvider>
        <EchoesProvider>
          <SelectorProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />} >
                  <Route element={<SelectorChoice />} >
                    <Route index element={<SelectorOriginal />} />
                    <Route path="spiral" element={<SelectorSpiral />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </SelectorProvider>
        </EchoesProvider>
      </NavigationProvider>
    </>
  )
}

export default App

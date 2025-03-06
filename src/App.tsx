import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { SelectorProvider } from "./contexts/ContextSelector";
import { EchoesProvider } from "./contexts/ContextEchoes";
import { NavigationProvider } from "./contexts/ContextNavigation";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import SelectorChoice from "./components/SelectorChoice";
import SelectorControllerOriginal from './selectors/SelectorControllerOriginal';
import SelectorControllerSpiral from "./selectors/SelectorControllerSpiral";

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
                    <Route index element={<SelectorControllerOriginal />} />
                    <Route path="acceleration" element={<SelectorControllerOriginal useAcceleration={true} />} />
                    <Route path="scrolling-grid" element={<SelectorControllerSpiral />} />
                    <Route path="tabbed-grid" element={<SelectorControllerSpiral />} />
                    <Route path="bar" element={<SelectorControllerSpiral />} />
                    <Route path="spiral" element={<SelectorControllerSpiral />} />
                  </Route>
                  <Route path="about" element={<About />} />
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

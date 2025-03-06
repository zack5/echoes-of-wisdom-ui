import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { SelectorProvider } from "./contexts/ContextSelector";
import { EchoesProvider } from "./contexts/ContextEchoes";
import { NavigationProvider } from "./contexts/ContextNavigation";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
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
                    <Route path="grid" element={<SelectorControllerSpiral />} />
                    <Route path="bar" element={<SelectorControllerSpiral />} />
                    <Route path="spiral" element={<SelectorControllerSpiral />} />
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

import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { SelectorProvider } from "./contexts/ContextSelector";
import { EchoesProvider } from "./contexts/ContextEchoes";
import { NavigationProvider } from "./contexts/ContextNavigation";
import About from "./pages/About";
import Analysis from "./pages/Analysis";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import ReferenceFootage from "./pages/ReferenceFootage";
import SelectorChoice from "./components/SelectorChoice";
import SelectorControllerCrossMedia from './selectors/SelectorControllerCrossMedia';
import SelectorControllerOriginal from './selectors/SelectorControllerOriginal';
import SelectorControllerScrollingGrid from "./selectors/SelectorControllerScrollingGrid";
import SelectorControllerSpiral from "./selectors/SelectorControllerSpiral";
import SelectorControllerTabbedGrid from "./selectors/SelectorControllerTabbedGrid";

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
                    <Route path="scrolling-grid" element={<SelectorControllerScrollingGrid />} />
                    <Route path="tabbed-grid" element={<SelectorControllerTabbedGrid />} />
                    <Route path="bar" element={<SelectorControllerCrossMedia />} />
                    <Route path="spiral" element={<SelectorControllerSpiral />} />
                  </Route>
                  <Route path="references" element={<ReferenceFootage />} />
                  <Route path="analysis" element={<Analysis />} />
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

import { AdaptableAgGrid } from './AdaptableAgGrid';
import { Provider } from 'react-redux';
import { storeRedux } from './store-redux.ts';

function App() {
  return (
    <div>
      <Provider store={storeRedux}>
        <AdaptableAgGrid></AdaptableAgGrid>
      </Provider>
    </div>
  );
}

export default App;

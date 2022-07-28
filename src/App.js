import * as React from 'react';
import NewsListener from './Component/NewsListener';
import ResultComponent from './Component/ResultComponent';

function App() {

const [value, setValue] = React.useState(null);
const [componentName, setComponent] = React.useState('newsListener');
const getApiData = (data) => {
  setValue(data);
  if(value !== null) setComponent('resultComponent')
  console.log('data', data);
}

const goBack = () => {
  setComponent('newsListener')
}

  return (
    <div className="App">
      {componentName == "newsListener" ?
        <NewsListener getApiData={getApiData} />
        : <ResultComponent goBack={goBack} dataValue={value} /> 
      }
    </div>
  );
}

export default App;

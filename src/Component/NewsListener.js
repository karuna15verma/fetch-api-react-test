import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();
function NewsListener(props) {
    const [value, setValue] = React.useState(null);
    const [apiData, setApiData] = React.useState([]);
    const [allApiData, setAllApiData] = React.useState([]);
    const [data, setData] = React.useState([]);

    const filterApiData = (data) => {
        const arr2 = []
        data.forEach((item, index) => {
            arr2.push({'title': item.sectionName});
          })
        setApiData(arr2)
        setAllApiData(data);
    }
    const fetchData = () => {
        fetch('http://content.guardianapis.com/search?api-key=test&amp;show-fields=thumbnail,headline&amp;page=1&amp;page-size=10')
        .then((response) => response.json())
        .then((data) => filterApiData(data.response.results));
    }
    React.useEffect(() => {
        fetchData();
    }, []);

    const onChangeAutoComplete = (event, newValue, allApiData) => {
        let arr = [];
        arr = allApiData.filter(data => data.sectionName == newValue.title);
        setData(arr);
        if (typeof newValue === 'string') {
            setValue({
              title: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            setValue({
              title: newValue.inputValue,
            });
          } else {
            setValue(newValue);
          }
    }
    
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '70vh' }}>
        <div style={{ backgroundColor: 'darkgray', borderRadius: '10px', padding: '100px' }}>
            <h4 style={{ fontSize: '40px' }}>News Listener</h4>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <span style={{ fontSize: '20px', marginBottom: '20px' }}>Enter Search Text:</span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {onChangeAutoComplete(event, newValue, allApiData)}}
                        filterOptions={(options, params) => {
                            const filtered = filter(options, params);
                            const { inputValue } = params;
                            const isExisting = options.some((option) => inputValue === option.title);
                            if (inputValue !== '' && !isExisting) {
                            filtered.push({
                                inputValue,
                                title: `Data Not Found`,
                            });
                            }
                            return filtered;
                        }}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        id="free-solo-with-text-demo"
                        options={apiData}
                        getOptionLabel={(option) => {
                            if (typeof option === 'string') {
                            return option;
                            }
                            if (option.inputValue) {
                            return option.inputValue;
                            }
                            return option.title;
                        }}
                        renderOption={(props, option) => <li {...props}>{option.title}</li>}
                        sx={{ width: 300 }}
                        freeSolo
                        renderInput={(params) => (
                            <TextField {...params} label="Free solo with text demo" />
                        )}
                    />
                    <button
                        onClick={() => props.getApiData(data)}
                    style={{ marginLeft: '10px', height: '40px', width: '120px'}}>Search</button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default NewsListener;
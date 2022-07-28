function ResultComponent(props) {
    const fetchData = () => {
        fetch('http://content.guardianapis.com/search?api-key=test&amp;show-fields=thumbnail,headline&amp;page=1&amp;page-size=10')
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
    fetchData();
    console.log('propsprops', props.dataValue);
  return (
    <div className="App">
        <div style={{ display: 'flex', paddingLeft: '100px', flexDirection: 'row', alignItems: 'center' }}>
        <span style={{ color: 'blue', marginRight: '20px' }} onClick={() => {props.goBack()}}>Go Back</span>
            <h4 style={{ fontSize: '30px' }}>Result for Modi</h4>
        </div>
      <div>
          {props.dataValue.map(data => (
            <div style={{ marginBottom: '10px', display: 'flex', marginLeft: '100px', marginRight: '100px', border: '1px solid black', borderRadius: '10px', padding: '10px' }}>
                <img style={{ height: '40px'}} src="logo192.png" alt="thumbnail image" />
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'baseline', marginLeft: '50px', paddingLeft: '50px', borderLeft: '1px solid black' }}>
                    <span>{data.sectionName}</span>
                    <div>
                        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{data.pillarName}</span>
                        <span style={{ fontSize: '15px', fontWeight: 400, marginRight: '10px' }}>{data.type}</span>
                        <span>{data.webTitle}</span>
                    </div>
                </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ResultComponent;


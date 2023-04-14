// Code that i removed from infograph.js but might need later?

const lastTenGlucoseValues = glucoseData.slice(-10).map(data => {
    return {
      glucose: parseInt(data.glucose),
      timestamp: data.timestamp
    };
  }).reverse();

  const sortedGlucoseValues = lastTenGlucoseValues.sort((a, b) => {
    const timeA = moment(a.timestamp);
    const timeB = moment(b.timestamp);
    return timeA.diff(timeB, 'milliseconds');
  });

  const formattedTimestamps = sortedGlucoseValues.map(data => {
    const date = new Date(data.timestamp);
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return `${hours}:${minutes}`;
  });
  const formatXLabel = (value) => {
    const time = moment(value, 'hh:mm A');
    if (time.minute() === 0) {
      return time.format('hh:mm A');
    } else {
      return '';
    }
  };

//console.log("Last 10:", lastTenGlucoseValues);
  //console.log(glucoseData[0]);
  //console.log(glucoseData[0].glucose)
  //console.log(glucoseData[0].timestamp);
  //console.log("Sorted: ", sortedGlucoseValues)
  //console.log(groupedData);
  //console.log("Interval completed");
  //console.log(selectedDateData);
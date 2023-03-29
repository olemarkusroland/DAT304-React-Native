export const useGlucoseData = async (from, to) => {
    try {
        //console.log(from + " ___ " + to + "---->" + `https://oskarnightscoutweb1.azurewebsites.net/api/v1/entries/sgv.json?find[dateString][$gte]=${from}&find[dateString][$lte]=${to}&count=all`);
        const response = await fetch(`https://oskarnightscoutweb1.azurewebsites.net/api/v1/entries/sgv.json?find[dateString][$gte]=${from}&find[dateString][$lte]=${to}&count=all`, {
            method: 'GET',
        });
        const responseJson = await response.json();
        console.log(responseJson);
        return responseJson;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const useInsulinData = async (from, to ) => {
    try {
        //console.log(from + " ___ " + to + "---->" + `https://oskarnightscoutweb1.azurewebsites.net/api/v1/treatments.json?find[created_at][$gte]=${from}&find[created_at][$lte]=${to}&count=all`);
        const response = await fetch(`https://oskarnightscoutweb1.azurewebsites.net/api/v1/treatments.json?find[created_at][$gte]=${from}&find[created_at][$lte]=${to}&count=all`, {
            method: 'GET',
        });
        const responseJson = await response.json();
        console.log(responseJson);
        return responseJson;
    } catch (error) {
        console.error(error);
        throw error;
    }

};

export function CurrentTime(){
    const gmtDate = new Date();
    const date = gmtDate.toLocaleString('en-GB', { timeZone: 'Etc/GMT' });
    let year = date.split(',')[0].split('/')[2];
    let month = date.split(',')[0].split('/')[1].split(' ');
    let day = date.split(',')[0].split('/')[0];
    let hour = date.split(',')[1].split(' ')[1].split(':')[0];
    let minute = date.split(',')[1].split(' ')[1].split(':')[1];
    let second = date.split(',')[1].split(' ')[1].split(':')[2];
    //if (day < 10) { day = '0' + day }
    //if (month < 10) { month = '0' + month }
    //if (hour < 10) { hour = '0' + hour }
    //if (minute < 10) { minute = '0' + minute }
    //if (second < 10) { second = '0' + second }

    const formattedDate = `${year}-${month}-${day}:${hour}:${minute}:${second}`;

    return formattedDate;
};

export function LastMonthTime (){
    const date = new Date();
    const year = date.getFullYear();
    date.setMonth(date.getMonth() - 1);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // add leading zero if month < 10
    const day = String(date.getDate()).padStart(2, '0'); // add leading zero if day < 10
    const hours = String(date.getHours()).padStart(2, '0'); // add leading zero if hours < 10
    const minutes = String(date.getMinutes()).padStart(2, '0'); // add leading zero if minutes < 10
    const seconds = String(date.getSeconds()).padStart(2, '0'); // add leading zero if seconds < 10
    const formattedDate = `${year}-${month}-${day}:${hours}:${minutes}:${seconds}`;

    return formattedDate;
};
//export const CurrentTime = () => {
//    const [currentTime, setCurrentTime] = useState(new Date());

//    useEffect(() => {
//        const timer = setInterval(() => {
//            setCurrentTime(new Date());
//        }, 1000);

//        return () => clearInterval(timer); // Clean up the interval on component unmount
//    }, []);

//    const formattedTime = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}:${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;

//    return formattedTime;
//};
//export const CurrentTime = () => {
//    const [currentTime, setCurrentTime] = useState(new Date());

//    useEffect(() => {
//        const timer = setInterval(() => {
//            setCurrentTime(new Date());
//        }, 10000);

//        return () => clearInterval(timer); // Clean up the interval on component unmount
//    }, []);

//    return currentTime;
//};

//export const LastMonthTime = () => {
//    const today = new Date();
//    const oneMonthAgo = new Date(today);
//    oneMonthAgo.setMonth(today.getMonth() - 1);

//    const formattedDate = `${oneMonthAgo.getFullYear()}-${oneMonthAgo.getMonth() + 1}-${oneMonthAgo.getDate()}:${oneMonthAgo.getHours()}:${oneMonthAgo.getMinutes()}:${oneMonthAgo.getSeconds()}`;

//    return formattedDate;
//};




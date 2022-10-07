import flight_data from '../db/flightdata.json'

export function RandomFlight() {

    const random = Math.floor(Math.random() * flight_data.length);
    const flight = flight_data[random];
    console.log(flight)
    const dest = flight_data[random].name;
    const country = flight_data[random].country;
    const code = flight_data[random].code;

    // random date in the future, 1-30 days
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 30) + 1);

    // random from time 
    const from_time = new Date();
    from_time.setHours(Math.floor(Math.random() * 24));

    // random to time, must be after from time
    const to_time = new Date();
    to_time.setHours(Math.floor(Math.random() * 24));
    if (to_time < from_time) {
        to_time.setDate(to_time.getDate() + 1);
    }

    // random price from 2000-7000
    const price = Math.floor(Math.random() * 5000) + 2000;

    const id = Math.floor(Math.random() * 1000000000);

    const class_type = ['Economy', 'Business', 'First Class'];
    const random_class = Math.floor(Math.random() * class_type.length);



    return {
        destination: dest,
        date: date,
        from_time: from_time,
        to_time: to_time,
        price: price,
        id: id,
        code: code,
        class: class_type[random_class],
        country: country
    }
}


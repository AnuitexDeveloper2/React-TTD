import * as React from 'react';
import ReactDOM from 'react-dom';
import AppointmentsDayView from './components/AppointmentsDayView';
import { sampleAppointments } from './sampleData/SampleAppointments';

    ReactDOM.render(
        <AppointmentsDayView appointments={sampleAppointments}/>,
        document.getElementById("root")
    )

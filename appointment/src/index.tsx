import * as React from 'react';
import ReactDOM from 'react-dom';
import AppointmentsDayView from './AppointmentsDayView';
import { sampleAppointments } from './SampleAppointments';

    ReactDOM.render(
        <AppointmentsDayView appointments={sampleAppointments}/>,
        document.getElementById("root")
    )

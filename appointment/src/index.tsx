import * as React from 'react';
import ReactDOM from 'react-dom';
import AppointmentsDayView from './components/AppointmentsDayView';
import CustomerForm from './components/common/CustomerForm';
import { sampleAppointments } from './sampleData/SampleAppointments';

import "./index.scss"

    ReactDOM.render(
        <CustomerForm/>,
        document.getElementById("root")
    )

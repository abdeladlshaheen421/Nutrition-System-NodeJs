import {index,show,create,search} from './../handlers/clinicHandler'
import express from 'express'

const clinicRouter = (app:express.Application):void => {
    app.route('/clinics')
    .get(index)  // get all clinics in our system
    .post(create) // This will create a clinic for Admin

    app.get('/clinic/:id',show) // get specific clinic details

    app.get('/clinics/search',search) // using query param
}

export default clinicRouter
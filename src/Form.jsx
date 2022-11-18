import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import toast, { Toaster } from 'react-hot-toast';


import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";

export default function Basic({ handleReset, activeStep, loading, handleNext }) {
    const [loader, setLoader] = useState(false)

    return (
        <div className=' py-4'>
            <div><Toaster /></div>

            <div>1 Register agreement</div>
            <Formik
                initialValues={{ agreementTitle: '', subsidiary: "", client: "", billingFrequency: 'Monthly', paymentTerms: '', startDate: moment(new Date()).format('YYYY-MM-DD'), endDate: '', loading: false }}
                validate={values => {
                    const errors = {};
                    if (!values.agreementTitle) {
                        errors.agreementTitle = 'Required';
                    }
                    if (!values.subsidiary) {
                        errors.subsidiary = 'Required';
                    }
                    if (!values.client) {
                        errors.client = 'Required';
                    }
                    if (!values.billingFrequency) {
                        errors.billingFrequency = 'Required';
                    }
                    if (!values.paymentTerms) {
                        errors.paymentTerms = 'Required';
                    }
                    if (!values.startDate) {
                        errors.startDate = 'Required';
                    }
                    if (!values.endDate) {
                        errors.endDate = 'Required';
                    }


                    return errors;
                }}
                onSubmit={async (values) => {
                    setLoader(true)


                    try {
                        let url = 'http://localhost:3000/api/v0/submitForm'

                        let payload = {
                            agreementTitle: values.agreementTitle,
                            subsidiary: values.subsidiary,
                            client: values.client,
                            billingFrequency: values.billingFrequency,
                            paymentTerms: parseInt(values.paymentTerms),
                            startDate: values.startDate,
                            endDate: values.endDate
                        }
                        const payloadOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                        };


                        let response = await fetch(url, payloadOptions)

                        if (response.ok) {
                            toast.success('Successfully created!');
                            handleNext()
                        } else {
                            toast.error('Internal server error');
                        }
                    } catch (err) {
                        console.log(err)
                        toast.error(err);

                    } finally {
                        setLoader(false)
                    }

                }}
            >

                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    setFieldValue

                }) => (


                    <Form className='py-4'>
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="agreement_title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Agreement title*</label>
                                <input
                                    type="text"
                                    name="agreementTitle"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.agreementTitle}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Agreement Title"
                                />
                                {errors.agreementTitle && touched.agreementTitle &&
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> {errors.agreementTitle}</p>}

                            </div>

                            <div>
                                <label htmlFor="billingfrequency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Billing frequency*</label>

                                <div className='flex  space-x-4'>
                                    <div >
                                        <Field type="radio" name="billingFrequency" id="default-radio-1" value="Monthly" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Monthly</label>
                                    </div>
                                    <div >
                                        <Field type="radio" name="billingFrequency" id="default-radio-2" value="Quarterly" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Quarterly</label>
                                    </div>

                                </div>
                                {errors.billingFrequency &&
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> {errors.billingFrequency}</p>}

                            </div>
                            <div className=''>
                                <label htmlFor='subsidiary' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subsidiary*</label>
                                <select
                                    name="subsidiary"
                                    value={values.subsidiary}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                    className="block py-2.5 px-0 w-full  text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200  dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200"

                                >
                                    <option value="" label="Select a subsidiary">
                                        Select a subsidiary{" "}
                                    </option>
                                    <option value="Rooftop" label="Rooftop">

                                        Rooftop
                                    </option>
                                    <option value="Ground Mounted" label="Ground Mounted">
                                        Ground Mounted
                                    </option>

                                </select>
                                {errors.subsidiary && touched.subsidiary && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> {errors.subsidiary}</p>}
                            </div>

                            <div className=''>
                                <label htmlFor='paymentTerms' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Payment terms (in calender days after invoice date)*</label>
                                <select
                                    name="paymentTerms"
                                    value={values.paymentTerms}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                    className="block py-2.5 px-0 w-full  text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"

                                >
                                    <option value="" label="Select a paymentTerms">
                                        Select a paymentTerms{" "}
                                    </option>
                                    <option value={0} label={0}>

                                        0
                                    </option>
                                    <option value={7} label={7}>

                                        7
                                    </option>
                                    <option value={14} label={14}>

                                        14
                                    </option>

                                </select>
                                {errors.paymentTerms && touched.paymentTerms && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> {errors.paymentTerms}</p>}
                            </div>
                            <div className=''>
                                <label htmlFor='client' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Client*</label>
                                <select
                                    name="client"
                                    value={values.client}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                    className="block py-2.5 px-0 w-full  text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"

                                >
                                    <option value="" label="Select a client">
                                        Select a client{" "}
                                    </option>
                                    <option value="Norsk Solar" label="Norsk Solar">

                                        Norsk Solar
                                    </option>
                                    <option value="Green Production" label="Green Production">
                                        Green Production
                                    </option>

                                </select>
                                {errors.client && touched.client && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> {errors.client}</p>}
                            </div>


                            <div className='flex flex-row space-x-2'>

                                <div date-rangepicker="true" className="flex items-center space-x-4">
                                    <div>
                                        <label htmlFor="client" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start date*</label>
                                        <div className="relative">

                                            <input name="start"
                                                value={values.startDate}
                                                onBlur={handleBlur}
                                                onChange={e => setFieldValue('startDate', e.target.value)}
                                                type="date" id="datepicker-range-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start" />
                                        </div>
                                        {errors.startDate && touched.startDate &&
                                            <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> {errors.startDate}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="client" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End date*</label>

                                        <div className="relative">
                                            <input name="end"

                                                value={values.endDate}
                                                onBlur={handleBlur}
                                                onChange={e => setFieldValue('endDate', e.target.value)}

                                                min={values.startDate}

                                                id="datepicker-range-input" type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date end" />
                                        </div>
                                        {errors.endDate && touched.endDate &&
                                            <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> {errors.endDate}</p>}

                                    </div>

                                </div>

                            </div>

                            <div className='flex flex-row space-x-4 pt-20' >
                                <button type="submit" className="text-white bg-[#00008B] hover:bg-[#040273] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                                    {loader ?
                                        <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                        </svg> : null}


                                    {loader ? 'Please wait..' : 'Next'}

                                </button>

                                <button onClick={handleReset} disabled={activeStep < 1} type="cancel" className='text-gray-600'>
                                    Cancel
                                </button>
                            </div>

                        </div>

                    </Form>
                )}
            </Formik>
        </div>
    )

};


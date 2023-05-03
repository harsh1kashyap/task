import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";


const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name must not exceed 20 characters")
    .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, "Invalid name format")
    .required("Name is required"),
  dob: Yup.date()
    .max(new Date(), "Date of birth cannot be a future date")
    .required("Date of birth is required"),
  bornInWeek: Yup.number()
    .when("isBornInWeek", {
      is: true,
      then: Yup.number()
        .typeError("Born in week must be a number")
        .min(20, "Born in week must be at least 20 weeks")
        .max(36, "Born in week must not exceed 36 weeks")
        .required("Born in week is required"),
    }),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(
      /^([+]\d{1,3}[-\s]?)?\d{10}$/,
      "Invalid phone number format. Example: +1 123-456-7890"
    )
    .required("Phone number is required"),
});

const initialValues = {
  name: "",
  dob: "",
  isBornInWeek: false,
  bornInWeek: "",
  childWeight: "",
  childHeight: "",
  email: "",
  phone: "",
};

const StepOne = ({ onNext }) => {
  const handleSubmit = (values) => {
    localStorage.setItem("stepOneData", JSON.stringify(values));
    onNext();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched }) => (
        <Form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
              Name
            </label>
            <Field
              type="text"
              name="name"
              id="name"
              className={
                "w-full border border-gray-300 p-2 rounded-md" +
                (errors.name && touched.name ? " border-red-500" : "")
              }
            />
            {errors.name && touched.name && (
              <div className="text-red-500">{errors.name}</div>
            )}
          </div>

          <div>
            <label htmlFor="dob" className="block text-gray-700 font-semibold mb-2">
              Date of birth
            </label>
            <Field
              type="date"
              name="dob"
              id="dob"
              className={
                "w-full border border-gray-300 p-2 rounded-md" +
                (errors.dob && touched.dob ? " border-red-500" : "")
              }
            />
            {errors.dob && touched.dob && (
              <div className="text-red-500">{errors.dob}</div>
            )}
          </div>

          <div className="flex items-center">
            <Field
              type="checkbox"
              name="isBornInWeek"
              id="isBornInWeek"
              className="mr-2 h-4 w-4 text-gray-700 border rounded-sm focus:outline-none focus:ring-2 focus:border-blue-300"
            />
            <label htmlFor="isBornInWeek" className="text-gray-700 font-semibold">
              Was your child born prematurely?
            </label>
          </div>
          {values.isBornInWeek && (
            <div>
              <label
                htmlFor="bornInWeek"
                className="block text-gray-700 font-semibold mb-2"
              >
                Weeks of gestation
              </label>
              <Field
                type="number"
                name="bornInWeek"
                id="bornInWeek"
                className={
                  "w-full border border-gray-300 p-2 rounded-md" +
                  (errors.bornInWeek && touched.bornInWeek
                    ? " border-red-500"
                    : "")
                }
              />
              {errors.bornInWeek && touched.bornInWeek && (
                <div className="text-red-500">{errors.bornInWeek}</div>
              )}
            </div>
          )}

          <div>
            <label
              htmlFor="childWeight"
              className="block text-gray-700 font-semibold mb-2"
            >
              Child weight (in kg)
            </label>
            <Field
              type="number"
              name="childWeight"
              id="childWeight"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="childHeight"
              className="block text-gray-700 font-semibold mb-2"
            >
              Child height (in cm)
            </label>
            <Field
              type="number"
              name="childHeight"
              id="childHeight"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <Field
              type="email"
              name="email"
              id="email"
              className={
                "w-full border border-gray-300 p-2 rounded-md" +
                (errors.email && touched.email ? " border-red-500" : "")
              }
            />
            {errors.email && touched.email && (
              <div className="text-red-500">{errors.email}</div>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
              Phone
            </label>
            <Field
              type="tel"
              name="phone"
              id="phone"
              className={
                "w-full border border-gray-300 p-2 rounded-md" +
                (errors.phone && touched.phone ? " border-red-500" : "")
              }
            />
            {errors.phone && touched.phone && (
              <div className="text-red-500">{errors.phone}</div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
            >
              Next
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default StepOne;

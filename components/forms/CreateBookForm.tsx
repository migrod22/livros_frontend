import React, { useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { DateInput } from "@mantine/dates";
import { createBook } from "../../api/services";

export default function CreateBookForm({ setShowForm, books, setBooks }) {
  const initialValues = {
    title: "",
    author: "",
    published_date: "",
  };

  const handleModalClose = () => {
    setShowForm(false);
  };

  const handleSubmit = async (newBook) => {
    console.log(newBook);
    try {
      const createdBook = await createBook(newBook);
      setBooks([createdBook, ...books]);
    } catch (error) {
      console.error("Error creating book:", error);
    }
    handleModalClose();
  };

  const modalRef = useRef(null);

  const handleClickOutsideModal = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleModalClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideModal);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 rounded-lg">
      <div
        ref={modalRef}
        className="w-2/3 max-h-screen bg-white text-gray-800 rounded-lg shadow-xl p-8 overflow-y-auto "
      >
        <Formik
          initialValues={initialValues}
          // validationSchema={toFormikValidationSchema(schema)}}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, errors }) => (
            <Form>
              <div>
                <label htmlFor="title">Title:</label>
                <Field type="text" id="title" name="title" />
              </div>
              <div>
                <label htmlFor="author">Author:</label>
                <Field type="text" id="author" name="author" />
              </div>
              <div className="mt-2">
                <label htmlFor="published_date">
                  Published Date (Optional)
                </label>
                <DateInput
                  id="uploadPhase"
                  onChange={(date) => {
                    setFieldValue(
                      "published_date",
                      date.toISOString().slice(0, 10)
                    );
                  }}
                  maw={400}
                  mx="auto"
                  className="mt-2"
                />
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

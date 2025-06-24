const FormError = ({ error, fields }: { error: any, fields: string[] }) => {

    return (
        <>
            {error &&
                <div className="flex justify-center">
                    <span className="form-error">
                        {"status" in error && error.status == 400 &&
                            <>
                                {fields.map((item: string) => {
                                    <>
                                        {"data" in error && typeof error.data == "object" && error.data != null &&
                                        <>
                                            {item in error.data &&
                                                <>
                                                    {error.data[item]}
                                                </>
                                            }
                                        </>
                                }
                                    </>
                                })}
                                <>
                                    {"data" in error && typeof error.data == "object" && error.data != null &&
                                        <>
                                            {"non_field_errors" in error.data &&
                                                <>
                                                    {error.data.non_field_errors}
                                                </>
                                            }
                                        </>
                                    }
                                </>
                            </>
                        }
                    </span>
                </div>
            }
        </>
    )
}

export default FormError;
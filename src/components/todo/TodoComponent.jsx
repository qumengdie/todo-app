import React, {Component} from "react";
import moment from "moment";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TodoDataService from "../../api/todo/TodoDataService";
import AuthenticationService from "./AuthenticationService";

class TodoComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id : this.props.params.id,
            description: '',
            targetDate : moment(new Date()).format('YYYY-MM-DD')
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveTodo(username, this.state.id)
            .then(response => this.setState({
                description : response.data.description,
                targetDate : moment(response.data.targetDate).format('YYYY-MM-DD')
            }))
    }

    onSubmit(values) {

    }

    validate(values) {
        let errors = {description:''}
        if (!values.description) {
            errors.description = 'Enter a Description'
        }
        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid Target Date'
        }
        return errors
    }

    render() {
        let {description, targetDate} = this.state

        return (
        <div>
            <h1>Todo</h1>
            <div className="container">
                <Formik
                    initialValues={{description,targetDate}}
                    onSubmit={this.onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={this.validate}
                    enableReinitialize={true}
                >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field className="form-control" type="text" name="description"></Field>
                                </fieldset>

                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field className="form-control" type="date" name="targetDate"></Field>
                                </fieldset>

                                <button className="btn btn-success" type="submit">Save</button>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
        )
    }
}

export default TodoComponent
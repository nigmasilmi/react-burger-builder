import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axiosInstance) => {
    return class extends Component {
        state = {
            error: null
        }


        // crear los interceptors en cdm funciona para post pero no para el get porque el render de los child components del wrapped comp
        //no ocurre por lo tanto no se crean los interceptors. Cambiando el lifecycle hook a componentWillMount funciona pero es deprecated
        // en su lugar se recomienda hacer estas funciones en el constructor
        // tampoco funcionó apropiadamente por lo que se agrega el prefijo UNSAFE_ tampoco funciona, da error con el setState

        componentWillMount() {
            // garantizar que error esté limpio de errores previos, no se hace nada con el request en sí
            this.requestInterceptor = axiosInstance.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            })
            this.responseInterceptor = axiosInstance.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            });
        }

        componentWillUnmount() {
            axiosInstance.incerceptros.request.eject(this.responseInterceptor);
            axiosInstance.incerceptros.request.eject(this.responseInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Aux>
                    <Modal
                        modalClosed={this.errorConfirmedHandler}
                        show={this.state.error} >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>)
        }
    }
}



export default withErrorHandler;

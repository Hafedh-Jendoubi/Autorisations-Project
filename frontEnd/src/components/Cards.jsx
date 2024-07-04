import React from "react"
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Autor1, Autor2 } from './ReactPDF';
import emailjs from 'emailjs-com';

function Cards(props) {
    function sendEmail() {
        const templateParams = {
            from_name: 'noreply-autorisations',
            from_email: 'noreply@autorisations.tn',
            to_name: props.client.nom + " " + props.client.prenom,
            message: 'This is just a warning! Someone has exported your information in a PDF File.'
        };

        emailjs.send('service_rkyo9ji', 'template_qbdpuws', templateParams, 'TGLZuzmUNYwJ4M99c')
            .then((result) => {
                console.log(result.text);
                window.location.reload();
            }, (error) => {
                console.log(error.text);
            });
    }

    return (
        <div className="container" style={{display: 'block'}}>
            <div className="row">
                <div className="card col" style={{width: "18rem", marginRight: "50px"}}>
                    <img src="Card_Pics/autor1.png" style={{ width: "100%", height: "200px" }} alt="Authorization 1" />
                    <hr></hr>
                    <div className="card-body">
                        <h5 className="card-title">Autorisation de Gestion des Appels</h5>
                        <p className="card-text">Autorisation pour {props.client.nom + " " + props.client.prenom} d'avoir une autorisation de Gestion des Appels.</p>
                        <PDFDownloadLink document={<Autor1 client={props.client} />} fileName={props.client.nom + "-" + props.client.prenom + ".pdf"}>
                            {
                                ({ loading }) =>
                                    loading ? 'Loading document...' : <button className='btn btn-primary' style={{ marginLeft: "80px" }} onClick={sendEmail}>Telecharger</button>
                            }
                        </PDFDownloadLink>
                    </div>
                </div>
                <div className="card col" style={{width: "18rem"}}>
                    <img src="Card_Pics/autor2.png" style={{ width: "100%", height: "200px" }} alt="Authorization 2" />
                    <hr></hr>
                    <div className="card-body">
                        <h5 className="card-title">Demande d'autorisation d'absence</h5>
                        <p className="card-text">Autorisation pour {props.client.nom + " " + props.client.prenom} d'avoir une autorisation d'absence.</p>
                        <PDFDownloadLink document={<Autor2 />} fileName={props.client.nom + "-" + props.client.prenom + ".pdf"}>
                            {
                                ({ loading }) =>
                                    loading ? 'Loading document...' : <button className='btn btn-primary' style={{ marginLeft: "80px" }}>Telecharger</button>
                            }
                        </PDFDownloadLink>
                    </div>
                </div>
            </div>
            <div className="row" style={{marginTop: "20px"}}>
                <div className="card col" style={{width: "18rem", marginRight: "50px"}}>
                    <img src="Card_Pics/autor3.png" style={{ width: "100%", height: "200px" }} alt="Authorization 3" />
                    <hr></hr>
                    <div className="card-body">
                        <h5 className="card-title">Autorisation du droit à l'image</h5>
                        <p className="card-text">Autorisation pour {props.client.nom + " " + props.client.prenom} d'avoir une autorisation du droit à l'image.</p>
                        <PDFDownloadLink document={<Autor1 client={props.client} />} fileName={props.client.nom + "-" + props.client.prenom + ".pdf"}>
                            {
                                ({ loading }) =>
                                    loading ? 'Loading document...' : <button className='btn btn-primary' style={{ marginLeft: "80px" }}>Telecharger</button>
                            }
                        </PDFDownloadLink>
                    </div>
                </div>
                <div className="col">
                    {
                        //Card to be added here. 
                    }
                </div>
            </div>
        </div>
    );
}

export default Cards;
import React from 'react';
import { withRouter } from 'react-router-dom';
import 'moment/locale/el';
import { saveAs } from 'file-saver';
import image from '../../img/image.jpg';
import {
  AlignmentType,
  Document,
  HeadingLevel,
  ImageRun,
  Packer,
  Paragraph,
  TextRun,
} from 'docx';
import { jsPDF } from 'jspdf';
const axios = require('axios');
const moment = require('moment');

async function urlToBlob(url) {
  return (await fetch(image)).blob();
}

const saveDocumentToFile = (doc, fileName) => {
  const packer = new Packer();
  const mimeType =
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  Packer.toBlob(doc).then((blob) => {
    const docBlob = blob.slice(0, blob.size, mimeType);
    saveAs(docBlob, fileName);
  });
};

const expandContent = async (arr) => {
  const images = [];
  for (let i = 0; i < arr.length; i++) {
    let url = arr[i].frameDesc.frameImage[0].url;
    let blob2 = await fetch(url).then((r) => r.blob());
    images.push(blob2);
  }

  return arr.map((item, index) => {
    return new Paragraph({
      children: [
        new TextRun({ text: index + 1, size: 30 }),
        new TextRun({ break: 2 }),
        new ImageRun({
          data: images[index],
          transformation: {
            height: 200,
            width: 200,
          },
        }),
        new TextRun({
          text: `Διαστάσεις : ${item.frameHeight} X ${item.frameLength}`,
          size: 22,
        }),
        new TextRun({ break: 1 }),
        new TextRun({
          text: `Τύπος Κουφώματος : ${item.frameDesc.typeOfFrame}`,
          size: 22,
        }),
        ,
        new TextRun({ break: 1 }),
        new TextRun({
          text: `Ποσότητα : ${item.qty}`,
          size: 22,
        }),
        new TextRun({ break: 1 }),
        new TextRun({
          text: `Τιμή : ${item.price}€`,
          size: 22,
        }),
        new TextRun({ break: 1 }),
        new TextRun({
          text: `Συνολική Τιμή : ${item.qty * item.price}€`,
          size: 22,
        }),
        new TextRun({ break: 1 }),
        new TextRun({ break: 2 }),
        new TextRun({ break: 2 }),
      ],
    });
  });
};

class OrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      customer: {},
      content: [],
      image: '',
      dateOfOrder: '',
      total: 0,
      color: '',
      typeFrame: '',
      windowOfFrame: '',
    };
  }

  componentDidMount() {
    const oid = this.props.match.params.oid;
    axios
      .get(`/order/${oid}`)
      .then((res) => {
        const ordDate = moment(res.data.orderDate).format('LL');
        let total = 0;
        console.log(res.data);

        for (let content of res.data.content) {
          total = total + content.qty * content.price;
        }

        this.setState({
          order: res.data,
          customer: res.data.customer,
          content: res.data.content,
          color: res.data.color,
          windowOfFrame: res.data.windowOfFrame,
          typeFrame: res.data.typeFrame,
          dateOfOrder: ordDate,
          total,
        });
      })
      .catch((e) => console.log(e));
  }

  async generateWordDocument(docName) {
    const blob = await fetch(
      'https://res.cloudinary.com/diyjlmw18/image/upload/w_200,ar_16:9,c_fill,g_auto,e_sharpen/v1635186278/AplicalLTD/64227245_1023024817899638_8711578648622137344_n.jpg_qnu0co.jpg'
    ).then((r) => r.blob());

    await expandContent(this.state.content).then((res) => {
      console.log(res);
      const doc = new Document({
        sections: [
          {
            children: [
              new Paragraph({
                children: [
                  new ImageRun({
                    data: blob,
                    transformation: {
                      height: 100,
                      width: 200,
                    },
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Aplical ltd',
                    size: 24,
                    font: 'calibri',
                  }),
                  new TextRun({ break: 1 }),
                  new TextRun({
                    text: 'ΠΟΡΤΕΣ - ΠΑΡΑΘΥΡΑ',
                    size: 24,
                    font: 'calibri',
                  }),
                  new TextRun({ break: 1 }),
                  new TextRun({
                    text: 'Al.stampolyiski 14',
                    size: 24,
                    font: 'calibri',
                  }),
                  new TextRun({ break: 1 }),
                  new TextRun({
                    text: 'Petrich Bulgaria',
                    size: 24,
                    font: 'calibri',
                  }),
                  new TextRun({ break: 1 }),
                  new TextRun({
                    text: 'tel: +306976843834',
                    size: 24,
                    font: 'calibri',
                  }),
                ],
              }),
              new Paragraph({
                text: 'ΟΙΚΟΝΟΜΟΤΕΧΝΙΚΗ ΜΕΛΕΤΗ ΚΟΥΦΩΜΑΤΩΝ',
                heading: HeadingLevel.TITLE,
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Στοιχεια Προσφοράς',
                    color: '000000',
                  }),
                ],
                heading: HeadingLevel.HEADING_1,
                alignment: AlignmentType.CENTER,
              }),

              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Ημερομηνία : ',
                    bold: true,
                    size: 20,
                    font: 'calibri',
                  }),
                  new TextRun({
                    text: `${this.state.dateOfOrder}  `,
                    size: 20,
                    font: 'calibri',
                  }),
                  new TextRun({ break: 1 }),
                  new TextRun({
                    text: 'Πελάτης : ',
                    bold: true,
                    size: 20,
                    font: 'calibri',
                  }),
                  new TextRun({
                    text: `${this.state.customer.firstName} ${this.state.customer.lastName}  `,
                    size: 20,
                    font: 'calibri',
                  }),
                  new TextRun({ break: 1 }),
                  new TextRun({
                    text: 'Διεύθυνση : ',
                    bold: true,
                    size: 20,
                    font: 'calibri',
                  }),
                  new TextRun({
                    text: `${this.state.order.address}  `,
                    size: 20,
                    font: 'calibri',
                  }),
                  new TextRun({ break: 1 }),
                  new TextRun({
                    text: 'Τζάμι : ',
                    bold: true,
                    size: 20,
                    font: 'calibri',
                  }),
                  new TextRun({
                    text: `${this.state.windowOfFrame}  `,
                    size: 20,
                    font: 'calibri',
                  }),
                  new TextRun({ break: 1 }),
                  new TextRun({
                    text: 'Χρώμα : ',
                    bold: true,
                    size: 20,
                    font: 'calibri',
                  }),
                  new TextRun({
                    text: `${this.state.color}  `,
                    size: 20,
                    font: 'calibri',
                  }),
                  new TextRun({ break: 1 }),
                  new TextRun({
                    text: 'Τύπος : ',
                    bold: true,
                    size: 20,
                    font: 'calibri',
                  }),
                  new TextRun({
                    text: `${this.state.typeFrame}  `,
                    size: 20,
                    font: 'calibri',
                  }),
                  new TextRun({ break: 2 }),
                ],
              }),
              ...res,
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Σύνολο Προσφοράς : ${this.state.total}€`,
                    color: '000000',
                    bold: true,
                  }),
                ],
                heading: HeadingLevel.HEADING_2,
              }),
            ],
          },
        ],
      });
      saveDocumentToFile(doc, `${docName}.docx`);
    });
  }
  async generatePDF(pdfName) {
    const doc = new jsPDF();
    doc.setFont('LiberationSerif-Regular');

    doc.addImage(
      'https://res.cloudinary.com/diyjlmw18/image/upload/w_200,ar_16:9,c_fill,g_auto,e_sharpen/v1635186278/AplicalLTD/64227245_1023024817899638_8711578648622137344_n.jpg_qnu0co.jpg',
      'JPEG',
      75,
      10,
      0,
      0,
      { align: 'center' }
    );
    doc.text('Aplical ltd', 15, 30);
    doc.text('ΠΟΡΤΕΣ - ΠΑΡΑΘΥΡΑ', 15, 40);
    doc.save(`${pdfName}.pdf`);
  }

  render() {
    const docName2 = `${this.state.customer.firstName}_${this.state.customer.lastName}_${this.state.order._id}`;
    return (
      <>
        <h3 className="text-center mb-4">Στοιχεία Προσφοράς</h3>
        <div className="border border-secondary px-5 py-3">
          <div className="d-md-flex">
            <p className="col-md-6 col-12 d-flex justify-content-start">
              <b>Ημερομηνία : </b> {this.state.dateOfOrder}
            </p>
            <p className="col-md-6 col-12 d-flex justify-content-start">
              <b>Τζάμι :</b> {this.state.windowOfFrame}
            </p>
          </div>
          <div className="d-md-flex">
            <p className="col-md-6 col-12 d-flex justify-content-start">
              <b>Πελάτης :</b> {this.state.customer.firstName}{' '}
              {this.state.customer.lastName}
            </p>
            <p className="col-md-6 col-12 d-flex justify-content-start">
              <b>Χρώμα :</b> {this.state.color}
            </p>
          </div>
          <div className="d-md-flex">
            <p className="col-md-6 col-12 d-flex justify-content-start">
              <b>Διεύθυνση :</b>{' '}
              <a
                target="_blank"
                href={`https://maps.google.com/?q=${this.state.order.address}`}
              >
                {this.state.order.address} <i className="fas fa-directions"></i>
              </a>
            </p>
            <p className="col-md-6 col-12 d-flex justify-content-start">
              <b>Τύπος : </b> {this.state.typeFrame}
            </p>
          </div>
        </div>
        <h4 className="text-center my-3">Περιεχόμενο Προσφοράς </h4>
        <div className="d-flex justify-content-center">
          <table className="text-center my-3 table-list">
            <tr>
              <th className="border border-secondary py-2 px-md-4 px-2">Α/Α</th>
              <th className="border border-secondary py-2 px-md-4">
                Διαστάσεις(Ύψος Χ Πλάτος)
              </th>
              <th className="border border-secondary py-2 px-md-4">
                Τύπος Κουφώματος
              </th>
              <th className="border border-secondary py-2 px-md-4 px-1">
                Ποσότητα
              </th>
              <th className="border border-secondary py-2 px-md-4 px-1">
                Τιμή
              </th>
              <th className="border border-secondary py-2 px-md-4 px-1">
                Συνολική Τιμή
              </th>
            </tr>
            {this.state.content.map((item, index) => (
              <tr className="my-3" key={index}>
                <td className="border border-secondary">{index + 1}</td>
                <td className="border border-secondary">
                  {item.frameHeight} Χ {item.frameLength}
                </td>
                <td className="border border-secondary">
                  {item.frameDesc.typeOfFrame}
                </td>
                <td className="border border-secondary">{item.qty}</td>
                <td className="border border-secondary">{item.price} €</td>
                <td className="border border-secondary">
                  {item.price * item.qty} €
                </td>
              </tr>
            ))}
          </table>
        </div>
        <p>
          <h5 className="text-center">
            Σύνολο Παραγγελίας : {this.state.total} €
          </h5>
        </p>
        <p>
          <h6>Παρατηρήσεις </h6>{' '}
          <div className="border border-dark p-2">{this.state.order.notes}</div>
        </p>
        <div className="d-flex justify-content-center my-5">
          <button
            type="button"
            className="btn btn-primary mx-3"
            onClick={(e) => this.generateWordDocument(docName2)}
          >
            Έκδοση Αρχείου Word <i class=" fa fa-file-word px-1"></i>
          </button>
          <button
            type="button"
            className="btn btn-danger mx-3"
            onClick={(e) => this.generatePDF(docName2)}
          >
            Έκδοση Αρχείου PDF <i class=" fa fa-file-pdf px-1"></i>
          </button>
        </div>
      </>
    );
  }
}

export default withRouter(OrderDetails);

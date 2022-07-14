import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


function EncomendasPDF(encomendas){
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const reportTitle = [
    {
      text: 'Encomenda',
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45] //esquerda, top, direita, bottom
    }
  ];

  // const dados = encomendas.map((val) => {
  //   return [
  //     {text: val.produtos, fontSize: 10, margin: [0, 2, 0, 2]}, //aqui váo ser os produtos que o cliente encomenda
  //     {text: 'quantidades', fontSize: 10, margin: [0, 2, 0, 2]}, //aqui váo ser as quantidades que o cliente encomenda
  //     {text: 'valores', fontSize: 10, margin: [0, 2, 0, 2]} //aqui váo ser os valores dos produtos que o cliente encomenda
  //   ]
  // });

  const details = [
    {
      table:{
        headerRows: 1,
        widhts:['*', '*', '*'],
        body: [
          [
            {text: 'Produto', style: 'tableHeader', fontSize: 10},
            {text: 'Quantidade', style: 'tableHeader', fontSize: 10},
            {text: 'Valor', style: 'tableHeader', fontSize: 10}
          ],
          // ...dados //VAI BUSCAR OS DADOS DA FUNCAO ENCOMENDA.MAP()
        ],
      },
      layout: 'headerLineOnly'
    }
  ];

  function rodape(currentPage, pageCount){
    return [
      {
        text: currentPage + ' / ' +  pageCount,
        alignment: 'right',
        fontSize: 15,
        bold: true,
        margin: [0, 10, 20, 0] //esquerda, top, direita, bottom
      }
    ]
  }

  const docDefinitions = {
    pageSize: 'A4',
    pageMargins: [15, 50, 15, 40],

    header: [reportTitle],
    content: [details],
    footer: rodape
  }
    
  pdfMake.createPdf(docDefinitions).download();

}

export default EncomendasPDF;








// import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// // Create styles
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'row',
//     backgroundColor: '#E4E4E4'
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1
//   }
// });

// // Create Document Component
// const MyDocument = () => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         <Text>Section #1</Text>
//       </View>
//       <View style={styles.section}>
//         <Text>Section #2</Text>
//       </View>
//     </Page>
//   </Document>
// );
import { pdfCreate /* , generateQRBase64  */ } from "../utils/pdf";

import * as formCylinders from "../models/formCylinders";

/* 
0 vacio
1 disponible
2 solicitado
3 entregado
4 retirando
 */

const getAllCompanyCylindersCount = async (req: any, res: any) => {
    try {
        const result = await formCylinders.getAllCompanyCylindersCount();
        res.status(200).json({
            ...result
        });
    } catch (error) {
        console.log(error)
        res.status(200).json({
            error: true
        });
    }
}

const getAllCylindersCompanyByRut = async (req: any, res: any) => {
    try {
        const { rutBusiness } = req.params;

        const result = await formCylinders.getAllCylindersCompanyByRut(rutBusiness);

        res.status(200).json({
            ...result
        });
    } catch (error) {
        console.log(error)
        res.status(200).json({
            error: true
        });
    }
}

const updateCylinderState = async (req: any, res: any) => {
    try {
        const { code, state } = req.body;
        const result = await formCylinders.updateCylinderState(code, state);
        res.status(200).json({
            ...result
        });
    } catch (error) {
        console.log(error)
        res.status(200).json({
            error: true
        });
    }
}

const updateCylinderRequestAndReception = async (req: any, res: any) => {
    try {
        const { rutBusiness, codeCylinders, rutAccounts, stateCylinders } = req.body;

        const result = await formCylinders.updateCylinderRequestAndReception(
            rutBusiness, codeCylinders, rutAccounts, stateCylinders);
        res.status(200).json({
            ...result
        });
    } catch (error) {
        console.log(error)
        res.status(200).json({
            error: true
        });
    }
}

const generatePdfCylinderCompany = async (req: any, res: any) => {
    const data = req.body;

    console.log('generando pdf');

    /*  let listCylinders = ''
 
     data.list.forEach((list: any) => {
         listCylinders += `<tr>
 <td class='tdTitle'>
 ${list[0]}
 </td>
 <td class='tdTitle'>
 ${list[1]}
  </td>
  <td class='tdTitle'>
 ${list[2]}
  </td>
  <td class='tdTitle'>
 ${list[3]}
  </td>
  <td class='tdTitle'>
 ${list[5]}
  </td>
 </tr>`
     });
 
     const html = `
     <html>
       <head>
         <meta charset="utf-8">
         <title>Cilindros Empresa</title>
       </head>
       <style>
   
       .body{
           width:100%;
           height:100%;
         }
         h1{
             margin: 2rem 2rem 0 2rem;
             padding:.3rem 0 .3rem 0;
             border-radius: 0 0 .5rem 0;
             font-size:2rem;
             color:blue;
             width:13rem;
             text-align: center;
             border:solid .1rem blue;
             background-color:yellow;
             }
          h2{
           margin: 2rem 2rem 0 2rem;
           padding:.3rem 0 .3rem .3rem;
           text-align: left;
           border:solid .1rem black;
           background-color:rgb(212, 212, 212);
           border-radius: 0 0 .5rem 0;
           font-size:1rem;
           width:60%;
           }
           h3{
             margin: 2rem 0 0 2rem;
             font-size:1rem;
             border-bottom:solid .1rem black;
             width:60vw;
           }
         
         table{
         margin: 1.5rem auto 2rem 2rem;
         font-size:1.3rem;
         border:solid .1rem black;  
           }
         .tdTitle{
           
            font-size:1rem;
           }
           tr{
             border:solid .1rem black;
           }
           td{
             text-align: left;
             padding:.3rem;
            }
   
         img{
           margin:0 0 0 10rem;
           width:10rem;
           height:15rem
            }
   
            .divContainerImg{
             text-align: center;
              }
     
   
       </style>
       <body>
       <h1>Gases Ñuble</h1>
         <h2>Empresa: ${data.company[0]}</h2>
         <h3>Información cilindros</h3>
   <table>
   <tr>
   <td class='tdTitle'>
       Código
   </td>
   <td class='tdTitle'>
    Contenido
    </td>
    <td class='tdTitle'>
    Capacidad
    </td>
    <td class='tdTitle'>
    ¿de Ñubles?
    </td>
    <td class='tdTitle'>
    Estado
    </td>
 </tr>
 ${listCylinders}
         </table>
   
       <div class='divContainerImg'>
 
        </div>
   
       </body>
     </html>`;
 
     const options = {
         childProcessOptions: {
             env: {
                 OPENSSL_CONF: "/dev/null",
             },
         },
         format: "Letter",
         border: null,
         margin: {
             top: "2.5cm",
             bottom: "2.5cm",
             left: "2cm",
             right: "2cm",
         },
     };
     let statePdf: any = null;
 
     statePdf = await pdfCreate(options, `./output/infoPdf.pdf`, html); */

    res.status(200).json({ state: true });
};


export {
    getAllCompanyCylindersCount,
    getAllCylindersCompanyByRut,
    updateCylinderState,
    updateCylinderRequestAndReception,
    generatePdfCylinderCompany
};
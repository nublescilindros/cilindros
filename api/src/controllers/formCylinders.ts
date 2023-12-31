import { pdfCreate /* , generateQRBase64  */ } from "../utils/pdf";
import puppeteer from "puppeteer";
import * as formCylinders from "../models/formCylinders";
import path from 'path';
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
    try {
        const data = req.body;
        const imagePath = path.join(__dirname, '../../output/LOGO-GASES-NUBLE.png');
        const imagePathRelative = 'https://cilindros-production-31bc.up.railway.app/img/LOGO-GASES-NUBLE.png';
        console.log('generando pdf');
        console.log(imagePath);
        let listCylinders = ''

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
            box-shadow: 0 0 0 1000px yellow inset;
             margin: 2rem 2rem 0 2rem;
             padding:.3rem 0 .3rem 0;
             border-radius: 0 0 .5rem 0;
             font-size:2rem;
             color:blue;
             width:13rem;
             text-align: center;
             border:solid .1rem blue;
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
           h4{
            margin: 0rem 0rem 0 2rem;
            font-size:1rem;
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
           margin:0 0 0 0rem;
           width:15rem;
           height:15rem
            }
   
            .divContainerImg{
             text-align: center;
              }
     
   
       </style>
       <body>
       <h1>Gases Ñuble</h1>
       <h4>Somos una gran compañia</h4>
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
    ¿de Ñuble?
    </td>
    <td class='tdTitle'>
    Estado
    </td>
 </tr>
 ${listCylinders}
         </table>
         <img src="${imagePathRelative}" alt="Descripción de la imagen">
       <div class='divContainerImg'>
 
        </div>
   
       </body>
     </html>`;

        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox'],
        });
        const page = await browser.newPage();
        await page.setContent(html);
        await page.pdf({ path: './output/infoPdf.pdf', format: 'A4' });

        await browser.close();

        /* statePdf = await pdfCreate(options, `./output/infoPdf.pdf`, html); */

        res.status(200).json({ state: true });
    } catch (error) {
        console.log(error);
    }


};


export {
    getAllCompanyCylindersCount,
    getAllCylindersCompanyByRut,
    updateCylinderState,
    updateCylinderRequestAndReception,
    generatePdfCylinderCompany
};
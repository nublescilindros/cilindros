import { pdfCreate /* , generateQRBase64  */ } from "../utils/pdf";
import * as XLSX from "xlsx";
import dirPath from "path";

const generatePdf = async (req: any, res: any) => {
  const data = req.body;

  const html = `
  <html>
    <head>
      <meta charset="utf-8">
      <title>Ficha de Mascota</title>
    </head>
    <style>

    .body{
        width:100%;
        height:100%;
      }

       h2{
        margin: 2rem 2rem 0 2rem;
        padding:.3rem 0 .3rem 0;
        text-align: center;
        border:solid .1rem black;
        background-color:rgb(212, 212, 212);
        border-radius: 0 0 .5rem 0;
        font-size:1rem;
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
        }
      .tdTitle{
         border:solid .1rem black;
         font-size:1rem;
        }
        .tdResponse{
          border-bottom: .1rem solid black;
          width:20rem;
          font-size:1rem;
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
      <h2>Ficha de Mascota</h2>
      <h3>Información general</h3>
<table>
  <tr>
      <td class='tdTitle'>
          Nombre Propietario
      </td>
      <td class='tdResponse'>
          ${data.ownerName}
       </td>
  </tr>
  <tr>
      <td class='tdTitle'>
          Dirección
      </td>
      <td class='tdResponse'>
          ${data.address}
       </td>
  </tr>
  <tr>
  <td class='tdTitle'>
      Teléfono
  </td>
  <td class='tdResponse'>
      ${data.phone}
   </td>
</tr>
<tr>
<td class='tdTitle'>
    N° identificación
</td>
<td class='tdResponse'>
    ${data.identifierNumber}
 </td>
</tr>
<tr>
<td class='tdTitle'>
    Nombre Mascota
</td>
<td class='tdResponse'>
    ${data.petName}
 </td>
</tr>
<tr>
<td class='tdTitle'>
    Raza
</td>
<td class='tdResponse'>
    ${data.breed}
 </td>
</tr>

<tr>
<td class='tdTitle'>
    Especie
</td>
<td class='tdResponse'>
    ${data.species}
 </td>
</tr>
<tr>
<td class='tdTitle'>
    Fecha nacimiento
</td>
<td class='tdResponse'>
    ${data.birthDate}
 </td>
</tr>
<tr>
<td class='tdTitle'>
    Peso
</td>
<td class='tdResponse'>
    ${data.weight}
 </td>
</tr>
      </table>

    <div class='divContainerImg'>
      <img src='https://holamascota.com/blogholamascota/wp-content/uploads/2014/04/dog-doctor-chihuahua.jpg' />
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

  statePdf = await pdfCreate(options, `./output/petInfoPdf.pdf`, html);

  res.status(200).json(statePdf);
};

const generateExcel = async (req: any, res: any) => {
  let arrayy = [{ id: 0, date: "10/20/2023", result: "asd" }];

  const data = req.body.map((item: any) => {
    return { date: item.date, typeExam: item.typeExam, result: item.result };
  });

  await createExcel("Historial", data);

  res.status(200).json({ state: true });
};

export { generatePdf, generateExcel };

const createExcel = (sheetLabel: string, data: any) => {
  return new Promise((resolve) => {
    const fileExtension = "xlsx";
    const sheetName = sheetLabel;
    const fileName = "petInfoExcel";

    const ws: any = XLSX.utils.book_new();
    const wb = { Sheets: { [sheetName]: ws }, SheetNames: [sheetName] };

    const wscols = [{ wch: 10 }, { wch: 15 }, { wch: 10 }];

    ws["!cols"] = wscols;

    XLSX.utils.sheet_add_aoa(ws, [["Fecha", "Tipo de Examen", "Resultado"]], {
      origin: "A1",
    });

    const worksheet = XLSX.utils.sheet_add_json(ws, data, {
      origin: "A2",
      skipHeader: true,
    });

    const pdfPath = dirPath.join(__dirname, "./../../", "output");

    XLSX.writeFile(wb, dirPath.join(pdfPath, `${fileName}.${fileExtension}`));

    resolve("");
    return {
      success: true,
      error: null,
    };
  });
};

import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';

class PDFUtils {
  static createPdfForRecipe(item) {
    pdfMake.vfs = vfsFonts.pdfMake.vfs;

    const ingred = [
      [
        { text: 'Menge', bold: true },
        { text: 'Zutat', bold: true },
      ],
    ].concat(
      item.ingredients.map((ingredient) => {
        return [ingredient.name, ingredient.amount];
      }),
    );

    const docDefinition = {
      footer: {
        columns: [
          { width: '*', text: '' },
          { text: 'kochbuch-sebastian.herokuapp.com', alignment: 'center' },
          { width: '*', text: '' },
        ],
      },

      content: [
        {
          columns: [
            { width: '*', text: '' },
            {
              text: item.title,
              bold: true,
              decoration: 'underline',
              fontSize: 24,
            },
            { width: '*', text: '' },
          ],
        },
        {
          columns: [
            { width: '*', text: '' },
            {
              text: 'Zutaten',
              bold: true,
              decoration: 'underline',
              fontSize: 18,
            },
            { width: '*', text: '' },
          ],
        },
        {
          columns: [
            { width: '*', text: '' },
            {
              layout: 'lightHorizontalLines',
              table: {
                headerRows: 1,
                widths: ['auto', 'auto'],

                body: ingred,
                alignment: 'center',
              },
            },
            { width: '*', text: '' },
          ],
        },
        {
          columns: [
            { width: '*', text: '' },
            {
              text: 'Beschreibung',
              bold: true,
              decoration: 'underline',
              fontSize: 18,
            },
            { width: '*', text: '' },
          ],
        },
        item.description,
      ],
    };

    pdfMake.createPdf(docDefinition).download(`${item.title}.pdf`);
  }
}

export default PDFUtils;

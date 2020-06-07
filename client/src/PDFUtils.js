import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';

class PDFUtils {
  static createPdfForRecipe(item) {
    pdfMake.vfs = vfsFonts.pdfMake.vfs;

    const ingredientsArray = item.ingredients.map((ingredient) => {
      return [ingredient.name, ingredient.amount];
    });

    console.log(ingredientsArray);

    /* var fonts = {
      Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf',
      },
    };

    pdfMake.setFonts(fonts); */

    const docDefinition = {
      footer: {
        columns: ['kochbuch-sebastian.herokuapp.com'],
      },

      content: [
        {
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            widths: ['auto', 'auto'],

            body: [['Zutat', 'Menge'], ingredientsArray],
          },
        },
        item.description,
      ],
    };

    console.log(docDefinition);

    pdfMake.createPdf(docDefinition).download();
  }
}

export default PDFUtils;

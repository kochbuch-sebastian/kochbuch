import pdfMake from 'pdfmake';

class PDFUtils {
  static createPdfForRecipe(item) {
    const ingredientsArray = item.ingredients.map((ingredient) => {
      return [ingredient.name, ingredient.amount];
    });

    var fonts = {
      Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf',
      },
    };

    pdfMake.setFonts(fonts);

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

    pdfMake.createPdf(docDefinition).download();
  }
}

export default PDFUtils;

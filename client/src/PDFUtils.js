import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';

class PDFUtils {
  static createPdfForRecipe(item) {
    pdfMake.vfs = vfsFonts.pdfMake.vfs;

    const ingredientsArray = item.ingredients.map((ingredient) => {
      return [ingredient.name, ingredient.amount];
    });

    const ingredientNames = item.ingredients.map((ingredient) => {
      return ingredient.name;
    });
    const ingredientAmounts = item.ingredients.map((ingredient) => {
      return ingredient.amount;
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

    console.log(
      'IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII',
    );
    console.log(
      item.ingredients.map((ingredient) => {
        return [ingredient.name, ingredient.amount];
      }),
    );
    console.log(
      'IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII',
    );

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

    console.log(ingred);

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
        item.description,
      ],
    };

    console.log(docDefinition);
    console.log(ingredientNames);
    console.log(ingredientAmounts);

    pdfMake.createPdf(docDefinition).download();
  }
}

export default PDFUtils;

import PDF from 'pdfmake';

class PDFUtils {
  static createPdfForRecipe(item) {
    const ingredientsArray = item.ingredients.map((ingredient) => {
      return [ingredient.name, ingredient.amount];
    });

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

    PDF.createPdf(docDefinition).download();
  }
}

export default PDFUtils;

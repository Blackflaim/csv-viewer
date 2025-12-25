let hotInstance = null;
const fileInput = document.getElementById('fileUpload');

fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];

    if (!file) {
        return;
    }

    Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        encoding: "UTF-8",
        
        complete: function(results) {
            console.log("Дані отримано:", results.data);

            if (results.errors.length) {
                console.error("Помилки CSV:", results.errors);
                alert("Зверніть увагу: у файлі можуть бути помилки форматування.");
            }
            renderTable(results.data, results.meta.fields);
        },
        
        error: function(error) {
            console.error("Помилка:", error);
            alert("Не вдалося прочитати файл.");
        }
    });
});

function renderTable(data, colHeaders) {
    const container = document.getElementById('csv-table');
    if (hotInstance) {
        hotInstance.destroy();
    }

    hotInstance = new Handsontable(container, {
        data: data,
        colHeaders: colHeaders,
        
        rowHeaders: false,
        width: '100%',
        height: '100%',
        stretchH: 'all',
        className: 'htCenter htMiddle',

        licenseKey: 'non-commercial-and-evaluation',
        columnSorting: true, 
        contextMenu: true,
        manualColumnResize: true,
        filters: false,
        dropdownMenu: false
    });
}
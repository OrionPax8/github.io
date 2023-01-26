// Javascript file to create table for assignment1

let maxInitialRows = 10, maxInitialCols = 10;

window.addEventListener("load", (event) => {
    console.log("Page fully loaded")
    CreateATable(maxInitialRows,maxInitialCols)
})

const createAUserTable = () =>{
    if(userrows.value && usercols.value)
    {
        CreateATable(userrows.value, usercols.value);
    }
}

const CreateATable = (maxRowValue,maxColValue) => {
    // Getting element and checking for previous table
    const elem = document.getElementById("myTable");
    const currentTable = document.getElementById("mycurrenttable");

    if (currentTable)
        {
            //Removing old table
            currentTable.remove();
        }

    // Createing new table
    const multiplicationTable = document.createElement("table");
    multiplicationTable.setAttribute('id','mycurrenttable');
    elem.appendChild(multiplicationTable);

    //Table Row loop
    for(let rowCounter = 0; rowCounter < maxRowValue; rowCounter++)
        {
            const tableRow = document.createElement("tr");
            const rowDisplayValue = rowCounter + 1;
            multiplicationTable.appendChild(tableRow);

            //Table Column loop
            for(let colCounter= 0; colCounter < maxColValue; colCounter++)
            {
                const tableCol = document.createElement("td");
                const colDisplayValue = colCounter + 1;
                const productDisplayValue = rowDisplayValue * colDisplayValue;
                const cellText = document.createTextNode(`${rowDisplayValue} x ${colDisplayValue} = ${productDisplayValue}`);
                tableCol.appendChild(cellText);
                tableRow.appendChild(tableCol);
            }
        }
}
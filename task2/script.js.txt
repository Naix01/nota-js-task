$(document).ready(function() {
    // Mocked data (replace with real backend data)
    var mockedData = [
        { id: 1, name: "Entry 1", datetime: "2023-01-01 10:00:00" },
        { id: 2, name: "Entry 2", datetime: "2023-01-02 11:00:00" },
    ];

    // Function to populate the data table
    function populateTable(data) {
        var table = $("#data-table");
        table.empty(); // Clear existing rows
        data.forEach(function(entry) {
            var row = $("<tr>");
            row.append("<td>" + entry.id + "</td>");
            var nameCell = $("<td>").text(entry.name);
            var nameInput = $("<input type='text' class='edit-name-input' value='" + entry.name + "'>");
            nameCell.append(nameInput);
            row.append(nameCell);
            row.append("<td>" + entry.datetime + "</td>");
            var actionCell = $("<td>");
            var editButton = $("<button class='edit-button'>Edit</button>");
            var saveButton = $("<button class='save-button'>Save</button>");
            var deleteButton = $("<button class='delete-button'>Delete</button>");
            actionCell.append(editButton, saveButton, deleteButton);
            row.append(actionCell);
            table.append(row);
        });
    }

    // Initial data population
    populateTable(mockedData);

    // Handle "Add New Entry" button click
    $("#add-entry").click(function() {
        var newRow = $("<tr>");
        newRow.append("<td></td>");
        var newNameCell = $("<td>");
        var newNameInput = $("<input type='text' class='new-name-input'>");
        var sendButton = $("<button class='send-button'>Send</button>");
        newNameCell.append(newNameInput, sendButton);
        newRow.append(newNameCell);
        newRow.append("<td></td>");
        var newActionCell = $("<td>");
        newRow.append(newActionCell);
        $("#data-table").append(newRow);
    });

    // Handle "Send" button click (for adding new entry)
    $(document).on("click", ".send-button", function() {
        var newName = $(this).siblings(".new-name-input").val(); // Get the new name
        // Mock an API request to add the new entry
        var newId = 3; // Replace with the actual new ID returned from the backend
        var newEntry = { id: newId, name: newName, datetime: "2023-01-03 12:00:00" };
        mockedData.push(newEntry);
        populateTable(mockedData);
    });

    // Handle "Edit" button click
    $(document).on("click", ".edit-button", function() {
        var nameCell = $(this).closest("tr").find("td:eq(1)");
        var nameInput = nameCell.find(".edit-name-input");
        nameInput.prop("readonly", false); // Make the input editable
        nameCell.find(".edit-button").hide();
        nameCell.find(".save-button").show();
    });

    // Handle "Save" button click
    $(document).on("click", ".save-button", function() {
        var nameCell = $(this).closest("tr").find("td:eq(1)");
        var nameInput = nameCell.find(".edit-name-input");
        var newName = nameInput.val();
        // Mock an API request to update the entry
        var rowId = $(this).closest("tr").find("td:eq(0)").text(); // Get the ID
        // Update the data in the mocked dataset
        mockedData.forEach(function(entry) {
            if (entry.id == rowId) {
                entry.name = newName;
                entry.datetime = "Updated DateTime"; // Replace with the actual updated datetime
            }
        });
        populateTable(mockedData);
    });

    // Handle "Delete" button click
    $(document).on("click", ".delete-button", function() {
        var rowId = $(this).closest("tr").find("td:eq(0)").text(); // Get the ID
        // Mock an API request to delete the entry
        // Remove the entry from the mocked dataset
        mockedData = mockedData.filter(function(entry) {
            return entry.id != rowId;
        });
        populateTable(mockedData);
    });
});

$(document).ready(function () {

    let booksJSON = [];

    // Load XML using AJAX
    $.ajax({
        url: "books.xml",
        dataType: "xml",
        success: function (data) {

            $(data).find("book").each(function () {

                let book = {
                    title: $(this).find("title").text(),
                    author: $(this).find("author").text(),
                    genre: $(this).find("genre").text(),
                    price: parseFloat($(this).find("price").text()),
                    publish_date: $(this).find("publish_date").text()
                };

                booksJSON.push(book);
            });

            populateFilters();
            displayBooks(booksJSON);
        },
        error: function () {
            alert("Error loading XML file. Check books.xml location.");
        }
    });

    function displayBooks(books) {

        let tableBody = $("#bookTable tbody");
        tableBody.empty();

        $.each(books, function (index, book) {

            let row = `
                <tr>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.genre}</td>
                    <td>${book.price}</td>
                    <td>${book.publish_date}</td>
                </tr>
            `;

            tableBody.append(row);
        });
    }

    function populateFilters() {

        let genres = [];
        let authors = [];

        $.each(booksJSON, function (i, book) {

            if (!genres.includes(book.genre))
                genres.push(book.genre);

            if (!authors.includes(book.author))
                authors.push(book.author);
        });

        $.each(genres, function (i, genre) {
            $("#genreFilter").append(`<option value="${genre}">${genre}</option>`);
        });

        $.each(authors, function (i, author) {
            $("#authorFilter").append(`<option value="${author}">${author}</option>`);
        });
    }

    $("#filterBtn").click(function () {

        let selectedGenre = $("#genreFilter").val();
        let selectedAuthor = $("#authorFilter").val();
        let minPrice = $("#minPrice").val();
        let maxPrice = $("#maxPrice").val();

        let filteredBooks = booksJSON.filter(function (book) {

            let genreMatch = (selectedGenre === "all" || book.genre === selectedGenre);
            let authorMatch = (selectedAuthor === "all" || book.author === selectedAuthor);

            let priceMatch = true;

            if (minPrice !== "")
                priceMatch = book.price >= parseFloat(minPrice);

            if (maxPrice !== "")
                priceMatch = priceMatch && book.price <= parseFloat(maxPrice);

            return genreMatch && authorMatch && priceMatch;
        });

        displayBooks(filteredBooks);
    });

});